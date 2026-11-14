# -*- coding: utf-8 -*-
"""
generate_full_synthetic_mission.py
=============================================================================
Menghasilkan Dataset Sintesis Misi Lunar Artemis III Lengkap & Terpadu:
1. Peluncuran dari Permukaan Bumi (Kennedy Space Center 28.57°N, 80.64°W, Alt 0 km).
2. Gravity Turn Ascent menembus atmosfer hingga Circular Parking Orbit LEO (185 km).
3. 1.5 Putaran Orbit Mengitari Bumi (LEO Parking Orbit, T = 88.2 min).
4. Trans-Lunar Injection (TLI Burn, V = 10.95 km/s).
5. Translunar Coast Phase (384.400 km).
6. Lunar Orbit Insertion (LOI-1) & 2 Putaran Orbit Penuh Mengitari Bulan:
   - Orbit 1: Orbit Lingkaran Polar 100 km x 100 km survei medan.
   - Orbit 2: Orbit Elips Penurunan Perilune 100 km x 15 km di atas Kutub Selatan.
7. Powered Descent Initiation (PDI) 720 detik (12 menit) bimbingan Kluever
   menukik ke kawah Mons Mouton (-84.9°S, 33.3°W).
8. Touchdown Vertikal Sempurna di Permukaan Mons Mouton (Vz = 0.8 m/s, Vh = 0.12 m/s).
=============================================================================
"""

import os
import sys
import math
import json
import numpy as np

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

import constants as c

# Konstanta Fisika Astrodinamika
R_EARTH_KM = 6371.0
R_MOON_KM = 1737.4
MU_EARTH = 398600.4418 # km^3/s^2
MU_MOON = 4902.800066  # km^3/s^2
SCALE = 1.0 / 4000.0   # 1 Three.js unit = 4,000 km
eR = R_EARTH_KM * SCALE # 1.59275
mR = R_MOON_KM * SCALE  # 0.43435

# Koordinat Peluncuran Kennedy Space Center (Pad 39B)
KSC_LAT = 28.57 * math.pi / 180.0
KSC_LON = -80.64 * math.pi / 180.0

# Koordinat Pendaratan Mons Mouton Crest
MONS_LAT = -84.9 * math.pi / 180.0
MONS_LON = -33.3 * math.pi / 180.0
MONS_ELEV_KM = 1.42

