# -*- coding: utf-8 -*-
"""
ephemeris_loader.py — NASA JPL Horizons Ephemeris Loader & Cache Manager
========================================================================
Proyek  : XASUAI (NASA Space Apps Challenge 2026 - Mons Mouton Lunar Landing Navigator)
"""

import os
import sys
from typing import Dict, Any, List, Optional, Tuple
from datetime import datetime

# Proxy ke horizons_api untuk interaksi REST API JPL & Local Cache
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
try:
    import horizons_api
except ImportError:
    horizons_api = None

import constants as c

def load_ephemeris_cache(key: str) -> Optional[List[Dict[str, Any]]]:
    """Memuat data efemeris dari cache lokal JSON."""
    if horizons_api:
        return horizons_api.load_cache(key)
    return None

def fetch_sun_positions(site_key: str, start_dt: datetime, end_dt: datetime, step: str = "1h") -> List[Dict[str, Any]]:
    """Mengambil posisi sudut Matahari (Azimuth, Elevasi) relatif terhadap situs pendaratan."""
    if horizons_api:
        return horizons_api.fetch_sun_positions(site_key, start_dt, end_dt, step)
    return []

def fetch_earth_positions(site_key: str, start_dt: datetime, end_dt: datetime, step: str = "1h") -> List[Dict[str, Any]]:
    """Mengambil posisi sudut Bumi DTE (Azimuth, Elevasi) relatif terhadap situs pendaratan."""
    if horizons_api:
        return horizons_api.fetch_earth_positions(site_key, start_dt, end_dt, step)
    return []

def get_position_safe(body: str, site_key: str, dt: datetime, day_val: float) -> Tuple[float, float, str]:
    """Mengambil posisi benda langit dengan perlindungan fallback astronomis jika offline."""
    if horizons_api:
        return horizons_api.get_position_safe(body, site_key, dt, day_val)
    # Standar pendekatan analitis kutub selatan jika horizons_api offline
    if body == "SUN":
        return 45.0, 2.5, "FALLBACK_ANALYTIC"
    return 15.0, 10.25, "FALLBACK_ANALYTIC"
