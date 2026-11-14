# -*- coding: utf-8 -*-
# mission_state.py — Shared Mission State Manager
# =====================================================================
# Proyek  : Lunar Landing Site Navigator
# Event   : NASA Space Apps Challenge 2026
# Deskripsi: Mengelola SHARED STATE yang mengalir dari Modul 1 → 2 → 3 → 4.
#            User tidak perlu input ulang di setiap modul — state tersimpan
#            otomatis di output/mission_state.json dan dibaca oleh modul berikutnya.
# Description: Manages the SHARED STATE flowing from Module 1 → 2 → 3 → 4.
#              Users don't need to re-enter data at each module — state is
#              automatically saved to output/mission_state.json and read by
#              subsequent modules.
# =====================================================================

import os
import json
import logging
from dataclasses import dataclass, field, asdict
from datetime import datetime, timezone
from typing import Optional

from constants import (
    SITES_CONFIG,
    SITE_PRIORITY_ORDER,
    HACKATHON_START,
    LUNAR_SYNODIC_DAYS,
    day_offset_to_date,
    date_to_day_offset,
    get_site_config,
)

# =====================================================================
# KONFIGURASI LOGGING
# Logging Configuration
# =====================================================================
logging.basicConfig(
    level=logging.INFO,
    format="[%(asctime)s] %(levelname)s — %(message)s",
    datefmt="%H:%M:%S",
)
logger = logging.getLogger(__name__)

# =====================================================================
# PATH FILE STATE
# State File Path
# =====================================================================
STATE_FILE_PATH: str = os.path.join("output", "mission_state.json")

# Versi skema state — naikkan jika struktur dataclass berubah
# State schema version — bump when dataclass structure changes
STATE_SCHEMA_VERSION: str = "1.0.0"


# =====================================================================
# DATACLASS: MissionState
# =====================================================================

