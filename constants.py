# -*- coding: utf-8 -*-
# constants.py — Single Source of Truth
# =====================================================================
# Proyek  : Lunar Landing Site Navigator
# Event   : NASA Space Apps Challenge 2026
# Target  : Mons Mouton, Kutub Selatan Bulan (~84.5°S)
# Deskripsi: File ini adalah SATU-SATUNYA sumber kebenaran untuk
#            seluruh konstanta yang digunakan oleh semua modul proyek.
#            Tidak ada duplikasi konstanta di file lain.
# Description: This is the SINGLE SOURCE OF TRUTH for all constants
#              used by every module in this project.
# =====================================================================

import os
import math
from datetime import datetime, timedelta

import numpy as np


# =====================================================================
# 1. KONSTANTA ASTRONOMI & FISIKA BULAN
#    Astronomical & Lunar Physics Constants
# =====================================================================

# Periode siklus sinodis Bulan (New Moon to New Moon) dalam hari
# Lunar synodic period (New Moon to New Moon) in days
LUNAR_SYNODIC_DAYS: float = 29.53059

# Periode anomalistik Bulan (perigee to perigee) dalam hari
# Lunar anomalistic period (perigee to perigee) in days
LUNAR_ANOMALISTIC_DAYS: float = 27.55455

# Periode nodal Bulan (crossing ascending node to ascending node) dalam hari
# Lunar nodal period in days
LUNAR_NODAL_DAYS: float = 27.21222

# Jari-jari rata-rata Bulan dalam meter
# Mean radius of the Moon in meters
R_MOON_M: float = 1_737_400.0

# Percepatan gravitasi permukaan Bulan (m/s²)
# Lunar surface gravitational acceleration (m/s²)
G_MOON: float = 1.62

# Percepatan gravitasi standar Bumi — digunakan untuk kalkulasi Isp (m/s²)
# Standard Earth gravitational acceleration — used for Isp calculations (m/s²)
G0: float = 9.80665

# Konstanta Pi (untuk kenyamanan)
# Pi constant for convenience
PI: float = math.pi
TWO_PI: float = 2.0 * math.pi


# =====================================================================
# 2. KONSTANTA WAHANA PENDARATAN (LANDER SPECS)
#    Spacecraft / Lander Specifications
# =====================================================================

# Massa kering wahana tanpa propelan (kg)
# Dry mass of lander without propellant (kg)
DRY_MASS: float = 450.0

# Massa propelan awal saat dimulainya fase PDI (kg)
# Initial propellant mass at the start of PDI phase (kg)
PROP_MASS_INIT: float = 350.0

# Massa total wahana saat awal PDI (kg)
# Total spacecraft mass at PDI start (kg)
TOTAL_MASS_INIT: float = DRY_MASS + PROP_MASS_INIT  # = 800.0 kg

# Gaya dorong maksimum mesin pendarat (Newton)
# Maximum engine thrust (Newton)
MAX_THRUST: float = 3_200.0

# Gaya dorong minimum / throttle terbawah (Newton)
# Minimum engine thrust / throttle floor (Newton)
MIN_THRUST: float = 400.0

# Specific Impulse mesin — efisiensi bahan bakar (detik)
# Engine Specific Impulse — fuel efficiency metric (seconds)
ISP: float = 310.0

# Timestep simulasi numerik (detik) — integrasi Euler
# Numerical simulation timestep (seconds) — Euler integration
DT: float = 0.05

# Batas waktu maksimum simulasi trajektori (detik)
# Maximum trajectory simulation time limit (seconds)
MAX_TIME: float = 150.0

# Batas kecepatan vertikal touchdown yang aman (m/s)
# Safe vertical touchdown velocity limit (m/s)
SAFE_TOUCHDOWN_VZ: float = 2.0

# Batas kecepatan horizontal touchdown yang aman (m/s)
# Safe horizontal touchdown velocity limit (m/s)
SAFE_TOUCHDOWN_VH: float = 0.5


# =====================================================================
# 3. KONSTANTA MISI & KALENDER
#    Mission Timeline & Calendar Constants
# =====================================================================

