import os
import glob
import json
import math
import zipfile
import urllib.parse
import urllib.request
from datetime import datetime, timedelta, timezone
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Button, Slider
from matplotlib.colors import Normalize, LightSource
from PIL import Image
from scipy.ndimage import gaussian_filter, uniform_filter, binary_erosion, rotate

# =====================================================================
# 1. KONSTANTA GEOSPASIAL BULAN & PARAMETER BATAS SIMULASI (GO/NO-GO)
# =====================================================================
R_MOON_M         = 1737400.0
LAT_CENTER_DEG   = -84.50
LON_CENTER_DEG   = 31.00
DEFAULT_RES_M    = 42.0   # Skala spasial plateau Mons Mouton (~21.5 km pada 512 px)

# Ambang batas keselamatan pendaratan (Parameter Simulasi CLPS/Artemis)
MAX_SAFE_SLOPE_DEG    = 8.0    # Batas kemiringan lereng LOLA DEM (derajat)
MIN_SUN_MARGIN_DEG    = 0.2    # Margin minimum Matahari di atas ufuk bukit (derajat)
MIN_EARTH_MARGIN_DEG  = 1.5    # Margin minimum Bumi di atas ufuk untuk sinyal DTE (derajat)
MIN_SOLAR_CONT_PCT    = 65.0   # Minimal kontinuitas sinar surya 14 hari pasca-landing (%)
MIN_DTE_CONT_PCT      = 70.0   # Minimal ketersediaan sinyal komunikasi Bumi 14 hari (%)

BASE_EPOCH_UTC     = datetime(2026, 11, 10, 0, 0, tzinfo=timezone.utc)
FORECAST_SPAN_DAYS = 44

os.makedirs("data", exist_ok=True)
os.makedirs("output", exist_ok=True)

# =====================================================================
# 2. AUTO-DISCOVERY & PEMBACAAN METADATA NASA LRO QUICKMAP / LOLA DEM
# =====================================================================
downloads_path = os.path.join(os.path.expanduser("~"), "Downloads")
zip_candidates = glob.glob(os.path.join(downloads_path, "*quickmap*.zip"))
for z in zip_candidates:
    try:
        with zipfile.ZipFile(z, "r") as zip_ref:
            zip_ref.extractall("data")
        print(f"[+] Otomatis mengekstrak file dari: {os.path.basename(z)}")
    except Exception:
        pass

all_images = []
for root, _, files in os.walk("data"):
    for f in files:
        if f.lower().endswith((".png", ".tif", ".tiff", ".jpg")) and not f.endswith(".vrt"):
            all_images.append(os.path.join(root, f))

dem_file = illum_file = None
for img in all_images:
    name = os.path.basename(img).lower()
    if "illum" in name or "wac" in name:
        illum_file = img
    elif "map" in name or "dem" in name or "lola" in name:
        dem_file = img

if not dem_file and all_images:
    dem_file = all_images[0]
if not illum_file and len(all_images) > 1:
    illum_file = [x for x in all_images if x != dem_file][0]

def detect_pixel_resolution_m(img_path, pil_img):
    try:
        tags = getattr(pil_img, "tag_v2", {})
        if 33550 in tags:
            sx = float(tags[33550][0])
            if 1.0 <= sx <= 2000.0:
                return sx
    except Exception:
        pass

    base_no_ext = os.path.splitext(img_path)[0]
    for ext in (".tfw", ".pgw", ".jgw", ".wld"):
        wf = base_no_ext + ext
        if os.path.exists(wf):
            try:
                with open(wf, "r", encoding="utf-8") as f:
                    vals = [float(line.strip()) for line in f if line.strip()]
                if vals and 1.0 <= abs(vals[0]) <= 2000.0:
                    return abs(vals[0])
            except Exception:
                pass
    return DEFAULT_RES_M

if dem_file:
    print(f"[+] Menggunakan NASA LRO QuickMap DEM : {dem_file}")
    raw_dem_img = Image.open(dem_file)
    PIXEL_RES_M = detect_pixel_resolution_m(dem_file, raw_dem_img)
    if raw_dem_img.mode in ("F", "I", "I;16", "I;16B", "I;16L"):
        dem_arr = np.array(raw_dem_img, dtype=np.float32)
        d_min, d_max = float(np.nanmin(dem_arr)), float(np.nanmax(dem_arr))
        if -9000.0 <= d_min and d_max <= 11000.0 and (d_max - d_min) > 200.0:
            elevation_m = np.nan_to_num(dem_arr, nan=np.nanmedian(dem_arr))
        else:
            norm_d = (dem_arr - d_min) / (d_max - d_min + 1e-5)
            elevation_m = 2000.0 + norm_d * 4000.0
    else:
        heightmap = np.array(raw_dem_img.convert("L"), dtype=np.float32)
        elevation_m = 2000.0 + (heightmap / 255.0) * 4000.0
    dem_source_tag = f"NASA LRO QuickMap ({os.path.basename(dem_file)})"
else:
    print("[!] Raster QuickMap tidak ditemukan -> Menggunakan Model LOLA Mons Mouton.")
    PIXEL_RES_M = DEFAULT_RES_M
    yy, xx = np.mgrid[0:512, 0:512].astype(np.float32)
    r_plateau = np.hypot((xx - 256.0) / 145.0, (yy - 256.0) / 130.0)
    plateau = 195.0 * np.exp(-0.5 * (r_plateau ** 2.4))
    crater_1 = -105.0 * np.exp(-0.5 * ((np.hypot(xx - 135.0, yy - 165.0) / 42.0) ** 2))
    crater_2 = -120.0 * np.exp(-0.5 * ((np.hypot(xx - 375.0, yy - 340.0) / 48.0) ** 2))
    ridge = 32.0 * np.sin(xx / 36.0) * np.cos(yy / 40.0)
    hm = np.clip(45.0 + plateau + crater_1 + crater_2 + ridge, 0.0, 255.0)
    elevation_m = 2000.0 + (hm / 255.0) * 4000.0
    dem_source_tag = "LOLA Mons Mouton Reference Model"

elevation_smooth = gaussian_filter(elevation_m, sigma=1.2)
dy, dx = np.gradient(elevation_smooth, PIXEL_RES_M)
slope_deg = np.degrees(np.arctan(np.sqrt(dx**2 + dy**2)))
slope_vmax = max(2.0, float(np.percentile(slope_deg, 97)))

if illum_file and os.path.exists(illum_file):
    print(f"[+] Menggunakan Data Iluminasi NASA   : {illum_file}")
    raw_illum = Image.open(illum_file).convert("L").resize((elevation_m.shape[1], elevation_m.shape[0]))
    static_illum_map = (np.array(raw_illum, dtype=np.float32) / 255.0) * 100.0
else:
    static_illum_map = None

# =====================================================================
# 3. KLIEN NASA JPL HORIZONS API (DE441 TOPOCENTRIC MOON_ME) + CACHE
# =====================================================================
HORIZONS_CACHE_PATH = os.path.join("output", "jpl_horizons_cache.json")

def parse_horizons_csv(result_text):
    if "$$SOE" not in result_text or "$$EOE" not in result_text:
        return None
    before_soe, after_soe = result_text.split("$$SOE", 1)
    body_text = after_soe.split("$$EOE", 1)[0]

    header_lines = [ln.strip() for ln in before_soe.splitlines() if "Azi" in ln and "Elev" in ln]
    azi_idx, elev_idx = None, None
    if header_lines:
        h_parts = [p.strip() for p in header_lines[-1].split(",")]
        for idx, col in enumerate(h_parts):
            if "Azi" in col:
                azi_idx = idx
            elif "Elev" in col:
                elev_idx = idx

    ts_list, az_list, el_list = [], [], []
    for raw_line in body_text.splitlines():
        line = raw_line.strip()
        if not line:
            continue
        parts = [p.strip() for p in line.split(",")]
        try:
            dt = datetime.strptime(parts[0], "%Y-%b-%d %H:%M").replace(tzinfo=timezone.utc)
        except ValueError:
            continue

        az_val, el_val = None, None
        if azi_idx is not None and elev_idx is not None and len(parts) > max(azi_idx, elev_idx):
            try:
                az_val = float(parts[azi_idx])
                el_val = float(parts[elev_idx])
            except ValueError:
                pass

        if az_val is None or el_val is None:
            nums = []
            for p in parts[1:]:
                try:
                    nums.append(float(p))
                except ValueError:
                    continue
            if len(nums) >= 2:
                az_val, el_val = nums[-2], nums[-1]

        if az_val is not None and el_val is not None:
            ts_list.append(dt.timestamp())
            az_list.append(az_val % 360.0)
            el_list.append(el_val)

    if len(ts_list) < 4:
        return None
    az_unwrapped = np.degrees(np.unwrap(np.radians(np.array(az_list, dtype=np.float64))))
    return {
        "ts": np.array(ts_list, dtype=np.float64),
        "az_unwrapped": az_unwrapped,
        "elev": np.array(el_list, dtype=np.float64)
    }