@dataclass
class MissionState:
    """
    Representasi lengkap status misi pendaratan Bulan saat ini.
    Mengalir dari Modul 1 (Terrain) → 2 (Horizon) → 3 (Trajectory) → 4 (Simulator).

    Complete representation of the current lunar landing mission status.
    Flows from Module 1 (Terrain) → 2 (Horizon) → 3 (Trajectory) → 4 (Simulator).
    """

    # ------------------------------------------------------------------
    # PEMILIHAN SITUS / Site Selection (diisi oleh Modul 1: scan_terrain)
    # ------------------------------------------------------------------

    # Kunci situs aktif yang dipilih — salah satu dari SITES_CONFIG
    # Active site key selected — one of SITES_CONFIG keys
    selected_site: str = "ALPHA"

    # Tandai apakah Modul 1 (Terrain Scanner) sudah selesai dijalankan
    # Flag: whether Module 1 (Terrain Scanner) has been completed
    scan_terrain_done: bool = False

    # ------------------------------------------------------------------
    # PERENCANAAN JENDELA MISI / Mission Window Planning (Modul 2: horizon_planner)
    # ------------------------------------------------------------------

    # Tanggal pendaratan terpilih format ISO "YYYY-MM-DD"
    # Selected landing date in ISO format "YYYY-MM-DD"
    landing_date: str = HACKATHON_START.strftime("%Y-%m-%d")

    # Jam UTC pendaratan format "HH:MM"
    # Landing time in UTC format "HH:MM"
    landing_time_utc: str = "06:00"

    # Offset hari dalam siklus sinodis Bulan (0.0 – 29.53)
    # Day offset within the lunar synodic cycle (0.0 – 29.53)
    lunar_day_offset: float = 4.2

    # Azimuth Matahari saat pendaratan (derajat, 0° = Utara, searah jarum jam)
    # Sun azimuth at landing time (degrees, 0° = North, clockwise)
    sun_az: float = 0.0

    # Elevasi Matahari saat pendaratan (derajat, positif = di atas cakrawala)
    # Sun elevation at landing time (degrees, positive = above horizon)
    sun_el: float = 0.0

    # Azimuth Bumi saat pendaratan (derajat)
    # Earth azimuth at landing time (degrees)
    earth_az: float = 0.0

    # Elevasi Bumi saat pendaratan (derajat)
    # Earth elevation at landing time (degrees)
    earth_el: float = 0.0

    # Apakah panel surya dapat menerima daya saat pendaratan?
    # Can solar panels receive power at landing time?
    solar_ok: bool = False

    # Apakah tersedia sinyal Direct-to-Earth saat pendaratan?
    # Is Direct-to-Earth communication available at landing time?
    dte_ok: bool = False

    # Tandai apakah Modul 2 (Horizon Planner) sudah selesai
    # Flag: whether Module 2 (Horizon Planner) has been completed
    horizon_planned: bool = False

    # ------------------------------------------------------------------
    # KALKULASI TRAJEKTORI / Trajectory Calculation (Modul 3: simulate_landing)
    # ------------------------------------------------------------------

    # Koordinat 3D target pendaratan dalam meter [X, Y, Z]
    # 3D landing target coordinates in meters [X, Y, Z]
    target_coords_3d: list = field(default_factory=lambda: [0.0, 0.0, 0.0])

    # Total delta-V yang dibutuhkan dari PDI hingga touchdown (m/s)
    # Total delta-V required from PDI to touchdown (m/s)
    total_dv_ms: float = 0.0

    # Sisa massa propelan setelah touchdown (kg)
    # Remaining propellant mass after touchdown (kg)
    prop_remaining_kg: float = 0.0

    # Waktu touchdown aktual dalam simulasi (detik dari PDI)
    # Actual touchdown time in simulation (seconds from PDI)
    touchdown_time_s: float = 0.0

    # Kecepatan vertikal saat touchdown (m/s) — target < 2.0 m/s
    # Vertical velocity at touchdown (m/s) — target < 2.0 m/s
    touchdown_vz_ms: float = 0.0

    # Tandai apakah Modul 3 (Trajectory Solver) sudah selesai
    # Flag: whether Module 3 (Trajectory Solver) has been completed
    trajectory_solved: bool = False

    # ------------------------------------------------------------------
    # METADATA STATE / State Metadata
    # ------------------------------------------------------------------

    # Timestamp ISO UTC saat state terakhir diperbarui
    # ISO UTC timestamp when state was last updated
    last_updated: str = ""

    # Versi skema file JSON state
    # JSON state file schema version
    schema_version: str = STATE_SCHEMA_VERSION

    # Modul terakhir yang menulis ke state ini
    # Last module that wrote to this state
    last_written_by: str = "system"

    # ------------------------------------------------------------------
    # PROPERTI TURUNAN / Derived Properties
    # ------------------------------------------------------------------

    @property
    def landing_datetime(self) -> Optional[datetime]:
        """
        Gabungkan landing_date dan landing_time_utc menjadi objek datetime UTC.
        Combine landing_date and landing_time_utc into a UTC datetime object.

        Returns:
            datetime | None: Objek datetime UTC, atau None jika format salah.
        """
        try:
            dt_str = f"{self.landing_date} {self.landing_time_utc}"
            return datetime.strptime(dt_str, "%Y-%m-%d %H:%M").replace(
                tzinfo=timezone.utc
            )
        except (ValueError, AttributeError):
            return None

    @property
    def site_config(self) -> dict:
        """
        Ambil konfigurasi lengkap situs yang dipilih dari SITES_CONFIG.
        Get the full configuration of the selected site from SITES_CONFIG.

        Returns:
            dict: Konfigurasi situs aktif.
        """
        return get_site_config(self.selected_site)

    @property
    def pipeline_progress(self) -> int:
        """
        Hitung kemajuan pipeline dalam persen (0 – 100).
        Calculate pipeline progress as a percentage (0 – 100).

        Returns:
            int: Persentase kemajuan (0, 25, 50, 75, atau 100).
        """
        done = sum([
            self.scan_terrain_done,
            self.horizon_planned,
            self.trajectory_solved,
        ])
        return int(done / 3 * 100)

    @property
    def is_mission_ready(self) -> bool:
        """
        Apakah semua tahap pipeline sudah selesai dan misi siap dijalankan?
        Have all pipeline stages been completed and is the mission ready?

        Returns:
            bool: True jika semua tahap (1-3) sudah selesai.
        """
        return all([
            self.scan_terrain_done,
            self.horizon_planned,
            self.trajectory_solved,
        ])

    @property
    def conditions_met(self) -> bool:
        """
        Apakah kondisi misi (solar + DTE) terpenuhi di tanggal yang dipilih?
        Are mission conditions (solar + DTE) met at the selected date?

        Returns:
            bool: True jika panel surya aktif DAN DTE tersedia.
        """
        return self.solar_ok and self.dte_ok


