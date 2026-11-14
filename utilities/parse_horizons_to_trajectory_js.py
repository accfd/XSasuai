# -*- coding: utf-8 -*-
"""
parse_horizons_to_trajectory_js.py
=============================================================================
NASA JPL Horizons to WebGL Trajectory Compiler
Misi: Artemis III / SpaceX Starship Human Landing System (HLS)
Target Pendaratan: Mons Mouton Crest, Kutub Selatan Bulan (-84.9°S, 33.3°W)
=============================================================================
"""

import os
import sys
import math
import json
from datetime import datetime

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DATA_DIR = os.path.join(BASE_DIR, "data")
WEB_DIR = os.path.join(BASE_DIR, "web")

MOON_EPHEMERIS_FILE = os.path.join(DATA_DIR, "moon_ephemeris.txt")
ARTEMIS_EPHEMERIS_FILE = os.path.join(DATA_DIR, "artemis_ephemeris_mons_mouton.txt")
TRAJECTORY_JS_FILE = os.path.join(WEB_DIR, "trajectory.js")
SYNTHETIC_JS_FILE = os.path.join(WEB_DIR, "synthetic_mission_trajectory.js")

# Konstanta Fisika
R_EARTH_KM = 6378.137
R_MOON_KM = 1737.4
SCALE = 1.0 / 4000.0  # Three.js world scale


def parse_horizons_file(file_path):
    """Membaca berkas JPL Horizons dan mengekstrak data di antara $$SOE dan $$EOE."""
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Berkas efemeris tidak ditemukan: {file_path}")

    records = []
    in_data = False

    with open(file_path, "r", encoding="utf-8") as f:
        for line in f:
            line_str = line.strip()
            if "$$SOE" in line_str:
                in_data = True
                continue
            if "$$EOE" in line_str:
                in_data = False
                break
            if in_data and line_str:
                parts = [p.strip() for p in line_str.split(",") if p.strip()]
                if len(parts) >= 8:
                    try:
                        jd = float(parts[0])
                        date_str = parts[1]
                        x = float(parts[2])
                        y = float(parts[3])
                        z = float(parts[4])
                        vx = float(parts[5])
                        vy = float(parts[6])
                        vz = float(parts[7])
                        records.append({
                            "jd": jd,
                            "date": date_str,
                            "x": x, "y": y, "z": z,
                            "vx": vx, "vy": vy, "vz": vz
                        })
                    except ValueError:
                        continue
    return records


def interpolate_moon_pos(moon_records, target_jd):
    """Interpolasi linier posisi Bulan pada Julian Date tertentu."""
    if target_jd <= moon_records[0]["jd"]:
        return moon_records[0]["x"], moon_records[0]["y"], moon_records[0]["z"]
    if target_jd >= moon_records[-1]["jd"]:
        return moon_records[-1]["x"], moon_records[-1]["y"], moon_records[-1]["z"]

    # Binary search
    low = 0
    high = len(moon_records) - 1
    while low <= high:
        mid = (low + high) // 2
        if moon_records[mid]["jd"] < target_jd:
            low = mid + 1
        else:
            high = mid - 1
    
    idx = max(0, min(len(moon_records) - 2, high))
    m1 = moon_records[idx]
    m2 = moon_records[idx + 1]
    span = m2["jd"] - m1["jd"]
    t = (target_jd - m1["jd"]) / span if span > 0 else 0.0

    mx = (1.0 - t) * m1["x"] + t * m2["x"]
    my = (1.0 - t) * m1["y"] + t * m2["y"]
    mz = (1.0 - t) * m1["z"] + t * m2["z"]
    return mx, my, mz