def fetch_jpl_horizons_body(command_id, start_dt, stop_dt, lat_deg, lon_deg, alt_km=4.2):
    params = {
        "format": "json",
        "COMMAND": f"'{command_id}'",
        "OBJ_DATA": "'NO'",
        "MAKE_EPHEM": "'YES'",
        "EPHEM_TYPE": "'OBSERVER'",
        "CENTER": "'coord@301'",
        "COORD_TYPE": "'GEODETIC'",
        "SITE_COORD": f"'{lon_deg:.4f},{lat_deg:.4f},{alt_km:.3f}'",
        "START_TIME": f"'{start_dt.strftime('%Y-%m-%d %H:%M')}'",
        "STOP_TIME": f"'{stop_dt.strftime('%Y-%m-%d %H:%M')}'",
        "STEP_SIZE": "'3 h'",
        "QUANTITIES": "'4'",
        "ANG_FORMAT": "'DEG'",
        "CSV_FORMAT": "'YES'"
    }
    url = "https://ssd.jpl.nasa.gov/api/horizons.api?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": "NASA-SpaceApps-LunarNavigator/1.0"})
    with urllib.request.urlopen(req, timeout=8.0) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    return parse_horizons_csv(data.get("result", ""))

def load_or_fetch_horizons_ephemeris():
    start_dt = BASE_EPOCH_UTC
    stop_dt = BASE_EPOCH_UTC + timedelta(days=FORECAST_SPAN_DAYS)
    cache_key = f"{start_dt.strftime('%Y%m%d')}_{FORECAST_SPAN_DAYS}d_{LAT_CENTER_DEG}_{LON_CENTER_DEG}"

    if os.path.exists(HORIZONS_CACHE_PATH):
        try:
            with open(HORIZONS_CACHE_PATH, "r", encoding="utf-8") as f:
                cached = json.load(f)
            if cached.get("key") == cache_key:
                print("[+] Ephemeris NASA JPL Horizons (DE441) dimuat dari cache lokal.")
                return {
                    "source": "NASA JPL Horizons DE441",
                    "sun": {k: np.array(v, dtype=np.float64) for k, v in cached["sun"].items()},
                    "earth": {k: np.array(v, dtype=np.float64) for k, v in cached["earth"].items()}
                }
        except Exception:
            pass

    print("[*] Menghubungi NASA JPL Horizons API untuk data Matahari & Librasi Bumi...")
    try:
        sun_ep = fetch_jpl_horizons_body("10", start_dt, stop_dt, LAT_CENTER_DEG, LON_CENTER_DEG, 4.2)
        earth_ep = fetch_jpl_horizons_body("399", start_dt, stop_dt, LAT_CENTER_DEG, LON_CENTER_DEG, 4.2)
        if sun_ep is not None and earth_ep is not None:
            with open(HORIZONS_CACHE_PATH, "w", encoding="utf-8") as f:
                json.dump({
                    "key": cache_key,
                    "sun": {k: v.tolist() for k, v in sun_ep.items()},
                    "earth": {k: v.tolist() for k, v in earth_ep.items()}
                }, f)
            print("[+] Berhasil mengunduh ephemeris resmi NASA JPL Horizons DE441!")
            return {"source": "NASA JPL Horizons DE441", "sun": sun_ep, "earth": earth_ep}
    except Exception as exc:
        print(f"[!] Mode offline ({exc}) -> Menggunakan model analitik MOON_ME.")

    return None

JPL_HORIZONS_DATA = load_or_fetch_horizons_ephemeris()
EPHEMERIS_SOURCE_LABEL = JPL_HORIZONS_DATA["source"] if JPL_HORIZONS_DATA else "Analytical MOON_ME"

def compute_lunar_ephemeris(dt_utc, lat_deg=LAT_CENTER_DEG, lon_deg=LON_CENTER_DEG):
    d_lat = lat_deg - LAT_CENTER_DEG
    d_lon = lon_deg - LON_CENTER_DEG

    if JPL_HORIZONS_DATA is not None:
        ts_q = dt_utc.timestamp()
        s_tab = JPL_HORIZONS_DATA["sun"]
        e_tab = JPL_HORIZONS_DATA["earth"]

        sun_az = float(np.interp(ts_q, s_tab["ts"], s_tab["az_unwrapped"])) % 360.0
        sun_el = float(np.interp(ts_q, s_tab["ts"], s_tab["elev"]))
        earth_az = float(np.interp(ts_q, e_tab["ts"], e_tab["az_unwrapped"])) % 360.0
        earth_el = float(np.interp(ts_q, e_tab["ts"], e_tab["elev"]))

        sun_el += d_lat * math.cos(math.radians(sun_az))
        earth_el += d_lat * math.cos(math.radians(earth_az))
        sun_az = (sun_az - d_lon) % 360.0
        earth_az = (earth_az - d_lon) % 360.0
        return {"sun_elev": sun_el, "sun_az": sun_az, "earth_elev": earth_el, "earth_az": earth_az}

    j2000 = datetime(2000, 1, 1, 12, 0, tzinfo=timezone.utc)
    days = (dt_utc - j2000).total_seconds() / 86400.0
    synodic_phase = 2.0 * math.pi * ((days - 9815.0) / 29.530588853)
    subsolar_lon = (math.degrees(-synodic_phase)) % 360.0
    subsolar_lat = -1.543 * math.cos(2.0 * math.pi * ((days - 9790.0) / 365.25))

    lat_r, lon_r = math.radians(lat_deg), math.radians(lon_deg)
    ss_lat_r, ss_lon_r = math.radians(subsolar_lat), math.radians(subsolar_lon)
    dlon_s = ss_lon_r - lon_r
    sun_el = math.degrees(math.asin(np.clip(
        math.sin(lat_r)*math.sin(ss_lat_r) + math.cos(lat_r)*math.cos(ss_lat_r)*math.cos(dlon_s), -1.0, 1.0)))
    sun_az = math.degrees(math.atan2(
        math.sin(dlon_s)*math.cos(ss_lat_r),
        math.cos(lat_r)*math.sin(ss_lat_r) - math.sin(lat_r)*math.cos(ss_lat_r)*math.cos(dlon_s))) % 360.0

    earth_lat = -6.68 * math.sin(2.0 * math.pi * ((days - 9808.0) / 27.212220817))
    earth_lon = 7.89 * math.sin(2.0 * math.pi * ((days - 9811.0) / 27.55454988))
    el_r, elon_r = math.radians(earth_lat), math.radians(earth_lon)
    dlon_e = elon_r - lon_r
    earth_el = math.degrees(math.asin(np.clip(
        math.sin(lat_r)*math.sin(el_r) + math.cos(lat_r)*math.cos(el_r)*math.cos(dlon_e), -1.0, 1.0)))
    earth_az = math.degrees(math.atan2(
        math.sin(dlon_e)*math.cos(el_r),
        math.cos(lat_r)*math.sin(el_r) - math.sin(lat_r)*math.cos(el_r)*math.cos(dlon_e))) % 360.0

    return {"sun_elev": sun_el, "sun_az": sun_az, "earth_elev": earth_el, "earth_az": earth_az}