# Epoch referensi Bulan Baru untuk siklus misi NASA 2026
# Reference New Moon epoch for the 2026 NASA mission cycle
# Bulan Baru pada 10 Oktober 2026 pukul 12:00 UTC
MISSION_EPOCH: datetime = datetime(2026, 10, 10, 12, 0, 0)

# Tanggal mulai hackathon NASA Space Apps Challenge 2026
# NASA Space Apps Challenge 2026 hackathon start date
HACKATHON_START: datetime = datetime(2026, 11, 14, 0, 0, 0)

# Tanggal akhir hackathon
# Hackathon end date
HACKATHON_END: datetime = datetime(2026, 11, 16, 23, 59, 59)

# Rentang tanggal minimum-maksimum yang ditampilkan di date picker UI
# Min-max date range shown in the UI date picker
DATE_PICKER_MIN: datetime = datetime(2026, 10, 10, 0, 0, 0)
DATE_PICKER_MAX: datetime = datetime(2027, 3, 31, 23, 59, 59)


# =====================================================================
# 4. KONFIGURASI SITUS PENDARATAN
#    Landing Site Configuration (ALPHA, BETA, GAMMA)
# =====================================================================
# Koordinat geografi menggunakan sistem selenografis Bulan
# (lintang negatif = belahan selatan Bulan)
# Geographic coordinates use lunar selenographic system
# (negative latitude = southern lunar hemisphere)
#
# Sumber koordinat: LROC QuickMap & NASA Trek (Kutub Selatan Bulan)
# Coordinate source: LROC QuickMap & NASA Trek (Lunar South Pole)
# =====================================================================

SITES_CONFIG: dict = {
    "ALPHA": {
        # Nama lengkap situs / Full site name
        "name": "Site Alpha (Mons Mouton Crest)",
        # Kode singkat / Short code
        "short": "ALPHA",
        # Label prioritas / Priority label
        "tag": "SITUS UTAMA (PRIMARY)",
        # Koordinat piksel di citra DEM (row, col) / Pixel coord in DEM image
        "pixel_coord": (380, 750),
        # Koordinat 3D relatif dalam meter [X, Y, Z] — titik referensi misi
        # Relative 3D coordinates in meters [X, Y, Z] — mission reference point
        "coord_3d": np.array([0.0, 0.0, 0.0], dtype=np.float64),
        # Elevasi di atas datum Bulan (meter) / Elevation above lunar datum (meters)
        "elev_m": 5920.0,
        # Kemiringan rata-rata permukaan (derajat) / Average surface slope (degrees)
        "slope_deg": 0.08,
        # Lintang selenografis Bulan (derajat, negatif = selatan)
        # Lunar selenographic latitude (degrees, negative = south)
        "lat_deg": -84.9,
        # Bujur selenografis Bulan (derajat) / Lunar selenographic longitude (degrees)
        "lon_deg": -33.3,
        # Deskripsi singkat / Short description
        "desc": "Puncak Dataran Tinggi | Rintangan Cakrawala Terendah | Iluminasi Surya Maksimal",
        # Warna HEX untuk tampilan UI / HEX color for UI display
        "color_hex": "#10b981",  # Emerald green
    },

    "BETA": {
        "name": "Site Beta (Plateau North Rim)",
        "short": "BETA",
        "tag": "SITUS SEKUNDER (RUNNER-UP)",
        "pixel_coord": (260, 890),
        "coord_3d": np.array([600.0, 400.0, 0.0], dtype=np.float64),
        "elev_m": 5640.0,
        "slope_deg": 0.06,
        "lat_deg": -84.7,
        "lon_deg": -30.1,
        "desc": "Tepi Dinding Utara | Garis DTE ke Bumi Paling Bersih | Kemiringan Minimal",
        "color_hex": "#00f0ff",  # Cyan
    },

    "GAMMA": {
        "name": "Site Gamma (West Basin Ridge)",
        "short": "GAMMA",
        "tag": "SITUS CADANGAN (CONTINGENCY)",
        "pixel_coord": (510, 520),
        "coord_3d": np.array([-500.0, -800.0, 0.0], dtype=np.float64),
        "elev_m": 5410.0,
        "slope_deg": 0.17,
        "lat_deg": -84.5,
        "lon_deg": -36.8,
        "desc": "Punggung Kawah Barat | Dekat Deposito Volatil Es | Ternaungi Parsial",
        "color_hex": "#facc15",  # Amber yellow
    },
}

