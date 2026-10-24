import sys, math
import numpy as np
from PyQt6.QtWidgets import (QApplication, QMainWindow, QWidget, QVBoxLayout,
                             QHBoxLayout, QPushButton, QSlider, QLabel, QStackedWidget)
from PyQt6.QtCore import Qt, QTimer, QRectF, QPointF
from PyQt6.QtGui import QPainter, QColor, QPen, QFont, QBrush, QPolygonF
import pyqtgraph as pg

# =====================================================================
# 1. PARAMETER FISIKA & SPESIFIKASI WAHANA
# =====================================================================
G_MOON, ISP, G0 = 1.62, 310.0, 9.80665
DRY_MASS, PROP_MASS_INIT = 450.0, 350.0
MAX_THRUST, MIN_THRUST, DT, MAX_TIME = 3200.0, 400.0, 0.05, 150.0

SITES = {
    "ALPHA": {"name": "Site Alpha (Mons Mouton)", "short": "ALPHA", "pos": np.array([0.0, 0.0, 0.0]), "color": QColor(16, 185, 129)},
    "BETA": {"name": "Site Beta (Plateau North)", "short": "BETA", "pos": np.array([600.0, 400.0, 0.0]), "color": QColor(0, 229, 255)},
    "GAMMA": {"name": "Site Gamma (Ridge West)", "short": "GAMMA", "pos": np.array([-500.0, -800.0, 0.0]), "color": QColor(250, 204, 21)}
}

# Tema Cyberpunk Global
PANEL_BG = QColor(12, 18, 30)
CYAN, BLUE, GREEN, YELLOW, RED = QColor(0, 240, 255), QColor(56, 189, 248), QColor(16, 185, 129), QColor(250, 204, 21), QColor(239, 68, 68)
WHITE, GRAY = QColor(248, 250, 252), QColor(100, 116, 139)

def run_gnc_simulation(target_coords):
    pos, vel = np.array([450.0, 320.0, 1500.0]), np.array([-25.0, -18.0, -35.0])
    prop_mass, time_sim = PROP_MASS_INIT, 0.0
    t_list, p_list, v_list, th_list, m_list, ph_list = [], [], [], [], [], []

    while time_sim < MAX_TIME:
        c_mass, z, vz = DRY_MASS + prop_mass, pos[2], vel[2]
        if z <= 0.0:
            pos[2] = 0.0; t_list.append(time_sim); p_list.append(pos.copy()); v_list.append(vel.copy())
            th_list.append(0.0); m_list.append(prop_mass); ph_list.append("TOUCHDOWN CONFIRMED")
            break
        
        c_phase = "PDI BRAKING PHASE" if z > 750.0 else ("TERMINAL APPROACH" if z > 90.0 else "FINAL HOVER GATE")
        acc_z = 2.0 * (-np.clip(np.sqrt(max(0.1, 2.0 * 0.8 * z)), 1.0, 40.0) - vz) + G_MOON
        dx, dy = target_coords[0] - pos[0], target_coords[1] - pos[1]
        gp, gd = (0.08, 0.7) if np.linalg.norm([dx, dy]) < 500 else (0.04, 0.5)
        
        acc_cmd = np.array([gp * dx - gd * vel[0], gp * dy - gd * vel[1], acc_z])
        t_mag = np.linalg.norm(c_mass * acc_cmd)
        t_mag_clamp = np.clip(t_mag, MIN_THRUST, MAX_THRUST)
        t_vec = (c_mass * acc_cmd / t_mag) * t_mag_clamp if t_mag > 0 else np.zeros(3)

        if prop_mass > 0: prop_mass = max(0.0, prop_mass - (t_mag_clamp / (ISP * G0)) * DT)
        else: t_vec = np.zeros(3)

        vel += ((t_vec / c_mass) - np.array([0.0, 0.0, G_MOON])) * DT
        pos += vel * DT; time_sim += DT

        t_list.append(time_sim); p_list.append(pos.copy()); v_list.append(vel.copy())
        th_list.append(t_mag_clamp); m_list.append(prop_mass); ph_list.append(c_phase)

    return np.array(t_list), np.array(p_list), np.array(v_list), np.array(th_list), np.array(m_list), ph_list