# =====================================================================
# 4. RAY-CASTING UFUK 360°, DETEKSI PSR & MODEL TERMAL LRO DIVINER
# =====================================================================
def compute_360_horizon_profile(elev_m, r0, c0, pixel_res_m=PIXEL_RES_M, max_radius_px=180):
    H, W = elev_m.shape
    z0 = elev_m[r0, c0]
    az_grid = np.arange(360, dtype=np.float32)
    az_rad = np.radians(az_grid)
    dists = np.arange(1, max_radius_px + 1, dtype=np.float32)

    rr = np.rint(r0 - np.cos(az_rad)[:, None] * dists[None, :]).astype(int)
    cc = np.rint(c0 + np.sin(az_rad)[:, None] * dists[None, :]).astype(int)
    valid = (rr >= 0) & (rr < H) & (cc >= 0) & (cc < W)

    z_samples = elev_m[np.clip(rr, 0, H - 1), np.clip(cc, 0, W - 1)]
    angles_deg = np.degrees(np.arctan2(z_samples - z0, dists[None, :] * pixel_res_m))
    angles_deg = np.where(valid, angles_deg, -10.0)
    return az_grid, np.max(angles_deg, axis=1)

def compute_directional_los_fast(elev_m, az_deg, elev_deg, pixel_res_m=PIXEL_RES_M):
    H, W = elev_m.shape
    if elev_deg <= -12.0:
        return np.zeros((H, W), dtype=np.float32)

    rot_dem = rotate(elev_m, angle=az_deg, reshape=True, order=1, mode="constant", cval=-1e6)
    rH, rW = rot_dem.shape
    tan_el = math.tan(math.radians(elev_deg))

    row_dist = np.arange(rH, dtype=np.float32)[:, np.newaxis] * pixel_res_m
    h_eff = rot_dem + row_dist * tan_el
    max_h_eff = np.maximum.accumulate(h_eff, axis=0)

    valid_mask = rot_dem > -1e5
    los_rot = np.where(valid_mask & (h_eff >= max_h_eff - 0.5), 100.0, 0.0).astype(np.float32)

    los_back = rotate(los_rot, angle=-az_deg, reshape=True, order=1, mode="constant", cval=0.0)
    bH, bW = los_back.shape
    r0 = (bH - H) // 2
    c0 = (bW - W) // 2
    return gaussian_filter(los_back[r0:r0+H, c0:c0+W], sigma=0.8)

annual_sun_hits = np.zeros_like(elevation_smooth, dtype=np.float32)
for az_sweep in range(0, 360, 30):
    annual_sun_hits += (compute_directional_los_fast(elevation_smooth, float(az_sweep), 3.5, PIXEL_RES_M) > 50.0)

psr_mask = (annual_sun_hits == 0) & (elevation_smooth < np.percentile(elevation_smooth, 45))
if static_illum_map is not None:
    psr_mask = psr_mask | (static_illum_map <= np.percentile(static_illum_map, 8))
if np.count_nonzero(psr_mask) < 20:
    psr_mask = elevation_smooth <= np.percentile(elevation_smooth, 12)

psr_coords = np.argwhere(psr_mask)

def distance_to_nearest_psr_km(r, c):
    d_px = np.min(np.hypot(psr_coords[:, 0] - r, psr_coords[:, 1] - c))
    return float(d_px * PIXEL_RES_M / 1000.0)

S0_SOLAR   = 1361.0
SIGMA_SB   = 5.670374419e-8
ALBEDO_LUN = 0.12
EMISSIVITY = 0.95

def diviner_surface_temp_k(sun_elev_deg, is_sunlit, hours_in_shadow=0.0):
    if is_sunlit and sun_elev_deg > 0.0:
        sin_inc = math.sin(math.radians(max(sun_elev_deg, 0.3)))
        q_solar = (1.0 - ALBEDO_LUN) * S0_SOLAR * sin_inc
        t_rad = ((q_solar + 4.5) / (EMISSIVITY * SIGMA_SB)) ** 0.25
        return float(np.clip(t_rad, 95.0, 260.0))
    return float(42.0 + (195.0 - 42.0) * math.exp(-hours_in_shadow / 22.0))

# =====================================================================
# 5. PROYEKSI KOORDINAT IAU 2000 & SELEKSI 3 KANDIDAT SITUS
# =====================================================================
def pixel_to_lunar_polar_coords(r, c, shape, res_m=PIXEL_RES_M):
    colat_center_rad = math.radians(90.0 - abs(LAT_CENTER_DEG))
    rho_center = 2.0 * R_MOON_M * math.tan(colat_center_rad / 2.0)
    lon_center_rad = math.radians(LON_CENTER_DEG)

    x_center = rho_center * math.sin(lon_center_rad)
    y_center = -rho_center * math.cos(lon_center_rad)

    dx_m = (c - shape[1] / 2.0) * res_m
    dy_m = (shape[0] / 2.0 - r) * res_m

    x_proj = x_center + dx_m
    y_proj = y_center + dy_m

    rho = math.hypot(x_proj, y_proj)
    if rho == 0.0:
        return -90.0, 0.0

    colat_rad = 2.0 * math.atan(rho / (2.0 * R_MOON_M))
    lat_deg = -(90.0 - math.degrees(colat_rad))
    lon_deg = (math.degrees(math.atan2(x_proj, -y_proj))) % 360.0
    return lat_deg, lon_deg

base_illum_est = static_illum_map if static_illum_map is not None else (annual_sun_hits / 12.0 * 100.0)
safe_pad = binary_erosion((slope_deg <= MAX_SAFE_SLOPE_DEG) & (~psr_mask), structure=np.ones((5, 5), dtype=bool))
if np.count_nonzero(safe_pad) < 40:
    safe_pad = (slope_deg <= MAX_SAFE_SLOPE_DEG) & (~psr_mask)

norm_slope_init = np.clip((MAX_SAFE_SLOPE_DEG - slope_deg) / MAX_SAFE_SLOPE_DEG, 0.0, 1.0)
init_score = uniform_filter((0.55 * norm_slope_init + 0.45 * (base_illum_est / 100.0)) * safe_pad, size=5)
score_search = init_score.copy()
edge_m = max(25, int(min(elevation_m.shape) * 0.08))
score_search[:edge_m, :] = 0.0; score_search[-edge_m:, :] = 0.0
score_search[:, :edge_m] = 0.0; score_search[:, -edge_m:] = 0.0

min_sep_px = max(35, int(min(elevation_m.shape) * 0.11))
candidates = []
for _ in range(3):
    idx = np.unravel_index(np.argmax(score_search), score_search.shape)
    candidates.append(idx)
    r_c, c_c = idx
    score_search[max(0, r_c-min_sep_px):min(score_search.shape[0], r_c+min_sep_px),
                 max(0, c_c-min_sep_px):min(score_search.shape[1], c_c+min_sep_px)] = 0.0

site_keys   = ["ALPHA", "BETA", "GAMMA"]
site_labels = ["Site Alpha", "Site Beta", "Site Gamma"]
colors_pin  = ["#ff4d4d", "#00e5ff", "#facc15"]

site_profiles = []
for i, (r, c) in enumerate(candidates):
    az_g, hor_g = compute_360_horizon_profile(elevation_smooth, r, c)
    lat_v, lon_v = pixel_to_lunar_polar_coords(r, c, elevation_m.shape)
    psr_km = distance_to_nearest_psr_km(r, c)
    site_profiles.append({
        "key": site_keys[i],
        "label": site_labels[i],
        "r": int(r), "c": int(c),
        "lat": lat_v, "lon": lon_v,
        "elev": float(elevation_m[r, c]),
        "slope": float(slope_deg[r, c]),
        "psr_km": psr_km,
        "az_grid": az_g,
        "horizon_deg": hor_g
    })

