# -*- coding: utf-8 -*-
# horizons_api.py — JPL Horizons REST API Client
# =====================================================================
# Proyek  : Lunar Landing Site Navigator
# Event   : NASA Space Apps Challenge 2026
# Deskripsi: Client untuk JPL Horizons REST API NASA — mengambil data
#            posisi Matahari dan Bumi secara riil dan akurat sebagai
#            observer dari permukaan Kutub Selatan Bulan.
#            Dilengkapi sistem caching (24 jam) dan fallback offline.
# Description: Client for NASA JPL Horizons REST API — fetches real,
#              accurate Sun and Earth position data as observed from
#              the Lunar South Pole surface.
#              Includes 24-hour caching and offline fallback.
# =====================================================================

import os
import json
import math
import logging
import re
import socket
from datetime import datetime, timedelta, timezone
from typing import Optional

import requests

from constants import (
    HORIZONS_API_URL,
    HORIZONS_CACHE_FILE,
    HORIZONS_CACHE_TTL_HOURS,
    HORIZONS_SUN_ID,
    HORIZONS_EARTH_ID,
    HORIZONS_QUANTITIES,
    HORIZONS_CENTER_BODY,
    HORIZONS_REQUEST_TIMEOUT,
    HORIZONS_PING_TIMEOUT,
    OBSERVER_LOCATIONS,
    LUNAR_SYNODIC_DAYS,
    LUNAR_ANOMALISTIC_DAYS,
    LUNAR_NODAL_DAYS,
    SITES_CONFIG,
)

# =====================================================================
# KONFIGURASI LOGGING / Logging Configuration
# =====================================================================
logging.basicConfig(
    level=logging.INFO,
    format="[%(asctime)s] %(levelname)s — %(message)s",
    datefmt="%H:%M:%S",
)
logger = logging.getLogger(__name__)


# =====================================================================
# CUSTOM EXCEPTION / Custom Exception Class
# =====================================================================

class HorizonsAPIError(Exception):
    """
    Exception khusus untuk error yang berasal dari JPL Horizons API.
    Custom exception for errors originating from the JPL Horizons API.
    """
    def __init__(self, message: str, status_code: Optional[int] = None, raw: Optional[str] = None):
        super().__init__(message)
        self.status_code = status_code
        self.raw = raw

    def __str__(self):
        base = super().__str__()
        if self.status_code:
            return f"[HTTP {self.status_code}] {base}"
        return base


# =====================================================================
# SISTEM CACHING / Caching System
# =====================================================================