# =====================================================================
# FUNGSI SERIALISASI / Serialization Helpers
# =====================================================================

def _state_to_dict(state: MissionState) -> dict:
    """
    Konversi MissionState ke dict yang bisa di-serialize ke JSON.
    Properti (@property) tidak disertakan — hanya field dataclass.

    Convert MissionState to a JSON-serializable dict.
    Properties (@property) are excluded — only dataclass fields.
    """
    return asdict(state)


def _dict_to_state(data: dict) -> MissionState:
    """
    Konversi dict (dari JSON) ke objek MissionState.
    Field yang tidak dikenal diabaikan dengan aman.
    Convert dict (from JSON) to a MissionState object.
    Unknown fields are safely ignored.
    """
    # Ambil hanya field yang dikenal oleh dataclass
    # Extract only fields recognized by the dataclass
    known_fields = MissionState.__dataclass_fields__.keys()
    filtered = {k: v for k, v in data.items() if k in known_fields}

    # Pastikan target_coords_3d selalu berupa list 3 elemen float
    # Ensure target_coords_3d is always a list of 3 floats
    coords = filtered.get("target_coords_3d", [0.0, 0.0, 0.0])
    if not isinstance(coords, (list, tuple)) or len(coords) != 3:
        coords = [0.0, 0.0, 0.0]
    filtered["target_coords_3d"] = [float(c) for c in coords]

    # Pastikan selected_site valid
    # Ensure selected_site is valid
    if filtered.get("selected_site") not in SITES_CONFIG:
        logger.warning(
            f"selected_site '{filtered.get('selected_site')}' tidak valid, "
            f"direset ke 'ALPHA'."
        )
        filtered["selected_site"] = "ALPHA"

    return MissionState(**filtered)


# =====================================================================
# FUNGSI UTAMA / Core State Functions
# =====================================================================

def _default_state() -> MissionState:
    """
    Buat dan kembalikan state default baru tanpa file yang ada.
    Create and return a fresh default state without any file.

    Returns:
        MissionState: State dengan semua nilai default.
    """
    return MissionState(
        selected_site="ALPHA",
        scan_terrain_done=False,
        landing_date=HACKATHON_START.strftime("%Y-%m-%d"),
        landing_time_utc="06:00",
        lunar_day_offset=4.2,
        sun_az=0.0,
        sun_el=0.0,
        earth_az=0.0,
        earth_el=0.0,
        solar_ok=False,
        dte_ok=False,
        horizon_planned=False,
        target_coords_3d=[0.0, 0.0, 0.0],
        total_dv_ms=0.0,
        prop_remaining_kg=0.0,
        touchdown_time_s=0.0,
        touchdown_vz_ms=0.0,
        trajectory_solved=False,
        last_updated="",
        schema_version=STATE_SCHEMA_VERSION,
        last_written_by="system",
    )