# Urutan situs dari prioritas tertinggi ke terendah
# Site ordering from highest to lowest priority
SITE_PRIORITY_ORDER: list = ["ALPHA", "BETA", "GAMMA"]


# =====================================================================
# 5. KONSTANTA DEM & TERRAIN
#    Digital Elevation Model & Terrain Constants
# =====================================================================

# Resolusi spasial piksel DEM dalam meter per piksel
# DEM spatial resolution in meters per pixel
RES_PIXEL_M: float = 250.0

# Batas bawah elevasi datum Mons Mouton (meter)
# Lower bound of Mons Mouton elevation datum (meters)
ELEV_MIN_M: float = 2000.0

# Batas atas elevasi datum Mons Mouton (meter)
# Upper bound of Mons Mouton elevation datum (meters)
ELEV_MAX_M: float = 6000.0

# Tinggi antena wahana di atas permukaan (meter) — untuk kalkulasi LOS
# Lander antenna height above surface (meters) — for LOS calculations
ANTENNA_HEIGHT_M: float = 2.5

# Jarak maksimum raycasting horizon (km)
# Maximum horizon raycasting distance (km)
MAX_HORIZON_DIST_KM: float = 25.0

# Jumlah arah azimuth yang disampling dalam profil horizon
# Number of azimuth directions sampled in horizon profile
NUM_AZIMUTH_SAMPLES: int = 360

# File DEM yang dicoba secara berurutan (fallback jika file pertama tidak ada)
# DEM files tried in order (fallback if first file not found)
DEM_CANDIDATES: list = [
    os.path.join("data", "quickmap-lroc.png"),
    os.path.join("data", "mons_mouton_illum", "mons_mouton_illum.png"),
    os.path.join("data", "lola_dem_south_pole.tif"),
    os.path.join("data", "lola_dem_south_pole.tiff"),
    os.path.join("data", "dem.png"),
]

# File citra iluminasi / Illumination image candidates
ILLUM_CANDIDATES: list = [
    os.path.join("data", "mons_mouton_illum", "mons_mouton_illum.png"),
    os.path.join("data", "lroc_wac_south_pole_mosaic.png"),
    os.path.join("data", "illum.png"),
]


# =====================================================================
# 6. KONSTANTA JPL HORIZONS API
#    JPL Horizons Ephemeris API Constants
# =====================================================================

# URL endpoint REST API JPL Horizons (NASA Jet Propulsion Laboratory)
# JPL Horizons REST API endpoint URL
HORIZONS_API_URL: str = "https://ssd.jpl.nasa.gov/api/horizons.api"

# Path file cache lokal untuk menyimpan hasil fetch API agar tidak refetch berulang
# Local cache file path to store API fetch results to avoid repeated requests
HORIZONS_CACHE_FILE: str = os.path.join("data", "horizons_cache.json")

# Masa berlaku cache sebelum dianggap kadaluarsa (dalam jam)
# Cache validity period before considered stale (in hours)
HORIZONS_CACHE_TTL_HOURS: int = 24

# ID target body JPL Horizons
# JPL Horizons target body IDs
HORIZONS_SUN_ID: str = "10"     # Matahari / Sun
HORIZONS_EARTH_ID: str = "399"  # Bumi / Earth

# Quantities yang diminta dari JPL Horizons:
# 4  = Azimuth & Elevation (a-app, true-app)
# 20 = Visual magnitude & surface brightness
# JPL Horizons quantity codes to request:
HORIZONS_QUANTITIES: str = "4,20"

# Format koordinat observer untuk JPL Horizons API
# Format: 'longitude_deg,latitude_deg,elevation_km'
# (longitude positif ke timur, negatif ke barat dalam selenografis Bulan)
# Observer coordinate format for JPL Horizons API
# Format: 'longitude_deg,latitude_deg,elevation_km'
OBSERVER_LOCATION_ALPHA: str = (
    f"{SITES_CONFIG['ALPHA']['lon_deg']},"
    f"{SITES_CONFIG['ALPHA']['lat_deg']},"
    f"{SITES_CONFIG['ALPHA']['elev_m'] / 1000.0:.3f}"  # konversi m → km
)