def determine_flight_phase(day, alt_km, vel_kms):
    """Menentukan fase penerbangan berdasarkan waktu misi relatif dan profil ketinggian."""
    if day <= 0.00694:
        return "EARTH LAUNCH & ASCENT"
    elif day <= 0.07292:
        return "EARTH PARKING ORBIT (LEO)"
    elif day <= 0.09028:
        return "TRANS-LUNAR INJECTION (TLI)"
    elif day <= 4.380:
        return "TRANSLUNAR TRANSIT (COAST)"
    elif day <= 4.450:
        return "LUNAR POLAR ORBIT (REV 1 - 100 KM)"
    elif day <= 4.52268:
        return "LUNAR POLAR ORBIT (REV 2 - 15 KM)"
    elif day <= 4.5270:
        return "POWERED DESCENT: BRAKING PHASE"
    elif day <= 4.5305:
        return "POWERED DESCENT: APPROACH & PITCH-UP"
    elif day < 4.53101:
        return "TERMINAL VERTICAL DESCENT"
    else:
        return "TOUCHDOWN (MONS MOUTON CREST)"


def main():
    print("=" * 78)
    print("Xasuai — NASA JPL Horizons to WebGL Trajectory Compiler")
    print("Misi: Artemis III / Starship HLS to Mons Mouton Crest (-84.9°S, 33.3°W)")
    print("=" * 78)

    # 1. Parsing Horizons Data
    print(f"Membaca berkas: {MOON_EPHEMERIS_FILE}")
    moon_records = parse_horizons_file(MOON_EPHEMERIS_FILE)
    print(f"  -> Ditemukan {len(moon_records)} titik efemeris Bulan.")

    print(f"Membaca berkas: {ARTEMIS_EPHEMERIS_FILE}")
    artemis_records = parse_horizons_file(ARTEMIS_EPHEMERIS_FILE)
    print(f"  -> Ditemukan {len(artemis_records)} titik efemeris Artemis III / Starship HLS.")

    if not moon_records or not artemis_records:
        print("Error: Berkas efemeris kosong atau format salah.")
        sys.exit(1)

    jd_start = artemis_records[0]["jd"]
    jd_end = artemis_records[-1]["jd"]
    total_mission_days = jd_end - jd_start
    print(f"Durasi Misi: {total_mission_days:.5f} hari (~{total_mission_days * 24:.2f} jam)")

    # 2. Kompilasi Array untuk web/trajectory.js
    nasa_traj = []
    nasa_moon = []
    mission_points = []

    tli_index = 0
    tli_found = False

    initial_fuel = 450.0  # kg propelan pendarat
    current_fuel = initial_fuel

    for i, rec in enumerate(artemis_records):
        day = rec["jd"] - jd_start
        t_sec = day * 86400.0

        # Posisi Geosentrik Artemis (km)
        ax, ay, az = rec["x"], rec["y"], rec["z"]
        vx, vy, vz = rec["vx"], rec["vy"], rec["vz"]
        v_tot = math.sqrt(vx**2 + vy**2 + vz**2)

        # Posisi Bulan sinkron (km)
        mx, my, mz = interpolate_moon_pos(moon_records, rec["jd"])

        nasa_traj.append([round(ax, 1), round(ay, 1), round(az, 1)])
        nasa_moon.append([round(mx, 1), round(my, 1), round(mz, 1)])

        # Hitung jarak dan ketinggian
        r_earth = math.sqrt(ax**2 + ay**2 + az**2)
        r_moon = math.sqrt((ax - mx)**2 + (ay - my)**2 + (az - mz)**2)

        if day < 4.0:
            alt_km = max(0.0, r_earth - R_EARTH_KM)
        else:
            alt_km = max(0.0, r_moon - R_MOON_KM)

        # Three.js Coordinates: X_three = X * SCALE, Y_three = Z * SCALE, Z_three = -Y * SCALE
        pos_three = [
            round(ax * SCALE, 6),
            round(az * SCALE, 6),
            round(-ay * SCALE, 6)
        ]
        moon_three = [
            round(mx * SCALE, 6),
            round(mz * SCALE, 6),
            round(-my * SCALE, 6)
        ]

        phase = determine_flight_phase(day, alt_km, v_tot)

        # Deteksi indeks TLI
        if not tli_found and day >= 0.073:
            tli_index = i
            tli_found = True

        # Telemetri propulsi dan dinamika
        if "POWERED DESCENT" in phase or "TERMINAL" in phase or "TOUCHDOWN" in phase:
            pdi_progress = max(0.0, min(1.0, (day - 4.52268) / (total_mission_days - 4.52268)))
            current_fuel = max(42.5, initial_fuel - (pdi_progress * (initial_fuel - 42.5)))
            throttle_pct = 78.0 if pdi_progress < 0.8 else (35.0 if pdi_progress < 0.98 else 0.0)
            pitch_deg = -15.0 + pdi_progress * 105.0
            g_force = 1.0 + throttle_pct * 0.015
        elif "LAUNCH" in phase:
            current_fuel = 450.0
            throttle_pct = 85.0
            pitch_deg = 45.0
            g_force = 1.45
        elif "TLI" in phase:
            current_fuel = 450.0
            throttle_pct = 100.0
            pitch_deg = 0.0
            g_force = 1.65
        else:
            current_fuel = 450.0
            throttle_pct = 0.0
            pitch_deg = 0.0
            g_force = 1.0

        point_data = {
            "day": round(day, 6),
            "t_sec": round(t_sec, 1),
            "pos": pos_three,
            "moon_pos": moon_three,
            "alt_km": round(alt_km, 3),
            "vel_kms": round(v_tot, 4),
            "fuel_kg": round(current_fuel, 1),
            "throttle_pct": round(throttle_pct, 1),
            "pitch_deg": round(pitch_deg, 1),
            "g_force": round(g_force, 2),
            "phase": phase
        }
        mission_points.append(point_data)

    print(f"  -> Berhasil mengompilasi {len(mission_points)} titik trajektori.")

    # 3. Menulis Berkas web/trajectory.js
    print(f"Menulis berkas output: {TRAJECTORY_JS_FILE}")
    traj_step_days = total_mission_days / max(1, len(nasa_traj) - 1)
    with open(TRAJECTORY_JS_FILE, "w", encoding="utf-8") as f:
        f.write("// Artemis III / Starship HLS trajectory compiled from NASA JPL Horizons\n")
        f.write("// Target: Mons Mouton Crest (-84.9°S, 33.3°W)\n")
        f.write("// Earth-centered Ecliptic J2000 coordinates (km)\n\n")

        f.write("export const NASA_TRAJ = [\n")
        for p in nasa_traj:
            f.write(f"  [{p[0]},{p[1]},{p[2]}],\n")
        f.write("];\n\n")

        f.write("export const NASA_MOON = [\n")
        for p in nasa_moon:
            f.write(f"  [{p[0]},{p[1]},{p[2]}],\n")
        f.write("];\n\n")

        f.write(f"export const TRAJ_START_DAY = 0.0;\n")
        f.write(f"export const TRAJ_END_DAY = {total_mission_days:.6f};\n")
        f.write(f"export const TRAJ_STEP_DAYS = {traj_step_days:.8f};\n")
        f.write(f"export const TRAJ_N = {len(nasa_traj)};\n")
        f.write(f"export const TLI_INDEX = {tli_index};\n")

    print(f"  -> web/trajectory.js berhasil diperbarui ({len(nasa_traj)} poin).")

    # 4. Menulis Berkas web/synthetic_mission_trajectory.js
    print(f"Menulis berkas output: {SYNTHETIC_JS_FILE}")
    summary = {
        "mission_name": "Artemis III - SpaceX Starship HLS Lunar Landing",
        "launch_site": "Kennedy Space Center, Florida (LC-39B Pad, Alt: 0 km)",
        "landing_site": "Mons Mouton Crest, Lunar South Pole (-84.90°S, 33.30°W)",
        "total_points": len(mission_points),
        "start_day": 0.0,
        "touchdown_day": round(total_mission_days, 5),
        "touchdown_met": "T+04d:12h:44m",
        "phases": {
            "launch_ascent": {"day_start": 0.0, "day_end": 0.00694, "desc": "Earth Lift-Off & Gravity Turn"},
            "leo_parking_orbit": {"day_start": 0.00694, "day_end": 0.07292, "desc": "1.3 Orbits around Earth (185 km)"},
            "tli_burn": {"day_start": 0.07292, "day_end": 0.09028, "desc": "Translunar Injection (+3.05 km/s Delta-V)"},
            "translunar_coast": {"day_start": 0.09028, "day_end": 4.380, "desc": "384,400 km Translunar Coast"},
            "loi_rev1": {"day_start": 4.380, "day_end": 4.450, "desc": "Lunar Orbit Rev 1 (100 km Circular Polar)"},
            "orbit_rev2": {"day_start": 4.450, "day_end": 4.52268, "desc": "Lunar Orbit Rev 2 (15 km Perilune Lowering)"},
            "powered_descent": {"day_start": 4.52268, "day_end": round(total_mission_days, 5), "desc": "PDI 12-Min Descent & Vertical Touchdown at Mons Mouton"}
        }
    }

    with open(SYNTHETIC_JS_FILE, "w", encoding="utf-8") as f:
        f.write("// =============================================================================\n")
        f.write("// synthetic_mission_trajectory.js — Complete Unified Artemis III Lunar Mission\n")
        f.write("// Compiled directly from NASA JPL Horizons ephemerides\n")
        f.write("// Target: Mons Mouton Crest, South Pole (-84.9°S, 33.3°W)\n")
        f.write("// =============================================================================\n\n")

        f.write(f"export const MISSION_SUMMARY = {json.dumps(summary, indent=2)};\n\n")

        f.write("export const MISSION_TRAJECTORY_POINTS = [\n")
        for pt in mission_points:
            f.write(f"  {json.dumps(pt)},\n")
        f.write("];\n\n")

        f.write("""export function getMissionPointByDay(day) {
  const pts = MISSION_TRAJECTORY_POINTS;
  if (!pts || pts.length === 0) return null;
  if (day <= pts[0].day) return pts[0];
  if (day >= pts[pts.length - 1].day) return pts[pts.length - 1];

  let low = 0, high = pts.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (pts[mid].day < day) low = mid + 1;
    else high = mid - 1;
  }
  const idx = Math.max(0, Math.min(pts.length - 2, high));
  const p1 = pts[idx];
  const p2 = pts[idx + 1];
  const span = p2.day - p1.day;
  const t = span > 0 ? (day - p1.day) / span : 0;

  return {
    day: day,
    t_sec: (1 - t) * p1.t_sec + t * p2.t_sec,
    pos: [
      (1 - t) * p1.pos[0] + t * p2.pos[0],
      (1 - t) * p1.pos[1] + t * p2.pos[1],
      (1 - t) * p1.pos[2] + t * p2.pos[2]
    ],
    moon_pos: (p1.moon_pos && p2.moon_pos) ? [
      (1 - t) * p1.moon_pos[0] + t * p2.moon_pos[0],
      (1 - t) * p1.moon_pos[1] + t * p2.moon_pos[1],
      (1 - t) * p1.moon_pos[2] + t * p2.moon_pos[2]
    ] : null,
    alt_km: (1 - t) * p1.alt_km + t * p2.alt_km,
    vel_kms: (1 - t) * p1.vel_kms + t * p2.vel_kms,
    fuel_kg: (1 - t) * p1.fuel_kg + t * p2.fuel_kg,
    throttle_pct: (1 - t) * p1.throttle_pct + t * p2.throttle_pct,
    pitch_deg: (1 - t) * p1.pitch_deg + t * p2.pitch_deg,
    g_force: (1 - t) * p1.g_force + t * p2.g_force,
    phase: t < 0.5 ? p1.phase : p2.phase
  };
}
""")

    print(f"  -> web/synthetic_mission_trajectory.js berhasil diperbarui ({len(mission_points)} poin).")


if __name__ == "__main__":
    main()
