# -*- coding: utf-8 -*-
"""
lola_analyzer.py — Lunar Orbiter Laser Altimeter (LOLA) DEM & Slope Analyzer
============================================================================
Proyek  : XASUAI (NASA Space Apps Challenge 2026 - Mons Mouton Lunar Landing Navigator)
"""

import os
import math
from typing import Tuple, Dict, Any, Optional
import numpy as np
from PIL import Image

import constants as c

def load_dem_data(image_path: Optional[str] = None) -> Tuple[np.ndarray, float]:
    """
    Memuat Digital Elevation Model (LOLA DEM) dari berkas citra geospasial
    atau membuat elevasi sintetik Mons Mouton jika file tidak ditemukan.
    """
    if image_path is None:
        image_path = c.DEFAULT_DEM_PATH

    # Cek direktori lokal jika path default tidak ditemukan
    if not os.path.exists(image_path):
        alt_paths = [
            os.path.join(os.path.dirname(__file__), "..", image_path),
            os.path.join("data", "quickmap-lroc.png"),
            os.path.join(os.path.dirname(__file__), "..", "data", "quickmap-lroc.png")
        ]
        for alt in alt_paths:
            if os.path.exists(alt):
                image_path = alt
                break

    if os.path.exists(image_path):
        try:
            img = Image.open(image_path)
            arr = np.array(img, dtype=np.float32)
            if arr.ndim == 3:
                arr = arr[:, :, 0]
            # Normalisasi ke skala elevasi LOLA Mons Mouton (-5000 m s.d. +6500 m)
            min_val, max_val = np.min(arr), np.max(arr)
            if max_val > min_val:
                norm_dem = (arr - min_val) / (max_val - min_val)
                elev_dem = -5000.0 + norm_dem * 11500.0
            else:
                elev_dem = arr
            return elev_dem, c.DEFAULT_DEM_RES_M
        except Exception:
            pass

    # Sintetis DEM resolusi tinggi Mons Mouton
    sz = 200
    y, x = np.ogrid[:sz, :sz]
    dist_from_center = np.sqrt((x - 100)**2 + (y - 100)**2)
    # Dataran tinggi Mons Mouton (elevasi puncak ~5920 m di kelilingi tebing curam)
    plateau = 5920.0 - 0.05 * (dist_from_center**2)
    crater_rim = np.where(dist_from_center > 70, -2000.0 + 1500.0 * np.sin(dist_from_center / 5.0), plateau)
    return crater_rim.astype(np.float32), c.DEFAULT_DEM_RES_M

def calculate_slope(dem: np.ndarray, res_m: float = 250.0) -> np.ndarray:
    """Menghitung peta gradien kemiringan lereng (slope dalam satuan derajat)."""
    dy, dx = np.gradient(dem, res_m)
    slope_rad = np.arctan(np.sqrt(dx**2 + dy**2))
    return np.degrees(slope_rad)

def is_slope_safe(slope_deg: float) -> bool:
    """Mengecek batasan keamanan pendaratan Artemis HLS (Hard Gate: Slope < 10 derajat)."""
    return slope_deg < c.MAX_LANDING_SLOPE_DEG
