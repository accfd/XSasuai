import os
import glob
import sys
import math
import random
import pygame
import numpy as np
from PIL import Image

# =====================================================================
# 1. INISIALISASI ENGINE GRAFIS & DISPLAY
# =====================================================================
pygame.init()
WIDTH, HEIGHT = 1040, 720
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("NASA Space Apps - Apollo 11 Architecture (CSM Columbia & LM Eagle)")
clock = pygame.time.Clock()

SPACE_BLACK   = (4, 6, 10)
WHITE         = (245, 245, 245)
LUNAR_GRID    = (60, 65, 78)
LUNAR_RIDGE   = (125, 130, 145)
PAD_GREEN     = (46, 204, 113)
WARNING_RED   = (231, 76, 60)
HUD_CYAN      = (52, 152, 219)
GOLD_FOIL     = (218, 165, 32)
CSM_SILVER    = (195, 205, 220)
ORANGE_FIRE   = (255, 140, 0)

font_large = pygame.font.SysFont("monospace", 20, bold=True)
font_med   = pygame.font.SysFont("monospace", 12, bold=True)
font_small = pygame.font.SysFont("monospace", 11)

# =====================================================================
# 2. SINKRONISASI KOORDINAT 3 SITUS PENDARATAN HASIL MCDA
# =====================================================================
SITES = {
    "ALPHA": {
        "name": "Site Alpha (Mons Mouton Base)",
        "pos": np.array([0.0, 0.0, 0.0]),
        "color": (46, 204, 113),
        "desc": "Elev: 5922m | Slope: 0.08° | LOS: 100%"
    },
    "BETA": {
        "name": "Site Beta (Plateau North)",
        "pos": np.array([600.0, 400.0, 0.0]), 
        "color": (0, 229, 255),
        "desc": "Elev: 6000m | Slope: 0.06° | LOS: 100%"
    },
    "GAMMA": {
        "name": "Site Gamma (Ridge West)",
        "pos": np.array([-500.0, -800.0, 0.0]), 
        "color": (241, 196, 15),
        "desc": "Elev: 5875m | Slope: 0.17° | LOS: 100%"
    }
}
active_site_key = "ALPHA"

# =====================================================================
# 3. GENERASI MEDAN TOPOGRAFI 3D (VERSI OPTIMASI RINGAN)
# =====================================================================
dem_candidates = glob.glob("data/**/*.png", recursive=True)
dem_path = None
for f in dem_candidates:
    fname = os.path.basename(f).lower()
    if "illum" not in fname and not fname.endswith(".vrt"):
        dem_path = f
        break

GRID_SIZE = 18           # OPTIMASI: Diturunkan ke 18 agar CPU ringan
TERRAIN_SPAN = 2500.0    
PAD_RADIUS = 55.0

terrain_verts = np.zeros((GRID_SIZE, GRID_SIZE, 3), dtype=np.float32)
xs = np.linspace(-TERRAIN_SPAN / 2, TERRAIN_SPAN / 2, GRID_SIZE)
ys = np.linspace(-TERRAIN_SPAN / 2, TERRAIN_SPAN / 2, GRID_SIZE)

if dem_path and os.path.exists(dem_path):
    try:
        raw_dem = Image.open(dem_path).convert("L")
        raw_dem = raw_dem.resize((GRID_SIZE, GRID_SIZE))
        dem_arr = np.array(raw_dem, dtype=np.float32)
        dem_norm = (dem_arr - np.min(dem_arr)) / (np.ptp(dem_arr) + 1e-5)
        raw_z = (dem_norm - 0.5) * 120.0 
    except Exception:
        raw_z = np.zeros((GRID_SIZE, GRID_SIZE), dtype=np.float32)
else:
    raw_z = np.zeros((GRID_SIZE, GRID_SIZE), dtype=np.float32)

for i in range(GRID_SIZE):
    for j in range(GRID_SIZE):
        x, y = xs[i], ys[j]
        min_dist_pad = min(math.hypot(x - s["pos"][0], y - s["pos"][1]) for s in SITES.values())
        if min_dist_pad < PAD_RADIUS:
            z = 0.0
        elif min_dist_pad < PAD_RADIUS + 60.0:
            z = raw_z[i, j] * ((min_dist_pad - PAD_RADIUS) / 60.0)
        else:
            z = raw_z[i, j]
        terrain_verts[i, j] = [x, y, z]

