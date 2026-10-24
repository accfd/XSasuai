import os
import glob
import math
import zipfile
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Button
from matplotlib.colors import Normalize
from PIL import Image
from scipy.ndimage import gaussian_filter, uniform_filter, binary_erosion

# =====================================================================
# 1. AUTO-DISCOVERY FILE DATASET NASA
# =====================================================================
os.makedirs("data", exist_ok=True)

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

if not all_images:
    print("[!] Tidak ada file citra yang ditemukan di folder 'data' maupun 'Downloads'!")
    exit()

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

print(f"[+] Menggunakan DEM Elevasi : {dem_file}")
if illum_file:
    print(f"[+] Menggunakan Data Cahaya : {illum_file}")

# =====================================================================
# 2. PENGOLAHAN TOPOGRAFI & KALIBRASI SKALA SPASIAL
# =====================================================================
raw_dem = Image.open(dem_file).convert("L")
heightmap = np.array(raw_dem, dtype=np.float32)

# Mengkalibrasi raster ke metrik elevasi datum Mons Mouton (2000m - 6000m)
elevation_m = 2000.0 + (heightmap / 255.0) * 4000.0
elevation_smooth = gaussian_filter(elevation_m, sigma=4.5)

pixel_res_m = 250.0  
dy, dx = np.gradient(elevation_smooth, pixel_res_m)
slope_deg = np.degrees(np.arctan(np.sqrt(dx**2 + dy**2)))

# Kalibrasi rentang visualisasi kemiringan secara dinamis agar tidak gelap
slope_vmax = max(0.5, float(np.percentile(slope_deg, 98)))

# =====================================================================
# 3A. PENGOLAHAN MATRIKS ILUMINASI SURYA
# =====================================================================
if illum_file and os.path.exists(illum_file):
    raw_illum = Image.open(illum_file).convert("L")
    raw_illum = raw_illum.resize((heightmap.shape[1], heightmap.shape[0]))
    illum_map = (np.array(raw_illum, dtype=np.float32) / 255.0) * 100.0
else:
    norm_elev = (elevation_smooth - np.min(elevation_smooth)) / (np.ptp(elevation_smooth) + 1e-5)
    illum_map = norm_elev * 100.0

# =====================================================================
# 3B. KALKULUS VISIBILITAS KOMUNIKASI (EARTH LINE-OF-SIGHT / DTE)
# =====================================================================
# Algoritma Fast Cumulative Maximum Raycasting (O(N) Complexity)
# Mensimulasikan pemblokiran sinyal radio akibat dinding kawah & gunung
EARTH_ELEVATION_DEG = 4.5  # Di Mons Mouton, Bumi menggantung rendah ~4.5 derajat
tan_elev = np.tan(np.radians(EARTH_ELEVATION_DEG))

r_indices = np.arange(heightmap.shape[0])
dist_to_earth_plane = r_indices * pixel_res_m
H_eff = elevation_smooth + dist_to_earth_plane[:, np.newaxis] * tan_elev

# Jika tinggi efektif titik kalah dari titik sebelumnya, berarti titik tsb berada di zona bayangan sinyal
max_H_eff = np.maximum.accumulate(H_eff, axis=0)
los_raw = np.where(H_eff >= max_H_eff - 0.5, 100.0, 0.0)
los_map = gaussian_filter(los_raw, sigma=1.0)  # Difraksi radio tepi

print("[+] Analisis Sinyal Bumi (Line-of-Sight) Berhasil Dihitung.")

# =====================================================================
# 4. MULTI-CRITERIA DECISION ANALYSIS (MCDA) 3-PARAMETER
# =====================================================================
MAX_SAFE_SLOPE = 10.0      # Batas kemiringan agar tidak terguling
MIN_SOLAR_EXPOSURE = 40.0  # Batas penyinaran agar panel surya aktif
MIN_LOS_SIGNAL = 90.0      # Batas sinyal agar komunikasi ke Bumi terjaga

slope_pass = slope_deg <= MAX_SAFE_SLOPE
illum_pass = illum_map >= MIN_SOLAR_EXPOSURE
los_pass = los_map >= MIN_LOS_SIGNAL

# Zona Aman Wajib Lulus Ketiga Parameter Keselamatan Ekstrem Ini!
raw_safe_zone = slope_pass & illum_pass & los_pass