OBSERVER_LOCATION_BETA: str = (
    f"{SITES_CONFIG['BETA']['lon_deg']},"
    f"{SITES_CONFIG['BETA']['lat_deg']},"
    f"{SITES_CONFIG['BETA']['elev_m'] / 1000.0:.3f}"
)

OBSERVER_LOCATION_GAMMA: str = (
    f"{SITES_CONFIG['GAMMA']['lon_deg']},"
    f"{SITES_CONFIG['GAMMA']['lat_deg']},"
    f"{SITES_CONFIG['GAMMA']['elev_m'] / 1000.0:.3f}"
)

# Mapping site_key → string koordinat observer JPL
# Mapping from site_key to JPL observer coordinate string
OBSERVER_LOCATIONS: dict = {
    "ALPHA": OBSERVER_LOCATION_ALPHA,
    "BETA":  OBSERVER_LOCATION_BETA,
    "GAMMA": OBSERVER_LOCATION_GAMMA,
}

# Body Bulan sebagai pusat pengamatan di JPL (kode badan Bulan = 301)
# Moon as center body in JPL (Moon body code = 301)
HORIZONS_CENTER_BODY: str = "301"  # Moon

# Timeout request HTTP ke JPL API (detik)
# HTTP request timeout to JPL API (seconds)
HORIZONS_REQUEST_TIMEOUT: int = 15

# Timeout cek konektivitas (detik)
# Connectivity check timeout (seconds)
HORIZONS_PING_TIMEOUT: int = 3


# =====================================================================
# 7. HELPER FUNCTIONS
#    Fungsi-fungsi pembantu kalender misi
#    Mission calendar utility functions
# =====================================================================

def day_offset_to_date(day_val: float) -> datetime:
    """
    Konversi offset hari dari MISSION_EPOCH ke objek datetime UTC.
    Nilai bisa melebihi 1 siklus sinodis (tidak di-mod).

    Convert day offset from MISSION_EPOCH to a UTC datetime object.
    Value may exceed 1 synodic cycle (not modded).

    Args:
        day_val (float): Offset hari dari MISSION_EPOCH. Boleh negatif.
                         Day offset from MISSION_EPOCH. May be negative.

    Returns:
        datetime: Tanggal dan waktu UTC yang sesuai.
                  Corresponding UTC date and time.

    Contoh / Example:
        >>> day_offset_to_date(4.2)
        datetime(2026, 10, 14, 16, 48, 0)
    """
    return MISSION_EPOCH + timedelta(days=float(day_val))


def date_to_day_offset(dt: datetime) -> float:
    """
    Konversi objek datetime ke offset hari dalam siklus sinodis (0 – 29.53).
    Hasilnya selalu di-modulo terhadap LUNAR_SYNODIC_DAYS.

    Convert a datetime object to a day offset within the synodic cycle (0 – 29.53).
    Result is always taken modulo LUNAR_SYNODIC_DAYS.

    Args:
        dt (datetime): Tanggal & waktu yang ingin dikonversi.
                       The date & time to convert.

    Returns:
        float: Offset hari dalam siklus [0, LUNAR_SYNODIC_DAYS).
               Day offset within the cycle [0, LUNAR_SYNODIC_DAYS).

    Contoh / Example:
        >>> date_to_day_offset(datetime(2026, 11, 14))
        5.0  # (35 hari dari epoch) % 29.53059 ≈ 5.47
    """
    if isinstance(dt, str):
        try:
            if " " in dt:
                dt = datetime.strptime(dt, "%Y-%m-%d %H:%M")
            else:
                dt = datetime.strptime(dt, "%Y-%m-%d")
        except Exception:
            dt = datetime.fromisoformat(dt)
    delta_seconds = (dt - MISSION_EPOCH).total_seconds()
    delta_days = delta_seconds / 86400.0
    return delta_days % LUNAR_SYNODIC_DAYS