# =====================================================================
# 2. WIDGET KOKPIT KUSTOM (QPAINTER GPU ACCELERATED)
# =====================================================================
class PFDWidget(QWidget):
    def paintEvent(self, event):
        app = self.window()
        if not hasattr(app, 'pos_arr') or len(app.pos_arr) == 0: return
        idx = app.current_frame
        p_val, v_val = app.pos_arr[idx], app.vel_arr[idx]
        
        painter = QPainter(self)
        painter.setRenderHint(QPainter.RenderHint.Antialiasing)
        w, h = self.width(), self.height()
        painter.fillRect(0, 0, w, h, PANEL_BG); painter.setPen(QPen(GRAY, 2)); painter.drawRect(0, 0, w, h)
        
        painter.setPen(BLUE); painter.setFont(QFont("Monospace", 10, QFont.Weight.Bold))
        painter.drawText(QRectF(0, 5, w, 20), Qt.AlignmentFlag.AlignCenter, "ATTITUDE DIRECTOR (PFD)")
        
        cx, cy, bw, bh = w/2, h/2, 180, 240
        bx, by = cx - bw/2, cy - bh/2
        painter.fillRect(int(bx), int(by), bw, bh, QColor(10, 15, 25))
        painter.setPen(QPen(BLUE, 1)); painter.drawRect(int(bx), int(by), bw, bh)
        
        pitch, roll = np.clip(-v_val[0]*0.45, -25.0, 25.0), np.clip(v_val[1]*0.45, -25.0, 25.0)
        
        painter.setClipRect(int(bx), int(by), bw, bh)
        painter.translate(cx, cy + pitch * 3.5); painter.rotate(roll)
        painter.setPen(QPen(WHITE, 2)); painter.drawLine(-120, 0, 120, 0)
        painter.setPen(QPen(GRAY, 1))
        for off in [-30, -15, 15, 30]: py = off * 2.5; painter.drawLine(-30, int(py), 30, int(py))
        painter.rotate(-roll); painter.translate(-cx, -(cy + pitch * 3.5))
        painter.setClipping(False)
        
        painter.setPen(QPen(YELLOW, 3))
        painter.drawLine(int(cx-20), int(cy), int(cx-5), int(cy)); painter.drawLine(int(cx+5), int(cy), int(cx+20), int(cy))
        painter.drawLine(int(cx), int(cy+5), int(cx), int(cy+15))
        
        painter.setPen(WHITE); painter.setFont(QFont("Monospace", 9))
        painter.drawText(QRectF(0, by+bh+10, w, 20), Qt.AlignmentFlag.AlignCenter, f"PITCH: {pitch:+.1f}° | ROLL: {roll:+.1f}°")
        
        alt_norm = np.clip(p_val[2] / 1500.0, 0.0, 1.0); alt_h = int(alt_norm * bh)
        painter.fillRect(int(bx+bw+10), int(by+bh-alt_h), 20, alt_h, BLUE)
        painter.setPen(WHITE); painter.drawText(QRectF(bx+bw-10, by-35, 60, 30), Qt.AlignmentFlag.AlignCenter, f"ALT\n{p_val[2]:.0f}m")
        
        vz_norm = np.clip(abs(v_val[2]) / 40.0, 0.0, 1.0); vz_h = int(vz_norm * (bh/2))
        v_col = GREEN if abs(v_val[2]) <= 2.0 else RED
        y_pos = int(cy - vz_h) if v_val[2] < 0 else int(cy)
        painter.fillRect(int(bx-30), y_pos, 20, vz_h, v_col)
        painter.setPen(v_col); painter.drawText(QRectF(bx-50, by-35, 60, 30), Qt.AlignmentFlag.AlignCenter, f"VSI\n{v_val[2]:.1f}")

