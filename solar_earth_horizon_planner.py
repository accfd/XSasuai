# -*- coding: utf-8 -*-
# solar_earth_horizon_planner.py — Horizon Skyline, Sun & Earth DTE Window Planner
# =====================================================================
# Proyek  : Lunar Landing Site Navigator
# Event   : NASA Space Apps Challenge 2026
# Target  : Mons Mouton, Kutub Selatan Bulan (~84.5°S)
# Deskripsi: Modul 2 — Evaluasi profil cakrawala 360°, posisi riil
#            Matahari & Bumi (NASA JPL Horizons Ephemeris), serta
#            penentuan jendela pendaratan emas (Golden Landing Window).
#            Terintegrasi penuh dengan constants.py, mission_state.py,
#            dan horizons_api.py.
# =====================================================================

import os
import sys
import math
from datetime import datetime, timedelta, timezone
from typing import Optional, Tuple

import numpy as np
from PIL import Image

from PyQt6.QtWidgets import (
    QApplication, QMainWindow, QWidget, QVBoxLayout, QHBoxLayout,
    QPushButton, QSlider, QLabel, QFrame, QGridLayout, QDateEdit,
    QScrollArea, QStatusBar
)
from PyQt6.QtCore import Qt, QTimer, QRectF, QPointF, QDate, QThread, pyqtSignal
from PyQt6.QtGui import (
    QPainter, QColor, QPen, QFont, QBrush, QLinearGradient, QPolygonF
)

from constants import (
    SITES_CONFIG,
    LUNAR_SYNODIC_DAYS,
    MISSION_EPOCH,
    R_MOON_M,
    RES_PIXEL_M,
    DEM_CANDIDATES,
    day_offset_to_date,
    date_to_day_offset,
    date_to_absolute_day,
)
from mission_state import (
    load_state,
    save_state,
    update_from_horizon_planner,
    update_from_terrain_scan,
)
from horizons_api import (
    fetch_mission_window_data_safe,
    get_position_safe,
    get_sun_position_approx,
    get_earth_position_approx,
    is_api_available,
    clear_cache,
)

# =====================================================================
# TEMA VISUAL CYBERPUNK MISI BULAN
# =====================================================================
BG_DARK    = QColor(10, 14, 23)
PANEL_BG   = QColor(15, 23, 38)
BORDER_COL = QColor(30, 48, 77)
CYAN       = QColor(0, 240, 255)
BLUE       = QColor(56, 189, 248)
GREEN      = QColor(16, 185, 129)
YELLOW     = QColor(250, 204, 21)
ORANGE     = QColor(251, 146, 60)
RED        = QColor(239, 68, 68)
WHITE      = QColor(248, 250, 252)
GRAY       = QColor(148, 163, 184)
DARK_GRAY  = QColor(35, 45, 60)


# =====================================================================
# MODEL ELEVASI DEM & RAYCASTING CAKRAWALA 360 DERAJAT
# =====================================================================
def load_lunar_dem() -> np.ndarray:
    for path in DEM_CANDIDATES:
        if os.path.exists(path):
            try:
                img = Image.open(path).convert("L")
                arr = np.array(img, dtype=np.float32)
                # Elevasi datum Mons Mouton: 2000m - 6000m
                elev = 2000.0 + (arr / 255.0) * 4000.0
                return elev
            except Exception:
                pass
    # Fallback sintetis
    x = np.linspace(-3, 3, 400)
    y = np.linspace(-3, 3, 400)
    xx, yy = np.meshgrid(x, y)
    elev = 5000.0 + 800.0 * np.exp(-(xx**2 + yy**2) / 2.0) - 400.0 * np.sin(xx * 2)
    return elev

DEM_ELEV = load_lunar_dem()


def compute_horizon_mask(r0: int, c0: int, elev_grid: np.ndarray,
                         num_azimuths: int = 360,
                         max_dist_km: float = 25.0) -> np.ndarray:
    rows, cols = elev_grid.shape
    r0 = int(np.clip(r0, 0, rows - 1))
    c0 = int(np.clip(c0, 0, cols - 1))
    z0 = float(elev_grid[r0, c0]) + 2.5  # Antena pendarat 2.5m di atas tanah

    max_steps = int((max_dist_km * 1000.0) / RES_PIXEL_M)
    dists_m = np.arange(1, max_steps + 1) * RES_PIXEL_M
    horizon_angles = np.zeros(num_azimuths, dtype=np.float32)

    for i in range(num_azimuths):
        az_rad = math.radians(i)
        dr = -np.cos(az_rad)
        dc = np.sin(az_rad)

        sample_r = np.clip(r0 + dr * (dists_m / RES_PIXEL_M), 0, rows - 1).astype(int)
        sample_c = np.clip(c0 + dc * (dists_m / RES_PIXEL_M), 0, cols - 1).astype(int)

        z_samples = elev_grid[sample_r, sample_c]
        curvature_corr_deg = np.degrees(dists_m / (2.0 * R_MOON_M))
        elev_angles_deg = np.degrees(np.arctan2(z_samples - z0, dists_m)) - curvature_corr_deg
        horizon_angles[i] = max(-2.5, float(np.max(elev_angles_deg)))

    return horizon_angles

SITE_HORIZONS = {}
for k, v in SITES_CONFIG.items():
    r, c = v["pixel_coord"]
    SITE_HORIZONS[k] = compute_horizon_mask(r, c, DEM_ELEV)