def _load_full_cache() -> dict:
    """
    Muat seluruh isi file cache JSON.
    Load the entire cache JSON file.

    Returns:
        dict: Isi cache, atau dict kosong jika file tidak ada / rusak.
    """
    if not os.path.exists(HORIZONS_CACHE_FILE):
        return {}
    try:
        with open(HORIZONS_CACHE_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except (json.JSONDecodeError, OSError):
        logger.warning("File cache rusak — akan dibuat ulang.")
        return {}


def _save_full_cache(cache: dict) -> None:
    """
    Simpan seluruh cache ke file JSON.
    Save the entire cache to the JSON file.
    """
    try:
        os.makedirs(os.path.dirname(HORIZONS_CACHE_FILE), exist_ok=True)
        with open(HORIZONS_CACHE_FILE, "w", encoding="utf-8") as f:
            json.dump(cache, f, indent=2, ensure_ascii=False)
    except OSError as e:
        logger.error(f"Gagal menyimpan cache: {e}")


def _make_cache_key(command: str, site_key: str,
                    start_dt: datetime, end_dt: datetime,
                    step_hours: int) -> str:
    """
    Buat cache key unik berdasarkan parameter request.
    Create a unique cache key based on request parameters.

    Format: "{command}_{site_key}_{start_date}_{end_date}_{step_hours}h"
    Contoh: "10_ALPHA_2026-11-14_2026-11-15_1h"
    """
    return (
        f"{command}_{site_key}_"
        f"{start_dt.strftime('%Y-%m-%d')}_"
        f"{end_dt.strftime('%Y-%m-%d')}_"
        f"{step_hours}h"
    )


def load_cache(key: str) -> Optional[list]:
    """
    Muat data dari cache berdasarkan key. Kembalikan None jika tidak ada
    atau sudah kadaluarsa (> HORIZONS_CACHE_TTL_HOURS jam).

    Load cached data by key. Returns None if missing or stale
    (older than HORIZONS_CACHE_TTL_HOURS hours).

    Args:
        key (str): Cache key yang dibuat oleh _make_cache_key().

    Returns:
        list | None: Data posisi yang ter-cache, atau None jika miss/stale.
    """
    cache = _load_full_cache()
    entry = cache.get(key)
    if entry is None:
        return None

    # Cek TTL / Check TTL
    try:
        fetched_at = datetime.fromisoformat(entry["fetched_at"])
        age_hours = (datetime.now(timezone.utc) - fetched_at).total_seconds() / 3600.0
        if age_hours > HORIZONS_CACHE_TTL_HOURS:
            logger.info(f"Cache '{key}' kadaluarsa ({age_hours:.1f}h > {HORIZONS_CACHE_TTL_HOURS}h).")
            return None
        logger.info(f"Cache HIT '{key}' (usia: {age_hours:.1f}h).")
        return entry["data"]
    except (KeyError, ValueError):
        logger.warning(f"Format cache entry '{key}' tidak valid, diabaikan.")
        return None


def save_cache(key: str, data: list) -> None:
    """
    Simpan data posisi ke cache dengan timestamp saat ini.
    Save position data to cache with the current timestamp.

    Args:
        key (str): Cache key unik.
        data (list): List dict posisi [{"datetime_utc", "az", "el"}, ...].
    """
    cache = _load_full_cache()
    cache[key] = {
        "fetched_at": datetime.now(timezone.utc).isoformat(),
        "data": data,
    }
    _save_full_cache(cache)
    logger.info(f"Cache SAVE '{key}' ({len(data)} data poin).")


def clear_cache() -> None:
    """
    Hapus seluruh isi file cache.
    Clear the entire cache file.
    """
    if os.path.exists(HORIZONS_CACHE_FILE):
        try:
            os.remove(HORIZONS_CACHE_FILE)
            logger.info("Cache JPL Horizons berhasil dihapus.")
        except OSError as e:
            logger.error(f"Gagal menghapus cache: {e}")
    else:
        logger.info("File cache tidak ditemukan — tidak ada yang dihapus.")


# =====================================================================
# CEK KONEKTIVITAS API / API Connectivity Check
# =====================================================================

def is_api_available() -> bool:
    """
    Cek apakah JPL Horizons API dapat dijangkau saat ini.
    Menggunakan koneksi socket langsung agar tidak perlu HTTP overhead.

    Check if the JPL Horizons API is currently reachable.
    Uses a direct socket connection to avoid HTTP overhead.

    Returns:
        bool: True jika API dapat dijangkau, False jika offline.
    """
    try:
        sock = socket.create_connection(
            ("ssd.jpl.nasa.gov", 443),
            timeout=HORIZONS_PING_TIMEOUT
        )
        sock.close()
        return True
    except (socket.timeout, socket.error, OSError):
        return False


# =====================================================================
# PARSING RESPONSE JPL HORIZONS / JPL Horizons Response Parser
# =====================================================================

_MONTHS_ABBR = {
    "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4,
    "May": 5, "Jun": 6, "Jul": 7, "Aug": 8,
    "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12,
}


def _parse_horizons_text(result_text: str) -> list:
    """
    Parse teks output JPL Horizons menjadi list of dict posisi.

    Format baris data antara marker $$SOE dan $$EOE:
      2026-Nov-14 00:00      47.2137   1.5421   ...
      ^-- tanggal/jam UTC    ^-- Az    ^-- El

    Parse JPL Horizons plain-text output into a list of position dicts.

    The data lines appear between $$SOE and $$EOE markers:
      2026-Nov-14 00:00      47.2137   1.5421   ...
      ^-- UTC date/time      ^-- Az    ^-- El

    Args:
        result_text (str): String teks dari field 'result' response JSON.

    Returns:
        list[dict]: List [{"datetime_utc": str, "az": float, "el": float}, ...]

    Raises:
        HorizonsAPIError: Jika marker $$SOE/$$EOE tidak ditemukan.
    """
    if "$$SOE" not in result_text or "$$EOE" not in result_text:
        # Tangkap pesan error dari JPL jika ada
        # Capture JPL error message if present
        error_match = re.search(r"!!\s*(.*)", result_text)
        error_msg = error_match.group(1).strip() if error_match else "Marker $$SOE/$$EOE tidak ditemukan"
        raise HorizonsAPIError(f"Response JPL tidak valid: {error_msg}", raw=result_text[:500])

    # Ambil bagian antara marker / Extract section between markers
    soe_idx = result_text.index("$$SOE") + len("$$SOE")
    eoe_idx = result_text.index("$$EOE")
    data_block = result_text[soe_idx:eoe_idx].strip()

    if not data_block:
        raise HorizonsAPIError("Blok data antara $$SOE dan $$EOE kosong.")

    results = []
    for line in data_block.splitlines():
        line = line.strip()
        if not line:
            continue

        # Format baris: "2026-Nov-14 00:00      47.2137   1.5421  ..."
        # Line format:  "2026-Nov-14 00:00      47.2137   1.5421  ..."
        parts = line.split()

        # Butuh minimal: date (2026-Nov-14), time (00:00), az, el
        # Need at least: date (2026-Nov-14), time (00:00), az, el
        if len(parts) < 4:
            continue

        try:
            # Parse tanggal format "2026-Nov-14" / Parse date "2026-Nov-14"
            date_str = parts[0]  # "2026-Nov-14"
            time_str = parts[1]  # "00:00"

            date_parts = date_str.split("-")
            if len(date_parts) != 3:
                continue

            year  = int(date_parts[0])
            month = _MONTHS_ABBR.get(date_parts[1], 0)
            day   = int(date_parts[2])

            if month == 0:
                continue

            hour, minute = (int(x) for x in time_str.split(":"))
            dt_utc = datetime(year, month, day, hour, minute,
                              tzinfo=timezone.utc)

            # Cari token float untuk Azimuth dan Elevasi (mengabaikan flag seperti '*i', 'm', dll.)
            # Find float tokens for Azimuth and Elevation (skipping flags like '*i', 'm', etc.)
            floats = []
            for p in parts[2:]:
                try:
                    floats.append(float(p))
                except ValueError:
                    continue

            if len(floats) < 2:
                continue

            az = floats[0]
            el = floats[1]

            results.append({
                "datetime_utc": dt_utc.isoformat(),
                "az": az,
                "el": el,
            })

        except (ValueError, IndexError):
            # Lewati baris yang tidak bisa di-parse / Skip unparseable lines
            continue

    if not results:
        raise HorizonsAPIError(
            "Tidak ada baris data yang berhasil di-parse dari response JPL Horizons."
        )

    logger.info(f"Berhasil parse {len(results)} baris data posisi dari JPL Horizons.")
    return results


# =====================================================================
# FORMAT DATETIME UNTUK JPL API / Datetime Formatter for JPL API
# =====================================================================

_JPL_MONTHS = [
    "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]


def _format_jpl_time(dt: datetime) -> str:
    """
    Format datetime ke string yang diterima JPL Horizons API.
    Format: "YYYY-Mon-DD HH:MM"  contoh: "2026-Nov-14 06:00"

    Format datetime to a string accepted by the JPL Horizons API.
    Format: "YYYY-Mon-DD HH:MM"  e.g.: "2026-Nov-14 06:00"

    Args:
        dt (datetime): Datetime yang akan diformat (timezone-aware atau naive UTC).

    Returns:
        str: String waktu format JPL.
    """
    return f"{dt.year}-{_JPL_MONTHS[dt.month]}-{dt.day:02d} {dt.hour:02d}:{dt.minute:02d}"


# =====================================================================
# FUNGSI UTAMA FETCH / Core Fetch Functions
# =====================================================================

def fetch_horizons(
    command: str,
    site_key: str,
    start_dt: datetime,
    end_dt: datetime,
    step_hours: int = 1,
) -> list:
    """
    Ambil data posisi (azimuth & elevasi) dari JPL Horizons REST API.

    Mencoba cache terlebih dahulu. Jika cache miss atau kadaluarsa,
    lakukan HTTP request ke API JPL, parse hasilnya, simpan ke cache,
    dan kembalikan data.

    Fetch position data (azimuth & elevation) from JPL Horizons REST API.

    Tries cache first. On cache miss or stale, performs an HTTP request
    to the JPL API, parses the result, saves to cache, and returns data.

    Args:
        command (str): ID target JPL — '10' (Matahari) atau '399' (Bumi).
        site_key (str): Kunci situs observer — 'ALPHA', 'BETA', atau 'GAMMA'.
        start_dt (datetime): Datetime awal periode pengamatan (UTC).
        end_dt (datetime): Datetime akhir periode pengamatan (UTC).
        step_hours (int): Interval pengamatan dalam jam (default: 1).

    Returns:
        list[dict]: List [{"datetime_utc": str, "az": float, "el": float}, ...]

    Raises:
        HorizonsAPIError: Jika request gagal atau response tidak valid.
        ValueError: Jika site_key atau command tidak valid.
    """
    # Validasi input / Input validation
    if site_key not in SITES_CONFIG:
        raise ValueError(
            f"site_key '{site_key}' tidak valid. Pilihan: {list(SITES_CONFIG.keys())}"
        )
    if command not in (HORIZONS_SUN_ID, HORIZONS_EARTH_ID):
        raise ValueError(
            f"command '{command}' tidak valid. Gunakan '{HORIZONS_SUN_ID}' (Matahari) "
            f"atau '{HORIZONS_EARTH_ID}' (Bumi)."
        )
    if end_dt <= start_dt:
        raise ValueError("end_dt harus lebih besar dari start_dt.")

    body_name = "Matahari" if command == HORIZONS_SUN_ID else "Bumi"

    # --- Cek cache terlebih dahulu / Check cache first ---
    cache_key = _make_cache_key(command, site_key, start_dt, end_dt, step_hours)
    cached = load_cache(cache_key)
    if cached is not None:
        return cached

    # --- Tidak ada cache — fetch dari API / Cache miss — fetch from API ---
    observer_coord = OBSERVER_LOCATIONS[site_key]
    start_str = _format_jpl_time(start_dt)
    stop_str  = _format_jpl_time(end_dt)

    params = {
        "format":       "json",
        "COMMAND":      f"'{command}'",
        "EPHEM_TYPE":   "OBSERVER",
        "CENTER":       f"coord@{HORIZONS_CENTER_BODY}",
        "SITE_COORD":   f"'{observer_coord}'",
        "COORD_TYPE":   "GEODETIC",
        "START_TIME":   f"'{start_str}'",
        "STOP_TIME":    f"'{stop_str}'",
        "STEP_SIZE":    f"'{step_hours} h'",
        "QUANTITIES":   f"'{HORIZONS_QUANTITIES}'",
        "ANG_FORMAT":   "DEG",
        "APPARENT":     "AIRLESS",
        "OBJ_DATA":     "NO",
        "MAKE_EPHEM":   "YES",
    }

    logger.info(
        f"Fetching dari JPL Horizons: {body_name} @ {site_key} | "
        f"{start_str} → {stop_str} | step={step_hours}h"
    )

    # JPL Horizons API menerima parameter via GET dengan query string biasa.
    # Kunci-kunci yang mengandung tanda kutip tidak boleh di-encode double —
    # kirim sebagai string literal tanpa quote wrapping tambahan.
    # JPL Horizons API accepts parameters via GET as plain query strings.
    # Keys with single quotes must NOT be double-encoded — send as literals.
    clean_params = {
        "format":       "json",
        "COMMAND":      command,
        "EPHEM_TYPE":   "OBSERVER",
        "CENTER":       f"coord@{HORIZONS_CENTER_BODY}",
        "SITE_COORD":   observer_coord,
        "COORD_TYPE":   "GEODETIC",
        "START_TIME":   start_str,
        "STOP_TIME":    stop_str,
        "STEP_SIZE":    f"{step_hours}h",
        "QUANTITIES":   HORIZONS_QUANTITIES,
        "ANG_FORMAT":   "DEG",
        "APPARENT":     "AIRLESS",
        "OBJ_DATA":     "NO",
        "MAKE_EPHEM":   "YES",
    }

    try:
        response = requests.get(
            HORIZONS_API_URL,
            params=clean_params,
            timeout=HORIZONS_REQUEST_TIMEOUT,
        )
        response.raise_for_status()

    except requests.exceptions.Timeout:
        raise HorizonsAPIError(
            f"Request ke JPL Horizons timeout setelah {HORIZONS_REQUEST_TIMEOUT}s. "
            f"Cek koneksi internet atau coba lagi nanti."
        )
    except requests.exceptions.ConnectionError as e:
        raise HorizonsAPIError(
            f"Tidak bisa terhubung ke JPL Horizons API: {e}"
        )
    except requests.exceptions.HTTPError as e:
        raise HorizonsAPIError(
            f"HTTP Error dari JPL Horizons: {e}",
            status_code=response.status_code,
        )

    # Parse JSON response
    try:
        resp_json = response.json()
    except ValueError:
        raise HorizonsAPIError(
            "Response JPL Horizons bukan JSON yang valid.",
            raw=response.text[:300],
        )

    # Ambil field 'result' dari JSON / Extract 'result' field from JSON
    result_text = resp_json.get("result", "")
    if not result_text:
        signature = resp_json.get("signature", {})
        raise HorizonsAPIError(
            f"Field 'result' kosong dalam response JPL Horizons. "
            f"Signature: {signature}",
            raw=str(resp_json)[:300],
        )

    # Parse teks menjadi data terstruktur / Parse text into structured data
    data = _parse_horizons_text(result_text)

    # Simpan ke cache / Save to cache
    save_cache(cache_key, data)

    logger.info(
        f"✅ Berhasil fetch {len(data)} titik data {body_name} @ {site_key} "
        f"dari JPL Horizons."
    )
    return data


def fetch_sun_positions(
    site_key: str,
    start_dt: datetime,
    end_dt: datetime,
    step_hours: int = 1,
) -> list:
    """
    Ambil data posisi Matahari dari JPL Horizons untuk situs tertentu.
    Wrapper untuk fetch_horizons() dengan command='10' (Sun).

    Fetch Sun position data from JPL Horizons for a given site.
    Wrapper for fetch_horizons() with command='10' (Sun).

    Args:
        site_key (str): Kunci situs observer ('ALPHA', 'BETA', 'GAMMA').
        start_dt (datetime): Datetime awal (UTC).
        end_dt (datetime): Datetime akhir (UTC).
        step_hours (int): Interval dalam jam.

    Returns:
        list[dict]: [{"datetime_utc": str, "az": float, "el": float}, ...]
    """
    return fetch_horizons(HORIZONS_SUN_ID, site_key, start_dt, end_dt, step_hours)


def fetch_earth_positions(
    site_key: str,
    start_dt: datetime,
    end_dt: datetime,
    step_hours: int = 1,
) -> list:
    """
    Ambil data posisi Bumi dari JPL Horizons untuk situs tertentu.
    Wrapper untuk fetch_horizons() dengan command='399' (Earth).

    Fetch Earth position data from JPL Horizons for a given site.
    Wrapper for fetch_horizons() with command='399' (Earth).

    Args:
        site_key (str): Kunci situs observer ('ALPHA', 'BETA', 'GAMMA').
        start_dt (datetime): Datetime awal (UTC).
        end_dt (datetime): Datetime akhir (UTC).
        step_hours (int): Interval dalam jam.

    Returns:
        list[dict]: [{"datetime_utc": str, "az": float, "el": float}, ...]
    """
    return fetch_horizons(HORIZONS_EARTH_ID, site_key, start_dt, end_dt, step_hours)


def fetch_mission_window_data(
    site_key: str,
    start_dt: datetime,
    end_dt: datetime,
    step_hours: int = 1,
) -> dict:
    """
    Fetch posisi Matahari DAN Bumi sekaligus untuk rentang waktu misi.

    Memanggil fetch_sun_positions() dan fetch_earth_positions() secara
    berurutan dan mengembalikan keduanya dalam satu dict.

    Fetch both Sun AND Earth positions for the entire mission window.

    Calls fetch_sun_positions() and fetch_earth_positions() sequentially
    and returns both in a single dict.

    Args:
        site_key (str): Kunci situs observer ('ALPHA', 'BETA', 'GAMMA').
        start_dt (datetime): Datetime awal periode misi (UTC).
        end_dt (datetime): Datetime akhir periode misi (UTC).
        step_hours (int): Interval sampling dalam jam.

    Returns:
        dict: {
            "sun":        list[dict],   # Data posisi Matahari
            "earth":      list[dict],   # Data posisi Bumi
            "site":       str,          # Kunci situs
            "start":      str,          # ISO datetime awal
            "end":        str,          # ISO datetime akhir
            "step_hours": int,          # Interval jam
            "fetched_at": str,          # ISO timestamp fetch
            "source":     str,          # "jpl_live" atau "approx_fallback"
        }

    Raises:
        HorizonsAPIError: Jika salah satu fetch gagal dan offline fallback juga gagal.
    """
    logger.info(
        f"Fetching mission window data: {site_key} | "
        f"{start_dt.strftime('%Y-%m-%d')} → {end_dt.strftime('%Y-%m-%d')} | "
        f"step={step_hours}h"
    )

    sun_data = fetch_sun_positions(site_key, start_dt, end_dt, step_hours)
    earth_data = fetch_earth_positions(site_key, start_dt, end_dt, step_hours)

    return {
        "sun":        sun_data,
        "earth":      earth_data,
        "site":       site_key,
        "start":      start_dt.isoformat(),
        "end":        end_dt.isoformat(),
        "step_hours": step_hours,
        "fetched_at": datetime.now(timezone.utc).isoformat(),
        "source":     "jpl_live",
    }


# =====================================================================
# INTERPOLASI POSISI / Position Interpolation
# =====================================================================

def get_position_at_datetime(
    positions_list: list,
    target_dt: datetime,
) -> dict:
    """
    Interpolasi linear posisi (az, el) dari list data untuk waktu tertentu.

    Jika target_dt tepat sama dengan salah satu titik data, nilai itu
    dikembalikan langsung. Jika di antara dua titik, dilakukan interpolasi
    linear. Jika di luar rentang data, digunakan nilai terdekat (clamp).

    Linearly interpolate (az, el) from position list for a specific time.

    If target_dt matches a data point exactly, that value is returned.
    If between two points, linear interpolation is performed.
    If outside the data range, the nearest value is used (clamped).

    Args:
        positions_list (list): List [{"datetime_utc": str, "az": float, "el": float}].
        target_dt (datetime): Waktu yang ingin diinterpolasi (UTC).

    Returns:
        dict: {"datetime_utc": str, "az": float, "el": float, "interpolated": bool}

    Raises:
        ValueError: Jika positions_list kosong.
    """
    if not positions_list:
        raise ValueError("positions_list tidak boleh kosong.")

    # Pastikan target_dt timezone-aware / Ensure target_dt is timezone-aware
    if target_dt.tzinfo is None:
        target_dt = target_dt.replace(tzinfo=timezone.utc)

    # Parse semua timestamp / Parse all timestamps
    parsed = []
    for entry in positions_list:
        try:
            dt = datetime.fromisoformat(entry["datetime_utc"])
            if dt.tzinfo is None:
                dt = dt.replace(tzinfo=timezone.utc)
            parsed.append((dt, entry["az"], entry["el"]))
        except (KeyError, ValueError):
            continue

    if not parsed:
        raise ValueError("Tidak ada entry valid dalam positions_list.")

    parsed.sort(key=lambda x: x[0])

    # Clamp ke ujung bawah / Clamp to lower bound
    if target_dt <= parsed[0][0]:
        dt0, az0, el0 = parsed[0]
        return {"datetime_utc": target_dt.isoformat(), "az": az0, "el": el0, "interpolated": False}

    # Clamp ke ujung atas / Clamp to upper bound
    if target_dt >= parsed[-1][0]:
        dt_n, az_n, el_n = parsed[-1]
        return {"datetime_utc": target_dt.isoformat(), "az": az_n, "el": el_n, "interpolated": False}

    # Interpolasi linear di antara dua titik / Linear interpolation between two points
    for i in range(len(parsed) - 1):
        dt_lo, az_lo, el_lo = parsed[i]
        dt_hi, az_hi, el_hi = parsed[i + 1]

        if dt_lo <= target_dt <= dt_hi:
            span = (dt_hi - dt_lo).total_seconds()
            if span == 0:
                return {"datetime_utc": target_dt.isoformat(), "az": az_lo, "el": el_lo, "interpolated": False}

            t = (target_dt - dt_lo).total_seconds() / span

            # Interpolasi azimuth dengan penanganan wrap-around 360°
            # Azimuth interpolation with 360° wrap-around handling
            az_diff = az_hi - az_lo
            if az_diff > 180.0:
                az_diff -= 360.0
            elif az_diff < -180.0:
                az_diff += 360.0
            az_interp = (az_lo + t * az_diff) % 360.0

            el_interp = el_lo + t * (el_hi - el_lo)

            return {
                "datetime_utc": target_dt.isoformat(),
                "az": round(az_interp, 4),
                "el": round(el_interp, 4),
                "interpolated": True,
            }

    # Fallback — tidak seharusnya dicapai / Fallback — should not be reached
    dt_n, az_n, el_n = parsed[-1]
    return {"datetime_utc": target_dt.isoformat(), "az": az_n, "el": el_n, "interpolated": False}


# =====================================================================
# FALLBACK OFFLINE (APROKSIMASI ANALITIK)
# Offline Fallback (Analytical Approximations)
# Sumber / Source: solar_earth_horizon_planner.py (legacy)
# =====================================================================

def get_sun_position_approx(day_val: float) -> tuple:
    """
    Hitung posisi Matahari secara aproksimasi berdasarkan offset hari siklus Bulan.

    Digunakan sebagai fallback ketika JPL Horizons API tidak dapat dijangkau.
    Akurasi terbatas — hanya cocok untuk estimasi kasar.

    Calculate approximate Sun position based on lunar cycle day offset.

    Used as fallback when JPL Horizons API is unreachable.
    Limited accuracy — suitable only for rough estimates.

    Args:
        day_val (float): Offset hari dalam siklus sinodis (0 – 29.53).

    Returns:
        tuple[float, float]: (azimuth_deg, elevation_deg)
    """
    az_sun = (day_val / LUNAR_SYNODIC_DAYS * 360.0) % 360.0
    el_sun = 1.54 * math.sin(2.0 * math.pi * (day_val / LUNAR_SYNODIC_DAYS))
    return az_sun, el_sun


def get_earth_position_approx(day_val: float) -> tuple:
    """
    Hitung posisi Bumi secara aproksimasi berdasarkan offset hari siklus Bulan.

    Mempertimbangkan libras anomalistik dan nodal Bulan secara sederhana.
    Digunakan sebagai fallback ketika API tidak tersedia.

    Calculate approximate Earth position based on lunar cycle day offset.

    Accounts for lunar anomalistic and nodal libration simply.
    Used as fallback when the API is unavailable.

    Args:
        day_val (float): Offset hari dalam siklus sinodis (0 – 29.53).

    Returns:
        tuple[float, float]: (azimuth_deg, elevation_deg)
    """
    d_anom  = day_val / LUNAR_ANOMALISTIC_DAYS
    d_nodal = day_val / LUNAR_NODAL_DAYS
    az_earth = (7.2 * math.sin(2.0 * math.pi * d_anom)) % 360.0
    el_earth = 4.5 + 1.8 * math.cos(2.0 * math.pi * d_nodal)
    return az_earth, el_earth


def get_position_safe(
    body: str,
    site_key: str,
    target_dt: datetime,
    mission_data: Optional[dict] = None,
    day_val: Optional[float] = None,
) -> dict:
    """
    Ambil posisi body (Matahari/Bumi) dengan fallback otomatis ke aproksimasi.

    Urutan prioritas:
    1. Interpolasi dari mission_data (jika tersedia & memuat body yang relevan)
    2. Fallback ke aproksimasi analitik (jika offline atau data tidak ada)

    Get body (Sun/Earth) position with automatic fallback to approximation.

    Priority order:
    1. Interpolate from mission_data (if available & contains relevant body)
    2. Fallback to analytical approximation (if offline or no data)

    Args:
        body (str): 'sun' atau 'earth'.
        site_key (str): Kunci situs observer.
        target_dt (datetime): Waktu target (UTC).
        mission_data (dict, optional): Dict dari fetch_mission_window_data().
        day_val (float, optional): Offset hari untuk aproksimasi fallback.

    Returns:
        dict: {
            "az": float,
            "el": float,
            "source": "jpl_interpolated" | "approx_fallback",
            "datetime_utc": str,
        }
    """
    body = body.lower()

    # Coba interpolasi dari mission_data / Try interpolation from mission_data
    if mission_data is not None:
        key = "sun" if body == "sun" else "earth"
        positions = mission_data.get(key, [])
        if positions:
            try:
                result = get_position_at_datetime(positions, target_dt)
                result["source"] = "jpl_interpolated"
                return result
            except (ValueError, Exception) as e:
                logger.warning(f"Interpolasi gagal: {e}. Fallback ke aproksimasi.")

    # Fallback ke aproksimasi / Fallback to approximation
    if day_val is None:
        from constants import MISSION_EPOCH, date_to_day_offset
        day_val = date_to_day_offset(target_dt.replace(tzinfo=None) if target_dt.tzinfo else target_dt)

    if body == "sun":
        az, el = get_sun_position_approx(day_val)
    else:
        az, el = get_earth_position_approx(day_val)

    logger.debug(f"Aproksimasi {body}: Az={az:.1f}°, El={el:+.2f}°")
    return {
        "az": round(az, 4),
        "el": round(el, 4),
        "source": "approx_fallback",
        "datetime_utc": target_dt.isoformat() if target_dt.tzinfo else target_dt.replace(tzinfo=timezone.utc).isoformat(),
    }


# =====================================================================
# UTILITAS TAMBAHAN / Additional Utilities
# =====================================================================

def build_approx_timeline(
    site_key: str,
    start_dt: datetime,
    end_dt: datetime,
    step_hours: int = 1,
) -> dict:
    """
    Bangun timeline aproksimasi posisi Sun & Earth tanpa memanggil API.
    Berguna sebagai fallback penuh ketika offline.

    Build an approximate Sun & Earth position timeline without calling the API.
    Useful as a full fallback when offline.

    Args:
        site_key (str): Kunci situs observer.
        start_dt (datetime): Datetime awal (UTC).
        end_dt (datetime): Datetime akhir (UTC).
        step_hours (int): Interval dalam jam.

    Returns:
        dict: Struktur yang sama dengan fetch_mission_window_data() tapi
              source="approx_fallback".
    """
    from constants import date_to_day_offset

    sun_data, earth_data = [], []
    current = start_dt if start_dt.tzinfo else start_dt.replace(tzinfo=timezone.utc)
    end = end_dt if end_dt.tzinfo else end_dt.replace(tzinfo=timezone.utc)

    while current <= end:
        day_val = date_to_day_offset(current.replace(tzinfo=None))
        az_s, el_s = get_sun_position_approx(day_val)
        az_e, el_e = get_earth_position_approx(day_val)

        dt_iso = current.isoformat()
        sun_data.append({"datetime_utc": dt_iso, "az": round(az_s, 4), "el": round(el_s, 4)})
        earth_data.append({"datetime_utc": dt_iso, "az": round(az_e, 4), "el": round(el_e, 4)})
        current += timedelta(hours=step_hours)

    return {
        "sun":        sun_data,
        "earth":      earth_data,
        "site":       site_key,
        "start":      start_dt.isoformat(),
        "end":        end_dt.isoformat(),
        "step_hours": step_hours,
        "fetched_at": datetime.now(timezone.utc).isoformat(),
        "source":     "approx_fallback",
    }


def fetch_mission_window_data_safe(
    site_key: str,
    start_dt: datetime,
    end_dt: datetime,
    step_hours: int = 1,
) -> dict:
    """
    Versi aman dari fetch_mission_window_data() dengan fallback otomatis.

    Coba fetch dari JPL Horizons API. Jika gagal (offline / error),
    otomatis fallback ke build_approx_timeline() tanpa melempar exception.

    Safe version of fetch_mission_window_data() with automatic fallback.

    Attempts to fetch from JPL Horizons API. If it fails (offline / error),
    automatically falls back to build_approx_timeline() without raising.

    Args:
        site_key, start_dt, end_dt, step_hours: Sama dengan fetch_mission_window_data().

    Returns:
        dict: Mission window data (dari API atau aproksimasi).
              Field 'source' menunjukkan asal data: 'jpl_live' atau 'approx_fallback'.
    """
    # Cek konektivitas terlebih dahulu / Check connectivity first
    online = is_api_available()
    if not online:
        logger.warning("🔌 JPL Horizons API tidak dapat dijangkau. Menggunakan aproksimasi offline.")
        return build_approx_timeline(site_key, start_dt, end_dt, step_hours)

    try:
        return fetch_mission_window_data(site_key, start_dt, end_dt, step_hours)
    except HorizonsAPIError as e:
        logger.error(f"JPL Horizons API error: {e}. Fallback ke aproksimasi.")
        return build_approx_timeline(site_key, start_dt, end_dt, step_hours)
    except Exception as e:
        logger.error(f"Error tak terduga saat fetch JPL: {e}. Fallback ke aproksimasi.")
        return build_approx_timeline(site_key, start_dt, end_dt, step_hours)


# =====================================================================
# SELF-TEST — `python horizons_api.py`
# =====================================================================

if __name__ == "__main__":
    import sys

    print("=" * 70)
    print("  horizons_api.py — JPL Horizons REST API Client")
    print("  NASA Space Apps Challenge 2026 | Lunar Landing Site Navigator")
    print("=" * 70)

    SITE   = "ALPHA"
    START  = datetime(2026, 11, 14, 0, 0, tzinfo=timezone.utc)
    END    = datetime(2026, 11, 15, 0, 0, tzinfo=timezone.utc)

    # --- Test 1: Cek konektivitas ---
    print("\n[TEST 1] Cek konektivitas ke JPL Horizons API...")
    online = is_api_available()
    status = "🟢 ONLINE" if online else "🔴 OFFLINE"
    print(f"  → Status: {status}")

    # --- Test 2: Aproksimasi offline ---
    print("\n[TEST 2] Posisi aproksimasi (offline fallback) untuk hari ke-4.2 siklus:")
    az_s, el_s = get_sun_position_approx(4.2)
    az_e, el_e = get_earth_position_approx(4.2)
    print(f"  → Matahari : Az={az_s:.2f}°, El={el_s:+.2f}°")
    print(f"  → Bumi     : Az={az_e:.2f}°, El={el_e:+.2f}°")

    # --- Test 3: Fetch dari API atau fallback ---
    print(f"\n[TEST 3] Fetch data misi — {SITE} | {START.date()} → {END.date()}")
    print(f"  {'Mengambil dari JPL Horizons API...' if online else 'Mode offline — membangun aproksimasi...'}")

    data = fetch_mission_window_data_safe(SITE, START, END, step_hours=1)
    source = data.get("source", "tidak diketahui")
    n_sun   = len(data.get("sun", []))
    n_earth = len(data.get("earth", []))
    print(f"  → Sumber data  : {'🛰️  JPL Live' if source == 'jpl_live' else '⚠️  Aproksimasi Offline'}")
    print(f"  → Titik Matahari: {n_sun} poin")
    print(f"  → Titik Bumi   : {n_earth} poin")

    # Tampilkan 3 baris pertama
    if data["sun"]:
        print("\n  Sampel data Matahari (3 baris pertama):")
        for row in data["sun"][:3]:
            print(f"    {row['datetime_utc']}  Az={row['az']:7.3f}°  El={row['el']:+.3f}°")

    if data["earth"]:
        print("\n  Sampel data Bumi (3 baris pertama):")
        for row in data["earth"][:3]:
            print(f"    {row['datetime_utc']}  Az={row['az']:7.3f}°  El={row['el']:+.3f}°")

    # --- Test 4: Interpolasi ---
    print(f"\n[TEST 4] Interpolasi posisi Matahari pada 2026-11-14 06:30 UTC...")
    target = datetime(2026, 11, 14, 6, 30, tzinfo=timezone.utc)
    if data["sun"]:
        pos = get_position_at_datetime(data["sun"], target)
        interp_label = "terinterpolasi" if pos.get("interpolated") else "tepat/clamp"
        print(f"  → Az={pos['az']:.3f}°, El={pos['el']:+.3f}° ({interp_label})")

    # --- Test 5: get_position_safe ---
    print(f"\n[TEST 5] get_position_safe() pada 2026-11-14 12:00 UTC...")
    t12 = datetime(2026, 11, 14, 12, 0, tzinfo=timezone.utc)
    pos_sun   = get_position_safe("sun",   SITE, t12, mission_data=data)
    pos_earth = get_position_safe("earth", SITE, t12, mission_data=data)
    print(f"  → Matahari : Az={pos_sun['az']:.3f}°, El={pos_sun['el']:+.3f}° [{pos_sun['source']}]")
    print(f"  → Bumi     : Az={pos_earth['az']:.3f}°, El={pos_earth['el']:+.3f}° [{pos_earth['source']}]")

    # --- Test 6: Cache ---
    print(f"\n[TEST 6] Verifikasi sistem cache...")
    cache_key = _make_cache_key(HORIZONS_SUN_ID, SITE, START, END, 1)
    cached = load_cache(cache_key)
    print(f"  → Cache HIT : {'✅ Ya' if cached else '❌ Tidak (mode approx tidak di-cache)'}")

    # --- Test 7: Clear cache ---
    print(f"\n[TEST 7] Clear cache...")
    clear_cache()
    cached_after = load_cache(cache_key)
    print(f"  → Cache setelah clear: {'masih ada ❌' if cached_after else 'kosong ✅'}")

    print("\n✅ Semua test selesai. horizons_api.py siap digunakan.")
    print("=" * 70)