class RadarWidget(QWidget):
    def paintEvent(self, event):
        app = self.window()
        if not hasattr(app, 'pos_arr') or len(app.pos_arr) == 0: return
        idx, t_pos = app.current_frame, SITES[app.active_key]["pos"]
        p_val, v_val = app.pos_arr[idx], app.vel_arr[idx]
        
        painter = QPainter(self); painter.setRenderHint(QPainter.RenderHint.Antialiasing)
        w, h = self.width(), self.height(); cx, cy = w/2, h/2
        painter.fillRect(0, 0, w, h, PANEL_BG); painter.setPen(QPen(GRAY, 2)); painter.drawRect(0, 0, w, h)
        
        painter.setPen(BLUE); painter.setFont(QFont("Monospace", 10, QFont.Weight.Bold))
        painter.drawText(QRectF(0, 5, w, 20), Qt.AlignmentFlag.AlignCenter, f"HORIZONTAL RADAR ({SITES[app.active_key]['short']})")
        
        # =================================================================
        # FITUR AUTO-ZOOM BERDASARKAN ALTITUDE (KETINGGIAN)
        # =================================================================
        alt = p_val[2]
        if alt > 200:
            rings = [200, 400, 600, 800]; sc = 0.2; r_txt = "RADAR RANGE: 800m"
        elif alt > 30:
            rings = [25, 50, 75, 100]; sc = 1.6; r_txt = "RADAR RANGE: 100m"
        else:
            rings = [5, 10, 15, 20]; sc = 8.0; r_txt = "RADAR RANGE: 20m"

        painter.setPen(YELLOW); painter.setFont(QFont("Monospace", 9, QFont.Weight.Bold))
        painter.drawText(QRectF(15, 25, 200, 20), Qt.AlignmentFlag.AlignLeft, r_txt)

        # Kliping agar garis radar dan lintasan tidak bocor keluar dari kotak
        painter.setClipRect(10, 30, int(w-20), int(h-60))

        painter.setPen(QPen(GRAY, 1, Qt.PenStyle.DashLine))
        for r in rings: 
            px_r = r * sc
            painter.drawEllipse(QPointF(cx, cy), px_r, px_r)
            painter.drawText(QRectF(cx+5, cy-px_r-15, 50, 20), Qt.AlignmentFlag.AlignLeft, f"{r}m")
        
        painter.drawLine(int(cx-300), int(cy), int(cx+300), int(cy)); painter.drawLine(int(cx), int(cy-300), int(cx), int(cy+300))
        
        t_col = SITES[app.active_key]["color"]
        painter.setPen(QPen(t_col, 2)); painter.drawEllipse(QPointF(cx, cy), 8, 8)
        
        poly = QPolygonF([QPointF(cx + (app.pos_arr[i,0]-t_pos[0])*sc, cy - (app.pos_arr[i,1]-t_pos[1])*sc) for i in range(0, idx+1, 2)])
        painter.setPen(QPen(CYAN, 2)); painter.drawPolyline(poly)
        
        lx, ly = cx + (p_val[0]-t_pos[0])*sc, cy - (p_val[1]-t_pos[1])*sc
        painter.setBrush(QBrush(YELLOW)); painter.setPen(Qt.PenStyle.NoPen); painter.drawEllipse(QPointF(lx, ly), 5, 5)
        painter.setPen(QPen(YELLOW, 2)); painter.drawLine(int(lx), int(ly), int(lx + v_val[0]*sc*3), int(ly - v_val[1]*sc*3))
        
        painter.setClipping(False) # Matikan kliping untuk menggambar teks di bawah

        painter.setPen(WHITE); painter.setFont(QFont("Monospace", 9))
        dist = math.hypot(p_val[0]-t_pos[0], p_val[1]-t_pos[1]); drift = math.hypot(v_val[0], v_val[1])
        # Altitude Z ditambahkan langsung ke layar Radar agar terlihat terintegrasi penuh
        painter.drawText(QRectF(0, h-25, w, 20), Qt.AlignmentFlag.AlignCenter, f"DIST (X-Y): {dist:.1f}m | DRIFT: {drift:.1f}m/s | ALT (Z): {alt:.1f}m")