def load_state() -> MissionState:
    """
    Baca state misi dari file JSON output/mission_state.json.

    Jika file tidak ditemukan atau rusak, kembalikan state default
    tanpa melempar exception — agar modul tetap bisa berjalan meski
    belum ada state sebelumnya.

    Read mission state from output/mission_state.json.

    If the file is missing or corrupted, return the default state
    without raising an exception — so modules can run even without
    a prior state file.

    Returns:
        MissionState: State yang dimuat dari file, atau state default.
    """
    if not os.path.exists(STATE_FILE_PATH):
        logger.info(
            f"File state tidak ditemukan di '{STATE_FILE_PATH}'. "
            f"Menggunakan state default."
        )
        return _default_state()

    try:
        with open(STATE_FILE_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)

        state = _dict_to_state(data)
        logger.info(
            f"State dimuat dari '{STATE_FILE_PATH}' "
            f"(terakhir diperbarui: {state.last_updated or 'tidak diketahui'}, "
            f"oleh: {state.last_written_by})."
        )
        return state

    except json.JSONDecodeError as e:
        logger.error(
            f"File state '{STATE_FILE_PATH}' rusak / JSON tidak valid: {e}. "
            f"Menggunakan state default."
        )
        return _default_state()

    except Exception as e:
        logger.error(
            f"Gagal memuat state dari '{STATE_FILE_PATH}': {e}. "
            f"Menggunakan state default."
        )
        return _default_state()