structuring_elem = np.ones((5, 5), dtype=bool)
certified_safe_footprint = binary_erosion(raw_safe_zone, structure=structuring_elem)

if np.count_nonzero(certified_safe_footprint) < 50:
    certified_safe_footprint = raw_safe_zone  # Fallback

norm_slope = np.clip((MAX_SAFE_SLOPE - slope_deg) / MAX_SAFE_SLOPE, 0.0, 1.0)
norm_illum = np.clip(illum_map / 100.0, 0.0, 1.0)
norm_los = np.clip(los_map / 100.0, 0.0, 1.0)

# Pembobotan Skor Kelayakan Akhir
suitability = (norm_slope * 0.40) + (norm_illum * 0.30) + (norm_los * 0.30)
suitability[~certified_safe_footprint] = 0.0

landing_score = uniform_filter(suitability, size=5)
candidates = []
score_copy = landing_score.copy()

edge_margin = 40
score_copy[:edge_margin, :] = 0.0
score_copy[-edge_margin:, :] = 0.0
score_copy[:, :edge_margin] = 0.0
score_copy[:, -edge_margin:] = 0.0

# Mencari 3 Kandidat Tapak Terbaik
for _ in range(3):
    best_idx = np.unravel_index(np.argmax(score_copy), score_copy.shape)
    if score_copy[best_idx] > 0.0:
        candidates.append(best_idx)
        r, c = best_idx
        # Berikan jarak aman minimum antar situs kandidat
        score_copy[max(0, r-45):min(score_copy.shape[0], r+45),
                   max(0, c-45):min(score_copy.shape[1], c+45)] = 0.0

if len(candidates) < 3:
    fallback_score = norm_slope * (illum_map > 20.0)
    for _ in range(3 - len(candidates)):
        idx = np.unravel_index(np.argmax(fallback_score), fallback_score.shape)
        candidates.append(idx)
        r, c = idx
        fallback_score[max(0, r-45):min(fallback_score.shape[0], r+45),
                       max(0, c-45):min(fallback_score.shape[1], c+45)] = 0.0

# =====================================================================
# 5. GEOSPATIAL PROJECTION ENGINE (IAU 2000 MOON SOUTH POLE)
# =====================================================================
R_MOON_M = 1737400.0
LAT_CENTER_DEG = -84.5
LON_CENTER_DEG = 31.0

def pixel_to_lunar_polar_coords(r, c, shape, res_m=250.0):
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

    lon_rad = math.atan2(x_proj, -y_proj)
    lon_deg = math.degrees(lon_rad)
    if lon_deg < 0.0:
        lon_deg += 360.0

    return lat_deg, lon_deg

# Cetak Laporan Spasial Terminal
print("\n" + "="*85)
print("     LAPORAN EVALUASI GEOSPASIAL PENDARATAN MONS MOUTON (NASA CLPS METRICS)")
print("="*85)
labels = ["Alpha (Utama)", "Beta (Sekunder)", "Gamma (Cadangan)"]
for i, (r, c) in enumerate(candidates):
    lat_exact, lon_exact = pixel_to_lunar_polar_coords(r, c, heightmap.shape, pixel_res_m)
    print(f"Site {labels[i]:<16}: Grid [{c}, {r}] | Koordinat: {abs(lat_exact):.3f}°S, {lon_exact:.3f}°E\n"
          f"                   Elevasi: {elevation_m[r, c]:.0f} m | Kemiringan: {slope_deg[r, c]:.2f}°\n"
          f"                   Daya Surya: {illum_map[r, c]:.1f}%  | Sinyal Bumi (LOS): {los_map[r, c]:.0f}%\n"
          f"                   Skor Kelayakan Misi: {landing_score[r, c]:.3f} / 1.000")
print("="*85 + "\n")

# Ekspor grafik statis 4-panel
os.makedirs("output", exist_ok=True)
out_file = os.path.join("output", "mons_mouton_multicriteria_mission.png")
fig_save, ax_s = plt.subplots(1, 4, figsize=(22, 5.5))
ax_s[0].imshow(slope_deg, cmap="turbo", vmin=0.0, vmax=slope_vmax)
ax_s[0].set_title("1. Kemiringan (Slope)")
ax_s[1].imshow(illum_map, cmap="cividis", vmin=0, vmax=100)
ax_s[1].set_title("2. Daya Surya (Solar)")
ax_s[2].imshow(los_map, cmap="magma", vmin=0, vmax=100)
ax_s[2].set_title("3. Sinyal Bumi (Earth LOS)")
ax_s[3].imshow(landing_score, cmap="viridis")
ax_s[3].set_title("4. Skor MCDA Final")
for a in ax_s: a.axis("off")
fig_save.tight_layout()
fig_save.savefig(out_file, dpi=300, bbox_inches="tight")
plt.close(fig_save)
print(f"[+] Laporan analitik statis tersimpan di: {out_file}")

