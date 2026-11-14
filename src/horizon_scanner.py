# -*- coding: utf-8 -*-
"""
horizon_scanner.py — Radial Raymarching & Lunar Crater Obstruction Scanner
==========================================================================
Proyek  : XASUAI (NASA Space Apps Challenge 2026 - Mons Mouton Lunar Landing Navigator)
"""

import math
from typing import List, Tuple, Dict, Any
import numpy as np

import constants as c

def raymarch_horizon_profile(
    dem: np.ndarray,
    center_y: int,
    center_x: int,
    res_m: float = 250.0,
    max_radius_m: float = 30000.0,
    angular_samples: int = 360
) -> List[float]:
    """
    Melakukan radial raymarching 360 derajat untuk mendeteksi sudut elevasi bibir kawah
    maksimum (horizon profile) yang menghalangi garis pandang dari posisi pendaratan.
    """
    h, w = dem.shape
    center_elev = float(dem[center_y, center_x])
    max_steps = int(max_radius_m / res_m)
    profile = []

    for deg in range(angular_samples):
        rad = math.radians(deg)
        sin_a = math.sin(rad)
        cos_a = math.cos(rad)
        max_theta = -90.0

        for step in range(1, max_steps + 1):
            cur_r = step * res_m
            cur_x = int(round(center_x + (cur_r / res_m) * sin_a))
            cur_y = int(round(center_y - (cur_r / res_m) * cos_a))

            if cur_x < 0 or cur_x >= w or cur_y < 0 or cur_y >= h:
                break

            elev = float(dem[cur_y, cur_x])
            elev_diff = elev - center_elev
            theta = math.degrees(math.atan2(elev_diff, cur_r))

            if theta > max_theta:
                max_theta = theta

        profile.append(round(max(-10.0, max_theta), 2))

    return profile

def calculate_line_of_sight_clearance(
    azimuth_deg: float,
    elevation_deg: float,
    horizon_profile: List[float]
) -> Tuple[bool, float]:
    """
    Menghitung apakah garis pandang (LOS) bebas dari halangan tebing kawah,
    serta mengembalikan sudut klirens relatif terhadap bibir kawah terdekat.
    """
    idx = int(round(azimuth_deg)) % len(horizon_profile)
    rim_elev = horizon_profile[idx]
    clearance = elevation_deg - rim_elev
    is_clear = clearance > 0.0 and elevation_deg > 0.0
    return is_clear, round(clearance, 2)