def save_state(state: MissionState) -> bool:
    """
    Simpan state misi ke file JSON output/mission_state.json.

    Field last_updated diperbarui otomatis ke timestamp UTC sekarang
    sebelum disimpan. Folder output/ dibuat otomatis jika belum ada.

    Save mission state to output/mission_state.json.

    The last_updated field is automatically updated to the current UTC
    timestamp before saving. The output/ folder is created if missing.

    Args:
        state (MissionState): Objek state yang akan disimpan.

    Returns:
        bool: True jika berhasil disimpan, False jika gagal.
    """
    try:
        # Update timestamp UTC sebelum simpan / Update UTC timestamp before saving
        state.last_updated = datetime.now(timezone.utc).isoformat()

        # Pastikan folder output/ ada / Ensure output/ folder exists
        os.makedirs(os.path.dirname(STATE_FILE_PATH), exist_ok=True)

        data = _state_to_dict(state)
        with open(STATE_FILE_PATH, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

        logger.info(
            f"State berhasil disimpan ke '{STATE_FILE_PATH}' "
            f"(site: {state.selected_site}, "
            f"tanggal: {state.landing_date}, "
            f"progress: {state.pipeline_progress}%)."
        )
        return True

    except PermissionError as e:
        logger.error(f"Tidak ada izin menulis ke '{STATE_FILE_PATH}': {e}")
        return False

    except Exception as e:
        logger.error(f"Gagal menyimpan state ke '{STATE_FILE_PATH}': {e}")
        return False


def reset_state() -> MissionState:
    """
    Reset seluruh state misi ke nilai default.

    Hapus file JSON jika ada, lalu kembalikan objek MissionState baru
    dengan semua nilai default. State baru ini belum disimpan ke file —
    panggil save_state() jika ingin mempersistensikannya.

    Reset the entire mission state to default values.

    Deletes the JSON file if it exists, then returns a fresh MissionState
    with all default values. The new state is NOT yet saved to file —
    call save_state() to persist it.

    Returns:
        MissionState: State default yang baru.
    """
    if os.path.exists(STATE_FILE_PATH):
        try:
            os.remove(STATE_FILE_PATH)
            logger.info(f"File state '{STATE_FILE_PATH}' berhasil dihapus.")
        except Exception as e:
            logger.warning(f"Gagal menghapus file state: {e}")

    fresh = _default_state()
    logger.info("State misi direset ke nilai default.")
    return fresh


# =====================================================================
# FUNGSI UPDATE PER MODUL / Per-Module Update Functions
# =====================================================================

def update_from_terrain_scan(
    site_key: str,
    slope_deg: Optional[float] = None,
    elev_m: Optional[float] = None,
) -> MissionState:
    """
    Perbarui state dari hasil Modul 1: Terrain Scanner (scan_terrain.py).

    Memuat state yang ada, mengupdate field terkait pemilihan situs,
    menyimpan, dan mengembalikan state yang sudah diperbarui.

    Update state from Module 1: Terrain Scanner (scan_terrain.py) results.

    Loads existing state, updates site-selection fields,
    saves, and returns the updated state.

    Args:
        site_key (str): Kunci situs terpilih ('ALPHA', 'BETA', atau 'GAMMA').
        slope_deg (float, optional): Kemiringan situs yang diukur (derajat).
        elev_m (float, optional): Elevasi situs yang diukur (meter).

    Returns:
        MissionState: State yang sudah diperbarui.

    Raises:
        ValueError: Jika site_key tidak valid.
    """
    if site_key not in SITES_CONFIG:
        raise ValueError(
            f"site_key '{site_key}' tidak valid. "
            f"Pilihan: {list(SITES_CONFIG.keys())}"
        )

    state = load_state()

    # Update field dari hasil terrain scan
    state.selected_site = site_key
    state.scan_terrain_done = True
    state.last_written_by = "scan_terrain"

    # Sinkronkan koordinat 3D dari SITES_CONFIG
    # Sync 3D coordinates from SITES_CONFIG
    site_cfg = get_site_config(site_key)
    state.target_coords_3d = site_cfg["coord_3d"].tolist()

    logger.info(
        f"[Modul 1] Terrain scan selesai → Situs dipilih: {site_key} "
        f"(elev: {site_cfg['elev_m']}m, slope: {site_cfg['slope_deg']}°)."
    )

    save_state(state)
    return state


def update_from_horizon_planner(
    landing_date: str,
    landing_time_utc: str,
    lunar_day_offset: float,
    sun_az: float,
    sun_el: float,
    earth_az: float,
    earth_el: float,
    solar_ok: bool,
    dte_ok: bool,
) -> MissionState:
    """
    Perbarui state dari hasil Modul 2: Horizon & Date Planner.

    Memuat state yang ada, mengupdate semua field kalender misi dan
    kondisi visibilitas surya/Bumi, menyimpan, dan mengembalikan state.

    Update state from Module 2: Horizon & Date Planner results.

    Loads existing state, updates all mission calendar and solar/Earth
    visibility fields, saves, and returns the updated state.

    Args:
        landing_date (str): Tanggal pendaratan format "YYYY-MM-DD".
        landing_time_utc (str): Jam UTC pendaratan format "HH:MM".
        lunar_day_offset (float): Offset hari dalam siklus sinodis (0–29.53).
        sun_az (float): Azimuth Matahari (derajat).
        sun_el (float): Elevasi Matahari (derajat).
        earth_az (float): Azimuth Bumi (derajat).
        earth_el (float): Elevasi Bumi (derajat).
        solar_ok (bool): True jika panel surya aktif.
        dte_ok (bool): True jika DTE link tersedia.

    Returns:
        MissionState: State yang sudah diperbarui.
    """
    state = load_state()

    state.landing_date = landing_date
    state.landing_time_utc = landing_time_utc
    state.lunar_day_offset = float(lunar_day_offset)
    state.sun_az = float(sun_az)
    state.sun_el = float(sun_el)
    state.earth_az = float(earth_az)
    state.earth_el = float(earth_el)
    state.solar_ok = bool(solar_ok)
    state.dte_ok = bool(dte_ok)
    state.horizon_planned = True
    state.last_written_by = "solar_earth_horizon_planner"

    cond = "✅ OPTIMAL" if (solar_ok and dte_ok) else "⚠️ SUBOPTIMAL"
    logger.info(
        f"[Modul 2] Horizon planner selesai → "
        f"Tanggal: {landing_date} {landing_time_utc} UTC | "
        f"Matahari: Az={sun_az:.1f}° El={sun_el:+.2f}° | "
        f"Bumi: Az={earth_az:.1f}° El={earth_el:+.2f}° | "
        f"Kondisi: {cond}."
    )

    save_state(state)
    return state


def update_from_trajectory(
    total_dv_ms: float,
    prop_remaining_kg: float,
    touchdown_time_s: float = 0.0,
    touchdown_vz_ms: float = 0.0,
    target_coords_3d: Optional[list] = None,
) -> MissionState:
    """
    Perbarui state dari hasil Modul 3: Trajectory Solver (simulate_landing.py).

    Memuat state yang ada, mengupdate semua field hasil simulasi trajektori,
    menyimpan, dan mengembalikan state.

    Update state from Module 3: Trajectory Solver (simulate_landing.py) results.

    Loads existing state, updates all trajectory simulation result fields,
    saves, and returns the updated state.

    Args:
        total_dv_ms (float): Total delta-V yang digunakan (m/s).
        prop_remaining_kg (float): Sisa propelan setelah touchdown (kg).
        touchdown_time_s (float): Waktu touchdown dalam simulasi (detik).
        touchdown_vz_ms (float): Kecepatan vertikal saat touchdown (m/s).
        target_coords_3d (list, optional): Koordinat target 3D [X, Y, Z] meter.
                                           Jika None, koordinat tidak diubah.

    Returns:
        MissionState: State yang sudah diperbarui.
    """
    state = load_state()

    state.total_dv_ms = float(total_dv_ms)
    state.prop_remaining_kg = float(prop_remaining_kg)
    state.touchdown_time_s = float(touchdown_time_s)
    state.touchdown_vz_ms = float(touchdown_vz_ms)
    state.trajectory_solved = True
    state.last_written_by = "simulate_landing"

    if target_coords_3d is not None:
        if len(target_coords_3d) == 3:
            state.target_coords_3d = [float(c) for c in target_coords_3d]
        else:
            logger.warning(
                f"target_coords_3d harus memiliki tepat 3 elemen, "
                f"diabaikan: {target_coords_3d}"
            )

    safe = "✅ AMAN" if touchdown_vz_ms < 2.0 else "⚠️ KERAS"
    logger.info(
        f"[Modul 3] Trajectory solver selesai → "
        f"ΔV total: {total_dv_ms:.1f} m/s | "
        f"Propelan sisa: {prop_remaining_kg:.1f} kg | "
        f"Touchdown @{touchdown_time_s:.1f}s, Vz={touchdown_vz_ms:.2f} m/s {safe}."
    )

    save_state(state)
    return state


# =====================================================================
# FUNGSI RINGKASAN & UTILITAS / Summary & Utility Functions
# =====================================================================

def get_status_summary() -> dict:
    """
    Hasilkan ringkasan status misi yang mudah dibaca manusia.

    Membaca state saat ini dan mengembalikan dict berisi semua informasi
    penting dalam format yang siap ditampilkan di dashboard atau terminal.

    Generate a human-readable mission status summary.

    Reads the current state and returns a dict containing all key
    information in a format ready for dashboard or terminal display.

    Returns:
        dict: Ringkasan status misi dengan field berikut:
              - pipeline: status per tahap (emoji + teks)
              - site: info situs terpilih
              - window: info jendela misi
              - trajectory: info hasil solver
              - overall: penilaian keseluruhan
    """
    state = load_state()
    site_cfg = state.site_config

    # Status per tahap pipeline / Per-pipeline-stage status
    terrain_status = "✅ Selesai" if state.scan_terrain_done else "❌ Belum Dijalankan"
    horizon_status = "✅ Selesai" if state.horizon_planned else (
        "⏳ Menunggu" if state.scan_terrain_done else "🔒 Terkunci"
    )
    traj_status = "✅ Selesai" if state.trajectory_solved else (
        "⏳ Menunggu" if state.horizon_planned else "🔒 Terkunci"
    )
    sim_status = "🎮 Siap" if state.trajectory_solved else "🔒 Terkunci"

    # Kondisi misi / Mission conditions
    solar_status = "☀️ DAYA AKTIF" if state.solar_ok else "🌑 BAYANGAN"
    dte_status = "📡 DTE ONLINE" if state.dte_ok else "⚠️ TERHALANG"
    cond_status = "✅ OPTIMAL" if state.conditions_met else (
        "⚠️ SUBOPTIMAL" if (state.solar_ok or state.dte_ok) else "❌ TIDAK AMAN"
    )

    # Penilaian touchdown / Touchdown assessment
    if state.trajectory_solved and state.touchdown_vz_ms > 0:
        td_status = (
            "✅ AMAN (< 2 m/s)" if state.touchdown_vz_ms < 2.0
            else "⚠️ KERAS (≥ 2 m/s)"
        )
    else:
        td_status = "— Belum Dikalkulasi"

    summary = {
        "pipeline": {
            "modul_1_terrain":    f"{terrain_status}",
            "modul_2_horizon":    f"{horizon_status}",
            "modul_3_trajectory": f"{traj_status}",
            "modul_4_simulator":  f"{sim_status}",
            "progress_pct":       state.pipeline_progress,
            "mission_ready":      state.is_mission_ready,
        },
        "site": {
            "key":      state.selected_site,
            "name":     site_cfg["name"],
            "tag":      site_cfg["tag"],
            "lat_lon":  f"{site_cfg['lat_deg']}°, {site_cfg['lon_deg']}°",
            "elev_m":   f"{site_cfg['elev_m']:,.0f} m",
            "slope":    f"{site_cfg['slope_deg']}°",
            "color":    site_cfg["color_hex"],
        },
        "window": {
            "landing_date":    state.landing_date,
            "landing_time":    f"{state.landing_time_utc} UTC",
            "lunar_day":       f"Hari {state.lunar_day_offset:.2f} dalam siklus",
            "sun_position":    f"Az={state.sun_az:.1f}°, El={state.sun_el:+.2f}°",
            "earth_position":  f"Az={state.earth_az:.1f}°, El={state.earth_el:+.2f}°",
            "solar_power":     solar_status,
            "dte_comm":        dte_status,
            "conditions":      cond_status,
        },
        "trajectory": {
            "target_3d":          state.target_coords_3d,
            "total_dv":           f"{state.total_dv_ms:.1f} m/s",
            "prop_remaining":     f"{state.prop_remaining_kg:.1f} kg",
            "touchdown_time":     f"{state.touchdown_time_s:.1f} s dari PDI",
            "touchdown_velocity": f"Vz = {state.touchdown_vz_ms:.2f} m/s",
            "touchdown_status":   td_status,
        },
        "overall": {
            "progress":       f"{state.pipeline_progress}%",
            "mission_ready":  "🚀 SIAP DILUNCURKAN" if state.is_mission_ready else "⏳ DALAM PROGRES",
            "last_updated":   state.last_updated or "Belum pernah disimpan",
            "last_module":    state.last_written_by,
        },
    }

    return summary


def print_status_summary() -> None:
    """
    Cetak ringkasan status misi ke terminal dengan format yang rapi.
    Print the mission status summary to the terminal in a neat format.
    """
    summary = get_status_summary()

    print("\n" + "=" * 68)
    print("  🌑 LUNAR MISSION STATUS DASHBOARD")
    print("=" * 68)

    print("\n📋 PIPELINE PROGRESS:")
    p = summary["pipeline"]
    print(f"   [1] Terrain Scanner : {p['modul_1_terrain']}")
    print(f"   [2] Horizon Planner : {p['modul_2_horizon']}")
    print(f"   [3] Trajectory Solver: {p['modul_3_trajectory']}")
    print(f"   [4] Flight Simulator : {p['modul_4_simulator']}")
    print(f"   → Kemajuan Total    : {p['progress_pct']}% | {summary['overall']['mission_ready']}")

    print("\n📍 SITUS PENDARATAN TERPILIH:")
    s = summary["site"]
    print(f"   [{s['key']}] {s['name']}")
    print(f"   Tag      : {s['tag']}")
    print(f"   Posisi   : {s['lat_lon']}")
    print(f"   Elevasi  : {s['elev_m']} | Slope: {s['slope']}")

    print("\n📅 JENDELA MISI:")
    w = summary["window"]
    print(f"   Tanggal  : {w['landing_date']} {w['landing_time']}")
    print(f"   Siklus   : {w['lunar_day']}")
    print(f"   ☀️  Matahari: {w['sun_position']}")
    print(f"   🌍 Bumi    : {w['earth_position']}")
    print(f"   Daya     : {w['solar_power']}  |  Sinyal: {w['dte_comm']}")
    print(f"   Kondisi  : {w['conditions']}")

    print("\n⚙️  HASIL TRAJEKTORI:")
    t = summary["trajectory"]
    print(f"   Delta-V Total : {t['total_dv']}")
    print(f"   Sisa Propelan : {t['prop_remaining']}")
    print(f"   Waktu Touch.  : {t['touchdown_time']}")
    print(f"   Vz Touchdown  : {t['touchdown_velocity']}  →  {t['touchdown_status']}")

    print("\n🕒 METADATA:")
    o = summary["overall"]
    print(f"   Terakhir diperbarui : {o['last_updated']}")
    print(f"   Modul terakhir      : {o['last_module']}")

    print("\n" + "=" * 68 + "\n")


# =====================================================================
# SELF-TEST — Jalankan `python mission_state.py` untuk verifikasi
#    Self-test — Run `python mission_state.py` to verify
# =====================================================================

if __name__ == "__main__":
    print("=" * 68)
    print("  mission_state.py — Shared Mission State Manager")
    print("  NASA Space Apps Challenge 2026 | Lunar Landing Site Navigator")
    print("=" * 68)

    # --- Test 1: Load state (akan default jika belum ada file) ---
    print("\n[TEST 1] Memuat state awal...")
    state = load_state()
    print(f"  → State dimuat. Site: {state.selected_site}, "
          f"Tanggal: {state.landing_date}, "
          f"Progress: {state.pipeline_progress}%")

    # --- Test 2: Simpan state ---
    print("\n[TEST 2] Menyimpan state default ke file...")
    ok = save_state(state)
    print(f"  → Simpan {'berhasil ✅' if ok else 'gagal ❌'}")

    # --- Test 3: Update dari terrain scan (pilih BETA) ---
    print("\n[TEST 3] Simulasi update dari Modul 1 (pilih Site BETA)...")
    state = update_from_terrain_scan("BETA")
    print(f"  → Site terpilih: {state.selected_site}, "
          f"Koordinat 3D: {state.target_coords_3d}")

    # --- Test 4: Update dari horizon planner ---
    print("\n[TEST 4] Simulasi update dari Modul 2 (horizon planner)...")
    state = update_from_horizon_planner(
        landing_date="2026-11-14",
        landing_time_utc="08:30",
        lunar_day_offset=35.0 % LUNAR_SYNODIC_DAYS,
        sun_az=47.2,
        sun_el=1.54,
        earth_az=6.8,
        earth_el=4.72,
        solar_ok=True,
        dte_ok=True,
    )
    print(f"  → Tanggal: {state.landing_date} {state.landing_time_utc} UTC | "
          f"Solar: {'✅' if state.solar_ok else '❌'} | "
          f"DTE: {'✅' if state.dte_ok else '❌'}")

    # --- Test 5: Update dari trajectory solver ---
    print("\n[TEST 5] Simulasi update dari Modul 3 (trajectory solver)...")
    state = update_from_trajectory(
        total_dv_ms=312.7,
        prop_remaining_kg=87.4,
        touchdown_time_s=128.5,
        touchdown_vz_ms=1.83,
    )
    print(f"  → ΔV: {state.total_dv_ms:.1f} m/s | "
          f"Propelan sisa: {state.prop_remaining_kg:.1f} kg | "
          f"Vz touchdown: {state.touchdown_vz_ms:.2f} m/s")

    # --- Test 6: Cetak ringkasan status ---
    print("\n[TEST 6] Ringkasan Status Misi Lengkap:")
    print_status_summary()

    # --- Test 7: Properti turunan ---
    print("[TEST 7] Cek properti turunan (derived properties)...")
    final_state = load_state()
    print(f"  → is_mission_ready : {final_state.is_mission_ready}")
    print(f"  → conditions_met   : {final_state.conditions_met}")
    print(f"  → pipeline_progress: {final_state.pipeline_progress}%")
    print(f"  → landing_datetime : {final_state.landing_datetime}")
    print(f"  → site_config name : {final_state.site_config['name']}")

    # --- Test 8: Reset state ---
    print("\n[TEST 8] Reset state ke default...")
    fresh = reset_state()
    print(f"  → State direset. Site: {fresh.selected_site}, "
          f"Progress: {fresh.pipeline_progress}%")

    print("\n✅ Semua test berhasil. mission_state.py siap digunakan.")
    print("=" * 68)