def evaluate_site_on_epoch(site_info, dt_utc, forecast_days=14):
    ep = compute_lunar_ephemeris(dt_utc, site_info["lat"], site_info["lon"])
    hor = site_info["horizon_deg"]

    h_sun = float(hor[int(round(ep["sun_az"])) % 360])
    h_earth = float(hor[int(round(ep["earth_az"])) % 360])

    sun_margin = ep["sun_elev"] - h_sun
    earth_margin = ep["earth_elev"] - h_earth

    n_steps = forecast_days * 8
    t_hours = np.arange(n_steps) * 3.0
    sun_el_series = np.zeros(n_steps)
    sun_hor_series = np.zeros(n_steps)
    earth_el_series = np.zeros(n_steps)
    earth_hor_series = np.zeros(n_steps)
    temp_series = np.zeros(n_steps)

    shadow_hrs = 0.0
    for k in range(n_steps):
        tk = dt_utc + timedelta(hours=float(t_hours[k]))
        ep_k = compute_lunar_ephemeris(tk, site_info["lat"], site_info["lon"])
        sun_el_series[k] = ep_k["sun_elev"]
        sun_hor_series[k] = hor[int(round(ep_k["sun_az"])) % 360]
        earth_el_series[k] = ep_k["earth_elev"]
        earth_hor_series[k] = hor[int(round(ep_k["earth_az"])) % 360]

        lit_k = sun_el_series[k] > sun_hor_series[k]
        shadow_hrs = 0.0 if lit_k else (shadow_hrs + 3.0)
        temp_series[k] = diviner_surface_temp_k(sun_el_series[k], lit_k, shadow_hrs)

    sun_visible_14d = sun_el_series > sun_hor_series
    dte_visible_14d = earth_el_series > earth_hor_series

    solar_cont_pct = float(np.mean(sun_visible_14d) * 100.0)
    dte_cont_pct = float(np.mean(dte_visible_14d) * 100.0)
    est_temp_k = float(np.mean(temp_series))

    reasons = []
    if site_info["slope"] > MAX_SAFE_SLOPE_DEG:
        reasons.append(f"Lereng Terjal ({site_info['slope']:.2f}°)")
    if sun_margin < MIN_SUN_MARGIN_DEG:
        reasons.append(f"Matahari Terhalang ({sun_margin:+.1f}°)")
    if earth_margin < MIN_EARTH_MARGIN_DEG:
        reasons.append(f"Sinyal DTE Terhalang ({earth_margin:+.1f}°)")
    if solar_cont_pct < MIN_SOLAR_CONT_PCT:
        reasons.append(f"Daya Surya 14h Rendah ({solar_cont_pct:.0f}%)")
    if dte_cont_pct < MIN_DTE_CONT_PCT:
        reasons.append(f"Sinyal DTE 14h Rendah ({dte_cont_pct:.0f}%)")

    is_go = len(reasons) == 0
    score_100 = (
        0.25 * np.clip((MAX_SAFE_SLOPE_DEG - site_info["slope"]) / MAX_SAFE_SLOPE_DEG, 0.0, 1.0) +
        0.20 * np.clip((sun_margin + 1.0) / 5.0, 0.0, 1.0) +
        0.20 * np.clip((earth_margin + 1.0) / 8.0, 0.0, 1.0) +
        0.20 * (solar_cont_pct / 100.0) +
        0.15 * (dte_cont_pct / 100.0)
    ) * 100.0

    return {
        "ep": ep,
        "h_sun": h_sun,
        "h_earth": h_earth,
        "sun_margin": sun_margin,
        "earth_margin": earth_margin,
        "solar_cont_pct": solar_cont_pct,
        "dte_cont_pct": dte_cont_pct,
        "est_temp_k": est_temp_k,
        "is_go": is_go,
        "reasons": reasons,
        "score_100": float(score_100),
        "t_days": t_hours / 24.0,
        "sun_el_series": sun_el_series,
        "sun_hor_series": sun_hor_series,
        "earth_el_series": earth_el_series,
        "earth_hor_series": earth_hor_series
    }

def find_best_mission_hour(site_info):
    best_h = 0
    best_sc = -1.0
    for h in range(0, 30 * 24, 6):
        ev = evaluate_site_on_epoch(site_info, BASE_EPOCH_UTC + timedelta(hours=h))
        sc = ev["score_100"] + (15.0 if ev["is_go"] else 0.0)
        if sc > best_sc:
            best_sc = sc
            best_h = h
    return best_h

optimal_hour_offset = find_best_mission_hour(site_profiles[0])

# =====================================================================
# 6. STATE INTERAKTIF & PERHITUNGAN DINAMIS PETA SPASIAL
# =====================================================================
state = {
    "hour_offset": float(optimal_hour_offset),
    "site_idx": 0,
    "layer": "MCDA",
    "is_3d": False,
    "custom_pt": None
}

ls_terrain = LightSource(azdeg=315, altdeg=35)
hillshade_norm = ls_terrain.hillshade(elevation_smooth, vert_exag=2.0, dx=PIXEL_RES_M, dy=PIXEL_RES_M)

def compute_maps_for_epoch(dt_utc):
    ep = compute_lunar_ephemeris(dt_utc, LAT_CENTER_DEG, LON_CENTER_DEG)
    solar_vis = compute_directional_los_fast(elevation_smooth, ep["sun_az"], ep["sun_elev"], PIXEL_RES_M)
    dte_vis   = compute_directional_los_fast(elevation_smooth, ep["earth_az"], ep["earth_elev"], PIXEL_RES_M)

    norm_s = np.clip((MAX_SAFE_SLOPE_DEG - slope_deg) / MAX_SAFE_SLOPE_DEG, 0.0, 1.0)
    mcda = (0.40 * norm_s + 0.35 * (solar_vis / 100.0) + 0.25 * (dte_vis / 100.0))
    mcda[(slope_deg > MAX_SAFE_SLOPE_DEG) | psr_mask] = 0.0
    mcda = uniform_filter(mcda, size=3)
    return ep, solar_vis, dte_vis, mcda

cur_dt = BASE_EPOCH_UTC + timedelta(hours=state["hour_offset"])
cur_ep, cur_solar_map, cur_dte_map, cur_mcda_map = compute_maps_for_epoch(cur_dt)

