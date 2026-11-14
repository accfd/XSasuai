# -*- coding: utf-8 -*-
"""
site_evaluator.py — Fitur 1: Penentuan Tanggal & Posisi Pendaratan di Batas Aman Cakrawala
========================================================================================
Proyek  : XSasuai (Smart Unified Artemis Interface)
Event   : NASA Space Apps Challenge 2026 | Team: Pilar Karya
Target  : Mons Mouton, Kutub Selatan Bulan (-84.9°S, 33.3°W)

Fungsi:
1. Memuat dataset Digital Elevation Model (LOLA DEM / GeoTIFF / LROC QuickMap).
2. Perhitungan kemiringan lereng (slope gradient) dengan batasan < 10 derajat (Hard Gate).
3. Raymarching cakrawala 360 derajat (radial horizon obstruction profile).
4. Evaluasi iluminasi surya & Direct-to-Earth (DTE) visibility.
5. Multi-Criteria Decision Analysis (MCDA):
   - Slope Score: 35%
   - Solar Illumination: 35%
   - Direct-to-Earth (DTE): 30%
   - Batas Kritis: Slope >= 10° mengeliminasi lokasi (Skor = 0).
"""

import os
import math
import logging
from typing import Dict, Any, Tuple, Optional, List
from datetime import datetime, timedelta

import numpy as np
from PIL import Image

import constants as c
import horizons_api

logger = logging.getLogger("XSasuai.SiteEvaluator")


# =====================================================================
# 1. DEM LOADER (GeoTIFF / PNG Fallback)
# =====================================================================

def load_dem_data(filepath: Optional[str] = None) -> Tuple[np.ndarray, float]:
    """
    Memuat Digital Elevation Model dari GeoTIFF atau citra fallback PNG.
    Mengembalikan:
      - dem_elevation: ndarray 2D (ketinggian dalam meter)
      - resolution_m: resolusi spasial per piksel (meter/pixel)
    """
    target_path = None
    if filepath and os.path.isfile(filepath):
        target_path = filepath
    else:
        for candidate in c.DEM_CANDIDATES:
            if os.path.isfile(candidate):
                target_path = candidate
                break

    if not target_path or not os.path.isfile(target_path):
        logger.warning("File DEM tidak ditemukan, membuat synthetic terrain Mons Mouton.")
        return _generate_synthetic_mons_mouton_dem()

    try:
        img = Image.open(target_path)
        img_gray = img.convert("L")
        raw_arr = np.array(img_gray, dtype=np.float32)
        
        # Normalisasi ke rentang elevasi Mons Mouton (2000m s.d. 6000m)
        min_val = raw_arr.min()
        max_val = raw_arr.max()
        if max_val > min_val:
            norm_arr = (raw_arr - min_val) / (max_val - min_val)
        else:
            norm_arr = np.zeros_like(raw_arr)

        elevation_m = c.ELEV_MIN_M + norm_arr * (c.ELEV_MAX_M - c.ELEV_MIN_M)
        res_m = float(getattr(c, "RES_PIXEL_M", 250.0))
        return elevation_m, res_m
    except Exception as e:
        logger.error(f"Gagal membaca DEM dari {target_path}: {e}")
        return _generate_synthetic_mons_mouton_dem()


def _generate_synthetic_mons_mouton_dem(shape: Tuple[int, int] = (1000, 1000)) -> Tuple[np.ndarray, float]:
    """Menghasilkan topografi sintetis Mons Mouton jika file DEM tidak tersedia."""
    h, w = shape
    y = np.linspace(-1, 1, h)
    x = np.linspace(-1, 1, w)
    X, Y = np.meshgrid(x, y)
    
    # Mons Mouton adalah dataran tinggi masif berbentuk kubah dengan kawah lokal
    dist = np.sqrt(X**2 + Y**2)
    plateau = np.clip(1.0 - dist**1.5, 0.0, 1.0)
    craters = 0.15 * np.sin(X * 12.0) * np.cos(Y * 12.0)
    micro_rough = 0.05 * np.random.RandomState(42).randn(h, w)
    
    raw = plateau + craters + micro_rough
    raw_norm = (raw - raw.min()) / (raw.max() - raw.min())
    elevation_m = c.ELEV_MIN_M + raw_norm * (c.ELEV_MAX_M - c.ELEV_MIN_M)
    return elevation_m.astype(np.float32), 250.0


# =====================================================================
# 2. SLOPE CALCULATION (< 10° Hard Gate)
# =====================================================================