stars_3d = []
for _ in range(40):      # OPTIMASI: Bintang dikurangi jadi 40
    theta = random.uniform(0, 2 * math.pi)
    phi = random.uniform(0.1, math.pi / 2)
    r = 3500.0
    stars_3d.append(np.array([
        r * math.sin(phi) * math.cos(theta),
        r * math.sin(phi) * math.sin(theta),
        r * math.cos(phi)
    ]))

# =====================================================================
# 4. ENGINE PROYEKSI PERSPEKTIF KAMERA 3D
# =====================================================================
FOV = 600.0 

def project_3d(pt, cam_pos, cam_target):
    f = cam_target - cam_pos
    f_norm = np.linalg.norm(f)
    if f_norm < 1e-4:
        f = np.array([0.0, 1.0, 0.0])
    else:
        f = f / f_norm

    up_ref = np.array([0.0, 0.0, 1.0])
    r = np.cross(f, up_ref)
    r_norm = np.linalg.norm(r)
    if r_norm < 1e-4:
        r = np.array([1.0, 0.0, 0.0])
    else:
        r = r / r_norm
    u = np.cross(r, f)

    v = pt - cam_pos
    z_cam = np.dot(v, f)
    if z_cam <= 2.0: 
        return None

    x_cam = np.dot(v, r)
    y_cam = np.dot(v, u)

    sx = int((x_cam / z_cam) * FOV + WIDTH / 2)
    sy = int((-y_cam / z_cam) * FOV + HEIGHT / 2)
    return (sx, sy, z_cam)

# =====================================================================
# 5. APOLLO CSM "COLUMBIA" 
# =====================================================================
class CSM_Columbia:
    def __init__(self):
        self.reset()

    def reset(self):
        self.orbit_angle = -math.pi * 0.75
        self.orbit_radius = 800.0 
        self.orbit_speed = 0.003
        self.altitude = 650.0
        self.pos = np.array([
            self.orbit_radius * math.cos(self.orbit_angle),
            self.orbit_radius * math.sin(self.orbit_angle),
            self.altitude
        ], dtype=np.float64)
        self.yaw = 0.0

    def update_orbit(self):
        self.orbit_angle += self.orbit_speed
        self.pos[0] = self.orbit_radius * math.cos(self.orbit_angle)
        self.pos[1] = self.orbit_radius * math.sin(self.orbit_angle)
        self.pos[2] = self.altitude
        self.yaw = math.degrees(math.atan2(-math.sin(self.orbit_angle), math.cos(self.orbit_angle)))

    def draw(self, surface, cam_pos, cam_target):
        rad_y = math.radians(self.yaw)
        Rz = np.array([[math.cos(rad_y), -math.sin(rad_y), 0],
                       [math.sin(rad_y),  math.cos(rad_y), 0],
                       [0, 0, 1]])

        angles = np.linspace(0, 2 * math.pi, 8)[:-1]
        r_sm = 6.8
        l_sm = 18.0
        front_sm = [np.array([r_sm * math.cos(a), r_sm * math.sin(a), 0.0]) for a in angles]
        rear_sm  = [np.array([r_sm * math.cos(a), r_sm * math.sin(a), -l_sm]) for a in angles]
        cm_apex = np.array([0.0, 0.0, 9.5])
        r_noz = 3.8
        noz_pts = [np.array([r_noz * math.cos(a), r_noz * math.sin(a), -l_sm - 6.0]) for a in angles]

        p_front = [project_3d(self.pos + np.dot(Rz, pt), cam_pos, cam_target) for pt in front_sm]
        p_rear  = [project_3d(self.pos + np.dot(Rz, pt), cam_pos, cam_target) for pt in rear_sm]
        p_apex  = project_3d(self.pos + np.dot(Rz, cm_apex), cam_pos, cam_target)
        p_noz   = [project_3d(self.pos + np.dot(Rz, pt), cam_pos, cam_target) for pt in noz_pts]

        n = len(angles)
        for i in range(n):
            if p_front[i] and p_front[(i + 1) % n]:
                pygame.draw.line(surface, CSM_SILVER, (p_front[i][0], p_front[i][1]), (p_front[(i+1)%n][0], p_front[(i+1)%n][1]), 2)
            if p_rear[i] and p_rear[(i + 1) % n]:
                pygame.draw.line(surface, (140, 150, 170), (p_rear[i][0], p_rear[i][1]), (p_rear[(i+1)%n][0], p_rear[(i+1)%n][1]), 2)
            if p_front[i] and p_rear[i]:
                pygame.draw.line(surface, CSM_SILVER, (p_front[i][0], p_front[i][1]), (p_rear[i][0], p_rear[i][1]), 2)
            if p_apex and p_front[i]:
                pygame.draw.line(surface, (230, 235, 245), (p_apex[0], p_apex[1]), (p_front[i][0], p_front[i][1]), 2)
            if p_rear[i] and p_noz[i]:
                pygame.draw.line(surface, (100, 105, 120), (p_rear[i][0], p_rear[i][1]), (p_noz[i][0], p_noz[i][1]), 1)