def export_mission_state(dt_utc):
    sel_site = site_profiles[state["site_idx"]]
    ev = evaluate_site_on_epoch(sel_site, dt_utc)
    payload = {
        "ephemeris_source": EPHEMERIS_SOURCE_LABEL,
        "dem_source": dem_source_tag,
        "selected_site": sel_site["key"],
        "base_date_iso": BASE_EPOCH_UTC.isoformat(),
        "optimal_hour_offset": int(round(state["hour_offset"])),
        "target_utc": dt_utc.isoformat(),
        "go_status": "GO" if ev["is_go"] else "NO-GO",
        "sites": {
            sp["key"]: {
                "name": f"{sp['label']} (Mons Mouton)",
                "lat": round(sp["lat"], 4),
                "lon": round(sp["lon"], 4),
                "elev": round(sp["elev"], 1),
                "slope": round(sp["slope"], 2),
                "psr_km": round(sp["psr_km"], 2)
            }
            for sp in site_profiles
        }
    }
    with open(os.path.join("output", "mission_state.json"), "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2)

export_mission_state(cur_dt)

# =====================================================================
# 7. DASHBOARD MISSION CONTROL (TATA LETAK RAPI & BEBAS BERTUMPUK)
# =====================================================================
plt.rcParams["toolbar"] = "None"
fig = plt.figure(figsize=(16.6, 9.5), facecolor="#070b14")
fig.canvas.manager.set_window_title("XSasuai - Lunar Landing Site Navigator (NASA LRO + JPL Horizons)")

# Label Kategori Menu Atas
fig.text(0.022, 0.968, "1. LAPISAN DATA PETA", color="#94a3b8", fontsize=7.5, fontweight="bold")
fig.text(0.455, 0.968, "2. KANDIDAT LOKASI",   color="#94a3b8", fontsize=7.5, fontweight="bold")
fig.text(0.715, 0.968, "3. KONTROL VIEW",      color="#94a3b8", fontsize=7.5, fontweight="bold")

# Panel Kiri: Peta Spasial 2D & 3D
ax_map  = fig.add_axes([0.022, 0.130, 0.515, 0.750], facecolor="#05070c")
ax_3d   = fig.add_axes([0.022, 0.130, 0.515, 0.750], projection="3d", facecolor="#05070c")
ax_3d.set_visible(False)
ax_cbar = fig.add_axes([0.542, 0.130, 0.011, 0.750])

# Panel Kanan (3 Kartu dengan Jarak Vertikal Lega)
ax_hor = fig.add_axes([0.595, 0.650, 0.385, 0.200], facecolor="#060a14")
ax_tl  = fig.add_axes([0.595, 0.390, 0.385, 0.175], facecolor="#060a14")
ax_tbl = fig.add_axes([0.595, 0.130, 0.385, 0.195], facecolor="#070b14")
ax_tbl.axis("off")

# Lencana Keputusan GO/NO-GO di Pojok Kiri Atas Peta (berlaku untuk 2D & 3D)
verdict_badge = fig.text(
    0.032, 0.858,
    "● GO FOR LANDING",
    color="#ecfdf5", fontsize=9.2, fontweight="bold", ha="left", va="top",
    bbox=dict(boxstyle="round,pad=0.45", facecolor="#065f46", edgecolor="#10b981", alpha=0.95, linewidth=1.6),
    zorder=20
)

img_plot = ax_map.imshow(cur_mcda_map, cmap="viridis", vmin=0.0, vmax=max(0.1, float(np.max(cur_mcda_map))), origin="upper")
ax_map.imshow(hillshade_norm, cmap="gray", alpha=0.22, origin="upper", zorder=2)

cbar = fig.colorbar(img_plot, cax=ax_cbar)
cbar.ax.yaxis.set_tick_params(color="#cbd5e1")
plt.setp(plt.getp(cbar.ax.axes, "yticklabels"), color="#cbd5e1", fontsize=8)

offsets_radial = [(-92, -42), (92, -42), (0, 54)]
for i, sp in enumerate(site_profiles):
    r, c = sp["r"], sp["c"]
    ax_map.scatter(c, r, s=195, edgecolors=colors_pin[i], facecolors="none", linewidth=2.4, zorder=6)
    ax_map.scatter(c, r, color=colors_pin[i], marker="+", s=80, zorder=6)
    dx_o, dy_o = offsets_radial[i]
    ax_map.annotate(
        f"{sp['label']}\n({abs(sp['lat']):.2f}°S, {sp['lon']:.2f}°E)",
        xy=(c, r), xytext=(c + dx_o, r + dy_o),
        color="white", fontweight="bold", fontsize=8.0, ha="center", va="center",
        bbox=dict(boxstyle="round,pad=0.3", facecolor="#090d16", edgecolor=colors_pin[i], alpha=0.93, linewidth=1.4),
        arrowprops=dict(arrowstyle="->", color=colors_pin[i], lw=1.4),
        zorder=7
    )

custom_marker, = ax_map.plot([], [], marker="x", markersize=10, markeredgewidth=2.2, color="#a855f7", zorder=9)
ax_map.axis("off")
map_title = ax_map.set_title("", color="white", fontsize=10.2, fontweight="bold", pad=10)

hover_box = ax_map.text(
    0.02, 0.022,
    "Arahkan kursor ke peta untuk membaca telemetri | Klik titik mana saja untuk inspeksi ufuk 360°",
    transform=ax_map.transAxes, color="#f1f5f9", fontsize=8.0, fontfamily="monospace",
    va="bottom", ha="left",
    bbox=dict(boxstyle="round,pad=0.4", facecolor="#090d16", edgecolor="#388bfd", alpha=0.92, linewidth=1.2),
    zorder=10
)

step_3d = max(2, elevation_m.shape[0] // 125)
x_g = np.arange(0, elevation_m.shape[1], step_3d)
y_g = np.arange(0, elevation_m.shape[0], step_3d)
X_3d, Y_3d = np.meshgrid(x_g, y_g)
Z_3d = elevation_smooth[::step_3d, ::step_3d]
hs_3d = hillshade_norm[::step_3d, ::step_3d]
orig_xlim3d = (0, elevation_m.shape[1])
orig_ylim3d = (0, elevation_m.shape[0])
orig_zlim3d = (float(np.min(elevation_smooth)) - 200.0, float(np.max(elevation_smooth)) + 1200.0)

def get_active_layer_spec():
    lk = state["layer"]
    if lk == "MCDA":
        return cur_mcda_map, "viridis", 0.0, max(0.1, float(np.max(cur_mcda_map))), "Lapisan 1: Zona Kelayakan Terpadu (MCDA)"
    elif lk == "DEM":
        return elevation_smooth, "bone", 2000.0, 6000.0, "Lapisan 2: Topografi Elevasi (NASA LOLA DEM)"
    elif lk == "SLOPE":
        return slope_deg, "turbo", 0.0, slope_vmax, f"Lapisan 3: Kemiringan Lereng (Batas Aman <= {MAX_SAFE_SLOPE_DEG}°)"
    elif lk == "SOLAR":
        return cur_solar_map, "cividis", 0.0, 100.0, f"Lapisan 4: Penyinaran Surya (Az {cur_ep['sun_az']:.1f}°, El {cur_ep['sun_elev']:+.2f}°)"
    else:
        return cur_dte_map, "magma", 0.0, 100.0, f"Lapisan 5: Jalur Komunikasi Bumi DTE (Az {cur_ep['earth_az']:.1f}°, El {cur_ep['earth_elev']:+.2f}°)"

def draw_3d_view(preserve_zoom=False):
    cur_x = ax_3d.get_xlim3d() if preserve_zoom else orig_xlim3d
    cur_y = ax_3d.get_ylim3d() if preserve_zoom else orig_ylim3d
    cur_z = ax_3d.get_zlim3d() if preserve_zoom else orig_zlim3d
    cur_elev = ax_3d.elev if preserve_zoom else 44
    cur_azim = ax_3d.azim if preserve_zoom else -60

    ax_3d.cla()
    ax_3d.set_facecolor("#05070c")
    data_2d, cmap_name, vmin, vmax, title_str = get_active_layer_spec()
    c_sub = data_2d[::step_3d, ::step_3d]
    fcols = plt.colormaps[cmap_name](Normalize(vmin=vmin, vmax=vmax)(c_sub))
    shade_factor = 0.65 + 0.45 * hs_3d[..., np.newaxis]
    fcols[..., :3] = np.clip(fcols[..., :3] * shade_factor, 0.0, 1.0)

    ax_3d.plot_surface(X_3d, Y_3d, Z_3d, facecolors=fcols, rstride=1, cstride=1,
                       linewidth=0, antialiased=True, shade=False, alpha=0.97)

    stagger = [600, 1100, 1600]
    for i, sp in enumerate(site_profiles):
        r, c, sz = sp["r"], sp["c"], sp["elev"]
        hs = stagger[i]
        ax_3d.plot([c, c], [r, r], [sz, sz + hs], color=colors_pin[i], lw=2.4, zorder=10)
        ax_3d.scatter([c], [r], [sz + hs], color=colors_pin[i], edgecolors="white", s=75, depthshade=False, zorder=11)
        ax_3d.text(c, r, sz + hs + 170, f"{sp['label']}\n({sz:.0f}m)", color="white",
                   fontsize=7.8, fontweight="bold", ha="center",
                   bbox=dict(boxstyle="round,pad=0.25", facecolor="#090d16", edgecolor=colors_pin[i], alpha=0.92))

    ax_3d.set_box_aspect([1, 1, 0.36])
    ax_3d.dist = 8.2
    ax_3d.view_init(elev=cur_elev, azim=cur_azim)
    ax_3d.set_xlim3d(cur_x); ax_3d.set_ylim3d(cur_y); ax_3d.set_zlim3d(cur_z)
    ax_3d.axis("off")
    ax_3d.set_title(f"TAMPILAN 3D | {title_str}", color="white", fontsize=10.2, fontweight="bold", pad=10)

# =====================================================================
# 8. RENDER PANEL KANAN (LOCAL HORIZON + 14-DAY TIMELINE + TABEL VISUAL)
# =====================================================================
def refresh_all_panels(recompute_maps=True, preserve_3d=True):
    global cur_dt, cur_ep, cur_solar_map, cur_dte_map, cur_mcda_map
    cur_dt = BASE_EPOCH_UTC + timedelta(hours=float(state["hour_offset"]))

    if recompute_maps:
        cur_ep, cur_solar_map, cur_dte_map, cur_mcda_map = compute_maps_for_epoch(cur_dt)
        export_mission_state(cur_dt)

    data_2d, cmap_name, vmin, vmax, title_str = get_active_layer_spec()
    img_plot.set_data(data_2d)
    img_plot.set_cmap(cmap_name)
    img_plot.set_clim(vmin, vmax)
    map_title.set_text(f"{title_str}  •  {cur_dt.strftime('%d %b %Y %H:%M UTC')}")
    if state["is_3d"]:
        draw_3d_view(preserve_zoom=preserve_3d)

    if state["custom_pt"] is not None:
        cr, cc = state["custom_pt"]
        az_g, hor_g = compute_360_horizon_profile(elevation_smooth, cr, cc)
        lat_v, lon_v = pixel_to_lunar_polar_coords(cr, cc, elevation_m.shape)
        active_site = {
            "key": "CUSTOM", "label": f"Titik Pilihan [{cc},{cr}]",
            "r": cr, "c": cc, "lat": lat_v, "lon": lon_v,
            "elev": float(elevation_m[cr, cc]), "slope": float(slope_deg[cr, cc]),
            "psr_km": distance_to_nearest_psr_km(cr, cc),
            "az_grid": az_g, "horizon_deg": hor_g
        }
        custom_marker.set_data([cc], [cr])
    else:
        active_site = site_profiles[state["site_idx"]]
        custom_marker.set_data([], [])

    ev_active = evaluate_site_on_epoch(active_site, cur_dt)
    ep = ev_active["ep"]

    # Update Lencana Keputusan Instan di Pojok Kiri Atas Peta
    if ev_active["is_go"]:
        verdict_badge.set_text(
            f"● GO FOR LANDING  |  {active_site['label']}  •  Skor {ev_active['score_100']:.0f}/100"
        )
        verdict_badge.get_bbox_patch().set_facecolor("#065f46")
        verdict_badge.get_bbox_patch().set_edgecolor("#10b981")
    else:
        verdict_badge.set_text(
            f"▲ NO-GO  |  {active_site['label']}  •  {ev_active['reasons'][0]}"
        )
        verdict_badge.get_bbox_patch().set_facecolor("#7f1d1d")
        verdict_badge.get_bbox_patch().set_edgecolor("#ef4444")

    # -----------------------------------------------------------------
    # KARTU 1: LOCAL HORIZON VIEW (360° SKYLINE) — LEGENDA DI LUAR GRAFIK
    # -----------------------------------------------------------------
    ax_hor.cla()
    ax_hor.set_facecolor("#060a14")
    az = active_site["az_grid"]
    hor = active_site["horizon_deg"]

    ax_hor.fill_between(az, -10.0, hor, color="#1e293b", alpha=0.95, label="Kontur Bukit (LOLA)")
    ax_hor.plot(az, hor, color="#64748b", lw=1.3)
    ax_hor.axhline(0.0, color="#334155", ls="--", lw=0.8)

    sun_track_az, sun_track_el = [], []
    for dh in range(-12, 13, 2):
        ep_t = compute_lunar_ephemeris(cur_dt + timedelta(hours=dh), active_site["lat"], active_site["lon"])
        sun_track_az.append(ep_t["sun_az"]); sun_track_el.append(ep_t["sun_elev"])
    ax_hor.scatter(sun_track_az, sun_track_el, s=7, color="#fbbf24", alpha=0.4)

    lib_az, lib_el = [], []
    for dd in range(0, 28, 1):
        ep_l = compute_lunar_ephemeris(cur_dt + timedelta(days=dd), active_site["lat"], active_site["lon"])
        lib_az.append(ep_l["earth_az"]); lib_el.append(ep_l["earth_elev"])
    ax_hor.plot(lib_az, lib_el, color="#38bdf8", ls=":", lw=1.2, alpha=0.8, label="Librasi Bumi (28h)")

    sun_col = "#facc15" if ev_active["sun_margin"] > 0 else "#ef4444"
    earth_col = "#10b981" if ev_active["earth_margin"] >= MIN_EARTH_MARGIN_DEG else "#f97316"
    ax_hor.scatter([ep["sun_az"]], [ep["sun_elev"]], s=130, color=sun_col, edgecolors="white", zorder=8,
                   label=f"Matahari ({ep['sun_elev']:+.1f}°)")
    ax_hor.scatter([ep["earth_az"]], [ep["earth_elev"]], s=105, marker="D", color=earth_col, edgecolors="white", zorder=8,
                   label=f"Bumi DTE ({ep['earth_elev']:+.1f}°)")

    ax_hor.annotate(f"Matahari\n{ep['sun_elev']:+.1f}°", (ep["sun_az"], ep["sun_elev"]),
                    xytext=(8, 6), textcoords="offset points", color="#fde047", fontsize=7.3, fontweight="bold")
    ax_hor.annotate(f"Bumi\n{ep['earth_elev']:+.1f}°", (ep["earth_az"], ep["earth_elev"]),
                    xytext=(-34, 6), textcoords="offset points", color="#7dd3fc", fontsize=7.3, fontweight="bold")

    ax_hor.set_xlim(0, 360)
    ax_hor.set_xticks([0, 90, 180, 270, 360])
    ax_hor.set_xticklabels(["0° (Utara)", "90° (Timur)", "180° (Selatan)", "270° (Barat)", "360°"], color="#cbd5e1", fontsize=7.8)
    y_min_h = min(-5.0, float(np.min(hor)) - 1.0, ep["sun_elev"] - 1.5, ep["earth_elev"] - 1.5)
    y_max_h = max(12.0, float(np.max(hor)) + 2.5, ep["sun_elev"] + 3.0, ep["earth_elev"] + 3.0)
    ax_hor.set_ylim(y_min_h, y_max_h)
    ax_hor.tick_params(axis="y", colors="#cbd5e1", labelsize=7.8)
    ax_hor.set_ylabel("Elevasi (°)", color="#cbd5e1", fontsize=8.0)
    ax_hor.grid(True, color="#1e293b", lw=0.6)
    ax_hor.legend(loc="lower center", bbox_to_anchor=(0.5, 1.01), ncol=4, frameon=False,
                  fontsize=7.1, labelcolor="#e2e8f0", handletextpad=0.3, columnspacing=0.8)
    ax_hor.set_title(f"PANORAMA UFUK 360° (LOCAL HORIZON VIEW) — {active_site['label']}",
                     color="#38bdf8", fontsize=9.4, fontweight="bold", pad=22)

    # -----------------------------------------------------------------
    # KARTU 2: PRAKIRAAN OPERASI 14 HARI PASCA-PENDARATAN
    # -----------------------------------------------------------------
    ax_tl.cla()
    ax_tl.set_facecolor("#060a14")
    td = ev_active["t_days"]
    sun_m_series = ev_active["sun_el_series"] - ev_active["sun_hor_series"]
    earth_m_series = ev_active["earth_el_series"] - ev_active["earth_hor_series"]

    ax_tl.plot(td, sun_m_series, color="#facc15", lw=1.8, label="Margin Matahari (Daya)")
    ax_tl.plot(td, earth_m_series, color="#38bdf8", lw=1.8, label="Margin Bumi (Sinyal DTE)")
    ax_tl.axhline(0.0, color="#ef4444", ls="--", lw=1.0, label="Batas Terhalang Bukit (0°)")
    ax_tl.fill_between(td, 0.0, np.maximum(0.0, sun_m_series), color="#facc15", alpha=0.14)
    ax_tl.fill_between(td, 0.0, np.maximum(0.0, earth_m_series), color="#38bdf8", alpha=0.12)

    ax_tl.set_xlim(0, 14)
    ax_tl.tick_params(colors="#cbd5e1", labelsize=7.8)
    ax_tl.set_xlabel("Hari Setelah Pendaratan (0–14 Hari)", color="#94a3b8", fontsize=8.0, labelpad=4)
    ax_tl.set_ylabel("Margin (°)", color="#cbd5e1", fontsize=8.0)
    ax_tl.grid(True, color="#1e293b", lw=0.6)
    ax_tl.legend(loc="upper right", fontsize=7.0, facecolor="#0b1120", edgecolor="#334155", labelcolor="white")
    ax_tl.set_title(
        f"PRAKIRAAN 14 HARI: Surya {ev_active['solar_cont_pct']:.0f}%  •  Sinyal DTE {ev_active['dte_cont_pct']:.0f}%  •  Suhu ≈ {ev_active['est_temp_k']:.0f} K",
        color="#f8fafc", fontsize=9.0, fontweight="bold", pad=6
    )

    # -----------------------------------------------------------------
    # KARTU 3: TABEL VISUAL PERBANDINGAN KANDIDAT & STATUS GO / NO-GO
    # -----------------------------------------------------------------
    ax_tbl.cla()
    ax_tbl.axis("off")
    ax_tbl.set_title(
        f"PERBANDINGAN KANDIDAT LOKASI ({cur_dt.strftime('%d %b %Y %H:%M UTC')})",
        color="#cbd5e1", fontsize=8.8, fontweight="bold", loc="left", pad=4
    )

    col_labels = ["Kandidat", "Lereng", "Jarak PSR", "Margin Surya", "Margin DTE", "14h Pwr/DTE", "Keputusan"]
    rows_data = []
    row_sites = list(site_profiles)
    if state["custom_pt"] is not None:
        row_sites.append(active_site)

    evals_all = [evaluate_site_on_epoch(sp, cur_dt) for sp in row_sites]
    for i, sp in enumerate(row_sites):
        ev = evals_all[i]
        is_selected = (state["custom_pt"] is None and state["site_idx"] == i) or (state["custom_pt"] is not None and i == len(row_sites) - 1)
        prefix = "▶ " if is_selected else "   "
        status_txt = f"GO ({ev['score_100']:.0f}%)" if ev["is_go"] else "NO-GO"
        rows_data.append([
            f"{prefix}{sp['label']}",
            f"{sp['slope']:.2f}°",
            f"{sp['psr_km']:.1f} km",
            f"{ev['sun_margin']:+.1f}°",
            f"{ev['earth_margin']:+.1f}°",
            f"{ev['solar_cont_pct']:.0f}% / {ev['dte_cont_pct']:.0f}%",
            status_txt
        ])

    tbl = ax_tbl.table(
        cellText=rows_data,
        colLabels=col_labels,
        loc="center",
        cellLoc="center",
        bbox=[0.0, 0.0, 1.0, 0.92]
    )
    tbl.auto_set_font_size(False)
    tbl.set_fontsize(7.7)

    col_widths = [0.20, 0.11, 0.12, 0.13, 0.12, 0.16, 0.16]
    for (r_idx, c_idx), cell in tbl.get_celld().items():
        cell.set_width(col_widths[c_idx])
        cell.set_edgecolor("#1e293b")
        cell.set_linewidth(0.8)
        if r_idx == 0:
            cell.set_facecolor("#1e293b")
            cell.get_text().set_color("#f8fafc")
            cell.get_text().set_weight("bold")
        else:
            ev_row = evals_all[r_idx - 1]
            is_sel = (state["custom_pt"] is None and state["site_idx"] == (r_idx - 1)) or (state["custom_pt"] is not None and r_idx == len(row_sites))
            if c_idx == 6:
                cell.set_facecolor("#065f46" if ev_row["is_go"] else "#7f1d1d")
                cell.get_text().set_color("#ecfdf5" if ev_row["is_go"] else "#fee2e2")
                cell.get_text().set_weight("bold")
            else:
                cell.set_facecolor("#0f2942" if is_sel else ("#0b1120" if r_idx % 2 == 1 else "#0f172a"))
                cell.get_text().set_color("#38bdf8" if (is_sel and c_idx == 0) else "#e2e8f0")
                if is_sel and c_idx == 0:
                    cell.get_text().set_weight("bold")

    # Update teks waktu pada slider bawah
    date_slider.valtext.set_text(cur_dt.strftime("%d %b %Y • %H:%M UTC"))
    fig.canvas.draw_idle()

# =====================================================================
# 9. KONTROL INTERAKTIF (SLIDER TANGGAL + BILAH NAVIGASI RAPI)
# =====================================================================
ax_slider = fig.add_axes([0.135, 0.056, 0.445, 0.028], facecolor="#1e293b")
date_slider = Slider(
    ax=ax_slider,
    label="Waktu Misi UTC ",
    valmin=0.0,
    valmax=30.0 * 24.0,
    valinit=float(optimal_hour_offset),
    valstep=1.0,
    color="#0284c7"
)
date_slider.label.set_color("white")
date_slider.label.set_fontsize(8.6)
date_slider.label.set_fontweight("bold")
date_slider.valtext.set_color("#38bdf8")
date_slider.valtext.set_fontsize(8.6)
date_slider.valtext.set_fontweight("bold")

def on_slider_change(val):
    state["hour_offset"] = float(val)
    refresh_all_panels(recompute_maps=True, preserve_3d=True)

date_slider.on_changed(on_slider_change)

ax_b_dprev = fig.add_axes([0.735, 0.052, 0.068, 0.036])
ax_b_dnext = fig.add_axes([0.808, 0.052, 0.068, 0.036])
ax_b_opt   = fig.add_axes([0.882, 0.052, 0.098, 0.036])

b_dprev = Button(ax_b_dprev, "◀ -1 Hari", color="#1e293b", hovercolor="#3b82f6")
b_dnext = Button(ax_b_dnext, "+1 Hari ▶", color="#1e293b", hovercolor="#3b82f6")
b_opt   = Button(ax_b_opt,   "★ TGL OPTIMAL", color="#059669", hovercolor="#10b981")

for b in (b_dprev, b_dnext, b_opt):
    b.label.set_color("white"); b.label.set_fontsize(8.0); b.label.set_fontweight("bold")

def shift_hours(delta_h):
    new_h = float(np.clip(state["hour_offset"] + delta_h, 0.0, 30.0 * 24.0))
    date_slider.set_val(new_h)

def jump_optimal_date(event=None):
    best_h = find_best_mission_hour(site_profiles[state["site_idx"]])
    date_slider.set_val(float(best_h))

b_dprev.on_clicked(lambda e: shift_hours(-24.0))
b_dnext.on_clicked(lambda e: shift_hours(+24.0))
b_opt.on_clicked(jump_optimal_date)

# Tombol Header Atas Terkelompok
btn_st = dict(color="#1e293b", hovercolor="#3b82f6")
btn_ac = dict(color="#0284c7", hovercolor="#38bdf8")

# Kelompok 1: Lapisan Peta
ax_b_mcda  = fig.add_axes([0.022, 0.922, 0.084, 0.038])
ax_b_dem   = fig.add_axes([0.110, 0.922, 0.076, 0.038])
ax_b_slope = fig.add_axes([0.190, 0.922, 0.076, 0.038])
ax_b_solar = fig.add_axes([0.270, 0.922, 0.076, 0.038])
ax_b_los   = fig.add_axes([0.350, 0.922, 0.084, 0.038])

# Kelompok 2: Kandidat Lokasi
ax_b_sa    = fig.add_axes([0.455, 0.922, 0.078, 0.038])
ax_b_sb    = fig.add_axes([0.537, 0.922, 0.078, 0.038])
ax_b_sg    = fig.add_axes([0.619, 0.922, 0.078, 0.038])

# Kelompok 3: Kontrol View
ax_b_3d    = fig.add_axes([0.715, 0.922, 0.095, 0.038])
ax_b_zin   = fig.add_axes([0.815, 0.922, 0.036, 0.038])
ax_b_zout  = fig.add_axes([0.855, 0.922, 0.036, 0.038])
ax_b_rst   = fig.add_axes([0.896, 0.922, 0.084, 0.038])

b_mcda  = Button(ax_b_mcda,  "Kelayakan (1)", **btn_ac)
b_dem   = Button(ax_b_dem,   "Elevasi (2)",   **btn_st)
b_slope = Button(ax_b_slope, "Lereng (3)",    **btn_st)
b_solar = Button(ax_b_solar, "Surya (4)",     **btn_st)
b_los   = Button(ax_b_los,   "Sinyal DTE (5)",**btn_st)

b_sa    = Button(ax_b_sa,    "Site Alpha",    **btn_ac)
b_sb    = Button(ax_b_sb,    "Site Beta",     **btn_st)
b_sg    = Button(ax_b_sg,    "Site Gamma",    **btn_st)

b_3d    = Button(ax_b_3d,    "Mode 3D (T)",   color="#6366f1", hovercolor="#818cf8")
b_zin   = Button(ax_b_zin,   "+",             **btn_st)
b_zout  = Button(ax_b_zout,  "-",             **btn_st)
b_rst   = Button(ax_b_rst,   "Reset (R)",     **btn_st)

layer_btns = {"MCDA": b_mcda, "DEM": b_dem, "SLOPE": b_slope, "SOLAR": b_solar, "LOS": b_los}
site_btns  = [b_sa, b_sb, b_sg]

for b in [b_mcda, b_dem, b_slope, b_solar, b_los, b_sa, b_sb, b_sg, b_3d, b_zin, b_zout, b_rst]:
    b.label.set_color("white"); b.label.set_fontsize(7.7); b.label.set_fontweight("bold")

def switch_layer(lk):
    state["layer"] = lk
    for k, btn in layer_btns.items():
        btn.color = "#0284c7" if k == lk else "#1e293b"
    refresh_all_panels(recompute_maps=False, preserve_3d=True)

b_mcda.on_clicked(lambda e: switch_layer("MCDA"))
b_dem.on_clicked(lambda e: switch_layer("DEM"))
b_slope.on_clicked(lambda e: switch_layer("SLOPE"))
b_solar.on_clicked(lambda e: switch_layer("SOLAR"))
b_los.on_clicked(lambda e: switch_layer("LOS"))

def select_site(idx):
    state["site_idx"] = idx
    state["custom_pt"] = None
    for i, btn in enumerate(site_btns):
        btn.color = "#0284c7" if i == idx else "#1e293b"
    r, c = site_profiles[idx]["r"], site_profiles[idx]["c"]
    span = max(55, int(min(elevation_m.shape) * 0.16))
    if not state["is_3d"]:
        ax_map.set_xlim([c - span, c + span])
        ax_map.set_ylim([r + span, r - span])
    else:
        sz = site_profiles[idx]["elev"]
        ax_3d.set_xlim3d([c - span, c + span])
        ax_3d.set_ylim3d([r - span, r + span])
        ax_3d.set_zlim3d([sz - 300, sz + 1700])
    export_mission_state(cur_dt)
    refresh_all_panels(recompute_maps=False, preserve_3d=True)

b_sa.on_clicked(lambda e: select_site(0))
b_sb.on_clicked(lambda e: select_site(1))
b_sg.on_clicked(lambda e: select_site(2))

def toggle_3d(event=None):
    state["is_3d"] = not state["is_3d"]
    if state["is_3d"]:
        ax_map.set_visible(False); ax_cbar.set_visible(False); ax_3d.set_visible(True)
        b_3d.label.set_text("Mode 2D (T)"); b_3d.color = "#10b981"
        draw_3d_view(preserve_zoom=False)
    else:
        ax_3d.set_visible(False); ax_map.set_visible(True); ax_cbar.set_visible(True)
        b_3d.label.set_text("Mode 3D (T)"); b_3d.color = "#6366f1"
    fig.canvas.draw_idle()

b_3d.on_clicked(toggle_3d)

def zoom_view(factor):
    if not state["is_3d"]:
        xl, yl = ax_map.get_xlim(), ax_map.get_ylim()
        cx, cy = 0.5 * (xl[0] + xl[1]), 0.5 * (yl[0] + yl[1])
        dx, dy = 0.5 * (xl[1] - xl[0]) * factor, 0.5 * (yl[1] - yl[0]) * factor
        ax_map.set_xlim([cx - dx, cx + dx]); ax_map.set_ylim([cy - dy, cy + dy])
    else:
        xl, yl, zl = ax_3d.get_xlim3d(), ax_3d.get_ylim3d(), ax_3d.get_zlim3d()
        cx, cy, cz = 0.5*(xl[0]+xl[1]), 0.5*(yl[0]+yl[1]), 0.5*(zl[0]+zl[1])
        hx, hy, hz = 0.5*(xl[1]-xl[0])*factor, 0.5*(yl[1]-yl[0])*factor, 0.5*(zl[1]-zl[0])*factor
        if hx > 25 and hy > 25:
            ax_3d.set_xlim3d([cx - hx, cx + hx]); ax_3d.set_ylim3d([cy - hy, cy + hy]); ax_3d.set_zlim3d([cz - hz, cz + hz])
    fig.canvas.draw_idle()

b_zin.on_clicked(lambda e: zoom_view(0.72))
b_zout.on_clicked(lambda e: zoom_view(1.35))

def reset_view(event=None):
    state["custom_pt"] = None
    if not state["is_3d"]:
        ax_map.set_xlim([0, elevation_m.shape[1]]); ax_map.set_ylim([elevation_m.shape[0], 0])
    else:
        ax_3d.set_xlim3d(orig_xlim3d); ax_3d.set_ylim3d(orig_ylim3d); ax_3d.set_zlim3d(orig_zlim3d)
        ax_3d.view_init(elev=44, azim=-60)
    refresh_all_panels(recompute_maps=False, preserve_3d=True)

b_rst.on_clicked(reset_view)

drag_info = {"active": False, "moved": False, "start": (0, 0), "xl": (0, 0), "yl": (0, 0)}

def on_press(event):
    if state["is_3d"] or event.inaxes != ax_map or event.button != 1:
        return
    drag_info["active"] = True
    drag_info["moved"] = False
    drag_info["start"] = (event.x, event.y)
    drag_info["xl"] = ax_map.get_xlim()
    drag_info["yl"] = ax_map.get_ylim()

def on_release(event):
    if drag_info["active"] and not drag_info["moved"] and event.inaxes == ax_map and event.xdata is not None:
        c = int(np.clip(round(event.xdata), 0, elevation_m.shape[1] - 1))
        r = int(np.clip(round(event.ydata), 0, elevation_m.shape[0] - 1))
        state["custom_pt"] = (r, c)
        for btn in site_btns:
            btn.color = "#1e293b"
        refresh_all_panels(recompute_maps=False, preserve_3d=True)
    drag_info["active"] = False

def on_motion(event):
    if state["is_3d"] or event.inaxes != ax_map:
        return
    if drag_info["active"] and event.x is not None:
        dx_px = event.x - drag_info["start"][0]
        dy_px = event.y - drag_info["start"][1]
        if abs(dx_px) > 3 or abs(dy_px) > 3:
            drag_info["moved"] = True
        bbox = ax_map.get_window_extent()
        x_span = drag_info["xl"][1] - drag_info["xl"][0]
        y_span = drag_info["yl"][1] - drag_info["yl"][0]
        ax_map.set_xlim([drag_info["xl"][0] - dx_px * (x_span / bbox.width),
                         drag_info["xl"][1] - dx_px * (x_span / bbox.width)])
        ax_map.set_ylim([drag_info["yl"][0] - dy_px * (y_span / bbox.height),
                         drag_info["yl"][1] - dy_px * (y_span / bbox.height)])
        fig.canvas.draw_idle()

    if event.xdata is not None and event.ydata is not None:
        c = int(np.clip(event.xdata, 0, elevation_m.shape[1] - 1))
        r = int(np.clip(event.ydata, 0, elevation_m.shape[0] - 1))
        lat_c, lon_c = pixel_to_lunar_polar_coords(r, c, elevation_m.shape)
        hover_box.set_text(
            f"Koordinat: {abs(lat_c):.3f}°S, {lon_c:.3f}°E  |  Elev: {elevation_m[r,c]:.0f}m  |  Lereng: {slope_deg[r,c]:.2f}°\n"
            f"Surya: {cur_solar_map[r,c]:.0f}%  |  Sinyal DTE: {cur_dte_map[r,c]:.0f}%  |  Skor MCDA: {cur_mcda_map[r,c]:.3f}"
        )
        fig.canvas.draw_idle()

def on_scroll(event):
    target_ax = ax_3d if state["is_3d"] else ax_map
    if event.inaxes == target_ax:
        zoom_view(0.75 if event.button == "up" else 1.30)

def on_key(event):
    k = event.key.lower() if event.key else ""
    if k == "1": switch_layer("MCDA")
    elif k == "2": switch_layer("DEM")
    elif k == "3": switch_layer("SLOPE")
    elif k == "4": switch_layer("SOLAR")
    elif k == "5": switch_layer("LOS")
    elif k == "a": select_site(0)
    elif k == "b": select_site(1)
    elif k == "g": select_site(2)
    elif k == "t": toggle_3d()
    elif k in ("+", "="): zoom_view(0.72)
    elif k in ("-", "_"): zoom_view(1.35)
    elif k == "r": reset_view()
    elif k == "left": shift_hours(-6.0)
    elif k == "right": shift_hours(+6.0)

fig.canvas.mpl_connect("button_press_event", on_press)
fig.canvas.mpl_connect("button_release_event", on_release)
fig.canvas.mpl_connect("motion_notify_event", on_motion)
fig.canvas.mpl_connect("scroll_event", on_scroll)
fig.canvas.mpl_connect("key_press_event", on_key)

fig.text(
    0.50, 0.014,
    f"Sumber Data: {dem_source_tag}  •  Ephemeris: {EPHEMERIS_SOURCE_LABEL}  •  Pintasan: [1-5] Lapisan | [A/B/G] Lokasi | [T] 2D/3D | [←/→] Geser Waktu",
    color="#94a3b8", fontsize=7.8, ha="center"
)

refresh_all_panels(recompute_maps=False, preserve_3d=False)
plt.show()