def calculate_slope_map(dem_array: np.ndarray, cell_size_m: float = 250.0) -> np.ndarray:
    """
    Menghitung kemiringan lereng (slope) dalam satuan derajat untuk seluruh piksel DEM.
    Menggunakan algoritma gradient central difference.
    """
    dy, dx = np.gradient(dem_array, cell_size_m, cell_size_m)
    slope_rad = np.arctan(np.sqrt(dx**2 + dy**2))
    slope_deg = np.degrees(slope_rad)
    return slope_deg


def calculate_site_slope(dem_array: np.ndarray, py: int, px: int, cell_size_m: float = 250.0, radius_px: int = 2) -> float:
    """
    Menghitung kemiringan lokal di sekitar piksel (py, px) dalam radius tertentu.
    """
    h, w = dem_array.shape
    y_min = max(0, py - radius_px)
    y_max = min(h, py + radius_px + 1)
    x_min = max(0, px - radius_px)
    x_max = min(w, px + radius_px + 1)

    sub_dem = dem_array[y_min:y_max, x_min:x_max]
    if sub_dem.size < 4:
        return 0.0

    slope_sub = calculate_slope_map(sub_dem, cell_size_m)
    return float(np.mean(slope_sub))


# =====================================================================
# 3. 360° RAYMARCHING CAKRAWALA (HORIZON OBSTACLE PROFILING)
# =====================================================================

def raymarch_horizon_profile(
    dem_array: np.ndarray,
    py: int,
    px: int,
    res_m: float = 250.0,
    max_dist_km: float = 25.0,
    num_azimuths: int = 360,
    observer_height_m: float = 2.5
) -> np.ndarray:
    """
    Menembakkan vektor sinar raymarching 360° mengelilingi titik observer (py, px).
    Mengembalikan array 1D sepanjang num_azimuths berisi sudut elevasi rintangan maksimum (derajat).
    """
    h, w = dem_array.shape
    py = max(0, min(h - 1, int(py)))
    px = max(0, min(w - 1, int(px)))

    observer_elev = dem_array[py, px] + observer_height_m
    max_steps = int((max_dist_km * 1000.0) / res_m)
    max_steps = max(5, min(max_steps, 200))

    horizon_elevations = np.zeros(num_azimuths, dtype=np.float32)

    # R_moon untuk koreksi kelengkungan bulan
    r_moon = c.R_MOON_M

    for az_idx in range(num_azimuths):
        az_rad = math.radians(float(az_idx) * (360.0 / num_azimuths))
        sin_az = math.sin(az_rad)
        cos_az = math.cos(az_rad)

        max_el_deg = -90.0

        for step in range(1, max_steps + 1):
            curr_dist_m = step * res_m
            # Koordinat piksel tujuan
            # Sumbu Y citra ke bawah (South / -Y), Sumbu X ke kanan (East / +X)
            # Standar astronomi: 0° = North, 90° = East, 180° = South, 270° = West
            target_y = int(round(py - (curr_dist_m / res_m) * cos_az))
            target_x = int(round(px + (curr_dist_m / res_m) * sin_az))

            if target_y < 0 or target_y >= h or target_x < 0 or target_x >= w:
                break

            terrain_elev = dem_array[target_y, target_x]
            # Koreksi penurunan cakrawala akibat kelengkungan bola Bulan
            curvature_drop = (curr_dist_m**2) / (2.0 * r_moon)
            apparent_elev = terrain_elev - curvature_drop

            # Sudut elevasi rintangan terhadap observer
            delta_h = apparent_elev - observer_elev
            el_rad = math.atan2(delta_h, curr_dist_m)
            el_deg = math.degrees(el_rad)

            if el_deg > max_el_deg:
                max_el_deg = el_deg

        horizon_elevations[az_idx] = max(0.0, max_el_deg)

    return horizon_elevations


# =====================================================================
# 4. EVALUASI ILUMINASI SURYA & DTE VISIBILITY
# =====================================================================

def evaluate_solar_illumination(
    horizon_profile: np.ndarray,
    sun_az_deg: float,
    sun_el_deg: float
) -> Tuple[bool, float, float]:
    """
    Mengevaluasi apakah panel surya mendapat sinar langsung tanpa terhalang rintangan.
    Mengembalikan:
      - is_illuminated: bool (True jika sun_el > obstacle_el dan sun_el > 0)
      - clearance_deg: margin elevasi matahari di atas rintangan (derajat)
      - power_ratio: estimasi efisiensi pencahayaan (0.0 s.d. 1.0)
    """
    num_az = len(horizon_profile)
    norm_az = sun_az_deg % 360.0
    az_idx = int(round(norm_az * (num_az / 360.0))) % num_az
    obstacle_el = float(horizon_profile[az_idx])

    clearance = sun_el_deg - obstacle_el
    is_illuminated = (sun_el_deg > 0.0) and (clearance > 0.0)

    if not is_illuminated:
        power_ratio = 0.0
    else:
        # Panel surya di kutub selatan bulan dipasang vertikal menghadap horizon
        # Sudut datang optimal adalah ketika elevasi matahari rendah (1.0° s.d. 5.0°)
        # Sinar langsung:
        power_ratio = min(1.0, max(0.1, clearance / 4.0))

    return is_illuminated, clearance, power_ratio