# =====================================================================
# 6. APOLLO LUNAR MODULE (LM "EAGLE")
# =====================================================================
class LM_Eagle:
    def __init__(self):
        self.reset()

    def reset(self, initial_pos=None):
        if initial_pos is not None:
            self.pos = initial_pos.copy()
        else:
            self.pos = np.array([-400.0, -400.0, 650.0], dtype=np.float64)

        self.vel = np.array([0.0, 0.0, 0.0], dtype=np.float64)
        self.pitch = 0.0
        self.roll = 0.0
        self.fuel = 100.0
        self.state = "DOCKED"
        self.autopilot = True
        self.status_msg = ""
        self.particles = []

    def execute_gnc_autopilot(self, target_coord):
        dx = target_coord[0] - self.pos[0]
        dy = target_coord[1] - self.pos[1]
        z = self.pos[2]
        dist_h = math.hypot(dx, dy)
        g_moon = 0.075

        target_vx = np.clip(dx * 0.025, -6.5, 6.5)
        target_vy = np.clip(dy * 0.025, -6.5, 6.5)

        cmd_ax = 1.10 * (target_vx - self.vel[0])
        cmd_ay = 1.10 * (target_vy - self.vel[1])

        if z < 35.0 and dist_h > 2.0:
            target_z = 22.0
            target_vz = np.clip((target_z - z) * 0.12, -0.35, 0.35)
        elif dist_h > 45.0:
            target_z = 200.0
            target_vz = np.clip((target_z - z) * 0.025, -2.5, 1.2)
        else:
            if z > 80.0:
                target_vz = -2.0
            elif z > 20.0:
                target_vz = -0.80
            else:
                target_vz = -0.25

        cmd_az = 1.45 * (target_vz - self.vel[2]) + g_moon
        vertical_thrust = max(0.0, cmd_az)

        if z > 8.0:
            target_roll = np.clip(np.degrees(math.atan2(cmd_ax, max(vertical_thrust, 0.04))), -25.0, 25.0)
            target_pitch = np.clip(np.degrees(math.atan2(-cmd_ay, max(vertical_thrust, 0.04))), -25.0, 25.0)
        else:
            target_roll = 0.0
            target_pitch = 0.0

        self.roll += np.clip(target_roll - self.roll, -2.5, 2.5)
        self.pitch += np.clip(target_pitch - self.pitch, -2.5, 2.5)
        self.fuel = max(0.0, self.fuel - 0.008)

        if vertical_thrust > 0.01 and self.fuel > 0.0:
            pwr = np.clip(vertical_thrust, 0.02, 0.28)
            self.apply_thrust(power=pwr)

    def apply_thrust(self, power=0.16):
        rad_p = math.radians(self.pitch)
        rad_r = math.radians(self.roll)

        tx = math.sin(rad_r) * power
        ty = -math.sin(rad_p) * power
        tz = math.cos(rad_r) * math.cos(rad_p) * power

        self.vel += np.array([tx, ty, tz])
        self.fuel = max(0.0, self.fuel - 0.025)

        p_offset = self.pos + np.array([0.0, 0.0, -4.2])
        # OPTIMASI: Batasi maksimal 30 partikel agar rendering GPU/CPU ringan
        if len(self.particles) < 30:
            for _ in range(2):
                p_vel = np.array([
                    -tx * 5.0 + random.uniform(-0.4, 0.4),
                    -ty * 5.0 + random.uniform(-0.4, 0.4),
                    -tz * 9.0 + random.uniform(-0.4, 0.4)
                ])
                self.particles.append([p_offset.copy(), p_vel, random.randint(4, 8)])

    def update(self, keys, target_coord):
        if self.state != "FLYING": return

        g_moon = 0.075

        if self.autopilot:
            self.execute_gnc_autopilot(target_coord)
        else:
            if keys[pygame.K_LEFT]:  self.roll = max(-30.0, self.roll - 2.0)
            if keys[pygame.K_RIGHT]: self.roll = min(30.0, self.roll + 2.0)
            if keys[pygame.K_UP]:    self.pitch = max(-30.0, self.pitch - 2.0)
            if keys[pygame.K_DOWN]:  self.pitch = min(30.0, self.pitch + 2.0)
            if keys[pygame.K_SPACE] and self.fuel > 0: self.apply_thrust(power=0.18)

        self.vel[2] -= g_moon
        self.pos += self.vel

        for p in self.particles:
            p[0] += p[1]
            p[2] -= 1
        self.particles = [p for p in self.particles if p[2] > 0]

        self.check_collision(target_coord)

    def check_collision(self, target_coord):
        dist_to_target = math.hypot(self.pos[0] - target_coord[0], self.pos[1] - target_coord[1])
        ground_z = 0.0 if dist_to_target <= PAD_RADIUS else 12.0

        if self.pos[2] <= ground_z:
            self.pos[2] = ground_z
            v_total = np.linalg.norm(self.vel) * 2.5
            tilt = math.hypot(self.roll, self.pitch)

            if dist_to_target <= PAD_RADIUS:
                if v_total <= 2.5 and tilt <= 12.0:
                    self.state = "SUCCESS"
                    self.status_msg = f"CONTACT LIGHT! HOUSTON, EAGLE HAS LANDED! (V={v_total:.2f} m/s | Dev={dist_to_target:.1f}m)"
                else:
                    self.state = "CRASHED"
                    if v_total > 2.5: self.status_msg = f"HARD IMPACT! Touchdown={v_total:.2f} m/s (>2.5)"
                    else: self.status_msg = f"LM EAGLE TERGULING! Inklinasi={tilt:.1f}° (>12°)"
            else:
                self.state = "CRASHED"
                self.status_msg = f"CRASH! Mendarat di luar zona aman helipad ({dist_to_target:.1f} m)"

    def draw(self, surface, cam_pos, cam_target):
        for p in self.particles:
            proj = project_3d(p[0], cam_pos, cam_target)
            if proj:
                col = random.choice([GOLD_FOIL, ORANGE_FIRE, (255, 220, 120)])
                size = max(1, int(proj[2] * 0.03 + p[2] * 0.15))
                pygame.draw.circle(surface, col, (proj[0], proj[1]), size)

        rad_p = math.radians(self.pitch)
        rad_r = math.radians(self.roll)
        Rx = np.array([[1, 0, 0], [0, math.cos(rad_r), -math.sin(rad_r)], [0, math.sin(rad_r), math.cos(rad_r)]])
        Ry = np.array([[math.cos(rad_p), 0, math.sin(rad_p)], [0, 1, 0], [-math.sin(rad_p), 0, math.cos(rad_p)]])
        R = np.dot(Ry, Rx)

        oct_angles = np.linspace(0, 2 * math.pi, 9)[:-1]
        r_oct = 5.2
        h_oct = 3.6
        d_top = [np.array([r_oct * math.cos(a), r_oct * math.sin(a), 0.0]) for a in oct_angles]
        d_bot = [np.array([r_oct * math.cos(a), r_oct * math.sin(a), -h_oct]) for a in oct_angles]

        proj_d_top = [project_3d(self.pos + np.dot(R, pt), cam_pos, cam_target) for pt in d_top]
        proj_d_bot = [project_3d(self.pos + np.dot(R, pt), cam_pos, cam_target) for pt in d_bot]

        for i in range(8):
            if proj_d_top[i] and proj_d_top[(i+1)%8]:
                pygame.draw.line(surface, GOLD_FOIL, (proj_d_top[i][0], proj_d_top[i][1]), (proj_d_top[(i+1)%8][0], proj_d_top[(i+1)%8][1]), 2)
            if proj_d_bot[i] and proj_d_bot[(i+1)%8]:
                pygame.draw.line(surface, (160, 120, 20), (proj_d_bot[i][0], proj_d_bot[i][1]), (proj_d_bot[(i+1)%8][0], proj_d_bot[(i+1)%8][1]), 2)
            if proj_d_top[i] and proj_d_bot[i]:
                pygame.draw.line(surface, GOLD_FOIL, (proj_d_top[i][0], proj_d_top[i][1]), (proj_d_bot[i][0], proj_d_bot[i][1]), 2)

        ascent_nodes = [
            [-3.5, -3.2, 0.0], [3.5, -3.2, 0.0], [3.5, 3.2, 0.0], [-3.5, 3.2, 0.0],
            [-2.6, -2.5, 5.0], [2.6, -2.5, 5.0], [2.6, 2.5, 5.0], [-2.6, 2.5, 5.0], [0.0, 0.0, 6.8]
        ]
        proj_asc = [project_3d(self.pos + np.dot(R, np.array(pt)), cam_pos, cam_target) for pt in ascent_nodes]

        edges_asc = [(0,1),(1,2),(2,3),(3,0), (4,5),(5,6),(6,7),(7,4), (0,4),(1,5),(2,6),(3,7), (4,8),(5,8),(6,8),(7,8)]
        for e1, e2 in edges_asc:
            p1, p2 = proj_asc[e1], proj_asc[e2]
            if p1 and p2: pygame.draw.line(surface, (230, 235, 245), (p1[0], p1[1]), (p2[0], p2[1]), 2)

        leg_angles = [math.pi/4, 3*math.pi/4, 5*math.pi/4, 7*math.pi/4]
        for la in leg_angles:
            hip = np.array([r_oct * math.cos(la), r_oct * math.sin(la), -h_oct * 0.5])
            foot = np.array([(r_oct + 6.0) * math.cos(la), (r_oct + 6.0) * math.sin(la), -h_oct - 4.5])
            p_hip = project_3d(self.pos + np.dot(R, hip), cam_pos, cam_target)
            p_foot = project_3d(self.pos + np.dot(R, foot), cam_pos, cam_target)
            if p_hip and p_foot:
                pygame.draw.line(surface, (200, 205, 220), (p_hip[0], p_hip[1]), (p_foot[0], p_foot[1]), 3)
                pygame.draw.circle(surface, GOLD_FOIL, (p_foot[0], p_foot[1]), 4)