# =====================================================================
# HITUNG STATISTIK SIKLUS PER SITUS
# =====================================================================
def get_site_cycle_stats(site_key: str) -> dict:
    horizon = SITE_HORIZONS[site_key]
    samples = 296
    days = np.linspace(0.0, LUNAR_SYNODIC_DAYS, samples)
    s_win = np.zeros(samples, dtype=bool)
    e_win = np.zeros(samples, dtype=bool)
    for i, d in enumerate(days):
        az_s, el_s = get_sun_position_approx(d)
        az_e, el_e = get_earth_position_approx(d)
        s_win[i] = (el_s >= horizon[int(az_s) % 360])
        e_win[i] = (el_e >= horizon[int(az_e) % 360])
    tot_h = LUNAR_SYNODIC_DAYS * 24.0
    s_h = float(np.mean(s_win)) * tot_h
    e_h = float(np.mean(e_win)) * tot_h
    max_obstacle = float(np.max(horizon))
    return {
        "solar_hours": s_h,
        "solar_pct": (s_h / tot_h) * 100.0,
        "dte_hours": e_h,
        "dte_pct": (e_h / tot_h) * 100.0,
        "max_obstacle": max_obstacle,
        "s_win": s_win,
        "e_win": e_win
    }

SITE_STATS = {k: get_site_cycle_stats(k) for k in SITES_CONFIG}


# =====================================================================
# QTHREAD ASYNC WORKER UNTUK FETCH DATA NASA JPL HORIZONS
# =====================================================================
class JPLFetchWorker(QThread):
    data_ready = pyqtSignal(dict)
    fetch_failed = pyqtSignal(str)

    def __init__(self, site_key: str, start_dt: datetime, end_dt: datetime, parent=None):
        super().__init__(parent)
        self.site_key = site_key
        self.start_dt = start_dt
        self.end_dt = end_dt

    def run(self):
        try:
            data = fetch_mission_window_data_safe(
                self.site_key, self.start_dt, self.end_dt, step_hours=1
            )
            self.data_ready.emit(data)
        except Exception as e:
            self.fetch_failed.emit(str(e))