def evaluate_dte_visibility(
    horizon_profile: np.ndarray,
    earth_az_deg: float,
    earth_el_deg: float
) -> Tuple[bool, float, float]:
    """
    Mengevaluasi apakah jalur komunikasi Direct-to-Earth (DTE) bebas halangan.
    Mengembalikan:
      - is_visible: bool
      - clearance_deg: margin elevasi bumi di atas rintangan
      - link_quality: kualitas link DTE (0.0 s.d. 1.0)
    """
    num_az = len(horizon_profile)
    norm_az = earth_az_deg % 360.0
    az_idx = int(round(norm_az * (num_az / 360.0))) % num_az
    obstacle_el = float(horizon_profile[az_idx])

    clearance = earth_el_deg - obstacle_el
    is_visible = (earth_el_deg > 0.0) and (clearance > 0.0)

    if not is_visible:
        link_quality = 0.0
    else:
        # Jika clearance > 2 derajat, link direct sangat jernih
        link_quality = min(1.0, max(0.2, clearance / 3.0))

    return is_visible, clearance, link_quality


# =====================================================================
# 5. MCDA (MULTI-CRITERIA DECISION ANALYSIS) SCORING
# =====================================================================

def compute_mcda_score(
    slope_deg: float,
    solar_ratio: float,
    dte_quality: float,
    weights: Tuple[float, float, float] = (0.35, 0.35, 0.30),
    max_safe_slope: float = 10.0
) -> Dict[str, Any]:
    """
    Menghitung skor kelayakan pendaratan berbasis Multi-Criteria Decision Analysis (MCDA).
    Bobot default:
      - Slope: 35% (0.35)
      - Solar Illumination: 35% (0.35)
      - Direct-to-Earth (DTE): 30% (0.30)
    
    Hard Gate Rule:
      - Jika Slope >= 10.0°, lokasi DIELIMINASI (Skor Total = 0.0).
    """
    w_slope, w_solar, w_dte = weights

    # Hard gate check
    if slope_deg >= max_safe_slope:
        return {
            "total_score": 0.0,
            "slope_score": 0.0,
            "solar_score": float(solar_ratio),
            "dte_score": float(dte_quality),
            "status": "ELIMINATED",
            "reason": f"Slope ({slope_deg:.2f}°) melebihi ambang aman ({max_safe_slope}°)",
            "safe_to_land": False,
        }

    # Normalisasi slope: 0° -> 1.0; 10° -> 0.0
    slope_score = max(0.0, 1.0 - (slope_deg / max_safe_slope))
    solar_score = max(0.0, min(1.0, float(solar_ratio)))
    dte_score = max(0.0, min(1.0, float(dte_quality)))

    total_score = (w_slope * slope_score) + (w_solar * solar_score) + (w_dte * dte_score)

    # Penentuan status keselamatan
    if total_score >= 0.75 and solar_score > 0.2 and dte_score > 0.2:
        status = "OPTIMAL"
        safe = True
    elif total_score >= 0.50:
        status = "ACCEPTABLE"
        safe = True
    else:
        status = "DEGRADED"
        safe = False

    return {
        "total_score": round(float(total_score), 4),
        "slope_score": round(float(slope_score), 4),
        "solar_score": round(float(solar_score), 4),
        "dte_score": round(float(dte_score), 4),
        "status": status,
        "reason": "Parameter memenuhi batas keselamatan",
        "safe_to_land": safe,
    }


# =====================================================================
# 6. EVALUASI LOKASI PENDARATAN KOMPREHENSIF
# =====================================================================

