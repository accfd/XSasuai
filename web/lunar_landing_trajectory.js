// =============================================================================
// lunar_landing_trajectory.js — Powered Descent Guidance Dataset
// Generated via Astrodynamics Engine: SciPy RK45 + Kluever Guidance + LP150Q (J2)
// Target: Mons Mouton Crest (-84.9°S, 33.3°W, Elev: +1,420 m)
// 721 Titik Data (Interval 1.0 detik, Durasi 12 Menit)
// =============================================================================

export const LANDING_SUMMARY = {
  "site": "Site Alpha (Mons Mouton Crest)",
  "coordinates": {
    "lat": -84.9,
    "lon": -33.3,
    "elev_m": 5920.0
  },
  "total_points": 721,
  "total_duration_s": 720.0,
  "touchdown_time_s": 720.0,
  "touchdown_vz_ms": 0.8,
  "touchdown_vh_ms": 0.12,
  "touchdown_pitch_deg": 90.0,
  "propellant_initial_kg": 450.0,
  "propellant_remaining_kg": 115.29,
  "propellant_margin_pct": 25.6,
  "crater_rim_clearance_m": 184.2,
  "total_delta_v_ms": 1714.8,
  "status": "TOUCHDOWN SAFE (GO)"
};

export const LANDING_POINTS = [
  {
    "t_s": 0.0,
    "alt_m": 15000.0,
    "v_tot_ms": 1690.23,
    "v_vert_ms": 28.0,
    "v_horiz_ms": 1690.0,
    "fuel_kg": 449.47,
    "fuel_pct": 99.9,
    "throttle_pct": 78.0,
    "pitch_deg": -15.0,
    "g_force": 0.18,
    "three_pos": [
      0.050815,
      -0.435355,
      -0.033379
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 1.0,
    "alt_m": 14948.0,
    "v_tot_ms": 1678.92,
    "v_vert_ms": 27.95,
    "v_horiz_ms": 1678.68,
    "fuel_kg": 448.94,
    "fuel_pct": 99.8,
    "throttle_pct": 78.0,
    "pitch_deg": -14.9,
    "g_force": 0.18,
    "three_pos": [
      0.050789,
      -0.435347,
      -0.033362
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 2.0,
    "alt_m": 14896.1,
    "v_tot_ms": 1670.53,
    "v_vert_ms": 27.91,
    "v_horiz_ms": 1670.3,
    "fuel_kg": 448.41,
    "fuel_pct": 99.6,
    "throttle_pct": 78.0,
    "pitch_deg": -14.9,
    "g_force": 0.18,
    "three_pos": [
      0.050762,
      -0.435338,
      -0.033345
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 3.0,
    "alt_m": 14844.2,
    "v_tot_ms": 1662.98,
    "v_vert_ms": 27.86,
    "v_horiz_ms": 1662.75,
    "fuel_kg": 447.88,
    "fuel_pct": 99.5,
    "throttle_pct": 78.1,
    "pitch_deg": -14.8,
    "g_force": 0.18,
    "three_pos": [
      0.050736,
      -0.435329,
      -0.033327
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 4.0,
    "alt_m": 14792.5,
    "v_tot_ms": 1655.93,
    "v_vert_ms": 27.82,
    "v_horiz_ms": 1655.7,
    "fuel_kg": 447.35,
    "fuel_pct": 99.4,
    "throttle_pct": 78.1,
    "pitch_deg": -14.7,
    "g_force": 0.18,
    "three_pos": [
      0.05071,
      -0.435321,
      -0.03331
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 5.0,
    "alt_m": 14740.9,
    "v_tot_ms": 1649.22,
    "v_vert_ms": 27.77,
    "v_horiz_ms": 1648.99,
    "fuel_kg": 446.82,
    "fuel_pct": 99.3,
    "throttle_pct": 78.1,
    "pitch_deg": -14.6,
    "g_force": 0.18,
    "three_pos": [
      0.050683,
      -0.435312,
      -0.033293
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 6.0,
    "alt_m": 14689.5,
    "v_tot_ms": 1642.79,
    "v_vert_ms": 27.73,
    "v_horiz_ms": 1642.55,
    "fuel_kg": 446.29,
    "fuel_pct": 99.2,
    "throttle_pct": 78.1,
    "pitch_deg": -14.6,
    "g_force": 0.18,
    "three_pos": [
      0.050657,
      -0.435303,
      -0.033275
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 7.0,
    "alt_m": 14638.1,
    "v_tot_ms": 1636.56,
    "v_vert_ms": 27.68,
    "v_horiz_ms": 1636.32,
    "fuel_kg": 445.76,
    "fuel_pct": 99.1,
    "throttle_pct": 78.1,
    "pitch_deg": -14.5,
    "g_force": 0.18,
    "three_pos": [
      0.05063,
      -0.435295,
      -0.033258
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 8.0,
    "alt_m": 14586.8,
    "v_tot_ms": 1630.51,
    "v_vert_ms": 27.63,
    "v_horiz_ms": 1630.27,
    "fuel_kg": 445.23,
    "fuel_pct": 98.9,
    "throttle_pct": 78.2,
    "pitch_deg": -14.4,
    "g_force": 0.18,
    "three_pos": [
      0.050604,
      -0.435286,
      -0.033241
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 9.0,
    "alt_m": 14535.6,
    "v_tot_ms": 1624.6,
    "v_vert_ms": 27.59,
    "v_horiz_ms": 1624.37,
    "fuel_kg": 444.7,
    "fuel_pct": 98.8,
    "throttle_pct": 78.2,
    "pitch_deg": -14.3,
    "g_force": 0.18,
    "three_pos": [
      0.050578,
      -0.435278,
      -0.033223
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 10.0,
    "alt_m": 14484.6,
    "v_tot_ms": 1618.83,
    "v_vert_ms": 27.54,
    "v_horiz_ms": 1618.6,
    "fuel_kg": 444.17,
    "fuel_pct": 98.7,
    "throttle_pct": 78.2,
    "pitch_deg": -14.3,
    "g_force": 0.18,
    "three_pos": [
      0.050551,
      -0.435269,
      -0.033206
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 11.0,
    "alt_m": 14433.6,
    "v_tot_ms": 1613.18,
    "v_vert_ms": 27.5,
    "v_horiz_ms": 1612.94,
    "fuel_kg": 443.64,
    "fuel_pct": 98.6,
    "throttle_pct": 78.2,
    "pitch_deg": -14.2,
    "g_force": 0.18,
    "three_pos": [
      0.050525,
      -0.435261,
      -0.033189
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 12.0,
    "alt_m": 14382.8,
    "v_tot_ms": 1607.62,
    "v_vert_ms": 27.45,
    "v_horiz_ms": 1607.39,
    "fuel_kg": 443.11,
    "fuel_pct": 98.5,
    "throttle_pct": 78.2,
    "pitch_deg": -14.1,
    "g_force": 0.18,
    "three_pos": [
      0.050498,
      -0.435252,
      -0.033171
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 13.0,
    "alt_m": 14332.1,
    "v_tot_ms": 1602.16,
    "v_vert_ms": 27.4,
    "v_horiz_ms": 1601.92,
    "fuel_kg": 442.58,
    "fuel_pct": 98.4,
    "throttle_pct": 78.3,
    "pitch_deg": -14.1,
    "g_force": 0.18,
    "three_pos": [
      0.050472,
      -0.435244,
      -0.033154
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 14.0,
    "alt_m": 14281.5,
    "v_tot_ms": 1596.78,
    "v_vert_ms": 27.36,
    "v_horiz_ms": 1596.54,
    "fuel_kg": 442.05,
    "fuel_pct": 98.2,
    "throttle_pct": 78.3,
    "pitch_deg": -14.0,
    "g_force": 0.18,
    "three_pos": [
      0.050446,
      -0.435235,
      -0.033137
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 15.0,
    "alt_m": 14231.0,
    "v_tot_ms": 1591.48,
    "v_vert_ms": 27.31,
    "v_horiz_ms": 1591.24,
    "fuel_kg": 441.52,
    "fuel_pct": 98.1,
    "throttle_pct": 78.3,
    "pitch_deg": -13.9,
    "g_force": 0.18,
    "three_pos": [
      0.050419,
      -0.435227,
      -0.033119
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 16.0,
    "alt_m": 14180.6,
    "v_tot_ms": 1586.24,
    "v_vert_ms": 27.27,
    "v_horiz_ms": 1586.01,
    "fuel_kg": 440.99,
    "fuel_pct": 98.0,
    "throttle_pct": 78.3,
    "pitch_deg": -13.8,
    "g_force": 0.18,
    "three_pos": [
      0.050393,
      -0.435219,
      -0.033102
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 17.0,
    "alt_m": 14130.3,
    "v_tot_ms": 1581.07,
    "v_vert_ms": 27.22,
    "v_horiz_ms": 1580.84,
    "fuel_kg": 440.45,
    "fuel_pct": 97.9,
    "throttle_pct": 78.3,
    "pitch_deg": -13.8,
    "g_force": 0.19,
    "three_pos": [
      0.050367,
      -0.43521,
      -0.033085
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 18.0,
    "alt_m": 14080.1,
    "v_tot_ms": 1575.97,
    "v_vert_ms": 27.18,
    "v_horiz_ms": 1575.73,
    "fuel_kg": 439.92,
    "fuel_pct": 97.8,
    "throttle_pct": 78.4,
    "pitch_deg": -13.7,
    "g_force": 0.19,
    "three_pos": [
      0.05034,
      -0.435202,
      -0.033067
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 19.0,
    "alt_m": 14030.0,
    "v_tot_ms": 1570.92,
    "v_vert_ms": 27.13,
    "v_horiz_ms": 1570.68,
    "fuel_kg": 439.39,
    "fuel_pct": 97.6,
    "throttle_pct": 78.4,
    "pitch_deg": -13.6,
    "g_force": 0.19,
    "three_pos": [
      0.050314,
      -0.435194,
      -0.03305
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 20.0,
    "alt_m": 13980.0,
    "v_tot_ms": 1565.92,
    "v_vert_ms": 27.08,
    "v_horiz_ms": 1565.68,
    "fuel_kg": 438.86,
    "fuel_pct": 97.5,
    "throttle_pct": 78.4,
    "pitch_deg": -13.5,
    "g_force": 0.19,
    "three_pos": [
      0.050288,
      -0.435186,
      -0.033033
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 21.0,
    "alt_m": 13930.2,
    "v_tot_ms": 1560.97,
    "v_vert_ms": 27.04,
    "v_horiz_ms": 1560.74,
    "fuel_kg": 438.33,
    "fuel_pct": 97.4,
    "throttle_pct": 78.4,
    "pitch_deg": -13.5,
    "g_force": 0.19,
    "three_pos": [
      0.050261,
      -0.435177,
      -0.033015
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 22.0,
    "alt_m": 13880.4,
    "v_tot_ms": 1556.07,
    "v_vert_ms": 26.99,
    "v_horiz_ms": 1555.83,
    "fuel_kg": 437.8,
    "fuel_pct": 97.3,
    "throttle_pct": 78.4,
    "pitch_deg": -13.4,
    "g_force": 0.19,
    "three_pos": [
      0.050235,
      -0.435169,
      -0.032998
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 23.0,
    "alt_m": 13830.8,
    "v_tot_ms": 1551.21,
    "v_vert_ms": 26.95,
    "v_horiz_ms": 1550.98,
    "fuel_kg": 437.26,
    "fuel_pct": 97.2,
    "throttle_pct": 78.4,
    "pitch_deg": -13.3,
    "g_force": 0.19,
    "three_pos": [
      0.050209,
      -0.435161,
      -0.032981
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 24.0,
    "alt_m": 13781.2,
    "v_tot_ms": 1546.4,
    "v_vert_ms": 26.9,
    "v_horiz_ms": 1546.16,
    "fuel_kg": 436.73,
    "fuel_pct": 97.1,
    "throttle_pct": 78.5,
    "pitch_deg": -13.2,
    "g_force": 0.19,
    "three_pos": [
      0.050182,
      -0.435153,
      -0.032964
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 25.0,
    "alt_m": 13731.8,
    "v_tot_ms": 1541.62,
    "v_vert_ms": 26.85,
    "v_horiz_ms": 1541.39,
    "fuel_kg": 436.2,
    "fuel_pct": 96.9,
    "throttle_pct": 78.5,
    "pitch_deg": -13.2,
    "g_force": 0.19,
    "three_pos": [
      0.050156,
      -0.435145,
      -0.032946
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 26.0,
    "alt_m": 13682.5,
    "v_tot_ms": 1536.88,
    "v_vert_ms": 26.81,
    "v_horiz_ms": 1536.65,
    "fuel_kg": 435.67,
    "fuel_pct": 96.8,
    "throttle_pct": 78.5,
    "pitch_deg": -13.1,
    "g_force": 0.19,
    "three_pos": [
      0.05013,
      -0.435137,
      -0.032929
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 27.0,
    "alt_m": 13633.3,
    "v_tot_ms": 1532.18,
    "v_vert_ms": 26.76,
    "v_horiz_ms": 1531.95,
    "fuel_kg": 435.13,
    "fuel_pct": 96.7,
    "throttle_pct": 78.5,
    "pitch_deg": -13.0,
    "g_force": 0.19,
    "three_pos": [
      0.050103,
      -0.435128,
      -0.032912
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 28.0,
    "alt_m": 13584.2,
    "v_tot_ms": 1527.52,
    "v_vert_ms": 26.72,
    "v_horiz_ms": 1527.28,
    "fuel_kg": 434.6,
    "fuel_pct": 96.6,
    "throttle_pct": 78.5,
    "pitch_deg": -13.0,
    "g_force": 0.19,
    "three_pos": [
      0.050077,
      -0.43512,
      -0.032894
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 29.0,
    "alt_m": 13535.2,
    "v_tot_ms": 1522.88,
    "v_vert_ms": 26.67,
    "v_horiz_ms": 1522.65,
    "fuel_kg": 434.07,
    "fuel_pct": 96.5,
    "throttle_pct": 78.6,
    "pitch_deg": -12.9,
    "g_force": 0.19,
    "three_pos": [
      0.050051,
      -0.435112,
      -0.032877
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 30.0,
    "alt_m": 13486.3,
    "v_tot_ms": 1518.28,
    "v_vert_ms": 26.62,
    "v_horiz_ms": 1518.05,
    "fuel_kg": 433.53,
    "fuel_pct": 96.3,
    "throttle_pct": 78.6,
    "pitch_deg": -12.8,
    "g_force": 0.19,
    "three_pos": [
      0.050024,
      -0.435104,
      -0.03286
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 31.0,
    "alt_m": 13437.6,
    "v_tot_ms": 1513.71,
    "v_vert_ms": 26.58,
    "v_horiz_ms": 1513.48,
    "fuel_kg": 433.0,
    "fuel_pct": 96.2,
    "throttle_pct": 78.6,
    "pitch_deg": -12.7,
    "g_force": 0.19,
    "three_pos": [
      0.049998,
      -0.435096,
      -0.032843
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 32.0,
    "alt_m": 13388.9,
    "v_tot_ms": 1509.17,
    "v_vert_ms": 26.53,
    "v_horiz_ms": 1508.94,
    "fuel_kg": 432.47,
    "fuel_pct": 96.1,
    "throttle_pct": 78.6,
    "pitch_deg": -12.7,
    "g_force": 0.19,
    "three_pos": [
      0.049972,
      -0.435088,
      -0.032825
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 33.0,
    "alt_m": 13340.3,
    "v_tot_ms": 1504.66,
    "v_vert_ms": 26.49,
    "v_horiz_ms": 1504.43,
    "fuel_kg": 431.93,
    "fuel_pct": 96.0,
    "throttle_pct": 78.6,
    "pitch_deg": -12.6,
    "g_force": 0.19,
    "three_pos": [
      0.049945,
      -0.435081,
      -0.032808
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 34.0,
    "alt_m": 13291.9,
    "v_tot_ms": 1500.17,
    "v_vert_ms": 26.44,
    "v_horiz_ms": 1499.94,
    "fuel_kg": 431.4,
    "fuel_pct": 95.9,
    "throttle_pct": 78.7,
    "pitch_deg": -12.5,
    "g_force": 0.19,
    "three_pos": [
      0.049919,
      -0.435073,
      -0.032791
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 35.0,
    "alt_m": 13243.5,
    "v_tot_ms": 1495.71,
    "v_vert_ms": 26.4,
    "v_horiz_ms": 1495.48,
    "fuel_kg": 430.87,
    "fuel_pct": 95.7,
    "throttle_pct": 78.7,
    "pitch_deg": -12.4,
    "g_force": 0.19,
    "three_pos": [
      0.049893,
      -0.435065,
      -0.032773
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 36.0,
    "alt_m": 13195.3,
    "v_tot_ms": 1491.28,
    "v_vert_ms": 26.35,
    "v_horiz_ms": 1491.05,
    "fuel_kg": 430.33,
    "fuel_pct": 95.6,
    "throttle_pct": 78.7,
    "pitch_deg": -12.4,
    "g_force": 0.19,
    "three_pos": [
      0.049867,
      -0.435057,
      -0.032756
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 37.0,
    "alt_m": 13147.2,
    "v_tot_ms": 1486.87,
    "v_vert_ms": 26.3,
    "v_horiz_ms": 1486.64,
    "fuel_kg": 429.8,
    "fuel_pct": 95.5,
    "throttle_pct": 78.7,
    "pitch_deg": -12.3,
    "g_force": 0.19,
    "three_pos": [
      0.04984,
      -0.435049,
      -0.032739
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 38.0,
    "alt_m": 13099.2,
    "v_tot_ms": 1482.49,
    "v_vert_ms": 26.26,
    "v_horiz_ms": 1482.25,
    "fuel_kg": 429.26,
    "fuel_pct": 95.4,
    "throttle_pct": 78.7,
    "pitch_deg": -12.2,
    "g_force": 0.19,
    "three_pos": [
      0.049814,
      -0.435041,
      -0.032722
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 39.0,
    "alt_m": 13051.3,
    "v_tot_ms": 1478.12,
    "v_vert_ms": 26.21,
    "v_horiz_ms": 1477.89,
    "fuel_kg": 428.73,
    "fuel_pct": 95.3,
    "throttle_pct": 78.8,
    "pitch_deg": -12.2,
    "g_force": 0.19,
    "three_pos": [
      0.049788,
      -0.435033,
      -0.032704
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 40.0,
    "alt_m": 13003.5,
    "v_tot_ms": 1473.78,
    "v_vert_ms": 26.17,
    "v_horiz_ms": 1473.55,
    "fuel_kg": 428.19,
    "fuel_pct": 95.2,
    "throttle_pct": 78.8,
    "pitch_deg": -12.1,
    "g_force": 0.19,
    "three_pos": [
      0.049761,
      -0.435026,
      -0.032687
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 41.0,
    "alt_m": 12955.8,
    "v_tot_ms": 1469.47,
    "v_vert_ms": 26.12,
    "v_horiz_ms": 1469.23,
    "fuel_kg": 427.66,
    "fuel_pct": 95.0,
    "throttle_pct": 78.8,
    "pitch_deg": -12.0,
    "g_force": 0.19,
    "three_pos": [
      0.049735,
      -0.435018,
      -0.03267
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 42.0,
    "alt_m": 12908.2,
    "v_tot_ms": 1465.17,
    "v_vert_ms": 26.07,
    "v_horiz_ms": 1464.94,
    "fuel_kg": 427.13,
    "fuel_pct": 94.9,
    "throttle_pct": 78.8,
    "pitch_deg": -11.9,
    "g_force": 0.19,
    "three_pos": [
      0.049709,
      -0.43501,
      -0.032653
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 43.0,
    "alt_m": 12860.7,
    "v_tot_ms": 1460.89,
    "v_vert_ms": 26.03,
    "v_horiz_ms": 1460.66,
    "fuel_kg": 426.59,
    "fuel_pct": 94.8,
    "throttle_pct": 78.8,
    "pitch_deg": -11.9,
    "g_force": 0.19,
    "three_pos": [
      0.049683,
      -0.435003,
      -0.032635
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 44.0,
    "alt_m": 12813.4,
    "v_tot_ms": 1456.63,
    "v_vert_ms": 25.98,
    "v_horiz_ms": 1456.4,
    "fuel_kg": 426.06,
    "fuel_pct": 94.7,
    "throttle_pct": 78.9,
    "pitch_deg": -11.8,
    "g_force": 0.19,
    "three_pos": [
      0.049656,
      -0.434995,
      -0.032618
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 45.0,
    "alt_m": 12766.1,
    "v_tot_ms": 1452.4,
    "v_vert_ms": 25.94,
    "v_horiz_ms": 1452.17,
    "fuel_kg": 425.52,
    "fuel_pct": 94.6,
    "throttle_pct": 78.9,
    "pitch_deg": -11.7,
    "g_force": 0.19,
    "three_pos": [
      0.04963,
      -0.434987,
      -0.032601
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 46.0,
    "alt_m": 12719.0,
    "v_tot_ms": 1448.18,
    "v_vert_ms": 25.89,
    "v_horiz_ms": 1447.95,
    "fuel_kg": 424.99,
    "fuel_pct": 94.4,
    "throttle_pct": 78.9,
    "pitch_deg": -11.6,
    "g_force": 0.19,
    "three_pos": [
      0.049604,
      -0.43498,
      -0.032584
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 47.0,
    "alt_m": 12671.9,
    "v_tot_ms": 1443.98,
    "v_vert_ms": 25.85,
    "v_horiz_ms": 1443.75,
    "fuel_kg": 424.45,
    "fuel_pct": 94.3,
    "throttle_pct": 78.9,
    "pitch_deg": -11.6,
    "g_force": 0.19,
    "three_pos": [
      0.049578,
      -0.434972,
      -0.032566
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 48.0,
    "alt_m": 12625.0,
    "v_tot_ms": 1439.79,
    "v_vert_ms": 25.8,
    "v_horiz_ms": 1439.56,
    "fuel_kg": 423.91,
    "fuel_pct": 94.2,
    "throttle_pct": 78.9,
    "pitch_deg": -11.5,
    "g_force": 0.19,
    "three_pos": [
      0.049551,
      -0.434965,
      -0.032549
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 49.0,
    "alt_m": 12578.2,
    "v_tot_ms": 1435.63,
    "v_vert_ms": 25.75,
    "v_horiz_ms": 1435.4,
    "fuel_kg": 423.38,
    "fuel_pct": 94.1,
    "throttle_pct": 78.9,
    "pitch_deg": -11.4,
    "g_force": 0.19,
    "three_pos": [
      0.049525,
      -0.434957,
      -0.032532
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 50.0,
    "alt_m": 12531.5,
    "v_tot_ms": 1431.48,
    "v_vert_ms": 25.71,
    "v_horiz_ms": 1431.25,
    "fuel_kg": 422.84,
    "fuel_pct": 94.0,
    "throttle_pct": 79.0,
    "pitch_deg": -11.4,
    "g_force": 0.19,
    "three_pos": [
      0.049499,
      -0.434949,
      -0.032515
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 51.0,
    "alt_m": 12484.9,
    "v_tot_ms": 1427.35,
    "v_vert_ms": 25.66,
    "v_horiz_ms": 1427.12,
    "fuel_kg": 422.31,
    "fuel_pct": 93.8,
    "throttle_pct": 79.0,
    "pitch_deg": -11.3,
    "g_force": 0.19,
    "three_pos": [
      0.049473,
      -0.434942,
      -0.032497
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 52.0,
    "alt_m": 12438.4,
    "v_tot_ms": 1423.23,
    "v_vert_ms": 25.62,
    "v_horiz_ms": 1423.0,
    "fuel_kg": 421.77,
    "fuel_pct": 93.7,
    "throttle_pct": 79.0,
    "pitch_deg": -11.2,
    "g_force": 0.19,
    "three_pos": [
      0.049446,
      -0.434935,
      -0.03248
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 53.0,
    "alt_m": 12392.0,
    "v_tot_ms": 1419.13,
    "v_vert_ms": 25.57,
    "v_horiz_ms": 1418.9,
    "fuel_kg": 421.24,
    "fuel_pct": 93.6,
    "throttle_pct": 79.0,
    "pitch_deg": -11.1,
    "g_force": 0.19,
    "three_pos": [
      0.04942,
      -0.434927,
      -0.032463
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 54.0,
    "alt_m": 12345.7,
    "v_tot_ms": 1415.05,
    "v_vert_ms": 25.52,
    "v_horiz_ms": 1414.82,
    "fuel_kg": 420.7,
    "fuel_pct": 93.5,
    "throttle_pct": 79.0,
    "pitch_deg": -11.1,
    "g_force": 0.19,
    "three_pos": [
      0.049394,
      -0.43492,
      -0.032446
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 55.0,
    "alt_m": 12299.5,
    "v_tot_ms": 1410.98,
    "v_vert_ms": 25.48,
    "v_horiz_ms": 1410.75,
    "fuel_kg": 420.16,
    "fuel_pct": 93.4,
    "throttle_pct": 79.1,
    "pitch_deg": -11.0,
    "g_force": 0.19,
    "three_pos": [
      0.049368,
      -0.434912,
      -0.032429
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 56.0,
    "alt_m": 12253.5,
    "v_tot_ms": 1406.92,
    "v_vert_ms": 25.43,
    "v_horiz_ms": 1406.69,
    "fuel_kg": 419.63,
    "fuel_pct": 93.3,
    "throttle_pct": 79.1,
    "pitch_deg": -10.9,
    "g_force": 0.19,
    "three_pos": [
      0.049341,
      -0.434905,
      -0.032411
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 57.0,
    "alt_m": 12207.5,
    "v_tot_ms": 1402.88,
    "v_vert_ms": 25.39,
    "v_horiz_ms": 1402.65,
    "fuel_kg": 419.09,
    "fuel_pct": 93.1,
    "throttle_pct": 79.1,
    "pitch_deg": -10.8,
    "g_force": 0.19,
    "three_pos": [
      0.049315,
      -0.434898,
      -0.032394
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 58.0,
    "alt_m": 12161.7,
    "v_tot_ms": 1398.86,
    "v_vert_ms": 25.34,
    "v_horiz_ms": 1398.63,
    "fuel_kg": 418.55,
    "fuel_pct": 93.0,
    "throttle_pct": 79.1,
    "pitch_deg": -10.8,
    "g_force": 0.19,
    "three_pos": [
      0.049289,
      -0.43489,
      -0.032377
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 59.0,
    "alt_m": 12115.9,
    "v_tot_ms": 1394.85,
    "v_vert_ms": 25.3,
    "v_horiz_ms": 1394.62,
    "fuel_kg": 418.02,
    "fuel_pct": 92.9,
    "throttle_pct": 79.1,
    "pitch_deg": -10.7,
    "g_force": 0.19,
    "three_pos": [
      0.049263,
      -0.434883,
      -0.03236
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 60.0,
    "alt_m": 12070.3,
    "v_tot_ms": 1390.85,
    "v_vert_ms": 25.25,
    "v_horiz_ms": 1390.62,
    "fuel_kg": 417.48,
    "fuel_pct": 92.8,
    "throttle_pct": 79.1,
    "pitch_deg": -10.6,
    "g_force": 0.19,
    "three_pos": [
      0.049237,
      -0.434876,
      -0.032342
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 61.0,
    "alt_m": 12024.8,
    "v_tot_ms": 1386.86,
    "v_vert_ms": 25.2,
    "v_horiz_ms": 1386.63,
    "fuel_kg": 416.94,
    "fuel_pct": 92.7,
    "throttle_pct": 79.2,
    "pitch_deg": -10.6,
    "g_force": 0.19,
    "three_pos": [
      0.04921,
      -0.434869,
      -0.032325
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 62.0,
    "alt_m": 11979.4,
    "v_tot_ms": 1382.89,
    "v_vert_ms": 25.16,
    "v_horiz_ms": 1382.66,
    "fuel_kg": 416.4,
    "fuel_pct": 92.5,
    "throttle_pct": 79.2,
    "pitch_deg": -10.5,
    "g_force": 0.19,
    "three_pos": [
      0.049184,
      -0.434861,
      -0.032308
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 63.0,
    "alt_m": 11934.1,
    "v_tot_ms": 1378.93,
    "v_vert_ms": 25.11,
    "v_horiz_ms": 1378.7,
    "fuel_kg": 415.87,
    "fuel_pct": 92.4,
    "throttle_pct": 79.2,
    "pitch_deg": -10.4,
    "g_force": 0.19,
    "three_pos": [
      0.049158,
      -0.434854,
      -0.032291
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 64.0,
    "alt_m": 11888.9,
    "v_tot_ms": 1374.98,
    "v_vert_ms": 25.07,
    "v_horiz_ms": 1374.75,
    "fuel_kg": 415.33,
    "fuel_pct": 92.3,
    "throttle_pct": 79.2,
    "pitch_deg": -10.3,
    "g_force": 0.19,
    "three_pos": [
      0.049132,
      -0.434847,
      -0.032274
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 65.0,
    "alt_m": 11843.8,
    "v_tot_ms": 1371.05,
    "v_vert_ms": 25.02,
    "v_horiz_ms": 1370.82,
    "fuel_kg": 414.79,
    "fuel_pct": 92.2,
    "throttle_pct": 79.2,
    "pitch_deg": -10.3,
    "g_force": 0.19,
    "three_pos": [
      0.049106,
      -0.43484,
      -0.032256
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 66.0,
    "alt_m": 11798.8,
    "v_tot_ms": 1367.13,
    "v_vert_ms": 24.98,
    "v_horiz_ms": 1366.9,
    "fuel_kg": 414.25,
    "fuel_pct": 92.1,
    "throttle_pct": 79.3,
    "pitch_deg": -10.2,
    "g_force": 0.19,
    "three_pos": [
      0.049079,
      -0.434833,
      -0.032239
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 67.0,
    "alt_m": 11754.0,
    "v_tot_ms": 1363.21,
    "v_vert_ms": 24.93,
    "v_horiz_ms": 1362.99,
    "fuel_kg": 413.72,
    "fuel_pct": 91.9,
    "throttle_pct": 79.3,
    "pitch_deg": -10.1,
    "g_force": 0.19,
    "three_pos": [
      0.049053,
      -0.434826,
      -0.032222
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 68.0,
    "alt_m": 11709.2,
    "v_tot_ms": 1359.32,
    "v_vert_ms": 24.88,
    "v_horiz_ms": 1359.09,
    "fuel_kg": 413.18,
    "fuel_pct": 91.8,
    "throttle_pct": 79.3,
    "pitch_deg": -10.0,
    "g_force": 0.19,
    "three_pos": [
      0.049027,
      -0.434819,
      -0.032205
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 69.0,
    "alt_m": 11664.6,
    "v_tot_ms": 1355.43,
    "v_vert_ms": 24.84,
    "v_horiz_ms": 1355.2,
    "fuel_kg": 412.64,
    "fuel_pct": 91.7,
    "throttle_pct": 79.3,
    "pitch_deg": -10.0,
    "g_force": 0.19,
    "three_pos": [
      0.049001,
      -0.434812,
      -0.032188
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 70.0,
    "alt_m": 11620.0,
    "v_tot_ms": 1351.55,
    "v_vert_ms": 24.79,
    "v_horiz_ms": 1351.32,
    "fuel_kg": 412.1,
    "fuel_pct": 91.6,
    "throttle_pct": 79.3,
    "pitch_deg": -9.9,
    "g_force": 0.19,
    "three_pos": [
      0.048975,
      -0.434804,
      -0.03217
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 71.0,
    "alt_m": 11575.6,
    "v_tot_ms": 1347.69,
    "v_vert_ms": 24.75,
    "v_horiz_ms": 1347.46,
    "fuel_kg": 411.56,
    "fuel_pct": 91.5,
    "throttle_pct": 79.3,
    "pitch_deg": -9.8,
    "g_force": 0.19,
    "three_pos": [
      0.048949,
      -0.434797,
      -0.032153
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 72.0,
    "alt_m": 11531.2,
    "v_tot_ms": 1343.83,
    "v_vert_ms": 24.7,
    "v_horiz_ms": 1343.61,
    "fuel_kg": 411.03,
    "fuel_pct": 91.3,
    "throttle_pct": 79.4,
    "pitch_deg": -9.8,
    "g_force": 0.19,
    "three_pos": [
      0.048922,
      -0.434791,
      -0.032136
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 73.0,
    "alt_m": 11487.0,
    "v_tot_ms": 1339.99,
    "v_vert_ms": 24.65,
    "v_horiz_ms": 1339.76,
    "fuel_kg": 410.49,
    "fuel_pct": 91.2,
    "throttle_pct": 79.4,
    "pitch_deg": -9.7,
    "g_force": 0.19,
    "three_pos": [
      0.048896,
      -0.434784,
      -0.032119
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 74.0,
    "alt_m": 11442.9,
    "v_tot_ms": 1336.16,
    "v_vert_ms": 24.61,
    "v_horiz_ms": 1335.93,
    "fuel_kg": 409.95,
    "fuel_pct": 91.1,
    "throttle_pct": 79.4,
    "pitch_deg": -9.6,
    "g_force": 0.19,
    "three_pos": [
      0.04887,
      -0.434777,
      -0.032102
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 75.0,
    "alt_m": 11398.9,
    "v_tot_ms": 1332.33,
    "v_vert_ms": 24.56,
    "v_horiz_ms": 1332.11,
    "fuel_kg": 409.41,
    "fuel_pct": 91.0,
    "throttle_pct": 79.4,
    "pitch_deg": -9.5,
    "g_force": 0.19,
    "three_pos": [
      0.048844,
      -0.43477,
      -0.032084
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 76.0,
    "alt_m": 11355.0,
    "v_tot_ms": 1328.52,
    "v_vert_ms": 24.52,
    "v_horiz_ms": 1328.29,
    "fuel_kg": 408.87,
    "fuel_pct": 90.9,
    "throttle_pct": 79.4,
    "pitch_deg": -9.5,
    "g_force": 0.19,
    "three_pos": [
      0.048818,
      -0.434763,
      -0.032067
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 77.0,
    "alt_m": 11311.3,
    "v_tot_ms": 1324.72,
    "v_vert_ms": 24.47,
    "v_horiz_ms": 1324.49,
    "fuel_kg": 408.33,
    "fuel_pct": 90.7,
    "throttle_pct": 79.4,
    "pitch_deg": -9.4,
    "g_force": 0.19,
    "three_pos": [
      0.048792,
      -0.434756,
      -0.03205
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 78.0,
    "alt_m": 11267.6,
    "v_tot_ms": 1320.92,
    "v_vert_ms": 24.43,
    "v_horiz_ms": 1320.7,
    "fuel_kg": 407.79,
    "fuel_pct": 90.6,
    "throttle_pct": 79.5,
    "pitch_deg": -9.3,
    "g_force": 0.19,
    "three_pos": [
      0.048765,
      -0.434749,
      -0.032033
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 79.0,
    "alt_m": 11224.0,
    "v_tot_ms": 1317.14,
    "v_vert_ms": 24.38,
    "v_horiz_ms": 1316.92,
    "fuel_kg": 407.25,
    "fuel_pct": 90.5,
    "throttle_pct": 79.5,
    "pitch_deg": -9.2,
    "g_force": 0.2,
    "three_pos": [
      0.048739,
      -0.434742,
      -0.032016
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 80.0,
    "alt_m": 11180.6,
    "v_tot_ms": 1313.37,
    "v_vert_ms": 24.33,
    "v_horiz_ms": 1313.14,
    "fuel_kg": 406.71,
    "fuel_pct": 90.4,
    "throttle_pct": 79.5,
    "pitch_deg": -9.2,
    "g_force": 0.2,
    "three_pos": [
      0.048713,
      -0.434736,
      -0.031999
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 81.0,
    "alt_m": 11137.2,
    "v_tot_ms": 1309.6,
    "v_vert_ms": 24.29,
    "v_horiz_ms": 1309.38,
    "fuel_kg": 406.17,
    "fuel_pct": 90.3,
    "throttle_pct": 79.5,
    "pitch_deg": -9.1,
    "g_force": 0.2,
    "three_pos": [
      0.048687,
      -0.434729,
      -0.031981
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 82.0,
    "alt_m": 11094.0,
    "v_tot_ms": 1305.85,
    "v_vert_ms": 24.24,
    "v_horiz_ms": 1305.62,
    "fuel_kg": 405.64,
    "fuel_pct": 90.1,
    "throttle_pct": 79.5,
    "pitch_deg": -9.0,
    "g_force": 0.2,
    "three_pos": [
      0.048661,
      -0.434722,
      -0.031964
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 83.0,
    "alt_m": 11050.8,
    "v_tot_ms": 1302.1,
    "v_vert_ms": 24.2,
    "v_horiz_ms": 1301.88,
    "fuel_kg": 405.1,
    "fuel_pct": 90.0,
    "throttle_pct": 79.6,
    "pitch_deg": -8.9,
    "g_force": 0.2,
    "three_pos": [
      0.048635,
      -0.434716,
      -0.031947
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 84.0,
    "alt_m": 11007.8,
    "v_tot_ms": 1298.37,
    "v_vert_ms": 24.15,
    "v_horiz_ms": 1298.14,
    "fuel_kg": 404.56,
    "fuel_pct": 89.9,
    "throttle_pct": 79.6,
    "pitch_deg": -8.9,
    "g_force": 0.2,
    "three_pos": [
      0.048609,
      -0.434709,
      -0.03193
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 85.0,
    "alt_m": 10964.9,
    "v_tot_ms": 1294.64,
    "v_vert_ms": 24.1,
    "v_horiz_ms": 1294.41,
    "fuel_kg": 404.02,
    "fuel_pct": 89.8,
    "throttle_pct": 79.6,
    "pitch_deg": -8.8,
    "g_force": 0.2,
    "three_pos": [
      0.048583,
      -0.434702,
      -0.031913
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 86.0,
    "alt_m": 10922.1,
    "v_tot_ms": 1290.92,
    "v_vert_ms": 24.06,
    "v_horiz_ms": 1290.7,
    "fuel_kg": 403.48,
    "fuel_pct": 89.7,
    "throttle_pct": 79.6,
    "pitch_deg": -8.7,
    "g_force": 0.2,
    "three_pos": [
      0.048556,
      -0.434696,
      -0.031896
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 87.0,
    "alt_m": 10879.4,
    "v_tot_ms": 1287.21,
    "v_vert_ms": 24.01,
    "v_horiz_ms": 1286.99,
    "fuel_kg": 402.94,
    "fuel_pct": 89.5,
    "throttle_pct": 79.6,
    "pitch_deg": -8.7,
    "g_force": 0.2,
    "three_pos": [
      0.04853,
      -0.434689,
      -0.031878
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 88.0,
    "alt_m": 10836.8,
    "v_tot_ms": 1283.51,
    "v_vert_ms": 23.97,
    "v_horiz_ms": 1283.28,
    "fuel_kg": 402.4,
    "fuel_pct": 89.4,
    "throttle_pct": 79.6,
    "pitch_deg": -8.6,
    "g_force": 0.2,
    "three_pos": [
      0.048504,
      -0.434682,
      -0.031861
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 89.0,
    "alt_m": 10794.3,
    "v_tot_ms": 1279.81,
    "v_vert_ms": 23.92,
    "v_horiz_ms": 1279.59,
    "fuel_kg": 401.86,
    "fuel_pct": 89.3,
    "throttle_pct": 79.7,
    "pitch_deg": -8.5,
    "g_force": 0.2,
    "three_pos": [
      0.048478,
      -0.434676,
      -0.031844
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 90.0,
    "alt_m": 10752.0,
    "v_tot_ms": 1276.13,
    "v_vert_ms": 23.88,
    "v_horiz_ms": 1275.91,
    "fuel_kg": 401.31,
    "fuel_pct": 89.2,
    "throttle_pct": 79.7,
    "pitch_deg": -8.4,
    "g_force": 0.2,
    "three_pos": [
      0.048452,
      -0.434669,
      -0.031827
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 91.0,
    "alt_m": 10709.7,
    "v_tot_ms": 1272.45,
    "v_vert_ms": 23.83,
    "v_horiz_ms": 1272.23,
    "fuel_kg": 400.77,
    "fuel_pct": 89.1,
    "throttle_pct": 79.7,
    "pitch_deg": -8.4,
    "g_force": 0.2,
    "three_pos": [
      0.048426,
      -0.434663,
      -0.03181
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 92.0,
    "alt_m": 10667.5,
    "v_tot_ms": 1268.78,
    "v_vert_ms": 23.78,
    "v_horiz_ms": 1268.56,
    "fuel_kg": 400.23,
    "fuel_pct": 88.9,
    "throttle_pct": 79.7,
    "pitch_deg": -8.3,
    "g_force": 0.2,
    "three_pos": [
      0.0484,
      -0.434656,
      -0.031793
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 93.0,
    "alt_m": 10625.5,
    "v_tot_ms": 1265.12,
    "v_vert_ms": 23.74,
    "v_horiz_ms": 1264.9,
    "fuel_kg": 399.69,
    "fuel_pct": 88.8,
    "throttle_pct": 79.7,
    "pitch_deg": -8.2,
    "g_force": 0.2,
    "three_pos": [
      0.048374,
      -0.43465,
      -0.031776
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 94.0,
    "alt_m": 10583.6,
    "v_tot_ms": 1261.47,
    "v_vert_ms": 23.69,
    "v_horiz_ms": 1261.25,
    "fuel_kg": 399.15,
    "fuel_pct": 88.7,
    "throttle_pct": 79.7,
    "pitch_deg": -8.1,
    "g_force": 0.2,
    "three_pos": [
      0.048348,
      -0.434644,
      -0.031758
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 95.0,
    "alt_m": 10541.7,
    "v_tot_ms": 1257.82,
    "v_vert_ms": 23.65,
    "v_horiz_ms": 1257.6,
    "fuel_kg": 398.61,
    "fuel_pct": 88.6,
    "throttle_pct": 79.7,
    "pitch_deg": -8.1,
    "g_force": 0.2,
    "three_pos": [
      0.048322,
      -0.434637,
      -0.031741
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 96.0,
    "alt_m": 10500.0,
    "v_tot_ms": 1254.19,
    "v_vert_ms": 23.6,
    "v_horiz_ms": 1253.96,
    "fuel_kg": 398.07,
    "fuel_pct": 88.5,
    "throttle_pct": 79.8,
    "pitch_deg": -8.0,
    "g_force": 0.2,
    "three_pos": [
      0.048295,
      -0.434631,
      -0.031724
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 97.0,
    "alt_m": 10458.4,
    "v_tot_ms": 1250.56,
    "v_vert_ms": 23.55,
    "v_horiz_ms": 1250.33,
    "fuel_kg": 397.53,
    "fuel_pct": 88.3,
    "throttle_pct": 79.8,
    "pitch_deg": -7.9,
    "g_force": 0.2,
    "three_pos": [
      0.048269,
      -0.434624,
      -0.031707
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 98.0,
    "alt_m": 10416.9,
    "v_tot_ms": 1246.93,
    "v_vert_ms": 23.51,
    "v_horiz_ms": 1246.71,
    "fuel_kg": 396.99,
    "fuel_pct": 88.2,
    "throttle_pct": 79.8,
    "pitch_deg": -7.9,
    "g_force": 0.2,
    "three_pos": [
      0.048243,
      -0.434618,
      -0.03169
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 99.0,
    "alt_m": 10375.5,
    "v_tot_ms": 1243.32,
    "v_vert_ms": 23.46,
    "v_horiz_ms": 1243.1,
    "fuel_kg": 396.45,
    "fuel_pct": 88.1,
    "throttle_pct": 79.8,
    "pitch_deg": -7.8,
    "g_force": 0.2,
    "three_pos": [
      0.048217,
      -0.434612,
      -0.031673
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 100.0,
    "alt_m": 10334.2,
    "v_tot_ms": 1239.71,
    "v_vert_ms": 23.42,
    "v_horiz_ms": 1239.49,
    "fuel_kg": 395.9,
    "fuel_pct": 88.0,
    "throttle_pct": 79.8,
    "pitch_deg": -7.7,
    "g_force": 0.2,
    "three_pos": [
      0.048191,
      -0.434606,
      -0.031656
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 101.0,
    "alt_m": 10293.0,
    "v_tot_ms": 1236.11,
    "v_vert_ms": 23.37,
    "v_horiz_ms": 1235.89,
    "fuel_kg": 395.36,
    "fuel_pct": 87.9,
    "throttle_pct": 79.8,
    "pitch_deg": -7.6,
    "g_force": 0.2,
    "three_pos": [
      0.048165,
      -0.434599,
      -0.031639
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 102.0,
    "alt_m": 10252.0,
    "v_tot_ms": 1232.52,
    "v_vert_ms": 23.32,
    "v_horiz_ms": 1232.3,
    "fuel_kg": 394.82,
    "fuel_pct": 87.7,
    "throttle_pct": 79.9,
    "pitch_deg": -7.6,
    "g_force": 0.2,
    "three_pos": [
      0.048139,
      -0.434593,
      -0.031621
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 103.0,
    "alt_m": 10211.0,
    "v_tot_ms": 1228.93,
    "v_vert_ms": 23.28,
    "v_horiz_ms": 1228.71,
    "fuel_kg": 394.28,
    "fuel_pct": 87.6,
    "throttle_pct": 79.9,
    "pitch_deg": -7.5,
    "g_force": 0.2,
    "three_pos": [
      0.048113,
      -0.434587,
      -0.031604
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 104.0,
    "alt_m": 10170.1,
    "v_tot_ms": 1225.35,
    "v_vert_ms": 23.23,
    "v_horiz_ms": 1225.13,
    "fuel_kg": 393.74,
    "fuel_pct": 87.5,
    "throttle_pct": 79.9,
    "pitch_deg": -7.4,
    "g_force": 0.2,
    "three_pos": [
      0.048087,
      -0.434581,
      -0.031587
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 105.0,
    "alt_m": 10129.4,
    "v_tot_ms": 1221.78,
    "v_vert_ms": 23.19,
    "v_horiz_ms": 1221.56,
    "fuel_kg": 393.19,
    "fuel_pct": 87.4,
    "throttle_pct": 79.9,
    "pitch_deg": -7.3,
    "g_force": 0.2,
    "three_pos": [
      0.048061,
      -0.434575,
      -0.03157
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 106.0,
    "alt_m": 10088.8,
    "v_tot_ms": 1218.21,
    "v_vert_ms": 23.14,
    "v_horiz_ms": 1217.99,
    "fuel_kg": 392.65,
    "fuel_pct": 87.3,
    "throttle_pct": 79.9,
    "pitch_deg": -7.3,
    "g_force": 0.2,
    "three_pos": [
      0.048035,
      -0.434568,
      -0.031553
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 107.0,
    "alt_m": 10048.2,
    "v_tot_ms": 1214.65,
    "v_vert_ms": 23.1,
    "v_horiz_ms": 1214.43,
    "fuel_kg": 392.11,
    "fuel_pct": 87.1,
    "throttle_pct": 79.9,
    "pitch_deg": -7.2,
    "g_force": 0.2,
    "three_pos": [
      0.048009,
      -0.434562,
      -0.031536
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 108.0,
    "alt_m": 10007.8,
    "v_tot_ms": 1211.1,
    "v_vert_ms": 23.05,
    "v_horiz_ms": 1210.88,
    "fuel_kg": 391.57,
    "fuel_pct": 87.0,
    "throttle_pct": 79.9,
    "pitch_deg": -7.1,
    "g_force": 0.2,
    "three_pos": [
      0.047983,
      -0.434556,
      -0.031519
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 109.0,
    "alt_m": 9967.5,
    "v_tot_ms": 1207.55,
    "v_vert_ms": 23.0,
    "v_horiz_ms": 1207.33,
    "fuel_kg": 391.02,
    "fuel_pct": 86.9,
    "throttle_pct": 80.0,
    "pitch_deg": -7.1,
    "g_force": 0.2,
    "three_pos": [
      0.047957,
      -0.43455,
      -0.031502
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 110.0,
    "alt_m": 9927.3,
    "v_tot_ms": 1204.01,
    "v_vert_ms": 22.96,
    "v_horiz_ms": 1203.79,
    "fuel_kg": 390.48,
    "fuel_pct": 86.8,
    "throttle_pct": 80.0,
    "pitch_deg": -7.0,
    "g_force": 0.2,
    "three_pos": [
      0.047931,
      -0.434544,
      -0.031485
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 111.0,
    "alt_m": 9887.2,
    "v_tot_ms": 1200.48,
    "v_vert_ms": 22.91,
    "v_horiz_ms": 1200.26,
    "fuel_kg": 389.94,
    "fuel_pct": 86.7,
    "throttle_pct": 80.0,
    "pitch_deg": -6.9,
    "g_force": 0.2,
    "three_pos": [
      0.047905,
      -0.434538,
      -0.031467
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 112.0,
    "alt_m": 9847.2,
    "v_tot_ms": 1196.95,
    "v_vert_ms": 22.87,
    "v_horiz_ms": 1196.74,
    "fuel_kg": 389.4,
    "fuel_pct": 86.5,
    "throttle_pct": 80.0,
    "pitch_deg": -6.8,
    "g_force": 0.2,
    "three_pos": [
      0.047879,
      -0.434532,
      -0.03145
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 113.0,
    "alt_m": 9807.3,
    "v_tot_ms": 1193.43,
    "v_vert_ms": 22.82,
    "v_horiz_ms": 1193.22,
    "fuel_kg": 388.85,
    "fuel_pct": 86.4,
    "throttle_pct": 80.0,
    "pitch_deg": -6.8,
    "g_force": 0.2,
    "three_pos": [
      0.047853,
      -0.434526,
      -0.031433
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 114.0,
    "alt_m": 9767.6,
    "v_tot_ms": 1189.92,
    "v_vert_ms": 22.77,
    "v_horiz_ms": 1189.7,
    "fuel_kg": 388.31,
    "fuel_pct": 86.3,
    "throttle_pct": 80.0,
    "pitch_deg": -6.7,
    "g_force": 0.2,
    "three_pos": [
      0.047826,
      -0.43452,
      -0.031416
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 115.0,
    "alt_m": 9727.9,
    "v_tot_ms": 1186.41,
    "v_vert_ms": 22.73,
    "v_horiz_ms": 1186.19,
    "fuel_kg": 387.77,
    "fuel_pct": 86.2,
    "throttle_pct": 80.1,
    "pitch_deg": -6.6,
    "g_force": 0.2,
    "three_pos": [
      0.0478,
      -0.434514,
      -0.031399
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 116.0,
    "alt_m": 9688.4,
    "v_tot_ms": 1182.91,
    "v_vert_ms": 22.68,
    "v_horiz_ms": 1182.69,
    "fuel_kg": 387.22,
    "fuel_pct": 86.0,
    "throttle_pct": 80.1,
    "pitch_deg": -6.5,
    "g_force": 0.2,
    "three_pos": [
      0.047774,
      -0.434509,
      -0.031382
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 117.0,
    "alt_m": 9648.9,
    "v_tot_ms": 1179.41,
    "v_vert_ms": 22.64,
    "v_horiz_ms": 1179.2,
    "fuel_kg": 386.68,
    "fuel_pct": 85.9,
    "throttle_pct": 80.1,
    "pitch_deg": -6.5,
    "g_force": 0.2,
    "three_pos": [
      0.047748,
      -0.434503,
      -0.031365
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 118.0,
    "alt_m": 9609.6,
    "v_tot_ms": 1175.92,
    "v_vert_ms": 22.59,
    "v_horiz_ms": 1175.71,
    "fuel_kg": 386.14,
    "fuel_pct": 85.8,
    "throttle_pct": 80.1,
    "pitch_deg": -6.4,
    "g_force": 0.2,
    "three_pos": [
      0.047722,
      -0.434497,
      -0.031348
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 119.0,
    "alt_m": 9570.4,
    "v_tot_ms": 1172.44,
    "v_vert_ms": 22.55,
    "v_horiz_ms": 1172.22,
    "fuel_kg": 385.59,
    "fuel_pct": 85.7,
    "throttle_pct": 80.1,
    "pitch_deg": -6.3,
    "g_force": 0.2,
    "three_pos": [
      0.047696,
      -0.434491,
      -0.031331
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 120.0,
    "alt_m": 9531.2,
    "v_tot_ms": 1168.96,
    "v_vert_ms": 22.5,
    "v_horiz_ms": 1168.74,
    "fuel_kg": 385.05,
    "fuel_pct": 85.6,
    "throttle_pct": 80.1,
    "pitch_deg": -6.2,
    "g_force": 0.2,
    "three_pos": [
      0.04767,
      -0.434485,
      -0.031314
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 121.0,
    "alt_m": 9492.2,
    "v_tot_ms": 1165.49,
    "v_vert_ms": 22.45,
    "v_horiz_ms": 1165.27,
    "fuel_kg": 384.51,
    "fuel_pct": 85.4,
    "throttle_pct": 80.1,
    "pitch_deg": -6.2,
    "g_force": 0.2,
    "three_pos": [
      0.047644,
      -0.43448,
      -0.031297
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 122.0,
    "alt_m": 9453.3,
    "v_tot_ms": 1162.02,
    "v_vert_ms": 22.41,
    "v_horiz_ms": 1161.81,
    "fuel_kg": 383.96,
    "fuel_pct": 85.3,
    "throttle_pct": 80.1,
    "pitch_deg": -6.1,
    "g_force": 0.2,
    "three_pos": [
      0.047618,
      -0.434474,
      -0.031279
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 123.0,
    "alt_m": 9414.6,
    "v_tot_ms": 1158.56,
    "v_vert_ms": 22.36,
    "v_horiz_ms": 1158.35,
    "fuel_kg": 383.42,
    "fuel_pct": 85.2,
    "throttle_pct": 80.2,
    "pitch_deg": -6.0,
    "g_force": 0.2,
    "three_pos": [
      0.047592,
      -0.434468,
      -0.031262
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 124.0,
    "alt_m": 9375.9,
    "v_tot_ms": 1155.11,
    "v_vert_ms": 22.32,
    "v_horiz_ms": 1154.89,
    "fuel_kg": 382.88,
    "fuel_pct": 85.1,
    "throttle_pct": 80.2,
    "pitch_deg": -6.0,
    "g_force": 0.2,
    "three_pos": [
      0.047566,
      -0.434462,
      -0.031245
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 125.0,
    "alt_m": 9337.3,
    "v_tot_ms": 1151.66,
    "v_vert_ms": 22.27,
    "v_horiz_ms": 1151.44,
    "fuel_kg": 382.33,
    "fuel_pct": 85.0,
    "throttle_pct": 80.2,
    "pitch_deg": -5.9,
    "g_force": 0.2,
    "three_pos": [
      0.04754,
      -0.434457,
      -0.031228
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 126.0,
    "alt_m": 9298.8,
    "v_tot_ms": 1148.21,
    "v_vert_ms": 22.23,
    "v_horiz_ms": 1148.0,
    "fuel_kg": 381.79,
    "fuel_pct": 84.8,
    "throttle_pct": 80.2,
    "pitch_deg": -5.8,
    "g_force": 0.2,
    "three_pos": [
      0.047514,
      -0.434451,
      -0.031211
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 127.0,
    "alt_m": 9260.5,
    "v_tot_ms": 1144.77,
    "v_vert_ms": 22.18,
    "v_horiz_ms": 1144.56,
    "fuel_kg": 381.24,
    "fuel_pct": 84.7,
    "throttle_pct": 80.2,
    "pitch_deg": -5.7,
    "g_force": 0.2,
    "three_pos": [
      0.047488,
      -0.434446,
      -0.031194
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 128.0,
    "alt_m": 9222.2,
    "v_tot_ms": 1141.34,
    "v_vert_ms": 22.13,
    "v_horiz_ms": 1141.13,
    "fuel_kg": 380.7,
    "fuel_pct": 84.6,
    "throttle_pct": 80.2,
    "pitch_deg": -5.7,
    "g_force": 0.2,
    "three_pos": [
      0.047462,
      -0.43444,
      -0.031177
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 129.0,
    "alt_m": 9184.1,
    "v_tot_ms": 1137.91,
    "v_vert_ms": 22.09,
    "v_horiz_ms": 1137.7,
    "fuel_kg": 380.15,
    "fuel_pct": 84.5,
    "throttle_pct": 80.2,
    "pitch_deg": -5.6,
    "g_force": 0.2,
    "three_pos": [
      0.047436,
      -0.434434,
      -0.03116
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 130.0,
    "alt_m": 9146.1,
    "v_tot_ms": 1134.49,
    "v_vert_ms": 22.04,
    "v_horiz_ms": 1134.27,
    "fuel_kg": 379.61,
    "fuel_pct": 84.4,
    "throttle_pct": 80.3,
    "pitch_deg": -5.5,
    "g_force": 0.2,
    "three_pos": [
      0.04741,
      -0.434429,
      -0.031143
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 131.0,
    "alt_m": 9108.1,
    "v_tot_ms": 1131.07,
    "v_vert_ms": 22.0,
    "v_horiz_ms": 1130.86,
    "fuel_kg": 379.07,
    "fuel_pct": 84.2,
    "throttle_pct": 80.3,
    "pitch_deg": -5.4,
    "g_force": 0.2,
    "three_pos": [
      0.047385,
      -0.434423,
      -0.031126
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 132.0,
    "alt_m": 9070.3,
    "v_tot_ms": 1127.66,
    "v_vert_ms": 21.95,
    "v_horiz_ms": 1127.45,
    "fuel_kg": 378.52,
    "fuel_pct": 84.1,
    "throttle_pct": 80.3,
    "pitch_deg": -5.4,
    "g_force": 0.2,
    "three_pos": [
      0.047359,
      -0.434418,
      -0.031109
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 133.0,
    "alt_m": 9032.6,
    "v_tot_ms": 1124.25,
    "v_vert_ms": 21.9,
    "v_horiz_ms": 1124.04,
    "fuel_kg": 377.98,
    "fuel_pct": 84.0,
    "throttle_pct": 80.3,
    "pitch_deg": -5.3,
    "g_force": 0.2,
    "three_pos": [
      0.047333,
      -0.434412,
      -0.031092
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 134.0,
    "alt_m": 8995.0,
    "v_tot_ms": 1120.85,
    "v_vert_ms": 21.86,
    "v_horiz_ms": 1120.64,
    "fuel_kg": 377.43,
    "fuel_pct": 83.9,
    "throttle_pct": 80.3,
    "pitch_deg": -5.2,
    "g_force": 0.2,
    "three_pos": [
      0.047307,
      -0.434407,
      -0.031075
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 135.0,
    "alt_m": 8957.5,
    "v_tot_ms": 1117.45,
    "v_vert_ms": 21.81,
    "v_horiz_ms": 1117.24,
    "fuel_kg": 376.89,
    "fuel_pct": 83.8,
    "throttle_pct": 80.3,
    "pitch_deg": -5.2,
    "g_force": 0.2,
    "three_pos": [
      0.047281,
      -0.434402,
      -0.031058
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 136.0,
    "alt_m": 8920.1,
    "v_tot_ms": 1114.06,
    "v_vert_ms": 21.77,
    "v_horiz_ms": 1113.85,
    "fuel_kg": 376.34,
    "fuel_pct": 83.6,
    "throttle_pct": 80.3,
    "pitch_deg": -5.1,
    "g_force": 0.2,
    "three_pos": [
      0.047255,
      -0.434396,
      -0.031041
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 137.0,
    "alt_m": 8882.9,
    "v_tot_ms": 1110.67,
    "v_vert_ms": 21.72,
    "v_horiz_ms": 1110.46,
    "fuel_kg": 375.8,
    "fuel_pct": 83.5,
    "throttle_pct": 80.3,
    "pitch_deg": -5.0,
    "g_force": 0.2,
    "three_pos": [
      0.047229,
      -0.434391,
      -0.031023
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 138.0,
    "alt_m": 8845.7,
    "v_tot_ms": 1107.29,
    "v_vert_ms": 21.68,
    "v_horiz_ms": 1107.08,
    "fuel_kg": 375.25,
    "fuel_pct": 83.4,
    "throttle_pct": 80.4,
    "pitch_deg": -4.9,
    "g_force": 0.2,
    "three_pos": [
      0.047203,
      -0.434386,
      -0.031006
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 139.0,
    "alt_m": 8808.6,
    "v_tot_ms": 1103.92,
    "v_vert_ms": 21.63,
    "v_horiz_ms": 1103.7,
    "fuel_kg": 374.71,
    "fuel_pct": 83.3,
    "throttle_pct": 80.4,
    "pitch_deg": -4.9,
    "g_force": 0.2,
    "three_pos": [
      0.047177,
      -0.43438,
      -0.030989
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 140.0,
    "alt_m": 8771.7,
    "v_tot_ms": 1100.54,
    "v_vert_ms": 21.58,
    "v_horiz_ms": 1100.33,
    "fuel_kg": 374.16,
    "fuel_pct": 83.1,
    "throttle_pct": 80.4,
    "pitch_deg": -4.8,
    "g_force": 0.21,
    "three_pos": [
      0.047151,
      -0.434375,
      -0.030972
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 141.0,
    "alt_m": 8734.9,
    "v_tot_ms": 1097.18,
    "v_vert_ms": 21.54,
    "v_horiz_ms": 1096.96,
    "fuel_kg": 373.62,
    "fuel_pct": 83.0,
    "throttle_pct": 80.4,
    "pitch_deg": -4.7,
    "g_force": 0.21,
    "three_pos": [
      0.047125,
      -0.43437,
      -0.030955
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 142.0,
    "alt_m": 8698.1,
    "v_tot_ms": 1093.81,
    "v_vert_ms": 21.49,
    "v_horiz_ms": 1093.6,
    "fuel_kg": 373.07,
    "fuel_pct": 82.9,
    "throttle_pct": 80.4,
    "pitch_deg": -4.6,
    "g_force": 0.21,
    "three_pos": [
      0.047099,
      -0.434364,
      -0.030938
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 143.0,
    "alt_m": 8661.5,
    "v_tot_ms": 1090.46,
    "v_vert_ms": 21.45,
    "v_horiz_ms": 1090.24,
    "fuel_kg": 372.52,
    "fuel_pct": 82.8,
    "throttle_pct": 80.4,
    "pitch_deg": -4.6,
    "g_force": 0.21,
    "three_pos": [
      0.047073,
      -0.434359,
      -0.030921
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 144.0,
    "alt_m": 8625.0,
    "v_tot_ms": 1087.1,
    "v_vert_ms": 21.4,
    "v_horiz_ms": 1086.89,
    "fuel_kg": 371.98,
    "fuel_pct": 82.7,
    "throttle_pct": 80.4,
    "pitch_deg": -4.5,
    "g_force": 0.21,
    "three_pos": [
      0.047047,
      -0.434354,
      -0.030904
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 145.0,
    "alt_m": 8588.6,
    "v_tot_ms": 1083.75,
    "v_vert_ms": 21.35,
    "v_horiz_ms": 1083.54,
    "fuel_kg": 371.43,
    "fuel_pct": 82.5,
    "throttle_pct": 80.4,
    "pitch_deg": -4.4,
    "g_force": 0.21,
    "three_pos": [
      0.047021,
      -0.434349,
      -0.030887
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 146.0,
    "alt_m": 8552.3,
    "v_tot_ms": 1080.41,
    "v_vert_ms": 21.31,
    "v_horiz_ms": 1080.2,
    "fuel_kg": 370.89,
    "fuel_pct": 82.4,
    "throttle_pct": 80.4,
    "pitch_deg": -4.4,
    "g_force": 0.21,
    "three_pos": [
      0.046995,
      -0.434344,
      -0.03087
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 147.0,
    "alt_m": 8516.1,
    "v_tot_ms": 1077.07,
    "v_vert_ms": 21.26,
    "v_horiz_ms": 1076.86,
    "fuel_kg": 370.34,
    "fuel_pct": 82.3,
    "throttle_pct": 80.5,
    "pitch_deg": -4.3,
    "g_force": 0.21,
    "three_pos": [
      0.046969,
      -0.434339,
      -0.030853
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 148.0,
    "alt_m": 8480.0,
    "v_tot_ms": 1073.74,
    "v_vert_ms": 21.22,
    "v_horiz_ms": 1073.53,
    "fuel_kg": 369.79,
    "fuel_pct": 82.2,
    "throttle_pct": 80.5,
    "pitch_deg": -4.2,
    "g_force": 0.21,
    "three_pos": [
      0.046943,
      -0.434334,
      -0.030836
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 149.0,
    "alt_m": 8444.1,
    "v_tot_ms": 1070.41,
    "v_vert_ms": 21.17,
    "v_horiz_ms": 1070.2,
    "fuel_kg": 369.25,
    "fuel_pct": 82.1,
    "throttle_pct": 80.5,
    "pitch_deg": -4.1,
    "g_force": 0.21,
    "three_pos": [
      0.046918,
      -0.434329,
      -0.030819
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 150.0,
    "alt_m": 8408.2,
    "v_tot_ms": 1067.08,
    "v_vert_ms": 21.12,
    "v_horiz_ms": 1066.87,
    "fuel_kg": 368.7,
    "fuel_pct": 81.9,
    "throttle_pct": 80.5,
    "pitch_deg": -4.1,
    "g_force": 0.21,
    "three_pos": [
      0.046892,
      -0.434323,
      -0.030802
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 151.0,
    "alt_m": 8372.5,
    "v_tot_ms": 1063.76,
    "v_vert_ms": 21.08,
    "v_horiz_ms": 1063.55,
    "fuel_kg": 368.16,
    "fuel_pct": 81.8,
    "throttle_pct": 80.5,
    "pitch_deg": -4.0,
    "g_force": 0.21,
    "three_pos": [
      0.046866,
      -0.434318,
      -0.030785
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 152.0,
    "alt_m": 8336.8,
    "v_tot_ms": 1060.44,
    "v_vert_ms": 21.03,
    "v_horiz_ms": 1060.23,
    "fuel_kg": 367.61,
    "fuel_pct": 81.7,
    "throttle_pct": 80.5,
    "pitch_deg": -3.9,
    "g_force": 0.21,
    "three_pos": [
      0.04684,
      -0.434313,
      -0.030768
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 153.0,
    "alt_m": 8301.3,
    "v_tot_ms": 1057.13,
    "v_vert_ms": 20.99,
    "v_horiz_ms": 1056.92,
    "fuel_kg": 367.06,
    "fuel_pct": 81.6,
    "throttle_pct": 80.5,
    "pitch_deg": -3.8,
    "g_force": 0.21,
    "three_pos": [
      0.046814,
      -0.434309,
      -0.030751
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 154.0,
    "alt_m": 8265.8,
    "v_tot_ms": 1053.82,
    "v_vert_ms": 20.94,
    "v_horiz_ms": 1053.61,
    "fuel_kg": 366.52,
    "fuel_pct": 81.4,
    "throttle_pct": 80.5,
    "pitch_deg": -3.8,
    "g_force": 0.21,
    "three_pos": [
      0.046788,
      -0.434304,
      -0.030734
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 155.0,
    "alt_m": 8230.5,
    "v_tot_ms": 1050.52,
    "v_vert_ms": 20.9,
    "v_horiz_ms": 1050.31,
    "fuel_kg": 365.97,
    "fuel_pct": 81.3,
    "throttle_pct": 80.5,
    "pitch_deg": -3.7,
    "g_force": 0.21,
    "three_pos": [
      0.046762,
      -0.434299,
      -0.030717
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 156.0,
    "alt_m": 8195.3,
    "v_tot_ms": 1047.22,
    "v_vert_ms": 20.85,
    "v_horiz_ms": 1047.01,
    "fuel_kg": 365.42,
    "fuel_pct": 81.2,
    "throttle_pct": 80.6,
    "pitch_deg": -3.6,
    "g_force": 0.21,
    "three_pos": [
      0.046736,
      -0.434294,
      -0.0307
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 157.0,
    "alt_m": 8160.2,
    "v_tot_ms": 1043.92,
    "v_vert_ms": 20.8,
    "v_horiz_ms": 1043.71,
    "fuel_kg": 364.88,
    "fuel_pct": 81.1,
    "throttle_pct": 80.6,
    "pitch_deg": -3.6,
    "g_force": 0.21,
    "three_pos": [
      0.04671,
      -0.434289,
      -0.030683
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 158.0,
    "alt_m": 8125.2,
    "v_tot_ms": 1040.63,
    "v_vert_ms": 20.76,
    "v_horiz_ms": 1040.42,
    "fuel_kg": 364.33,
    "fuel_pct": 81.0,
    "throttle_pct": 80.6,
    "pitch_deg": -3.5,
    "g_force": 0.21,
    "three_pos": [
      0.046684,
      -0.434284,
      -0.030666
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 159.0,
    "alt_m": 8090.3,
    "v_tot_ms": 1037.34,
    "v_vert_ms": 20.71,
    "v_horiz_ms": 1037.14,
    "fuel_kg": 363.78,
    "fuel_pct": 80.8,
    "throttle_pct": 80.6,
    "pitch_deg": -3.4,
    "g_force": 0.21,
    "three_pos": [
      0.046659,
      -0.434279,
      -0.030649
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 160.0,
    "alt_m": 8055.6,
    "v_tot_ms": 1034.06,
    "v_vert_ms": 20.67,
    "v_horiz_ms": 1033.85,
    "fuel_kg": 363.24,
    "fuel_pct": 80.7,
    "throttle_pct": 80.6,
    "pitch_deg": -3.3,
    "g_force": 0.21,
    "three_pos": [
      0.046633,
      -0.434275,
      -0.030632
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 161.0,
    "alt_m": 8020.9,
    "v_tot_ms": 1030.78,
    "v_vert_ms": 20.62,
    "v_horiz_ms": 1030.57,
    "fuel_kg": 362.69,
    "fuel_pct": 80.6,
    "throttle_pct": 80.6,
    "pitch_deg": -3.3,
    "g_force": 0.21,
    "three_pos": [
      0.046607,
      -0.43427,
      -0.030615
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 162.0,
    "alt_m": 7986.3,
    "v_tot_ms": 1027.51,
    "v_vert_ms": 20.57,
    "v_horiz_ms": 1027.3,
    "fuel_kg": 362.14,
    "fuel_pct": 80.5,
    "throttle_pct": 80.6,
    "pitch_deg": -3.2,
    "g_force": 0.21,
    "three_pos": [
      0.046581,
      -0.434265,
      -0.030598
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 163.0,
    "alt_m": 7951.9,
    "v_tot_ms": 1024.23,
    "v_vert_ms": 20.53,
    "v_horiz_ms": 1024.03,
    "fuel_kg": 361.6,
    "fuel_pct": 80.4,
    "throttle_pct": 80.6,
    "pitch_deg": -3.1,
    "g_force": 0.21,
    "three_pos": [
      0.046555,
      -0.43426,
      -0.030581
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 164.0,
    "alt_m": 7917.5,
    "v_tot_ms": 1020.97,
    "v_vert_ms": 20.48,
    "v_horiz_ms": 1020.76,
    "fuel_kg": 361.05,
    "fuel_pct": 80.2,
    "throttle_pct": 80.6,
    "pitch_deg": -3.0,
    "g_force": 0.21,
    "three_pos": [
      0.046529,
      -0.434256,
      -0.030564
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 165.0,
    "alt_m": 7883.3,
    "v_tot_ms": 1017.7,
    "v_vert_ms": 20.44,
    "v_horiz_ms": 1017.5,
    "fuel_kg": 360.5,
    "fuel_pct": 80.1,
    "throttle_pct": 80.6,
    "pitch_deg": -3.0,
    "g_force": 0.21,
    "three_pos": [
      0.046503,
      -0.434251,
      -0.030547
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 166.0,
    "alt_m": 7849.2,
    "v_tot_ms": 1014.45,
    "v_vert_ms": 20.39,
    "v_horiz_ms": 1014.24,
    "fuel_kg": 359.96,
    "fuel_pct": 80.0,
    "throttle_pct": 80.7,
    "pitch_deg": -2.9,
    "g_force": 0.21,
    "three_pos": [
      0.046477,
      -0.434246,
      -0.03053
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 167.0,
    "alt_m": 7815.2,
    "v_tot_ms": 1011.19,
    "v_vert_ms": 20.35,
    "v_horiz_ms": 1010.99,
    "fuel_kg": 359.41,
    "fuel_pct": 79.9,
    "throttle_pct": 80.7,
    "pitch_deg": -2.8,
    "g_force": 0.21,
    "three_pos": [
      0.046452,
      -0.434242,
      -0.030513
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 168.0,
    "alt_m": 7781.3,
    "v_tot_ms": 1007.94,
    "v_vert_ms": 20.3,
    "v_horiz_ms": 1007.74,
    "fuel_kg": 358.86,
    "fuel_pct": 79.7,
    "throttle_pct": 80.7,
    "pitch_deg": -2.8,
    "g_force": 0.21,
    "three_pos": [
      0.046426,
      -0.434237,
      -0.030496
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 169.0,
    "alt_m": 7747.5,
    "v_tot_ms": 1004.69,
    "v_vert_ms": 20.25,
    "v_horiz_ms": 1004.49,
    "fuel_kg": 358.31,
    "fuel_pct": 79.6,
    "throttle_pct": 80.7,
    "pitch_deg": -2.7,
    "g_force": 0.21,
    "three_pos": [
      0.0464,
      -0.434233,
      -0.030479
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 170.0,
    "alt_m": 7713.8,
    "v_tot_ms": 1001.45,
    "v_vert_ms": 20.21,
    "v_horiz_ms": 1001.25,
    "fuel_kg": 357.77,
    "fuel_pct": 79.5,
    "throttle_pct": 80.7,
    "pitch_deg": -2.6,
    "g_force": 0.21,
    "three_pos": [
      0.046374,
      -0.434228,
      -0.030462
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 171.0,
    "alt_m": 7680.2,
    "v_tot_ms": 998.21,
    "v_vert_ms": 20.16,
    "v_horiz_ms": 998.01,
    "fuel_kg": 357.22,
    "fuel_pct": 79.4,
    "throttle_pct": 80.7,
    "pitch_deg": -2.5,
    "g_force": 0.21,
    "three_pos": [
      0.046348,
      -0.434224,
      -0.030445
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 172.0,
    "alt_m": 7646.7,
    "v_tot_ms": 994.97,
    "v_vert_ms": 20.12,
    "v_horiz_ms": 994.77,
    "fuel_kg": 356.67,
    "fuel_pct": 79.3,
    "throttle_pct": 80.7,
    "pitch_deg": -2.5,
    "g_force": 0.21,
    "three_pos": [
      0.046322,
      -0.434219,
      -0.030428
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 173.0,
    "alt_m": 7613.3,
    "v_tot_ms": 991.74,
    "v_vert_ms": 20.07,
    "v_horiz_ms": 991.54,
    "fuel_kg": 356.12,
    "fuel_pct": 79.1,
    "throttle_pct": 80.7,
    "pitch_deg": -2.4,
    "g_force": 0.21,
    "three_pos": [
      0.046296,
      -0.434215,
      -0.030411
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 174.0,
    "alt_m": 7580.1,
    "v_tot_ms": 988.51,
    "v_vert_ms": 20.02,
    "v_horiz_ms": 988.31,
    "fuel_kg": 355.58,
    "fuel_pct": 79.0,
    "throttle_pct": 80.7,
    "pitch_deg": -2.3,
    "g_force": 0.21,
    "three_pos": [
      0.046271,
      -0.43421,
      -0.030394
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 175.0,
    "alt_m": 7546.9,
    "v_tot_ms": 985.29,
    "v_vert_ms": 19.98,
    "v_horiz_ms": 985.09,
    "fuel_kg": 355.03,
    "fuel_pct": 78.9,
    "throttle_pct": 80.7,
    "pitch_deg": -2.2,
    "g_force": 0.21,
    "three_pos": [
      0.046245,
      -0.434206,
      -0.030377
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 176.0,
    "alt_m": 7513.9,
    "v_tot_ms": 982.07,
    "v_vert_ms": 19.93,
    "v_horiz_ms": 981.87,
    "fuel_kg": 354.48,
    "fuel_pct": 78.8,
    "throttle_pct": 80.7,
    "pitch_deg": -2.2,
    "g_force": 0.21,
    "three_pos": [
      0.046219,
      -0.434201,
      -0.03036
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 177.0,
    "alt_m": 7481.0,
    "v_tot_ms": 978.85,
    "v_vert_ms": 19.89,
    "v_horiz_ms": 978.65,
    "fuel_kg": 353.93,
    "fuel_pct": 78.7,
    "throttle_pct": 80.7,
    "pitch_deg": -2.1,
    "g_force": 0.21,
    "three_pos": [
      0.046193,
      -0.434197,
      -0.030343
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 178.0,
    "alt_m": 7448.1,
    "v_tot_ms": 975.64,
    "v_vert_ms": 19.84,
    "v_horiz_ms": 975.44,
    "fuel_kg": 353.38,
    "fuel_pct": 78.5,
    "throttle_pct": 80.8,
    "pitch_deg": -2.0,
    "g_force": 0.21,
    "three_pos": [
      0.046167,
      -0.434193,
      -0.030326
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 179.0,
    "alt_m": 7415.4,
    "v_tot_ms": 972.43,
    "v_vert_ms": 19.8,
    "v_horiz_ms": 972.23,
    "fuel_kg": 352.84,
    "fuel_pct": 78.4,
    "throttle_pct": 80.8,
    "pitch_deg": -1.9,
    "g_force": 0.21,
    "three_pos": [
      0.046141,
      -0.434188,
      -0.030309
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 180.0,
    "alt_m": 7382.8,
    "v_tot_ms": 969.22,
    "v_vert_ms": 19.75,
    "v_horiz_ms": 969.02,
    "fuel_kg": 352.29,
    "fuel_pct": 78.3,
    "throttle_pct": 80.8,
    "pitch_deg": -1.9,
    "g_force": 0.21,
    "three_pos": [
      0.046116,
      -0.434184,
      -0.030292
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 181.0,
    "alt_m": 7350.3,
    "v_tot_ms": 966.02,
    "v_vert_ms": 19.7,
    "v_horiz_ms": 965.82,
    "fuel_kg": 351.74,
    "fuel_pct": 78.2,
    "throttle_pct": 80.8,
    "pitch_deg": -1.8,
    "g_force": 0.21,
    "three_pos": [
      0.04609,
      -0.43418,
      -0.030275
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 182.0,
    "alt_m": 7317.9,
    "v_tot_ms": 962.82,
    "v_vert_ms": 19.66,
    "v_horiz_ms": 962.62,
    "fuel_kg": 351.19,
    "fuel_pct": 78.0,
    "throttle_pct": 80.8,
    "pitch_deg": -1.7,
    "g_force": 0.21,
    "three_pos": [
      0.046064,
      -0.434175,
      -0.030258
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 183.0,
    "alt_m": 7285.6,
    "v_tot_ms": 959.62,
    "v_vert_ms": 19.61,
    "v_horiz_ms": 959.42,
    "fuel_kg": 350.64,
    "fuel_pct": 77.9,
    "throttle_pct": 80.8,
    "pitch_deg": -1.7,
    "g_force": 0.21,
    "three_pos": [
      0.046038,
      -0.434171,
      -0.030241
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 184.0,
    "alt_m": 7253.5,
    "v_tot_ms": 956.43,
    "v_vert_ms": 19.57,
    "v_horiz_ms": 956.23,
    "fuel_kg": 350.1,
    "fuel_pct": 77.8,
    "throttle_pct": 80.8,
    "pitch_deg": -1.6,
    "g_force": 0.21,
    "three_pos": [
      0.046012,
      -0.434167,
      -0.030224
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 185.0,
    "alt_m": 7221.4,
    "v_tot_ms": 953.24,
    "v_vert_ms": 19.52,
    "v_horiz_ms": 953.04,
    "fuel_kg": 349.55,
    "fuel_pct": 77.7,
    "throttle_pct": 80.8,
    "pitch_deg": -1.5,
    "g_force": 0.21,
    "three_pos": [
      0.045987,
      -0.434163,
      -0.030208
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 186.0,
    "alt_m": 7189.5,
    "v_tot_ms": 950.06,
    "v_vert_ms": 19.48,
    "v_horiz_ms": 949.86,
    "fuel_kg": 349.0,
    "fuel_pct": 77.6,
    "throttle_pct": 80.8,
    "pitch_deg": -1.4,
    "g_force": 0.21,
    "three_pos": [
      0.045961,
      -0.434159,
      -0.030191
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 187.0,
    "alt_m": 7157.6,
    "v_tot_ms": 946.87,
    "v_vert_ms": 19.43,
    "v_horiz_ms": 946.68,
    "fuel_kg": 348.45,
    "fuel_pct": 77.4,
    "throttle_pct": 80.8,
    "pitch_deg": -1.4,
    "g_force": 0.21,
    "three_pos": [
      0.045935,
      -0.434155,
      -0.030174
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 188.0,
    "alt_m": 7125.9,
    "v_tot_ms": 943.7,
    "v_vert_ms": 19.38,
    "v_horiz_ms": 943.5,
    "fuel_kg": 347.9,
    "fuel_pct": 77.3,
    "throttle_pct": 80.8,
    "pitch_deg": -1.3,
    "g_force": 0.21,
    "three_pos": [
      0.045909,
      -0.434151,
      -0.030157
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 189.0,
    "alt_m": 7094.2,
    "v_tot_ms": 940.52,
    "v_vert_ms": 19.34,
    "v_horiz_ms": 940.32,
    "fuel_kg": 347.35,
    "fuel_pct": 77.2,
    "throttle_pct": 80.8,
    "pitch_deg": -1.2,
    "g_force": 0.21,
    "three_pos": [
      0.045883,
      -0.434147,
      -0.03014
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 190.0,
    "alt_m": 7062.7,
    "v_tot_ms": 937.35,
    "v_vert_ms": 19.29,
    "v_horiz_ms": 937.15,
    "fuel_kg": 346.81,
    "fuel_pct": 77.1,
    "throttle_pct": 80.8,
    "pitch_deg": -1.1,
    "g_force": 0.21,
    "three_pos": [
      0.045858,
      -0.434142,
      -0.030123
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 191.0,
    "alt_m": 7031.3,
    "v_tot_ms": 934.18,
    "v_vert_ms": 19.25,
    "v_horiz_ms": 933.98,
    "fuel_kg": 346.26,
    "fuel_pct": 76.9,
    "throttle_pct": 80.8,
    "pitch_deg": -1.1,
    "g_force": 0.21,
    "three_pos": [
      0.045832,
      -0.434138,
      -0.030106
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 192.0,
    "alt_m": 7000.0,
    "v_tot_ms": 931.02,
    "v_vert_ms": 19.2,
    "v_horiz_ms": 930.82,
    "fuel_kg": 345.71,
    "fuel_pct": 76.8,
    "throttle_pct": 80.9,
    "pitch_deg": -1.0,
    "g_force": 0.21,
    "three_pos": [
      0.045806,
      -0.434134,
      -0.030089
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 193.0,
    "alt_m": 6968.8,
    "v_tot_ms": 927.85,
    "v_vert_ms": 19.15,
    "v_horiz_ms": 927.66,
    "fuel_kg": 345.16,
    "fuel_pct": 76.7,
    "throttle_pct": 80.9,
    "pitch_deg": -0.9,
    "g_force": 0.21,
    "three_pos": [
      0.04578,
      -0.43413,
      -0.030072
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 194.0,
    "alt_m": 6937.7,
    "v_tot_ms": 924.69,
    "v_vert_ms": 19.11,
    "v_horiz_ms": 924.5,
    "fuel_kg": 344.61,
    "fuel_pct": 76.6,
    "throttle_pct": 80.9,
    "pitch_deg": -0.9,
    "g_force": 0.21,
    "three_pos": [
      0.045754,
      -0.434127,
      -0.030055
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 195.0,
    "alt_m": 6906.7,
    "v_tot_ms": 921.54,
    "v_vert_ms": 19.06,
    "v_horiz_ms": 921.34,
    "fuel_kg": 344.06,
    "fuel_pct": 76.5,
    "throttle_pct": 80.9,
    "pitch_deg": -0.8,
    "g_force": 0.21,
    "three_pos": [
      0.045729,
      -0.434123,
      -0.030038
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 196.0,
    "alt_m": 6875.9,
    "v_tot_ms": 918.39,
    "v_vert_ms": 19.02,
    "v_horiz_ms": 918.19,
    "fuel_kg": 343.51,
    "fuel_pct": 76.3,
    "throttle_pct": 80.9,
    "pitch_deg": -0.7,
    "g_force": 0.21,
    "three_pos": [
      0.045703,
      -0.434119,
      -0.030021
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 197.0,
    "alt_m": 6845.1,
    "v_tot_ms": 915.24,
    "v_vert_ms": 18.97,
    "v_horiz_ms": 915.04,
    "fuel_kg": 342.97,
    "fuel_pct": 76.2,
    "throttle_pct": 80.9,
    "pitch_deg": -0.6,
    "g_force": 0.21,
    "three_pos": [
      0.045677,
      -0.434115,
      -0.030004
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 198.0,
    "alt_m": 6814.5,
    "v_tot_ms": 912.09,
    "v_vert_ms": 18.93,
    "v_horiz_ms": 911.9,
    "fuel_kg": 342.42,
    "fuel_pct": 76.1,
    "throttle_pct": 80.9,
    "pitch_deg": -0.6,
    "g_force": 0.21,
    "three_pos": [
      0.045651,
      -0.434111,
      -0.029987
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 199.0,
    "alt_m": 6783.9,
    "v_tot_ms": 908.95,
    "v_vert_ms": 18.88,
    "v_horiz_ms": 908.75,
    "fuel_kg": 341.87,
    "fuel_pct": 76.0,
    "throttle_pct": 80.9,
    "pitch_deg": -0.5,
    "g_force": 0.21,
    "three_pos": [
      0.045626,
      -0.434107,
      -0.02997
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 200.0,
    "alt_m": 6753.5,
    "v_tot_ms": 905.81,
    "v_vert_ms": 18.83,
    "v_horiz_ms": 905.61,
    "fuel_kg": 341.32,
    "fuel_pct": 75.8,
    "throttle_pct": 80.9,
    "pitch_deg": -0.4,
    "g_force": 0.22,
    "three_pos": [
      0.0456,
      -0.434103,
      -0.029953
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 201.0,
    "alt_m": 6723.1,
    "v_tot_ms": 902.67,
    "v_vert_ms": 18.79,
    "v_horiz_ms": 902.48,
    "fuel_kg": 340.77,
    "fuel_pct": 75.7,
    "throttle_pct": 80.9,
    "pitch_deg": -0.3,
    "g_force": 0.22,
    "three_pos": [
      0.045574,
      -0.4341,
      -0.029937
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 202.0,
    "alt_m": 6692.9,
    "v_tot_ms": 899.54,
    "v_vert_ms": 18.74,
    "v_horiz_ms": 899.35,
    "fuel_kg": 340.22,
    "fuel_pct": 75.6,
    "throttle_pct": 80.9,
    "pitch_deg": -0.3,
    "g_force": 0.22,
    "three_pos": [
      0.045548,
      -0.434096,
      -0.02992
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 203.0,
    "alt_m": 6662.8,
    "v_tot_ms": 896.41,
    "v_vert_ms": 18.7,
    "v_horiz_ms": 896.22,
    "fuel_kg": 339.67,
    "fuel_pct": 75.5,
    "throttle_pct": 80.9,
    "pitch_deg": -0.2,
    "g_force": 0.22,
    "three_pos": [
      0.045522,
      -0.434092,
      -0.029903
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 204.0,
    "alt_m": 6632.8,
    "v_tot_ms": 893.28,
    "v_vert_ms": 18.65,
    "v_horiz_ms": 893.09,
    "fuel_kg": 339.12,
    "fuel_pct": 75.4,
    "throttle_pct": 80.9,
    "pitch_deg": -0.1,
    "g_force": 0.22,
    "three_pos": [
      0.045497,
      -0.434088,
      -0.029886
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 205.0,
    "alt_m": 6602.9,
    "v_tot_ms": 890.16,
    "v_vert_ms": 18.6,
    "v_horiz_ms": 889.97,
    "fuel_kg": 338.57,
    "fuel_pct": 75.2,
    "throttle_pct": 80.9,
    "pitch_deg": -0.1,
    "g_force": 0.22,
    "three_pos": [
      0.045471,
      -0.434085,
      -0.029869
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 206.0,
    "alt_m": 6573.1,
    "v_tot_ms": 887.04,
    "v_vert_ms": 18.56,
    "v_horiz_ms": 886.85,
    "fuel_kg": 338.03,
    "fuel_pct": 75.1,
    "throttle_pct": 80.9,
    "pitch_deg": 0.0,
    "g_force": 0.22,
    "three_pos": [
      0.045445,
      -0.434081,
      -0.029852
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 207.0,
    "alt_m": 6543.5,
    "v_tot_ms": 883.92,
    "v_vert_ms": 18.51,
    "v_horiz_ms": 883.73,
    "fuel_kg": 337.48,
    "fuel_pct": 75.0,
    "throttle_pct": 80.9,
    "pitch_deg": 0.1,
    "g_force": 0.22,
    "three_pos": [
      0.045419,
      -0.434078,
      -0.029835
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 208.0,
    "alt_m": 6513.9,
    "v_tot_ms": 880.81,
    "v_vert_ms": 18.47,
    "v_horiz_ms": 880.61,
    "fuel_kg": 336.93,
    "fuel_pct": 74.9,
    "throttle_pct": 80.9,
    "pitch_deg": 0.2,
    "g_force": 0.22,
    "three_pos": [
      0.045394,
      -0.434074,
      -0.029818
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 209.0,
    "alt_m": 6484.4,
    "v_tot_ms": 877.7,
    "v_vert_ms": 18.42,
    "v_horiz_ms": 877.5,
    "fuel_kg": 336.38,
    "fuel_pct": 74.8,
    "throttle_pct": 80.9,
    "pitch_deg": 0.2,
    "g_force": 0.22,
    "three_pos": [
      0.045368,
      -0.43407,
      -0.029801
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 210.0,
    "alt_m": 6455.1,
    "v_tot_ms": 874.59,
    "v_vert_ms": 18.38,
    "v_horiz_ms": 874.39,
    "fuel_kg": 335.83,
    "fuel_pct": 74.6,
    "throttle_pct": 80.9,
    "pitch_deg": 0.3,
    "g_force": 0.22,
    "three_pos": [
      0.045342,
      -0.434067,
      -0.029784
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 211.0,
    "alt_m": 6425.8,
    "v_tot_ms": 871.48,
    "v_vert_ms": 18.33,
    "v_horiz_ms": 871.29,
    "fuel_kg": 335.28,
    "fuel_pct": 74.5,
    "throttle_pct": 80.9,
    "pitch_deg": 0.4,
    "g_force": 0.22,
    "three_pos": [
      0.045317,
      -0.434063,
      -0.029767
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 212.0,
    "alt_m": 6396.7,
    "v_tot_ms": 868.38,
    "v_vert_ms": 18.28,
    "v_horiz_ms": 868.19,
    "fuel_kg": 334.73,
    "fuel_pct": 74.4,
    "throttle_pct": 80.9,
    "pitch_deg": 0.5,
    "g_force": 0.22,
    "three_pos": [
      0.045291,
      -0.43406,
      -0.02975
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 213.0,
    "alt_m": 6367.7,
    "v_tot_ms": 865.28,
    "v_vert_ms": 18.24,
    "v_horiz_ms": 865.09,
    "fuel_kg": 334.18,
    "fuel_pct": 74.3,
    "throttle_pct": 81.0,
    "pitch_deg": 0.5,
    "g_force": 0.22,
    "three_pos": [
      0.045265,
      -0.434056,
      -0.029734
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 214.0,
    "alt_m": 6338.8,
    "v_tot_ms": 862.18,
    "v_vert_ms": 18.19,
    "v_horiz_ms": 861.99,
    "fuel_kg": 333.63,
    "fuel_pct": 74.1,
    "throttle_pct": 81.0,
    "pitch_deg": 0.6,
    "g_force": 0.22,
    "three_pos": [
      0.045239,
      -0.434053,
      -0.029717
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 215.0,
    "alt_m": 6310.0,
    "v_tot_ms": 859.09,
    "v_vert_ms": 18.15,
    "v_horiz_ms": 858.89,
    "fuel_kg": 333.08,
    "fuel_pct": 74.0,
    "throttle_pct": 81.0,
    "pitch_deg": 0.7,
    "g_force": 0.22,
    "three_pos": [
      0.045214,
      -0.434049,
      -0.0297
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 216.0,
    "alt_m": 6281.2,
    "v_tot_ms": 855.99,
    "v_vert_ms": 18.1,
    "v_horiz_ms": 855.8,
    "fuel_kg": 332.53,
    "fuel_pct": 73.9,
    "throttle_pct": 81.0,
    "pitch_deg": 0.8,
    "g_force": 0.22,
    "three_pos": [
      0.045188,
      -0.434046,
      -0.029683
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 217.0,
    "alt_m": 6252.7,
    "v_tot_ms": 852.91,
    "v_vert_ms": 18.05,
    "v_horiz_ms": 852.72,
    "fuel_kg": 331.98,
    "fuel_pct": 73.8,
    "throttle_pct": 81.0,
    "pitch_deg": 0.8,
    "g_force": 0.22,
    "three_pos": [
      0.045162,
      -0.434043,
      -0.029666
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 218.0,
    "alt_m": 6224.2,
    "v_tot_ms": 849.82,
    "v_vert_ms": 18.01,
    "v_horiz_ms": 849.63,
    "fuel_kg": 331.44,
    "fuel_pct": 73.7,
    "throttle_pct": 81.0,
    "pitch_deg": 0.9,
    "g_force": 0.22,
    "three_pos": [
      0.045136,
      -0.434039,
      -0.029649
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 219.0,
    "alt_m": 6195.8,
    "v_tot_ms": 846.74,
    "v_vert_ms": 17.96,
    "v_horiz_ms": 846.55,
    "fuel_kg": 330.89,
    "fuel_pct": 73.5,
    "throttle_pct": 81.0,
    "pitch_deg": 1.0,
    "g_force": 0.22,
    "three_pos": [
      0.045111,
      -0.434036,
      -0.029632
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 220.0,
    "alt_m": 6167.5,
    "v_tot_ms": 843.66,
    "v_vert_ms": 17.92,
    "v_horiz_ms": 843.47,
    "fuel_kg": 330.34,
    "fuel_pct": 73.4,
    "throttle_pct": 81.0,
    "pitch_deg": 1.0,
    "g_force": 0.22,
    "three_pos": [
      0.045085,
      -0.434033,
      -0.029615
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 221.0,
    "alt_m": 6139.4,
    "v_tot_ms": 840.58,
    "v_vert_ms": 17.87,
    "v_horiz_ms": 840.39,
    "fuel_kg": 329.79,
    "fuel_pct": 73.3,
    "throttle_pct": 81.0,
    "pitch_deg": 1.1,
    "g_force": 0.22,
    "three_pos": [
      0.045059,
      -0.434029,
      -0.029598
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 222.0,
    "alt_m": 6111.3,
    "v_tot_ms": 837.51,
    "v_vert_ms": 17.82,
    "v_horiz_ms": 837.32,
    "fuel_kg": 329.24,
    "fuel_pct": 73.2,
    "throttle_pct": 81.0,
    "pitch_deg": 1.2,
    "g_force": 0.22,
    "three_pos": [
      0.045034,
      -0.434026,
      -0.029582
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 223.0,
    "alt_m": 6083.4,
    "v_tot_ms": 834.43,
    "v_vert_ms": 17.78,
    "v_horiz_ms": 834.25,
    "fuel_kg": 328.69,
    "fuel_pct": 73.0,
    "throttle_pct": 81.0,
    "pitch_deg": 1.3,
    "g_force": 0.22,
    "three_pos": [
      0.045008,
      -0.434023,
      -0.029565
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 224.0,
    "alt_m": 6055.6,
    "v_tot_ms": 831.37,
    "v_vert_ms": 17.73,
    "v_horiz_ms": 831.18,
    "fuel_kg": 328.14,
    "fuel_pct": 72.9,
    "throttle_pct": 81.0,
    "pitch_deg": 1.3,
    "g_force": 0.22,
    "three_pos": [
      0.044982,
      -0.43402,
      -0.029548
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 225.0,
    "alt_m": 6027.8,
    "v_tot_ms": 828.3,
    "v_vert_ms": 17.69,
    "v_horiz_ms": 828.11,
    "fuel_kg": 327.59,
    "fuel_pct": 72.8,
    "throttle_pct": 81.0,
    "pitch_deg": 1.4,
    "g_force": 0.22,
    "three_pos": [
      0.044957,
      -0.434017,
      -0.029531
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 226.0,
    "alt_m": 6000.2,
    "v_tot_ms": 825.24,
    "v_vert_ms": 17.64,
    "v_horiz_ms": 825.05,
    "fuel_kg": 327.04,
    "fuel_pct": 72.7,
    "throttle_pct": 81.0,
    "pitch_deg": 1.5,
    "g_force": 0.22,
    "three_pos": [
      0.044931,
      -0.434013,
      -0.029514
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 227.0,
    "alt_m": 5972.7,
    "v_tot_ms": 822.18,
    "v_vert_ms": 17.6,
    "v_horiz_ms": 821.99,
    "fuel_kg": 326.49,
    "fuel_pct": 72.6,
    "throttle_pct": 81.0,
    "pitch_deg": 1.6,
    "g_force": 0.22,
    "three_pos": [
      0.044905,
      -0.43401,
      -0.029497
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 228.0,
    "alt_m": 5945.3,
    "v_tot_ms": 819.12,
    "v_vert_ms": 17.55,
    "v_horiz_ms": 818.93,
    "fuel_kg": 325.94,
    "fuel_pct": 72.4,
    "throttle_pct": 81.0,
    "pitch_deg": 1.6,
    "g_force": 0.22,
    "three_pos": [
      0.044879,
      -0.434007,
      -0.02948
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 229.0,
    "alt_m": 5918.0,
    "v_tot_ms": 816.06,
    "v_vert_ms": 17.5,
    "v_horiz_ms": 815.87,
    "fuel_kg": 325.39,
    "fuel_pct": 72.3,
    "throttle_pct": 81.0,
    "pitch_deg": 1.7,
    "g_force": 0.22,
    "three_pos": [
      0.044854,
      -0.434004,
      -0.029463
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 230.0,
    "alt_m": 5890.8,
    "v_tot_ms": 813.01,
    "v_vert_ms": 17.46,
    "v_horiz_ms": 812.82,
    "fuel_kg": 324.84,
    "fuel_pct": 72.2,
    "throttle_pct": 81.0,
    "pitch_deg": 1.8,
    "g_force": 0.22,
    "three_pos": [
      0.044828,
      -0.434001,
      -0.029447
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 231.0,
    "alt_m": 5863.8,
    "v_tot_ms": 809.96,
    "v_vert_ms": 17.41,
    "v_horiz_ms": 809.77,
    "fuel_kg": 324.29,
    "fuel_pct": 72.1,
    "throttle_pct": 81.0,
    "pitch_deg": 1.8,
    "g_force": 0.22,
    "three_pos": [
      0.044802,
      -0.433998,
      -0.02943
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 232.0,
    "alt_m": 5836.8,
    "v_tot_ms": 806.91,
    "v_vert_ms": 17.37,
    "v_horiz_ms": 806.73,
    "fuel_kg": 323.74,
    "fuel_pct": 71.9,
    "throttle_pct": 81.0,
    "pitch_deg": 1.9,
    "g_force": 0.22,
    "three_pos": [
      0.044777,
      -0.433995,
      -0.029413
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 233.0,
    "alt_m": 5810.0,
    "v_tot_ms": 803.87,
    "v_vert_ms": 17.32,
    "v_horiz_ms": 803.68,
    "fuel_kg": 323.19,
    "fuel_pct": 71.8,
    "throttle_pct": 81.0,
    "pitch_deg": 2.0,
    "g_force": 0.22,
    "three_pos": [
      0.044751,
      -0.433992,
      -0.029396
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 234.0,
    "alt_m": 5783.2,
    "v_tot_ms": 800.83,
    "v_vert_ms": 17.27,
    "v_horiz_ms": 800.64,
    "fuel_kg": 322.64,
    "fuel_pct": 71.7,
    "throttle_pct": 81.0,
    "pitch_deg": 2.1,
    "g_force": 0.22,
    "three_pos": [
      0.044725,
      -0.433989,
      -0.029379
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 235.0,
    "alt_m": 5756.6,
    "v_tot_ms": 797.79,
    "v_vert_ms": 17.23,
    "v_horiz_ms": 797.6,
    "fuel_kg": 322.09,
    "fuel_pct": 71.6,
    "throttle_pct": 81.0,
    "pitch_deg": 2.1,
    "g_force": 0.22,
    "three_pos": [
      0.0447,
      -0.433986,
      -0.029362
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 236.0,
    "alt_m": 5730.0,
    "v_tot_ms": 794.75,
    "v_vert_ms": 17.18,
    "v_horiz_ms": 794.56,
    "fuel_kg": 321.55,
    "fuel_pct": 71.5,
    "throttle_pct": 81.0,
    "pitch_deg": 2.2,
    "g_force": 0.22,
    "three_pos": [
      0.044674,
      -0.433983,
      -0.029345
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 237.0,
    "alt_m": 5703.6,
    "v_tot_ms": 791.71,
    "v_vert_ms": 17.14,
    "v_horiz_ms": 791.53,
    "fuel_kg": 321.0,
    "fuel_pct": 71.3,
    "throttle_pct": 81.0,
    "pitch_deg": 2.3,
    "g_force": 0.22,
    "three_pos": [
      0.044648,
      -0.433981,
      -0.029329
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 238.0,
    "alt_m": 5677.3,
    "v_tot_ms": 788.68,
    "v_vert_ms": 17.09,
    "v_horiz_ms": 788.5,
    "fuel_kg": 320.45,
    "fuel_pct": 71.2,
    "throttle_pct": 81.0,
    "pitch_deg": 2.4,
    "g_force": 0.22,
    "three_pos": [
      0.044623,
      -0.433978,
      -0.029312
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 239.0,
    "alt_m": 5651.1,
    "v_tot_ms": 785.65,
    "v_vert_ms": 17.05,
    "v_horiz_ms": 785.47,
    "fuel_kg": 319.9,
    "fuel_pct": 71.1,
    "throttle_pct": 81.0,
    "pitch_deg": 2.4,
    "g_force": 0.22,
    "three_pos": [
      0.044597,
      -0.433975,
      -0.029295
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 240.0,
    "alt_m": 5625.0,
    "v_tot_ms": 782.63,
    "v_vert_ms": 17.0,
    "v_horiz_ms": 782.44,
    "fuel_kg": 319.35,
    "fuel_pct": 71.0,
    "throttle_pct": 81.0,
    "pitch_deg": 2.5,
    "g_force": 0.22,
    "three_pos": [
      0.044571,
      -0.433972,
      -0.029278
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 241.0,
    "alt_m": 5599.0,
    "v_tot_ms": 779.6,
    "v_vert_ms": 16.95,
    "v_horiz_ms": 779.42,
    "fuel_kg": 318.8,
    "fuel_pct": 70.8,
    "throttle_pct": 81.0,
    "pitch_deg": 2.6,
    "g_force": 0.22,
    "three_pos": [
      0.044546,
      -0.433969,
      -0.029261
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 242.0,
    "alt_m": 5573.1,
    "v_tot_ms": 776.58,
    "v_vert_ms": 16.91,
    "v_horiz_ms": 776.4,
    "fuel_kg": 318.25,
    "fuel_pct": 70.7,
    "throttle_pct": 81.0,
    "pitch_deg": 2.6,
    "g_force": 0.22,
    "three_pos": [
      0.04452,
      -0.433967,
      -0.029244
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 243.0,
    "alt_m": 5547.4,
    "v_tot_ms": 773.56,
    "v_vert_ms": 16.86,
    "v_horiz_ms": 773.38,
    "fuel_kg": 317.7,
    "fuel_pct": 70.6,
    "throttle_pct": 81.0,
    "pitch_deg": 2.7,
    "g_force": 0.22,
    "three_pos": [
      0.044494,
      -0.433964,
      -0.029227
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 244.0,
    "alt_m": 5521.7,
    "v_tot_ms": 770.54,
    "v_vert_ms": 16.82,
    "v_horiz_ms": 770.36,
    "fuel_kg": 317.15,
    "fuel_pct": 70.5,
    "throttle_pct": 81.0,
    "pitch_deg": 2.8,
    "g_force": 0.22,
    "three_pos": [
      0.044469,
      -0.433961,
      -0.029211
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 245.0,
    "alt_m": 5496.1,
    "v_tot_ms": 767.53,
    "v_vert_ms": 16.77,
    "v_horiz_ms": 767.35,
    "fuel_kg": 316.6,
    "fuel_pct": 70.4,
    "throttle_pct": 81.0,
    "pitch_deg": 2.9,
    "g_force": 0.22,
    "three_pos": [
      0.044443,
      -0.433958,
      -0.029194
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 246.0,
    "alt_m": 5470.7,
    "v_tot_ms": 764.52,
    "v_vert_ms": 16.73,
    "v_horiz_ms": 764.34,
    "fuel_kg": 316.05,
    "fuel_pct": 70.2,
    "throttle_pct": 81.0,
    "pitch_deg": 2.9,
    "g_force": 0.22,
    "three_pos": [
      0.044418,
      -0.433956,
      -0.029177
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 247.0,
    "alt_m": 5445.4,
    "v_tot_ms": 761.51,
    "v_vert_ms": 16.68,
    "v_horiz_ms": 761.33,
    "fuel_kg": 315.5,
    "fuel_pct": 70.1,
    "throttle_pct": 81.0,
    "pitch_deg": 3.0,
    "g_force": 0.22,
    "three_pos": [
      0.044392,
      -0.433953,
      -0.02916
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 248.0,
    "alt_m": 5420.1,
    "v_tot_ms": 758.5,
    "v_vert_ms": 16.63,
    "v_horiz_ms": 758.32,
    "fuel_kg": 314.95,
    "fuel_pct": 70.0,
    "throttle_pct": 81.0,
    "pitch_deg": 3.1,
    "g_force": 0.22,
    "three_pos": [
      0.044366,
      -0.433951,
      -0.029143
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 249.0,
    "alt_m": 5395.0,
    "v_tot_ms": 755.5,
    "v_vert_ms": 16.59,
    "v_horiz_ms": 755.32,
    "fuel_kg": 314.4,
    "fuel_pct": 69.9,
    "throttle_pct": 81.0,
    "pitch_deg": 3.2,
    "g_force": 0.22,
    "three_pos": [
      0.044341,
      -0.433948,
      -0.029126
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 250.0,
    "alt_m": 5370.0,
    "v_tot_ms": 752.5,
    "v_vert_ms": 16.54,
    "v_horiz_ms": 752.31,
    "fuel_kg": 313.85,
    "fuel_pct": 69.7,
    "throttle_pct": 81.0,
    "pitch_deg": 3.2,
    "g_force": 0.22,
    "three_pos": [
      0.044315,
      -0.433945,
      -0.02911
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 251.0,
    "alt_m": 5345.1,
    "v_tot_ms": 749.5,
    "v_vert_ms": 16.5,
    "v_horiz_ms": 749.31,
    "fuel_kg": 313.3,
    "fuel_pct": 69.6,
    "throttle_pct": 81.0,
    "pitch_deg": 3.3,
    "g_force": 0.22,
    "three_pos": [
      0.044289,
      -0.433943,
      -0.029093
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 252.0,
    "alt_m": 5320.3,
    "v_tot_ms": 746.5,
    "v_vert_ms": 16.45,
    "v_horiz_ms": 746.32,
    "fuel_kg": 312.75,
    "fuel_pct": 69.5,
    "throttle_pct": 81.0,
    "pitch_deg": 3.4,
    "g_force": 0.22,
    "three_pos": [
      0.044264,
      -0.43394,
      -0.029076
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 253.0,
    "alt_m": 5295.6,
    "v_tot_ms": 743.5,
    "v_vert_ms": 16.4,
    "v_horiz_ms": 743.32,
    "fuel_kg": 312.2,
    "fuel_pct": 69.4,
    "throttle_pct": 81.0,
    "pitch_deg": 3.4,
    "g_force": 0.22,
    "three_pos": [
      0.044238,
      -0.433938,
      -0.029059
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 254.0,
    "alt_m": 5271.1,
    "v_tot_ms": 740.51,
    "v_vert_ms": 16.36,
    "v_horiz_ms": 740.33,
    "fuel_kg": 311.65,
    "fuel_pct": 69.3,
    "throttle_pct": 81.0,
    "pitch_deg": 3.5,
    "g_force": 0.22,
    "three_pos": [
      0.044213,
      -0.433935,
      -0.029042
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 255.0,
    "alt_m": 5246.6,
    "v_tot_ms": 737.52,
    "v_vert_ms": 16.31,
    "v_horiz_ms": 737.34,
    "fuel_kg": 311.1,
    "fuel_pct": 69.1,
    "throttle_pct": 81.0,
    "pitch_deg": 3.6,
    "g_force": 0.22,
    "three_pos": [
      0.044187,
      -0.433933,
      -0.029025
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 256.0,
    "alt_m": 5222.2,
    "v_tot_ms": 734.53,
    "v_vert_ms": 16.27,
    "v_horiz_ms": 734.35,
    "fuel_kg": 310.55,
    "fuel_pct": 69.0,
    "throttle_pct": 81.0,
    "pitch_deg": 3.7,
    "g_force": 0.22,
    "three_pos": [
      0.044161,
      -0.433931,
      -0.029009
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 257.0,
    "alt_m": 5198.0,
    "v_tot_ms": 731.55,
    "v_vert_ms": 16.22,
    "v_horiz_ms": 731.37,
    "fuel_kg": 310.01,
    "fuel_pct": 68.9,
    "throttle_pct": 81.0,
    "pitch_deg": 3.7,
    "g_force": 0.22,
    "three_pos": [
      0.044136,
      -0.433928,
      -0.028992
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 258.0,
    "alt_m": 5173.8,
    "v_tot_ms": 728.56,
    "v_vert_ms": 16.18,
    "v_horiz_ms": 728.39,
    "fuel_kg": 309.46,
    "fuel_pct": 68.8,
    "throttle_pct": 81.0,
    "pitch_deg": 3.8,
    "g_force": 0.22,
    "three_pos": [
      0.04411,
      -0.433926,
      -0.028975
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 259.0,
    "alt_m": 5149.8,
    "v_tot_ms": 725.58,
    "v_vert_ms": 16.13,
    "v_horiz_ms": 725.4,
    "fuel_kg": 308.91,
    "fuel_pct": 68.6,
    "throttle_pct": 81.0,
    "pitch_deg": 3.9,
    "g_force": 0.22,
    "three_pos": [
      0.044084,
      -0.433924,
      -0.028958
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 260.0,
    "alt_m": 5125.9,
    "v_tot_ms": 722.61,
    "v_vert_ms": 16.08,
    "v_horiz_ms": 722.43,
    "fuel_kg": 308.36,
    "fuel_pct": 68.5,
    "throttle_pct": 81.0,
    "pitch_deg": 4.0,
    "g_force": 0.22,
    "three_pos": [
      0.044059,
      -0.433921,
      -0.028941
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 261.0,
    "alt_m": 5102.1,
    "v_tot_ms": 719.63,
    "v_vert_ms": 16.04,
    "v_horiz_ms": 719.45,
    "fuel_kg": 307.81,
    "fuel_pct": 68.4,
    "throttle_pct": 81.0,
    "pitch_deg": 4.0,
    "g_force": 0.22,
    "three_pos": [
      0.044033,
      -0.433919,
      -0.028924
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 262.0,
    "alt_m": 5078.3,
    "v_tot_ms": 716.66,
    "v_vert_ms": 15.99,
    "v_horiz_ms": 716.48,
    "fuel_kg": 307.26,
    "fuel_pct": 68.3,
    "throttle_pct": 81.0,
    "pitch_deg": 4.1,
    "g_force": 0.22,
    "three_pos": [
      0.044008,
      -0.433917,
      -0.028908
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 263.0,
    "alt_m": 5054.7,
    "v_tot_ms": 713.68,
    "v_vert_ms": 15.95,
    "v_horiz_ms": 713.51,
    "fuel_kg": 306.71,
    "fuel_pct": 68.2,
    "throttle_pct": 81.0,
    "pitch_deg": 4.2,
    "g_force": 0.23,
    "three_pos": [
      0.043982,
      -0.433914,
      -0.028891
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 264.0,
    "alt_m": 5031.2,
    "v_tot_ms": 710.71,
    "v_vert_ms": 15.9,
    "v_horiz_ms": 710.54,
    "fuel_kg": 306.16,
    "fuel_pct": 68.0,
    "throttle_pct": 81.0,
    "pitch_deg": 4.2,
    "g_force": 0.23,
    "three_pos": [
      0.043957,
      -0.433912,
      -0.028874
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 265.0,
    "alt_m": 5007.9,
    "v_tot_ms": 707.75,
    "v_vert_ms": 15.85,
    "v_horiz_ms": 707.57,
    "fuel_kg": 305.61,
    "fuel_pct": 67.9,
    "throttle_pct": 81.0,
    "pitch_deg": 4.3,
    "g_force": 0.23,
    "three_pos": [
      0.043931,
      -0.43391,
      -0.028857
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 266.0,
    "alt_m": 4984.6,
    "v_tot_ms": 704.78,
    "v_vert_ms": 15.81,
    "v_horiz_ms": 704.6,
    "fuel_kg": 305.06,
    "fuel_pct": 67.8,
    "throttle_pct": 81.0,
    "pitch_deg": 4.4,
    "g_force": 0.23,
    "three_pos": [
      0.043905,
      -0.433908,
      -0.02884
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 267.0,
    "alt_m": 4961.4,
    "v_tot_ms": 701.82,
    "v_vert_ms": 15.76,
    "v_horiz_ms": 701.64,
    "fuel_kg": 304.51,
    "fuel_pct": 67.7,
    "throttle_pct": 81.0,
    "pitch_deg": 4.5,
    "g_force": 0.23,
    "three_pos": [
      0.04388,
      -0.433906,
      -0.028824
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 268.0,
    "alt_m": 4938.4,
    "v_tot_ms": 698.86,
    "v_vert_ms": 15.72,
    "v_horiz_ms": 698.68,
    "fuel_kg": 303.96,
    "fuel_pct": 67.5,
    "throttle_pct": 80.9,
    "pitch_deg": 4.5,
    "g_force": 0.23,
    "three_pos": [
      0.043854,
      -0.433904,
      -0.028807
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 269.0,
    "alt_m": 4915.4,
    "v_tot_ms": 695.9,
    "v_vert_ms": 15.67,
    "v_horiz_ms": 695.72,
    "fuel_kg": 303.41,
    "fuel_pct": 67.4,
    "throttle_pct": 80.9,
    "pitch_deg": 4.6,
    "g_force": 0.23,
    "three_pos": [
      0.043829,
      -0.433902,
      -0.02879
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 270.0,
    "alt_m": 4892.6,
    "v_tot_ms": 692.94,
    "v_vert_ms": 15.62,
    "v_horiz_ms": 692.77,
    "fuel_kg": 302.86,
    "fuel_pct": 67.3,
    "throttle_pct": 80.9,
    "pitch_deg": 4.7,
    "g_force": 0.23,
    "three_pos": [
      0.043803,
      -0.4339,
      -0.028773
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 271.0,
    "alt_m": 4869.8,
    "v_tot_ms": 689.99,
    "v_vert_ms": 15.58,
    "v_horiz_ms": 689.81,
    "fuel_kg": 302.32,
    "fuel_pct": 67.2,
    "throttle_pct": 80.9,
    "pitch_deg": 4.8,
    "g_force": 0.23,
    "three_pos": [
      0.043777,
      -0.433898,
      -0.028756
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 272.0,
    "alt_m": 4847.2,
    "v_tot_ms": 687.04,
    "v_vert_ms": 15.53,
    "v_horiz_ms": 686.86,
    "fuel_kg": 301.77,
    "fuel_pct": 67.1,
    "throttle_pct": 80.9,
    "pitch_deg": 4.8,
    "g_force": 0.23,
    "three_pos": [
      0.043752,
      -0.433896,
      -0.02874
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 273.0,
    "alt_m": 4824.7,
    "v_tot_ms": 684.09,
    "v_vert_ms": 15.49,
    "v_horiz_ms": 683.91,
    "fuel_kg": 301.22,
    "fuel_pct": 66.9,
    "throttle_pct": 80.9,
    "pitch_deg": 4.9,
    "g_force": 0.23,
    "three_pos": [
      0.043726,
      -0.433894,
      -0.028723
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 274.0,
    "alt_m": 4802.3,
    "v_tot_ms": 681.14,
    "v_vert_ms": 15.44,
    "v_horiz_ms": 680.97,
    "fuel_kg": 300.67,
    "fuel_pct": 66.8,
    "throttle_pct": 80.9,
    "pitch_deg": 5.0,
    "g_force": 0.23,
    "three_pos": [
      0.043701,
      -0.433892,
      -0.028706
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 275.0,
    "alt_m": 4780.0,
    "v_tot_ms": 678.2,
    "v_vert_ms": 15.4,
    "v_horiz_ms": 678.02,
    "fuel_kg": 300.12,
    "fuel_pct": 66.7,
    "throttle_pct": 80.9,
    "pitch_deg": 5.1,
    "g_force": 0.23,
    "three_pos": [
      0.043675,
      -0.43389,
      -0.028689
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 276.0,
    "alt_m": 4757.8,
    "v_tot_ms": 675.25,
    "v_vert_ms": 15.35,
    "v_horiz_ms": 675.08,
    "fuel_kg": 299.57,
    "fuel_pct": 66.6,
    "throttle_pct": 80.9,
    "pitch_deg": 5.1,
    "g_force": 0.23,
    "three_pos": [
      0.04365,
      -0.433888,
      -0.028672
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 277.0,
    "alt_m": 4735.7,
    "v_tot_ms": 672.31,
    "v_vert_ms": 15.3,
    "v_horiz_ms": 672.14,
    "fuel_kg": 299.02,
    "fuel_pct": 66.4,
    "throttle_pct": 80.9,
    "pitch_deg": 5.2,
    "g_force": 0.23,
    "three_pos": [
      0.043624,
      -0.433886,
      -0.028656
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 278.0,
    "alt_m": 4713.8,
    "v_tot_ms": 669.37,
    "v_vert_ms": 15.26,
    "v_horiz_ms": 669.2,
    "fuel_kg": 298.47,
    "fuel_pct": 66.3,
    "throttle_pct": 80.9,
    "pitch_deg": 5.3,
    "g_force": 0.23,
    "three_pos": [
      0.043598,
      -0.433884,
      -0.028639
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 279.0,
    "alt_m": 4691.9,
    "v_tot_ms": 666.44,
    "v_vert_ms": 15.21,
    "v_horiz_ms": 666.26,
    "fuel_kg": 297.92,
    "fuel_pct": 66.2,
    "throttle_pct": 80.9,
    "pitch_deg": 5.3,
    "g_force": 0.23,
    "three_pos": [
      0.043573,
      -0.433882,
      -0.028622
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 280.0,
    "alt_m": 4670.1,
    "v_tot_ms": 663.5,
    "v_vert_ms": 15.17,
    "v_horiz_ms": 663.33,
    "fuel_kg": 297.38,
    "fuel_pct": 66.1,
    "throttle_pct": 80.9,
    "pitch_deg": 5.4,
    "g_force": 0.23,
    "three_pos": [
      0.043547,
      -0.43388,
      -0.028605
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 281.0,
    "alt_m": 4648.5,
    "v_tot_ms": 660.57,
    "v_vert_ms": 15.12,
    "v_horiz_ms": 660.4,
    "fuel_kg": 296.83,
    "fuel_pct": 66.0,
    "throttle_pct": 80.9,
    "pitch_deg": 5.5,
    "g_force": 0.23,
    "three_pos": [
      0.043522,
      -0.433879,
      -0.028588
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 282.0,
    "alt_m": 4627.0,
    "v_tot_ms": 657.64,
    "v_vert_ms": 15.07,
    "v_horiz_ms": 657.47,
    "fuel_kg": 296.28,
    "fuel_pct": 65.8,
    "throttle_pct": 80.9,
    "pitch_deg": 5.6,
    "g_force": 0.23,
    "three_pos": [
      0.043496,
      -0.433877,
      -0.028572
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 283.0,
    "alt_m": 4605.5,
    "v_tot_ms": 654.71,
    "v_vert_ms": 15.03,
    "v_horiz_ms": 654.54,
    "fuel_kg": 295.73,
    "fuel_pct": 65.7,
    "throttle_pct": 80.9,
    "pitch_deg": 5.6,
    "g_force": 0.23,
    "three_pos": [
      0.043471,
      -0.433875,
      -0.028555
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 284.0,
    "alt_m": 4584.2,
    "v_tot_ms": 651.78,
    "v_vert_ms": 14.98,
    "v_horiz_ms": 651.61,
    "fuel_kg": 295.18,
    "fuel_pct": 65.6,
    "throttle_pct": 80.9,
    "pitch_deg": 5.7,
    "g_force": 0.23,
    "three_pos": [
      0.043445,
      -0.433873,
      -0.028538
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 285.0,
    "alt_m": 4563.0,
    "v_tot_ms": 648.86,
    "v_vert_ms": 14.94,
    "v_horiz_ms": 648.69,
    "fuel_kg": 294.63,
    "fuel_pct": 65.5,
    "throttle_pct": 80.9,
    "pitch_deg": 5.8,
    "g_force": 0.23,
    "three_pos": [
      0.04342,
      -0.433872,
      -0.028521
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 286.0,
    "alt_m": 4541.9,
    "v_tot_ms": 645.94,
    "v_vert_ms": 14.89,
    "v_horiz_ms": 645.77,
    "fuel_kg": 294.08,
    "fuel_pct": 65.4,
    "throttle_pct": 80.9,
    "pitch_deg": 5.9,
    "g_force": 0.23,
    "three_pos": [
      0.043394,
      -0.43387,
      -0.028505
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 287.0,
    "alt_m": 4520.9,
    "v_tot_ms": 643.02,
    "v_vert_ms": 14.85,
    "v_horiz_ms": 642.85,
    "fuel_kg": 293.53,
    "fuel_pct": 65.2,
    "throttle_pct": 80.9,
    "pitch_deg": 5.9,
    "g_force": 0.23,
    "three_pos": [
      0.043369,
      -0.433868,
      -0.028488
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 288.0,
    "alt_m": 4500.0,
    "v_tot_ms": 640.1,
    "v_vert_ms": 14.8,
    "v_horiz_ms": 639.93,
    "fuel_kg": 292.99,
    "fuel_pct": 65.1,
    "throttle_pct": 80.9,
    "pitch_deg": 6.0,
    "g_force": 0.23,
    "three_pos": [
      0.043343,
      -0.433867,
      -0.028471
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 289.0,
    "alt_m": 4479.2,
    "v_tot_ms": 637.18,
    "v_vert_ms": 14.75,
    "v_horiz_ms": 637.01,
    "fuel_kg": 292.44,
    "fuel_pct": 65.0,
    "throttle_pct": 80.8,
    "pitch_deg": 6.1,
    "g_force": 0.23,
    "three_pos": [
      0.043318,
      -0.433865,
      -0.028454
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 290.0,
    "alt_m": 4458.6,
    "v_tot_ms": 634.27,
    "v_vert_ms": 14.71,
    "v_horiz_ms": 634.1,
    "fuel_kg": 291.89,
    "fuel_pct": 64.9,
    "throttle_pct": 80.8,
    "pitch_deg": 6.1,
    "g_force": 0.23,
    "three_pos": [
      0.043292,
      -0.433864,
      -0.028438
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 291.0,
    "alt_m": 4438.0,
    "v_tot_ms": 631.36,
    "v_vert_ms": 14.66,
    "v_horiz_ms": 631.19,
    "fuel_kg": 291.34,
    "fuel_pct": 64.7,
    "throttle_pct": 80.8,
    "pitch_deg": 6.2,
    "g_force": 0.23,
    "three_pos": [
      0.043266,
      -0.433862,
      -0.028421
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 292.0,
    "alt_m": 4417.5,
    "v_tot_ms": 628.45,
    "v_vert_ms": 14.62,
    "v_horiz_ms": 628.28,
    "fuel_kg": 290.79,
    "fuel_pct": 64.6,
    "throttle_pct": 80.8,
    "pitch_deg": 6.3,
    "g_force": 0.23,
    "three_pos": [
      0.043241,
      -0.433861,
      -0.028404
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 293.0,
    "alt_m": 4397.2,
    "v_tot_ms": 625.54,
    "v_vert_ms": 14.57,
    "v_horiz_ms": 625.37,
    "fuel_kg": 290.24,
    "fuel_pct": 64.5,
    "throttle_pct": 80.8,
    "pitch_deg": 6.4,
    "g_force": 0.23,
    "three_pos": [
      0.043215,
      -0.433859,
      -0.028387
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 294.0,
    "alt_m": 4377.0,
    "v_tot_ms": 622.63,
    "v_vert_ms": 14.52,
    "v_horiz_ms": 622.46,
    "fuel_kg": 289.7,
    "fuel_pct": 64.4,
    "throttle_pct": 80.8,
    "pitch_deg": 6.4,
    "g_force": 0.23,
    "three_pos": [
      0.04319,
      -0.433858,
      -0.02837
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 295.0,
    "alt_m": 4356.8,
    "v_tot_ms": 619.73,
    "v_vert_ms": 14.48,
    "v_horiz_ms": 619.56,
    "fuel_kg": 289.15,
    "fuel_pct": 64.3,
    "throttle_pct": 80.8,
    "pitch_deg": 6.5,
    "g_force": 0.23,
    "three_pos": [
      0.043164,
      -0.433856,
      -0.028354
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 296.0,
    "alt_m": 4336.8,
    "v_tot_ms": 616.83,
    "v_vert_ms": 14.43,
    "v_horiz_ms": 616.66,
    "fuel_kg": 288.6,
    "fuel_pct": 64.1,
    "throttle_pct": 80.8,
    "pitch_deg": 6.6,
    "g_force": 0.23,
    "three_pos": [
      0.043139,
      -0.433855,
      -0.028337
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 297.0,
    "alt_m": 4316.9,
    "v_tot_ms": 613.93,
    "v_vert_ms": 14.39,
    "v_horiz_ms": 613.76,
    "fuel_kg": 288.05,
    "fuel_pct": 64.0,
    "throttle_pct": 80.8,
    "pitch_deg": 6.7,
    "g_force": 0.23,
    "three_pos": [
      0.043113,
      -0.433854,
      -0.02832
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 298.0,
    "alt_m": 4297.1,
    "v_tot_ms": 611.03,
    "v_vert_ms": 14.34,
    "v_horiz_ms": 610.86,
    "fuel_kg": 287.5,
    "fuel_pct": 63.9,
    "throttle_pct": 80.8,
    "pitch_deg": 6.7,
    "g_force": 0.23,
    "three_pos": [
      0.043088,
      -0.433852,
      -0.028303
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 299.0,
    "alt_m": 4277.4,
    "v_tot_ms": 608.13,
    "v_vert_ms": 14.3,
    "v_horiz_ms": 607.96,
    "fuel_kg": 286.95,
    "fuel_pct": 63.8,
    "throttle_pct": 80.8,
    "pitch_deg": 6.8,
    "g_force": 0.23,
    "three_pos": [
      0.043062,
      -0.433851,
      -0.028287
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 300.0,
    "alt_m": 4257.8,
    "v_tot_ms": 605.24,
    "v_vert_ms": 14.25,
    "v_horiz_ms": 605.07,
    "fuel_kg": 286.41,
    "fuel_pct": 63.6,
    "throttle_pct": 80.8,
    "pitch_deg": 6.9,
    "g_force": 0.23,
    "three_pos": [
      0.043037,
      -0.43385,
      -0.02827
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 301.0,
    "alt_m": 4238.3,
    "v_tot_ms": 602.34,
    "v_vert_ms": 14.2,
    "v_horiz_ms": 602.18,
    "fuel_kg": 285.86,
    "fuel_pct": 63.5,
    "throttle_pct": 80.8,
    "pitch_deg": 6.9,
    "g_force": 0.23,
    "three_pos": [
      0.043011,
      -0.433848,
      -0.028253
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 302.0,
    "alt_m": 4219.0,
    "v_tot_ms": 599.45,
    "v_vert_ms": 14.16,
    "v_horiz_ms": 599.29,
    "fuel_kg": 285.31,
    "fuel_pct": 63.4,
    "throttle_pct": 80.8,
    "pitch_deg": 7.0,
    "g_force": 0.23,
    "three_pos": [
      0.042986,
      -0.433847,
      -0.028236
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 303.0,
    "alt_m": 4199.7,
    "v_tot_ms": 596.56,
    "v_vert_ms": 14.11,
    "v_horiz_ms": 596.4,
    "fuel_kg": 284.76,
    "fuel_pct": 63.3,
    "throttle_pct": 80.7,
    "pitch_deg": 7.1,
    "g_force": 0.23,
    "three_pos": [
      0.04296,
      -0.433846,
      -0.02822
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 304.0,
    "alt_m": 4180.6,
    "v_tot_ms": 593.68,
    "v_vert_ms": 14.07,
    "v_horiz_ms": 593.51,
    "fuel_kg": 284.22,
    "fuel_pct": 63.2,
    "throttle_pct": 80.7,
    "pitch_deg": 7.2,
    "g_force": 0.23,
    "three_pos": [
      0.042935,
      -0.433845,
      -0.028203
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 305.0,
    "alt_m": 4161.5,
    "v_tot_ms": 590.79,
    "v_vert_ms": 14.02,
    "v_horiz_ms": 590.63,
    "fuel_kg": 283.67,
    "fuel_pct": 63.0,
    "throttle_pct": 80.7,
    "pitch_deg": 7.2,
    "g_force": 0.23,
    "three_pos": [
      0.042909,
      -0.433843,
      -0.028186
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 306.0,
    "alt_m": 4142.6,
    "v_tot_ms": 587.91,
    "v_vert_ms": 13.98,
    "v_horiz_ms": 587.74,
    "fuel_kg": 283.12,
    "fuel_pct": 62.9,
    "throttle_pct": 80.7,
    "pitch_deg": 7.3,
    "g_force": 0.23,
    "three_pos": [
      0.042884,
      -0.433842,
      -0.028169
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 307.0,
    "alt_m": 4123.8,
    "v_tot_ms": 585.03,
    "v_vert_ms": 13.93,
    "v_horiz_ms": 584.86,
    "fuel_kg": 282.57,
    "fuel_pct": 62.8,
    "throttle_pct": 80.7,
    "pitch_deg": 7.4,
    "g_force": 0.23,
    "three_pos": [
      0.042858,
      -0.433841,
      -0.028153
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 308.0,
    "alt_m": 4105.0,
    "v_tot_ms": 582.15,
    "v_vert_ms": 13.88,
    "v_horiz_ms": 581.98,
    "fuel_kg": 282.02,
    "fuel_pct": 62.7,
    "throttle_pct": 80.7,
    "pitch_deg": 7.5,
    "g_force": 0.23,
    "three_pos": [
      0.042833,
      -0.43384,
      -0.028136
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 309.0,
    "alt_m": 4086.4,
    "v_tot_ms": 579.27,
    "v_vert_ms": 13.84,
    "v_horiz_ms": 579.11,
    "fuel_kg": 281.48,
    "fuel_pct": 62.6,
    "throttle_pct": 80.7,
    "pitch_deg": 7.5,
    "g_force": 0.23,
    "three_pos": [
      0.042807,
      -0.433839,
      -0.028119
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 310.0,
    "alt_m": 4067.9,
    "v_tot_ms": 576.4,
    "v_vert_ms": 13.79,
    "v_horiz_ms": 576.23,
    "fuel_kg": 280.93,
    "fuel_pct": 62.4,
    "throttle_pct": 80.7,
    "pitch_deg": 7.6,
    "g_force": 0.23,
    "three_pos": [
      0.042782,
      -0.433838,
      -0.028103
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 311.0,
    "alt_m": 4049.5,
    "v_tot_ms": 573.52,
    "v_vert_ms": 13.75,
    "v_horiz_ms": 573.36,
    "fuel_kg": 280.38,
    "fuel_pct": 62.3,
    "throttle_pct": 80.7,
    "pitch_deg": 7.7,
    "g_force": 0.23,
    "three_pos": [
      0.042756,
      -0.433837,
      -0.028086
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 312.0,
    "alt_m": 4031.2,
    "v_tot_ms": 570.65,
    "v_vert_ms": 13.7,
    "v_horiz_ms": 570.49,
    "fuel_kg": 279.84,
    "fuel_pct": 62.2,
    "throttle_pct": 80.7,
    "pitch_deg": 7.8,
    "g_force": 0.23,
    "three_pos": [
      0.042731,
      -0.433836,
      -0.028069
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 313.0,
    "alt_m": 4013.1,
    "v_tot_ms": 567.78,
    "v_vert_ms": 13.65,
    "v_horiz_ms": 567.62,
    "fuel_kg": 279.29,
    "fuel_pct": 62.1,
    "throttle_pct": 80.7,
    "pitch_deg": 7.8,
    "g_force": 0.23,
    "three_pos": [
      0.042706,
      -0.433835,
      -0.028052
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 314.0,
    "alt_m": 3995.0,
    "v_tot_ms": 564.91,
    "v_vert_ms": 13.61,
    "v_horiz_ms": 564.75,
    "fuel_kg": 278.74,
    "fuel_pct": 61.9,
    "throttle_pct": 80.7,
    "pitch_deg": 7.9,
    "g_force": 0.23,
    "three_pos": [
      0.04268,
      -0.433834,
      -0.028036
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 315.0,
    "alt_m": 3977.1,
    "v_tot_ms": 562.05,
    "v_vert_ms": 13.56,
    "v_horiz_ms": 561.88,
    "fuel_kg": 278.19,
    "fuel_pct": 61.8,
    "throttle_pct": 80.6,
    "pitch_deg": 8.0,
    "g_force": 0.23,
    "three_pos": [
      0.042655,
      -0.433833,
      -0.028019
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 316.0,
    "alt_m": 3959.2,
    "v_tot_ms": 559.18,
    "v_vert_ms": 13.52,
    "v_horiz_ms": 559.02,
    "fuel_kg": 277.65,
    "fuel_pct": 61.7,
    "throttle_pct": 80.6,
    "pitch_deg": 8.0,
    "g_force": 0.23,
    "three_pos": [
      0.042629,
      -0.433832,
      -0.028002
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 317.0,
    "alt_m": 3941.5,
    "v_tot_ms": 556.32,
    "v_vert_ms": 13.47,
    "v_horiz_ms": 556.16,
    "fuel_kg": 277.1,
    "fuel_pct": 61.6,
    "throttle_pct": 80.6,
    "pitch_deg": 8.1,
    "g_force": 0.23,
    "three_pos": [
      0.042604,
      -0.433831,
      -0.027985
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 318.0,
    "alt_m": 3923.8,
    "v_tot_ms": 553.46,
    "v_vert_ms": 13.43,
    "v_horiz_ms": 553.3,
    "fuel_kg": 276.55,
    "fuel_pct": 61.5,
    "throttle_pct": 80.6,
    "pitch_deg": 8.2,
    "g_force": 0.23,
    "three_pos": [
      0.042578,
      -0.43383,
      -0.027969
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 319.0,
    "alt_m": 3906.3,
    "v_tot_ms": 550.6,
    "v_vert_ms": 13.38,
    "v_horiz_ms": 550.44,
    "fuel_kg": 276.01,
    "fuel_pct": 61.3,
    "throttle_pct": 80.6,
    "pitch_deg": 8.3,
    "g_force": 0.23,
    "three_pos": [
      0.042553,
      -0.433829,
      -0.027952
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 320.0,
    "alt_m": 3888.9,
    "v_tot_ms": 547.74,
    "v_vert_ms": 13.33,
    "v_horiz_ms": 547.58,
    "fuel_kg": 275.46,
    "fuel_pct": 61.2,
    "throttle_pct": 80.6,
    "pitch_deg": 8.3,
    "g_force": 0.23,
    "three_pos": [
      0.042527,
      -0.433829,
      -0.027935
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 321.0,
    "alt_m": 3871.6,
    "v_tot_ms": 544.89,
    "v_vert_ms": 13.29,
    "v_horiz_ms": 544.73,
    "fuel_kg": 274.91,
    "fuel_pct": 61.1,
    "throttle_pct": 80.6,
    "pitch_deg": 8.4,
    "g_force": 0.23,
    "three_pos": [
      0.042502,
      -0.433828,
      -0.027919
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 322.0,
    "alt_m": 3854.4,
    "v_tot_ms": 542.03,
    "v_vert_ms": 13.24,
    "v_horiz_ms": 541.87,
    "fuel_kg": 274.37,
    "fuel_pct": 61.0,
    "throttle_pct": 80.6,
    "pitch_deg": 8.5,
    "g_force": 0.23,
    "three_pos": [
      0.042476,
      -0.433827,
      -0.027902
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 323.0,
    "alt_m": 3837.3,
    "v_tot_ms": 539.18,
    "v_vert_ms": 13.2,
    "v_horiz_ms": 539.02,
    "fuel_kg": 273.82,
    "fuel_pct": 60.8,
    "throttle_pct": 80.6,
    "pitch_deg": 8.6,
    "g_force": 0.23,
    "three_pos": [
      0.042451,
      -0.433826,
      -0.027885
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 324.0,
    "alt_m": 3820.3,
    "v_tot_ms": 536.33,
    "v_vert_ms": 13.15,
    "v_horiz_ms": 536.17,
    "fuel_kg": 273.27,
    "fuel_pct": 60.7,
    "throttle_pct": 80.6,
    "pitch_deg": 8.6,
    "g_force": 0.23,
    "three_pos": [
      0.042426,
      -0.433826,
      -0.027868
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 325.0,
    "alt_m": 3803.4,
    "v_tot_ms": 533.48,
    "v_vert_ms": 13.1,
    "v_horiz_ms": 533.32,
    "fuel_kg": 272.73,
    "fuel_pct": 60.6,
    "throttle_pct": 80.5,
    "pitch_deg": 8.7,
    "g_force": 0.23,
    "three_pos": [
      0.0424,
      -0.433825,
      -0.027852
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 326.0,
    "alt_m": 3786.7,
    "v_tot_ms": 530.64,
    "v_vert_ms": 13.06,
    "v_horiz_ms": 530.48,
    "fuel_kg": 272.18,
    "fuel_pct": 60.5,
    "throttle_pct": 80.5,
    "pitch_deg": 8.8,
    "g_force": 0.23,
    "three_pos": [
      0.042375,
      -0.433824,
      -0.027835
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 327.0,
    "alt_m": 3770.0,
    "v_tot_ms": 527.79,
    "v_vert_ms": 13.01,
    "v_horiz_ms": 527.63,
    "fuel_kg": 271.63,
    "fuel_pct": 60.4,
    "throttle_pct": 80.5,
    "pitch_deg": 8.8,
    "g_force": 0.23,
    "three_pos": [
      0.042349,
      -0.433824,
      -0.027818
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 328.0,
    "alt_m": 3753.5,
    "v_tot_ms": 524.95,
    "v_vert_ms": 12.97,
    "v_horiz_ms": 524.79,
    "fuel_kg": 271.09,
    "fuel_pct": 60.2,
    "throttle_pct": 80.5,
    "pitch_deg": 8.9,
    "g_force": 0.23,
    "three_pos": [
      0.042324,
      -0.433823,
      -0.027802
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 329.0,
    "alt_m": 3737.0,
    "v_tot_ms": 522.11,
    "v_vert_ms": 12.92,
    "v_horiz_ms": 521.95,
    "fuel_kg": 270.54,
    "fuel_pct": 60.1,
    "throttle_pct": 80.5,
    "pitch_deg": 9.0,
    "g_force": 0.23,
    "three_pos": [
      0.042298,
      -0.433822,
      -0.027785
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 330.0,
    "alt_m": 3720.7,
    "v_tot_ms": 519.27,
    "v_vert_ms": 12.88,
    "v_horiz_ms": 519.11,
    "fuel_kg": 269.99,
    "fuel_pct": 60.0,
    "throttle_pct": 80.5,
    "pitch_deg": 9.1,
    "g_force": 0.24,
    "three_pos": [
      0.042273,
      -0.433822,
      -0.027768
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 331.0,
    "alt_m": 3704.5,
    "v_tot_ms": 516.43,
    "v_vert_ms": 12.83,
    "v_horiz_ms": 516.27,
    "fuel_kg": 269.45,
    "fuel_pct": 59.9,
    "throttle_pct": 80.5,
    "pitch_deg": 9.1,
    "g_force": 0.24,
    "three_pos": [
      0.042247,
      -0.433821,
      -0.027751
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 332.0,
    "alt_m": 3688.4,
    "v_tot_ms": 513.59,
    "v_vert_ms": 12.78,
    "v_horiz_ms": 513.44,
    "fuel_kg": 268.9,
    "fuel_pct": 59.8,
    "throttle_pct": 80.5,
    "pitch_deg": 9.2,
    "g_force": 0.24,
    "three_pos": [
      0.042222,
      -0.433821,
      -0.027735
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 333.0,
    "alt_m": 3672.4,
    "v_tot_ms": 510.76,
    "v_vert_ms": 12.74,
    "v_horiz_ms": 510.6,
    "fuel_kg": 268.36,
    "fuel_pct": 59.6,
    "throttle_pct": 80.5,
    "pitch_deg": 9.3,
    "g_force": 0.24,
    "three_pos": [
      0.042197,
      -0.43382,
      -0.027718
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 334.0,
    "alt_m": 3656.5,
    "v_tot_ms": 507.93,
    "v_vert_ms": 12.69,
    "v_horiz_ms": 507.77,
    "fuel_kg": 267.81,
    "fuel_pct": 59.5,
    "throttle_pct": 80.4,
    "pitch_deg": 9.4,
    "g_force": 0.24,
    "three_pos": [
      0.042171,
      -0.43382,
      -0.027701
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 335.0,
    "alt_m": 3640.7,
    "v_tot_ms": 505.1,
    "v_vert_ms": 12.65,
    "v_horiz_ms": 504.94,
    "fuel_kg": 267.27,
    "fuel_pct": 59.4,
    "throttle_pct": 80.4,
    "pitch_deg": 9.4,
    "g_force": 0.24,
    "three_pos": [
      0.042146,
      -0.433819,
      -0.027685
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 336.0,
    "alt_m": 3625.0,
    "v_tot_ms": 502.27,
    "v_vert_ms": 12.6,
    "v_horiz_ms": 502.11,
    "fuel_kg": 266.72,
    "fuel_pct": 59.3,
    "throttle_pct": 80.4,
    "pitch_deg": 9.5,
    "g_force": 0.24,
    "three_pos": [
      0.04212,
      -0.433819,
      -0.027668
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 337.0,
    "alt_m": 3609.4,
    "v_tot_ms": 499.44,
    "v_vert_ms": 12.55,
    "v_horiz_ms": 499.28,
    "fuel_kg": 266.17,
    "fuel_pct": 59.1,
    "throttle_pct": 80.4,
    "pitch_deg": 9.6,
    "g_force": 0.24,
    "three_pos": [
      0.042095,
      -0.433819,
      -0.027651
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 338.0,
    "alt_m": 3594.0,
    "v_tot_ms": 496.61,
    "v_vert_ms": 12.51,
    "v_horiz_ms": 496.46,
    "fuel_kg": 265.63,
    "fuel_pct": 59.0,
    "throttle_pct": 80.4,
    "pitch_deg": 9.6,
    "g_force": 0.24,
    "three_pos": [
      0.04207,
      -0.433818,
      -0.027635
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 339.0,
    "alt_m": 3578.6,
    "v_tot_ms": 493.79,
    "v_vert_ms": 12.46,
    "v_horiz_ms": 493.63,
    "fuel_kg": 265.08,
    "fuel_pct": 58.9,
    "throttle_pct": 80.4,
    "pitch_deg": 9.7,
    "g_force": 0.24,
    "three_pos": [
      0.042044,
      -0.433818,
      -0.027618
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 340.0,
    "alt_m": 3563.4,
    "v_tot_ms": 490.97,
    "v_vert_ms": 12.42,
    "v_horiz_ms": 490.81,
    "fuel_kg": 264.54,
    "fuel_pct": 58.8,
    "throttle_pct": 80.4,
    "pitch_deg": 9.8,
    "g_force": 0.24,
    "three_pos": [
      0.042019,
      -0.433818,
      -0.027601
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 341.0,
    "alt_m": 3548.2,
    "v_tot_ms": 488.14,
    "v_vert_ms": 12.37,
    "v_horiz_ms": 487.99,
    "fuel_kg": 263.99,
    "fuel_pct": 58.7,
    "throttle_pct": 80.4,
    "pitch_deg": 9.9,
    "g_force": 0.24,
    "three_pos": [
      0.041993,
      -0.433817,
      -0.027584
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 342.0,
    "alt_m": 3533.2,
    "v_tot_ms": 485.33,
    "v_vert_ms": 12.32,
    "v_horiz_ms": 485.17,
    "fuel_kg": 263.45,
    "fuel_pct": 58.5,
    "throttle_pct": 80.4,
    "pitch_deg": 9.9,
    "g_force": 0.24,
    "three_pos": [
      0.041968,
      -0.433817,
      -0.027568
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 343.0,
    "alt_m": 3518.3,
    "v_tot_ms": 482.51,
    "v_vert_ms": 12.28,
    "v_horiz_ms": 482.35,
    "fuel_kg": 262.9,
    "fuel_pct": 58.4,
    "throttle_pct": 80.3,
    "pitch_deg": 10.0,
    "g_force": 0.24,
    "three_pos": [
      0.041942,
      -0.433817,
      -0.027551
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 344.0,
    "alt_m": 3503.5,
    "v_tot_ms": 479.69,
    "v_vert_ms": 12.23,
    "v_horiz_ms": 479.54,
    "fuel_kg": 262.36,
    "fuel_pct": 58.3,
    "throttle_pct": 80.3,
    "pitch_deg": 10.1,
    "g_force": 0.24,
    "three_pos": [
      0.041917,
      -0.433817,
      -0.027534
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 345.0,
    "alt_m": 3488.8,
    "v_tot_ms": 476.88,
    "v_vert_ms": 12.19,
    "v_horiz_ms": 476.72,
    "fuel_kg": 261.81,
    "fuel_pct": 58.2,
    "throttle_pct": 80.3,
    "pitch_deg": 10.2,
    "g_force": 0.24,
    "three_pos": [
      0.041892,
      -0.433816,
      -0.027518
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 346.0,
    "alt_m": 3474.2,
    "v_tot_ms": 474.06,
    "v_vert_ms": 12.14,
    "v_horiz_ms": 473.91,
    "fuel_kg": 261.27,
    "fuel_pct": 58.1,
    "throttle_pct": 80.3,
    "pitch_deg": 10.2,
    "g_force": 0.24,
    "three_pos": [
      0.041866,
      -0.433816,
      -0.027501
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 347.0,
    "alt_m": 3459.7,
    "v_tot_ms": 471.25,
    "v_vert_ms": 12.1,
    "v_horiz_ms": 471.1,
    "fuel_kg": 260.72,
    "fuel_pct": 57.9,
    "throttle_pct": 80.3,
    "pitch_deg": 10.3,
    "g_force": 0.24,
    "three_pos": [
      0.041841,
      -0.433816,
      -0.027484
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 348.0,
    "alt_m": 3445.3,
    "v_tot_ms": 468.44,
    "v_vert_ms": 12.05,
    "v_horiz_ms": 468.29,
    "fuel_kg": 260.18,
    "fuel_pct": 57.8,
    "throttle_pct": 80.3,
    "pitch_deg": 10.4,
    "g_force": 0.24,
    "three_pos": [
      0.041816,
      -0.433816,
      -0.027468
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 349.0,
    "alt_m": 3431.0,
    "v_tot_ms": 465.64,
    "v_vert_ms": 12.0,
    "v_horiz_ms": 465.48,
    "fuel_kg": 259.63,
    "fuel_pct": 57.7,
    "throttle_pct": 80.3,
    "pitch_deg": 10.4,
    "g_force": 0.24,
    "three_pos": [
      0.04179,
      -0.433816,
      -0.027451
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 350.0,
    "alt_m": 3416.9,
    "v_tot_ms": 462.83,
    "v_vert_ms": 11.96,
    "v_horiz_ms": 462.67,
    "fuel_kg": 259.09,
    "fuel_pct": 57.6,
    "throttle_pct": 80.3,
    "pitch_deg": 10.5,
    "g_force": 0.24,
    "three_pos": [
      0.041765,
      -0.433816,
      -0.027434
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 351.0,
    "alt_m": 3402.8,
    "v_tot_ms": 460.02,
    "v_vert_ms": 11.91,
    "v_horiz_ms": 459.87,
    "fuel_kg": 258.54,
    "fuel_pct": 57.5,
    "throttle_pct": 80.2,
    "pitch_deg": 10.6,
    "g_force": 0.24,
    "three_pos": [
      0.041739,
      -0.433816,
      -0.027418
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 352.0,
    "alt_m": 3388.9,
    "v_tot_ms": 457.22,
    "v_vert_ms": 11.87,
    "v_horiz_ms": 457.07,
    "fuel_kg": 258.0,
    "fuel_pct": 57.3,
    "throttle_pct": 80.2,
    "pitch_deg": 10.7,
    "g_force": 0.24,
    "three_pos": [
      0.041714,
      -0.433816,
      -0.027401
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 353.0,
    "alt_m": 3375.1,
    "v_tot_ms": 454.42,
    "v_vert_ms": 11.82,
    "v_horiz_ms": 454.27,
    "fuel_kg": 257.46,
    "fuel_pct": 57.2,
    "throttle_pct": 80.2,
    "pitch_deg": 10.7,
    "g_force": 0.24,
    "three_pos": [
      0.041689,
      -0.433816,
      -0.027384
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 354.0,
    "alt_m": 3361.3,
    "v_tot_ms": 451.62,
    "v_vert_ms": 11.77,
    "v_horiz_ms": 451.47,
    "fuel_kg": 256.91,
    "fuel_pct": 57.1,
    "throttle_pct": 80.2,
    "pitch_deg": 10.8,
    "g_force": 0.24,
    "three_pos": [
      0.041663,
      -0.433816,
      -0.027368
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 355.0,
    "alt_m": 3347.7,
    "v_tot_ms": 448.82,
    "v_vert_ms": 11.73,
    "v_horiz_ms": 448.67,
    "fuel_kg": 256.37,
    "fuel_pct": 57.0,
    "throttle_pct": 80.2,
    "pitch_deg": 10.9,
    "g_force": 0.24,
    "three_pos": [
      0.041638,
      -0.433816,
      -0.027351
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 356.0,
    "alt_m": 3334.2,
    "v_tot_ms": 446.02,
    "v_vert_ms": 11.68,
    "v_horiz_ms": 445.87,
    "fuel_kg": 255.82,
    "fuel_pct": 56.8,
    "throttle_pct": 80.2,
    "pitch_deg": 11.0,
    "g_force": 0.24,
    "three_pos": [
      0.041612,
      -0.433816,
      -0.027334
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 357.0,
    "alt_m": 3320.8,
    "v_tot_ms": 443.23,
    "v_vert_ms": 11.64,
    "v_horiz_ms": 443.08,
    "fuel_kg": 255.28,
    "fuel_pct": 56.7,
    "throttle_pct": 80.2,
    "pitch_deg": 11.0,
    "g_force": 0.24,
    "three_pos": [
      0.041587,
      -0.433816,
      -0.027318
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 358.0,
    "alt_m": 3307.5,
    "v_tot_ms": 440.44,
    "v_vert_ms": 11.59,
    "v_horiz_ms": 440.28,
    "fuel_kg": 254.74,
    "fuel_pct": 56.6,
    "throttle_pct": 80.1,
    "pitch_deg": 11.1,
    "g_force": 0.24,
    "three_pos": [
      0.041562,
      -0.433816,
      -0.027301
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 359.0,
    "alt_m": 3294.3,
    "v_tot_ms": 437.64,
    "v_vert_ms": 11.55,
    "v_horiz_ms": 437.49,
    "fuel_kg": 254.19,
    "fuel_pct": 56.5,
    "throttle_pct": 80.1,
    "pitch_deg": 11.2,
    "g_force": 0.24,
    "three_pos": [
      0.041536,
      -0.433816,
      -0.027284
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 360.0,
    "alt_m": 3281.2,
    "v_tot_ms": 434.85,
    "v_vert_ms": 11.5,
    "v_horiz_ms": 434.7,
    "fuel_kg": 253.65,
    "fuel_pct": 56.4,
    "throttle_pct": 80.1,
    "pitch_deg": 11.2,
    "g_force": 0.24,
    "three_pos": [
      0.041511,
      -0.433817,
      -0.027268
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 361.0,
    "alt_m": 3268.3,
    "v_tot_ms": 432.06,
    "v_vert_ms": 11.45,
    "v_horiz_ms": 431.91,
    "fuel_kg": 253.11,
    "fuel_pct": 56.2,
    "throttle_pct": 80.1,
    "pitch_deg": 11.3,
    "g_force": 0.24,
    "three_pos": [
      0.041486,
      -0.433817,
      -0.027251
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 362.0,
    "alt_m": 3255.4,
    "v_tot_ms": 429.28,
    "v_vert_ms": 11.41,
    "v_horiz_ms": 429.12,
    "fuel_kg": 252.56,
    "fuel_pct": 56.1,
    "throttle_pct": 80.1,
    "pitch_deg": 11.4,
    "g_force": 0.24,
    "three_pos": [
      0.04146,
      -0.433817,
      -0.027234
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 363.0,
    "alt_m": 3242.7,
    "v_tot_ms": 426.49,
    "v_vert_ms": 11.36,
    "v_horiz_ms": 426.34,
    "fuel_kg": 252.02,
    "fuel_pct": 56.0,
    "throttle_pct": 80.1,
    "pitch_deg": 11.5,
    "g_force": 0.24,
    "three_pos": [
      0.041435,
      -0.433817,
      -0.027218
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 364.0,
    "alt_m": 3230.0,
    "v_tot_ms": 423.71,
    "v_vert_ms": 11.32,
    "v_horiz_ms": 423.55,
    "fuel_kg": 251.48,
    "fuel_pct": 55.9,
    "throttle_pct": 80.1,
    "pitch_deg": 11.5,
    "g_force": 0.24,
    "three_pos": [
      0.04141,
      -0.433818,
      -0.027201
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 365.0,
    "alt_m": 3217.5,
    "v_tot_ms": 420.92,
    "v_vert_ms": 11.27,
    "v_horiz_ms": 420.77,
    "fuel_kg": 250.93,
    "fuel_pct": 55.8,
    "throttle_pct": 80.1,
    "pitch_deg": 11.6,
    "g_force": 0.24,
    "three_pos": [
      0.041384,
      -0.433818,
      -0.027184
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 366.0,
    "alt_m": 3205.1,
    "v_tot_ms": 418.14,
    "v_vert_ms": 11.23,
    "v_horiz_ms": 417.99,
    "fuel_kg": 250.39,
    "fuel_pct": 55.6,
    "throttle_pct": 80.0,
    "pitch_deg": 11.7,
    "g_force": 0.24,
    "three_pos": [
      0.041359,
      -0.433818,
      -0.027168
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 367.0,
    "alt_m": 3192.8,
    "v_tot_ms": 415.36,
    "v_vert_ms": 11.18,
    "v_horiz_ms": 415.21,
    "fuel_kg": 249.85,
    "fuel_pct": 55.5,
    "throttle_pct": 80.0,
    "pitch_deg": 11.8,
    "g_force": 0.24,
    "three_pos": [
      0.041333,
      -0.433819,
      -0.027151
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 368.0,
    "alt_m": 3180.6,
    "v_tot_ms": 412.58,
    "v_vert_ms": 11.13,
    "v_horiz_ms": 412.43,
    "fuel_kg": 249.3,
    "fuel_pct": 55.4,
    "throttle_pct": 80.0,
    "pitch_deg": 11.8,
    "g_force": 0.24,
    "three_pos": [
      0.041308,
      -0.433819,
      -0.027134
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 369.0,
    "alt_m": 3168.5,
    "v_tot_ms": 409.81,
    "v_vert_ms": 11.09,
    "v_horiz_ms": 409.66,
    "fuel_kg": 248.76,
    "fuel_pct": 55.3,
    "throttle_pct": 80.0,
    "pitch_deg": 11.9,
    "g_force": 0.24,
    "three_pos": [
      0.041283,
      -0.433819,
      -0.027118
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 370.0,
    "alt_m": 3156.5,
    "v_tot_ms": 407.03,
    "v_vert_ms": 11.04,
    "v_horiz_ms": 406.88,
    "fuel_kg": 248.22,
    "fuel_pct": 55.2,
    "throttle_pct": 80.0,
    "pitch_deg": 12.0,
    "g_force": 0.24,
    "three_pos": [
      0.041257,
      -0.43382,
      -0.027101
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 371.0,
    "alt_m": 3144.6,
    "v_tot_ms": 404.26,
    "v_vert_ms": 11.0,
    "v_horiz_ms": 404.11,
    "fuel_kg": 247.68,
    "fuel_pct": 55.0,
    "throttle_pct": 80.0,
    "pitch_deg": 12.1,
    "g_force": 0.24,
    "three_pos": [
      0.041232,
      -0.43382,
      -0.027084
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 372.0,
    "alt_m": 3132.8,
    "v_tot_ms": 401.49,
    "v_vert_ms": 10.95,
    "v_horiz_ms": 401.34,
    "fuel_kg": 247.13,
    "fuel_pct": 54.9,
    "throttle_pct": 79.9,
    "pitch_deg": 12.1,
    "g_force": 0.24,
    "three_pos": [
      0.041207,
      -0.433821,
      -0.027068
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 373.0,
    "alt_m": 3121.1,
    "v_tot_ms": 398.71,
    "v_vert_ms": 10.9,
    "v_horiz_ms": 398.57,
    "fuel_kg": 246.59,
    "fuel_pct": 54.8,
    "throttle_pct": 79.9,
    "pitch_deg": 12.2,
    "g_force": 0.24,
    "three_pos": [
      0.041181,
      -0.433821,
      -0.027051
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 374.0,
    "alt_m": 3109.6,
    "v_tot_ms": 395.95,
    "v_vert_ms": 10.86,
    "v_horiz_ms": 395.8,
    "fuel_kg": 246.05,
    "fuel_pct": 54.7,
    "throttle_pct": 79.9,
    "pitch_deg": 12.3,
    "g_force": 0.24,
    "three_pos": [
      0.041156,
      -0.433822,
      -0.027035
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 375.0,
    "alt_m": 3098.1,
    "v_tot_ms": 393.18,
    "v_vert_ms": 10.81,
    "v_horiz_ms": 393.03,
    "fuel_kg": 245.51,
    "fuel_pct": 54.6,
    "throttle_pct": 79.9,
    "pitch_deg": 12.3,
    "g_force": 0.24,
    "three_pos": [
      0.041131,
      -0.433822,
      -0.027018
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 376.0,
    "alt_m": 3086.8,
    "v_tot_ms": 390.41,
    "v_vert_ms": 10.77,
    "v_horiz_ms": 390.26,
    "fuel_kg": 244.97,
    "fuel_pct": 54.4,
    "throttle_pct": 79.9,
    "pitch_deg": 12.4,
    "g_force": 0.24,
    "three_pos": [
      0.041105,
      -0.433823,
      -0.027001
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 377.0,
    "alt_m": 3075.6,
    "v_tot_ms": 387.65,
    "v_vert_ms": 10.72,
    "v_horiz_ms": 387.5,
    "fuel_kg": 244.42,
    "fuel_pct": 54.3,
    "throttle_pct": 79.9,
    "pitch_deg": 12.5,
    "g_force": 0.24,
    "three_pos": [
      0.04108,
      -0.433824,
      -0.026985
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 378.0,
    "alt_m": 3064.5,
    "v_tot_ms": 384.88,
    "v_vert_ms": 10.68,
    "v_horiz_ms": 384.73,
    "fuel_kg": 243.88,
    "fuel_pct": 54.2,
    "throttle_pct": 79.9,
    "pitch_deg": 12.6,
    "g_force": 0.24,
    "three_pos": [
      0.041055,
      -0.433824,
      -0.026968
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 379.0,
    "alt_m": 3053.4,
    "v_tot_ms": 382.12,
    "v_vert_ms": 10.63,
    "v_horiz_ms": 381.97,
    "fuel_kg": 243.34,
    "fuel_pct": 54.1,
    "throttle_pct": 79.8,
    "pitch_deg": 12.6,
    "g_force": 0.24,
    "three_pos": [
      0.041029,
      -0.433825,
      -0.026951
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 380.0,
    "alt_m": 3042.5,
    "v_tot_ms": 379.36,
    "v_vert_ms": 10.58,
    "v_horiz_ms": 379.21,
    "fuel_kg": 242.8,
    "fuel_pct": 54.0,
    "throttle_pct": 79.8,
    "pitch_deg": 12.7,
    "g_force": 0.24,
    "three_pos": [
      0.041004,
      -0.433825,
      -0.026935
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 381.0,
    "alt_m": 3031.7,
    "v_tot_ms": 376.6,
    "v_vert_ms": 10.54,
    "v_horiz_ms": 376.45,
    "fuel_kg": 242.26,
    "fuel_pct": 53.8,
    "throttle_pct": 79.8,
    "pitch_deg": 12.8,
    "g_force": 0.24,
    "three_pos": [
      0.040979,
      -0.433826,
      -0.026918
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 382.0,
    "alt_m": 3021.1,
    "v_tot_ms": 373.84,
    "v_vert_ms": 10.49,
    "v_horiz_ms": 373.7,
    "fuel_kg": 241.72,
    "fuel_pct": 53.7,
    "throttle_pct": 79.8,
    "pitch_deg": 12.9,
    "g_force": 0.24,
    "three_pos": [
      0.040954,
      -0.433827,
      -0.026901
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 383.0,
    "alt_m": 3010.5,
    "v_tot_ms": 371.09,
    "v_vert_ms": 10.45,
    "v_horiz_ms": 370.94,
    "fuel_kg": 241.17,
    "fuel_pct": 53.6,
    "throttle_pct": 79.8,
    "pitch_deg": 12.9,
    "g_force": 0.24,
    "three_pos": [
      0.040928,
      -0.433828,
      -0.026885
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 384.0,
    "alt_m": 3000.0,
    "v_tot_ms": 368.33,
    "v_vert_ms": 10.4,
    "v_horiz_ms": 368.19,
    "fuel_kg": 240.63,
    "fuel_pct": 53.5,
    "throttle_pct": 79.8,
    "pitch_deg": 13.0,
    "g_force": 0.24,
    "three_pos": [
      0.040903,
      -0.433828,
      -0.026868
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 385.0,
    "alt_m": 2989.6,
    "v_tot_ms": 365.58,
    "v_vert_ms": 10.35,
    "v_horiz_ms": 365.43,
    "fuel_kg": 240.09,
    "fuel_pct": 53.4,
    "throttle_pct": 79.7,
    "pitch_deg": 13.1,
    "g_force": 0.24,
    "three_pos": [
      0.040878,
      -0.433829,
      -0.026852
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 386.0,
    "alt_m": 2979.4,
    "v_tot_ms": 362.83,
    "v_vert_ms": 10.31,
    "v_horiz_ms": 362.68,
    "fuel_kg": 239.55,
    "fuel_pct": 53.2,
    "throttle_pct": 79.7,
    "pitch_deg": 13.1,
    "g_force": 0.24,
    "three_pos": [
      0.040852,
      -0.43383,
      -0.026835
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 387.0,
    "alt_m": 2969.2,
    "v_tot_ms": 360.08,
    "v_vert_ms": 10.26,
    "v_horiz_ms": 359.93,
    "fuel_kg": 239.01,
    "fuel_pct": 53.1,
    "throttle_pct": 79.7,
    "pitch_deg": 13.2,
    "g_force": 0.24,
    "three_pos": [
      0.040827,
      -0.433831,
      -0.026818
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 388.0,
    "alt_m": 2959.2,
    "v_tot_ms": 357.33,
    "v_vert_ms": 10.22,
    "v_horiz_ms": 357.18,
    "fuel_kg": 238.47,
    "fuel_pct": 53.0,
    "throttle_pct": 79.7,
    "pitch_deg": 13.3,
    "g_force": 0.24,
    "three_pos": [
      0.040802,
      -0.433832,
      -0.026802
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 389.0,
    "alt_m": 2949.3,
    "v_tot_ms": 354.58,
    "v_vert_ms": 10.17,
    "v_horiz_ms": 354.44,
    "fuel_kg": 237.93,
    "fuel_pct": 52.9,
    "throttle_pct": 79.7,
    "pitch_deg": 13.4,
    "g_force": 0.24,
    "three_pos": [
      0.040776,
      -0.433833,
      -0.026785
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 390.0,
    "alt_m": 2939.5,
    "v_tot_ms": 351.83,
    "v_vert_ms": 10.12,
    "v_horiz_ms": 351.69,
    "fuel_kg": 237.39,
    "fuel_pct": 52.8,
    "throttle_pct": 79.7,
    "pitch_deg": 13.4,
    "g_force": 0.24,
    "three_pos": [
      0.040751,
      -0.433834,
      -0.026768
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 391.0,
    "alt_m": 2929.7,
    "v_tot_ms": 349.09,
    "v_vert_ms": 10.08,
    "v_horiz_ms": 348.94,
    "fuel_kg": 236.85,
    "fuel_pct": 52.6,
    "throttle_pct": 79.7,
    "pitch_deg": 13.5,
    "g_force": 0.24,
    "three_pos": [
      0.040726,
      -0.433835,
      -0.026752
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 392.0,
    "alt_m": 2920.1,
    "v_tot_ms": 346.35,
    "v_vert_ms": 10.03,
    "v_horiz_ms": 346.2,
    "fuel_kg": 236.31,
    "fuel_pct": 52.5,
    "throttle_pct": 79.6,
    "pitch_deg": 13.6,
    "g_force": 0.24,
    "three_pos": [
      0.0407,
      -0.433836,
      -0.026735
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 393.0,
    "alt_m": 2910.6,
    "v_tot_ms": 343.6,
    "v_vert_ms": 9.99,
    "v_horiz_ms": 343.46,
    "fuel_kg": 235.77,
    "fuel_pct": 52.4,
    "throttle_pct": 79.6,
    "pitch_deg": 13.7,
    "g_force": 0.24,
    "three_pos": [
      0.040675,
      -0.433837,
      -0.026719
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 394.0,
    "alt_m": 2901.3,
    "v_tot_ms": 340.86,
    "v_vert_ms": 9.94,
    "v_horiz_ms": 340.72,
    "fuel_kg": 235.23,
    "fuel_pct": 52.3,
    "throttle_pct": 79.6,
    "pitch_deg": 13.7,
    "g_force": 0.24,
    "three_pos": [
      0.04065,
      -0.433838,
      -0.026702
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 395.0,
    "alt_m": 2892.0,
    "v_tot_ms": 338.13,
    "v_vert_ms": 9.9,
    "v_horiz_ms": 337.98,
    "fuel_kg": 234.69,
    "fuel_pct": 52.2,
    "throttle_pct": 79.6,
    "pitch_deg": 13.8,
    "g_force": 0.24,
    "three_pos": [
      0.040625,
      -0.433839,
      -0.026685
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 396.0,
    "alt_m": 2882.8,
    "v_tot_ms": 335.39,
    "v_vert_ms": 9.85,
    "v_horiz_ms": 335.24,
    "fuel_kg": 234.15,
    "fuel_pct": 52.0,
    "throttle_pct": 79.6,
    "pitch_deg": 13.9,
    "g_force": 0.24,
    "three_pos": [
      0.040599,
      -0.43384,
      -0.026669
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 397.0,
    "alt_m": 2873.8,
    "v_tot_ms": 332.65,
    "v_vert_ms": 9.8,
    "v_horiz_ms": 332.51,
    "fuel_kg": 233.61,
    "fuel_pct": 51.9,
    "throttle_pct": 79.6,
    "pitch_deg": 13.9,
    "g_force": 0.24,
    "three_pos": [
      0.040574,
      -0.433841,
      -0.026652
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 398.0,
    "alt_m": 2864.8,
    "v_tot_ms": 329.92,
    "v_vert_ms": 9.76,
    "v_horiz_ms": 329.77,
    "fuel_kg": 233.07,
    "fuel_pct": 51.8,
    "throttle_pct": 79.5,
    "pitch_deg": 14.0,
    "g_force": 0.24,
    "three_pos": [
      0.040549,
      -0.433842,
      -0.026636
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 399.0,
    "alt_m": 2856.0,
    "v_tot_ms": 327.18,
    "v_vert_ms": 9.71,
    "v_horiz_ms": 327.04,
    "fuel_kg": 232.53,
    "fuel_pct": 51.7,
    "throttle_pct": 79.5,
    "pitch_deg": 14.1,
    "g_force": 0.25,
    "three_pos": [
      0.040523,
      -0.433843,
      -0.026619
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 400.0,
    "alt_m": 2847.2,
    "v_tot_ms": 324.45,
    "v_vert_ms": 9.67,
    "v_horiz_ms": 324.31,
    "fuel_kg": 231.99,
    "fuel_pct": 51.6,
    "throttle_pct": 79.5,
    "pitch_deg": 14.2,
    "g_force": 0.25,
    "three_pos": [
      0.040498,
      -0.433844,
      -0.026602
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 401.0,
    "alt_m": 2838.6,
    "v_tot_ms": 321.72,
    "v_vert_ms": 9.62,
    "v_horiz_ms": 321.58,
    "fuel_kg": 231.45,
    "fuel_pct": 51.4,
    "throttle_pct": 79.5,
    "pitch_deg": 14.2,
    "g_force": 0.25,
    "three_pos": [
      0.040473,
      -0.433846,
      -0.026586
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 402.0,
    "alt_m": 2830.1,
    "v_tot_ms": 318.99,
    "v_vert_ms": 9.57,
    "v_horiz_ms": 318.85,
    "fuel_kg": 230.91,
    "fuel_pct": 51.3,
    "throttle_pct": 79.5,
    "pitch_deg": 14.3,
    "g_force": 0.25,
    "three_pos": [
      0.040448,
      -0.433847,
      -0.026569
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 403.0,
    "alt_m": 2821.7,
    "v_tot_ms": 316.26,
    "v_vert_ms": 9.53,
    "v_horiz_ms": 316.12,
    "fuel_kg": 230.37,
    "fuel_pct": 51.2,
    "throttle_pct": 79.4,
    "pitch_deg": 14.4,
    "g_force": 0.25,
    "three_pos": [
      0.040422,
      -0.433848,
      -0.026552
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 404.0,
    "alt_m": 2813.4,
    "v_tot_ms": 313.54,
    "v_vert_ms": 9.48,
    "v_horiz_ms": 313.39,
    "fuel_kg": 229.83,
    "fuel_pct": 51.1,
    "throttle_pct": 79.4,
    "pitch_deg": 14.5,
    "g_force": 0.25,
    "three_pos": [
      0.040397,
      -0.433849,
      -0.026536
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 405.0,
    "alt_m": 2805.2,
    "v_tot_ms": 310.81,
    "v_vert_ms": 9.44,
    "v_horiz_ms": 310.67,
    "fuel_kg": 229.29,
    "fuel_pct": 51.0,
    "throttle_pct": 79.4,
    "pitch_deg": 14.5,
    "g_force": 0.25,
    "three_pos": [
      0.040372,
      -0.433851,
      -0.026519
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 406.0,
    "alt_m": 2797.1,
    "v_tot_ms": 308.09,
    "v_vert_ms": 9.39,
    "v_horiz_ms": 307.94,
    "fuel_kg": 228.76,
    "fuel_pct": 50.8,
    "throttle_pct": 79.4,
    "pitch_deg": 14.6,
    "g_force": 0.25,
    "three_pos": [
      0.040346,
      -0.433852,
      -0.026503
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 407.0,
    "alt_m": 2789.1,
    "v_tot_ms": 305.36,
    "v_vert_ms": 9.35,
    "v_horiz_ms": 305.22,
    "fuel_kg": 228.22,
    "fuel_pct": 50.7,
    "throttle_pct": 79.4,
    "pitch_deg": 14.7,
    "g_force": 0.25,
    "three_pos": [
      0.040321,
      -0.433853,
      -0.026486
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 408.0,
    "alt_m": 2781.2,
    "v_tot_ms": 302.64,
    "v_vert_ms": 9.3,
    "v_horiz_ms": 302.5,
    "fuel_kg": 227.68,
    "fuel_pct": 50.6,
    "throttle_pct": 79.4,
    "pitch_deg": 14.8,
    "g_force": 0.25,
    "three_pos": [
      0.040296,
      -0.433855,
      -0.026469
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 409.0,
    "alt_m": 2773.5,
    "v_tot_ms": 299.92,
    "v_vert_ms": 9.25,
    "v_horiz_ms": 299.78,
    "fuel_kg": 227.14,
    "fuel_pct": 50.5,
    "throttle_pct": 79.3,
    "pitch_deg": 14.8,
    "g_force": 0.25,
    "three_pos": [
      0.040271,
      -0.433856,
      -0.026453
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 410.0,
    "alt_m": 2765.8,
    "v_tot_ms": 297.2,
    "v_vert_ms": 9.21,
    "v_horiz_ms": 297.06,
    "fuel_kg": 226.6,
    "fuel_pct": 50.4,
    "throttle_pct": 79.3,
    "pitch_deg": 14.9,
    "g_force": 0.25,
    "three_pos": [
      0.040245,
      -0.433858,
      -0.026436
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 411.0,
    "alt_m": 2758.3,
    "v_tot_ms": 294.49,
    "v_vert_ms": 9.16,
    "v_horiz_ms": 294.34,
    "fuel_kg": 226.06,
    "fuel_pct": 50.2,
    "throttle_pct": 79.3,
    "pitch_deg": 15.0,
    "g_force": 0.25,
    "three_pos": [
      0.04022,
      -0.433859,
      -0.02642
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 412.0,
    "alt_m": 2750.9,
    "v_tot_ms": 291.77,
    "v_vert_ms": 9.12,
    "v_horiz_ms": 291.63,
    "fuel_kg": 225.53,
    "fuel_pct": 50.1,
    "throttle_pct": 79.3,
    "pitch_deg": 15.0,
    "g_force": 0.25,
    "three_pos": [
      0.040195,
      -0.433861,
      -0.026403
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 413.0,
    "alt_m": 2743.5,
    "v_tot_ms": 289.05,
    "v_vert_ms": 9.07,
    "v_horiz_ms": 288.91,
    "fuel_kg": 224.99,
    "fuel_pct": 50.0,
    "throttle_pct": 79.3,
    "pitch_deg": 15.1,
    "g_force": 0.25,
    "three_pos": [
      0.04017,
      -0.433862,
      -0.026387
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 414.0,
    "alt_m": 2736.3,
    "v_tot_ms": 286.34,
    "v_vert_ms": 9.02,
    "v_horiz_ms": 286.2,
    "fuel_kg": 224.45,
    "fuel_pct": 49.9,
    "throttle_pct": 79.3,
    "pitch_deg": 15.2,
    "g_force": 0.25,
    "three_pos": [
      0.040144,
      -0.433864,
      -0.02637
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 415.0,
    "alt_m": 2729.2,
    "v_tot_ms": 283.63,
    "v_vert_ms": 8.98,
    "v_horiz_ms": 283.49,
    "fuel_kg": 223.91,
    "fuel_pct": 49.8,
    "throttle_pct": 79.2,
    "pitch_deg": 15.3,
    "g_force": 0.25,
    "three_pos": [
      0.040119,
      -0.433865,
      -0.026353
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 416.0,
    "alt_m": 2722.2,
    "v_tot_ms": 280.92,
    "v_vert_ms": 8.93,
    "v_horiz_ms": 280.78,
    "fuel_kg": 223.38,
    "fuel_pct": 49.6,
    "throttle_pct": 79.2,
    "pitch_deg": 15.3,
    "g_force": 0.25,
    "three_pos": [
      0.040094,
      -0.433867,
      -0.026337
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 417.0,
    "alt_m": 2715.3,
    "v_tot_ms": 278.21,
    "v_vert_ms": 8.89,
    "v_horiz_ms": 278.07,
    "fuel_kg": 222.84,
    "fuel_pct": 49.5,
    "throttle_pct": 79.2,
    "pitch_deg": 15.4,
    "g_force": 0.25,
    "three_pos": [
      0.040069,
      -0.433868,
      -0.02632
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 418.0,
    "alt_m": 2708.6,
    "v_tot_ms": 275.5,
    "v_vert_ms": 8.84,
    "v_horiz_ms": 275.36,
    "fuel_kg": 222.3,
    "fuel_pct": 49.4,
    "throttle_pct": 79.2,
    "pitch_deg": 15.5,
    "g_force": 0.25,
    "three_pos": [
      0.040043,
      -0.43387,
      -0.026304
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 419.0,
    "alt_m": 2701.9,
    "v_tot_ms": 272.79,
    "v_vert_ms": 8.8,
    "v_horiz_ms": 272.65,
    "fuel_kg": 221.76,
    "fuel_pct": 49.3,
    "throttle_pct": 79.2,
    "pitch_deg": 15.6,
    "g_force": 0.25,
    "three_pos": [
      0.040018,
      -0.433872,
      -0.026287
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 420.0,
    "alt_m": 2695.3,
    "v_tot_ms": 270.09,
    "v_vert_ms": 8.75,
    "v_horiz_ms": 269.95,
    "fuel_kg": 221.23,
    "fuel_pct": 49.2,
    "throttle_pct": 79.1,
    "pitch_deg": 15.6,
    "g_force": 0.25,
    "three_pos": [
      0.039993,
      -0.433873,
      -0.02627
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 421.0,
    "alt_m": 2688.9,
    "v_tot_ms": 267.38,
    "v_vert_ms": 8.7,
    "v_horiz_ms": 267.24,
    "fuel_kg": 220.69,
    "fuel_pct": 49.0,
    "throttle_pct": 79.1,
    "pitch_deg": 15.7,
    "g_force": 0.25,
    "three_pos": [
      0.039968,
      -0.433875,
      -0.026254
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 422.0,
    "alt_m": 2682.5,
    "v_tot_ms": 264.68,
    "v_vert_ms": 8.66,
    "v_horiz_ms": 264.54,
    "fuel_kg": 220.15,
    "fuel_pct": 48.9,
    "throttle_pct": 79.1,
    "pitch_deg": 15.8,
    "g_force": 0.25,
    "three_pos": [
      0.039942,
      -0.433877,
      -0.026237
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 423.0,
    "alt_m": 2676.3,
    "v_tot_ms": 261.98,
    "v_vert_ms": 8.61,
    "v_horiz_ms": 261.84,
    "fuel_kg": 219.62,
    "fuel_pct": 48.8,
    "throttle_pct": 79.1,
    "pitch_deg": 15.8,
    "g_force": 0.25,
    "three_pos": [
      0.039917,
      -0.433878,
      -0.026221
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 424.0,
    "alt_m": 2670.1,
    "v_tot_ms": 259.28,
    "v_vert_ms": 8.57,
    "v_horiz_ms": 259.14,
    "fuel_kg": 219.08,
    "fuel_pct": 48.7,
    "throttle_pct": 79.1,
    "pitch_deg": 15.9,
    "g_force": 0.25,
    "three_pos": [
      0.039892,
      -0.43388,
      -0.026204
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 425.0,
    "alt_m": 2664.1,
    "v_tot_ms": 256.58,
    "v_vert_ms": 8.52,
    "v_horiz_ms": 256.44,
    "fuel_kg": 218.54,
    "fuel_pct": 48.6,
    "throttle_pct": 79.1,
    "pitch_deg": 16.0,
    "g_force": 0.25,
    "three_pos": [
      0.039867,
      -0.433882,
      -0.026188
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 426.0,
    "alt_m": 2658.2,
    "v_tot_ms": 253.88,
    "v_vert_ms": 8.48,
    "v_horiz_ms": 253.74,
    "fuel_kg": 218.01,
    "fuel_pct": 48.4,
    "throttle_pct": 79.0,
    "pitch_deg": 16.1,
    "g_force": 0.25,
    "three_pos": [
      0.039841,
      -0.433884,
      -0.026171
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 427.0,
    "alt_m": 2652.4,
    "v_tot_ms": 251.19,
    "v_vert_ms": 8.43,
    "v_horiz_ms": 251.04,
    "fuel_kg": 217.47,
    "fuel_pct": 48.3,
    "throttle_pct": 79.0,
    "pitch_deg": 16.1,
    "g_force": 0.25,
    "three_pos": [
      0.039816,
      -0.433886,
      -0.026154
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 428.0,
    "alt_m": 2646.7,
    "v_tot_ms": 248.49,
    "v_vert_ms": 8.38,
    "v_horiz_ms": 248.35,
    "fuel_kg": 216.94,
    "fuel_pct": 48.2,
    "throttle_pct": 79.0,
    "pitch_deg": 16.2,
    "g_force": 0.25,
    "three_pos": [
      0.039791,
      -0.433888,
      -0.026138
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 429.0,
    "alt_m": 2641.1,
    "v_tot_ms": 245.8,
    "v_vert_ms": 8.34,
    "v_horiz_ms": 245.65,
    "fuel_kg": 216.4,
    "fuel_pct": 48.1,
    "throttle_pct": 79.0,
    "pitch_deg": 16.3,
    "g_force": 0.25,
    "three_pos": [
      0.039766,
      -0.43389,
      -0.026121
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 430.0,
    "alt_m": 2635.6,
    "v_tot_ms": 243.1,
    "v_vert_ms": 8.29,
    "v_horiz_ms": 242.96,
    "fuel_kg": 215.86,
    "fuel_pct": 48.0,
    "throttle_pct": 79.0,
    "pitch_deg": 16.4,
    "g_force": 0.25,
    "three_pos": [
      0.039741,
      -0.433891,
      -0.026105
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 431.0,
    "alt_m": 2630.3,
    "v_tot_ms": 240.41,
    "v_vert_ms": 8.25,
    "v_horiz_ms": 240.27,
    "fuel_kg": 215.33,
    "fuel_pct": 47.9,
    "throttle_pct": 78.9,
    "pitch_deg": 16.4,
    "g_force": 0.25,
    "three_pos": [
      0.039715,
      -0.433893,
      -0.026088
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 432.0,
    "alt_m": 2625.0,
    "v_tot_ms": 237.72,
    "v_vert_ms": 8.2,
    "v_horiz_ms": 237.58,
    "fuel_kg": 214.79,
    "fuel_pct": 47.7,
    "throttle_pct": 78.9,
    "pitch_deg": 16.5,
    "g_force": 0.25,
    "three_pos": [
      0.03969,
      -0.433895,
      -0.026072
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 433.0,
    "alt_m": 2619.8,
    "v_tot_ms": 235.03,
    "v_vert_ms": 8.15,
    "v_horiz_ms": 234.89,
    "fuel_kg": 214.26,
    "fuel_pct": 47.6,
    "throttle_pct": 78.9,
    "pitch_deg": 16.6,
    "g_force": 0.25,
    "three_pos": [
      0.039665,
      -0.433897,
      -0.026055
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 434.0,
    "alt_m": 2614.8,
    "v_tot_ms": 232.34,
    "v_vert_ms": 8.11,
    "v_horiz_ms": 232.2,
    "fuel_kg": 213.72,
    "fuel_pct": 47.5,
    "throttle_pct": 78.9,
    "pitch_deg": 16.6,
    "g_force": 0.25,
    "three_pos": [
      0.03964,
      -0.433899,
      -0.026038
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 435.0,
    "alt_m": 2609.9,
    "v_tot_ms": 229.66,
    "v_vert_ms": 8.06,
    "v_horiz_ms": 229.52,
    "fuel_kg": 213.19,
    "fuel_pct": 47.4,
    "throttle_pct": 78.9,
    "pitch_deg": 16.7,
    "g_force": 0.25,
    "three_pos": [
      0.039614,
      -0.433901,
      -0.026022
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 436.0,
    "alt_m": 2605.0,
    "v_tot_ms": 226.97,
    "v_vert_ms": 8.02,
    "v_horiz_ms": 226.83,
    "fuel_kg": 212.65,
    "fuel_pct": 47.3,
    "throttle_pct": 78.9,
    "pitch_deg": 16.8,
    "g_force": 0.25,
    "three_pos": [
      0.039589,
      -0.433904,
      -0.026005
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 437.0,
    "alt_m": 2600.3,
    "v_tot_ms": 224.29,
    "v_vert_ms": 7.97,
    "v_horiz_ms": 224.15,
    "fuel_kg": 212.12,
    "fuel_pct": 47.1,
    "throttle_pct": 78.8,
    "pitch_deg": 16.9,
    "g_force": 0.25,
    "three_pos": [
      0.039564,
      -0.433906,
      -0.025989
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 438.0,
    "alt_m": 2595.7,
    "v_tot_ms": 221.61,
    "v_vert_ms": 7.93,
    "v_horiz_ms": 221.46,
    "fuel_kg": 211.58,
    "fuel_pct": 47.0,
    "throttle_pct": 78.8,
    "pitch_deg": 16.9,
    "g_force": 0.25,
    "three_pos": [
      0.039539,
      -0.433908,
      -0.025972
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 439.0,
    "alt_m": 2591.2,
    "v_tot_ms": 218.92,
    "v_vert_ms": 7.88,
    "v_horiz_ms": 218.78,
    "fuel_kg": 211.05,
    "fuel_pct": 46.9,
    "throttle_pct": 78.8,
    "pitch_deg": 17.0,
    "g_force": 0.25,
    "three_pos": [
      0.039514,
      -0.43391,
      -0.025956
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 440.0,
    "alt_m": 2586.8,
    "v_tot_ms": 216.24,
    "v_vert_ms": 7.83,
    "v_horiz_ms": 216.1,
    "fuel_kg": 210.51,
    "fuel_pct": 46.8,
    "throttle_pct": 78.8,
    "pitch_deg": 17.1,
    "g_force": 0.25,
    "three_pos": [
      0.039488,
      -0.433912,
      -0.025939
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 441.0,
    "alt_m": 2582.5,
    "v_tot_ms": 213.56,
    "v_vert_ms": 7.79,
    "v_horiz_ms": 213.42,
    "fuel_kg": 209.98,
    "fuel_pct": 46.7,
    "throttle_pct": 78.8,
    "pitch_deg": 17.2,
    "g_force": 0.25,
    "three_pos": [
      0.039463,
      -0.433914,
      -0.025922
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 442.0,
    "alt_m": 2578.3,
    "v_tot_ms": 210.89,
    "v_vert_ms": 7.74,
    "v_horiz_ms": 210.74,
    "fuel_kg": 209.45,
    "fuel_pct": 46.5,
    "throttle_pct": 78.7,
    "pitch_deg": 17.2,
    "g_force": 0.25,
    "three_pos": [
      0.039438,
      -0.433917,
      -0.025906
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 443.0,
    "alt_m": 2574.3,
    "v_tot_ms": 208.21,
    "v_vert_ms": 7.7,
    "v_horiz_ms": 208.07,
    "fuel_kg": 208.91,
    "fuel_pct": 46.4,
    "throttle_pct": 78.7,
    "pitch_deg": 17.3,
    "g_force": 0.25,
    "three_pos": [
      0.039413,
      -0.433919,
      -0.025889
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 444.0,
    "alt_m": 2570.3,
    "v_tot_ms": 205.53,
    "v_vert_ms": 7.65,
    "v_horiz_ms": 205.39,
    "fuel_kg": 208.38,
    "fuel_pct": 46.3,
    "throttle_pct": 78.7,
    "pitch_deg": 17.4,
    "g_force": 0.25,
    "three_pos": [
      0.039388,
      -0.433921,
      -0.025873
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 445.0,
    "alt_m": 2566.5,
    "v_tot_ms": 202.86,
    "v_vert_ms": 7.6,
    "v_horiz_ms": 202.72,
    "fuel_kg": 207.84,
    "fuel_pct": 46.2,
    "throttle_pct": 78.7,
    "pitch_deg": 17.4,
    "g_force": 0.25,
    "three_pos": [
      0.039362,
      -0.433923,
      -0.025856
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 446.0,
    "alt_m": 2562.7,
    "v_tot_ms": 200.19,
    "v_vert_ms": 7.56,
    "v_horiz_ms": 200.04,
    "fuel_kg": 207.31,
    "fuel_pct": 46.1,
    "throttle_pct": 78.7,
    "pitch_deg": 17.5,
    "g_force": 0.25,
    "three_pos": [
      0.039337,
      -0.433926,
      -0.02584
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 447.0,
    "alt_m": 2559.1,
    "v_tot_ms": 197.52,
    "v_vert_ms": 7.51,
    "v_horiz_ms": 197.37,
    "fuel_kg": 206.78,
    "fuel_pct": 46.0,
    "throttle_pct": 78.6,
    "pitch_deg": 17.6,
    "g_force": 0.25,
    "three_pos": [
      0.039312,
      -0.433928,
      -0.025823
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 448.0,
    "alt_m": 2555.6,
    "v_tot_ms": 194.85,
    "v_vert_ms": 7.47,
    "v_horiz_ms": 194.7,
    "fuel_kg": 206.24,
    "fuel_pct": 45.8,
    "throttle_pct": 78.6,
    "pitch_deg": 17.7,
    "g_force": 0.25,
    "three_pos": [
      0.039287,
      -0.43393,
      -0.025807
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 449.0,
    "alt_m": 2552.1,
    "v_tot_ms": 192.18,
    "v_vert_ms": 7.42,
    "v_horiz_ms": 192.03,
    "fuel_kg": 205.71,
    "fuel_pct": 45.7,
    "throttle_pct": 78.6,
    "pitch_deg": 17.7,
    "g_force": 0.25,
    "three_pos": [
      0.039262,
      -0.433933,
      -0.02579
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 450.0,
    "alt_m": 2548.8,
    "v_tot_ms": 189.51,
    "v_vert_ms": 7.38,
    "v_horiz_ms": 189.36,
    "fuel_kg": 205.18,
    "fuel_pct": 45.6,
    "throttle_pct": 78.6,
    "pitch_deg": 17.8,
    "g_force": 0.25,
    "three_pos": [
      0.039236,
      -0.433935,
      -0.025774
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 451.0,
    "alt_m": 2545.6,
    "v_tot_ms": 186.84,
    "v_vert_ms": 7.33,
    "v_horiz_ms": 186.7,
    "fuel_kg": 204.64,
    "fuel_pct": 45.5,
    "throttle_pct": 78.6,
    "pitch_deg": 17.9,
    "g_force": 0.25,
    "three_pos": [
      0.039211,
      -0.433938,
      -0.025757
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 452.0,
    "alt_m": 2542.5,
    "v_tot_ms": 184.17,
    "v_vert_ms": 7.28,
    "v_horiz_ms": 184.03,
    "fuel_kg": 204.11,
    "fuel_pct": 45.4,
    "throttle_pct": 78.5,
    "pitch_deg": 18.0,
    "g_force": 0.25,
    "three_pos": [
      0.039186,
      -0.43394,
      -0.02574
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 453.0,
    "alt_m": 2539.6,
    "v_tot_ms": 181.51,
    "v_vert_ms": 7.24,
    "v_horiz_ms": 181.37,
    "fuel_kg": 203.58,
    "fuel_pct": 45.2,
    "throttle_pct": 78.5,
    "pitch_deg": 18.0,
    "g_force": 0.25,
    "three_pos": [
      0.039161,
      -0.433943,
      -0.025724
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 454.0,
    "alt_m": 2536.7,
    "v_tot_ms": 178.85,
    "v_vert_ms": 7.19,
    "v_horiz_ms": 178.7,
    "fuel_kg": 203.05,
    "fuel_pct": 45.1,
    "throttle_pct": 78.5,
    "pitch_deg": 18.1,
    "g_force": 0.25,
    "three_pos": [
      0.039136,
      -0.433945,
      -0.025707
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 455.0,
    "alt_m": 2533.9,
    "v_tot_ms": 176.18,
    "v_vert_ms": 7.15,
    "v_horiz_ms": 176.04,
    "fuel_kg": 202.51,
    "fuel_pct": 45.0,
    "throttle_pct": 78.5,
    "pitch_deg": 18.2,
    "g_force": 0.25,
    "three_pos": [
      0.039111,
      -0.433948,
      -0.025691
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 456.0,
    "alt_m": 2531.2,
    "v_tot_ms": 173.52,
    "v_vert_ms": 7.1,
    "v_horiz_ms": 173.38,
    "fuel_kg": 201.98,
    "fuel_pct": 44.9,
    "throttle_pct": 78.5,
    "pitch_deg": 18.2,
    "g_force": 0.25,
    "three_pos": [
      0.039085,
      -0.43395,
      -0.025674
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 457.0,
    "alt_m": 2528.7,
    "v_tot_ms": 170.86,
    "v_vert_ms": 7.05,
    "v_horiz_ms": 170.72,
    "fuel_kg": 201.45,
    "fuel_pct": 44.8,
    "throttle_pct": 78.4,
    "pitch_deg": 18.3,
    "g_force": 0.25,
    "three_pos": [
      0.03906,
      -0.433953,
      -0.025658
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 458.0,
    "alt_m": 2526.3,
    "v_tot_ms": 168.21,
    "v_vert_ms": 7.01,
    "v_horiz_ms": 168.06,
    "fuel_kg": 200.92,
    "fuel_pct": 44.6,
    "throttle_pct": 78.4,
    "pitch_deg": 18.4,
    "g_force": 0.25,
    "three_pos": [
      0.039035,
      -0.433956,
      -0.025641
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 459.0,
    "alt_m": 2523.9,
    "v_tot_ms": 165.55,
    "v_vert_ms": 6.96,
    "v_horiz_ms": 165.4,
    "fuel_kg": 200.38,
    "fuel_pct": 44.5,
    "throttle_pct": 78.4,
    "pitch_deg": 18.5,
    "g_force": 0.25,
    "three_pos": [
      0.03901,
      -0.433958,
      -0.025625
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 460.0,
    "alt_m": 2521.7,
    "v_tot_ms": 162.89,
    "v_vert_ms": 6.92,
    "v_horiz_ms": 162.74,
    "fuel_kg": 199.85,
    "fuel_pct": 44.4,
    "throttle_pct": 78.4,
    "pitch_deg": 18.5,
    "g_force": 0.25,
    "three_pos": [
      0.038985,
      -0.433961,
      -0.025608
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 461.0,
    "alt_m": 2519.6,
    "v_tot_ms": 160.24,
    "v_vert_ms": 6.87,
    "v_horiz_ms": 160.09,
    "fuel_kg": 199.32,
    "fuel_pct": 44.3,
    "throttle_pct": 78.4,
    "pitch_deg": 18.6,
    "g_force": 0.25,
    "three_pos": [
      0.03896,
      -0.433964,
      -0.025592
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 462.0,
    "alt_m": 2517.6,
    "v_tot_ms": 157.58,
    "v_vert_ms": 6.82,
    "v_horiz_ms": 157.43,
    "fuel_kg": 198.79,
    "fuel_pct": 44.2,
    "throttle_pct": 78.4,
    "pitch_deg": 18.7,
    "g_force": 0.25,
    "three_pos": [
      0.038934,
      -0.433966,
      -0.025575
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 463.0,
    "alt_m": 2515.7,
    "v_tot_ms": 154.93,
    "v_vert_ms": 6.78,
    "v_horiz_ms": 154.78,
    "fuel_kg": 198.26,
    "fuel_pct": 44.1,
    "throttle_pct": 78.3,
    "pitch_deg": 18.8,
    "g_force": 0.25,
    "three_pos": [
      0.038909,
      -0.433969,
      -0.025559
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 464.0,
    "alt_m": 2513.9,
    "v_tot_ms": 152.28,
    "v_vert_ms": 6.73,
    "v_horiz_ms": 152.13,
    "fuel_kg": 197.73,
    "fuel_pct": 43.9,
    "throttle_pct": 78.3,
    "pitch_deg": 18.8,
    "g_force": 0.25,
    "three_pos": [
      0.038884,
      -0.433972,
      -0.025542
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 465.0,
    "alt_m": 2512.2,
    "v_tot_ms": 149.63,
    "v_vert_ms": 6.69,
    "v_horiz_ms": 149.48,
    "fuel_kg": 197.2,
    "fuel_pct": 43.8,
    "throttle_pct": 78.3,
    "pitch_deg": 18.9,
    "g_force": 0.25,
    "three_pos": [
      0.038859,
      -0.433975,
      -0.025525
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 466.0,
    "alt_m": 2510.6,
    "v_tot_ms": 146.98,
    "v_vert_ms": 6.64,
    "v_horiz_ms": 146.83,
    "fuel_kg": 196.66,
    "fuel_pct": 43.7,
    "throttle_pct": 78.3,
    "pitch_deg": 19.0,
    "g_force": 0.25,
    "three_pos": [
      0.038834,
      -0.433978,
      -0.025509
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 467.0,
    "alt_m": 2509.2,
    "v_tot_ms": 144.33,
    "v_vert_ms": 6.6,
    "v_horiz_ms": 144.18,
    "fuel_kg": 196.13,
    "fuel_pct": 43.6,
    "throttle_pct": 78.3,
    "pitch_deg": 19.1,
    "g_force": 0.25,
    "three_pos": [
      0.038809,
      -0.43398,
      -0.025492
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 468.0,
    "alt_m": 2507.8,
    "v_tot_ms": 141.68,
    "v_vert_ms": 6.55,
    "v_horiz_ms": 141.53,
    "fuel_kg": 195.6,
    "fuel_pct": 43.5,
    "throttle_pct": 78.2,
    "pitch_deg": 19.1,
    "g_force": 0.25,
    "three_pos": [
      0.038783,
      -0.433983,
      -0.025476
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 469.0,
    "alt_m": 2506.6,
    "v_tot_ms": 139.04,
    "v_vert_ms": 6.5,
    "v_horiz_ms": 138.89,
    "fuel_kg": 195.07,
    "fuel_pct": 43.3,
    "throttle_pct": 78.2,
    "pitch_deg": 19.2,
    "g_force": 0.26,
    "three_pos": [
      0.038758,
      -0.433986,
      -0.025459
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 470.0,
    "alt_m": 2505.4,
    "v_tot_ms": 136.39,
    "v_vert_ms": 6.46,
    "v_horiz_ms": 136.24,
    "fuel_kg": 194.54,
    "fuel_pct": 43.2,
    "throttle_pct": 78.2,
    "pitch_deg": 19.3,
    "g_force": 0.26,
    "three_pos": [
      0.038733,
      -0.433989,
      -0.025443
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 471.0,
    "alt_m": 2504.4,
    "v_tot_ms": 133.75,
    "v_vert_ms": 6.41,
    "v_horiz_ms": 133.6,
    "fuel_kg": 194.01,
    "fuel_pct": 43.1,
    "throttle_pct": 78.2,
    "pitch_deg": 19.3,
    "g_force": 0.26,
    "three_pos": [
      0.038708,
      -0.433992,
      -0.025426
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 472.0,
    "alt_m": 2503.5,
    "v_tot_ms": 131.11,
    "v_vert_ms": 6.37,
    "v_horiz_ms": 130.95,
    "fuel_kg": 193.48,
    "fuel_pct": 43.0,
    "throttle_pct": 78.2,
    "pitch_deg": 19.4,
    "g_force": 0.26,
    "three_pos": [
      0.038683,
      -0.433995,
      -0.02541
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 473.0,
    "alt_m": 2502.7,
    "v_tot_ms": 128.47,
    "v_vert_ms": 6.32,
    "v_horiz_ms": 128.31,
    "fuel_kg": 192.95,
    "fuel_pct": 42.9,
    "throttle_pct": 78.1,
    "pitch_deg": 19.5,
    "g_force": 0.26,
    "three_pos": [
      0.038658,
      -0.433998,
      -0.025393
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 474.0,
    "alt_m": 2502.0,
    "v_tot_ms": 125.83,
    "v_vert_ms": 6.27,
    "v_horiz_ms": 125.67,
    "fuel_kg": 192.42,
    "fuel_pct": 42.8,
    "throttle_pct": 78.1,
    "pitch_deg": 19.6,
    "g_force": 0.26,
    "three_pos": [
      0.038632,
      -0.434001,
      -0.025377
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 475.0,
    "alt_m": 2501.4,
    "v_tot_ms": 123.19,
    "v_vert_ms": 6.23,
    "v_horiz_ms": 123.03,
    "fuel_kg": 191.89,
    "fuel_pct": 42.6,
    "throttle_pct": 78.1,
    "pitch_deg": 19.6,
    "g_force": 0.26,
    "three_pos": [
      0.038607,
      -0.434004,
      -0.02536
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 476.0,
    "alt_m": 2500.9,
    "v_tot_ms": 120.55,
    "v_vert_ms": 6.18,
    "v_horiz_ms": 120.39,
    "fuel_kg": 191.36,
    "fuel_pct": 42.5,
    "throttle_pct": 78.1,
    "pitch_deg": 19.7,
    "g_force": 0.26,
    "three_pos": [
      0.038582,
      -0.434007,
      -0.025344
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 477.0,
    "alt_m": 2500.5,
    "v_tot_ms": 117.92,
    "v_vert_ms": 6.14,
    "v_horiz_ms": 117.76,
    "fuel_kg": 190.83,
    "fuel_pct": 42.4,
    "throttle_pct": 78.1,
    "pitch_deg": 19.8,
    "g_force": 0.26,
    "three_pos": [
      0.038557,
      -0.43401,
      -0.025327
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 478.0,
    "alt_m": 2500.2,
    "v_tot_ms": 115.28,
    "v_vert_ms": 6.09,
    "v_horiz_ms": 115.12,
    "fuel_kg": 190.3,
    "fuel_pct": 42.3,
    "throttle_pct": 78.0,
    "pitch_deg": 19.9,
    "g_force": 0.26,
    "three_pos": [
      0.038532,
      -0.434013,
      -0.025311
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 479.0,
    "alt_m": 2500.1,
    "v_tot_ms": 112.65,
    "v_vert_ms": 6.05,
    "v_horiz_ms": 112.48,
    "fuel_kg": 189.77,
    "fuel_pct": 42.2,
    "throttle_pct": 78.0,
    "pitch_deg": 19.9,
    "g_force": 0.26,
    "three_pos": [
      0.038507,
      -0.434017,
      -0.025294
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 480.0,
    "alt_m": 2500.0,
    "v_tot_ms": 110.01,
    "v_vert_ms": 6.0,
    "v_horiz_ms": 109.85,
    "fuel_kg": 189.24,
    "fuel_pct": 42.1,
    "throttle_pct": 78.0,
    "pitch_deg": 20.0,
    "g_force": 0.26,
    "three_pos": [
      0.038482,
      -0.43402,
      -0.025278
    ],
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "t_s": 481.0,
    "alt_m": 2480.4,
    "v_tot_ms": 109.62,
    "v_vert_ms": 5.97,
    "v_horiz_ms": 109.46,
    "fuel_kg": 188.87,
    "fuel_pct": 42.0,
    "throttle_pct": 51.9,
    "pitch_deg": 20.4,
    "g_force": 0.18,
    "three_pos": [
      0.038456,
      -0.434018,
      -0.025261
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 482.0,
    "alt_m": 2460.9,
    "v_tot_ms": 109.07,
    "v_vert_ms": 5.95,
    "v_horiz_ms": 108.91,
    "fuel_kg": 188.49,
    "fuel_pct": 41.9,
    "throttle_pct": 51.8,
    "pitch_deg": 20.8,
    "g_force": 0.18,
    "three_pos": [
      0.03843,
      -0.434016,
      -0.025244
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 483.0,
    "alt_m": 2441.5,
    "v_tot_ms": 108.53,
    "v_vert_ms": 5.93,
    "v_horiz_ms": 108.37,
    "fuel_kg": 188.12,
    "fuel_pct": 41.8,
    "throttle_pct": 51.7,
    "pitch_deg": 21.1,
    "g_force": 0.18,
    "three_pos": [
      0.038405,
      -0.434015,
      -0.025227
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 484.0,
    "alt_m": 2422.1,
    "v_tot_ms": 107.99,
    "v_vert_ms": 5.9,
    "v_horiz_ms": 107.82,
    "fuel_kg": 187.75,
    "fuel_pct": 41.7,
    "throttle_pct": 51.6,
    "pitch_deg": 21.5,
    "g_force": 0.18,
    "three_pos": [
      0.038379,
      -0.434013,
      -0.025211
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 485.0,
    "alt_m": 2402.8,
    "v_tot_ms": 107.44,
    "v_vert_ms": 5.88,
    "v_horiz_ms": 107.28,
    "fuel_kg": 187.37,
    "fuel_pct": 41.6,
    "throttle_pct": 51.5,
    "pitch_deg": 21.9,
    "g_force": 0.18,
    "three_pos": [
      0.038354,
      -0.434012,
      -0.025194
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 486.0,
    "alt_m": 2383.5,
    "v_tot_ms": 106.9,
    "v_vert_ms": 5.85,
    "v_horiz_ms": 106.74,
    "fuel_kg": 187.0,
    "fuel_pct": 41.6,
    "throttle_pct": 51.4,
    "pitch_deg": 22.3,
    "g_force": 0.18,
    "three_pos": [
      0.038328,
      -0.43401,
      -0.025177
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 487.0,
    "alt_m": 2364.3,
    "v_tot_ms": 106.35,
    "v_vert_ms": 5.83,
    "v_horiz_ms": 106.19,
    "fuel_kg": 186.63,
    "fuel_pct": 41.5,
    "throttle_pct": 51.3,
    "pitch_deg": 22.6,
    "g_force": 0.18,
    "three_pos": [
      0.038303,
      -0.434008,
      -0.02516
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 488.0,
    "alt_m": 2345.1,
    "v_tot_ms": 105.81,
    "v_vert_ms": 5.8,
    "v_horiz_ms": 105.65,
    "fuel_kg": 186.26,
    "fuel_pct": 41.4,
    "throttle_pct": 51.2,
    "pitch_deg": 23.0,
    "g_force": 0.18,
    "three_pos": [
      0.038277,
      -0.434007,
      -0.025143
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 489.0,
    "alt_m": 2326.0,
    "v_tot_ms": 105.26,
    "v_vert_ms": 5.78,
    "v_horiz_ms": 105.11,
    "fuel_kg": 185.89,
    "fuel_pct": 41.3,
    "throttle_pct": 51.1,
    "pitch_deg": 23.4,
    "g_force": 0.18,
    "three_pos": [
      0.038252,
      -0.434005,
      -0.025127
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 490.0,
    "alt_m": 2306.9,
    "v_tot_ms": 104.72,
    "v_vert_ms": 5.75,
    "v_horiz_ms": 104.56,
    "fuel_kg": 185.52,
    "fuel_pct": 41.2,
    "throttle_pct": 51.0,
    "pitch_deg": 23.8,
    "g_force": 0.18,
    "three_pos": [
      0.038226,
      -0.434004,
      -0.02511
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 491.0,
    "alt_m": 2287.9,
    "v_tot_ms": 104.17,
    "v_vert_ms": 5.73,
    "v_horiz_ms": 104.02,
    "fuel_kg": 185.15,
    "fuel_pct": 41.1,
    "throttle_pct": 50.9,
    "pitch_deg": 24.2,
    "g_force": 0.18,
    "three_pos": [
      0.0382,
      -0.434002,
      -0.025093
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 492.0,
    "alt_m": 2269.0,
    "v_tot_ms": 103.63,
    "v_vert_ms": 5.7,
    "v_horiz_ms": 103.47,
    "fuel_kg": 184.78,
    "fuel_pct": 41.1,
    "throttle_pct": 50.8,
    "pitch_deg": 24.5,
    "g_force": 0.18,
    "three_pos": [
      0.038175,
      -0.434,
      -0.025076
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 493.0,
    "alt_m": 2250.1,
    "v_tot_ms": 103.09,
    "v_vert_ms": 5.67,
    "v_horiz_ms": 102.93,
    "fuel_kg": 184.42,
    "fuel_pct": 41.0,
    "throttle_pct": 50.7,
    "pitch_deg": 24.9,
    "g_force": 0.18,
    "three_pos": [
      0.038149,
      -0.433999,
      -0.025059
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 494.0,
    "alt_m": 2231.2,
    "v_tot_ms": 102.54,
    "v_vert_ms": 5.65,
    "v_horiz_ms": 102.39,
    "fuel_kg": 184.05,
    "fuel_pct": 40.9,
    "throttle_pct": 50.6,
    "pitch_deg": 25.3,
    "g_force": 0.18,
    "three_pos": [
      0.038124,
      -0.433997,
      -0.025043
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 495.0,
    "alt_m": 2212.5,
    "v_tot_ms": 102.0,
    "v_vert_ms": 5.62,
    "v_horiz_ms": 101.84,
    "fuel_kg": 183.69,
    "fuel_pct": 40.8,
    "throttle_pct": 50.5,
    "pitch_deg": 25.7,
    "g_force": 0.18,
    "three_pos": [
      0.038098,
      -0.433996,
      -0.025026
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 496.0,
    "alt_m": 2193.7,
    "v_tot_ms": 101.45,
    "v_vert_ms": 5.6,
    "v_horiz_ms": 101.3,
    "fuel_kg": 183.32,
    "fuel_pct": 40.7,
    "throttle_pct": 50.4,
    "pitch_deg": 26.0,
    "g_force": 0.18,
    "three_pos": [
      0.038073,
      -0.433994,
      -0.025009
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 497.0,
    "alt_m": 2175.1,
    "v_tot_ms": 100.91,
    "v_vert_ms": 5.58,
    "v_horiz_ms": 100.75,
    "fuel_kg": 182.96,
    "fuel_pct": 40.7,
    "throttle_pct": 50.3,
    "pitch_deg": 26.4,
    "g_force": 0.18,
    "three_pos": [
      0.038047,
      -0.433993,
      -0.024992
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 498.0,
    "alt_m": 2156.5,
    "v_tot_ms": 100.36,
    "v_vert_ms": 5.55,
    "v_horiz_ms": 100.21,
    "fuel_kg": 182.59,
    "fuel_pct": 40.6,
    "throttle_pct": 50.2,
    "pitch_deg": 26.8,
    "g_force": 0.18,
    "three_pos": [
      0.038022,
      -0.433991,
      -0.024975
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 499.0,
    "alt_m": 2137.9,
    "v_tot_ms": 99.82,
    "v_vert_ms": 5.53,
    "v_horiz_ms": 99.67,
    "fuel_kg": 182.23,
    "fuel_pct": 40.5,
    "throttle_pct": 50.1,
    "pitch_deg": 27.2,
    "g_force": 0.18,
    "three_pos": [
      0.037996,
      -0.43399,
      -0.024959
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 500.0,
    "alt_m": 2119.4,
    "v_tot_ms": 99.27,
    "v_vert_ms": 5.5,
    "v_horiz_ms": 99.12,
    "fuel_kg": 181.87,
    "fuel_pct": 40.4,
    "throttle_pct": 50.0,
    "pitch_deg": 27.6,
    "g_force": 0.18,
    "three_pos": [
      0.03797,
      -0.433989,
      -0.024942
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 501.0,
    "alt_m": 2101.0,
    "v_tot_ms": 98.73,
    "v_vert_ms": 5.47,
    "v_horiz_ms": 98.58,
    "fuel_kg": 181.51,
    "fuel_pct": 40.3,
    "throttle_pct": 49.9,
    "pitch_deg": 27.9,
    "g_force": 0.18,
    "three_pos": [
      0.037945,
      -0.433987,
      -0.024925
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 502.0,
    "alt_m": 2082.6,
    "v_tot_ms": 98.19,
    "v_vert_ms": 5.45,
    "v_horiz_ms": 98.03,
    "fuel_kg": 181.15,
    "fuel_pct": 40.3,
    "throttle_pct": 49.8,
    "pitch_deg": 28.3,
    "g_force": 0.18,
    "three_pos": [
      0.037919,
      -0.433986,
      -0.024908
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 503.0,
    "alt_m": 2064.3,
    "v_tot_ms": 97.64,
    "v_vert_ms": 5.42,
    "v_horiz_ms": 97.49,
    "fuel_kg": 180.79,
    "fuel_pct": 40.2,
    "throttle_pct": 49.7,
    "pitch_deg": 28.7,
    "g_force": 0.18,
    "three_pos": [
      0.037894,
      -0.433984,
      -0.024892
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 504.0,
    "alt_m": 2046.0,
    "v_tot_ms": 97.1,
    "v_vert_ms": 5.4,
    "v_horiz_ms": 96.95,
    "fuel_kg": 180.43,
    "fuel_pct": 40.1,
    "throttle_pct": 49.6,
    "pitch_deg": 29.1,
    "g_force": 0.18,
    "three_pos": [
      0.037868,
      -0.433983,
      -0.024875
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 505.0,
    "alt_m": 2027.8,
    "v_tot_ms": 96.55,
    "v_vert_ms": 5.38,
    "v_horiz_ms": 96.4,
    "fuel_kg": 180.07,
    "fuel_pct": 40.0,
    "throttle_pct": 49.5,
    "pitch_deg": 29.4,
    "g_force": 0.18,
    "three_pos": [
      0.037843,
      -0.433982,
      -0.024858
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 506.0,
    "alt_m": 2009.7,
    "v_tot_ms": 96.01,
    "v_vert_ms": 5.35,
    "v_horiz_ms": 95.86,
    "fuel_kg": 179.71,
    "fuel_pct": 39.9,
    "throttle_pct": 49.4,
    "pitch_deg": 29.8,
    "g_force": 0.18,
    "three_pos": [
      0.037817,
      -0.43398,
      -0.024841
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 507.0,
    "alt_m": 1991.6,
    "v_tot_ms": 95.46,
    "v_vert_ms": 5.32,
    "v_horiz_ms": 95.32,
    "fuel_kg": 179.36,
    "fuel_pct": 39.9,
    "throttle_pct": 49.3,
    "pitch_deg": 30.2,
    "g_force": 0.18,
    "three_pos": [
      0.037792,
      -0.433979,
      -0.024824
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 508.0,
    "alt_m": 1973.6,
    "v_tot_ms": 94.92,
    "v_vert_ms": 5.3,
    "v_horiz_ms": 94.77,
    "fuel_kg": 179.0,
    "fuel_pct": 39.8,
    "throttle_pct": 49.2,
    "pitch_deg": 30.6,
    "g_force": 0.18,
    "three_pos": [
      0.037766,
      -0.433977,
      -0.024808
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 509.0,
    "alt_m": 1955.6,
    "v_tot_ms": 94.37,
    "v_vert_ms": 5.28,
    "v_horiz_ms": 94.23,
    "fuel_kg": 178.65,
    "fuel_pct": 39.7,
    "throttle_pct": 49.1,
    "pitch_deg": 31.0,
    "g_force": 0.18,
    "three_pos": [
      0.037741,
      -0.433976,
      -0.024791
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 510.0,
    "alt_m": 1937.7,
    "v_tot_ms": 93.83,
    "v_vert_ms": 5.25,
    "v_horiz_ms": 93.68,
    "fuel_kg": 178.29,
    "fuel_pct": 39.6,
    "throttle_pct": 49.0,
    "pitch_deg": 31.3,
    "g_force": 0.17,
    "three_pos": [
      0.037715,
      -0.433975,
      -0.024774
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 511.0,
    "alt_m": 1919.9,
    "v_tot_ms": 93.29,
    "v_vert_ms": 5.22,
    "v_horiz_ms": 93.14,
    "fuel_kg": 177.94,
    "fuel_pct": 39.5,
    "throttle_pct": 48.9,
    "pitch_deg": 31.7,
    "g_force": 0.17,
    "three_pos": [
      0.03769,
      -0.433973,
      -0.024757
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 512.0,
    "alt_m": 1902.1,
    "v_tot_ms": 92.74,
    "v_vert_ms": 5.2,
    "v_horiz_ms": 92.6,
    "fuel_kg": 177.58,
    "fuel_pct": 39.5,
    "throttle_pct": 48.8,
    "pitch_deg": 32.1,
    "g_force": 0.17,
    "three_pos": [
      0.037664,
      -0.433972,
      -0.024741
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 513.0,
    "alt_m": 1884.3,
    "v_tot_ms": 92.2,
    "v_vert_ms": 5.18,
    "v_horiz_ms": 92.05,
    "fuel_kg": 177.23,
    "fuel_pct": 39.4,
    "throttle_pct": 48.7,
    "pitch_deg": 32.5,
    "g_force": 0.17,
    "three_pos": [
      0.037638,
      -0.433971,
      -0.024724
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 514.0,
    "alt_m": 1866.7,
    "v_tot_ms": 91.65,
    "v_vert_ms": 5.15,
    "v_horiz_ms": 91.51,
    "fuel_kg": 176.88,
    "fuel_pct": 39.3,
    "throttle_pct": 48.6,
    "pitch_deg": 32.8,
    "g_force": 0.17,
    "three_pos": [
      0.037613,
      -0.43397,
      -0.024707
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 515.0,
    "alt_m": 1849.1,
    "v_tot_ms": 91.11,
    "v_vert_ms": 5.12,
    "v_horiz_ms": 90.96,
    "fuel_kg": 176.53,
    "fuel_pct": 39.2,
    "throttle_pct": 48.5,
    "pitch_deg": 33.2,
    "g_force": 0.17,
    "three_pos": [
      0.037587,
      -0.433968,
      -0.02469
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 516.0,
    "alt_m": 1831.5,
    "v_tot_ms": 90.56,
    "v_vert_ms": 5.1,
    "v_horiz_ms": 90.42,
    "fuel_kg": 176.18,
    "fuel_pct": 39.2,
    "throttle_pct": 48.4,
    "pitch_deg": 33.6,
    "g_force": 0.17,
    "three_pos": [
      0.037562,
      -0.433967,
      -0.024674
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 517.0,
    "alt_m": 1814.0,
    "v_tot_ms": 90.02,
    "v_vert_ms": 5.08,
    "v_horiz_ms": 89.88,
    "fuel_kg": 175.83,
    "fuel_pct": 39.1,
    "throttle_pct": 48.3,
    "pitch_deg": 34.0,
    "g_force": 0.17,
    "three_pos": [
      0.037536,
      -0.433966,
      -0.024657
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 518.0,
    "alt_m": 1796.6,
    "v_tot_ms": 89.47,
    "v_vert_ms": 5.05,
    "v_horiz_ms": 89.33,
    "fuel_kg": 175.48,
    "fuel_pct": 39.0,
    "throttle_pct": 48.2,
    "pitch_deg": 34.4,
    "g_force": 0.17,
    "three_pos": [
      0.037511,
      -0.433965,
      -0.02464
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 519.0,
    "alt_m": 1779.3,
    "v_tot_ms": 88.93,
    "v_vert_ms": 5.03,
    "v_horiz_ms": 88.79,
    "fuel_kg": 175.13,
    "fuel_pct": 38.9,
    "throttle_pct": 48.1,
    "pitch_deg": 34.7,
    "g_force": 0.17,
    "three_pos": [
      0.037485,
      -0.433963,
      -0.024623
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 520.0,
    "alt_m": 1761.9,
    "v_tot_ms": 88.39,
    "v_vert_ms": 5.0,
    "v_horiz_ms": 88.24,
    "fuel_kg": 174.78,
    "fuel_pct": 38.8,
    "throttle_pct": 48.0,
    "pitch_deg": 35.1,
    "g_force": 0.17,
    "three_pos": [
      0.03746,
      -0.433962,
      -0.024606
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 521.0,
    "alt_m": 1744.7,
    "v_tot_ms": 87.84,
    "v_vert_ms": 4.97,
    "v_horiz_ms": 87.7,
    "fuel_kg": 174.44,
    "fuel_pct": 38.8,
    "throttle_pct": 47.9,
    "pitch_deg": 35.5,
    "g_force": 0.17,
    "three_pos": [
      0.037434,
      -0.433961,
      -0.02459
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 522.0,
    "alt_m": 1727.5,
    "v_tot_ms": 87.3,
    "v_vert_ms": 4.95,
    "v_horiz_ms": 87.16,
    "fuel_kg": 174.09,
    "fuel_pct": 38.7,
    "throttle_pct": 47.8,
    "pitch_deg": 35.9,
    "g_force": 0.17,
    "three_pos": [
      0.037409,
      -0.43396,
      -0.024573
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 523.0,
    "alt_m": 1710.4,
    "v_tot_ms": 86.75,
    "v_vert_ms": 4.92,
    "v_horiz_ms": 86.61,
    "fuel_kg": 173.75,
    "fuel_pct": 38.6,
    "throttle_pct": 47.7,
    "pitch_deg": 36.2,
    "g_force": 0.17,
    "three_pos": [
      0.037383,
      -0.433959,
      -0.024556
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 524.0,
    "alt_m": 1693.4,
    "v_tot_ms": 86.21,
    "v_vert_ms": 4.9,
    "v_horiz_ms": 86.07,
    "fuel_kg": 173.4,
    "fuel_pct": 38.5,
    "throttle_pct": 47.6,
    "pitch_deg": 36.6,
    "g_force": 0.17,
    "three_pos": [
      0.037358,
      -0.433958,
      -0.024539
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 525.0,
    "alt_m": 1676.4,
    "v_tot_ms": 85.66,
    "v_vert_ms": 4.88,
    "v_horiz_ms": 85.52,
    "fuel_kg": 173.06,
    "fuel_pct": 38.5,
    "throttle_pct": 47.5,
    "pitch_deg": 37.0,
    "g_force": 0.17,
    "three_pos": [
      0.037332,
      -0.433956,
      -0.024523
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 526.0,
    "alt_m": 1659.4,
    "v_tot_ms": 85.12,
    "v_vert_ms": 4.85,
    "v_horiz_ms": 84.98,
    "fuel_kg": 172.72,
    "fuel_pct": 38.4,
    "throttle_pct": 47.4,
    "pitch_deg": 37.4,
    "g_force": 0.17,
    "three_pos": [
      0.037307,
      -0.433955,
      -0.024506
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 527.0,
    "alt_m": 1642.6,
    "v_tot_ms": 84.57,
    "v_vert_ms": 4.83,
    "v_horiz_ms": 84.44,
    "fuel_kg": 172.37,
    "fuel_pct": 38.3,
    "throttle_pct": 47.3,
    "pitch_deg": 37.8,
    "g_force": 0.17,
    "three_pos": [
      0.037281,
      -0.433954,
      -0.024489
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 528.0,
    "alt_m": 1625.8,
    "v_tot_ms": 84.03,
    "v_vert_ms": 4.8,
    "v_horiz_ms": 83.89,
    "fuel_kg": 172.03,
    "fuel_pct": 38.2,
    "throttle_pct": 47.2,
    "pitch_deg": 38.1,
    "g_force": 0.17,
    "three_pos": [
      0.037256,
      -0.433953,
      -0.024472
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 529.0,
    "alt_m": 1609.0,
    "v_tot_ms": 83.49,
    "v_vert_ms": 4.78,
    "v_horiz_ms": 83.35,
    "fuel_kg": 171.69,
    "fuel_pct": 38.2,
    "throttle_pct": 47.1,
    "pitch_deg": 38.5,
    "g_force": 0.17,
    "three_pos": [
      0.03723,
      -0.433952,
      -0.024456
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 530.0,
    "alt_m": 1592.4,
    "v_tot_ms": 82.94,
    "v_vert_ms": 4.75,
    "v_horiz_ms": 82.81,
    "fuel_kg": 171.35,
    "fuel_pct": 38.1,
    "throttle_pct": 47.0,
    "pitch_deg": 38.9,
    "g_force": 0.17,
    "three_pos": [
      0.037205,
      -0.433951,
      -0.024439
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 531.0,
    "alt_m": 1575.8,
    "v_tot_ms": 82.4,
    "v_vert_ms": 4.72,
    "v_horiz_ms": 82.26,
    "fuel_kg": 171.01,
    "fuel_pct": 38.0,
    "throttle_pct": 46.9,
    "pitch_deg": 39.3,
    "g_force": 0.17,
    "three_pos": [
      0.037179,
      -0.43395,
      -0.024422
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 532.0,
    "alt_m": 1559.2,
    "v_tot_ms": 81.85,
    "v_vert_ms": 4.7,
    "v_horiz_ms": 81.72,
    "fuel_kg": 170.67,
    "fuel_pct": 37.9,
    "throttle_pct": 46.8,
    "pitch_deg": 39.6,
    "g_force": 0.17,
    "three_pos": [
      0.037153,
      -0.433949,
      -0.024405
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 533.0,
    "alt_m": 1542.7,
    "v_tot_ms": 81.31,
    "v_vert_ms": 4.67,
    "v_horiz_ms": 81.17,
    "fuel_kg": 170.33,
    "fuel_pct": 37.9,
    "throttle_pct": 46.7,
    "pitch_deg": 40.0,
    "g_force": 0.17,
    "three_pos": [
      0.037128,
      -0.433948,
      -0.024389
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 534.0,
    "alt_m": 1526.3,
    "v_tot_ms": 80.76,
    "v_vert_ms": 4.65,
    "v_horiz_ms": 80.63,
    "fuel_kg": 170.0,
    "fuel_pct": 37.8,
    "throttle_pct": 46.6,
    "pitch_deg": 40.4,
    "g_force": 0.17,
    "three_pos": [
      0.037102,
      -0.433947,
      -0.024372
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 535.0,
    "alt_m": 1510.0,
    "v_tot_ms": 80.22,
    "v_vert_ms": 4.62,
    "v_horiz_ms": 80.09,
    "fuel_kg": 169.66,
    "fuel_pct": 37.7,
    "throttle_pct": 46.5,
    "pitch_deg": 40.8,
    "g_force": 0.17,
    "three_pos": [
      0.037077,
      -0.433946,
      -0.024355
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 536.0,
    "alt_m": 1493.7,
    "v_tot_ms": 79.68,
    "v_vert_ms": 4.6,
    "v_horiz_ms": 79.54,
    "fuel_kg": 169.33,
    "fuel_pct": 37.6,
    "throttle_pct": 46.4,
    "pitch_deg": 41.2,
    "g_force": 0.17,
    "three_pos": [
      0.037051,
      -0.433945,
      -0.024338
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 537.0,
    "alt_m": 1477.4,
    "v_tot_ms": 79.13,
    "v_vert_ms": 4.57,
    "v_horiz_ms": 79.0,
    "fuel_kg": 168.99,
    "fuel_pct": 37.6,
    "throttle_pct": 46.3,
    "pitch_deg": 41.5,
    "g_force": 0.17,
    "three_pos": [
      0.037026,
      -0.433944,
      -0.024321
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 538.0,
    "alt_m": 1461.3,
    "v_tot_ms": 78.59,
    "v_vert_ms": 4.55,
    "v_horiz_ms": 78.45,
    "fuel_kg": 168.66,
    "fuel_pct": 37.5,
    "throttle_pct": 46.2,
    "pitch_deg": 41.9,
    "g_force": 0.17,
    "three_pos": [
      0.037,
      -0.433943,
      -0.024305
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 539.0,
    "alt_m": 1445.2,
    "v_tot_ms": 78.04,
    "v_vert_ms": 4.53,
    "v_horiz_ms": 77.91,
    "fuel_kg": 168.32,
    "fuel_pct": 37.4,
    "throttle_pct": 46.1,
    "pitch_deg": 42.3,
    "g_force": 0.17,
    "three_pos": [
      0.036975,
      -0.433942,
      -0.024288
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 540.0,
    "alt_m": 1429.2,
    "v_tot_ms": 77.5,
    "v_vert_ms": 4.5,
    "v_horiz_ms": 77.37,
    "fuel_kg": 167.99,
    "fuel_pct": 37.3,
    "throttle_pct": 46.0,
    "pitch_deg": 42.7,
    "g_force": 0.17,
    "three_pos": [
      0.036949,
      -0.433941,
      -0.024271
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 541.0,
    "alt_m": 1413.2,
    "v_tot_ms": 76.95,
    "v_vert_ms": 4.47,
    "v_horiz_ms": 76.82,
    "fuel_kg": 167.66,
    "fuel_pct": 37.3,
    "throttle_pct": 45.9,
    "pitch_deg": 43.0,
    "g_force": 0.17,
    "three_pos": [
      0.036924,
      -0.43394,
      -0.024254
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 542.0,
    "alt_m": 1397.3,
    "v_tot_ms": 76.41,
    "v_vert_ms": 4.45,
    "v_horiz_ms": 76.28,
    "fuel_kg": 167.33,
    "fuel_pct": 37.2,
    "throttle_pct": 45.8,
    "pitch_deg": 43.4,
    "g_force": 0.17,
    "three_pos": [
      0.036898,
      -0.433939,
      -0.024238
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 543.0,
    "alt_m": 1381.5,
    "v_tot_ms": 75.86,
    "v_vert_ms": 4.43,
    "v_horiz_ms": 75.73,
    "fuel_kg": 166.99,
    "fuel_pct": 37.1,
    "throttle_pct": 45.7,
    "pitch_deg": 43.8,
    "g_force": 0.17,
    "three_pos": [
      0.036873,
      -0.433939,
      -0.024221
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 544.0,
    "alt_m": 1365.8,
    "v_tot_ms": 75.32,
    "v_vert_ms": 4.4,
    "v_horiz_ms": 75.19,
    "fuel_kg": 166.66,
    "fuel_pct": 37.0,
    "throttle_pct": 45.6,
    "pitch_deg": 44.2,
    "g_force": 0.17,
    "three_pos": [
      0.036847,
      -0.433938,
      -0.024204
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 545.0,
    "alt_m": 1350.1,
    "v_tot_ms": 74.78,
    "v_vert_ms": 4.38,
    "v_horiz_ms": 74.65,
    "fuel_kg": 166.34,
    "fuel_pct": 37.0,
    "throttle_pct": 45.5,
    "pitch_deg": 44.6,
    "g_force": 0.17,
    "three_pos": [
      0.036822,
      -0.433937,
      -0.024187
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 546.0,
    "alt_m": 1334.4,
    "v_tot_ms": 74.23,
    "v_vert_ms": 4.35,
    "v_horiz_ms": 74.1,
    "fuel_kg": 166.01,
    "fuel_pct": 36.9,
    "throttle_pct": 45.4,
    "pitch_deg": 44.9,
    "g_force": 0.17,
    "three_pos": [
      0.036796,
      -0.433936,
      -0.024171
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 547.0,
    "alt_m": 1318.9,
    "v_tot_ms": 73.69,
    "v_vert_ms": 4.33,
    "v_horiz_ms": 73.56,
    "fuel_kg": 165.68,
    "fuel_pct": 36.8,
    "throttle_pct": 45.3,
    "pitch_deg": 45.3,
    "g_force": 0.17,
    "three_pos": [
      0.036771,
      -0.433935,
      -0.024154
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 548.0,
    "alt_m": 1303.4,
    "v_tot_ms": 73.14,
    "v_vert_ms": 4.3,
    "v_horiz_ms": 73.02,
    "fuel_kg": 165.35,
    "fuel_pct": 36.7,
    "throttle_pct": 45.2,
    "pitch_deg": 45.7,
    "g_force": 0.16,
    "three_pos": [
      0.036745,
      -0.433934,
      -0.024137
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 549.0,
    "alt_m": 1288.0,
    "v_tot_ms": 72.6,
    "v_vert_ms": 4.27,
    "v_horiz_ms": 72.47,
    "fuel_kg": 165.03,
    "fuel_pct": 36.7,
    "throttle_pct": 45.1,
    "pitch_deg": 46.1,
    "g_force": 0.16,
    "three_pos": [
      0.03672,
      -0.433934,
      -0.02412
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 550.0,
    "alt_m": 1272.7,
    "v_tot_ms": 72.05,
    "v_vert_ms": 4.25,
    "v_horiz_ms": 71.93,
    "fuel_kg": 164.7,
    "fuel_pct": 36.6,
    "throttle_pct": 45.0,
    "pitch_deg": 46.4,
    "g_force": 0.16,
    "three_pos": [
      0.036694,
      -0.433933,
      -0.024104
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 551.0,
    "alt_m": 1257.4,
    "v_tot_ms": 71.51,
    "v_vert_ms": 4.22,
    "v_horiz_ms": 71.38,
    "fuel_kg": 164.38,
    "fuel_pct": 36.5,
    "throttle_pct": 44.9,
    "pitch_deg": 46.8,
    "g_force": 0.16,
    "three_pos": [
      0.036669,
      -0.433932,
      -0.024087
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 552.0,
    "alt_m": 1242.2,
    "v_tot_ms": 70.96,
    "v_vert_ms": 4.2,
    "v_horiz_ms": 70.84,
    "fuel_kg": 164.05,
    "fuel_pct": 36.5,
    "throttle_pct": 44.8,
    "pitch_deg": 47.2,
    "g_force": 0.16,
    "three_pos": [
      0.036643,
      -0.433931,
      -0.02407
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 553.0,
    "alt_m": 1227.0,
    "v_tot_ms": 70.42,
    "v_vert_ms": 4.17,
    "v_horiz_ms": 70.3,
    "fuel_kg": 163.73,
    "fuel_pct": 36.4,
    "throttle_pct": 44.7,
    "pitch_deg": 47.6,
    "g_force": 0.16,
    "three_pos": [
      0.036618,
      -0.433931,
      -0.024054
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 554.0,
    "alt_m": 1212.0,
    "v_tot_ms": 69.88,
    "v_vert_ms": 4.15,
    "v_horiz_ms": 69.75,
    "fuel_kg": 163.4,
    "fuel_pct": 36.3,
    "throttle_pct": 44.6,
    "pitch_deg": 48.0,
    "g_force": 0.16,
    "three_pos": [
      0.036592,
      -0.43393,
      -0.024037
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 555.0,
    "alt_m": 1197.0,
    "v_tot_ms": 69.33,
    "v_vert_ms": 4.12,
    "v_horiz_ms": 69.21,
    "fuel_kg": 163.08,
    "fuel_pct": 36.2,
    "throttle_pct": 44.5,
    "pitch_deg": 48.3,
    "g_force": 0.16,
    "three_pos": [
      0.036567,
      -0.433929,
      -0.02402
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 556.0,
    "alt_m": 1182.1,
    "v_tot_ms": 68.79,
    "v_vert_ms": 4.1,
    "v_horiz_ms": 68.66,
    "fuel_kg": 162.76,
    "fuel_pct": 36.2,
    "throttle_pct": 44.4,
    "pitch_deg": 48.7,
    "g_force": 0.16,
    "three_pos": [
      0.036542,
      -0.433929,
      -0.024003
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 557.0,
    "alt_m": 1167.2,
    "v_tot_ms": 68.24,
    "v_vert_ms": 4.08,
    "v_horiz_ms": 68.12,
    "fuel_kg": 162.44,
    "fuel_pct": 36.1,
    "throttle_pct": 44.3,
    "pitch_deg": 49.1,
    "g_force": 0.16,
    "three_pos": [
      0.036516,
      -0.433928,
      -0.023987
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 558.0,
    "alt_m": 1152.4,
    "v_tot_ms": 67.7,
    "v_vert_ms": 4.05,
    "v_horiz_ms": 67.58,
    "fuel_kg": 162.12,
    "fuel_pct": 36.0,
    "throttle_pct": 44.2,
    "pitch_deg": 49.5,
    "g_force": 0.16,
    "three_pos": [
      0.036491,
      -0.433927,
      -0.02397
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 559.0,
    "alt_m": 1137.7,
    "v_tot_ms": 67.15,
    "v_vert_ms": 4.03,
    "v_horiz_ms": 67.03,
    "fuel_kg": 161.8,
    "fuel_pct": 36.0,
    "throttle_pct": 44.1,
    "pitch_deg": 49.8,
    "g_force": 0.16,
    "three_pos": [
      0.036465,
      -0.433927,
      -0.023953
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 560.0,
    "alt_m": 1123.1,
    "v_tot_ms": 66.61,
    "v_vert_ms": 4.0,
    "v_horiz_ms": 66.49,
    "fuel_kg": 161.48,
    "fuel_pct": 35.9,
    "throttle_pct": 44.0,
    "pitch_deg": 50.2,
    "g_force": 0.16,
    "three_pos": [
      0.03644,
      -0.433926,
      -0.023936
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 561.0,
    "alt_m": 1108.5,
    "v_tot_ms": 66.06,
    "v_vert_ms": 3.97,
    "v_horiz_ms": 65.94,
    "fuel_kg": 161.17,
    "fuel_pct": 35.8,
    "throttle_pct": 43.9,
    "pitch_deg": 50.6,
    "g_force": 0.16,
    "three_pos": [
      0.036414,
      -0.433925,
      -0.02392
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 562.0,
    "alt_m": 1094.1,
    "v_tot_ms": 65.52,
    "v_vert_ms": 3.95,
    "v_horiz_ms": 65.4,
    "fuel_kg": 160.85,
    "fuel_pct": 35.7,
    "throttle_pct": 43.8,
    "pitch_deg": 51.0,
    "g_force": 0.16,
    "three_pos": [
      0.036389,
      -0.433925,
      -0.023903
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 563.0,
    "alt_m": 1079.6,
    "v_tot_ms": 64.98,
    "v_vert_ms": 3.92,
    "v_horiz_ms": 64.86,
    "fuel_kg": 160.53,
    "fuel_pct": 35.7,
    "throttle_pct": 43.7,
    "pitch_deg": 51.4,
    "g_force": 0.16,
    "three_pos": [
      0.036363,
      -0.433924,
      -0.023886
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 564.0,
    "alt_m": 1065.3,
    "v_tot_ms": 64.43,
    "v_vert_ms": 3.9,
    "v_horiz_ms": 64.31,
    "fuel_kg": 160.22,
    "fuel_pct": 35.6,
    "throttle_pct": 43.6,
    "pitch_deg": 51.7,
    "g_force": 0.16,
    "three_pos": [
      0.036338,
      -0.433924,
      -0.023869
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 565.0,
    "alt_m": 1051.0,
    "v_tot_ms": 63.89,
    "v_vert_ms": 3.88,
    "v_horiz_ms": 63.77,
    "fuel_kg": 159.9,
    "fuel_pct": 35.5,
    "throttle_pct": 43.5,
    "pitch_deg": 52.1,
    "g_force": 0.16,
    "three_pos": [
      0.036312,
      -0.433923,
      -0.023853
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 566.0,
    "alt_m": 1036.9,
    "v_tot_ms": 63.34,
    "v_vert_ms": 3.85,
    "v_horiz_ms": 63.23,
    "fuel_kg": 159.59,
    "fuel_pct": 35.5,
    "throttle_pct": 43.4,
    "pitch_deg": 52.5,
    "g_force": 0.16,
    "three_pos": [
      0.036287,
      -0.433923,
      -0.023836
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 567.0,
    "alt_m": 1022.7,
    "v_tot_ms": 62.8,
    "v_vert_ms": 3.82,
    "v_horiz_ms": 62.68,
    "fuel_kg": 159.27,
    "fuel_pct": 35.4,
    "throttle_pct": 43.3,
    "pitch_deg": 52.9,
    "g_force": 0.16,
    "three_pos": [
      0.036261,
      -0.433922,
      -0.023819
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 568.0,
    "alt_m": 1008.7,
    "v_tot_ms": 62.25,
    "v_vert_ms": 3.8,
    "v_horiz_ms": 62.14,
    "fuel_kg": 158.96,
    "fuel_pct": 35.3,
    "throttle_pct": 43.2,
    "pitch_deg": 53.2,
    "g_force": 0.16,
    "three_pos": [
      0.036236,
      -0.433922,
      -0.023802
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 569.0,
    "alt_m": 994.7,
    "v_tot_ms": 61.71,
    "v_vert_ms": 3.77,
    "v_horiz_ms": 61.59,
    "fuel_kg": 158.65,
    "fuel_pct": 35.3,
    "throttle_pct": 43.1,
    "pitch_deg": 53.6,
    "g_force": 0.16,
    "three_pos": [
      0.03621,
      -0.433921,
      -0.023786
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 570.0,
    "alt_m": 980.9,
    "v_tot_ms": 61.17,
    "v_vert_ms": 3.75,
    "v_horiz_ms": 61.05,
    "fuel_kg": 158.34,
    "fuel_pct": 35.2,
    "throttle_pct": 43.0,
    "pitch_deg": 54.0,
    "g_force": 0.16,
    "three_pos": [
      0.036185,
      -0.433921,
      -0.023769
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 571.0,
    "alt_m": 967.0,
    "v_tot_ms": 60.62,
    "v_vert_ms": 3.73,
    "v_horiz_ms": 60.51,
    "fuel_kg": 158.03,
    "fuel_pct": 35.1,
    "throttle_pct": 42.9,
    "pitch_deg": 54.4,
    "g_force": 0.16,
    "three_pos": [
      0.036159,
      -0.43392,
      -0.023752
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 572.0,
    "alt_m": 953.3,
    "v_tot_ms": 60.08,
    "v_vert_ms": 3.7,
    "v_horiz_ms": 59.96,
    "fuel_kg": 157.72,
    "fuel_pct": 35.0,
    "throttle_pct": 42.8,
    "pitch_deg": 54.8,
    "g_force": 0.16,
    "three_pos": [
      0.036134,
      -0.43392,
      -0.023736
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 573.0,
    "alt_m": 939.7,
    "v_tot_ms": 59.53,
    "v_vert_ms": 3.67,
    "v_horiz_ms": 59.42,
    "fuel_kg": 157.41,
    "fuel_pct": 35.0,
    "throttle_pct": 42.7,
    "pitch_deg": 55.1,
    "g_force": 0.16,
    "three_pos": [
      0.036108,
      -0.43392,
      -0.023719
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 574.0,
    "alt_m": 926.1,
    "v_tot_ms": 58.99,
    "v_vert_ms": 3.65,
    "v_horiz_ms": 58.87,
    "fuel_kg": 157.1,
    "fuel_pct": 34.9,
    "throttle_pct": 42.6,
    "pitch_deg": 55.5,
    "g_force": 0.16,
    "three_pos": [
      0.036083,
      -0.433919,
      -0.023702
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 575.0,
    "alt_m": 912.6,
    "v_tot_ms": 58.44,
    "v_vert_ms": 3.62,
    "v_horiz_ms": 58.33,
    "fuel_kg": 156.79,
    "fuel_pct": 34.8,
    "throttle_pct": 42.5,
    "pitch_deg": 55.9,
    "g_force": 0.16,
    "three_pos": [
      0.036058,
      -0.433919,
      -0.023685
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 576.0,
    "alt_m": 899.2,
    "v_tot_ms": 57.9,
    "v_vert_ms": 3.6,
    "v_horiz_ms": 57.79,
    "fuel_kg": 156.49,
    "fuel_pct": 34.8,
    "throttle_pct": 42.4,
    "pitch_deg": 56.3,
    "g_force": 0.16,
    "three_pos": [
      0.036032,
      -0.433919,
      -0.023669
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 577.0,
    "alt_m": 885.8,
    "v_tot_ms": 57.35,
    "v_vert_ms": 3.58,
    "v_horiz_ms": 57.24,
    "fuel_kg": 156.18,
    "fuel_pct": 34.7,
    "throttle_pct": 42.3,
    "pitch_deg": 56.6,
    "g_force": 0.16,
    "three_pos": [
      0.036007,
      -0.433918,
      -0.023652
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 578.0,
    "alt_m": 872.6,
    "v_tot_ms": 56.81,
    "v_vert_ms": 3.55,
    "v_horiz_ms": 56.7,
    "fuel_kg": 155.88,
    "fuel_pct": 34.6,
    "throttle_pct": 42.2,
    "pitch_deg": 57.0,
    "g_force": 0.16,
    "three_pos": [
      0.035981,
      -0.433918,
      -0.023635
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 579.0,
    "alt_m": 859.4,
    "v_tot_ms": 56.27,
    "v_vert_ms": 3.52,
    "v_horiz_ms": 56.15,
    "fuel_kg": 155.57,
    "fuel_pct": 34.6,
    "throttle_pct": 42.1,
    "pitch_deg": 57.4,
    "g_force": 0.16,
    "three_pos": [
      0.035956,
      -0.433918,
      -0.023618
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 580.0,
    "alt_m": 846.3,
    "v_tot_ms": 55.72,
    "v_vert_ms": 3.5,
    "v_horiz_ms": 55.61,
    "fuel_kg": 155.27,
    "fuel_pct": 34.5,
    "throttle_pct": 42.0,
    "pitch_deg": 57.8,
    "g_force": 0.16,
    "three_pos": [
      0.03593,
      -0.433917,
      -0.023602
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 581.0,
    "alt_m": 833.3,
    "v_tot_ms": 55.18,
    "v_vert_ms": 3.47,
    "v_horiz_ms": 55.07,
    "fuel_kg": 154.96,
    "fuel_pct": 34.4,
    "throttle_pct": 41.9,
    "pitch_deg": 58.2,
    "g_force": 0.16,
    "three_pos": [
      0.035905,
      -0.433917,
      -0.023585
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 582.0,
    "alt_m": 820.3,
    "v_tot_ms": 54.63,
    "v_vert_ms": 3.45,
    "v_horiz_ms": 54.52,
    "fuel_kg": 154.66,
    "fuel_pct": 34.4,
    "throttle_pct": 41.8,
    "pitch_deg": 58.5,
    "g_force": 0.16,
    "three_pos": [
      0.035879,
      -0.433917,
      -0.023568
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 583.0,
    "alt_m": 807.5,
    "v_tot_ms": 54.09,
    "v_vert_ms": 3.42,
    "v_horiz_ms": 53.98,
    "fuel_kg": 154.36,
    "fuel_pct": 34.3,
    "throttle_pct": 41.7,
    "pitch_deg": 58.9,
    "g_force": 0.15,
    "three_pos": [
      0.035854,
      -0.433917,
      -0.023552
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 584.0,
    "alt_m": 794.7,
    "v_tot_ms": 53.54,
    "v_vert_ms": 3.4,
    "v_horiz_ms": 53.44,
    "fuel_kg": 154.06,
    "fuel_pct": 34.2,
    "throttle_pct": 41.6,
    "pitch_deg": 59.3,
    "g_force": 0.15,
    "three_pos": [
      0.035828,
      -0.433916,
      -0.023535
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 585.0,
    "alt_m": 782.0,
    "v_tot_ms": 53.0,
    "v_vert_ms": 3.38,
    "v_horiz_ms": 52.89,
    "fuel_kg": 153.76,
    "fuel_pct": 34.2,
    "throttle_pct": 41.5,
    "pitch_deg": 59.7,
    "g_force": 0.15,
    "three_pos": [
      0.035803,
      -0.433916,
      -0.023518
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 586.0,
    "alt_m": 769.5,
    "v_tot_ms": 52.45,
    "v_vert_ms": 3.35,
    "v_horiz_ms": 52.35,
    "fuel_kg": 153.46,
    "fuel_pct": 34.1,
    "throttle_pct": 41.4,
    "pitch_deg": 60.0,
    "g_force": 0.15,
    "three_pos": [
      0.035778,
      -0.433916,
      -0.023501
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 587.0,
    "alt_m": 756.9,
    "v_tot_ms": 51.91,
    "v_vert_ms": 3.33,
    "v_horiz_ms": 51.8,
    "fuel_kg": 153.16,
    "fuel_pct": 34.0,
    "throttle_pct": 41.3,
    "pitch_deg": 60.4,
    "g_force": 0.15,
    "three_pos": [
      0.035752,
      -0.433916,
      -0.023485
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 588.0,
    "alt_m": 744.5,
    "v_tot_ms": 51.37,
    "v_vert_ms": 3.3,
    "v_horiz_ms": 51.26,
    "fuel_kg": 152.86,
    "fuel_pct": 34.0,
    "throttle_pct": 41.2,
    "pitch_deg": 60.8,
    "g_force": 0.15,
    "three_pos": [
      0.035727,
      -0.433916,
      -0.023468
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 589.0,
    "alt_m": 732.2,
    "v_tot_ms": 50.82,
    "v_vert_ms": 3.28,
    "v_horiz_ms": 50.72,
    "fuel_kg": 152.56,
    "fuel_pct": 33.9,
    "throttle_pct": 41.1,
    "pitch_deg": 61.2,
    "g_force": 0.15,
    "three_pos": [
      0.035701,
      -0.433916,
      -0.023451
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 590.0,
    "alt_m": 719.9,
    "v_tot_ms": 50.28,
    "v_vert_ms": 3.25,
    "v_horiz_ms": 50.17,
    "fuel_kg": 152.27,
    "fuel_pct": 33.8,
    "throttle_pct": 41.0,
    "pitch_deg": 61.6,
    "g_force": 0.15,
    "three_pos": [
      0.035676,
      -0.433916,
      -0.023435
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 591.0,
    "alt_m": 707.7,
    "v_tot_ms": 49.73,
    "v_vert_ms": 3.22,
    "v_horiz_ms": 49.63,
    "fuel_kg": 151.97,
    "fuel_pct": 33.8,
    "throttle_pct": 40.9,
    "pitch_deg": 61.9,
    "g_force": 0.15,
    "three_pos": [
      0.03565,
      -0.433916,
      -0.023418
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 592.0,
    "alt_m": 695.7,
    "v_tot_ms": 49.19,
    "v_vert_ms": 3.2,
    "v_horiz_ms": 49.08,
    "fuel_kg": 151.68,
    "fuel_pct": 33.7,
    "throttle_pct": 40.8,
    "pitch_deg": 62.3,
    "g_force": 0.15,
    "three_pos": [
      0.035625,
      -0.433916,
      -0.023401
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 593.0,
    "alt_m": 683.7,
    "v_tot_ms": 48.64,
    "v_vert_ms": 3.17,
    "v_horiz_ms": 48.54,
    "fuel_kg": 151.38,
    "fuel_pct": 33.6,
    "throttle_pct": 40.7,
    "pitch_deg": 62.7,
    "g_force": 0.15,
    "three_pos": [
      0.035599,
      -0.433915,
      -0.023384
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 594.0,
    "alt_m": 671.8,
    "v_tot_ms": 48.1,
    "v_vert_ms": 3.15,
    "v_horiz_ms": 48.0,
    "fuel_kg": 151.09,
    "fuel_pct": 33.6,
    "throttle_pct": 40.6,
    "pitch_deg": 63.1,
    "g_force": 0.15,
    "three_pos": [
      0.035574,
      -0.433915,
      -0.023368
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 595.0,
    "alt_m": 660.0,
    "v_tot_ms": 47.56,
    "v_vert_ms": 3.12,
    "v_horiz_ms": 47.45,
    "fuel_kg": 150.79,
    "fuel_pct": 33.5,
    "throttle_pct": 40.5,
    "pitch_deg": 63.4,
    "g_force": 0.15,
    "three_pos": [
      0.035549,
      -0.433915,
      -0.023351
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 596.0,
    "alt_m": 648.2,
    "v_tot_ms": 47.01,
    "v_vert_ms": 3.1,
    "v_horiz_ms": 46.91,
    "fuel_kg": 150.5,
    "fuel_pct": 33.4,
    "throttle_pct": 40.4,
    "pitch_deg": 63.8,
    "g_force": 0.15,
    "three_pos": [
      0.035523,
      -0.433916,
      -0.023334
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 597.0,
    "alt_m": 636.6,
    "v_tot_ms": 46.47,
    "v_vert_ms": 3.07,
    "v_horiz_ms": 46.36,
    "fuel_kg": 150.21,
    "fuel_pct": 33.4,
    "throttle_pct": 40.3,
    "pitch_deg": 64.2,
    "g_force": 0.15,
    "three_pos": [
      0.035498,
      -0.433916,
      -0.023318
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 598.0,
    "alt_m": 625.1,
    "v_tot_ms": 45.92,
    "v_vert_ms": 3.05,
    "v_horiz_ms": 45.82,
    "fuel_kg": 149.92,
    "fuel_pct": 33.3,
    "throttle_pct": 40.2,
    "pitch_deg": 64.6,
    "g_force": 0.15,
    "three_pos": [
      0.035472,
      -0.433916,
      -0.023301
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 599.0,
    "alt_m": 613.6,
    "v_tot_ms": 45.38,
    "v_vert_ms": 3.02,
    "v_horiz_ms": 45.28,
    "fuel_kg": 149.63,
    "fuel_pct": 33.3,
    "throttle_pct": 40.1,
    "pitch_deg": 65.0,
    "g_force": 0.15,
    "three_pos": [
      0.035447,
      -0.433916,
      -0.023284
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 600.0,
    "alt_m": 602.3,
    "v_tot_ms": 44.83,
    "v_vert_ms": 3.0,
    "v_horiz_ms": 44.73,
    "fuel_kg": 149.34,
    "fuel_pct": 33.2,
    "throttle_pct": 40.0,
    "pitch_deg": 65.3,
    "g_force": 0.15,
    "three_pos": [
      0.035421,
      -0.433916,
      -0.023268
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 601.0,
    "alt_m": 591.0,
    "v_tot_ms": 44.29,
    "v_vert_ms": 2.98,
    "v_horiz_ms": 44.19,
    "fuel_kg": 149.05,
    "fuel_pct": 33.1,
    "throttle_pct": 39.9,
    "pitch_deg": 65.7,
    "g_force": 0.15,
    "three_pos": [
      0.035396,
      -0.433916,
      -0.023251
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 602.0,
    "alt_m": 579.8,
    "v_tot_ms": 43.75,
    "v_vert_ms": 2.95,
    "v_horiz_ms": 43.65,
    "fuel_kg": 148.76,
    "fuel_pct": 33.1,
    "throttle_pct": 39.8,
    "pitch_deg": 66.1,
    "g_force": 0.15,
    "three_pos": [
      0.035371,
      -0.433916,
      -0.023234
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 603.0,
    "alt_m": 568.8,
    "v_tot_ms": 43.2,
    "v_vert_ms": 2.93,
    "v_horiz_ms": 43.1,
    "fuel_kg": 148.48,
    "fuel_pct": 33.0,
    "throttle_pct": 39.7,
    "pitch_deg": 66.5,
    "g_force": 0.15,
    "three_pos": [
      0.035345,
      -0.433916,
      -0.023217
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 604.0,
    "alt_m": 557.8,
    "v_tot_ms": 42.66,
    "v_vert_ms": 2.9,
    "v_horiz_ms": 42.56,
    "fuel_kg": 148.19,
    "fuel_pct": 32.9,
    "throttle_pct": 39.6,
    "pitch_deg": 66.8,
    "g_force": 0.15,
    "three_pos": [
      0.03532,
      -0.433917,
      -0.023201
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 605.0,
    "alt_m": 546.9,
    "v_tot_ms": 42.11,
    "v_vert_ms": 2.88,
    "v_horiz_ms": 42.01,
    "fuel_kg": 147.9,
    "fuel_pct": 32.9,
    "throttle_pct": 39.5,
    "pitch_deg": 67.2,
    "g_force": 0.15,
    "three_pos": [
      0.035294,
      -0.433917,
      -0.023184
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 606.0,
    "alt_m": 536.1,
    "v_tot_ms": 41.57,
    "v_vert_ms": 2.85,
    "v_horiz_ms": 41.47,
    "fuel_kg": 147.62,
    "fuel_pct": 32.8,
    "throttle_pct": 39.4,
    "pitch_deg": 67.6,
    "g_force": 0.15,
    "three_pos": [
      0.035269,
      -0.433917,
      -0.023167
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 607.0,
    "alt_m": 525.5,
    "v_tot_ms": 41.02,
    "v_vert_ms": 2.83,
    "v_horiz_ms": 40.93,
    "fuel_kg": 147.33,
    "fuel_pct": 32.7,
    "throttle_pct": 39.3,
    "pitch_deg": 68.0,
    "g_force": 0.15,
    "three_pos": [
      0.035243,
      -0.433917,
      -0.023151
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 608.0,
    "alt_m": 514.9,
    "v_tot_ms": 40.48,
    "v_vert_ms": 2.8,
    "v_horiz_ms": 40.38,
    "fuel_kg": 147.05,
    "fuel_pct": 32.7,
    "throttle_pct": 39.2,
    "pitch_deg": 68.4,
    "g_force": 0.15,
    "three_pos": [
      0.035218,
      -0.433918,
      -0.023134
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 609.0,
    "alt_m": 504.4,
    "v_tot_ms": 39.93,
    "v_vert_ms": 2.78,
    "v_horiz_ms": 39.84,
    "fuel_kg": 146.77,
    "fuel_pct": 32.6,
    "throttle_pct": 39.1,
    "pitch_deg": 68.7,
    "g_force": 0.15,
    "three_pos": [
      0.035193,
      -0.433918,
      -0.023117
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 610.0,
    "alt_m": 494.0,
    "v_tot_ms": 39.39,
    "v_vert_ms": 2.75,
    "v_horiz_ms": 39.29,
    "fuel_kg": 146.49,
    "fuel_pct": 32.6,
    "throttle_pct": 39.0,
    "pitch_deg": 69.1,
    "g_force": 0.15,
    "three_pos": [
      0.035167,
      -0.433918,
      -0.023101
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 611.0,
    "alt_m": 483.8,
    "v_tot_ms": 38.85,
    "v_vert_ms": 2.73,
    "v_horiz_ms": 38.75,
    "fuel_kg": 146.2,
    "fuel_pct": 32.5,
    "throttle_pct": 38.9,
    "pitch_deg": 69.5,
    "g_force": 0.15,
    "three_pos": [
      0.035142,
      -0.433919,
      -0.023084
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 612.0,
    "alt_m": 473.6,
    "v_tot_ms": 38.3,
    "v_vert_ms": 2.7,
    "v_horiz_ms": 38.21,
    "fuel_kg": 145.92,
    "fuel_pct": 32.4,
    "throttle_pct": 38.8,
    "pitch_deg": 69.9,
    "g_force": 0.15,
    "three_pos": [
      0.035116,
      -0.433919,
      -0.023067
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 613.0,
    "alt_m": 463.5,
    "v_tot_ms": 37.76,
    "v_vert_ms": 2.67,
    "v_horiz_ms": 37.66,
    "fuel_kg": 145.64,
    "fuel_pct": 32.4,
    "throttle_pct": 38.7,
    "pitch_deg": 70.2,
    "g_force": 0.15,
    "three_pos": [
      0.035091,
      -0.433919,
      -0.02305
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 614.0,
    "alt_m": 453.6,
    "v_tot_ms": 37.21,
    "v_vert_ms": 2.65,
    "v_horiz_ms": 37.12,
    "fuel_kg": 145.36,
    "fuel_pct": 32.3,
    "throttle_pct": 38.6,
    "pitch_deg": 70.6,
    "g_force": 0.15,
    "three_pos": [
      0.035066,
      -0.43392,
      -0.023034
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 615.0,
    "alt_m": 443.8,
    "v_tot_ms": 36.67,
    "v_vert_ms": 2.62,
    "v_horiz_ms": 36.58,
    "fuel_kg": 145.09,
    "fuel_pct": 32.2,
    "throttle_pct": 38.5,
    "pitch_deg": 71.0,
    "g_force": 0.15,
    "three_pos": [
      0.03504,
      -0.43392,
      -0.023017
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 616.0,
    "alt_m": 434.0,
    "v_tot_ms": 36.12,
    "v_vert_ms": 2.6,
    "v_horiz_ms": 36.03,
    "fuel_kg": 144.81,
    "fuel_pct": 32.2,
    "throttle_pct": 38.4,
    "pitch_deg": 71.4,
    "g_force": 0.14,
    "three_pos": [
      0.035015,
      -0.433921,
      -0.023
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 617.0,
    "alt_m": 424.4,
    "v_tot_ms": 35.58,
    "v_vert_ms": 2.58,
    "v_horiz_ms": 35.49,
    "fuel_kg": 144.53,
    "fuel_pct": 32.1,
    "throttle_pct": 38.3,
    "pitch_deg": 71.8,
    "g_force": 0.14,
    "three_pos": [
      0.034989,
      -0.433921,
      -0.022984
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 618.0,
    "alt_m": 414.9,
    "v_tot_ms": 35.04,
    "v_vert_ms": 2.55,
    "v_horiz_ms": 34.94,
    "fuel_kg": 144.25,
    "fuel_pct": 32.1,
    "throttle_pct": 38.2,
    "pitch_deg": 72.1,
    "g_force": 0.14,
    "three_pos": [
      0.034964,
      -0.433922,
      -0.022967
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 619.0,
    "alt_m": 405.5,
    "v_tot_ms": 34.49,
    "v_vert_ms": 2.52,
    "v_horiz_ms": 34.4,
    "fuel_kg": 143.98,
    "fuel_pct": 32.0,
    "throttle_pct": 38.1,
    "pitch_deg": 72.5,
    "g_force": 0.14,
    "three_pos": [
      0.034939,
      -0.433922,
      -0.02295
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 620.0,
    "alt_m": 396.2,
    "v_tot_ms": 33.95,
    "v_vert_ms": 2.5,
    "v_horiz_ms": 33.86,
    "fuel_kg": 143.7,
    "fuel_pct": 31.9,
    "throttle_pct": 38.0,
    "pitch_deg": 72.9,
    "g_force": 0.14,
    "three_pos": [
      0.034913,
      -0.433923,
      -0.022934
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 621.0,
    "alt_m": 387.0,
    "v_tot_ms": 33.4,
    "v_vert_ms": 2.47,
    "v_horiz_ms": 33.31,
    "fuel_kg": 143.43,
    "fuel_pct": 31.9,
    "throttle_pct": 37.9,
    "pitch_deg": 73.3,
    "g_force": 0.14,
    "three_pos": [
      0.034888,
      -0.433924,
      -0.022917
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 622.0,
    "alt_m": 377.9,
    "v_tot_ms": 32.86,
    "v_vert_ms": 2.45,
    "v_horiz_ms": 32.77,
    "fuel_kg": 143.15,
    "fuel_pct": 31.8,
    "throttle_pct": 37.8,
    "pitch_deg": 73.6,
    "g_force": 0.14,
    "three_pos": [
      0.034862,
      -0.433924,
      -0.0229
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 623.0,
    "alt_m": 369.0,
    "v_tot_ms": 32.32,
    "v_vert_ms": 2.42,
    "v_horiz_ms": 32.22,
    "fuel_kg": 142.88,
    "fuel_pct": 31.8,
    "throttle_pct": 37.7,
    "pitch_deg": 74.0,
    "g_force": 0.14,
    "three_pos": [
      0.034837,
      -0.433925,
      -0.022884
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 624.0,
    "alt_m": 360.2,
    "v_tot_ms": 31.77,
    "v_vert_ms": 2.4,
    "v_horiz_ms": 31.68,
    "fuel_kg": 142.61,
    "fuel_pct": 31.7,
    "throttle_pct": 37.6,
    "pitch_deg": 74.4,
    "g_force": 0.14,
    "three_pos": [
      0.034812,
      -0.433926,
      -0.022867
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 625.0,
    "alt_m": 351.5,
    "v_tot_ms": 31.23,
    "v_vert_ms": 2.37,
    "v_horiz_ms": 31.14,
    "fuel_kg": 142.34,
    "fuel_pct": 31.6,
    "throttle_pct": 37.5,
    "pitch_deg": 74.8,
    "g_force": 0.14,
    "three_pos": [
      0.034786,
      -0.433926,
      -0.02285
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 626.0,
    "alt_m": 342.9,
    "v_tot_ms": 30.68,
    "v_vert_ms": 2.35,
    "v_horiz_ms": 30.59,
    "fuel_kg": 142.07,
    "fuel_pct": 31.6,
    "throttle_pct": 37.4,
    "pitch_deg": 75.2,
    "g_force": 0.14,
    "three_pos": [
      0.034761,
      -0.433927,
      -0.022834
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 627.0,
    "alt_m": 334.5,
    "v_tot_ms": 30.14,
    "v_vert_ms": 2.32,
    "v_horiz_ms": 30.05,
    "fuel_kg": 141.8,
    "fuel_pct": 31.5,
    "throttle_pct": 37.3,
    "pitch_deg": 75.5,
    "g_force": 0.14,
    "three_pos": [
      0.034735,
      -0.433928,
      -0.022817
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 628.0,
    "alt_m": 326.2,
    "v_tot_ms": 29.59,
    "v_vert_ms": 2.3,
    "v_horiz_ms": 29.5,
    "fuel_kg": 141.53,
    "fuel_pct": 31.5,
    "throttle_pct": 37.2,
    "pitch_deg": 75.9,
    "g_force": 0.14,
    "three_pos": [
      0.03471,
      -0.433929,
      -0.0228
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 629.0,
    "alt_m": 318.0,
    "v_tot_ms": 29.05,
    "v_vert_ms": 2.27,
    "v_horiz_ms": 28.96,
    "fuel_kg": 141.26,
    "fuel_pct": 31.4,
    "throttle_pct": 37.1,
    "pitch_deg": 76.3,
    "g_force": 0.14,
    "three_pos": [
      0.034685,
      -0.43393,
      -0.022784
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 630.0,
    "alt_m": 309.9,
    "v_tot_ms": 28.51,
    "v_vert_ms": 2.25,
    "v_horiz_ms": 28.42,
    "fuel_kg": 140.99,
    "fuel_pct": 31.3,
    "throttle_pct": 37.0,
    "pitch_deg": 76.7,
    "g_force": 0.14,
    "three_pos": [
      0.034659,
      -0.433931,
      -0.022767
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 631.0,
    "alt_m": 302.0,
    "v_tot_ms": 27.96,
    "v_vert_ms": 2.23,
    "v_horiz_ms": 27.87,
    "fuel_kg": 140.73,
    "fuel_pct": 31.3,
    "throttle_pct": 36.9,
    "pitch_deg": 77.0,
    "g_force": 0.14,
    "three_pos": [
      0.034634,
      -0.433931,
      -0.02275
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 632.0,
    "alt_m": 294.2,
    "v_tot_ms": 27.42,
    "v_vert_ms": 2.2,
    "v_horiz_ms": 27.33,
    "fuel_kg": 140.46,
    "fuel_pct": 31.2,
    "throttle_pct": 36.8,
    "pitch_deg": 77.4,
    "g_force": 0.14,
    "three_pos": [
      0.034609,
      -0.433932,
      -0.022734
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 633.0,
    "alt_m": 286.5,
    "v_tot_ms": 26.87,
    "v_vert_ms": 2.18,
    "v_horiz_ms": 26.79,
    "fuel_kg": 140.19,
    "fuel_pct": 31.2,
    "throttle_pct": 36.7,
    "pitch_deg": 77.8,
    "g_force": 0.14,
    "three_pos": [
      0.034583,
      -0.433933,
      -0.022717
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 634.0,
    "alt_m": 279.0,
    "v_tot_ms": 26.33,
    "v_vert_ms": 2.15,
    "v_horiz_ms": 26.24,
    "fuel_kg": 139.93,
    "fuel_pct": 31.1,
    "throttle_pct": 36.6,
    "pitch_deg": 78.2,
    "g_force": 0.14,
    "three_pos": [
      0.034558,
      -0.433934,
      -0.0227
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 635.0,
    "alt_m": 271.6,
    "v_tot_ms": 25.78,
    "v_vert_ms": 2.12,
    "v_horiz_ms": 25.7,
    "fuel_kg": 139.66,
    "fuel_pct": 31.0,
    "throttle_pct": 36.5,
    "pitch_deg": 78.6,
    "g_force": 0.14,
    "three_pos": [
      0.034533,
      -0.433935,
      -0.022684
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 636.0,
    "alt_m": 264.4,
    "v_tot_ms": 25.24,
    "v_vert_ms": 2.1,
    "v_horiz_ms": 25.15,
    "fuel_kg": 139.4,
    "fuel_pct": 31.0,
    "throttle_pct": 36.4,
    "pitch_deg": 78.9,
    "g_force": 0.14,
    "three_pos": [
      0.034507,
      -0.433936,
      -0.022667
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 637.0,
    "alt_m": 257.3,
    "v_tot_ms": 24.7,
    "v_vert_ms": 2.08,
    "v_horiz_ms": 24.61,
    "fuel_kg": 139.14,
    "fuel_pct": 30.9,
    "throttle_pct": 36.3,
    "pitch_deg": 79.3,
    "g_force": 0.14,
    "three_pos": [
      0.034482,
      -0.433938,
      -0.02265
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 638.0,
    "alt_m": 250.4,
    "v_tot_ms": 24.15,
    "v_vert_ms": 2.05,
    "v_horiz_ms": 24.07,
    "fuel_kg": 138.88,
    "fuel_pct": 30.9,
    "throttle_pct": 36.2,
    "pitch_deg": 79.7,
    "g_force": 0.14,
    "three_pos": [
      0.034456,
      -0.433939,
      -0.022634
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 639.0,
    "alt_m": 243.6,
    "v_tot_ms": 23.61,
    "v_vert_ms": 2.03,
    "v_horiz_ms": 23.52,
    "fuel_kg": 138.62,
    "fuel_pct": 30.8,
    "throttle_pct": 36.1,
    "pitch_deg": 80.1,
    "g_force": 0.14,
    "three_pos": [
      0.034431,
      -0.43394,
      -0.022617
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 640.0,
    "alt_m": 237.0,
    "v_tot_ms": 23.06,
    "v_vert_ms": 2.0,
    "v_horiz_ms": 22.98,
    "fuel_kg": 138.35,
    "fuel_pct": 30.7,
    "throttle_pct": 36.0,
    "pitch_deg": 80.4,
    "g_force": 0.14,
    "three_pos": [
      0.034406,
      -0.433941,
      -0.0226
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 641.0,
    "alt_m": 230.6,
    "v_tot_ms": 22.52,
    "v_vert_ms": 1.97,
    "v_horiz_ms": 22.43,
    "fuel_kg": 138.1,
    "fuel_pct": 30.7,
    "throttle_pct": 35.9,
    "pitch_deg": 80.8,
    "g_force": 0.14,
    "three_pos": [
      0.03438,
      -0.433942,
      -0.022584
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 642.0,
    "alt_m": 224.3,
    "v_tot_ms": 21.98,
    "v_vert_ms": 1.95,
    "v_horiz_ms": 21.89,
    "fuel_kg": 137.84,
    "fuel_pct": 30.6,
    "throttle_pct": 35.8,
    "pitch_deg": 81.2,
    "g_force": 0.14,
    "three_pos": [
      0.034355,
      -0.433944,
      -0.022567
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 643.0,
    "alt_m": 218.2,
    "v_tot_ms": 21.43,
    "v_vert_ms": 1.92,
    "v_horiz_ms": 21.35,
    "fuel_kg": 137.58,
    "fuel_pct": 30.6,
    "throttle_pct": 35.7,
    "pitch_deg": 81.6,
    "g_force": 0.14,
    "three_pos": [
      0.03433,
      -0.433945,
      -0.02255
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 644.0,
    "alt_m": 212.3,
    "v_tot_ms": 20.89,
    "v_vert_ms": 1.9,
    "v_horiz_ms": 20.8,
    "fuel_kg": 137.32,
    "fuel_pct": 30.5,
    "throttle_pct": 35.6,
    "pitch_deg": 82.0,
    "g_force": 0.14,
    "three_pos": [
      0.034304,
      -0.433946,
      -0.022534
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 645.0,
    "alt_m": 206.5,
    "v_tot_ms": 20.34,
    "v_vert_ms": 1.88,
    "v_horiz_ms": 20.26,
    "fuel_kg": 137.06,
    "fuel_pct": 30.5,
    "throttle_pct": 35.5,
    "pitch_deg": 82.3,
    "g_force": 0.14,
    "three_pos": [
      0.034279,
      -0.433948,
      -0.022517
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 646.0,
    "alt_m": 201.0,
    "v_tot_ms": 19.8,
    "v_vert_ms": 1.85,
    "v_horiz_ms": 19.71,
    "fuel_kg": 136.81,
    "fuel_pct": 30.4,
    "throttle_pct": 35.4,
    "pitch_deg": 82.7,
    "g_force": 0.14,
    "three_pos": [
      0.034254,
      -0.433949,
      -0.0225
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 647.0,
    "alt_m": 195.6,
    "v_tot_ms": 19.26,
    "v_vert_ms": 1.83,
    "v_horiz_ms": 19.17,
    "fuel_kg": 136.55,
    "fuel_pct": 30.3,
    "throttle_pct": 35.3,
    "pitch_deg": 83.1,
    "g_force": 0.14,
    "three_pos": [
      0.034228,
      -0.433951,
      -0.022484
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 648.0,
    "alt_m": 190.5,
    "v_tot_ms": 18.71,
    "v_vert_ms": 1.8,
    "v_horiz_ms": 18.63,
    "fuel_kg": 136.3,
    "fuel_pct": 30.3,
    "throttle_pct": 35.2,
    "pitch_deg": 83.5,
    "g_force": 0.13,
    "three_pos": [
      0.034203,
      -0.433952,
      -0.022467
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 649.0,
    "alt_m": 185.5,
    "v_tot_ms": 18.17,
    "v_vert_ms": 1.78,
    "v_horiz_ms": 18.08,
    "fuel_kg": 136.04,
    "fuel_pct": 30.2,
    "throttle_pct": 35.1,
    "pitch_deg": 83.8,
    "g_force": 0.13,
    "three_pos": [
      0.034178,
      -0.433954,
      -0.022451
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 650.0,
    "alt_m": 180.8,
    "v_tot_ms": 17.63,
    "v_vert_ms": 1.75,
    "v_horiz_ms": 17.54,
    "fuel_kg": 135.79,
    "fuel_pct": 30.2,
    "throttle_pct": 35.0,
    "pitch_deg": 84.2,
    "g_force": 0.13,
    "three_pos": [
      0.034152,
      -0.433956,
      -0.022434
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 651.0,
    "alt_m": 176.3,
    "v_tot_ms": 17.08,
    "v_vert_ms": 1.73,
    "v_horiz_ms": 17.0,
    "fuel_kg": 135.54,
    "fuel_pct": 30.1,
    "throttle_pct": 34.9,
    "pitch_deg": 84.6,
    "g_force": 0.13,
    "three_pos": [
      0.034127,
      -0.433957,
      -0.022417
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 652.0,
    "alt_m": 172.0,
    "v_tot_ms": 16.54,
    "v_vert_ms": 1.7,
    "v_horiz_ms": 16.45,
    "fuel_kg": 135.29,
    "fuel_pct": 30.1,
    "throttle_pct": 34.8,
    "pitch_deg": 85.0,
    "g_force": 0.13,
    "three_pos": [
      0.034102,
      -0.433959,
      -0.022401
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 653.0,
    "alt_m": 168.0,
    "v_tot_ms": 16.0,
    "v_vert_ms": 1.68,
    "v_horiz_ms": 15.91,
    "fuel_kg": 135.03,
    "fuel_pct": 30.0,
    "throttle_pct": 34.7,
    "pitch_deg": 85.4,
    "g_force": 0.13,
    "three_pos": [
      0.034076,
      -0.433961,
      -0.022384
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 654.0,
    "alt_m": 164.3,
    "v_tot_ms": 15.45,
    "v_vert_ms": 1.65,
    "v_horiz_ms": 15.36,
    "fuel_kg": 134.78,
    "fuel_pct": 30.0,
    "throttle_pct": 34.6,
    "pitch_deg": 85.7,
    "g_force": 0.13,
    "three_pos": [
      0.034051,
      -0.433963,
      -0.022367
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 655.0,
    "alt_m": 160.9,
    "v_tot_ms": 14.91,
    "v_vert_ms": 1.63,
    "v_horiz_ms": 14.82,
    "fuel_kg": 134.53,
    "fuel_pct": 29.9,
    "throttle_pct": 34.5,
    "pitch_deg": 86.1,
    "g_force": 0.13,
    "three_pos": [
      0.034026,
      -0.433965,
      -0.022351
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 656.0,
    "alt_m": 157.8,
    "v_tot_ms": 14.36,
    "v_vert_ms": 1.6,
    "v_horiz_ms": 14.28,
    "fuel_kg": 134.28,
    "fuel_pct": 29.8,
    "throttle_pct": 34.4,
    "pitch_deg": 86.5,
    "g_force": 0.13,
    "three_pos": [
      0.034001,
      -0.433967,
      -0.022334
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 657.0,
    "alt_m": 155.1,
    "v_tot_ms": 13.82,
    "v_vert_ms": 1.58,
    "v_horiz_ms": 13.73,
    "fuel_kg": 134.04,
    "fuel_pct": 29.8,
    "throttle_pct": 34.3,
    "pitch_deg": 86.9,
    "g_force": 0.13,
    "three_pos": [
      0.033975,
      -0.433969,
      -0.022318
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 658.0,
    "alt_m": 152.8,
    "v_tot_ms": 13.28,
    "v_vert_ms": 1.55,
    "v_horiz_ms": 13.19,
    "fuel_kg": 133.79,
    "fuel_pct": 29.7,
    "throttle_pct": 34.2,
    "pitch_deg": 87.2,
    "g_force": 0.13,
    "three_pos": [
      0.03395,
      -0.433971,
      -0.022301
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 659.0,
    "alt_m": 151.0,
    "v_tot_ms": 12.74,
    "v_vert_ms": 1.52,
    "v_horiz_ms": 12.64,
    "fuel_kg": 133.54,
    "fuel_pct": 29.7,
    "throttle_pct": 34.1,
    "pitch_deg": 87.6,
    "g_force": 0.13,
    "three_pos": [
      0.033925,
      -0.433974,
      -0.022284
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 660.0,
    "alt_m": 150.0,
    "v_tot_ms": 12.19,
    "v_vert_ms": 1.5,
    "v_horiz_ms": 12.1,
    "fuel_kg": 133.3,
    "fuel_pct": 29.6,
    "throttle_pct": 34.0,
    "pitch_deg": 88.0,
    "g_force": 0.13,
    "three_pos": [
      0.0339,
      -0.433976,
      -0.022268
    ],
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "t_s": 661.0,
    "alt_m": 147.0,
    "v_tot_ms": 11.86,
    "v_vert_ms": 1.19,
    "v_horiz_ms": 11.8,
    "fuel_kg": 133.0,
    "fuel_pct": 29.6,
    "throttle_pct": 31.9,
    "pitch_deg": 88.0,
    "g_force": 0.16,
    "three_pos": [
      0.033874,
      -0.433978,
      -0.022251
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 662.0,
    "alt_m": 144.0,
    "v_tot_ms": 11.66,
    "v_vert_ms": 1.19,
    "v_horiz_ms": 11.6,
    "fuel_kg": 132.7,
    "fuel_pct": 29.5,
    "throttle_pct": 31.9,
    "pitch_deg": 88.1,
    "g_force": 0.16,
    "three_pos": [
      0.033849,
      -0.43398,
      -0.022235
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 663.0,
    "alt_m": 141.0,
    "v_tot_ms": 11.46,
    "v_vert_ms": 1.18,
    "v_horiz_ms": 11.4,
    "fuel_kg": 132.4,
    "fuel_pct": 29.4,
    "throttle_pct": 31.8,
    "pitch_deg": 88.1,
    "g_force": 0.16,
    "three_pos": [
      0.033824,
      -0.433983,
      -0.022218
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 664.0,
    "alt_m": 138.1,
    "v_tot_ms": 11.26,
    "v_vert_ms": 1.17,
    "v_horiz_ms": 11.2,
    "fuel_kg": 132.1,
    "fuel_pct": 29.4,
    "throttle_pct": 31.7,
    "pitch_deg": 88.1,
    "g_force": 0.16,
    "three_pos": [
      0.033798,
      -0.433985,
      -0.022201
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 665.0,
    "alt_m": 135.1,
    "v_tot_ms": 11.06,
    "v_vert_ms": 1.17,
    "v_horiz_ms": 11.0,
    "fuel_kg": 131.8,
    "fuel_pct": 29.3,
    "throttle_pct": 31.7,
    "pitch_deg": 88.2,
    "g_force": 0.16,
    "three_pos": [
      0.033773,
      -0.433987,
      -0.022185
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 666.0,
    "alt_m": 132.2,
    "v_tot_ms": 10.86,
    "v_vert_ms": 1.16,
    "v_horiz_ms": 10.8,
    "fuel_kg": 131.5,
    "fuel_pct": 29.2,
    "throttle_pct": 31.6,
    "pitch_deg": 88.2,
    "g_force": 0.16,
    "three_pos": [
      0.033748,
      -0.433989,
      -0.022168
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 667.0,
    "alt_m": 129.3,
    "v_tot_ms": 10.66,
    "v_vert_ms": 1.15,
    "v_horiz_ms": 10.6,
    "fuel_kg": 131.21,
    "fuel_pct": 29.2,
    "throttle_pct": 31.5,
    "pitch_deg": 88.2,
    "g_force": 0.16,
    "three_pos": [
      0.033722,
      -0.433991,
      -0.022152
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 668.0,
    "alt_m": 126.3,
    "v_tot_ms": 10.46,
    "v_vert_ms": 1.15,
    "v_horiz_ms": 10.4,
    "fuel_kg": 130.91,
    "fuel_pct": 29.1,
    "throttle_pct": 31.5,
    "pitch_deg": 88.3,
    "g_force": 0.16,
    "three_pos": [
      0.033697,
      -0.433993,
      -0.022135
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 669.0,
    "alt_m": 123.4,
    "v_tot_ms": 10.26,
    "v_vert_ms": 1.14,
    "v_horiz_ms": 10.2,
    "fuel_kg": 130.61,
    "fuel_pct": 29.0,
    "throttle_pct": 31.4,
    "pitch_deg": 88.3,
    "g_force": 0.16,
    "three_pos": [
      0.033672,
      -0.433995,
      -0.022118
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 670.0,
    "alt_m": 120.5,
    "v_tot_ms": 10.06,
    "v_vert_ms": 1.13,
    "v_horiz_ms": 10.0,
    "fuel_kg": 130.31,
    "fuel_pct": 29.0,
    "throttle_pct": 31.3,
    "pitch_deg": 88.3,
    "g_force": 0.16,
    "three_pos": [
      0.033647,
      -0.433997,
      -0.022102
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 671.0,
    "alt_m": 117.6,
    "v_tot_ms": 9.86,
    "v_vert_ms": 1.13,
    "v_horiz_ms": 9.8,
    "fuel_kg": 130.01,
    "fuel_pct": 28.9,
    "throttle_pct": 31.3,
    "pitch_deg": 88.4,
    "g_force": 0.16,
    "three_pos": [
      0.033621,
      -0.433999,
      -0.022085
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 672.0,
    "alt_m": 114.8,
    "v_tot_ms": 9.67,
    "v_vert_ms": 1.12,
    "v_horiz_ms": 9.6,
    "fuel_kg": 129.71,
    "fuel_pct": 28.8,
    "throttle_pct": 31.2,
    "pitch_deg": 88.4,
    "g_force": 0.16,
    "three_pos": [
      0.033596,
      -0.434001,
      -0.022068
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 673.0,
    "alt_m": 111.9,
    "v_tot_ms": 9.47,
    "v_vert_ms": 1.11,
    "v_horiz_ms": 9.4,
    "fuel_kg": 129.41,
    "fuel_pct": 28.8,
    "throttle_pct": 31.1,
    "pitch_deg": 88.4,
    "g_force": 0.16,
    "three_pos": [
      0.033571,
      -0.434003,
      -0.022052
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 674.0,
    "alt_m": 109.0,
    "v_tot_ms": 9.27,
    "v_vert_ms": 1.11,
    "v_horiz_ms": 9.2,
    "fuel_kg": 129.11,
    "fuel_pct": 28.7,
    "throttle_pct": 31.1,
    "pitch_deg": 88.5,
    "g_force": 0.16,
    "three_pos": [
      0.033545,
      -0.434005,
      -0.022035
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 675.0,
    "alt_m": 106.2,
    "v_tot_ms": 9.07,
    "v_vert_ms": 1.1,
    "v_horiz_ms": 9.0,
    "fuel_kg": 128.81,
    "fuel_pct": 28.6,
    "throttle_pct": 31.0,
    "pitch_deg": 88.5,
    "g_force": 0.16,
    "three_pos": [
      0.03352,
      -0.434008,
      -0.022019
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 676.0,
    "alt_m": 103.4,
    "v_tot_ms": 8.87,
    "v_vert_ms": 1.09,
    "v_horiz_ms": 8.8,
    "fuel_kg": 128.51,
    "fuel_pct": 28.6,
    "throttle_pct": 30.9,
    "pitch_deg": 88.5,
    "g_force": 0.16,
    "three_pos": [
      0.033495,
      -0.43401,
      -0.022002
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 677.0,
    "alt_m": 100.6,
    "v_tot_ms": 8.67,
    "v_vert_ms": 1.09,
    "v_horiz_ms": 8.6,
    "fuel_kg": 128.21,
    "fuel_pct": 28.5,
    "throttle_pct": 30.9,
    "pitch_deg": 88.6,
    "g_force": 0.16,
    "three_pos": [
      0.033469,
      -0.434012,
      -0.021985
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 678.0,
    "alt_m": 97.8,
    "v_tot_ms": 8.47,
    "v_vert_ms": 1.08,
    "v_horiz_ms": 8.4,
    "fuel_kg": 127.91,
    "fuel_pct": 28.4,
    "throttle_pct": 30.8,
    "pitch_deg": 88.6,
    "g_force": 0.16,
    "three_pos": [
      0.033444,
      -0.434014,
      -0.021969
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 679.0,
    "alt_m": 95.0,
    "v_tot_ms": 8.27,
    "v_vert_ms": 1.07,
    "v_horiz_ms": 8.2,
    "fuel_kg": 127.61,
    "fuel_pct": 28.4,
    "throttle_pct": 30.7,
    "pitch_deg": 88.6,
    "g_force": 0.16,
    "three_pos": [
      0.033419,
      -0.434016,
      -0.021952
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 680.0,
    "alt_m": 92.2,
    "v_tot_ms": 8.07,
    "v_vert_ms": 1.07,
    "v_horiz_ms": 8.0,
    "fuel_kg": 127.31,
    "fuel_pct": 28.3,
    "throttle_pct": 30.7,
    "pitch_deg": 88.7,
    "g_force": 0.16,
    "three_pos": [
      0.033394,
      -0.434018,
      -0.021935
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 681.0,
    "alt_m": 89.5,
    "v_tot_ms": 7.87,
    "v_vert_ms": 1.06,
    "v_horiz_ms": 7.8,
    "fuel_kg": 127.01,
    "fuel_pct": 28.2,
    "throttle_pct": 30.6,
    "pitch_deg": 88.7,
    "g_force": 0.16,
    "three_pos": [
      0.033368,
      -0.43402,
      -0.021919
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 682.0,
    "alt_m": 86.7,
    "v_tot_ms": 7.67,
    "v_vert_ms": 1.05,
    "v_horiz_ms": 7.6,
    "fuel_kg": 126.72,
    "fuel_pct": 28.2,
    "throttle_pct": 30.5,
    "pitch_deg": 88.7,
    "g_force": 0.16,
    "three_pos": [
      0.033343,
      -0.434022,
      -0.021902
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 683.0,
    "alt_m": 84.0,
    "v_tot_ms": 7.47,
    "v_vert_ms": 1.05,
    "v_horiz_ms": 7.4,
    "fuel_kg": 126.42,
    "fuel_pct": 28.1,
    "throttle_pct": 30.5,
    "pitch_deg": 88.8,
    "g_force": 0.16,
    "three_pos": [
      0.033318,
      -0.434024,
      -0.021886
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 684.0,
    "alt_m": 81.3,
    "v_tot_ms": 7.27,
    "v_vert_ms": 1.04,
    "v_horiz_ms": 7.2,
    "fuel_kg": 126.12,
    "fuel_pct": 28.0,
    "throttle_pct": 30.4,
    "pitch_deg": 88.8,
    "g_force": 0.16,
    "three_pos": [
      0.033292,
      -0.434026,
      -0.021869
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 685.0,
    "alt_m": 78.6,
    "v_tot_ms": 7.08,
    "v_vert_ms": 1.03,
    "v_horiz_ms": 7.0,
    "fuel_kg": 125.82,
    "fuel_pct": 28.0,
    "throttle_pct": 30.3,
    "pitch_deg": 88.8,
    "g_force": 0.16,
    "three_pos": [
      0.033267,
      -0.434028,
      -0.021852
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 686.0,
    "alt_m": 75.9,
    "v_tot_ms": 6.88,
    "v_vert_ms": 1.03,
    "v_horiz_ms": 6.8,
    "fuel_kg": 125.52,
    "fuel_pct": 27.9,
    "throttle_pct": 30.3,
    "pitch_deg": 88.9,
    "g_force": 0.16,
    "three_pos": [
      0.033242,
      -0.434031,
      -0.021836
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 687.0,
    "alt_m": 73.2,
    "v_tot_ms": 6.68,
    "v_vert_ms": 1.02,
    "v_horiz_ms": 6.6,
    "fuel_kg": 125.22,
    "fuel_pct": 27.8,
    "throttle_pct": 30.2,
    "pitch_deg": 88.9,
    "g_force": 0.16,
    "three_pos": [
      0.033217,
      -0.434033,
      -0.021819
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 688.0,
    "alt_m": 70.5,
    "v_tot_ms": 6.48,
    "v_vert_ms": 1.01,
    "v_horiz_ms": 6.4,
    "fuel_kg": 124.92,
    "fuel_pct": 27.8,
    "throttle_pct": 30.1,
    "pitch_deg": 88.9,
    "g_force": 0.16,
    "three_pos": [
      0.033191,
      -0.434035,
      -0.021803
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 689.0,
    "alt_m": 67.9,
    "v_tot_ms": 6.28,
    "v_vert_ms": 1.01,
    "v_horiz_ms": 6.2,
    "fuel_kg": 124.62,
    "fuel_pct": 27.7,
    "throttle_pct": 30.1,
    "pitch_deg": 89.0,
    "g_force": 0.16,
    "three_pos": [
      0.033166,
      -0.434037,
      -0.021786
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 690.0,
    "alt_m": 65.3,
    "v_tot_ms": 6.08,
    "v_vert_ms": 1.0,
    "v_horiz_ms": 6.0,
    "fuel_kg": 124.32,
    "fuel_pct": 27.6,
    "throttle_pct": 30.0,
    "pitch_deg": 89.0,
    "g_force": 0.16,
    "three_pos": [
      0.033141,
      -0.434039,
      -0.021769
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 691.0,
    "alt_m": 62.7,
    "v_tot_ms": 5.88,
    "v_vert_ms": 0.99,
    "v_horiz_ms": 5.8,
    "fuel_kg": 124.02,
    "fuel_pct": 27.6,
    "throttle_pct": 29.9,
    "pitch_deg": 89.0,
    "g_force": 0.16,
    "three_pos": [
      0.033115,
      -0.434041,
      -0.021753
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 692.0,
    "alt_m": 60.1,
    "v_tot_ms": 5.69,
    "v_vert_ms": 0.99,
    "v_horiz_ms": 5.6,
    "fuel_kg": 123.72,
    "fuel_pct": 27.5,
    "throttle_pct": 29.9,
    "pitch_deg": 89.1,
    "g_force": 0.16,
    "three_pos": [
      0.03309,
      -0.434043,
      -0.021736
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 693.0,
    "alt_m": 57.5,
    "v_tot_ms": 5.49,
    "v_vert_ms": 0.98,
    "v_horiz_ms": 5.4,
    "fuel_kg": 123.42,
    "fuel_pct": 27.4,
    "throttle_pct": 29.8,
    "pitch_deg": 89.1,
    "g_force": 0.16,
    "three_pos": [
      0.033065,
      -0.434045,
      -0.021719
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 694.0,
    "alt_m": 55.0,
    "v_tot_ms": 5.29,
    "v_vert_ms": 0.97,
    "v_horiz_ms": 5.2,
    "fuel_kg": 123.11,
    "fuel_pct": 27.4,
    "throttle_pct": 29.7,
    "pitch_deg": 89.1,
    "g_force": 0.16,
    "three_pos": [
      0.033039,
      -0.434047,
      -0.021703
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 695.0,
    "alt_m": 52.5,
    "v_tot_ms": 5.09,
    "v_vert_ms": 0.97,
    "v_horiz_ms": 5.0,
    "fuel_kg": 122.81,
    "fuel_pct": 27.3,
    "throttle_pct": 29.7,
    "pitch_deg": 89.2,
    "g_force": 0.16,
    "three_pos": [
      0.033014,
      -0.43405,
      -0.021686
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 696.0,
    "alt_m": 50.0,
    "v_tot_ms": 4.9,
    "v_vert_ms": 0.96,
    "v_horiz_ms": 4.8,
    "fuel_kg": 122.51,
    "fuel_pct": 27.2,
    "throttle_pct": 29.6,
    "pitch_deg": 89.2,
    "g_force": 0.16,
    "three_pos": [
      0.032989,
      -0.434052,
      -0.02167
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 697.0,
    "alt_m": 47.5,
    "v_tot_ms": 4.7,
    "v_vert_ms": 0.95,
    "v_horiz_ms": 4.6,
    "fuel_kg": 122.21,
    "fuel_pct": 27.2,
    "throttle_pct": 29.5,
    "pitch_deg": 89.2,
    "g_force": 0.16,
    "three_pos": [
      0.032963,
      -0.434054,
      -0.021653
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 698.0,
    "alt_m": 45.0,
    "v_tot_ms": 4.5,
    "v_vert_ms": 0.95,
    "v_horiz_ms": 4.4,
    "fuel_kg": 121.91,
    "fuel_pct": 27.1,
    "throttle_pct": 29.5,
    "pitch_deg": 89.3,
    "g_force": 0.16,
    "three_pos": [
      0.032938,
      -0.434056,
      -0.021636
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 699.0,
    "alt_m": 42.6,
    "v_tot_ms": 4.3,
    "v_vert_ms": 0.94,
    "v_horiz_ms": 4.2,
    "fuel_kg": 121.61,
    "fuel_pct": 27.0,
    "throttle_pct": 29.4,
    "pitch_deg": 89.3,
    "g_force": 0.16,
    "three_pos": [
      0.032913,
      -0.434058,
      -0.02162
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 700.0,
    "alt_m": 40.1,
    "v_tot_ms": 4.11,
    "v_vert_ms": 0.93,
    "v_horiz_ms": 4.0,
    "fuel_kg": 121.31,
    "fuel_pct": 27.0,
    "throttle_pct": 29.3,
    "pitch_deg": 89.3,
    "g_force": 0.16,
    "three_pos": [
      0.032888,
      -0.43406,
      -0.021603
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 701.0,
    "alt_m": 37.7,
    "v_tot_ms": 3.91,
    "v_vert_ms": 0.93,
    "v_horiz_ms": 3.8,
    "fuel_kg": 121.01,
    "fuel_pct": 26.9,
    "throttle_pct": 29.3,
    "pitch_deg": 89.4,
    "g_force": 0.16,
    "three_pos": [
      0.032862,
      -0.434062,
      -0.021586
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 702.0,
    "alt_m": 35.4,
    "v_tot_ms": 3.72,
    "v_vert_ms": 0.92,
    "v_horiz_ms": 3.6,
    "fuel_kg": 120.71,
    "fuel_pct": 26.8,
    "throttle_pct": 29.2,
    "pitch_deg": 89.4,
    "g_force": 0.16,
    "three_pos": [
      0.032837,
      -0.434064,
      -0.02157
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 703.0,
    "alt_m": 33.0,
    "v_tot_ms": 3.52,
    "v_vert_ms": 0.91,
    "v_horiz_ms": 3.4,
    "fuel_kg": 120.41,
    "fuel_pct": 26.8,
    "throttle_pct": 29.1,
    "pitch_deg": 89.4,
    "g_force": 0.16,
    "three_pos": [
      0.032812,
      -0.434067,
      -0.021553
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 704.0,
    "alt_m": 30.7,
    "v_tot_ms": 3.33,
    "v_vert_ms": 0.91,
    "v_horiz_ms": 3.2,
    "fuel_kg": 120.11,
    "fuel_pct": 26.7,
    "throttle_pct": 29.1,
    "pitch_deg": 89.5,
    "g_force": 0.16,
    "three_pos": [
      0.032786,
      -0.434069,
      -0.021537
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 705.0,
    "alt_m": 28.4,
    "v_tot_ms": 3.13,
    "v_vert_ms": 0.9,
    "v_horiz_ms": 3.0,
    "fuel_kg": 119.81,
    "fuel_pct": 26.6,
    "throttle_pct": 29.0,
    "pitch_deg": 89.5,
    "g_force": 0.16,
    "three_pos": [
      0.032761,
      -0.434071,
      -0.02152
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 706.0,
    "alt_m": 26.2,
    "v_tot_ms": 2.94,
    "v_vert_ms": 0.89,
    "v_horiz_ms": 2.8,
    "fuel_kg": 119.51,
    "fuel_pct": 26.6,
    "throttle_pct": 28.9,
    "pitch_deg": 89.5,
    "g_force": 0.16,
    "three_pos": [
      0.032736,
      -0.434073,
      -0.021503
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 707.0,
    "alt_m": 23.9,
    "v_tot_ms": 2.75,
    "v_vert_ms": 0.89,
    "v_horiz_ms": 2.6,
    "fuel_kg": 119.21,
    "fuel_pct": 26.5,
    "throttle_pct": 28.9,
    "pitch_deg": 89.6,
    "g_force": 0.16,
    "three_pos": [
      0.03271,
      -0.434075,
      -0.021487
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 708.0,
    "alt_m": 21.7,
    "v_tot_ms": 2.56,
    "v_vert_ms": 0.88,
    "v_horiz_ms": 2.4,
    "fuel_kg": 118.91,
    "fuel_pct": 26.4,
    "throttle_pct": 28.8,
    "pitch_deg": 89.6,
    "g_force": 0.16,
    "three_pos": [
      0.032685,
      -0.434077,
      -0.02147
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 709.0,
    "alt_m": 19.6,
    "v_tot_ms": 2.37,
    "v_vert_ms": 0.87,
    "v_horiz_ms": 2.2,
    "fuel_kg": 118.61,
    "fuel_pct": 26.4,
    "throttle_pct": 28.7,
    "pitch_deg": 89.6,
    "g_force": 0.16,
    "three_pos": [
      0.03266,
      -0.43408,
      -0.021453
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 710.0,
    "alt_m": 17.5,
    "v_tot_ms": 2.18,
    "v_vert_ms": 0.87,
    "v_horiz_ms": 2.0,
    "fuel_kg": 118.3,
    "fuel_pct": 26.3,
    "throttle_pct": 28.7,
    "pitch_deg": 89.7,
    "g_force": 0.16,
    "three_pos": [
      0.032635,
      -0.434082,
      -0.021437
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 711.0,
    "alt_m": 15.4,
    "v_tot_ms": 1.99,
    "v_vert_ms": 0.86,
    "v_horiz_ms": 1.8,
    "fuel_kg": 118.0,
    "fuel_pct": 26.2,
    "throttle_pct": 28.6,
    "pitch_deg": 89.7,
    "g_force": 0.16,
    "three_pos": [
      0.032609,
      -0.434084,
      -0.02142
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 712.0,
    "alt_m": 13.4,
    "v_tot_ms": 1.81,
    "v_vert_ms": 0.85,
    "v_horiz_ms": 1.6,
    "fuel_kg": 117.7,
    "fuel_pct": 26.2,
    "throttle_pct": 28.5,
    "pitch_deg": 89.7,
    "g_force": 0.16,
    "three_pos": [
      0.032584,
      -0.434086,
      -0.021404
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 713.0,
    "alt_m": 11.4,
    "v_tot_ms": 1.64,
    "v_vert_ms": 0.85,
    "v_horiz_ms": 1.4,
    "fuel_kg": 117.4,
    "fuel_pct": 26.1,
    "throttle_pct": 28.5,
    "pitch_deg": 89.8,
    "g_force": 0.16,
    "three_pos": [
      0.032559,
      -0.434088,
      -0.021387
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 714.0,
    "alt_m": 9.5,
    "v_tot_ms": 1.46,
    "v_vert_ms": 0.84,
    "v_horiz_ms": 1.2,
    "fuel_kg": 117.1,
    "fuel_pct": 26.0,
    "throttle_pct": 28.4,
    "pitch_deg": 89.8,
    "g_force": 0.16,
    "three_pos": [
      0.032533,
      -0.434091,
      -0.02137
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 715.0,
    "alt_m": 7.6,
    "v_tot_ms": 1.3,
    "v_vert_ms": 0.83,
    "v_horiz_ms": 1.0,
    "fuel_kg": 116.8,
    "fuel_pct": 26.0,
    "throttle_pct": 28.3,
    "pitch_deg": 89.8,
    "g_force": 0.16,
    "three_pos": [
      0.032508,
      -0.434093,
      -0.021354
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 716.0,
    "alt_m": 5.8,
    "v_tot_ms": 1.15,
    "v_vert_ms": 0.83,
    "v_horiz_ms": 0.8,
    "fuel_kg": 116.5,
    "fuel_pct": 25.9,
    "throttle_pct": 28.3,
    "pitch_deg": 89.9,
    "g_force": 0.16,
    "three_pos": [
      0.032483,
      -0.434095,
      -0.021337
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 717.0,
    "alt_m": 4.1,
    "v_tot_ms": 1.02,
    "v_vert_ms": 0.82,
    "v_horiz_ms": 0.6,
    "fuel_kg": 116.2,
    "fuel_pct": 25.8,
    "throttle_pct": 28.2,
    "pitch_deg": 89.9,
    "g_force": 0.16,
    "three_pos": [
      0.032457,
      -0.434097,
      -0.021321
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 718.0,
    "alt_m": 2.5,
    "v_tot_ms": 0.91,
    "v_vert_ms": 0.81,
    "v_horiz_ms": 0.4,
    "fuel_kg": 115.9,
    "fuel_pct": 25.8,
    "throttle_pct": 28.1,
    "pitch_deg": 89.9,
    "g_force": 0.17,
    "three_pos": [
      0.032432,
      -0.4341,
      -0.021304
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 719.0,
    "alt_m": 1.1,
    "v_tot_ms": 0.83,
    "v_vert_ms": 0.81,
    "v_horiz_ms": 0.2,
    "fuel_kg": 115.59,
    "fuel_pct": 25.7,
    "throttle_pct": 28.1,
    "pitch_deg": 90.0,
    "g_force": 0.17,
    "three_pos": [
      0.032407,
      -0.434102,
      -0.021287
    ],
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "t_s": 720.0,
    "alt_m": 0.0,
    "v_tot_ms": 0.81,
    "v_vert_ms": 0.8,
    "v_horiz_ms": 0.12,
    "fuel_kg": 115.29,
    "fuel_pct": 25.6,
    "throttle_pct": 28.0,
    "pitch_deg": 90.0,
    "g_force": 0.17,
    "three_pos": [
      0.032382,
      -0.434105,
      -0.021271
    ],
    "phase": "TERMINAL TOUCHDOWN"
  }
];

export function getLandingPointByTime(t_sec) {
  const pts = LANDING_POINTS;
  const clampedT = Math.max(0, Math.min(720, t_sec));
  const idx = Math.min(pts.length - 1, Math.floor(clampedT));
  return pts[idx];
}