# =====================================================================
# 6. UNIFIED SINGLE-WINDOW EXPLORER (2D & 3D IN-PLACE TOGGLE)
# =====================================================================
fig = plt.figure(figsize=(16, 9.0), facecolor="#0b0f19")

ax_map = fig.add_axes([0.03, 0.055, 0.89, 0.855], facecolor="#05070c")
ax_3d = fig.add_axes([0.03, 0.055, 0.89, 0.855], projection="3d", facecolor="#05070c")
ax_3d.set_visible(False)

# Lapisan SLOPE menggunakan palet 'turbo' yang terang dan vmax dinamis (slope_vmax)
layers_data = {
    "MCDA":  {"data": landing_score, "cmap": "viridis", "vmin": 0.0, "vmax": np.max(landing_score) if np.max(landing_score) > 0 else 1.0, "title": "Zona Kelayakan Pendaratan Bersertifikasi (MCDA Footprint Safe)"},
    "DEM":   {"data": elevation_smooth, "cmap": "bone", "vmin": 2000, "vmax": 6000, "title": "Topografi Ketinggian Medan (NASA LOLA DEM)"},
    "SLOPE": {"data": slope_deg, "cmap": "turbo", "vmin": 0.0, "vmax": slope_vmax, "title": "Peta Analisis Kemiringan Lereng (Slope Hazard)"},
    "SOLAR": {"data": illum_map, "cmap": "cividis", "vmin": 0, "vmax": 100, "title": "Peta Penyinaran Matahari Multi-Temporal (Solar Exposure)"},
    "LOS":   {"data": los_map, "cmap": "magma", "vmin": 0, "vmax": 100, "title": "Visibilitas Komunikasi Sinyal Bumi (Earth Line-of-Sight)"}
}

current_layer = "MCDA"
is_3d_mode = False

img_plot = ax_map.imshow(layers_data[current_layer]["data"], 
                          cmap=layers_data[current_layer]["cmap"], 
                          vmin=layers_data[current_layer]["vmin"], 
                          vmax=layers_data[current_layer]["vmax"], 
                          origin="upper")

cbar = fig.colorbar(img_plot, ax=ax_map, fraction=0.022, pad=0.012)
cbar.ax.yaxis.set_tick_params(color="white")
plt.setp(plt.getp(cbar.ax.axes, 'yticklabels'), color='white', fontsize=8)

colors_pin = ["#ff4444", "#00d4ff", "#ffcc00"]
offsets_radial = [(-140, -65), (140, -65), (0, 80)]

for i, (r, c) in enumerate(candidates):
    lat_val, lon_val = pixel_to_lunar_polar_coords(r, c, heightmap.shape, pixel_res_m)
    ax_map.scatter(c, r, s=200, edgecolors=colors_pin[i], facecolors="none", linewidth=2.5, zorder=6)
    ax_map.scatter(c, r, color=colors_pin[i], marker="+", s=80, zorder=6)

    dx_o, dy_o = offsets_radial[i]
    ax_map.annotate(
        f"Site {labels[i].split()[0]}\n({abs(lat_val):.2f}S, {lon_val:.2f}E)",
        xy=(c, r),
        xytext=(c + dx_o, r + dy_o),
        color="white",
        fontweight="bold",
        fontsize=8.5,
        ha="center",
        va="center",
        bbox=dict(boxstyle="round,pad=0.35", facecolor="#090d16", edgecolor=colors_pin[i], alpha=0.92, linewidth=1.5),
        arrowprops=dict(arrowstyle="->", color=colors_pin[i], lw=1.6, shrinkA=3, shrinkB=6),
        zorder=7
    )

ax_map.axis("off")
title_text = ax_map.set_title(layers_data[current_layer]["title"], color="white", fontsize=11, fontweight="bold", pad=8)

