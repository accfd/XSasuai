# -*- coding: utf-8 -*-
# main.py — Autonomous Lunar Mission Planner & 3D GNC Simulation Suite
# =====================================================================
# Proyek  : Lunar Landing Site Navigator (Project SUAI)
# Event   : NASA Space Apps Challenge 2026
# Target  : Mons Mouton, Kutub Selatan Bulan (-84.5°S)
# Deskripsi: Platform terpadu berbasis PyQt6 (Single Window, Single Flow)
#            yang menggabungkan 4 Pilar Misi:
#            [1] Di Mana?  ➔ Analisis Spasial & Topografi Terrain
#            [2] Kapan?    ➔ Evaluasi 360° Cakrawala & JPL Horizons
#            [3] Cara?     ➔ Solver Trajektori Fisika 3-DoF & Propulsi
#            [4] Uji Coba! ➔ 3D Cockpit & Flight Testbed
# =====================================================================

import os
import sys
import subprocess
from datetime import datetime, timezone

from PyQt6.QtWidgets import (
    QApplication, QMainWindow, QWidget, QVBoxLayout, QHBoxLayout,
    QTabWidget, QPushButton, QLabel, QFrame, QGridLayout,
    QProgressBar, QScrollArea, QMessageBox, QStatusBar
)
from PyQt6.QtCore import Qt, QTimer
from PyQt6.QtGui import QFont, QColor, QPalette

from constants import (
    SITES_CONFIG,
    HACKATHON_START,
    LUNAR_SYNODIC_DAYS,
    day_offset_to_date,
    date_to_day_offset,
)
from mission_state import (
    load_state,
    save_state,
    reset_state,
    get_status_summary,
    update_from_terrain_scan,
)
from horizons_api import is_api_available, clear_cache

# Import Modul 2 & 3 untuk di-embed langsung ke Tab
from solar_earth_horizon_planner import LunarSolarEarthPlannerApp
from simulate_landing import SpaceAppsDashboard


# =====================================================================
# TEMA CYBERPUNK GLOBAL
# =====================================================================
BG_DARK    = "#0a0e17"
PANEL_BG   = "#0f1726"
BORDER_COL = "#1e304d"
CYAN       = "#00f0ff"
BLUE       = "#38bdf8"
GREEN      = "#10b981"
YELLOW     = "#facc15"
ORANGE     = "#fb923c"
RED        = "#ef4444"
WHITE      = "#f8fafc"
GRAY       = "#94a3b8"