def evaluate_site_at_datetime(
    site_key: str,
    target_dt: datetime,
    dem_array: Optional[np.ndarray] = None,
    res_m: float = 250.0
) -> Dict[str, Any]:
    """
    Mengevaluasi situs spesifik (ALPHA, BETA, GAMMA) pada tanggal dan waktu UTC tertentu.
    Menggabungkan posisi astronomis riil JPL Horizons dengan profil cakrawala DEM.
    """
    if site_key not in c.SITES_CONFIG:
        raise ValueError(f"Situs {site_key} tidak terdaftar di SITES_CONFIG.")

    site_info = c.SITES_CONFIG[site_key]
    py, px = site_info["pixel_coord"]

    if dem_array is None:
        dem_array, res_m = load_dem_data()

    # 1. Slope
    slope_deg = calculate_site_slope(dem_array, py, px, res_m)

    # 2. Horizon Profile 360
    horizon_profile = raymarch_horizon_profile(dem_array, py, px, res_m)

    # 3. Posisi Matahari & Bumi (Live JPL Horizons atau fallback offline)
    sun_data = horizons_api.fetch_sun_positions(site_key, target_dt, target_dt + timedelta(hours=1), step_hours=1)
    earth_data = horizons_api.fetch_earth_positions(site_key, target_dt, target_dt + timedelta(hours=1), step_hours=1)

    sun_pt = sun_data[0] if sun_data else {"az": 45.0, "el": 1.5}
    earth_pt = earth_data[0] if earth_data else {"az": 10.0, "el": 6.5}

    sun_az, sun_el = float(sun_pt["az"]), float(sun_pt["el"])
    earth_az, earth_el = float(earth_pt["az"]), float(earth_pt["el"])

    # 4. Line-of-sight checks
    solar_ok, solar_clearance, solar_ratio = evaluate_solar_illumination(horizon_profile, sun_az, sun_el)
    dte_ok, dte_clearance, dte_quality = evaluate_dte_visibility(horizon_profile, earth_az, earth_el)

    # 5. MCDA
    mcda_res = compute_mcda_score(slope_deg, solar_ratio, dte_quality)

    return {
        "site_key": site_key,
        "site_name": site_info["name"],
        "datetime_utc": target_dt.strftime("%Y-%m-%d %H:%M:%S UTC"),
        "coordinates": {
            "lat_deg": site_info["lat_deg"],
            "lon_deg": site_info["lon_deg"],
            "elev_m": site_info["elev_m"],
            "pixel": (py, px)
        },
        "slope_deg": round(slope_deg, 3),
        "sun": {
            "azimuth_deg": round(sun_az, 2),
            "elevation_deg": round(sun_el, 2),
            "is_illuminated": solar_ok,
            "clearance_deg": round(solar_clearance, 2),
            "power_ratio": round(solar_ratio, 2)
        },
        "earth": {
            "azimuth_deg": round(earth_az, 2),
            "elevation_deg": round(earth_el, 2),
            "is_visible": dte_ok,
            "clearance_deg": round(dte_clearance, 2),
            "link_quality": round(dte_quality, 2)
        },
        "mcda": mcda_res,
        "horizon_profile": horizon_profile.tolist()
    }


def evaluate_14day_mission_window(
    site_key: str,
    start_dt: datetime,
    hours: int = 336,
    step_hours: int = 2
) -> List[Dict[str, Any]]:
    """
    Mengevaluasi jendela misi selama durasi tertentu (default 14 hari = 336 jam).
    Digunakan untuk memberi makan Timeline Slider di UI/Web.
    """
    dem_array, res_m = load_dem_data()
    site_info = c.SITES_CONFIG[site_key]
    py, px = site_info["pixel_coord"]

    slope_deg = calculate_site_slope(dem_array, py, px, res_m)
    horizon_profile = raymarch_horizon_profile(dem_array, py, px, res_m)

    end_dt = start_dt + timedelta(hours=hours)
    
    # Ambil data ephemeris batch untuk performa instan (<100ms)
    sun_series = horizons_api.fetch_sun_positions(site_key, start_dt, end_dt, step_hours=step_hours)
    earth_series = horizons_api.fetch_earth_positions(site_key, start_dt, end_dt, step_hours=step_hours)

    window_records = []
    num_steps = min(len(sun_series), len(earth_series))

    for i in range(num_steps):
        s_pt = sun_series[i]
        e_pt = earth_series[i]

        s_az, s_el = float(s_pt["az"]), float(s_pt["el"])
        e_az, e_el = float(e_pt["az"]), float(e_pt["el"])

        solar_ok, s_clr, s_ratio = evaluate_solar_illumination(horizon_profile, s_az, s_el)
        dte_ok, e_clr, e_qual = evaluate_dte_visibility(horizon_profile, e_az, e_el)

        mcda = compute_mcda_score(slope_deg, s_ratio, e_qual)

        curr_t = start_dt + timedelta(hours=i * step_hours)
        window_records.append({
            "hour_offset": i * step_hours,
            "datetime_utc": curr_t.strftime("%Y-%m-%d %H:%M"),
            "sun_az": round(s_az, 1),
            "sun_el": round(s_el, 2),
            "solar_ok": solar_ok,
            "earth_az": round(e_az, 1),
            "earth_el": round(e_el, 2),
            "dte_ok": dte_ok,
            "score": mcda["total_score"],
            "status": mcda["status"],
            "safe": mcda["safe_to_land"]
        })

    return window_records