def date_to_absolute_day(dt: datetime) -> float:
    """
    Konversi objek datetime ke offset hari ABSOLUT dari MISSION_EPOCH.
    Berbeda dari date_to_day_offset — tidak di-modulo sehingga bisa > 29.53.

    Convert a datetime object to ABSOLUTE day offset from MISSION_EPOCH.
    Unlike date_to_day_offset — not modded, so result can exceed 29.53.

    Args:
        dt (datetime): Tanggal & waktu yang ingin dikonversi.

    Returns:
        float: Selisih hari absolut (bisa negatif jika sebelum epoch).
               Absolute day difference (can be negative if before epoch).

    Contoh / Example:
        >>> date_to_absolute_day(datetime(2026, 11, 14))
        35.0  # 35 hari penuh dari MISSION_EPOCH
    """
    if isinstance(dt, str):
        try:
            if " " in dt:
                dt = datetime.strptime(dt, "%Y-%m-%d %H:%M")
            else:
                dt = datetime.strptime(dt, "%Y-%m-%d")
        except Exception:
            dt = datetime.fromisoformat(dt)
    delta_seconds = (dt - MISSION_EPOCH).total_seconds()
    return delta_seconds / 86400.0


def get_site_observer_string(site_key: str) -> str:
    """
    Ambil string koordinat observer JPL Horizons untuk situs tertentu.
    Get the JPL Horizons observer coordinate string for a given site.

    Args:
        site_key (str): Kunci situs, salah satu dari 'ALPHA', 'BETA', 'GAMMA'.
                        Site key, one of 'ALPHA', 'BETA', 'GAMMA'.

    Returns:
        str: String koordinat dalam format JPL 'lon,lat,elev_km'.

    Raises:
        KeyError: Jika site_key tidak dikenali.
    """
    if site_key not in OBSERVER_LOCATIONS:
        raise KeyError(
            f"Site key '{site_key}' tidak dikenal. "
            f"Pilihan valid: {list(OBSERVER_LOCATIONS.keys())}"
        )
    return OBSERVER_LOCATIONS[site_key]


def get_site_config(site_key: str) -> dict:
    """
    Ambil seluruh konfigurasi situs pendaratan berdasarkan kunci.
    Get the full landing site configuration by key.

    Args:
        site_key (str): 'ALPHA', 'BETA', atau 'GAMMA'.

    Returns:
        dict: Konfigurasi situs lengkap dari SITES_CONFIG.

    Raises:
        KeyError: Jika site_key tidak valid.
    """
    if site_key not in SITES_CONFIG:
        raise KeyError(
            f"Site key '{site_key}' tidak valid. "
            f"Pilihan: {list(SITES_CONFIG.keys())}"
        )
    return SITES_CONFIG[site_key]


# =====================================================================
# 8. VALIDASI OTOMATIS SAAT MODULE DILOAD
#    Automatic validation when module is loaded
# =====================================================================

def _validate_constants() -> None:
    """
    Validasi konsistensi internal konstanta.
    Dijalankan otomatis saat modul pertama kali diimport.
    Internal consistency validation for constants.
    Run automatically when the module is first imported.
    """
    assert LUNAR_SYNODIC_DAYS > 0, "LUNAR_SYNODIC_DAYS harus positif"
    assert R_MOON_M > 0, "R_MOON_M harus positif"
    assert G_MOON > 0, "G_MOON harus positif"
    assert DRY_MASS > 0, "DRY_MASS harus positif"
    assert PROP_MASS_INIT > 0, "PROP_MASS_INIT harus positif"
    assert MAX_THRUST > MIN_THRUST > 0, "MAX_THRUST harus > MIN_THRUST > 0"
    assert ISP > 0, "ISP harus positif"
    assert DT > 0, "DT harus positif"
    assert ELEV_MAX_M > ELEV_MIN_M, "ELEV_MAX_M harus > ELEV_MIN_M"
    assert set(SITES_CONFIG.keys()) == {"ALPHA", "BETA", "GAMMA"}, \
        "SITES_CONFIG harus memiliki tepat 3 kunci: ALPHA, BETA, GAMMA"
    for key, site in SITES_CONFIG.items():
        required_fields = [
            "name", "short", "tag", "pixel_coord", "coord_3d",
            "elev_m", "slope_deg", "lat_deg", "lon_deg", "desc", "color_hex"
        ]
        for field in required_fields:
            assert field in site, f"SITES_CONFIG['{key}'] missing field '{field}'"