class MissionControlApp(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("🌑 Lunar Landing Site Navigator — NASA Space Apps Challenge 2026")
        self.resize(1340, 880)
        self.setMinimumSize(1100, 750)
        self.setStyleSheet(f"""
            QMainWindow {{ background-color: {BG_DARK}; color: {WHITE}; }}
            QTabWidget::pane {{ border: 1px solid {BORDER_COL}; background-color: {BG_DARK}; }}
            QTabBar::tab {{
                background-color: {PANEL_BG};
                color: {GRAY};
                padding: 10px 20px;
                font-weight: bold;
                font-size: 11px;
                border: 1px solid {BORDER_COL};
                border-bottom: none;
                border-top-left-radius: 4px;
                border-top-right-radius: 4px;
                margin-right: 2px;
            }}
            QTabBar::tab:selected {{
                background-color: #16243b;
                color: {CYAN};
                border-top: 2px solid {CYAN};
            }}
            QTabBar::tab:hover {{
                color: {WHITE};
            }}
        """)

        # Shared Mission State
        self.state = load_state()

        # Inisialisasi UI
        self.init_ui()

        # Timer untuk jam status bar & auto-sync
        self.clock_timer = QTimer(self)
        self.clock_timer.timeout.connect(self.update_status_clock)
        self.clock_timer.start(1000)

        # Buka langsung ke Dashboard
        self.tabs.setCurrentIndex(0)
        self.refresh_dashboard()

    def init_ui(self):
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        main_layout = QVBoxLayout(central_widget)
        main_layout.setContentsMargins(10, 8, 10, 8)
        main_layout.setSpacing(6)

        # -------------------------------------------------------------
        # 1. TOP GLOBAL APP HEADER
        # -------------------------------------------------------------
        header = QFrame()
        header.setStyleSheet(f"background-color: {PANEL_BG}; border: 1px solid {BORDER_COL}; border-radius: 6px;")
        h_layout = QHBoxLayout(header)
        h_layout.setContentsMargins(14, 8, 14, 8)

        logo_title = QLabel(
            f"<b style='font-size:16px; color:{CYAN};'>PROJECT SUAI</b> "
            f"<span style='font-size:13px; color:{WHITE};'>| SMART UNIFIED ARTEMIS INTERFACE</span><br>"
            f"<span style='font-size:10px; color:{GRAY};'>NASA Space Apps Challenge 2026 • Lunar Landing Site Navigator • Target: Mons Mouton (-84.5°S)</span>"
        )
        h_layout.addWidget(logo_title, stretch=3)

        # Action Buttons Header
        btn_box = QHBoxLayout()
        self.btn_reset_mission = QPushButton("🔄 RESET MISI")
        self.btn_reset_mission.setCursor(Qt.CursorShape.PointingHandCursor)
        self.btn_reset_mission.setStyleSheet(f"background-color: #331520; color: {RED}; border: 1px solid {RED}; padding: 6px 12px; font-weight: bold; border-radius: 4px;")
        self.btn_reset_mission.clicked.connect(self.on_reset_clicked)
        btn_box.addWidget(self.btn_reset_mission)

        self.btn_jpl_sync = QPushButton("🛰️ JPL STATUS: CEK...")
        self.btn_jpl_sync.setCursor(Qt.CursorShape.PointingHandCursor)
        self.btn_jpl_sync.setStyleSheet(f"background-color: #1e293b; color: {YELLOW}; border: 1px solid {BORDER_COL}; padding: 6px 12px; font-weight: bold; border-radius: 4px;")
        self.btn_jpl_sync.clicked.connect(self.check_jpl_status)
        btn_box.addWidget(self.btn_jpl_sync)

        h_layout.addLayout(btn_box, stretch=1)
        main_layout.addWidget(header)

        # -------------------------------------------------------------
        # 2. STATUS BAR (Inisialisasi Lebih Awal Agar Tidak AttributeError Saat Tab Ditambahkan)
        # -------------------------------------------------------------
        self.status_bar = QStatusBar()
        self.status_bar.setStyleSheet(f"background-color: {PANEL_BG}; color: {GRAY}; border-top: 1px solid {BORDER_COL}; font-family: Monospace;")
        self.setStatusBar(self.status_bar)

        self.lbl_status_site = QLabel("📍 SITUS: ALPHA")
        self.lbl_status_date = QLabel("📅 TANGGAL: 14 Nov 2026")
        self.lbl_status_jpl = QLabel("🛰️ NASA JPL: ONLINE")
        self.lbl_status_time = QLabel()

        self.status_bar.addWidget(self.lbl_status_site, 1)
        self.status_bar.addWidget(self.lbl_status_date, 1)
        self.status_bar.addWidget(self.lbl_status_jpl, 1)
        self.status_bar.addPermanentWidget(self.lbl_status_time)

        # -------------------------------------------------------------
        # 3. QTABWIDGET DENGAN 5 TAB LENGKAP
        # -------------------------------------------------------------
        self.tabs = QTabWidget()

        # Tab 0: Mission Control Dashboard
        self.tab_dashboard = QWidget()
        self.init_tab_dashboard()
        self.tabs.addTab(self.tab_dashboard, "🎛️ DASHBOARD MISI")

        # Tab 1: Terrain Scanner
        self.tab_terrain = QWidget()
        self.init_tab_terrain()
        self.tabs.addTab(self.tab_terrain, "🗺️ 1. MEDAN (DI MANA?)")

        # Tab 2: Horizon & Date Planner
        self.horizon_planner_app = LunarSolarEarthPlannerApp(parent=self)
        self.tabs.addTab(self.horizon_planner_app.centralWidget(), "☀️ 2. CAKRAWALA & TANGGAL (KAPAN?)")

        # Tab 3: Trajectory Solver
        self.trajectory_app = SpaceAppsDashboard(parent=self)
        self.tabs.addTab(self.trajectory_app.centralWidget(), "⚙️ 3. TRAJEKTORI (CARA?)")

        # Tab 4: 3D Flight Simulator
        self.tab_simulator = QWidget()
        self.init_tab_simulator()
        self.tabs.addTab(self.tab_simulator, "🎮 4. SIMULATOR 3D (UJI COBA!)")

        self.tabs.currentChanged.connect(self.on_tab_changed)
        main_layout.addWidget(self.tabs, stretch=1)

        # Initial check
        QTimer.singleShot(500, self.check_jpl_status)

    # =================================================================
    # TAB 0: DASHBOARD UTAMA
    # =================================================================
    def init_tab_dashboard(self):
        scroll = QScrollArea()
        scroll.setWidgetResizable(True)
        scroll.setStyleSheet("border: none; background: transparent;")

        container = QWidget()
        scroll.setWidget(container)
        lay = QVBoxLayout(container)
        lay.setContentsMargins(16, 16, 16, 16)
        lay.setSpacing(14)

        # Banner Ringkasan Progres
        prog_frame = QFrame()
        prog_frame.setStyleSheet(f"background-color: {PANEL_BG}; border: 1px solid {BORDER_COL}; border-radius: 6px; padding: 10px;")
        p_lay = QVBoxLayout(prog_frame)
        p_top = QHBoxLayout()

        self.lbl_prog_title = QLabel("<b>STATUS EKSEKUSI PIPELINE PERENCANAAN MISI BULAN</b>")
        self.lbl_prog_title.setStyleSheet(f"color: {WHITE}; font-size: 13px;")
        p_top.addWidget(self.lbl_prog_title)

        self.lbl_prog_pct = QLabel("0% SELESAI")
        self.lbl_prog_pct.setStyleSheet(f"color: {CYAN}; font-weight: bold; font-size: 13px;")
        p_top.addWidget(self.lbl_prog_pct, alignment=Qt.AlignmentFlag.AlignRight)
        p_lay.addLayout(p_top)

        self.prog_bar = QProgressBar()
        self.prog_bar.setRange(0, 100)
        self.prog_bar.setValue(0)
        self.prog_bar.setTextVisible(False)
        self.prog_bar.setStyleSheet(f"""
            QProgressBar {{ background-color: #101827; border: 1px solid {BORDER_COL}; height: 8px; border-radius: 4px; }}
            QProgressBar::chunk {{ background-color: {CYAN}; border-radius: 3px; }}
        """)
        p_lay.addWidget(self.prog_bar)
        lay.addWidget(prog_frame)

        # 4 Pilar Misi Cards Grid
        grid = QGridLayout()
        grid.setSpacing(12)

        self.card_pilar1 = self.create_pilar_card("1. DI MANA?", "Pemilihan Tapak Pendaratan", "Analisis Spasial NASA LOLA DEM & Iluminasi", 1)
        self.card_pilar2 = self.create_pilar_card("2. KAPAN?", "Jendela Misi & Cakrawala 360°", "NASA JPL Horizons Ephemeris, Surya & DTE", 2)
        self.card_pilar3 = self.create_pilar_card("3. CARA?", "Solver Trajektori Dinamika Roket", "Closed-Loop GNC, Delta-V & Propulsi", 3)
        self.card_pilar4 = self.create_pilar_card("4. UJI COBA!", "Simulator 3D Cockpit Real-Time", "Uji Pendaratan Presisi Otomatis Apollo/CLPS", 4)

        grid.addWidget(self.card_pilar1, 0, 0)
        grid.addWidget(self.card_pilar2, 0, 1)
        grid.addWidget(self.card_pilar3, 1, 0)
        grid.addWidget(self.card_pilar4, 1, 1)
        lay.addLayout(grid)

        # Summary Parameters Table Frame
        param_frame = QFrame()
        param_frame.setStyleSheet(f"background-color: {PANEL_BG}; border: 1px solid {BORDER_COL}; border-radius: 6px; padding: 14px;")
        param_lay = QVBoxLayout(param_frame)

        param_title = QLabel("<b>TELEMETRI DAN PARAMETER KEPUTUSAN MISI AKTIF</b>")
        param_title.setStyleSheet(f"color: {BLUE}; font-size: 12px;")
        param_lay.addWidget(param_title)

        self.lbl_telemetry_details = QLabel()
        self.lbl_telemetry_details.setStyleSheet(f"color: {WHITE}; font-size: 11px; line-height: 1.6;")
        param_lay.addWidget(self.lbl_telemetry_details)

        # Navigasi Lanjut Cepat
        act_box = QHBoxLayout()
        self.btn_start_flow = QPushButton("🚀 MULAI ALUR TERPANDU (1 ➔ 2 ➔ 3 ➔ 4)")
        self.btn_start_flow.setCursor(Qt.CursorShape.PointingHandCursor)
        self.btn_start_flow.setStyleSheet(f"background-color: #0284c7; color: white; font-weight: bold; padding: 10px 18px; border-radius: 4px; font-size: 12px;")
        self.btn_start_flow.clicked.connect(lambda: self.tabs.setCurrentIndex(1))
        act_box.addWidget(self.btn_start_flow)

        param_lay.addLayout(act_box)
        lay.addWidget(param_frame)

        v_layout = QVBoxLayout(self.tab_dashboard)
        v_layout.setContentsMargins(0, 0, 0, 0)
        v_layout.addWidget(scroll)

    def create_pilar_card(self, step_no, title, subtitle, target_tab):
        card = QFrame()
        card.setStyleSheet(f"background-color: {PANEL_BG}; border: 1px solid {BORDER_COL}; border-radius: 6px;")
        card.setCursor(Qt.CursorShape.PointingHandCursor)
        c_lay = QVBoxLayout(card)
        c_lay.setContentsMargins(14, 12, 14, 12)
        c_lay.setSpacing(6)

        h_top = QHBoxLayout()
        lbl_step = QLabel(f"<b style='color:{CYAN}; font-size:13px;'>{step_no}</b>")
        h_top.addWidget(lbl_step)

        lbl_badge = QLabel("<span style='font-size:9px; background:#1e293b; color:#94a3b8; padding:2px 6px; border-radius:3px;'>SIAP</span>")
        lbl_badge.setObjectName("badge")
        h_top.addWidget(lbl_badge, alignment=Qt.AlignmentFlag.AlignRight)
        c_lay.addLayout(h_top)

        lbl_t = QLabel(f"<b style='color:{WHITE}; font-size:12px;'>{title}</b>")
        c_lay.addWidget(lbl_t)

        lbl_sub = QLabel(f"<span style='color:{GRAY}; font-size:10px;'>{subtitle}</span>")
        c_lay.addWidget(lbl_sub)

        btn_go = QPushButton("BUKA MODUL →")
        btn_go.setCursor(Qt.CursorShape.PointingHandCursor)
        btn_go.setStyleSheet(f"background-color: #1e293b; color: {CYAN}; border: 1px solid {BORDER_COL}; padding: 6px; font-size: 10px; font-weight: bold; border-radius: 3px;")
        btn_go.clicked.connect(lambda: self.tabs.setCurrentIndex(target_tab))
        c_lay.addWidget(btn_go)

        return card

    # =================================================================
    # TAB 1: TERRAIN SCANNER EMBED / LAUNCHER
    # =================================================================
    def init_tab_terrain(self):
        lay = QVBoxLayout(self.tab_terrain)
        lay.setContentsMargins(16, 16, 16, 16)
        lay.setSpacing(12)

        header_box = QFrame()
        header_box.setStyleSheet(f"background-color: {PANEL_BG}; border: 1px solid {BORDER_COL}; border-radius: 6px; padding: 12px;")
        h_lay = QVBoxLayout(header_box)

        lbl_h = QLabel(
            f"<b style='color:{CYAN}; font-size:14px;'>MODUL 1: ANALISIS MEDAN SPASIAL & PEMILIHAN TAPAK (MCDA)</b><br>"
            f"<span style='color:{GRAY}; font-size:11px;'>Mengolah citra satelit NASA LOLA DEM dan iluminasi penyinaran surya untuk sertifikasi zona pendaratan aman.</span>"
        )
        h_lay.addWidget(lbl_h)
        lay.addWidget(header_box)

        # Quick Site Cards Selector
        sites_box = QHBoxLayout()
        for k, v in SITES_CONFIG.items():
            card = QFrame()
            card.setStyleSheet(f"background-color: {PANEL_BG}; border: 1px solid {BORDER_COL}; border-radius: 6px; padding: 10px;")
            c_l = QVBoxLayout(card)
            c_l.addWidget(QLabel(f"<b style='color:{v['color_hex']}; font-size:13px;'>{v['name']}</b>"))
            c_l.addWidget(QLabel(f"<span style='color:{GRAY}; font-size:10px;'>Tag: <b>{v['tag']}</b><br>Elevasi: <b>{v['elev_m']:.0f}m</b> | Kemiringan: <b>{v['slope_deg']}°</b><br>Koordinat: <b>{v['lat_deg']}°S, {v['lon_deg']}°E</b></span>"))

            btn_choose = QPushButton(f"PILIH {k} SEBAGAI TARGET")
            btn_choose.setCursor(Qt.CursorShape.PointingHandCursor)
            btn_choose.setStyleSheet(f"background-color: #1e293b; color: {v['color_hex']}; border: 1px solid {v['color_hex']}; padding: 6px; font-weight: bold; border-radius: 4px;")
            btn_choose.clicked.connect(lambda _, sk=k: self.select_site_from_tab1(sk))
            c_l.addWidget(btn_choose)
            sites_box.addWidget(card)
        lay.addLayout(sites_box)

        # Action Buttons
        bot_box = QFrame()
        bot_box.setStyleSheet(f"background-color: {PANEL_BG}; border: 1px solid {BORDER_COL}; border-radius: 6px; padding: 14px;")
        b_lay = QHBoxLayout(bot_box)

        btn_run_scan = QPushButton("🔬 BUKA PETA SPASIAL LENGKAP (MATPLOTLIB 3D & MCDA)")
        btn_run_scan.setCursor(Qt.CursorShape.PointingHandCursor)
        btn_run_scan.setStyleSheet(f"background-color: #1e293b; color: {CYAN}; border: 1px solid {CYAN}; padding: 10px 16px; font-weight: bold; border-radius: 4px;")
        btn_run_scan.clicked.connect(self.launch_interactive_scan)
        b_lay.addWidget(btn_run_scan)

        btn_next = QPushButton("LANJUT KE PILAR 2: EVALUASI CAKRAWALA & TANGGAL →")
        btn_next.setCursor(Qt.CursorShape.PointingHandCursor)
        btn_next.setStyleSheet("background-color: #0284c7; color: white; padding: 10px 18px; font-weight: bold; border-radius: 4px;")
        btn_next.clicked.connect(lambda: self.tabs.setCurrentIndex(2))
        b_lay.addWidget(btn_next)

        lay.addWidget(bot_box)
        lay.addStretch()

    def select_site_from_tab1(self, site_key):
        update_from_terrain_scan(site_key)
        self.state = load_state()
        self.horizon_planner_app.select_site(site_key)
        self.trajectory_app.change_site(site_key)
        self.refresh_dashboard()
        QMessageBox.information(self, "Situs Terpilih", f"✅ Situs pendaratan berhasil diatur ke: {site_key}\nData otomatis tersinkronisasi ke seluruh modul!")

    def launch_interactive_scan(self):
        try:
            subprocess.Popen([sys.executable, "scan_terrain.py"])
        except Exception as e:
            QMessageBox.warning(self, "Error", f"Gagal meluncurkan scan_terrain.py: {e}")

    # =================================================================
    # TAB 4: SIMULATOR 3D EMBED / LAUNCHER
    # =================================================================
    def init_tab_simulator(self):
        lay = QVBoxLayout(self.tab_simulator)
        lay.setContentsMargins(16, 16, 16, 16)
        lay.setSpacing(14)

        box = QFrame()
        box.setStyleSheet(f"background-color: {PANEL_BG}; border: 1px solid {BORDER_COL}; border-radius: 6px; padding: 16px;")
        b_lay = QVBoxLayout(box)

        lbl = QLabel(
            f"<b style='color:{CYAN}; font-size:15px;'>PILAR 4: 3D REAL-TIME AUTONOMOUS FLIGHT TESTBED</b><br>"
            f"<span style='color:{GRAY}; font-size:11px;'>Simulasi 3D berbasis gravitasi Bulan (1.62 m/s²) dengan rendering model CSM Columbia & LM Eagle.</span>"
        )
        b_lay.addWidget(lbl)

        self.lbl_sim_context = QLabel()
        self.lbl_sim_context.setStyleSheet("color: white; font-size: 11px; margin-top: 10px;")
        b_lay.addWidget(self.lbl_sim_context)

        btn_launch = QPushButton("🚀 LUNCURKAN SIMULATOR 3D PINPOINT FLIGHT (PYGAME)")
        btn_launch.setCursor(Qt.CursorShape.PointingHandCursor)
        btn_launch.setStyleSheet("background-color: #10b981; color: #04060a; font-weight: bold; font-size: 13px; padding: 12px 24px; border-radius: 4px; margin-top: 15px;")
        btn_launch.clicked.connect(self.launch_3d_simulator)
        b_lay.addWidget(btn_launch)

        lay.addWidget(box)
        lay.addStretch()

    def launch_3d_simulator(self):
        try:
            subprocess.Popen([sys.executable, "lunar_game_simulator.py"])
        except Exception as e:
            QMessageBox.warning(self, "Error", f"Gagal meluncurkan simulator 3D: {e}")

    # =================================================================
    # LOGIKA SINKRONISASI & EVENT
    # =================================================================
    def on_tab_changed(self, index):
        self.state = load_state()
        self.refresh_dashboard()

        # Update status bar info
        self.lbl_status_site.setText(f"📍 SITUS: {self.state.selected_site}")
        self.lbl_status_date.setText(f"📅 TANGGAL: {self.state.landing_date}")

        # Update simulator context
        sol = "☀️ AKTIF" if self.state.solar_ok else "🌑 BAYANGAN"
        dte = "📡 ONLINE" if self.state.dte_ok else "⚠️ TERHALANG"
        self.lbl_sim_context.setText(
            f"<b>Parameter Misi Siap Diuji:</b><br>"
            f"• Target Pendaratan  : <b>{self.state.selected_site}</b> ({self.state.site_config['name']})<br>"
            f"• Koordinat Target   : <b>{self.state.target_coords_3d}</b> m<br>"
            f"• Tanggal Misi       : <b>{self.state.landing_date}</b> ({sol} | {dte})<br>"
            f"• Sisa Bahan Bakar   : <b>{self.state.prop_remaining_kg:.1f} kg</b> (Kalkulasi Trajektori)<br>"
            f"• Kontrol Kemudi     : <b>Autopilot Closed-Loop GNC</b> / Manual Keyboard"
        )

    def refresh_dashboard(self):
        self.state = load_state()
        summary = get_status_summary()

        # Progress bar
        prog = self.state.pipeline_progress
        self.prog_bar.setValue(prog)
        self.lbl_prog_pct.setText(f"{prog}% SELESAI ({summary['overall']['mission_ready']})")

        # Telemetry detail text
        w = summary["window"]
        s = summary["site"]
        t = summary["trajectory"]
        self.lbl_telemetry_details.setText(
            f"<b>📍 Situs Pilihan:</b> {s['name']} [{s['key']}] — Elevasi: {s['elev_m']}, Slope: {s['slope']}<br>"
            f"<b>📅 Kalender Misi:</b> {w['landing_date']} {w['landing_time']} ({w['lunar_day']})<br>"
            f"<b>☀️ Kondisi Surya:</b> {w['sun_position']} ➔ {w['solar_power']}<br>"
            f"<b>📡 Koneksi Bumi :</b> {w['earth_position']} ➔ {w['dte_comm']}<br>"
            f"<b>🚀 Solusi Roket  :</b> ΔV={t['total_dv']} | Propelan Sisa={t['prop_remaining']} | Touchdown: {t['touchdown_velocity']}"
        )

    def check_jpl_status(self):
        online = is_api_available()
        if online:
            self.btn_jpl_sync.setText("🛰️ JPL: LIVE ONLINE")
            self.btn_jpl_sync.setStyleSheet(f"background-color: #064e3b; color: {GREEN}; border: 1px solid {GREEN}; padding: 6px 12px; font-weight: bold; border-radius: 4px;")
            self.lbl_status_jpl.setText("🛰️ NASA JPL: ONLINE")
            self.lbl_status_jpl.setStyleSheet(f"color: {GREEN};")
        else:
            self.btn_jpl_sync.setText("⚠️ JPL: OFFLINE")
            self.btn_jpl_sync.setStyleSheet(f"background-color: #451a03; color: {YELLOW}; border: 1px solid {YELLOW}; padding: 6px 12px; font-weight: bold; border-radius: 4px;")
            self.lbl_status_jpl.setText("⚠️ NASA JPL: OFFLINE")
            self.lbl_status_jpl.setStyleSheet(f"color: {YELLOW};")

    def update_status_clock(self):
        now_utc = datetime.now(timezone.utc)
        self.lbl_status_time.setText(f"🕒 UTC: {now_utc.strftime('%H:%M:%S')} | T-0: {HACKATHON_START.strftime('%d-%b-%Y')}")

    def on_reset_clicked(self):
        reply = QMessageBox.question(
            self, "Konfirmasi Reset",
            "Apakah Anda yakin ingin mereset seluruh progres dan state misi?",
            QMessageBox.StandardButton.Yes | QMessageBox.StandardButton.No
        )
        if reply == QMessageBox.StandardButton.Yes:
            reset_state()
            self.state = load_state()
            self.refresh_dashboard()
            self.tabs.setCurrentIndex(0)
            QMessageBox.information(self, "Reset Selesai", "State misi telah dikembalikan ke kondisi awal.")


def main():
    import argparse
    import webbrowser

    parser = argparse.ArgumentParser(description="XSasuai — Lunar Landing Site Navigator (NASA Space Apps Challenge 2026)")
    parser.add_argument("--web", action="store_true", help="Jalankan antarmuka interaktif Web Dashboard (Tornado)")
    parser.add_argument("--desktop", action="store_true", help="Jalankan antarmuka Desktop GUI (PyQt6) [Default]")
    parser.add_argument("--sim", action="store_true", help="Jalankan 3D Cockpit Flight Simulator Testbed")
    parser.add_argument("--eval", action="store_true", help="Jalankan evaluasi CLI untuk ketiga kandidat situs")
    parser.add_argument("--port", type=int, default=8888, help="Port untuk Web Dashboard (default: 8888)")

    args, unknown = parser.parse_known_args()

    # 1. Mode Web Dashboard
    if args.web:
        from web.server import run_server
        url = f"http://127.0.0.1:{args.port}"
        print(f"🚀 Membuka XSasuai Web Application di browser: {url}")
        try:
            webbrowser.open(url)
        except Exception:
            pass
        run_server(args.port)
        return

    # 2. Mode Simulator Pygame
    if args.sim:
        from lunar_game_simulator import main as sim_main
        print("🎮 Memulai Lunar Flight Testbed 3D Simulator...")
        sim_main()
        return

    # 3. Mode Evaluasi CLI
    if args.eval:
        from src import site_evaluator
        print("🔍 Menjalankan Evaluasi Spasiotemporal & MCDA untuk Situs Mons Mouton...")
        now = datetime.now()
        for site in ["ALPHA", "BETA", "GAMMA"]:
            res = site_evaluator.evaluate_site_at_datetime(site, now)
            mcda = res["mcda"]
            print(f"  [{site}] {res['site_name']} | Slope: {res['slope_deg']}° | Skor MCDA: {mcda['total_score']} | Status: {mcda['status']}")
        return

    # 4. Mode Desktop GUI (PyQt6) — Default
    app = QApplication.instance()
    owns = False
    if app is None:
        app = QApplication(sys.argv)
        owns = True
    app.setStyle("Fusion")
    window = MissionControlApp()
    window.show()
    if owns:
        sys.exit(app.exec())
    return window


if __name__ == "__main__":
    main()