info_box = ax_map.text(
    0.02, 0.03,
    "ARAHKAN KURSOR KE MEDAN UNTUK MEMBACA TELEMETRI SPASIAL",
    transform=ax_map.transAxes,
    color="white",
    fontsize=8.8,
    fontfamily="monospace",
    va="bottom",
    ha="left",
    bbox=dict(boxstyle="round,pad=0.50", facecolor="#090d16", edgecolor="#388bfd", alpha=0.92, linewidth=1.4),
    zorder=10
)

scale_px = 40.0
scale_box = ax_map.text(
    0.83, 0.03,
    "|───── 10 km ─────|\nSkala Spasial Bulan",
    transform=ax_map.transAxes,
    color="white",
    fontsize=8.0,
    fontfamily="monospace",
    ha="center",
    va="bottom",
    bbox=dict(boxstyle="square,pad=0.35", facecolor="#090d16", edgecolor="#6b7280", alpha=0.88, linewidth=1.0),
    zorder=10
)

help_banner = fig.text(
    0.50, 0.015,
    "PINTASAN KEYBOARD: [1-5] Lapisan Peta | [A/B/G] Fokus Situs | [T] Mode 3D | [+/-] Zoom | [Scroll] Zoom Roda | [R] Reset",
    color="#94a3b8", fontsize=8.2, fontweight="bold", ha="center"
)