_validate_constants()


# =====================================================================
# 9. SELF-TEST — Jalankan `python constants.py` untuk verifikasi
#    Self-test — Run `python constants.py` to verify
# =====================================================================

if __name__ == "__main__":
    print("=" * 70)
    print("  constants.py — Single Source of Truth | Lunar Landing Site Navigator")
    print("=" * 70)

    print("\n📐 KONSTANTA ASTRONOMI & FISIKA:")
    print(f"   Siklus Sinodis Bulan  : {LUNAR_SYNODIC_DAYS} hari")
    print(f"   Jari-jari Bulan       : {R_MOON_M:,.0f} m")
    print(f"   Gravitasi Bulan       : {G_MOON} m/s²")
    print(f"   Gravitasi Standar (g₀): {G0} m/s²")

    print("\n🚀 SPESIFIKASI WAHANA PENDARATAN:")
    print(f"   Massa Kering          : {DRY_MASS} kg")
    print(f"   Massa Propelan Awal   : {PROP_MASS_INIT} kg")
    print(f"   Massa Total Awal      : {TOTAL_MASS_INIT} kg")
    print(f"   Gaya Dorong Maks      : {MAX_THRUST:,.0f} N")
    print(f"   Gaya Dorong Min       : {MIN_THRUST:,.0f} N")
    print(f"   Specific Impulse (Isp): {ISP} s")
    print(f"   Timestep Simulasi     : {DT} s")

    print("\n📅 KALENDER MISI:")
    print(f"   Mission Epoch (New Moon): {MISSION_EPOCH.strftime('%d %B %Y %H:%M')} UTC")
    print(f"   Hackathon Mulai         : {HACKATHON_START.strftime('%d %B %Y %H:%M')} WIB")
    print(f"   Hackathon Selesai       : {HACKATHON_END.strftime('%d %B %Y %H:%M')} WIB")

    print("\n🌑 KONFIGURASI SITUS PENDARATAN:")
    for key, site in SITES_CONFIG.items():
        print(f"\n   [{key}] {site['name']}")
        print(f"         Tag     : {site['tag']}")
        print(f"         Lat/Lon : {site['lat_deg']}°, {site['lon_deg']}°")
        print(f"         Elevasi : {site['elev_m']:,.0f} m")
        print(f"         Slope   : {site['slope_deg']}°")
        print(f"         3D Pos  : {site['coord_3d'].tolist()} m")
        print(f"         Pixel   : {site['pixel_coord']}")
        print(f"         Warna   : {site['color_hex']}")

    print("\n🛰️  JPL HORIZONS API:")
    print(f"   URL    : {HORIZONS_API_URL}")
    print(f"   Cache  : {HORIZONS_CACHE_FILE}")
    print(f"   TTL    : {HORIZONS_CACHE_TTL_HOURS} jam")
    print(f"   Observer ALPHA : {OBSERVER_LOCATION_ALPHA}")
    print(f"   Observer BETA  : {OBSERVER_LOCATION_BETA}")
    print(f"   Observer GAMMA : {OBSERVER_LOCATION_GAMMA}")

    print("\n🧮 UJI HELPER FUNCTIONS:")
    test_day = 4.2
    test_date = day_offset_to_date(test_day)
    back_offset = date_to_day_offset(test_date)
    abs_day = date_to_absolute_day(datetime(2026, 11, 14))
    print(f"   day_offset_to_date({test_day})     → {test_date.strftime('%d %b %Y %H:%M')} UTC")
    print(f"   date_to_day_offset(hasil di atas)  → {back_offset:.4f} hari")
    print(f"   date_to_absolute_day(14 Nov 2026)  → {abs_day:.2f} hari dari epoch")

    print("\n✅ Semua konstanta valid. Module siap digunakan.")
    print("=" * 70)