class EngineWidget(QWidget):
    def paintEvent(self, event):
        app = self.window()
        if not hasattr(app, 'pos_arr') or len(app.pos_arr) == 0: return
        idx = app.current_frame
        th_val, m_val, ph_val, v_val = app.thrust_arr[idx], app.mass_arr[idx], app.phase_hist[idx], app.vel_arr[idx]
        
        painter = QPainter(self); painter.setRenderHint(QPainter.RenderHint.Antialiasing)
        w, h = self.width(), self.height(); cx = w/2
        painter.fillRect(0, 0, w, h, PANEL_BG); painter.setPen(QPen(GRAY, 2)); painter.drawRect(0, 0, w, h)
        
        painter.setPen(BLUE); painter.setFont(QFont("Monospace", 10, QFont.Weight.Bold))
        painter.drawText(QRectF(0, 5, w, 20), Qt.AlignmentFlag.AlignCenter, "PROPULSION & AVIONICS")
        
        bw, bh = 40, 240; bx1, bx2 = cx - 70, cx + 30; by = h/2 - bh/2
        
        tp = th_val / MAX_THRUST; th = int(tp * bh)
        painter.fillRect(int(bx1), int(by+bh-th), bw, th, BLUE)
        painter.setPen(QPen(GRAY, 2)); painter.drawRect(int(bx1), int(by), bw, bh)
        painter.setPen(BLUE); painter.setFont(QFont("Monospace", 8))
        painter.drawText(QRectF(bx1-15, by-35, 70, 30), Qt.AlignmentFlag.AlignCenter, f"THROTTLE\n{tp*100:.0f}%")
        
        fp = m_val / PROP_MASS_INIT; fh = int(fp * bh)
        fc = GREEN if fp > 0.3 else (YELLOW if fp > 0.15 else RED)
        painter.fillRect(int(bx2), int(by+bh-fh), bw, fh, fc)
        painter.setPen(QPen(GRAY, 2)); painter.drawRect(int(bx2), int(by), bw, bh)
        painter.setPen(fc)
        painter.drawText(QRectF(bx2-15, by-35, 70, 30), Qt.AlignmentFlag.AlignCenter, f"FUEL\n{fp*100:.1f}%")
        
        ph_col = GREEN if "TOUCHDOWN" in ph_val and np.linalg.norm(v_val)<=2.0 else (RED if "TOUCHDOWN" in ph_val else YELLOW)
        painter.setPen(ph_col); painter.setFont(QFont("Monospace", 10, QFont.Weight.Bold))
        painter.drawText(QRectF(0, by+bh+15, w, 30), Qt.AlignmentFlag.AlignCenter, ph_val)