# Meshgrid Topografi 3D
step = max(2, heightmap.shape[0] // 130)
x_grid = np.arange(0, heightmap.shape[1], step)
y_grid = np.arange(0, heightmap.shape[0], step)
X_3d, Y_3d = np.meshgrid(x_grid, y_grid)
Z_3d = elevation_smooth[::step, ::step]

orig_xlim3d = (0, heightmap.shape[1])
orig_ylim3d = (0, heightmap.shape[0])
orig_zlim3d = (np.min(elevation_smooth) - 200, np.max(elevation_smooth) + 1200)

def draw_3d_terrain(preserve_zoom=False):
    cur_x = ax_3d.get_xlim3d() if preserve_zoom else orig_xlim3d
    cur_y = ax_3d.get_ylim3d() if preserve_zoom else orig_ylim3d
    cur_z = ax_3d.get_zlim3d() if preserve_zoom else orig_zlim3d
    cur_elev = ax_3d.elev if preserve_zoom else 48
    cur_azim = ax_3d.azim if preserve_zoom else -62

    ax_3d.cla()
    ax_3d.set_facecolor("#05070c")
    active_info = layers_data[current_layer]
    C_data = active_info["data"][::step, ::step]
    norm = Normalize(vmin=active_info["vmin"], vmax=active_info["vmax"])
    cmap = plt.colormaps[active_info["cmap"]]
    facecolors = cmap(norm(C_data))

    # shade=False memastikan warna asli permukaan 3D tampil terang tanpa digelapkan bayangan
    ax_3d.plot_surface(X_3d, Y_3d, Z_3d, facecolors=facecolors, rstride=1, cstride=1,
                       linewidth=0, antialiased=True, shade=False, alpha=0.95)

    stagger_heights = [600, 1100, 1600]
    for i, (r, c) in enumerate(candidates):
        lat_val, lon_val = pixel_to_lunar_polar_coords(r, c, heightmap.shape, pixel_res_m)
        site_z = elevation_m[r, c]
        h_stem = stagger_heights[i]

        ax_3d.plot([c, c], [r, r], [site_z, site_z + h_stem], color=colors_pin[i], linewidth=2.5, zorder=10)
        ax_3d.scatter([c], [r], [site_z + h_stem], color=colors_pin[i], s=75, depthshade=False, zorder=11)
        ax_3d.text(c, r, site_z + h_stem + 180, f"Site {labels[i].split()[0]}\n({abs(lat_val):.2f}S, {site_z:.0f}m)",
                   color="white", fontsize=8, fontweight="bold", ha="center",
                   bbox=dict(boxstyle="round,pad=0.25", facecolor="#090d16", edgecolor=colors_pin[i], alpha=0.88))

    ax_3d.set_box_aspect([1, 1, 0.35])
    ax_3d.view_init(elev=cur_elev, azim=cur_azim)
    ax_3d.set_xlim3d(cur_x)
    ax_3d.set_ylim3d(cur_y)
    ax_3d.set_zlim3d(cur_z)
    ax_3d.axis("off")
    ax_3d.set_title(f"EXPLORER 3D MONS MOUTON (NASA LOLA DEM) | Lapisan: {active_info['title']}",
                    color="white", fontsize=11, fontweight="bold", pad=8)

# =====================================================================
# 7. BILAH TOMBOL NAVIGASI HEADER TERKELOMPOK & FLOATING WIDGET
# =====================================================================
btn_style = dict(color="#1e293b", hovercolor="#3b82f6")
btn_active_layer = dict(color="#0284c7", hovercolor="#38bdf8")
btn_mode_style = dict(color="#6366f1", hovercolor="#818cf8")
btn_float_style = dict(color="#0f172a", hovercolor="#2563eb")

# Kelompok 5 Lapisan Peta (Top Left)
ax_b_mcda  = fig.add_axes([0.020, 0.942, 0.080, 0.036])
ax_b_dem   = fig.add_axes([0.105, 0.942, 0.075, 0.036])
ax_b_slope = fig.add_axes([0.185, 0.942, 0.075, 0.036])
ax_b_solar = fig.add_axes([0.265, 0.942, 0.075, 0.036])
ax_b_los   = fig.add_axes([0.345, 0.942, 0.075, 0.036])

# Kelompok Pintasan Situs (Top Center)
ax_b_alpha = fig.add_axes([0.440, 0.942, 0.080, 0.036])
ax_b_beta  = fig.add_axes([0.525, 0.942, 0.080, 0.036])
ax_b_gamma = fig.add_axes([0.610, 0.942, 0.080, 0.036])

# Tombol Mode 3D Utama (Top Right)
ax_b_mode  = fig.add_axes([0.740, 0.942, 0.120, 0.036])

b_mcda  = Button(ax_b_mcda,  "ZONA AMAN (1)",  **btn_active_layer)
b_dem   = Button(ax_b_dem,   "ELEVASI (2)",    **btn_style)
b_slope = Button(ax_b_slope, "LERENG (3)",     **btn_style)
b_solar = Button(ax_b_solar, "SURYA (4)",      **btn_style)
b_los   = Button(ax_b_los,   "KOMUNIKASI (5)", **btn_style)

b_alpha = Button(ax_b_alpha, "ALPHA (A)",      **btn_style)
b_beta  = Button(ax_b_beta,  "BETA (B)",       **btn_style)
b_gamma = Button(ax_b_gamma, "GAMMA (G)",      **btn_style)

b_mode  = Button(ax_b_mode,  "[TAMPILAN 3D (T)]", **btn_mode_style)

layer_buttons = {"MCDA": b_mcda, "DEM": b_dem, "SLOPE": b_slope, "SOLAR": b_solar, "LOS": b_los}

for b in [b_mcda, b_dem, b_slope, b_solar, b_los, b_alpha, b_beta, b_gamma, b_mode]:
    b.label.set_color("white")
    b.label.set_fontsize(7.8)
    b.label.set_fontweight("bold")

ax_f_zin   = fig.add_axes([0.938, 0.220, 0.036, 0.045])
ax_f_zout  = fig.add_axes([0.938, 0.165, 0.036, 0.045])
ax_f_reset = fig.add_axes([0.938, 0.105, 0.036, 0.045])

b_zin   = Button(ax_f_zin,   "+",    **btn_float_style)
b_zout  = Button(ax_f_zout,  "-",    **btn_float_style)
b_reset = Button(ax_f_reset, "R",    **btn_float_style)

for b in [b_zin, b_zout, b_reset]:
    b.label.set_color("white")
    b.label.set_fontsize(12.0)
    b.label.set_fontweight("bold")

def switch_layer(layer_key):
    global current_layer
    current_layer = layer_key
    info = layers_data[layer_key]
    img_plot.set_data(info["data"])
    img_plot.set_cmap(info["cmap"])
    img_plot.set_clim(info["vmin"], info["vmax"])
    title_text.set_text(info["title"])

    for k, btn in layer_buttons.items():
        btn.color = "#0284c7" if k == layer_key else "#1e293b"

    if is_3d_mode:
        draw_3d_terrain(preserve_zoom=True)
    fig.canvas.draw_idle()

b_mcda.on_clicked(lambda e: switch_layer("MCDA"))
b_dem.on_clicked(lambda e: switch_layer("DEM"))
b_slope.on_clicked(lambda e: switch_layer("SLOPE"))
b_solar.on_clicked(lambda e: switch_layer("SOLAR"))
b_los.on_clicked(lambda e: switch_layer("LOS"))

def toggle_view_mode(event=None):
    global is_3d_mode
    is_3d_mode = not is_3d_mode
    if is_3d_mode:
        ax_map.set_visible(False)
        cbar.ax.set_visible(False)
        info_box.set_visible(False)
        scale_box.set_visible(False)
        ax_3d.set_visible(True)
        draw_3d_terrain(preserve_zoom=False)
        b_mode.label.set_text("[TAMPILAN 2D (T)]")
        b_mode.color = "#10b981"
    else:
        ax_3d.set_visible(False)
        ax_map.set_visible(True)
        cbar.ax.set_visible(True)
        info_box.set_visible(True)
        scale_box.set_visible(True)
        b_mode.label.set_text("[TAMPILAN 3D (T)]")
        b_mode.color = "#6366f1"
    fig.canvas.draw_idle()

b_mode.on_clicked(toggle_view_mode)

# =====================================================================
# 8. ENGINE ZOOM DATA 2D & 3D
# =====================================================================
def execute_zoom(factor):
    if not is_3d_mode:
        cur_xlim = ax_map.get_xlim()
        cur_ylim = ax_map.get_ylim()
        cx = (cur_xlim[0] + cur_xlim[1]) / 2.0
        cy = (cur_ylim[0] + cur_ylim[1]) / 2.0
        dx = (cur_xlim[1] - cur_xlim[0]) * factor / 2.0
        dy = (cur_ylim[1] - cur_ylim[0]) * factor / 2.0
        ax_map.set_xlim([cx - dx, cx + dx])
        ax_map.set_ylim([cy - dy, cy + dy])
    else:
        xlim = ax_3d.get_xlim3d()
        ylim = ax_3d.get_ylim3d()
        zlim = ax_3d.get_zlim3d()

        cx = (xlim[0] + xlim[1]) / 2.0
        cy = (ylim[0] + ylim[1]) / 2.0
        cz = (zlim[0] + zlim[1]) / 2.0

        hx = (xlim[1] - xlim[0]) * factor / 2.0
        hy = (ylim[1] - ylim[0]) * factor / 2.0
        hz = (zlim[1] - zlim[0]) * factor / 2.0

        if hx > 25 and hy > 25:
            ax_3d.set_xlim3d([cx - hx, cx + hx])
            ax_3d.set_ylim3d([cy - hy, cy + hy])
            ax_3d.set_zlim3d([cz - hz, cz + hz])

    fig.canvas.draw_idle()

b_zin.on_clicked(lambda e: execute_zoom(0.72))
b_zout.on_clicked(lambda e: execute_zoom(1.35))

def jump_to_site(idx):
    r, c = candidates[idx]
    span = 75
    if not is_3d_mode:
        ax_map.set_xlim([c - span, c + span])
        ax_map.set_ylim([r + span, r - span])
    else:
        site_z = elevation_m[r, c]
        ax_3d.set_xlim3d([c - span, c + span])
        ax_3d.set_ylim3d([r - span, r + span])
        ax_3d.set_zlim3d([site_z - 300, site_z + 1800])
    fig.canvas.draw_idle()

b_alpha.on_clicked(lambda e: jump_to_site(0))
b_beta.on_clicked(lambda e: jump_to_site(1))
b_gamma.on_clicked(lambda e: jump_to_site(2))

orig_xlim = (0, heightmap.shape[1])
orig_ylim = (heightmap.shape[0], 0)

def reset_view(e=None):
    if not is_3d_mode:
        ax_map.set_xlim(orig_xlim)
        ax_map.set_ylim(orig_ylim)
    else:
        ax_3d.set_xlim3d(orig_xlim3d)
        ax_3d.set_ylim3d(orig_ylim3d)
        ax_3d.set_zlim3d(orig_zlim3d)
        ax_3d.view_init(elev=48, azim=-62)
    fig.canvas.draw_idle()

b_reset.on_clicked(reset_view)

# =====================================================================
# 9. ENGINE INTERAKSI TIKUS & KEYBOARD SHORTCUTS
# =====================================================================
drag_active = False
drag_start = (0, 0)
xlim_initial = (0, 0)
ylim_initial = (0, 0)

def on_press(event):
    global drag_active, drag_start, xlim_initial, ylim_initial
    if is_3d_mode or event.inaxes != ax_map:
        return
    if event.button == 1:
        drag_active = True
        drag_start = (event.x, event.y)
        xlim_initial = ax_map.get_xlim()
        ylim_initial = ax_map.get_ylim()

    if event.dblclick and event.xdata is not None and event.ydata is not None:
        cur_xlim = ax_map.get_xlim()
        cur_ylim = ax_map.get_ylim()
        cx, cy = event.xdata, event.ydata
        dx = (cur_xlim[1] - cur_xlim[0]) * 0.30
        dy = (cur_ylim[1] - cur_ylim[0]) * 0.30
        ax_map.set_xlim([cx - dx, cx + dx])
        ax_map.set_ylim([cy + dy, cy - dy])
        fig.canvas.draw_idle()

def on_release(event):
    global drag_active
    drag_active = False

def on_motion(event):
    global drag_active
    if is_3d_mode or event.inaxes != ax_map:
        return

    if drag_active and event.x is not None and event.y is not None:
        bbox = ax_map.get_window_extent()
        dx_pixels = event.x - drag_start[0]
        dy_pixels = event.y - drag_start[1]

        x_span = xlim_initial[1] - xlim_initial[0]
        y_span = ylim_initial[1] - ylim_initial[0]

        dx_data = -dx_pixels * (x_span / bbox.width)
        dy_data = -dy_pixels * (y_span / bbox.height)

        ax_map.set_xlim([xlim_initial[0] + dx_data, xlim_initial[1] + dx_data])
        ax_map.set_ylim([ylim_initial[0] + dy_data, ylim_initial[1] + dy_data])
        fig.canvas.draw_idle()

    if event.xdata is not None and event.ydata is not None:
        c = int(np.clip(event.xdata, 0, heightmap.shape[1] - 1))
        r = int(np.clip(event.ydata, 0, heightmap.shape[0] - 1))

        lat_c, lon_c = pixel_to_lunar_polar_coords(r, c, heightmap.shape, pixel_res_m)
        elev_c = elevation_m[r, c]
        slope_c = slope_deg[r, c]
        solar_c = illum_map[r, c]
        los_c = los_map[r, c]
        score_c = landing_score[r, c]
        is_safe = certified_safe_footprint[r, c]

        status_str = "AMAN (TERSERTIFIKASI)" if is_safe else "BERBAHAYA (NO-GO ZONE)"

        info_box.set_text(
            f"LUNAR RECONNAISSANCE TELEMETRY\n"
            f"Koordinat  : {abs(lat_c):.3f}S, {lon_c:.3f}E (Grid [{c}, {r}])\n"
            f"Elevasi    : {elev_c:5.0f} m\n"
            f"Kemiringan : {slope_c:5.2f} deg {'[OK]' if slope_c < 10 else '[TERJAL]'}\n"
            f"Sinar Surya: {solar_c:5.1f}%\n"
            f"Sinyal Bumi: {los_c:5.0f}%\n"
            f"Skor MCDA  : {score_c:5.3f} / 1.000\n"
            f"Status     : {status_str}"
        )
        fig.canvas.draw_idle()

def on_scroll(event):
    target_ax = ax_3d if is_3d_mode else ax_map
    if event.inaxes != target_ax:
        return
    factor = 0.75 if event.button == "up" else 1.30
    execute_zoom(factor)

def on_key_press(event):
    k = event.key.lower() if event.key else ""
    if k == "1":   switch_layer("MCDA")
    elif k == "2": switch_layer("DEM")
    elif k == "3": switch_layer("SLOPE")
    elif k == "4": switch_layer("SOLAR")
    elif k == "5": switch_layer("LOS")
    elif k in ["t", " "]: toggle_view_mode()
    elif k == "a": jump_to_site(0)
    elif k == "b": jump_to_site(1)
    elif k == "g": jump_to_site(2)
    elif k in ["+", "="]: execute_zoom(0.72)
    elif k in ["-", "_"]: execute_zoom(1.35)
    elif k in ["r", "h"]: reset_view()

fig.canvas.mpl_connect("button_press_event", on_press)
fig.canvas.mpl_connect("button_release_event", on_release)
fig.canvas.mpl_connect("motion_notify_event", on_motion)
fig.canvas.mpl_connect("scroll_event", on_scroll)
fig.canvas.mpl_connect("key_press_event", on_key_press)

plt.show()