# =====================================================================
# 7. MANAJER MISI UTAMA
# =====================================================================
columbia = CSM_Columbia()
eagle = LM_Eagle()

camera_modes = ["CHASE (EAGLE)", "TARGET (SURFACE)", "ORBIT (PANORAMA)"]
camera_idx = 0
running = True

def reset_mission():
    columbia.reset()
    eagle.reset(columbia.pos + np.array([0.0, 0.0, 11.5]))
    eagle.state = "DOCKED"

reset_mission()

while running:
    clock.tick(60)
    target_info = SITES[active_site_key]
    target_coord = target_info["pos"]

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_ESCAPE: running = False
            elif event.key == pygame.K_r: reset_mission()
            elif event.key == pygame.K_1: active_site_key = "ALPHA"
            elif event.key == pygame.K_2: active_site_key = "BETA"
            elif event.key == pygame.K_3: active_site_key = "GAMMA"
            elif event.key == pygame.K_c: camera_idx = (camera_idx + 1) % len(camera_modes)
            elif event.key == pygame.K_a and eagle.state == "FLYING": eagle.autopilot = not eagle.autopilot
            elif event.key == pygame.K_SPACE:
                if eagle.state == "DOCKED":
                    eagle.state = "FLYING"
                    eagle.vel = np.array([
                        (target_coord[0] - eagle.pos[0]) * 0.005,
                        (target_coord[1] - eagle.pos[1]) * 0.005,
                        -0.65
                    ])

    keys = pygame.key.get_pressed()
    columbia.update_orbit()

    if eagle.state == "DOCKED":
        eagle.pos = columbia.pos + np.array([0.0, 0.0, 11.5])
        eagle.vel = np.zeros(3)
    elif eagle.state == "FLYING":
        eagle.update(keys, target_coord)

    # Kamera 3D Dinamis
    current_cam = camera_modes[camera_idx]
    if current_cam == "CHASE (EAGLE)":
        focus_pos = eagle.pos if eagle.state != "DOCKED" else columbia.pos
        cam_offset = np.array([-115.0, -115.0, 60.0])
        cam_pos = focus_pos + cam_offset
        cam_target = focus_pos + np.array([0.0, 0.0, -15.0])
    elif current_cam == "TARGET (SURFACE)":
        cam_pos = target_coord + np.array([90.0, 90.0, 25.0])
        cam_target = eagle.pos
    elif current_cam == "ORBIT (PANORAMA)":
        cam_pos = np.array([-700.0, -700.0, 950.0])
        cam_target = target_coord

    screen.fill(SPACE_BLACK)

    for s in stars_3d:
        p_star = project_3d(s, cam_pos, cam_target)
        if p_star: pygame.draw.circle(screen, (200, 205, 220), (p_star[0], p_star[1]), 1)

    for i in range(GRID_SIZE):
        for j in range(GRID_SIZE):
            p1 = project_3d(terrain_verts[i, j], cam_pos, cam_target)
            if not p1: continue

            if i + 1 < GRID_SIZE:
                p2 = project_3d(terrain_verts[i + 1, j], cam_pos, cam_target)
                if p2:
                    col = LUNAR_RIDGE if terrain_verts[i, j][2] > 25 else LUNAR_GRID
                    pygame.draw.line(screen, col, (p1[0], p1[1]), (p2[0], p2[1]), 1)

            if j + 1 < GRID_SIZE:
                p3 = project_3d(terrain_verts[i, j + 1], cam_pos, cam_target)
                if p3:
                    col = LUNAR_RIDGE if terrain_verts[i, j][2] > 25 else LUNAR_GRID
                    pygame.draw.line(screen, col, (p1[0], p1[1]), (p3[0], p3[1]), 1)

    for s_key, s_data in SITES.items():
        center = s_data["pos"]
        pad_pts = []
        is_active = (s_key == active_site_key)

        for ang in range(0, 360, 24):
            rad = math.radians(ang)
            px = center[0] + PAD_RADIUS * math.cos(rad)
            py = center[1] + PAD_RADIUS * math.sin(rad)
            proj = project_3d(np.array([px, py, 0.0]), cam_pos, cam_target)
            if proj: pad_pts.append((proj[0], proj[1]))

        if len(pad_pts) > 2:
            fill_col = (18, 55, 35) if is_active else (25, 30, 42)
            edge_col = s_data["color"] if is_active else (80, 90, 110)
            pygame.draw.polygon(screen, fill_col, pad_pts)
            pygame.draw.lines(screen, edge_col, True, pad_pts, 3 if is_active else 1)

        cx1 = project_3d(center + np.array([-20.0, 0.0, 0.0]), cam_pos, cam_target)
        cx2 = project_3d(center + np.array([20.0, 0.0, 0.0]), cam_pos, cam_target)
        cy1 = project_3d(center + np.array([0.0, -20.0, 0.0]), cam_pos, cam_target)
        cy2 = project_3d(center + np.array([0.0, 20.0, 0.0]), cam_pos, cam_target)
        ch_col = s_data["color"] if is_active else (100, 110, 130)
        if cx1 and cx2: pygame.draw.line(screen, ch_col, (cx1[0], cx1[1]), (cx2[0], cx2[1]), 2)
        if cy1 and cy2: pygame.draw.line(screen, ch_col, (cy1[0], cy1[1]), (cy2[0], cy2[1]), 2)

        lbl_p = project_3d(center + np.array([0.0, 0.0, 16.0]), cam_pos, cam_target)
        if lbl_p:
            lbl_surf = font_small.render(f"SITE {s_key} {'[TARGET LOCK]' if is_active else ''}", True, s_data["color"])
            screen.blit(lbl_surf, lbl_surf.get_rect(center=(lbl_p[0], lbl_p[1])))

    if eagle.state in ["DOCKED", "FLYING"]:
        l_from = project_3d(eagle.pos, cam_pos, cam_target)
        l_to = project_3d(target_coord, cam_pos, cam_target)
        if l_from and l_to:
            pygame.draw.line(screen, target_info["color"], (l_from[0], l_from[1]), (l_to[0], l_to[1]), 1)

    columbia.draw(screen, cam_pos, cam_target)
    eagle.draw(screen, cam_pos, cam_target)

    p_col_txt = project_3d(columbia.pos + np.array([0.0, 0.0, 18.0]), cam_pos, cam_target)
    if p_col_txt:
        txt_csm = font_small.render("CSM COLUMBIA [IN ORBIT]", True, CSM_SILVER)
        screen.blit(txt_csm, txt_csm.get_rect(center=(p_col_txt[0], p_col_txt[1])))

    # =====================================================================
    # 8. HUD INSTRUMEN AVIONIK APOLLO 11
    # =====================================================================
    phase_bg = pygame.Surface((WIDTH - 30, 36), pygame.SRCALPHA)
    phase_bg.fill((8, 12, 22, 230))
    screen.blit(phase_bg, (15, 12))
    pygame.draw.rect(screen, HUD_CYAN, (15, 12, WIDTH - 30, 36), 1)

    if eagle.state == "DOCKED":
        blink = (pygame.time.get_ticks() // 450) % 2 == 0
        phase_str = "APOLLO 11: COLUMBIA & EAGLE IN ORBIT | TEKAN [SPASI] UNTUK UNDOCKING" if blink else "PILIH TARGET SITUS [1/2/3] | LALU TEKAN [SPASI] UNTUK MEMULAI PENDARATAN"
        phase_col = GOLD_FOIL
    elif eagle.state == "FLYING":
        phase_str = f"POWERED DESCENT (PDI) -> EAGLE MENUNJUK {target_info['name'].upper()}"
        phase_col = PAD_GREEN
    elif eagle.state == "SUCCESS":
        phase_str = "THE EAGLE HAS LANDED | PINPOINT TOUCHDOWN SUCCESS"
        phase_col = PAD_GREEN
    else:
        phase_str = "MISSION ABORT: HARD IMPACT DETECTED"
        phase_col = WARNING_RED

    txt_ph = font_med.render(phase_str, True, phase_col)
    screen.blit(txt_ph, txt_ph.get_rect(center=(WIDTH // 2, 30)))

    site_box = pygame.Surface((310, 96), pygame.SRCALPHA)
    site_box.fill((8, 12, 22, 215))
    screen.blit(site_box, (15, 56))
    pygame.draw.rect(screen, HUD_CYAN, (15, 56, 310, 96), 1)

    screen.blit(font_med.render("APOLLO 11 TARGET SITE (1/2/3):", True, WHITE), (25, 64))
    for idx_k, (k_s, v_s) in enumerate(SITES.items()):
        is_cur = (k_s == active_site_key)
        prefix = "► [*] " if is_cur else "  [ ] "
        col_s = v_s["color"] if is_cur else (140, 150, 165)
        t_site = font_small.render(f"{prefix}[{idx_k+1}] {v_s['name']}", True, col_s)
        screen.blit(t_site, (25, 86 + idx_k * 18))

    vz_ms = abs(eagle.vel[2]) * 2.5
    vh_ms = math.hypot(eagle.vel[0], eagle.vel[1]) * 2.5
    dist_xy = math.hypot(eagle.pos[0] - target_coord[0], eagle.pos[1] - target_coord[1])
    tilt_deg = math.hypot(eagle.roll, eagle.pitch)

    hud_bg = pygame.Surface((350, 220), pygame.SRCALPHA)
    hud_bg.fill((8, 12, 22, 220))
    screen.blit(hud_bg, (15, HEIGHT - 235))
    pygame.draw.rect(screen, HUD_CYAN, (15, HEIGHT - 235, 350, 220), 1)

    st_mode = "[ AUTONOMOUS GNC ]" if eagle.autopilot else "[ MANUAL AGC PILOT ]"
    st_col = PAD_GREEN if eagle.autopilot else GOLD_FOIL
    screen.blit(font_med.render(f"LM EAGLE GUIDANCE: {st_mode}", True, st_col), (25, HEIGHT - 225))

    screen.blit(font_small.render(f"TARGET   : {target_info['name']}", True, target_info["color"]), (25, HEIGHT - 202))
    screen.blit(font_small.render(f"ALTITUDE : {eagle.pos[2]:6.1f} m", True, WHITE), (25, HEIGHT - 182))

    vz_col = PAD_GREEN if vz_ms <= 2.0 else WARNING_RED
    screen.blit(font_small.render(f"DESCENT  : {vz_ms:6.2f} m/s (MAX SAFE: <2.0 m/s)", True, vz_col), (25, HEIGHT - 162))
    screen.blit(font_small.render(f"HORZ SPD : {vh_ms:6.2f} m/s", True, WHITE), (25, HEIGHT - 142))
    screen.blit(font_small.render(f"DEVIATION: {dist_xy:6.2f} m (TARGET X: <1.0 m)", True, WHITE), (25, HEIGHT - 122))
    screen.blit(font_small.render(f"ATTITUDE : {tilt_deg:6.1f}° (P:{eagle.pitch:.1f}° R:{eagle.roll:.1f}°)", True, WHITE), (25, HEIGHT - 102))

    fuel_col = PAD_GREEN if eagle.fuel > 30 else WARNING_RED
    screen.blit(font_small.render(f"DPS FUEL : {eagle.fuel:5.1f}%", True, WHITE), (25, HEIGHT - 82))
    pygame.draw.rect(screen, (50, 55, 65), (120, HEIGHT - 80, 225, 10))
    pygame.draw.rect(screen, fuel_col, (120, HEIGHT - 80, int(2.25 * eagle.fuel), 10))

    screen.blit(font_small.render("CAMERA   : " + current_cam + " (PRESS 'C')", True, HUD_CYAN), (25, HEIGHT - 58))
    screen.blit(font_small.render("COMMANDS : [SPACE] UNDOCK | [A] AUTO | [R] RESET", True, HUD_CYAN), (25, HEIGHT - 38))

    if eagle.state in ["SUCCESS", "CRASHED"]:
        res_color = PAD_GREEN if eagle.state == "SUCCESS" else WARNING_RED
        text_status = font_large.render(eagle.status_msg, True, res_color)
        text_sub = font_med.render("TEKAN 'R' UNTUK MENGULANG DARI ORBIT COLUMBIA", True, WHITE)

        banner = pygame.Surface((WIDTH, 105), pygame.SRCALPHA)
        banner.fill((6, 9, 15, 245))
        screen.blit(banner, (0, HEIGHT // 2 - 52))
        pygame.draw.line(screen, res_color, (0, HEIGHT // 2 - 52), (WIDTH, HEIGHT // 2 - 52), 2)
        pygame.draw.line(screen, res_color, (0, HEIGHT // 2 + 53), (WIDTH, HEIGHT // 2 + 53), 2)

        screen.blit(text_status, text_status.get_rect(center=(WIDTH // 2, HEIGHT // 2 - 15)))
        screen.blit(text_sub, text_sub.get_rect(center=(WIDTH // 2, HEIGHT // 2 + 22)))

    pygame.display.flip()

pygame.quit()
sys.exit()