# =====================================================================
# WIDGET 1: PANORAMA CAKRAWALA LOKAL 360 DERAJAT
# =====================================================================
class HorizonPanoramaWidget(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setMinimumHeight(240)

    def paintEvent(self, event):
        app = self.window()
        painter = QPainter(self)
        painter.setRenderHint(QPainter.RenderHint.Antialiasing)

        w, h = self.width(), self.height()
        painter.fillRect(0, 0, w, h, PANEL_BG)
        painter.setPen(QPen(BORDER_COL, 1.5))
        painter.drawRect(0, 0, w, h)

        site = SITES_CONFIG[app.active_site]
        horizon = SITE_HORIZONS[app.active_site]
        az_sun, el_sun, _ = app.get_current_sun_pos()
        az_earth, el_earth, _ = app.get_current_earth_pos()

        idx_sun = int(az_sun) % 360
        idx_earth = int(az_earth) % 360
        sun_visible = el_sun >= horizon[idx_sun]
        earth_visible = el_earth >= horizon[idx_earth]

        # Header Title
        painter.setFont(QFont("Segoe UI", 9, QFont.Weight.Bold))
        painter.setPen(WHITE)
        painter.drawText(15, 22, f"360° LOCAL SKYLINE PROFILE — {site['name'].upper()}")

        px_left, px_right = 45, w - 20
        px_top, px_bottom = 35, h - 35
        pw = px_right - px_left
        ph = px_bottom - px_top

        el_min, el_max = -4.0, 12.0
        def to_screen_y(el_deg):
            norm = (el_deg - el_min) / (el_max - el_min)
            return px_bottom - norm * ph

        def to_screen_x(az_deg):
            return px_left + (az_deg / 360.0) * pw

        # Garis Grid Sudut Elevasi
        painter.setPen(QPen(DARK_GRAY, 1, Qt.PenStyle.DashLine))
        for el_val in [-2.0, 0.0, 4.0, 8.0, 12.0]:
            sy = to_screen_y(el_val)
            painter.drawLine(px_left, int(sy), px_right, int(sy))
            painter.setFont(QFont("Monospace", 7))
            painter.setPen(GRAY)
            painter.drawText(10, int(sy + 3), f"{el_val:+.0f}°")
            painter.setPen(QPen(DARK_GRAY, 1, Qt.PenStyle.DashLine))

        # Garis Astronomis 0°
        sy_zero = to_screen_y(0.0)
        painter.setPen(QPen(QColor(80, 100, 130), 1.5))
        painter.drawLine(px_left, int(sy_zero), px_right, int(sy_zero))

        # Siluet Kontur Bukit Mons Mouton
        poly = QPolygonF()
        poly.append(QPointF(px_left, px_bottom))
        for deg in range(360):
            poly.append(QPointF(to_screen_x(deg), to_screen_y(horizon[deg])))
        poly.append(QPointF(px_right, px_bottom))

        grad = QLinearGradient(0, px_top, 0, px_bottom)
        grad.setColorAt(0.0, QColor(60, 75, 95, 230))
        grad.setColorAt(1.0, QColor(20, 26, 38, 255))
        painter.setBrush(QBrush(grad))
        painter.setPen(QPen(CYAN, 1.2))
        painter.drawPolygon(poly)

        # Label Mata Angin
        cardinals = [(0, "N"), (45, "NE"), (90, "E"), (135, "SE"), (180, "S"), (225, "SW"), (270, "W"), (315, "NW"), (360, "N")]
        painter.setFont(QFont("Segoe UI", 8, QFont.Weight.Bold))
        for az_c, label in cardinals:
            cx = to_screen_x(az_c)
            painter.setPen(QPen(DARK_GRAY, 1))
            painter.drawLine(int(cx), px_top, int(cx), px_bottom)
            painter.setPen(WHITE if label in ["N", "E", "S", "W"] else GRAY)
            painter.drawText(int(cx - 10), px_bottom + 18, label)

        # MATAHARI
        sx_sun = to_screen_x(az_sun)
        sy_sun = to_screen_y(el_sun)
        glow_col = QColor(250, 204, 21, 50 if sun_visible else 15)
        painter.setBrush(QBrush(glow_col))
        painter.setPen(Qt.PenStyle.NoPen)
        painter.drawEllipse(QPointF(sx_sun, sy_sun), 14, 14)

        sun_dot_col = YELLOW if sun_visible else ORANGE
        painter.setBrush(QBrush(sun_dot_col))
        painter.setPen(QPen(WHITE if sun_visible else GRAY, 1.5))
        painter.drawEllipse(QPointF(sx_sun, sy_sun), 6, 6)

        painter.setFont(QFont("Segoe UI", 8, QFont.Weight.Bold))
        painter.setPen(sun_dot_col)
        status_sun_txt = "MATAHARI [TERANG]" if sun_visible else "MATAHARI [TERBENAM/BAYANGAN]"
        painter.drawText(int(sx_sun + 10), int(sy_sun - 5), f"{status_sun_txt} (Az:{az_sun:.1f}°, El:{el_sun:+.2f}°)")

        # BUMI
        sx_earth = to_screen_x(az_earth)
        sy_earth = to_screen_y(el_earth)
        glow_earth = QColor(0, 240, 255, 60 if earth_visible else 20)
        painter.setBrush(QBrush(glow_earth))
        painter.setPen(Qt.PenStyle.NoPen)
        painter.drawEllipse(QPointF(sx_earth, sy_earth), 16, 16)

        earth_dot_col = CYAN if earth_visible else RED
        painter.setBrush(QBrush(earth_dot_col))
        painter.setPen(QPen(WHITE, 1.5))
        painter.drawEllipse(QPointF(sx_earth, sy_earth), 7, 7)

        painter.setFont(QFont("Segoe UI", 8, QFont.Weight.Bold))
        painter.setPen(earth_dot_col)
        status_dte_txt = "BUMI [DTE LINK OK]" if earth_visible else "BUMI [TERHALANG BUKIT]"
        painter.drawText(int(sx_earth + 12), int(sy_earth + 12), f"{status_dte_txt} (Az:{az_earth:.1f}°, El:{el_earth:+.2f}°)")


# =====================================================================
# WIDGET 2: TIMELINE JENDELA DAYA & KOMUNIKASI
# =====================================================================
class MissionTimelineWidget(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setMinimumHeight(150)

    def paintEvent(self, event):
        app = self.window()
        painter = QPainter(self)
        painter.setRenderHint(QPainter.RenderHint.Antialiasing)

        w, h = self.width(), self.height()
        painter.fillRect(0, 0, w, h, PANEL_BG)
        painter.setPen(QPen(BORDER_COL, 1.5))
        painter.drawRect(0, 0, w, h)

        stats = SITE_STATS[app.active_site]
        solar_win = stats["s_win"]
        dte_win = stats["e_win"]
        num_samples = len(solar_win)

        # Header
        painter.setFont(QFont("Segoe UI", 9, QFont.Weight.Bold))
        painter.setPen(WHITE)
        painter.drawText(15, 20, "JENDELA VISIBILITAS SEPANJANG KALENDER MISI (1 BULAN PENUH)")

        painter.setFont(QFont("Monospace", 8))
        painter.setPen(YELLOW)
        painter.drawText(w - 320, 20, f"SOLAR POWER: {stats['solar_hours']:.1f}h ({stats['solar_pct']:.1f}%)")
        painter.setPen(CYAN)
        painter.drawText(w - 150, 20, f"DTE COMM: {stats['dte_hours']:.1f}h ({stats['dte_pct']:.1f}%)")

        bar_left = 60
        bar_width = w - 80
        y_solar = 38
        bar_h = 20

        # Label Bar 1: Solar
        painter.setFont(QFont("Segoe UI", 8, QFont.Weight.Bold))
        painter.setPen(YELLOW)
        painter.drawText(12, y_solar + 14, "SOLAR")

        seg_w = bar_width / num_samples
        for i in range(num_samples):
            col = YELLOW if solar_win[i] else DARK_GRAY
            painter.fillRect(int(bar_left + i * seg_w), y_solar, max(1, int(seg_w) + 1), bar_h, col)

        # Label Bar 2: DTE
        y_dte = y_solar + bar_h + 12
        painter.setPen(CYAN)
        painter.drawText(12, y_dte + 14, "DTE")

        for i in range(num_samples):
            col = CYAN if dte_win[i] else DARK_GRAY
            painter.fillRect(int(bar_left + i * seg_w), y_dte, max(1, int(seg_w) + 1), bar_h, col)

        # Sumbu Kalender (Tanggal Riil)
        y_axis = y_dte + bar_h + 10
        painter.setPen(QPen(GRAY, 1))
        painter.drawLine(bar_left, y_axis, bar_left + bar_width, y_axis)

        painter.setFont(QFont("Segoe UI", 7))
        for day_tick in [0, 5, 10, 15, 20, 25, 29]:
            tx = int(bar_left + (day_tick / LUNAR_SYNODIC_DAYS) * bar_width)
            if tx <= bar_left + bar_width:
                painter.drawLine(tx, y_axis, tx, y_axis + 4)
                dt_mark = day_offset_to_date(day_tick)
                painter.drawText(tx - 16, y_axis + 15, dt_mark.strftime("%d %b"))

        # Kursor Waktu Saat Ini
        cur_x = int(bar_left + (app.current_day / LUNAR_SYNODIC_DAYS) * bar_width)
        painter.setPen(QPen(WHITE, 2))
        painter.drawLine(cur_x, y_solar - 5, cur_x, y_axis + 5)
        painter.setBrush(QBrush(WHITE))
        tri = QPolygonF([QPointF(cur_x - 5, y_solar - 8), QPointF(cur_x + 5, y_solar - 8), QPointF(cur_x, y_solar)])
        painter.drawPolygon(tri)


# =====================================================================
# WINDOW / WIDGET UTAMA APLIKASI
# =====================================================================
class LunarSolarEarthPlannerApp(QMainWindow):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setWindowTitle("NASA Space Apps 2026 — Lunar Landing Date & Location Comparison Suite")
        self.resize(1160, 920)
        self.setStyleSheet(f"background-color: {BG_DARK.name()}; color: {WHITE.name()}; font-family: 'Segoe UI', Arial;")

        # Load shared mission state
        self.state = load_state()
        self.active_site = self.state.selected_site if self.state.selected_site in SITES_CONFIG else "ALPHA"
        self.current_day = self.state.lunar_day_offset if self.state.lunar_day_offset > 0 else 4.2
        self.is_playing = False
        self._updating_widgets = False

        # Internal ephemeris data storage
        self._sun_data = []
        self._earth_data = []
        self.mission_ephem_data = None
        self.api_source_mode = "unknown"
        self.jpl_worker = None

        self.init_ui()

        # Prefetch real ephemeris from NASA JPL Horizons via background thread
        self.refresh_ephemeris_data()

        self.anim_timer = QTimer(self)
        self.anim_timer.timeout.connect(self.advance_time)

    def init_ui(self):
        scroll = QScrollArea()
        scroll.setWidgetResizable(True)
        scroll.setStyleSheet("QScrollArea { border: none; background: transparent; }")
        self.setCentralWidget(scroll)

        container = QWidget()
        scroll.setWidget(container)
        root_layout = QVBoxLayout(container)
        root_layout.setContentsMargins(16, 12, 16, 14)
        root_layout.setSpacing(10)

        # -------------------------------------------------------------
        # 1. TOP HEADER DENGAN STATUS NASA API & DATE PICKER
        # -------------------------------------------------------------
        header = QFrame()
        header.setStyleSheet(f"background-color: {PANEL_BG.name()}; border: 1px solid {BORDER_COL.name()}; border-radius: 6px;")
        h_layout = QHBoxLayout(header)
        h_layout.setContentsMargins(16, 8, 16, 8)

        title_box = QVBoxLayout()
        title_lbl = QLabel(
            "<span style='color:#00f0ff; font-weight:bold; font-size:15px;'>AUTONOMOUS LUNAR MISSION PLANNER: DATE & SITE EVALUATION</span><br>"
            "<span style='color:#94a3b8; font-size:11px;'>NASA Space Apps Challenge 2026 | Target: Mons Mouton High Plateau (-84.5°S)</span>"
        )
        title_box.addWidget(title_lbl)

        # Status badge NASA JPL API
        self.lbl_api_badge = QLabel("<span style='color:#facc15; font-size:10px;'>⏳ MENYAMBUNG KE NASA JPL HORIZONS...</span>")
        title_box.addWidget(self.lbl_api_badge)
        h_layout.addLayout(title_box, stretch=3)

        # Kontrol Tanggal Kalender Riil
        cal_box = QHBoxLayout()
        cal_box.addWidget(QLabel("<b style='color:#f8fafc;'>📅 TANGGAL:</b>"))

        self.date_picker = QDateEdit()
        self.date_picker.setCalendarPopup(True)
        self.date_picker.setDisplayFormat("dd MMMM yyyy")

        init_date = day_offset_to_date(self.current_day)
        self.date_picker.setDate(QDate(init_date.year, init_date.month, init_date.day))
        self.date_picker.setMinimumDate(QDate(2026, 10, 10))
        self.date_picker.setMaximumDate(QDate(2027, 3, 31))
        self.date_picker.setStyleSheet("""
            QDateEdit { background: #0b0f19; color: #00f0ff; border: 1px solid #1e304d; padding: 5px 8px; font-weight: bold; border-radius: 4px; }
            QDateEdit::drop-down { subcontrol-origin: padding; subcontrol-position: top right; width: 20px; border-left: 1px solid #1e304d; }
        """)
        self.date_picker.dateChanged.connect(self.on_date_picker_changed)
        cal_box.addWidget(self.date_picker)

        # Tombol Temukan Tanggal Emas
        self.btn_golden = QPushButton("🎯 CARI TANGGAL TERBAIK")
        self.btn_golden.setCursor(Qt.CursorShape.PointingHandCursor)
        self.btn_golden.setStyleSheet("background-color:#f59e0b; color:#04060a; font-weight:bold; padding:6px 12px; border-radius:4px;")
        self.btn_golden.setToolTip("Cari tanggal pendaratan optimal & simpan ke Mission State")
        self.btn_golden.clicked.connect(self.find_golden_window)
        cal_box.addWidget(self.btn_golden)

        # Tombol Refresh JPL
        self.btn_refresh_jpl = QPushButton("📡 REFRESH DATA JPL")
        self.btn_refresh_jpl.setCursor(Qt.CursorShape.PointingHandCursor)
        self.btn_refresh_jpl.setStyleSheet("background-color:#1e293b; color:#00f0ff; border: 1px solid #00f0ff; font-weight:bold; padding:6px 10px; border-radius:4px;")
        self.btn_refresh_jpl.setToolTip("Perbarui cache data efemeris langsung dari NASA JPL Horizons API")
        self.btn_refresh_jpl.clicked.connect(self.on_refresh_jpl_clicked)
        cal_box.addWidget(self.btn_refresh_jpl)

        h_layout.addLayout(cal_box, stretch=3)
        root_layout.addWidget(header)

        # -------------------------------------------------------------
        # 2. STATUS PANEL: MISSION STATE SUMMARY (SHARED STATE INFO)
        # -------------------------------------------------------------
        self.status_panel = QFrame()
        self.status_panel.setStyleSheet(f"background-color: #131c2e; border: 1px solid {BORDER_COL.name()}; border-radius: 6px; padding: 6px;")
        sp_lay = QHBoxLayout(self.status_panel)
        sp_lay.setContentsMargins(12, 4, 12, 4)

        self.lbl_shared_state_info = QLabel()
        self.lbl_shared_state_info.setFont(QFont("Segoe UI", 9))
        self.lbl_shared_state_info.setStyleSheet("color: #e2e8f0;")
        sp_lay.addWidget(self.lbl_shared_state_info)

        self.lbl_toast = QLabel()
        self.lbl_toast.setFont(QFont("Segoe UI", 9, QFont.Weight.Bold))
        self.lbl_toast.setStyleSheet("color: #10b981;")
        sp_lay.addWidget(self.lbl_toast, alignment=Qt.AlignmentFlag.AlignRight)

        root_layout.addWidget(self.status_panel)

        # -------------------------------------------------------------
        # 3. BANNER STATUS REKOMENDASI TANGGAL AKTIF
        # -------------------------------------------------------------
        self.banner_frame = QFrame()
        self.banner_frame.setStyleSheet("background-color: #0b1a2e; border: 1px solid #00f0ff; border-radius: 6px; padding: 2px;")
        b_layout = QHBoxLayout(self.banner_frame)
        b_layout.setContentsMargins(12, 6, 12, 6)
        self.lbl_banner = QLabel()
        self.lbl_banner.setFont(QFont("Segoe UI", 9))
        b_layout.addWidget(self.lbl_banner)
        root_layout.addWidget(self.banner_frame)

        # -------------------------------------------------------------
        # 4. WIDGET 1: 360 PANORAMA HORIZON
        # -------------------------------------------------------------
        self.horizon_widget = HorizonPanoramaWidget(self)
        root_layout.addWidget(self.horizon_widget, stretch=4)

        # -------------------------------------------------------------
        # 5. WIDGET 2: TIMELINE JENDELA DAYA & KOMUNIKASI
        # -------------------------------------------------------------
        self.timeline_widget = MissionTimelineWidget(self)
        root_layout.addWidget(self.timeline_widget, stretch=3)

        # -------------------------------------------------------------
        # 6. KONTROL WAKTU (SLIDER HARI & PLAY ANIMATION)
        # -------------------------------------------------------------
        ctrl_frame = QFrame()
        ctrl_frame.setStyleSheet(f"background-color: {PANEL_BG.name()}; border: 1px solid {BORDER_COL.name()}; border-radius: 6px;")
        c_layout = QHBoxLayout(ctrl_frame)
        c_layout.setContentsMargins(14, 8, 14, 8)

        self.btn_play = QPushButton("▶ PLAY SIMULATION")
        self.btn_play.setCursor(Qt.CursorShape.PointingHandCursor)
        self.btn_play.setStyleSheet("background-color:#10b981; color:#04060a; font-weight:bold; padding:7px 14px; border-radius:4px;")
        self.btn_play.clicked.connect(self.toggle_play)
        c_layout.addWidget(self.btn_play)

        self.slider = QSlider(Qt.Orientation.Horizontal)
        self.slider.setRange(0, 295)
        self.slider.setValue(int(self.current_day * 10))
        self.slider.setStyleSheet("""
            QSlider::groove:horizontal { height: 6px; background: #232d3c; border-radius: 3px; }
            QSlider::sub-page:horizontal { background: #00f0ff; border-radius: 3px; }
            QSlider::handle:horizontal { background: #ffffff; width: 16px; margin-top: -5px; margin-bottom: -5px; border-radius: 8px; }
        """)
        self.slider.valueChanged.connect(self.on_slider_change)
        c_layout.addWidget(self.slider, stretch=3)

        self.lbl_time_hud = QLabel()
        self.lbl_time_hud.setFont(QFont("Monospace", 9, QFont.Weight.Bold))
        self.lbl_time_hud.setStyleSheet("color:#00f0ff;")
        c_layout.addWidget(self.lbl_time_hud, stretch=2)

        root_layout.addWidget(ctrl_frame)

        # -------------------------------------------------------------
        # 7. KARTU KOMPARASI BERDAMPINGAN: SITE ALPHA VS BETA VS GAMMA
        # -------------------------------------------------------------
        cmp_title = QLabel("<b style='color:#f8fafc; font-size:12px;'>⚡ KOMPARASI LOKASI PENDARATAN BERDAMPINGAN (QUICK SITE COMPARISON MATRIX)</b>")
        root_layout.addWidget(cmp_title)

        cards_frame = QFrame()
        cards_layout = QHBoxLayout(cards_frame)
        cards_layout.setContentsMargins(0, 0, 0, 0)
        cards_layout.setSpacing(10)

        self.card_widgets = {}
        for key in ["ALPHA", "BETA", "GAMMA"]:
            card = self.create_site_card(key)
            self.card_widgets[key] = card
            cards_layout.addWidget(card)

        root_layout.addWidget(cards_frame)

        # Status Bar
        self.setStatusBar(QStatusBar())
        self.statusBar().setStyleSheet(f"background-color: {PANEL_BG.name()}; color: {GRAY.name()}; font-size: 11px;")
        self.statusBar().showMessage("Sistem siap. Silakan tentukan tanggal pendaratan dan situs target.")

        self.update_all_views()

    # =================================================================
    # FETCH ASINKRON JPL HORIZONS MENGGUNAKAN QTHREAD
    # =================================================================
    def refresh_ephemeris_data(self):
        target_dt = day_offset_to_date(self.current_day)
        start_dt = target_dt - timedelta(days=2)
        end_dt = target_dt + timedelta(days=3)

        self.lbl_api_badge.setText("<span style='color:#facc15; font-size:10px;'>⏳ MENGAMBIL DATA POSISI NASA JPL HORIZONS...</span>")

        # Jalankan fetch dalam thread latar belakang
        self.jpl_worker = JPLFetchWorker(self.active_site, start_dt, end_dt, self)
        self.jpl_worker.data_ready.connect(self.on_jpl_data_received)
        self.jpl_worker.fetch_failed.connect(self.on_jpl_data_failed)
        self.jpl_worker.start()

    def on_jpl_data_received(self, data: dict):
        self.mission_ephem_data = data
        self._sun_data = data.get("sun", [])
        self._earth_data = data.get("earth", [])
        self.api_source_mode = data.get("source", "jpl_live")

        if self.api_source_mode == "jpl_live":
            self.lbl_api_badge.setText("<span style='color:#10b981; font-weight:bold; font-size:10px;'>🛰️ DATA NASA JPL HORIZONS: LIVE & ACCURATE</span>")
        else:
            self.lbl_api_badge.setText("<span style='color:#f59e0b; font-weight:bold; font-size:10px;'>⚠️ MODE OFFLINE — ESTIMASI APROKSIMASI SINUSOIDAL</span>")

        self.update_all_views()

    def on_jpl_data_failed(self, error_msg: str):
        self.api_source_mode = "approx_fallback"
        self.lbl_api_badge.setText("<span style='color:#f59e0b; font-weight:bold; font-size:10px;'>⚠️ MODE OFFLINE — ESTIMASI APROKSIMASI SINUSOIDAL</span>")
        self.update_all_views()

    def on_refresh_jpl_clicked(self):
        clear_cache()
        self.show_toast("🔄 Cache dibersihkan. Mengunduh data efemeris baru dari NASA...")
        self.refresh_ephemeris_data()

    def show_toast(self, message: str, duration_ms: int = 4000):
        self.lbl_toast.setText(message)
        self.statusBar().showMessage(message, duration_ms)
        QTimer.singleShot(duration_ms, lambda: self.lbl_toast.setText(""))

    # =================================================================
    # POSISI SUN & EARTH DENGAN FALLBACK APROKSIMASI
    # =================================================================
    def get_position_at_day(self, body: str, day_val: float) -> Tuple[float, float, str]:
        cur_dt = day_offset_to_date(day_val)
        pos = get_position_safe(body, self.active_site, cur_dt, self.mission_ephem_data, day_val)
        return pos["az"], pos["el"], pos.get("source", "")

    def get_current_sun_pos(self) -> Tuple[float, float, str]:
        return self.get_position_at_day("sun", self.current_day)

    def get_current_earth_pos(self) -> Tuple[float, float, str]:
        return self.get_position_at_day("earth", self.current_day)

    # =================================================================
    # KARTU KOMPARASI SITUS
    # =================================================================
    def create_site_card(self, key: str) -> QFrame:
        site = SITES_CONFIG[key]
        stats = SITE_STATS[key]

        card = QFrame()
        card.setCursor(Qt.CursorShape.PointingHandCursor)
        card.mousePressEvent = lambda ev, k=key: self.select_site(k)

        layout = QVBoxLayout(card)
        layout.setContentsMargins(12, 10, 12, 10)
        layout.setSpacing(4)

        # Header Card
        h_box = QHBoxLayout()
        name_lbl = QLabel(f"<b style='font-size:13px; color:{site['color_hex']};'>{site['name']}</b>")
        h_box.addWidget(name_lbl)
        tag_lbl = QLabel(f"<span style='font-size:9px; background:#1e293b; color:#94a3b8; padding:2px 6px; border-radius:3px;'>{site['tag']}</span>")
        h_box.addWidget(tag_lbl)
        layout.addLayout(h_box)

        # Status Real-Time di Tanggal Ini
        lbl_status = QLabel()
        lbl_status.setObjectName("lbl_status")
        lbl_status.setFont(QFont("Segoe UI", 9))
        layout.addWidget(lbl_status)

        # Garis Pembatas
        sep = QFrame()
        sep.setFrameShape(QFrame.Shape.HLine)
        sep.setStyleSheet("background-color: #1e304d; max-height: 1px;")
        layout.addWidget(sep)

        # Metrik Siklus Penuh
        lbl_metrics = QLabel(
            f"<span style='color:#94a3b8; font-size:10px;'>"
            f"• Total Daya Surya : <b style='color:#facc15;'>{stats['solar_hours']:.0f} Jam ({stats['solar_pct']:.0f}%)</b><br>"
            f"• Jendela Sinyal DTE : <b style='color:#00f0ff;'>{stats['dte_hours']:.0f} Jam ({stats['dte_pct']:.0f}%)</b><br>"
            f"• Rintangan Tertinggi: <b>{stats['max_obstacle']:+.1f}°</b> | Kemiringan: <b>{site['slope_deg']}°</b>"
            f"</span>"
        )
        layout.addWidget(lbl_metrics)

        # Tombol Pilih
        btn_sel = QPushButton(f"PILIH {key}")
        btn_sel.setObjectName("btn_sel")
        btn_sel.setCursor(Qt.CursorShape.PointingHandCursor)
        btn_sel.clicked.connect(lambda _, k=key: self.select_site(k))
        layout.addWidget(btn_sel)

        return card

    def select_site(self, key: str):
        self.active_site = key
        # Persist ke shared mission state
        update_from_terrain_scan(key)
        self.state = load_state()
        self.show_toast(f"📍 Situs aktif diubah ke: {SITES_CONFIG[key]['name']}")
        self.refresh_ephemeris_data()
        self.update_all_views()

    # =================================================================
    # KONTROL KALENDER & SLIDER
    # =================================================================
    def on_slider_change(self, val: int):
        if self._updating_widgets: return
        self.current_day = val / 10.0
        self.sync_date_picker_from_day()
        self.update_all_views()

    def on_date_picker_changed(self, qdate: QDate):
        if self._updating_widgets: return
        dt = datetime(qdate.year(), qdate.month(), qdate.day(), 12, 0, 0)
        day_val = date_to_day_offset(dt)
        self.current_day = day_val
        self._updating_widgets = True
        self.slider.setValue(int(self.current_day * 10))
        self._updating_widgets = False
        self.refresh_ephemeris_data()
        self.update_all_views()

    def sync_date_picker_from_day(self):
        self._updating_widgets = True
        dt = day_offset_to_date(self.current_day)
        self.date_picker.setDate(QDate(dt.year, dt.month, dt.day))
        self._updating_widgets = False

    def toggle_play(self):
        self.is_playing = not self.is_playing
        if self.is_playing:
            self.btn_play.setText("⏸ PAUSE")
            self.btn_play.setStyleSheet("background-color:#f59e0b; color:#04060a; font-weight:bold; padding:7px 14px; border-radius:4px;")
            self.anim_timer.start(50)
        else:
            self.btn_play.setText("▶ PLAY SIMULATION")
            self.btn_play.setStyleSheet("background-color:#10b981; color:#04060a; font-weight:bold; padding:7px 14px; border-radius:4px;")
            self.anim_timer.stop()

    def advance_time(self):
        new_val = (self.slider.value() + 1) % 296
        self.slider.setValue(new_val)

    # =================================================================
    # PENCARIAN TANGGAL TERBAIK (GOLDEN WINDOW FINDER)
    # =================================================================
    def find_golden_window(self):
        # Cari tanggal di mana Site Alpha mendapatkan penyinaran matahari & koneksi DTE terbaik
        best_day = 0.0
        max_score = -1e9
        for d in np.linspace(0, LUNAR_SYNODIC_DAYS, 296):
            az_s, el_s = get_sun_position_approx(d)
            az_e, el_e = get_earth_position_approx(d)
            h_alpha = SITE_HORIZONS["ALPHA"]
            s_vis = el_s >= h_alpha[int(az_s) % 360]
            e_vis = el_e >= h_alpha[int(az_e) % 360]
            score = (100.0 if s_vis else -100.0) + (100.0 if e_vis else -100.0) + el_s * 10.0
            if score > max_score:
                max_score = score
                best_day = d

        self.current_day = best_day
        self._updating_widgets = True
        self.slider.setValue(int(best_day * 10))
        self._updating_widgets = False
        self.sync_date_picker_from_day()
        self.refresh_ephemeris_data()
        self.update_all_views()

        # Update Shared Mission State
        dt_chosen = day_offset_to_date(self.current_day)
        az_s, el_s, _ = self.get_current_sun_pos()
        az_e, el_e, _ = self.get_current_earth_pos()
        h_active = SITE_HORIZONS[self.active_site]
        s_ok = el_s >= h_active[int(az_s) % 360]
        e_ok = el_e >= h_active[int(az_e) % 360]

        update_from_horizon_planner(
            landing_date=dt_chosen.strftime("%Y-%m-%d"),
            landing_time_utc=dt_chosen.strftime("%H:%M"),
            lunar_day_offset=self.current_day,
            sun_az=az_s,
            sun_el=el_s,
            earth_az=az_e,
            earth_el=el_e,
            solar_ok=s_ok,
            dte_ok=e_ok,
        )

        self.state = load_state()
        self.show_toast(f"✅ Tanggal misi tersimpan: {dt_chosen.strftime('%d %B %Y')} → Diteruskan ke Modul Trajektori!")

    # =================================================================
    # REFRESH SEMUA TAMPILAN
    # =================================================================
    def update_all_views(self):
        dt_current = day_offset_to_date(self.current_day)
        self.lbl_time_hud.setText(
            f"📅 {dt_current.strftime('%d %B %Y')} | {dt_current.strftime('%H:%M')} UTC\n"
            f"Fase Siklus: Hari {self.current_day:04.1f} ({self.current_day*24.0:05.1f} Jam)"
        )

        az_s, el_s, _ = self.get_current_sun_pos()
        az_e, el_e, _ = self.get_current_earth_pos()

        # Update panel info status misi saat ini
        sol_badge = "<span style='color:#10b981;'>☀️ PANEL SURYA AKTIF</span>" if el_s >= 0 else "<span style='color:#ef4444;'>🌑 BAYANGAN KELAP</b>"
        dte_badge = "<span style='color:#00f0ff;'>📡 DTE BEBAS HAMBATAN</span>" if el_e >= 0 else "<span style='color:#ef4444;'>⚠️ SINYAL TERHALANG</b>"
        self.lbl_shared_state_info.setText(
            f"<b>STATUS MISI SAAT INI:</b> Target <b>{self.active_site}</b> | "
            f"Matahari (Az:{az_s:.1f}°, El:{el_s:+.2f}°) • {sol_badge} | "
            f"Bumi (Az:{az_e:.1f}°, El:{el_e:+.2f}°) • {dte_badge}"
        )

        # Evaluasi kondisi per situs untuk tanggal ini
        site_evals = {}
        for k in ["ALPHA", "BETA", "GAMMA"]:
            h = SITE_HORIZONS[k]
            s_ok = el_s >= h[int(az_s) % 360]
            e_ok = el_e >= h[int(az_e) % 360]
            site_evals[k] = {"sun": s_ok, "dte": e_ok}

        # Tentukan Rekomendasi di Tanggal Ini
        best_pick = "ALPHA"
        if site_evals["ALPHA"]["sun"] and site_evals["ALPHA"]["dte"]:
            best_pick = "ALPHA"
        elif site_evals["BETA"]["sun"] and site_evals["BETA"]["dte"]:
            best_pick = "BETA"
        elif site_evals["GAMMA"]["sun"] and site_evals["GAMMA"]["dte"]:
            best_pick = "GAMMA"
        else:
            best_pick = "ALPHA" if site_evals["ALPHA"]["dte"] else "BETA"

        best_site_info = SITES_CONFIG[best_pick]
        src_tag = "🛰️ JPL Live" if self.api_source_mode == "jpl_live" else "⚠️ Aproksimasi"
        self.lbl_banner.setText(
            f"🏆 <b>REKOMENDASI SISTEM ({dt_current.strftime('%d %b %Y')}):</b> "
            f"Tapak terbaik: <b style='color:{best_site_info['color_hex']};'>{best_site_info['name']}</b>. "
            f"Daya surya & DTE optimal. [{src_tag}]"
        )

        # Update Tampilan Kartu Komparasi
        for key, card in self.card_widgets.items():
            is_active = (key == self.active_site)
            site = SITES_CONFIG[key]
            eval_info = site_evals[key]

            border_c = site['color_hex'] if is_active else "#1e304d"
            bg_c = "#142036" if is_active else PANEL_BG.name()
            card.setStyleSheet(f"background-color: {bg_c}; border: 2px solid {border_c}; border-radius: 6px;")

            lbl_st = card.findChild(QLabel, "lbl_status")
            if lbl_st:
                s_txt = "<span style='color:#10b981; font-weight:bold;'>☀️ DAYA AKTIF</span>" if eval_info["sun"] else "<span style='color:#ef4444; font-weight:bold;'>🌑 BAYANGAN</span>"
                e_txt = "<span style='color:#00f0ff; font-weight:bold;'>📡 DTE ONLINE</span>" if eval_info["dte"] else "<span style='color:#ef4444; font-weight:bold;'>⚠️ TERHALANG</span>"
                lbl_st.setText(f"Status: {s_txt} | {e_txt}")

            btn_s = card.findChild(QPushButton, "btn_sel")
            if btn_s:
                if is_active:
                    btn_s.setText("✓ SEDANG AKTIF")
                    btn_s.setStyleSheet(f"background-color:{site['color_hex']}; color:#04060a; font-weight:bold; padding:4px 8px; border-radius:4px;")
                else:
                    btn_s.setText(f"PILIH {key}")
                    btn_s.setStyleSheet("background-color:#1e293b; color:#94a3b8; font-weight:bold; padding:4px 8px; border-radius:4px;")

        self.horizon_widget.update()
        self.timeline_widget.update()


# =====================================================================
# TITIK MASUK UTAMA
# =====================================================================
def main():
    app = QApplication.instance()
    owns_app = False
    if app is None:
        app = QApplication(sys.argv)
        owns_app = True
    window = LunarSolarEarthPlannerApp()
    window.show()
    if owns_app:
        sys.exit(app.exec())
    return window


if __name__ == "__main__":
    main()