# =====================================================================
# 3. MAIN WINDOW (PYQTGRAPH 2D SOLID PLOTS)
# =====================================================================
class SpaceAppsDashboard(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("CLPS LUNAR AUTONOMOUS GNC - PyQtGraph Dashboard")
        self.resize(1280, 720)
        self.setStyleSheet(f"background-color: {PANEL_BG.name()}; color: {WHITE.name()}; font-family: Monospace;")
        
        pg.setConfigOption('background', PANEL_BG.name())
        pg.setConfigOption('foreground', WHITE.name())
        
        self.active_key = "ALPHA"
        self.t_arr, self.pos_arr, self.vel_arr, self.thrust_arr, self.mass_arr, self.phase_hist = run_gnc_simulation(SITES[self.active_key]["pos"])
        self.num_frames = len(self.t_arr)
        self.current_frame = 0
        self.is_playing = True
        
        main_w = QWidget()
        self.setCentralWidget(main_w)
        layout = QVBoxLayout(main_w)
        
        # Header
        self.lbl_title = QLabel("CLPS LUNAR AUTONOMOUS GNC - DASHBOARD")
        self.lbl_title.setStyleSheet("font-size: 20px; font-weight: bold; color: #00f0ff;")
        self.lbl_title.setAlignment(Qt.AlignmentFlag.AlignCenter)
        self.lbl_sub = QLabel(f"Target: {SITES[self.active_key]['name']} | Guidance: Closed-Loop Vectoring")
        self.lbl_sub.setStyleSheet("font-size: 12px; color: #64748b;")
        self.lbl_sub.setAlignment(Qt.AlignmentFlag.AlignCenter)
        layout.addWidget(self.lbl_title); layout.addWidget(self.lbl_sub)
        
        # Site Buttons
        h_sites = QHBoxLayout()
        self.btn_sites = {}
        for k in SITES.keys():
            b = QPushButton(f"TARGET {k}")
            b.setStyleSheet("padding: 8px; background-color: #1e293b; color: white; font-weight: bold; border: 1px solid #38bdf8;")
            b.clicked.connect(lambda checked, s=k: self.change_site(s))
            self.btn_sites[k] = b; h_sites.addWidget(b)
        self.btn_sites[self.active_key].setStyleSheet("padding: 8px; background-color: #0284c7; color: white; font-weight: bold; border: 2px solid #00f0ff;")
        layout.addLayout(h_sites)
        
        self.stack = QStackedWidget()
        layout.addWidget(self.stack, stretch=1)
        
        # View 1: Cockpit
        w_cockpit = QWidget()
        lay_cockpit = QHBoxLayout(w_cockpit)
        self.pfd = PFDWidget(); self.radar = RadarWidget(); self.engine = EngineWidget()
        lay_cockpit.addWidget(self.pfd); lay_cockpit.addWidget(self.radar); lay_cockpit.addWidget(self.engine)
        self.stack.addWidget(w_cockpit)
        
        # View 2: Telemetry Plots (3 Grafik 2D Solid)
        w_telem = QWidget()
        lay_telem = QHBoxLayout(w_telem)
        
        # Plot 1: Trajectory Profile (X vs Z)
        self.p_traj = pg.PlotWidget(title="Profil Trajektori (Jarak vs Elevasi)")
        self.p_traj.showGrid(x=True, y=True, alpha=0.3); self.p_traj.addLegend()
        self.p_traj.setLabel('left', 'Elevasi Z (m)'); self.p_traj.setLabel('bottom', 'Jarak X (m)')
        self.c_traj = self.p_traj.plot(pen=pg.mkPen(CYAN.name(), width=2), name="Lintasan Wahana")
        self.pt_cur_traj = pg.ScatterPlotItem(size=10, pen=pg.mkPen(None), brush=pg.mkBrush(YELLOW.name()), name="Posisi Saat Ini")
        self.p_traj.addItem(self.pt_cur_traj)
        self.pt_targ_traj = pg.ScatterPlotItem(pos=[[SITES[self.active_key]["pos"][0], SITES[self.active_key]["pos"][2]]], size=12, pen=pg.mkPen(None), brush=pg.mkBrush(RED.name()), name="Titik Target")
        self.p_traj.addItem(self.pt_targ_traj)
        lay_telem.addWidget(self.p_traj)
        
        # Plot 2: Altitude & Velocity
        self.p_alt = pg.PlotWidget(title="Profil Elevasi & Kecepatan")
        self.p_alt.showGrid(x=True, y=True, alpha=0.3); self.p_alt.addLegend()
        self.p_alt.setLabel('left', 'Nilai (m, m/s)'); self.p_alt.setLabel('bottom', 'Waktu (s)')
        self.c_alt = self.p_alt.plot(pen=pg.mkPen(BLUE.name(), width=2), name="Altitude (m)")
        self.c_vel = self.p_alt.plot(pen=pg.mkPen(RED.name(), width=2, style=Qt.PenStyle.DashLine), name="|Vz| (m/s)")
        self.v_line_alt = pg.InfiniteLine(angle=90, movable=False, pen=pg.mkPen(YELLOW.name(), width=2)); self.p_alt.addItem(self.v_line_alt)
        lay_telem.addWidget(self.p_alt)
        
        # Plot 3: Thrust
        self.p_th = pg.PlotWidget(title="Modulasi Gaya Dorong")
        self.p_th.showGrid(x=True, y=True, alpha=0.3); self.p_th.addLegend()
        self.p_th.setLabel('left', 'Thrust (N)'); self.p_th.setLabel('bottom', 'Waktu (s)')
        self.c_th = self.p_th.plot(pen=pg.mkPen(GREEN.name(), width=2), name="Thrust (N)")
        self.v_line_th = pg.InfiniteLine(angle=90, movable=False, pen=pg.mkPen(YELLOW.name(), width=2)); self.p_th.addItem(self.v_line_th)
        lay_telem.addWidget(self.p_th)
        self.stack.addWidget(w_telem)
        
        # Bottom Controls
        h_ctrl = QHBoxLayout()
        self.btn_play = QPushButton("⏸ PAUSE")
        self.btn_play.setStyleSheet("padding: 8px; background-color: #1e293b; color: white; border: 1px solid white;")
        self.btn_play.clicked.connect(self.toggle_play)
        h_ctrl.addWidget(self.btn_play)
        
        self.slider = QSlider(Qt.Orientation.Horizontal)
        self.slider.setRange(0, self.num_frames - 1)
        self.slider.valueChanged.connect(self.slider_moved)
        h_ctrl.addWidget(self.slider)
        
        self.btn_mode = QPushButton("MODE: TELEMETRI")
        self.btn_mode.setStyleSheet("padding: 8px; background-color: #38bdf8; color: black; font-weight: bold;")
        self.btn_mode.clicked.connect(self.toggle_mode)
        h_ctrl.addWidget(self.btn_mode)
        layout.addLayout(h_ctrl)
        
        self.timer = QTimer(); self.timer.timeout.connect(self.update_frame); self.timer.start(50)
        self.update_plots()

    def change_site(self, key):
        self.active_key = key
        for k, b in self.btn_sites.items(): b.setStyleSheet("padding: 8px; background-color: #1e293b; color: white; font-weight: bold; border: 1px solid #38bdf8;")
        self.btn_sites[key].setStyleSheet("padding: 8px; background-color: #0284c7; color: white; font-weight: bold; border: 2px solid #00f0ff;")
        self.lbl_sub.setText(f"Target: {SITES[key]['name']} | Guidance: Closed-Loop Vectoring")
        
        self.t_arr, self.pos_arr, self.vel_arr, self.thrust_arr, self.mass_arr, self.phase_hist = run_gnc_simulation(SITES[key]["pos"])
        self.num_frames = len(self.t_arr); self.slider.setRange(0, self.num_frames - 1)
        self.current_frame = 0
        self.pt_targ_traj.setData(pos=np.array([[SITES[key]["pos"][0], SITES[key]["pos"][2]]]))
        self.update_plots(); self.update_cockpit()

    def toggle_mode(self):
        idx = (self.stack.currentIndex() + 1) % 2
        self.stack.setCurrentIndex(idx)
        self.btn_mode.setText("MODE: COCKPIT" if idx == 1 else "MODE: TELEMETRI")
        self.update_plots()
        self.update_cockpit()

    def toggle_play(self):
        self.is_playing = not self.is_playing
        self.btn_play.setText("⏸ PAUSE" if self.is_playing else "▶ PLAY")

    def slider_moved(self, val):
        self.current_frame = val
        if self.stack.currentIndex() == 0:
            self.update_cockpit()
        else:
            self.update_plots()

    def update_frame(self):
        if self.is_playing and self.current_frame < self.num_frames - 1:
            self.current_frame += 1
            self.slider.blockSignals(True); self.slider.setValue(self.current_frame); self.slider.blockSignals(False)
            if self.stack.currentIndex() == 0: self.update_cockpit()
            else: self.update_plots()
        elif self.current_frame >= self.num_frames - 1 and self.is_playing:
            self.is_playing = False; self.btn_play.setText("▶ PLAY")

    def update_cockpit(self):
        self.pfd.update(); self.radar.update(); self.engine.update()

    def update_plots(self):
        idx = self.current_frame
        self.c_traj.setData(self.pos_arr[:idx+1, 0], self.pos_arr[:idx+1, 2])
        self.pt_cur_traj.setData(pos=np.array([[self.pos_arr[idx, 0], self.pos_arr[idx, 2]]]))
        
        self.c_alt.setData(self.t_arr[:idx+1], self.pos_arr[:idx+1, 2])
        self.c_vel.setData(self.t_arr[:idx+1], np.abs(self.vel_arr[:idx+1, 2]))
        self.v_line_alt.setValue(self.t_arr[idx])
        
        self.c_th.setData(self.t_arr[:idx+1], self.thrust_arr[:idx+1])
        self.v_line_th.setValue(self.t_arr[idx])

if __name__ == '__main__':
    app = QApplication(sys.argv)
    window = SpaceAppsDashboard(); window.show()
    sys.exit(app.exec())