def build_full_mission():
    print("Membangun model matematika trajektori sintesis misi penuh...")

    # Load efemeris Bulan untuk posisi Bulan sepanjang misi
    with open(os.path.join(BASE_DIR, "web", "trajectory.js"), "r", encoding="utf-8") as f:
        traj_code = f.read()

    m_start = traj_code.find("export const NASA_MOON = [") + len("export const NASA_MOON = ")
    m_end = traj_code.find("];", m_start) + 1
    nasa_moon = json.loads(traj_code[m_start:m_end])

    def horizons_to_three(d):
        return np.array([d[0] * SCALE, d[2] * SCALE, -d[1] * SCALE], dtype=np.float64)

    def get_moon_pos(day):
        # TRAJ_START_DAY = 0.1416667, step = 10 min = 10 / 1440 days
        traj_start_day = 0.14166667
        step_days = 10.0 / 1440.0
        f_idx = (day - traj_start_day) / step_days
        idx = max(0, min(len(nasa_moon) - 2, int(f_idx)))
        t = f_idx - idx
        p1 = horizons_to_three(nasa_moon[idx])
        p2 = horizons_to_three(nasa_moon[idx + 1])
        return (1.0 - t) * p1 + t * p2

    # Array titik misi komprehensif
    mission_records = []

    # ═════════════════════════════════════════════════════════════════════════
    # FASE 1: PELUNCURAN DARI BUMI & PENYISIPAN ORBIT LEO (0 s/d 540 s / 9 min)
    # ═════════════════════════════════════════════════════════════════════════
    print("  1. Menghitung profil peluncuran & gravity turn dari KSC...")
    t_ascent = 540.0 # 9 menit
    n_ascent = 36    # interval 15 detik
    for i in range(n_ascent):
        t_sec = i * (t_ascent / (n_ascent - 1))
        day = t_sec / 86400.0
        tau = t_sec / t_ascent

        # Profil ketinggian gravity turn (0 km -> 185 km)
        alt_km = 185.0 * (3.0 * tau**2 - 2.0 * tau**3)
        r_km = R_EARTH_KM + alt_km

        # Profil kecepatan (0 km/s -> 7.79 km/s)
        vel_kms = 0.408 * (1.0 - tau) + 7.79 * (tau**1.4)

        # Lintasan menyusuri busur inklinasi 28.5° ke arah timur
        theta = KSC_LON + tau * (math.pi / 4.0) # Downrange timur
        lat = KSC_LAT * (1.0 - 0.2 * tau)

        # Posisi Three.js (Earth-Centered)
        # Sumbu Y = Polar, X,Z = Khatulistiwa
        px = (r_km * SCALE) * math.cos(lat) * math.sin(theta)
        py = (r_km * SCALE) * math.sin(lat)
        pz = (r_km * SCALE) * math.cos(lat) * math.cos(theta)

        mission_records.append({
            "day": round(day, 6),
            "t_sec": round(t_sec, 1),
            "pos": [round(px, 6), round(py, 6), round(pz, 6)],
            "alt_km": round(alt_km, 2),
            "vel_kms": round(vel_kms, 3),
            "phase": "EARTH LAUNCH & ASCENT" if t_sec < 135 else "LEO ORBIT INSERTION BURN"
        })

    # ═════════════════════════════════════════════════════════════════════════
    # FASE 2: ORBIT PARKIR BUMI (LEO) (540 s s/d 6,300 s / 1.75 jam)
    # Mengitari Bumi ~1.3 putaran penuh pada ketinggian 185 km
    # ═════════════════════════════════════════════════════════════════════════
    print("  2. Menghitung orbit parkir LEO mengitari Bumi (1.3 putaran)...")
    t_leo_start = 540.0
    t_leo_end = 6300.0 # 1.75 jam setelah peluncuran (waktu TLI)
    n_leo = 40
    r_leo_km = R_EARTH_KM + 185.0
    v_leo_kms = math.sqrt(MU_EARTH / r_leo_km) # 7.793 km/s
    omega_leo = v_leo_kms / r_leo_km # rad/s

    theta_init = KSC_LON + (math.pi / 4.0)
    for i in range(1, n_leo):
        t_sec = t_leo_start + i * ((t_leo_end - t_leo_start) / (n_leo - 1))
        day = t_sec / 86400.0
        dt_leo = t_sec - t_leo_start

        # Sudut anomali orbit mengitari Bumi
        orbit_angle = theta_init + omega_leo * dt_leo
        lat = KSC_LAT * math.cos(omega_leo * dt_leo)

        px = (r_leo_km * SCALE) * math.cos(lat) * math.sin(orbit_angle)
        py = (r_leo_km * SCALE) * math.sin(lat)
        pz = (r_leo_km * SCALE) * math.cos(lat) * math.cos(orbit_angle)

        mission_records.append({
            "day": round(day, 6),
            "t_sec": round(t_sec, 1),
            "pos": [round(px, 6), round(py, 6), round(pz, 6)],
            "alt_km": 185.0,
            "vel_kms": round(v_leo_kms, 3),
            "phase": "EARTH PARKING ORBIT (LEO)"
        })

    # ═════════════════════════════════════════════════════════════════════════
    # FASE 3: TRANS-LUNAR INJECTION (TLI) & TRANSIT (Day 0.073 s/d Day 4.45)
    # Wahana meluncur menempuh 384.400 km menuju posisi antisipasi Bulan
    # ═════════════════════════════════════════════════════════════════════════
    print("  3. Menghitung injeksi translunar TLI & transfer elips 384.400 km...")
    day_tli = t_leo_end / 86400.0 # ~0.0729 hari
    day_loi_arrival = 4.45       # Masuk orbit bulan pada hari ke-4.45 (~106.8 jam)

    pos_tli_start = np.array(mission_records[-1]["pos"], dtype=np.float64)

    # Posisi Bulan saat kedatangan (Day 4.45)
    moon_at_arrival = get_moon_pos(day_loi_arrival)

    # Vektor orbital target di atas Bulan (100 km polar orbit)
    # Kutub utara Bulan sebagai gerbang masuk orbit polar
    polar_entry = moon_at_arrival + np.array([0.0, (R_MOON_KM + 100.0) * SCALE, 0.0])

    n_coast = 350
    for i in range(1, n_coast):
        u = i / n_coast
        day = day_tli + u * (day_loi_arrival - day_tli)
        t_sec = day * 86400.0

        # Posisi Bulan saat waktu 'day'
        current_moon = get_moon_pos(day)

        # Interpolasi trajektori transfer eliptik tinggi (Keplerian)
        # Menggunakan lengkungan gravitasi bumi yang melemah lalu ditarik bulan
        tli_direction = (polar_entry - pos_tli_start)
        # Efek lengkungan orbit elips transfer
        r_earth_dist = (1.0 - u) * (r_leo_km * SCALE) + u * np.linalg.norm(current_moon)
        
        # Posisi kurva transfer translunar halus
        pos_curve = (1.0 - u) * pos_tli_start + u * polar_entry
        # Tarikan gravitasi membentuk busur transfer Kepler
        arc_offset = np.array([-0.18, 0.08, 0.12]) * math.sin(u * math.pi)
        pos = pos_curve + arc_offset

        # Jarak & kecepatan
        dist_earth_km = np.linalg.norm(pos) / SCALE - R_EARTH_KM
        dist_moon_km = np.linalg.norm(pos - current_moon) / SCALE - R_MOON_KM

        # Dinamika kecepatan (10.95 km/s saat TLI -> 0.9 km/s dekat L1 -> 2.3 km/s dekat Bulan)
        if u < 0.8:
            vel_kms = 10.95 * (1.0 - 0.91 * u**0.4)
        else:
            v_inflow = (u - 0.8) / 0.2
            vel_kms = 0.98 + v_inflow * 1.35

        phase = "TRANS-LUNAR INJECTION (TLI)" if u < 0.03 else "TRANSLUNAR COAST"

        mission_records.append({
            "day": round(day, 6),
            "t_sec": round(t_sec, 1),
            "pos": [round(float(pos[0]), 6), round(float(pos[1]), 6), round(float(pos[2]), 6)],
            "alt_km": round(float(dist_moon_km if dist_moon_km < dist_earth_km else dist_earth_km), 2),
            "vel_kms": round(float(vel_kms), 3),
            "phase": phase
        })

    # ═════════════════════════════════════════════════════════════════════════
    # FASE 4: LUNAR ORBIT INSERTION (LOI) & 2 PUTARAN ORBIT MENGITARI BULAN
    # (Day 4.45 s/d Day 4.825 / Durasi ~9 Jam)
    # Putaran 1: 100 km x 100 km Circular Polar Orbit mengitari Bulan
    # Putaran 2: 100 km x 15 km Perilune Lowering Orbit menuju Kutub Selatan
    # ═════════════════════════════════════════════════════════════════════════
    print("  4. Menghitung 2 putaran orbit penuh mengitari Bulan (Polar Orbit 100 km & 15 km)...")
    day_loi_start = day_loi_arrival
    # Periode orbit Bulan pada ketinggian 100 km = ~118 menit = 1.96 jam = 0.0818 hari
    orbit_period_days = 0.0818
    # 2 Putaran orbit mengitari bulan:
    n_revolutions = 2.0
    day_orbit_duration = n_revolutions * orbit_period_days # ~0.1636 hari (~3.93 jam)
    day_pdi_start = day_loi_start + day_orbit_duration # ~Day 4.6136

    n_lunar_orbit_pts = 160
    r_orbit_1_km = R_MOON_KM + 100.0 # 1,837.4 km (Three.js radius: 0.45935)
    r_orbit_perilune_km = R_MOON_KM + 15.0 # 1,752.4 km (Three.js radius: 0.4381)

    for i in range(n_lunar_orbit_pts):
        u = i / (n_lunar_orbit_pts - 1)
        day = day_loi_start + u * day_orbit_duration
        t_sec = day * 86400.0

        current_moon = get_moon_pos(day)

        # Sudut putaran mengitari Bulan (2 putaran penuh = 4*pi)
        theta_moon = u * (2.0 * math.pi * n_revolutions)

        # Transisi dari orbit 1 (lingkaran 100 km) ke orbit 2 (penurunan perilune ke 15 km di kutub selatan)
        # Di kutub selatan (theta = pi, 3*pi), radius menurun
        if u < 0.5:
            # Putaran 1: Orbit lingkaran stabil 100 km di atas Bulan
            current_r_km = r_orbit_1_km
            phase_str = "LUNAR POLAR ORBIT (REV 1 — 100 KM)"
        else:
            # Putaran 2: Penurunan perilune menuju 15 km tepat di atas Kutub Selatan
            u2 = (u - 0.5) / 0.5
            # Menurun saat mendekati kutub selatan di akhir putaran ke-2
            current_r_km = r_orbit_1_km - (r_orbit_1_km - r_orbit_perilune_km) * (u2**1.2)
            phase_str = "LUNAR DESCENT ORBIT (REV 2 — PERILUNE 15 KM)"

        r_local_three = current_r_km * SCALE

        # Koordinat polar orbit lokal mengitari Bulan (Sumbu Y = Polar, X,Z = Khatulistiwa)
        # Orbit melewati Kutub Utara (Y > 0), Khatulistiwa (Y = 0), Kutub Selatan (Y < 0)
        local_x = r_local_three * math.sin(theta_moon) * math.cos(MONS_LON)
        local_y = r_local_three * math.cos(theta_moon) # Mengitari kutub
        local_z = r_local_three * math.sin(theta_moon) * math.sin(MONS_LON)

        local_moon_pos = np.array([local_x, local_y, local_z])
        # Posisi dunia = Posisi Bulan saat itu + Posisi orbit lokal
        world_pos = current_moon + local_moon_pos

        alt_moon_km = current_r_km - R_MOON_KM
        v_orbit_kms = math.sqrt(MU_MOON / current_r_km)

        mission_records.append({
            "day": round(day, 6),
            "t_sec": round(t_sec, 1),
            "pos": [round(float(world_pos[0]), 6), round(float(world_pos[1]), 6), round(float(world_pos[2]), 6)],
            "alt_km": round(float(alt_moon_km), 2),
            "vel_kms": round(float(v_orbit_kms), 3),
            "phase": phase_str
        })

    # ═════════════════════════════════════════════════════════════════════════
    # FASE 5: POWERED DESCENT INITIATION (PDI) KE MONS MOUTON (12 Menit)
    # Dari Perilune 15 km menukik vertikal ke Mons Mouton (-84.9°S, 33.3°W)
    # ═════════════════════════════════════════════════════════════════════════
    print("  5. Menghitung Powered Descent Initiation (PDI) 720 s ke Mons Mouton...")
    # Load 721 titik bimbingan pendaratan yang sudah dihitung akurat
    with open(os.path.join(BASE_DIR, "web", "lunar_landing_trajectory.js"), "r", encoding="utf-8") as f:
        land_code = f.read()

    lp_start = land_code.find("export const LANDING_POINTS = [") + len("export const LANDING_POINTS = ")
    lp_end = land_code.find("];", lp_start) + 1
    landing_pts = json.loads(land_code[lp_start:lp_end])

    day_landing_start = day_pdi_start
    t_landing_duration = 720.0 # 12 menit
    day_landing_duration = t_landing_duration / 86400.0
    day_touchdown = day_landing_start + day_landing_duration

    # Ambil sampel setiap 5 detik untuk trajektori pendaratan (145 titik)
    for j in range(0, len(landing_pts), 5):
        pt = landing_pts[j]
        t_pdi_sec = pt["t_s"]
        day = day_landing_start + (t_pdi_sec / 86400.0)
        t_sec = day * 86400.0

        current_moon = get_moon_pos(day)

        # Posisi Three.js lokal terhadap pusat Bulan
        local_pos = np.array([pt["three_pos"][0], pt["three_pos"][1], pt["three_pos"][2]])
        world_pos = current_moon + local_pos

        mission_records.append({
            "day": round(day, 6),
            "t_sec": round(t_sec, 1),
            "pos": [round(float(world_pos[0]), 6), round(float(world_pos[1]), 6), round(float(world_pos[2]), 6)],
            "alt_km": round(float(pt["alt_m"] / 1000.0), 3),
            "vel_kms": round(float(pt["v_tot_ms"] / 1000.0), 3),
            "fuel_kg": pt["fuel_kg"],
            "throttle_pct": pt["throttle_pct"],
            "pitch_deg": pt["pitch_deg"],
            "g_force": pt["g_force"],
            "phase": pt["phase"]
        })

    # Titik akhir Touchdown di Mons Mouton
    final_pt = landing_pts[-1]
    moon_at_touchdown = get_moon_pos(day_touchdown)
    final_local = np.array([final_pt["three_pos"][0], final_pt["three_pos"][1], final_pt["three_pos"][2]])
    final_world = moon_at_touchdown + final_local

    mission_records.append({
        "day": round(day_touchdown, 6),
        "t_sec": round(day_touchdown * 86400.0, 1),
        "pos": [round(float(final_world[0]), 6), round(float(final_world[1]), 6), round(float(final_world[2]), 6)],
        "alt_km": 0.0,
        "vel_kms": 0.0,
        "fuel_kg": final_pt["fuel_kg"],
        "throttle_pct": 0.0,
        "pitch_deg": 90.0,
        "g_force": 0.166,
        "phase": "TOUCHDOWN SAFE (MONS MOUTON)"
    })

    summary = {
        "mission_name": "Artemis III - SpaceX Starship HLS Lunar Landing",
        "launch_site": "Kennedy Space Center, Florida (28.57°N, 80.64°W)",
        "landing_site": "Mons Mouton Crest, Lunar South Pole (-84.9°S, 33.3°W)",
        "total_points": len(mission_records),
        "start_day": 0.0,
        "touchdown_day": round(day_touchdown, 5),
        "touchdown_met": f"T+{int(day_touchdown):02d}d:{int((day_touchdown%1)*24):02d}h:{int(((day_touchdown*24)%1)*60):02d}m",
        "phases": {
            "launch_ascent": {"day_start": 0.0, "day_end": round(540.0/86400.0, 5), "desc": "Earth Lift-Off & Gravity Turn"},
            "leo_parking_orbit": {"day_start": round(540.0/86400.0, 5), "day_end": round(day_tli, 5), "desc": "1.3 Orbits around Earth (185 km)"},
            "translunar_injection": {"day_start": round(day_tli, 5), "day_end": round(day_tli + 0.015, 5), "desc": "TLI Burn (10.95 km/s)"},
            "translunar_coast": {"day_start": round(day_tli + 0.015, 5), "day_end": round(day_loi_start, 5), "desc": "Translunar Transit 384,400 km"},
            "lunar_polar_orbit_rev1": {"day_start": round(day_loi_start, 5), "day_end": round(day_loi_start + orbit_period_days, 5), "desc": "Revolution 1 around Moon (100 km Circular Polar)"},
            "lunar_polar_orbit_rev2": {"day_start": round(day_loi_start + orbit_period_days, 5), "day_end": round(day_pdi_start, 5), "desc": "Revolution 2 around Moon (15 km Perilune Descent Orbit)"},
            "powered_descent_pdi": {"day_start": round(day_pdi_start, 5), "day_end": round(day_touchdown, 5), "desc": "12-Min Powered Descent to Mons Mouton"},
            "touchdown": {"day": round(day_touchdown, 5), "desc": "Touchdown Safe on Mons Mouton (-84.9°S, 33.3°W)"}
        }
    }

    # Ekspor ke file ES Module: web/synthetic_mission_trajectory.js
    output_js = f"""// =============================================================================
// synthetic_mission_trajectory.js — Complete Unified Artemis III Lunar Mission
// 1. Earth Launch at KSC (28.57°N, 80.64°W)
// 2. Gravity Turn Ascent to 185 km LEO
// 3. Earth Parking Orbit (LEO)
// 4. Trans-Lunar Injection (TLI)
// 5. Translunar Transit (384,400 km)
// 6. Lunar Orbit Insertion (LOI) + 2 FULL POLAR ORBITS CIRCLING THE MOON (100 km & 15 km)
// 7. Powered Descent Initiation (PDI) to Mons Mouton
// 8. Touchdown Safe at Mons Mouton (-84.9°S, 33.3°W)
// =============================================================================

export const MISSION_SUMMARY = {json.dumps(summary, indent=2)};

export const MISSION_TRAJECTORY_POINTS = {json.dumps(mission_records, indent=2)};

export function getMissionPointByDay(day) {{
  const pts = MISSION_TRAJECTORY_POINTS;
  if (day <= pts[0].day) return pts[0];
  if (day >= pts[pts.length - 1].day) return pts[pts.length - 1];

  // Binary search for exact day
  let low = 0, high = pts.length - 1;
  while (low <= high) {{
    const mid = Math.floor((low + high) / 2);
    if (pts[mid].day < day) low = mid + 1;
    else high = mid - 1;
  }}
  const idx = Math.max(0, Math.min(pts.length - 2, high));
  const p1 = pts[idx];
  const p2 = pts[idx + 1];
  const span = p2.day - p1.day;
  const t = span > 0 ? (day - p1.day) / span : 0;

  return {{
    day: day,
    pos: [
      (1 - t) * p1.pos[0] + t * p2.pos[0],
      (1 - t) * p1.pos[1] + t * p2.pos[1],
      (1 - t) * p1.pos[2] + t * p2.pos[2]
    ],
    alt_km: (1 - t) * p1.alt_km + t * p2.alt_km,
    vel_kms: (1 - t) * p1.vel_kms + t * p2.vel_kms,
    phase: t < 0.5 ? p1.phase : p2.phase,
    fuel_kg: p1.fuel_kg !== undefined ? (1 - t) * p1.fuel_kg + t * (p2.fuel_kg || p1.fuel_kg) : 450.0,
    throttle_pct: p1.throttle_pct !== undefined ? p1.throttle_pct : 0.0,
    pitch_deg: p1.pitch_deg !== undefined ? p1.pitch_deg : 0.0,
    g_force: p1.g_force !== undefined ? p1.g_force : 1.0
  }};
}}
"""
    output_path = os.path.join(BASE_DIR, "web", "synthetic_mission_trajectory.js")
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(output_js)

    print(f"Data sintesis misi lengkap berhasil dibuat di: {output_path}")
    print(f"Total titik data: {len(mission_records)}")
    print(f"Mulai: Hari {summary['start_day']} (Permukaan Bumi KSC Pad 39B)")
    print(f"Selesai: Hari {summary['touchdown_day']} (Touchdown di Mons Mouton)")
    print(f"MET Touchdown: {summary['touchdown_met']}")
    print("Fase yang tercakup:")
    for k, v in summary["phases"].items():
        print(f"  - {k}: {v['desc']}")

if __name__ == "__main__":
    build_full_mission()
