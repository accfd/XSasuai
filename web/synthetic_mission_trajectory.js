// =============================================================================
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

export const MISSION_SUMMARY = {
  "mission_name": "Artemis III - SpaceX Starship HLS Lunar Landing",
  "launch_site": "Kennedy Space Center, Florida (28.57\u00b0N, 80.64\u00b0W)",
  "landing_site": "Mons Mouton Crest, Lunar South Pole (-84.9\u00b0S, 33.3\u00b0W)",
  "total_points": 730,
  "start_day": 0.0,
  "touchdown_day": 4.62193,
  "touchdown_met": "T+04d:14h:55m",
  "phases": {
    "launch_ascent": {
      "day_start": 0.0,
      "day_end": 0.00625,
      "desc": "Earth Lift-Off & Gravity Turn"
    },
    "leo_parking_orbit": {
      "day_start": 0.00625,
      "day_end": 0.07292,
      "desc": "1.3 Orbits around Earth (185 km)"
    },
    "translunar_injection": {
      "day_start": 0.07292,
      "day_end": 0.08792,
      "desc": "TLI Burn (10.95 km/s)"
    },
    "translunar_coast": {
      "day_start": 0.08792,
      "day_end": 4.45,
      "desc": "Translunar Transit 384,400 km"
    },
    "lunar_polar_orbit_rev1": {
      "day_start": 4.45,
      "day_end": 4.5318,
      "desc": "Revolution 1 around Moon (100 km Circular Polar)"
    },
    "lunar_polar_orbit_rev2": {
      "day_start": 4.5318,
      "day_end": 4.6136,
      "desc": "Revolution 2 around Moon (15 km Perilune Descent Orbit)"
    },
    "powered_descent_pdi": {
      "day_start": 4.6136,
      "day_end": 4.62193,
      "desc": "12-Min Powered Descent to Mons Mouton"
    },
    "touchdown": {
      "day": 4.62193,
      "desc": "Touchdown Safe on Mons Mouton (-84.9\u00b0S, 33.3\u00b0W)"
    }
  }
};

export const MISSION_TRAJECTORY_POINTS = [
  {
    "day": 0.0,
    "t_sec": 0.0,
    "pos": [
      -1.380183,
      0.761704,
      0.227498
    ],
    "alt_km": 0.0,
    "vel_kms": 0.408,
    "phase": "EARTH LAUNCH & ASCENT"
  },
  {
    "day": 0.000179,
    "t_sec": 15.4,
    "pos": [
      -1.376954,
      0.757768,
      0.258827
    ],
    "alt_km": 0.44,
    "vel_kms": 0.45,
    "phase": "EARTH LAUNCH & ASCENT"
  },
  {
    "day": 0.000357,
    "t_sec": 30.9,
    "pos": [
      -1.373187,
      0.753927,
      0.290163
    ],
    "alt_km": 1.74,
    "vel_kms": 0.526,
    "phase": "EARTH LAUNCH & ASCENT"
  },
  {
    "day": 0.000536,
    "t_sec": 46.3,
    "pos": [
      -1.368867,
      0.750172,
      0.321497
    ],
    "alt_km": 3.84,
    "vel_kms": 0.623,
    "phase": "EARTH LAUNCH & ASCENT"
  },
  {
    "day": 0.000714,
    "t_sec": 61.7,
    "pos": [
      -1.363983,
      0.746496,
      0.352822
    ],
    "alt_km": 6.7,
    "vel_kms": 0.735,
    "phase": "EARTH LAUNCH & ASCENT"
  },
  {
    "day": 0.000893,
    "t_sec": 77.1,
    "pos": [
      -1.35852,
      0.742892,
      0.38413
    ],
    "alt_km": 10.25,
    "vel_kms": 0.861,
    "phase": "EARTH LAUNCH & ASCENT"
  },
  {
    "day": 0.001071,
    "t_sec": 92.6,
    "pos": [
      -1.352466,
      0.739352,
      0.415409
    ],
    "alt_km": 14.45,
    "vel_kms": 0.998,
    "phase": "EARTH LAUNCH & ASCENT"
  },
  {
    "day": 0.00125,
    "t_sec": 108.0,
    "pos": [
      -1.345808,
      0.73587,
      0.446647
    ],
    "alt_km": 19.24,
    "vel_kms": 1.145,
    "phase": "EARTH LAUNCH & ASCENT"
  },
  {
    "day": 0.001429,
    "t_sec": 123.4,
    "pos": [
      -1.338534,
      0.732438,
      0.477834
    ],
    "alt_km": 24.58,
    "vel_kms": 1.301,
    "phase": "EARTH LAUNCH & ASCENT"
  },
  {
    "day": 0.001607,
    "t_sec": 138.9,
    "pos": [
      -1.330631,
      0.729049,
      0.508955
    ],
    "alt_km": 30.41,
    "vel_kms": 1.467,
    "phase": "LEO ORBIT INSERTION BURN"
  },
  {
    "day": 0.001786,
    "t_sec": 154.3,
    "pos": [
      -1.322087,
      0.725697,
      0.539995
    ],
    "alt_km": 36.68,
    "vel_kms": 1.64,
    "phase": "LEO ORBIT INSERTION BURN"
  },
  {
    "day": 0.001964,
    "t_sec": 169.7,
    "pos": [
      -1.312891,
      0.722374,
      0.570939
    ],
    "alt_km": 43.33,
    "vel_kms": 1.821,
    "phase": "LEO ORBIT INSERTION BURN"
  },
  {
    "day": 0.002143,
    "t_sec": 185.1,
    "pos": [
      -1.303033,
      0.719075,
      0.60177
    ],
    "alt_km": 50.33,
    "vel_kms": 2.009,
    "phase": "LEO ORBIT INSERTION BURN"
  },
  {
    "day": 0.002321,
    "t_sec": 200.6,
    "pos": [
      -1.292501,
      0.715793,
      0.63247
    ],
    "alt_km": 57.61,
    "vel_kms": 2.203,
    "phase": "LEO ORBIT INSERTION BURN"
  },
  {
    "day": 0.0025,
    "t_sec": 216.0,
    "pos": [
      -1.281286,
      0.712522,
      0.663021
    ],
    "alt_km": 65.12,
    "vel_kms": 2.405,
    "phase": "LEO ORBIT INSERTION BURN"
  },
  {
    "day": 0.002679,
    "t_sec": 231.4,
    "pos": [
      -1.269378,
      0.709255,
      0.693402
    ],
    "alt_km": 72.81,
    "vel_kms": 2.612,
    "phase": "LEO ORBIT INSERTION BURN"
  },
  {
    "day": 0.002857,
    "t_sec": 246.9,
    "pos": [
      -1.25677,
      0.705987,
      0.723593
    ],
    "alt_km": 80.64,
    "vel_kms": 2.825,
    "phase": "LEO ORBIT INSERTION BURN"
  },
  {
    "day": 0.003036,
    "t_sec": 262.3,
    "pos": [
      -1.243454,
      0.702712,
      0.753571
    ],
    "alt_km": 88.54,
    "vel_kms": 3.044,
    "phase": "LEO ORBIT INSERTION BURN"
  },
  {
    "day": 0.003214,
    "t_sec": 277.7,
    "pos": [
      -1.229423,
      0.699423,
      0.783315
    ],
    "alt_km": 96.46,
    "vel_kms": 3.269,
    "phase": "LEO ORBIT INSERTION BURN"
  },
  {
    "day": 0.003393,
    "t_sec": 293.1,
    "pos": [
      -1.214671,
      0.696116,
      0.8128
    ],
    "alt_km": 104.36,
    "vel_kms": 3.499,
    "phase": "LEO ORBIT INSERTION BURN"
  },
  {
    "day": 0.003571,
    "t_sec": 308.6,
    "pos": [
      -1.199193,
      0.692784,
      0.842003
    ],
    "alt_km": 112.19,
    "vel_kms": 3.733,
    "phase": "LEO ORBIT INSERTION BURN"
  },
  {
    "day": 0.00375,
    "t_sec": 324.0,
    "pos": [
      -1.182985,
      0.689424,
      0.870897
    ],
    "alt_km": 119.88,
    "vel_kms": 3.973,
    "phase": "LEO ORBIT INSERTION BURN"
  },
  {
    "day": 0.003929,
    "t_sec": 339.4,
    "pos": [
      -1.166044,
      0.686028,
      0.899458
    ],
    "alt_km": 127.39,
    "vel_kms": 4.218,
    "phase": "LEO ORBIT INSERTION BURN"
  },
  {
    "day": 0.004107,
    "t_sec": 354.9,
    "pos": [
      -1.14837,
      0.682593,
      0.927658
    ],
    "alt_km": 134.67,
    "vel_kms": 4.468,
    "phase": "LEO ORBIT INSERTION BURN"
  },
  {
    "day": 0.004286,
    "t_sec": 370.3,
    "pos": [
      -1.12996,
      0.679113,
      0.95547
    ],
    "alt_km": 141.67,
    "vel_kms": 4.722,
    "phase": "LEO ORBIT INSERTION BURN"
  },
  {
    "day": 0.004464,
    "t_sec": 385.7,
    "pos": [
      -1.110815,
      0.675584,
      0.982865
    ],
    "alt_km": 148.32,
    "vel_kms": 4.98,
    "phase": "LEO ORBIT INSERTION BURN"
  },
  {
    "day": 0.004643,
    "t_sec": 401.1,
    "pos": [
      -1.090939,
      0.672001,
      1.009816
    ],
    "alt_km": 154.59,
    "vel_kms": 5.243,
    "phase": "LEO ORBIT INSERTION BURN"
  },
  {
    "day": 0.004821,
    "t_sec": 416.6,
    "pos": [
      -1.070332,
      0.668359,
      1.036293
    ],
    "alt_km": 160.42,
    "vel_kms": 5.51,
    "phase": "LEO ORBIT INSERTION BURN"
  },
  {
    "day": 0.005,
    "t_sec": 432.0,
    "pos": [
      -1.049001,
      0.664654,
      1.062266
    ],
    "alt_km": 165.76,
    "vel_kms": 5.781,
    "phase": "LEO ORBIT INSERTION BURN"
  },
  {
    "day": 0.005179,
    "t_sec": 447.4,
    "pos": [
      -1.02695,
      0.660881,
      1.087706
    ],
    "alt_km": 170.55,
    "vel_kms": 6.057,
    "phase": "LEO ORBIT INSERTION BURN"
  },
  {
    "day": 0.005357,
    "t_sec": 462.9,
    "pos": [
      -1.004187,
      0.657038,
      1.112582
    ],
    "alt_km": 174.75,
    "vel_kms": 6.336,
    "phase": "LEO ORBIT INSERTION BURN"
  },
  {
    "day": 0.005536,
    "t_sec": 478.3,
    "pos": [
      -0.980721,
      0.653119,
      1.136863
    ],
    "alt_km": 178.3,
    "vel_kms": 6.619,
    "phase": "LEO ORBIT INSERTION BURN"
  },
  {
    "day": 0.005714,
    "t_sec": 493.7,
    "pos": [
      -0.956561,
      0.649121,
      1.160519
    ],
    "alt_km": 181.16,
    "vel_kms": 6.906,
    "phase": "LEO ORBIT INSERTION BURN"
  },
  {
    "day": 0.005893,
    "t_sec": 509.1,
    "pos": [
      -0.931719,
      0.645039,
      1.183518
    ],
    "alt_km": 183.26,
    "vel_kms": 7.197,
    "phase": "LEO ORBIT INSERTION BURN"
  },
  {
    "day": 0.006071,
    "t_sec": 524.6,
    "pos": [
      -0.906209,
      0.640872,
      1.20583
    ],
    "alt_km": 184.56,
    "vel_kms": 7.492,
    "phase": "LEO ORBIT INSERTION BURN"
  },
  {
    "day": 0.00625,
    "t_sec": 540.0,
    "pos": [
      -0.880045,
      0.636615,
      1.227422
    ],
    "alt_km": 185.0,
    "vel_kms": 7.79,
    "phase": "LEO ORBIT INSERTION BURN"
  },
  {
    "day": 0.007959,
    "t_sec": 687.7,
    "pos": [
      -0.623979,
      0.772754,
      1.303772
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.009669,
    "t_sec": 835.4,
    "pos": [
      -0.391142,
      0.739626,
      1.409356
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.011378,
    "t_sec": 983.1,
    "pos": [
      -0.141344,
      0.684728,
      1.482394
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.013088,
    "t_sec": 1130.8,
    "pos": [
      0.122517,
      0.608752,
      1.516816
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.014797,
    "t_sec": 1278.5,
    "pos": [
      0.394545,
      0.513031,
      1.505807
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.016506,
    "t_sec": 1426.2,
    "pos": [
      0.665379,
      0.399774,
      1.443528
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.018216,
    "t_sec": 1573.8,
    "pos": [
      0.922671,
      0.272199,
      1.326992
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.019925,
    "t_sec": 1721.5,
    "pos": [
      1.152531,
      0.134515,
      1.15754
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.021635,
    "t_sec": 1869.2,
    "pos": [
      1.341592,
      -0.008276,
      0.941479
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.023344,
    "t_sec": 2016.9,
    "pos": [
      1.479199,
      -0.150752,
      0.689613
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.025053,
    "t_sec": 2164.6,
    "pos": [
      1.559107,
      -0.287512,
      0.415744
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.026763,
    "t_sec": 2312.3,
    "pos": [
      1.58023,
      -0.413634,
      0.134538
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.028472,
    "t_sec": 2460.0,
    "pos": [
      1.546252,
      -0.525014,
      -0.140669
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.030182,
    "t_sec": 2607.7,
    "pos": [
      1.464266,
      -0.618552,
      -0.399551
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.031891,
    "t_sec": 2755.4,
    "pos": [
      1.342878,
      -0.692151,
      -0.635552
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.0336,
    "t_sec": 2903.1,
    "pos": [
      1.190308,
      -0.744564,
      -0.845643
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.03531,
    "t_sec": 3050.8,
    "pos": [
      1.01298,
      -0.775159,
      -1.029234
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.037019,
    "t_sec": 3198.5,
    "pos": [
      0.81492,
      -0.783675,
      -1.186625
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.038729,
    "t_sec": 3346.2,
    "pos": [
      0.59804,
      -0.770057,
      -1.317453
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.040438,
    "t_sec": 3493.8,
    "pos": [
      0.36317,
      -0.734397,
      -1.419538
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.042147,
    "t_sec": 3641.5,
    "pos": [
      0.111555,
      -0.677024,
      -1.488461
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.043857,
    "t_sec": 3789.2,
    "pos": [
      -0.153613,
      -0.598689,
      -1.517991
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.045566,
    "t_sec": 3936.9,
    "pos": [
      -0.426046,
      -0.500815,
      -1.501329
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.047276,
    "t_sec": 4084.6,
    "pos": [
      -0.695993,
      -0.385723,
      -1.432876
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.048985,
    "t_sec": 4232.3,
    "pos": [
      -0.950841,
      -0.25675,
      -1.310077
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.050694,
    "t_sec": 4380.0,
    "pos": [
      -1.176646,
      -0.118211,
      -1.134835
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.052404,
    "t_sec": 4527.7,
    "pos": [
      -1.360246,
      0.024825,
      -0.914022
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.054113,
    "t_sec": 4675.4,
    "pos": [
      -1.491423,
      0.166912,
      -0.658878
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.055823,
    "t_sec": 4823.1,
    "pos": [
      -1.56451,
      0.302684,
      -0.383421
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.057532,
    "t_sec": 4970.8,
    "pos": [
      -1.579012,
      0.427297,
      -0.102272
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.059241,
    "t_sec": 5118.5,
    "pos": [
      -1.539089,
      0.536757,
      0.171511
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.060951,
    "t_sec": 5266.2,
    "pos": [
      -1.452113,
      0.628085,
      0.428016
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.06266,
    "t_sec": 5413.8,
    "pos": [
      -1.326735,
      0.699291,
      0.661126
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.06437,
    "t_sec": 5561.5,
    "pos": [
      -1.171025,
      0.749212,
      0.86816
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.066079,
    "t_sec": 5709.2,
    "pos": [
      -0.991147,
      0.777269,
      1.048714
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.067788,
    "t_sec": 5856.9,
    "pos": [
      -0.790852,
      0.783233,
      1.203087
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.069498,
    "t_sec": 6004.6,
    "pos": [
      -0.571862,
      0.767065,
      1.330754
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.071207,
    "t_sec": 6152.3,
    "pos": [
      -0.334974,
      0.72888,
      1.429282
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.072917,
    "t_sec": 6300.0,
    "pos": [
      -0.081582,
      0.66904,
      1.494005
    ],
    "alt_km": 185.0,
    "vel_kms": 7.797,
    "phase": "EARTH PARKING ORBIT (LEO)"
  },
  {
    "day": 0.085423,
    "t_sec": 7380.5,
    "pos": [
      -0.206725,
      0.643224,
      1.750571
    ],
    "alt_km": 1134.7,
    "vel_kms": 9.993,
    "phase": "TRANS-LUNAR INJECTION (TLI)"
  },
  {
    "day": 0.097929,
    "t_sec": 8461.0,
    "pos": [
      -0.331868,
      0.617408,
      2.007137
    ],
    "alt_km": 2133.05,
    "vel_kms": 9.687,
    "phase": "TRANS-LUNAR INJECTION (TLI)"
  },
  {
    "day": 0.110435,
    "t_sec": 9541.5,
    "pos": [
      -0.457011,
      0.591592,
      2.263703
    ],
    "alt_km": 3164.78,
    "vel_kms": 9.465,
    "phase": "TRANS-LUNAR INJECTION (TLI)"
  },
  {
    "day": 0.12294,
    "t_sec": 10622.1,
    "pos": [
      -0.582153,
      0.565776,
      2.520269
    ],
    "alt_km": 4220.14,
    "vel_kms": 9.284,
    "phase": "TRANS-LUNAR INJECTION (TLI)"
  },
  {
    "day": 0.135446,
    "t_sec": 11702.6,
    "pos": [
      -0.707295,
      0.53996,
      2.776834
    ],
    "alt_km": 5292.71,
    "vel_kms": 9.129,
    "phase": "TRANS-LUNAR INJECTION (TLI)"
  },
  {
    "day": 0.147952,
    "t_sec": 12783.1,
    "pos": [
      -0.832436,
      0.514143,
      3.033399
    ],
    "alt_km": 6378.15,
    "vel_kms": 8.991,
    "phase": "TRANS-LUNAR INJECTION (TLI)"
  },
  {
    "day": 0.160458,
    "t_sec": 13863.6,
    "pos": [
      -0.957577,
      0.488326,
      3.289964
    ],
    "alt_km": 7473.44,
    "vel_kms": 8.866,
    "phase": "TRANS-LUNAR INJECTION (TLI)"
  },
  {
    "day": 0.172964,
    "t_sec": 14944.1,
    "pos": [
      -1.082716,
      0.462509,
      3.546528
    ],
    "alt_km": 8576.4,
    "vel_kms": 8.752,
    "phase": "TRANS-LUNAR INJECTION (TLI)"
  },
  {
    "day": 0.18547,
    "t_sec": 16024.6,
    "pos": [
      -1.207855,
      0.436691,
      3.803091
    ],
    "alt_km": 9685.46,
    "vel_kms": 8.646,
    "phase": "TRANS-LUNAR INJECTION (TLI)"
  },
  {
    "day": 0.197976,
    "t_sec": 17105.1,
    "pos": [
      -1.332992,
      0.410873,
      4.059653
    ],
    "alt_km": 10799.42,
    "vel_kms": 8.547,
    "phase": "TRANS-LUNAR INJECTION (TLI)"
  },
  {
    "day": 0.210482,
    "t_sec": 18185.7,
    "pos": [
      -1.458128,
      0.385054,
      4.316214
    ],
    "alt_km": 11917.41,
    "vel_kms": 8.453,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.222988,
    "t_sec": 19266.2,
    "pos": [
      -1.583262,
      0.359234,
      4.572775
    ],
    "alt_km": 13038.7,
    "vel_kms": 8.365,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.235494,
    "t_sec": 20346.7,
    "pos": [
      -1.708395,
      0.333414,
      4.829334
    ],
    "alt_km": 14162.78,
    "vel_kms": 8.281,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.248,
    "t_sec": 21427.2,
    "pos": [
      -1.833527,
      0.307593,
      5.085893
    ],
    "alt_km": 15289.19,
    "vel_kms": 8.2,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.260506,
    "t_sec": 22507.7,
    "pos": [
      -1.958656,
      0.281771,
      5.34245
    ],
    "alt_km": 16417.59,
    "vel_kms": 8.123,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.273012,
    "t_sec": 23588.2,
    "pos": [
      -2.083784,
      0.255949,
      5.599006
    ],
    "alt_km": 17547.71,
    "vel_kms": 8.049,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.285518,
    "t_sec": 24668.7,
    "pos": [
      -2.208909,
      0.230125,
      5.85556
    ],
    "alt_km": 18679.29,
    "vel_kms": 7.978,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.298024,
    "t_sec": 25749.3,
    "pos": [
      -2.334032,
      0.2043,
      6.112113
    ],
    "alt_km": 19812.16,
    "vel_kms": 7.91,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.31053,
    "t_sec": 26829.8,
    "pos": [
      -2.459153,
      0.178475,
      6.368665
    ],
    "alt_km": 20946.15,
    "vel_kms": 7.843,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.323036,
    "t_sec": 27910.3,
    "pos": [
      -2.584272,
      0.152648,
      6.625214
    ],
    "alt_km": 22081.13,
    "vel_kms": 7.779,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.335542,
    "t_sec": 28990.8,
    "pos": [
      -2.709388,
      0.12682,
      6.881762
    ],
    "alt_km": 23216.98,
    "vel_kms": 7.716,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.348048,
    "t_sec": 30071.3,
    "pos": [
      -2.834501,
      0.100991,
      7.138309
    ],
    "alt_km": 24353.59,
    "vel_kms": 7.655,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.360554,
    "t_sec": 31151.8,
    "pos": [
      -2.959611,
      0.075161,
      7.394853
    ],
    "alt_km": 25490.9,
    "vel_kms": 7.596,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.37306,
    "t_sec": 32232.3,
    "pos": [
      -3.084719,
      0.049329,
      7.651395
    ],
    "alt_km": 26628.82,
    "vel_kms": 7.539,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.385565,
    "t_sec": 33312.9,
    "pos": [
      -3.209823,
      0.023496,
      7.907936
    ],
    "alt_km": 27767.3,
    "vel_kms": 7.483,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.398071,
    "t_sec": 34393.4,
    "pos": [
      -3.334924,
      -0.002339,
      8.164474
    ],
    "alt_km": 28906.27,
    "vel_kms": 7.428,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.410577,
    "t_sec": 35473.9,
    "pos": [
      -3.460021,
      -0.028174,
      8.42101
    ],
    "alt_km": 30045.69,
    "vel_kms": 7.374,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.423083,
    "t_sec": 36554.4,
    "pos": [
      -3.585116,
      -0.054012,
      8.677543
    ],
    "alt_km": 31185.51,
    "vel_kms": 7.322,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.435589,
    "t_sec": 37634.9,
    "pos": [
      -3.710206,
      -0.079851,
      8.934075
    ],
    "alt_km": 32325.71,
    "vel_kms": 7.271,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.448095,
    "t_sec": 38715.4,
    "pos": [
      -3.835293,
      -0.105692,
      9.190603
    ],
    "alt_km": 33466.24,
    "vel_kms": 7.22,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.460601,
    "t_sec": 39795.9,
    "pos": [
      -3.960376,
      -0.131534,
      9.447129
    ],
    "alt_km": 34607.07,
    "vel_kms": 7.171,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.473107,
    "t_sec": 40876.5,
    "pos": [
      -4.085455,
      -0.157379,
      9.703653
    ],
    "alt_km": 35748.18,
    "vel_kms": 7.123,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.485613,
    "t_sec": 41957.0,
    "pos": [
      -4.21053,
      -0.183225,
      9.960174
    ],
    "alt_km": 36889.55,
    "vel_kms": 7.075,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.498119,
    "t_sec": 43037.5,
    "pos": [
      -4.335601,
      -0.209073,
      10.216692
    ],
    "alt_km": 38031.15,
    "vel_kms": 7.029,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.510625,
    "t_sec": 44118.0,
    "pos": [
      -4.460667,
      -0.234923,
      10.473207
    ],
    "alt_km": 39172.96,
    "vel_kms": 6.983,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.523131,
    "t_sec": 45198.5,
    "pos": [
      -4.585729,
      -0.260775,
      10.729719
    ],
    "alt_km": 40314.98,
    "vel_kms": 6.938,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.535637,
    "t_sec": 46279.0,
    "pos": [
      -4.710786,
      -0.286628,
      10.986228
    ],
    "alt_km": 41457.17,
    "vel_kms": 6.894,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.548143,
    "t_sec": 47359.5,
    "pos": [
      -4.835838,
      -0.312485,
      11.242733
    ],
    "alt_km": 42599.53,
    "vel_kms": 6.85,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.560649,
    "t_sec": 48440.1,
    "pos": [
      -4.960886,
      -0.338343,
      11.499236
    ],
    "alt_km": 43742.04,
    "vel_kms": 6.808,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.573155,
    "t_sec": 49520.6,
    "pos": [
      -5.085929,
      -0.364203,
      11.755735
    ],
    "alt_km": 44884.69,
    "vel_kms": 6.765,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.585661,
    "t_sec": 50601.1,
    "pos": [
      -5.210966,
      -0.390066,
      12.012231
    ],
    "alt_km": 46027.48,
    "vel_kms": 6.724,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.598167,
    "t_sec": 51681.6,
    "pos": [
      -5.335999,
      -0.415931,
      12.268723
    ],
    "alt_km": 47170.38,
    "vel_kms": 6.683,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.610673,
    "t_sec": 52762.1,
    "pos": [
      -5.461026,
      -0.441798,
      12.525212
    ],
    "alt_km": 48313.39,
    "vel_kms": 6.643,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.623179,
    "t_sec": 53842.6,
    "pos": [
      -5.586047,
      -0.467668,
      12.781697
    ],
    "alt_km": 49456.51,
    "vel_kms": 6.603,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.635685,
    "t_sec": 54923.1,
    "pos": [
      -5.711063,
      -0.49354,
      13.038179
    ],
    "alt_km": 50599.72,
    "vel_kms": 6.564,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.64819,
    "t_sec": 56003.7,
    "pos": [
      -5.836073,
      -0.519415,
      13.294656
    ],
    "alt_km": 51743.02,
    "vel_kms": 6.525,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.660696,
    "t_sec": 57084.2,
    "pos": [
      -5.961078,
      -0.545292,
      13.55113
    ],
    "alt_km": 52886.39,
    "vel_kms": 6.487,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.673202,
    "t_sec": 58164.7,
    "pos": [
      -6.086076,
      -0.571173,
      13.8076
    ],
    "alt_km": 54029.85,
    "vel_kms": 6.449,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.685708,
    "t_sec": 59245.2,
    "pos": [
      -6.211069,
      -0.597055,
      14.064066
    ],
    "alt_km": 55173.36,
    "vel_kms": 6.412,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.698214,
    "t_sec": 60325.7,
    "pos": [
      -6.336055,
      -0.622941,
      14.320527
    ],
    "alt_km": 56316.95,
    "vel_kms": 6.375,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.71072,
    "t_sec": 61406.2,
    "pos": [
      -6.461035,
      -0.648829,
      14.576985
    ],
    "alt_km": 57460.58,
    "vel_kms": 6.338,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.723226,
    "t_sec": 62486.7,
    "pos": [
      -6.586009,
      -0.67472,
      14.833438
    ],
    "alt_km": 58604.27,
    "vel_kms": 6.302,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.735732,
    "t_sec": 63567.3,
    "pos": [
      -6.710976,
      -0.700614,
      15.089887
    ],
    "alt_km": 59748.01,
    "vel_kms": 6.267,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.748238,
    "t_sec": 64647.8,
    "pos": [
      -6.835936,
      -0.726511,
      15.346331
    ],
    "alt_km": 60891.8,
    "vel_kms": 6.232,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.760744,
    "t_sec": 65728.3,
    "pos": [
      -6.96089,
      -0.752411,
      15.602771
    ],
    "alt_km": 62035.62,
    "vel_kms": 6.197,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.77325,
    "t_sec": 66808.8,
    "pos": [
      -7.085837,
      -0.778314,
      15.859207
    ],
    "alt_km": 63179.48,
    "vel_kms": 6.163,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.785756,
    "t_sec": 67889.3,
    "pos": [
      -7.210776,
      -0.80422,
      16.115637
    ],
    "alt_km": 64323.37,
    "vel_kms": 6.129,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.798262,
    "t_sec": 68969.8,
    "pos": [
      -7.335709,
      -0.83013,
      16.372063
    ],
    "alt_km": 65467.28,
    "vel_kms": 6.095,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.810768,
    "t_sec": 70050.3,
    "pos": [
      -7.460635,
      -0.856042,
      16.628484
    ],
    "alt_km": 66611.23,
    "vel_kms": 6.062,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.823274,
    "t_sec": 71130.9,
    "pos": [
      -7.585553,
      -0.881958,
      16.884901
    ],
    "alt_km": 67755.2,
    "vel_kms": 6.029,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.83578,
    "t_sec": 72211.4,
    "pos": [
      -7.710463,
      -0.907877,
      17.141312
    ],
    "alt_km": 68899.19,
    "vel_kms": 5.996,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.848286,
    "t_sec": 73291.9,
    "pos": [
      -7.835367,
      -0.933799,
      17.397718
    ],
    "alt_km": 70043.19,
    "vel_kms": 5.964,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.860792,
    "t_sec": 74372.4,
    "pos": [
      -7.960262,
      -0.959725,
      17.654119
    ],
    "alt_km": 71187.21,
    "vel_kms": 5.932,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.873298,
    "t_sec": 75452.9,
    "pos": [
      -8.08515,
      -0.985654,
      17.910515
    ],
    "alt_km": 72331.25,
    "vel_kms": 5.9,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.885804,
    "t_sec": 76533.4,
    "pos": [
      -8.21003,
      -1.011587,
      18.166906
    ],
    "alt_km": 73475.29,
    "vel_kms": 5.868,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.89831,
    "t_sec": 77613.9,
    "pos": [
      -8.334902,
      -1.037523,
      18.423291
    ],
    "alt_km": 74619.34,
    "vel_kms": 5.837,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.910815,
    "t_sec": 78694.5,
    "pos": [
      -8.459765,
      -1.063463,
      18.679671
    ],
    "alt_km": 75763.4,
    "vel_kms": 5.807,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.923321,
    "t_sec": 79775.0,
    "pos": [
      -8.584621,
      -1.089407,
      18.936046
    ],
    "alt_km": 76907.46,
    "vel_kms": 5.776,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.935827,
    "t_sec": 80855.5,
    "pos": [
      -8.709468,
      -1.115354,
      19.192415
    ],
    "alt_km": 78051.52,
    "vel_kms": 5.746,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.948333,
    "t_sec": 81936.0,
    "pos": [
      -8.834307,
      -1.141305,
      19.448778
    ],
    "alt_km": 79195.59,
    "vel_kms": 5.716,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.960839,
    "t_sec": 83016.5,
    "pos": [
      -8.959137,
      -1.16726,
      19.705136
    ],
    "alt_km": 80339.65,
    "vel_kms": 5.686,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.973345,
    "t_sec": 84097.0,
    "pos": [
      -9.083959,
      -1.193219,
      19.961488
    ],
    "alt_km": 81483.71,
    "vel_kms": 5.656,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.985851,
    "t_sec": 85177.5,
    "pos": [
      -9.208772,
      -1.219181,
      20.217834
    ],
    "alt_km": 82627.76,
    "vel_kms": 5.627,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 0.998357,
    "t_sec": 86258.1,
    "pos": [
      -9.333576,
      -1.245148,
      20.474174
    ],
    "alt_km": 83771.81,
    "vel_kms": 5.598,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.010863,
    "t_sec": 87338.6,
    "pos": [
      -9.458371,
      -1.271118,
      20.730508
    ],
    "alt_km": 84915.85,
    "vel_kms": 5.569,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.023369,
    "t_sec": 88419.1,
    "pos": [
      -9.583157,
      -1.297092,
      20.986837
    ],
    "alt_km": 86059.87,
    "vel_kms": 5.541,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.035875,
    "t_sec": 89499.6,
    "pos": [
      -9.707934,
      -1.323071,
      21.243159
    ],
    "alt_km": 87203.89,
    "vel_kms": 5.512,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.048381,
    "t_sec": 90580.1,
    "pos": [
      -9.832702,
      -1.349053,
      21.499475
    ],
    "alt_km": 88347.9,
    "vel_kms": 5.484,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.060887,
    "t_sec": 91660.6,
    "pos": [
      -9.95746,
      -1.37504,
      21.755784
    ],
    "alt_km": 89491.89,
    "vel_kms": 5.456,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.073393,
    "t_sec": 92741.1,
    "pos": [
      -10.082209,
      -1.401031,
      22.012088
    ],
    "alt_km": 90635.87,
    "vel_kms": 5.428,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.085899,
    "t_sec": 93821.7,
    "pos": [
      -10.206949,
      -1.427026,
      22.268385
    ],
    "alt_km": 91779.84,
    "vel_kms": 5.401,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.098405,
    "t_sec": 94902.2,
    "pos": [
      -10.331679,
      -1.453026,
      22.524676
    ],
    "alt_km": 92923.78,
    "vel_kms": 5.374,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.110911,
    "t_sec": 95982.7,
    "pos": [
      -10.456399,
      -1.47903,
      22.78096
    ],
    "alt_km": 94067.71,
    "vel_kms": 5.346,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.123417,
    "t_sec": 97063.2,
    "pos": [
      -10.581109,
      -1.505038,
      23.037237
    ],
    "alt_km": 95211.62,
    "vel_kms": 5.32,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.135923,
    "t_sec": 98143.7,
    "pos": [
      -10.705809,
      -1.53105,
      23.293508
    ],
    "alt_km": 96355.51,
    "vel_kms": 5.293,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.148429,
    "t_sec": 99224.2,
    "pos": [
      -10.830499,
      -1.557067,
      23.549773
    ],
    "alt_km": 97499.38,
    "vel_kms": 5.266,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.160935,
    "t_sec": 100304.7,
    "pos": [
      -10.955179,
      -1.583089,
      23.80603
    ],
    "alt_km": 98643.22,
    "vel_kms": 5.24,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.17344,
    "t_sec": 101385.3,
    "pos": [
      -11.079849,
      -1.609115,
      24.062281
    ],
    "alt_km": 99787.05,
    "vel_kms": 5.214,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.185946,
    "t_sec": 102465.8,
    "pos": [
      -11.204509,
      -1.635146,
      24.318525
    ],
    "alt_km": 100930.85,
    "vel_kms": 5.188,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.198452,
    "t_sec": 103546.3,
    "pos": [
      -11.329158,
      -1.661181,
      24.574762
    ],
    "alt_km": 102074.62,
    "vel_kms": 5.162,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.210958,
    "t_sec": 104626.8,
    "pos": [
      -11.453797,
      -1.687221,
      24.830992
    ],
    "alt_km": 103218.37,
    "vel_kms": 5.136,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.223464,
    "t_sec": 105707.3,
    "pos": [
      -11.578425,
      -1.713266,
      25.087215
    ],
    "alt_km": 104362.09,
    "vel_kms": 5.111,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.23597,
    "t_sec": 106787.8,
    "pos": [
      -11.703043,
      -1.739315,
      25.343431
    ],
    "alt_km": 105505.78,
    "vel_kms": 5.086,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.248476,
    "t_sec": 107868.3,
    "pos": [
      -11.82765,
      -1.765369,
      25.599639
    ],
    "alt_km": 106649.45,
    "vel_kms": 5.06,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.260982,
    "t_sec": 108948.9,
    "pos": [
      -11.952245,
      -1.791428,
      25.855841
    ],
    "alt_km": 107793.08,
    "vel_kms": 5.036,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.273488,
    "t_sec": 110029.4,
    "pos": [
      -12.076831,
      -1.817492,
      26.112035
    ],
    "alt_km": 108936.69,
    "vel_kms": 5.011,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.285994,
    "t_sec": 111109.9,
    "pos": [
      -12.201405,
      -1.843561,
      26.368222
    ],
    "alt_km": 110080.27,
    "vel_kms": 4.986,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.2985,
    "t_sec": 112190.4,
    "pos": [
      -12.325967,
      -1.869634,
      26.624401
    ],
    "alt_km": 111223.81,
    "vel_kms": 4.961,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.311006,
    "t_sec": 113270.9,
    "pos": [
      -12.450519,
      -1.895713,
      26.880573
    ],
    "alt_km": 112367.33,
    "vel_kms": 4.937,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.323512,
    "t_sec": 114351.4,
    "pos": [
      -12.57506,
      -1.921796,
      27.136738
    ],
    "alt_km": 113510.81,
    "vel_kms": 4.913,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.336018,
    "t_sec": 115431.9,
    "pos": [
      -12.699589,
      -1.947885,
      27.392895
    ],
    "alt_km": 114654.25,
    "vel_kms": 4.889,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.348524,
    "t_sec": 116512.5,
    "pos": [
      -12.824107,
      -1.973979,
      27.649044
    ],
    "alt_km": 115797.67,
    "vel_kms": 4.865,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.36103,
    "t_sec": 117593.0,
    "pos": [
      -12.948613,
      -2.000078,
      27.905185
    ],
    "alt_km": 116941.04,
    "vel_kms": 4.841,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.373536,
    "t_sec": 118673.5,
    "pos": [
      -13.073107,
      -2.026181,
      28.161319
    ],
    "alt_km": 118084.39,
    "vel_kms": 4.817,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.386042,
    "t_sec": 119754.0,
    "pos": [
      -13.19759,
      -2.052291,
      28.417446
    ],
    "alt_km": 119227.69,
    "vel_kms": 4.794,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.398548,
    "t_sec": 120834.5,
    "pos": [
      -13.322062,
      -2.078405,
      28.673564
    ],
    "alt_km": 120370.97,
    "vel_kms": 4.771,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.411054,
    "t_sec": 121915.0,
    "pos": [
      -13.446521,
      -2.104525,
      28.929674
    ],
    "alt_km": 121514.2,
    "vel_kms": 4.747,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.42356,
    "t_sec": 122995.5,
    "pos": [
      -13.570969,
      -2.13065,
      29.185777
    ],
    "alt_km": 122657.4,
    "vel_kms": 4.724,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.436065,
    "t_sec": 124076.1,
    "pos": [
      -13.695404,
      -2.15678,
      29.441871
    ],
    "alt_km": 123800.55,
    "vel_kms": 4.701,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.448571,
    "t_sec": 125156.6,
    "pos": [
      -13.819828,
      -2.182915,
      29.697958
    ],
    "alt_km": 124943.67,
    "vel_kms": 4.678,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.461077,
    "t_sec": 126237.1,
    "pos": [
      -13.944239,
      -2.209056,
      29.954036
    ],
    "alt_km": 126086.75,
    "vel_kms": 4.656,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.473583,
    "t_sec": 127317.6,
    "pos": [
      -14.068639,
      -2.235203,
      30.210107
    ],
    "alt_km": 127229.8,
    "vel_kms": 4.633,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.486089,
    "t_sec": 128398.1,
    "pos": [
      -14.193026,
      -2.261354,
      30.466169
    ],
    "alt_km": 128372.8,
    "vel_kms": 4.61,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.498595,
    "t_sec": 129478.6,
    "pos": [
      -14.317401,
      -2.287512,
      30.722223
    ],
    "alt_km": 129515.76,
    "vel_kms": 4.588,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.511101,
    "t_sec": 130559.1,
    "pos": [
      -14.441763,
      -2.313674,
      30.978269
    ],
    "alt_km": 130658.67,
    "vel_kms": 4.566,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.523607,
    "t_sec": 131639.7,
    "pos": [
      -14.566113,
      -2.339843,
      31.234306
    ],
    "alt_km": 131801.55,
    "vel_kms": 4.544,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.536113,
    "t_sec": 132720.2,
    "pos": [
      -14.69045,
      -2.366017,
      31.490335
    ],
    "alt_km": 132944.39,
    "vel_kms": 4.522,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.548619,
    "t_sec": 133800.7,
    "pos": [
      -14.814775,
      -2.392196,
      31.746356
    ],
    "alt_km": 134087.18,
    "vel_kms": 4.5,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.561125,
    "t_sec": 134881.2,
    "pos": [
      -14.939087,
      -2.418381,
      32.002368
    ],
    "alt_km": 135229.93,
    "vel_kms": 4.478,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.573631,
    "t_sec": 135961.7,
    "pos": [
      -15.063387,
      -2.444572,
      32.258372
    ],
    "alt_km": 136372.64,
    "vel_kms": 4.456,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.586137,
    "t_sec": 137042.2,
    "pos": [
      -15.187674,
      -2.470768,
      32.514367
    ],
    "alt_km": 137515.3,
    "vel_kms": 4.435,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.598643,
    "t_sec": 138122.7,
    "pos": [
      -15.311947,
      -2.49697,
      32.770354
    ],
    "alt_km": 138657.92,
    "vel_kms": 4.413,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.611149,
    "t_sec": 139203.3,
    "pos": [
      -15.436208,
      -2.523178,
      33.026332
    ],
    "alt_km": 139800.49,
    "vel_kms": 4.392,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.623655,
    "t_sec": 140283.8,
    "pos": [
      -15.560456,
      -2.549392,
      33.282302
    ],
    "alt_km": 140943.02,
    "vel_kms": 4.37,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.636161,
    "t_sec": 141364.3,
    "pos": [
      -15.684691,
      -2.575611,
      33.538262
    ],
    "alt_km": 142085.5,
    "vel_kms": 4.349,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.648667,
    "t_sec": 142444.8,
    "pos": [
      -15.808913,
      -2.601836,
      33.794214
    ],
    "alt_km": 143227.94,
    "vel_kms": 4.328,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.661173,
    "t_sec": 143525.3,
    "pos": [
      -15.933122,
      -2.628067,
      34.050158
    ],
    "alt_km": 144370.33,
    "vel_kms": 4.307,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.673679,
    "t_sec": 144605.8,
    "pos": [
      -16.057318,
      -2.654304,
      34.306092
    ],
    "alt_km": 145512.68,
    "vel_kms": 4.286,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.686185,
    "t_sec": 145686.3,
    "pos": [
      -16.1815,
      -2.680547,
      34.562018
    ],
    "alt_km": 146654.98,
    "vel_kms": 4.266,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.69869,
    "t_sec": 146766.9,
    "pos": [
      -16.305669,
      -2.706795,
      34.817935
    ],
    "alt_km": 147797.23,
    "vel_kms": 4.245,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.711196,
    "t_sec": 147847.4,
    "pos": [
      -16.429825,
      -2.73305,
      35.073843
    ],
    "alt_km": 148939.43,
    "vel_kms": 4.224,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.723702,
    "t_sec": 148927.9,
    "pos": [
      -16.553968,
      -2.759311,
      35.329742
    ],
    "alt_km": 150081.59,
    "vel_kms": 4.204,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.736208,
    "t_sec": 150008.4,
    "pos": [
      -16.678097,
      -2.785577,
      35.585632
    ],
    "alt_km": 151223.7,
    "vel_kms": 4.183,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.748714,
    "t_sec": 151088.9,
    "pos": [
      -16.802212,
      -2.81185,
      35.841513
    ],
    "alt_km": 152365.76,
    "vel_kms": 4.163,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.76122,
    "t_sec": 152169.4,
    "pos": [
      -16.926314,
      -2.838128,
      36.097386
    ],
    "alt_km": 153507.77,
    "vel_kms": 4.143,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.773726,
    "t_sec": 153249.9,
    "pos": [
      -17.050402,
      -2.864413,
      36.353249
    ],
    "alt_km": 154649.73,
    "vel_kms": 4.123,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.786232,
    "t_sec": 154330.5,
    "pos": [
      -17.174477,
      -2.890703,
      36.609103
    ],
    "alt_km": 155791.65,
    "vel_kms": 4.103,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.798738,
    "t_sec": 155411.0,
    "pos": [
      -17.298538,
      -2.917,
      36.864947
    ],
    "alt_km": 156933.51,
    "vel_kms": 4.083,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.811244,
    "t_sec": 156491.5,
    "pos": [
      -17.422586,
      -2.943303,
      37.120783
    ],
    "alt_km": 158075.32,
    "vel_kms": 4.063,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.82375,
    "t_sec": 157572.0,
    "pos": [
      -17.546619,
      -2.969611,
      37.37661
    ],
    "alt_km": 159217.09,
    "vel_kms": 4.043,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.836256,
    "t_sec": 158652.5,
    "pos": [
      -17.670639,
      -2.995926,
      37.632427
    ],
    "alt_km": 160358.8,
    "vel_kms": 4.023,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.848762,
    "t_sec": 159733.0,
    "pos": [
      -17.794645,
      -3.022248,
      37.888235
    ],
    "alt_km": 161500.46,
    "vel_kms": 4.004,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.861268,
    "t_sec": 160813.5,
    "pos": [
      -17.918637,
      -3.048575,
      38.144034
    ],
    "alt_km": 162642.08,
    "vel_kms": 3.984,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.873774,
    "t_sec": 161894.1,
    "pos": [
      -18.042616,
      -3.074908,
      38.399824
    ],
    "alt_km": 163783.64,
    "vel_kms": 3.965,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.88628,
    "t_sec": 162974.6,
    "pos": [
      -18.16658,
      -3.101248,
      38.655604
    ],
    "alt_km": 164925.15,
    "vel_kms": 3.946,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.898786,
    "t_sec": 164055.1,
    "pos": [
      -18.29053,
      -3.127594,
      38.911375
    ],
    "alt_km": 166066.6,
    "vel_kms": 3.926,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.911292,
    "t_sec": 165135.6,
    "pos": [
      -18.414467,
      -3.153946,
      39.167137
    ],
    "alt_km": 167208.01,
    "vel_kms": 3.907,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.923798,
    "t_sec": 166216.1,
    "pos": [
      -18.538389,
      -3.180305,
      39.422889
    ],
    "alt_km": 168349.37,
    "vel_kms": 3.888,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.936304,
    "t_sec": 167296.6,
    "pos": [
      -18.662297,
      -3.206669,
      39.678632
    ],
    "alt_km": 169490.67,
    "vel_kms": 3.869,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.94881,
    "t_sec": 168377.1,
    "pos": [
      -18.786191,
      -3.23304,
      39.934366
    ],
    "alt_km": 170631.92,
    "vel_kms": 3.85,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.961315,
    "t_sec": 169457.7,
    "pos": [
      -18.910071,
      -3.259417,
      40.19009
    ],
    "alt_km": 171773.12,
    "vel_kms": 3.831,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.973821,
    "t_sec": 170538.2,
    "pos": [
      -19.033937,
      -3.285801,
      40.445804
    ],
    "alt_km": 172914.26,
    "vel_kms": 3.812,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.986327,
    "t_sec": 171618.7,
    "pos": [
      -19.157788,
      -3.312191,
      40.70151
    ],
    "alt_km": 174055.35,
    "vel_kms": 3.793,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 1.998833,
    "t_sec": 172699.2,
    "pos": [
      -19.281626,
      -3.338587,
      40.957205
    ],
    "alt_km": 175196.39,
    "vel_kms": 3.775,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.011339,
    "t_sec": 173779.7,
    "pos": [
      -19.405449,
      -3.364989,
      41.212891
    ],
    "alt_km": 176337.38,
    "vel_kms": 3.756,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.023845,
    "t_sec": 174860.2,
    "pos": [
      -19.529258,
      -3.391398,
      41.468568
    ],
    "alt_km": 177478.31,
    "vel_kms": 3.738,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.036351,
    "t_sec": 175940.7,
    "pos": [
      -19.653052,
      -3.417813,
      41.724235
    ],
    "alt_km": 178619.19,
    "vel_kms": 3.719,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.048857,
    "t_sec": 177021.3,
    "pos": [
      -19.776832,
      -3.444234,
      41.979893
    ],
    "alt_km": 179760.02,
    "vel_kms": 3.701,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.061363,
    "t_sec": 178101.8,
    "pos": [
      -19.900598,
      -3.470662,
      42.235541
    ],
    "alt_km": 180900.79,
    "vel_kms": 3.682,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.073869,
    "t_sec": 179182.3,
    "pos": [
      -20.02435,
      -3.497097,
      42.49118
    ],
    "alt_km": 182041.51,
    "vel_kms": 3.664,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.086375,
    "t_sec": 180262.8,
    "pos": [
      -20.148087,
      -3.523537,
      42.746808
    ],
    "alt_km": 183182.17,
    "vel_kms": 3.646,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.098881,
    "t_sec": 181343.3,
    "pos": [
      -20.27181,
      -3.549984,
      43.002428
    ],
    "alt_km": 184322.78,
    "vel_kms": 3.628,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.111387,
    "t_sec": 182423.8,
    "pos": [
      -20.395518,
      -3.576438,
      43.258038
    ],
    "alt_km": 185463.34,
    "vel_kms": 3.61,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.123893,
    "t_sec": 183504.3,
    "pos": [
      -20.519212,
      -3.602898,
      43.513638
    ],
    "alt_km": 186603.84,
    "vel_kms": 3.592,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.136399,
    "t_sec": 184584.9,
    "pos": [
      -20.642892,
      -3.629364,
      43.769228
    ],
    "alt_km": 187744.29,
    "vel_kms": 3.574,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.148905,
    "t_sec": 185665.4,
    "pos": [
      -20.766557,
      -3.655836,
      44.024809
    ],
    "alt_km": 188884.68,
    "vel_kms": 3.556,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.161411,
    "t_sec": 186745.9,
    "pos": [
      -20.890207,
      -3.682316,
      44.28038
    ],
    "alt_km": 190025.02,
    "vel_kms": 3.538,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.173917,
    "t_sec": 187826.4,
    "pos": [
      -21.013843,
      -3.708801,
      44.535942
    ],
    "alt_km": 191165.3,
    "vel_kms": 3.521,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.186423,
    "t_sec": 188906.9,
    "pos": [
      -21.137465,
      -3.735293,
      44.791494
    ],
    "alt_km": 192305.53,
    "vel_kms": 3.503,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.198929,
    "t_sec": 189987.4,
    "pos": [
      -21.261072,
      -3.761791,
      45.047036
    ],
    "alt_km": 193445.71,
    "vel_kms": 3.485,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.211435,
    "t_sec": 191067.9,
    "pos": [
      -21.384665,
      -3.788296,
      45.302569
    ],
    "alt_km": 194585.82,
    "vel_kms": 3.468,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.22394,
    "t_sec": 192148.5,
    "pos": [
      -21.508243,
      -3.814808,
      45.558092
    ],
    "alt_km": 195725.89,
    "vel_kms": 3.45,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.236446,
    "t_sec": 193229.0,
    "pos": [
      -21.631807,
      -3.841325,
      45.813605
    ],
    "alt_km": 196865.9,
    "vel_kms": 3.433,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.248952,
    "t_sec": 194309.5,
    "pos": [
      -21.755356,
      -3.867849,
      46.069109
    ],
    "alt_km": 198005.85,
    "vel_kms": 3.416,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.261458,
    "t_sec": 195390.0,
    "pos": [
      -21.878891,
      -3.89438,
      46.324602
    ],
    "alt_km": 199145.75,
    "vel_kms": 3.398,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.273964,
    "t_sec": 196470.5,
    "pos": [
      -22.002411,
      -3.920917,
      46.580087
    ],
    "alt_km": 200285.59,
    "vel_kms": 3.381,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.28647,
    "t_sec": 197551.0,
    "pos": [
      -22.125917,
      -3.947461,
      46.835561
    ],
    "alt_km": 201425.38,
    "vel_kms": 3.364,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.298976,
    "t_sec": 198631.5,
    "pos": [
      -22.249408,
      -3.97401,
      47.091026
    ],
    "alt_km": 202565.11,
    "vel_kms": 3.347,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.311482,
    "t_sec": 199712.1,
    "pos": [
      -22.372885,
      -4.000567,
      47.346482
    ],
    "alt_km": 203704.79,
    "vel_kms": 3.33,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.323988,
    "t_sec": 200792.6,
    "pos": [
      -22.496347,
      -4.02713,
      47.601927
    ],
    "alt_km": 204844.41,
    "vel_kms": 3.313,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.336494,
    "t_sec": 201873.1,
    "pos": [
      -22.619795,
      -4.053699,
      47.857363
    ],
    "alt_km": 205983.98,
    "vel_kms": 3.296,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.349,
    "t_sec": 202953.6,
    "pos": [
      -22.743228,
      -4.080275,
      48.11279
    ],
    "alt_km": 207123.49,
    "vel_kms": 3.279,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.361506,
    "t_sec": 204034.1,
    "pos": [
      -22.866647,
      -4.106857,
      48.368206
    ],
    "alt_km": 208262.95,
    "vel_kms": 3.262,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.374012,
    "t_sec": 205114.6,
    "pos": [
      -22.990051,
      -4.133445,
      48.623613
    ],
    "alt_km": 209402.35,
    "vel_kms": 3.245,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.386518,
    "t_sec": 206195.1,
    "pos": [
      -23.113441,
      -4.16004,
      48.879011
    ],
    "alt_km": 210541.69,
    "vel_kms": 3.229,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.399024,
    "t_sec": 207275.7,
    "pos": [
      -23.236817,
      -4.186642,
      49.134398
    ],
    "alt_km": 211680.98,
    "vel_kms": 3.212,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.41153,
    "t_sec": 208356.2,
    "pos": [
      -23.360178,
      -4.21325,
      49.389777
    ],
    "alt_km": 212820.22,
    "vel_kms": 3.195,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.424036,
    "t_sec": 209436.7,
    "pos": [
      -23.483524,
      -4.239864,
      49.645145
    ],
    "alt_km": 213959.4,
    "vel_kms": 3.179,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.436542,
    "t_sec": 210517.2,
    "pos": [
      -23.606856,
      -4.266484,
      49.900504
    ],
    "alt_km": 215098.52,
    "vel_kms": 3.162,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.449048,
    "t_sec": 211597.7,
    "pos": [
      -23.730174,
      -4.293111,
      50.155853
    ],
    "alt_km": 215859.73,
    "vel_kms": 3.146,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.461554,
    "t_sec": 212678.2,
    "pos": [
      -23.853478,
      -4.319745,
      50.411193
    ],
    "alt_km": 214688.13,
    "vel_kms": 3.129,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.47406,
    "t_sec": 213758.7,
    "pos": [
      -23.976767,
      -4.346385,
      50.666523
    ],
    "alt_km": 213513.6,
    "vel_kms": 3.113,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.486565,
    "t_sec": 214839.3,
    "pos": [
      -24.100041,
      -4.373031,
      50.921844
    ],
    "alt_km": 212336.48,
    "vel_kms": 3.097,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.499071,
    "t_sec": 215919.8,
    "pos": [
      -24.223302,
      -4.399683,
      51.177155
    ],
    "alt_km": 211157.39,
    "vel_kms": 3.08,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.511577,
    "t_sec": 217000.3,
    "pos": [
      -24.346548,
      -4.426342,
      51.432457
    ],
    "alt_km": 209975.24,
    "vel_kms": 3.064,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.524083,
    "t_sec": 218080.8,
    "pos": [
      -24.46978,
      -4.453007,
      51.687749
    ],
    "alt_km": 208791.12,
    "vel_kms": 3.048,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.536589,
    "t_sec": 219161.3,
    "pos": [
      -24.592997,
      -4.479679,
      51.943031
    ],
    "alt_km": 207604.39,
    "vel_kms": 3.032,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.549095,
    "t_sec": 220241.8,
    "pos": [
      -24.716201,
      -4.506357,
      52.198304
    ],
    "alt_km": 206414.78,
    "vel_kms": 3.016,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.561601,
    "t_sec": 221322.3,
    "pos": [
      -24.83939,
      -4.533041,
      52.453568
    ],
    "alt_km": 205223.21,
    "vel_kms": 3.0,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.574107,
    "t_sec": 222402.9,
    "pos": [
      -24.962565,
      -4.559731,
      52.708822
    ],
    "alt_km": 204028.74,
    "vel_kms": 2.984,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.586613,
    "t_sec": 223483.4,
    "pos": [
      -25.085726,
      -4.586428,
      52.964067
    ],
    "alt_km": 202832.18,
    "vel_kms": 2.968,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.599119,
    "t_sec": 224563.9,
    "pos": [
      -25.208873,
      -4.613131,
      53.219302
    ],
    "alt_km": 201632.91,
    "vel_kms": 2.952,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.611625,
    "t_sec": 225644.4,
    "pos": [
      -25.332005,
      -4.639841,
      53.474528
    ],
    "alt_km": 200430.87,
    "vel_kms": 2.936,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.624131,
    "t_sec": 226724.9,
    "pos": [
      -25.455124,
      -4.666556,
      53.729745
    ],
    "alt_km": 199226.8,
    "vel_kms": 2.921,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.636637,
    "t_sec": 227805.4,
    "pos": [
      -25.578229,
      -4.693278,
      53.984952
    ],
    "alt_km": 198019.91,
    "vel_kms": 2.905,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.649143,
    "t_sec": 228885.9,
    "pos": [
      -25.701319,
      -4.720006,
      54.24015
    ],
    "alt_km": 196810.89,
    "vel_kms": 2.889,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.661649,
    "t_sec": 229966.5,
    "pos": [
      -25.824396,
      -4.74674,
      54.495338
    ],
    "alt_km": 195600.02,
    "vel_kms": 2.874,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.674155,
    "t_sec": 231047.0,
    "pos": [
      -25.947459,
      -4.77348,
      54.750518
    ],
    "alt_km": 194385.65,
    "vel_kms": 2.858,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.686661,
    "t_sec": 232127.5,
    "pos": [
      -26.070508,
      -4.800227,
      55.005688
    ],
    "alt_km": 193169.52,
    "vel_kms": 2.843,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.699167,
    "t_sec": 233208.0,
    "pos": [
      -26.193543,
      -4.826979,
      55.260849
    ],
    "alt_km": 191950.48,
    "vel_kms": 2.827,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.711673,
    "t_sec": 234288.5,
    "pos": [
      -26.316564,
      -4.853738,
      55.516
    ],
    "alt_km": 190729.85,
    "vel_kms": 2.812,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.724179,
    "t_sec": 235369.0,
    "pos": [
      -26.439572,
      -4.880503,
      55.771143
    ],
    "alt_km": 189505.51,
    "vel_kms": 2.796,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.736685,
    "t_sec": 236449.5,
    "pos": [
      -26.562566,
      -4.907274,
      56.026276
    ],
    "alt_km": 188279.32,
    "vel_kms": 2.781,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.74919,
    "t_sec": 237530.1,
    "pos": [
      -26.685546,
      -4.934051,
      56.281401
    ],
    "alt_km": 187051.14,
    "vel_kms": 2.765,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.761696,
    "t_sec": 238610.6,
    "pos": [
      -26.808513,
      -4.960834,
      56.536516
    ],
    "alt_km": 185819.84,
    "vel_kms": 2.75,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.774202,
    "t_sec": 239691.1,
    "pos": [
      -26.931466,
      -4.987624,
      56.791622
    ],
    "alt_km": 184586.65,
    "vel_kms": 2.735,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.786708,
    "t_sec": 240771.6,
    "pos": [
      -27.054405,
      -5.014419,
      57.046719
    ],
    "alt_km": 183350.63,
    "vel_kms": 2.72,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.799214,
    "t_sec": 241852.1,
    "pos": [
      -27.177331,
      -5.04122,
      57.301807
    ],
    "alt_km": 182112.48,
    "vel_kms": 2.705,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.81172,
    "t_sec": 242932.6,
    "pos": [
      -27.300243,
      -5.068027,
      57.556886
    ],
    "alt_km": 180871.31,
    "vel_kms": 2.69,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.824226,
    "t_sec": 244013.1,
    "pos": [
      -27.423143,
      -5.09484,
      57.811957
    ],
    "alt_km": 179628.18,
    "vel_kms": 2.674,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.836732,
    "t_sec": 245093.7,
    "pos": [
      -27.546028,
      -5.121659,
      58.067018
    ],
    "alt_km": 178383.1,
    "vel_kms": 2.659,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.849238,
    "t_sec": 246174.2,
    "pos": [
      -27.668901,
      -5.148484,
      58.32207
    ],
    "alt_km": 177135.09,
    "vel_kms": 2.644,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.861744,
    "t_sec": 247254.7,
    "pos": [
      -27.79176,
      -5.175315,
      58.577114
    ],
    "alt_km": 175884.8,
    "vel_kms": 2.629,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.87425,
    "t_sec": 248335.2,
    "pos": [
      -27.914606,
      -5.202151,
      58.832149
    ],
    "alt_km": 174631.85,
    "vel_kms": 2.615,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.886756,
    "t_sec": 249415.7,
    "pos": [
      -28.037439,
      -5.228994,
      59.087175
    ],
    "alt_km": 173376.4,
    "vel_kms": 2.6,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.899262,
    "t_sec": 250496.2,
    "pos": [
      -28.160259,
      -5.255842,
      59.342193
    ],
    "alt_km": 172119.35,
    "vel_kms": 2.585,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.911768,
    "t_sec": 251576.7,
    "pos": [
      -28.283066,
      -5.282696,
      59.597201
    ],
    "alt_km": 170859.51,
    "vel_kms": 2.57,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.924274,
    "t_sec": 252657.3,
    "pos": [
      -28.40586,
      -5.309556,
      59.852202
    ],
    "alt_km": 169596.7,
    "vel_kms": 2.555,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.93678,
    "t_sec": 253737.8,
    "pos": [
      -28.528641,
      -5.336422,
      60.107193
    ],
    "alt_km": 168331.78,
    "vel_kms": 2.541,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.949286,
    "t_sec": 254818.3,
    "pos": [
      -28.65141,
      -5.363293,
      60.362176
    ],
    "alt_km": 167064.82,
    "vel_kms": 2.526,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.961792,
    "t_sec": 255898.8,
    "pos": [
      -28.774165,
      -5.39017,
      60.61715
    ],
    "alt_km": 165795.66,
    "vel_kms": 2.511,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.974298,
    "t_sec": 256979.3,
    "pos": [
      -28.896908,
      -5.417052,
      60.872116
    ],
    "alt_km": 164523.78,
    "vel_kms": 2.497,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.986804,
    "t_sec": 258059.8,
    "pos": [
      -29.019638,
      -5.443941,
      61.127074
    ],
    "alt_km": 163248.97,
    "vel_kms": 2.482,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 2.99931,
    "t_sec": 259140.3,
    "pos": [
      -29.142356,
      -5.470834,
      61.382023
    ],
    "alt_km": 161972.22,
    "vel_kms": 2.468,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.011815,
    "t_sec": 260220.9,
    "pos": [
      -29.265061,
      -5.497734,
      61.636964
    ],
    "alt_km": 160693.22,
    "vel_kms": 2.453,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.024321,
    "t_sec": 261301.4,
    "pos": [
      -29.387753,
      -5.524639,
      61.891897
    ],
    "alt_km": 159412.22,
    "vel_kms": 2.439,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.036827,
    "t_sec": 262381.9,
    "pos": [
      -29.510433,
      -5.551549,
      62.146821
    ],
    "alt_km": 158128.18,
    "vel_kms": 2.424,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.049333,
    "t_sec": 263462.4,
    "pos": [
      -29.633101,
      -5.578465,
      62.401737
    ],
    "alt_km": 156842.1,
    "vel_kms": 2.41,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.061839,
    "t_sec": 264542.9,
    "pos": [
      -29.755757,
      -5.605386,
      62.656645
    ],
    "alt_km": 155553.14,
    "vel_kms": 2.396,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.074345,
    "t_sec": 265623.4,
    "pos": [
      -29.8784,
      -5.632313,
      62.911545
    ],
    "alt_km": 154262.11,
    "vel_kms": 2.381,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.086851,
    "t_sec": 266703.9,
    "pos": [
      -30.001032,
      -5.659245,
      63.166436
    ],
    "alt_km": 152969.08,
    "vel_kms": 2.367,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.099357,
    "t_sec": 267784.5,
    "pos": [
      -30.123651,
      -5.686183,
      63.42132
    ],
    "alt_km": 151673.77,
    "vel_kms": 2.353,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.111863,
    "t_sec": 268865.0,
    "pos": [
      -30.246259,
      -5.713125,
      63.676196
    ],
    "alt_km": 150375.37,
    "vel_kms": 2.339,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.124369,
    "t_sec": 269945.5,
    "pos": [
      -30.368854,
      -5.740073,
      63.931064
    ],
    "alt_km": 149075.02,
    "vel_kms": 2.325,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.136875,
    "t_sec": 271026.0,
    "pos": [
      -30.491438,
      -5.767027,
      64.185924
    ],
    "alt_km": 147772.18,
    "vel_kms": 2.31,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.149381,
    "t_sec": 272106.5,
    "pos": [
      -30.61401,
      -5.793985,
      64.440776
    ],
    "alt_km": 146467.02,
    "vel_kms": 2.296,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.161887,
    "t_sec": 273187.0,
    "pos": [
      -30.73657,
      -5.820949,
      64.69562
    ],
    "alt_km": 145159.53,
    "vel_kms": 2.282,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.174393,
    "t_sec": 274267.5,
    "pos": [
      -30.859119,
      -5.847918,
      64.950457
    ],
    "alt_km": 143849.99,
    "vel_kms": 2.268,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.186899,
    "t_sec": 275348.1,
    "pos": [
      -30.981656,
      -5.874892,
      65.205286
    ],
    "alt_km": 142538.02,
    "vel_kms": 2.254,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.199405,
    "t_sec": 276428.6,
    "pos": [
      -31.104182,
      -5.901871,
      65.460107
    ],
    "alt_km": 141223.82,
    "vel_kms": 2.24,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.211911,
    "t_sec": 277509.1,
    "pos": [
      -31.226696,
      -5.928855,
      65.714921
    ],
    "alt_km": 139907.2,
    "vel_kms": 2.226,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.224417,
    "t_sec": 278589.6,
    "pos": [
      -31.349199,
      -5.955844,
      65.969727
    ],
    "alt_km": 138588.32,
    "vel_kms": 2.212,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.236923,
    "t_sec": 279670.1,
    "pos": [
      -31.471691,
      -5.982838,
      66.224526
    ],
    "alt_km": 137266.42,
    "vel_kms": 2.199,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.249429,
    "t_sec": 280750.6,
    "pos": [
      -31.594172,
      -6.009837,
      66.479317
    ],
    "alt_km": 135942.37,
    "vel_kms": 2.185,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.261935,
    "t_sec": 281831.1,
    "pos": [
      -31.716642,
      -6.036841,
      66.734101
    ],
    "alt_km": 134616.28,
    "vel_kms": 2.171,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.27444,
    "t_sec": 282911.7,
    "pos": [
      -31.839101,
      -6.063849,
      66.988878
    ],
    "alt_km": 133287.97,
    "vel_kms": 2.157,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.286946,
    "t_sec": 283992.2,
    "pos": [
      -31.96155,
      -6.090863,
      67.243648
    ],
    "alt_km": 131957.7,
    "vel_kms": 2.144,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.299452,
    "t_sec": 285072.7,
    "pos": [
      -32.083987,
      -6.117881,
      67.49841
    ],
    "alt_km": 130624.16,
    "vel_kms": 2.13,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.311958,
    "t_sec": 286153.2,
    "pos": [
      -32.206414,
      -6.144904,
      67.753166
    ],
    "alt_km": 129288.68,
    "vel_kms": 2.116,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.324464,
    "t_sec": 287233.7,
    "pos": [
      -32.32883,
      -6.171932,
      68.007914
    ],
    "alt_km": 127950.94,
    "vel_kms": 2.103,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.33697,
    "t_sec": 288314.2,
    "pos": [
      -32.451236,
      -6.198964,
      68.262655
    ],
    "alt_km": 126611.26,
    "vel_kms": 2.089,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.349476,
    "t_sec": 289394.7,
    "pos": [
      -32.573631,
      -6.226001,
      68.517389
    ],
    "alt_km": 125269.21,
    "vel_kms": 2.075,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.361982,
    "t_sec": 290475.3,
    "pos": [
      -32.696016,
      -6.253043,
      68.772117
    ],
    "alt_km": 123924.18,
    "vel_kms": 2.062,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.374488,
    "t_sec": 291555.8,
    "pos": [
      -32.818391,
      -6.280089,
      69.026838
    ],
    "alt_km": 122577.63,
    "vel_kms": 2.048,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.386994,
    "t_sec": 292636.3,
    "pos": [
      -32.940756,
      -6.30714,
      69.281552
    ],
    "alt_km": 121228.66,
    "vel_kms": 2.035,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.3995,
    "t_sec": 293716.8,
    "pos": [
      -33.06311,
      -6.334195,
      69.536259
    ],
    "alt_km": 119877.14,
    "vel_kms": 2.021,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.412006,
    "t_sec": 294797.3,
    "pos": [
      -33.185455,
      -6.361254,
      69.790959
    ],
    "alt_km": 118523.62,
    "vel_kms": 2.008,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.424512,
    "t_sec": 295877.8,
    "pos": [
      -33.30779,
      -6.388318,
      70.045654
    ],
    "alt_km": 117166.83,
    "vel_kms": 1.995,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.437018,
    "t_sec": 296958.3,
    "pos": [
      -33.430115,
      -6.415386,
      70.300341
    ],
    "alt_km": 115808.53,
    "vel_kms": 1.981,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.449524,
    "t_sec": 298038.9,
    "pos": [
      -33.552431,
      -6.442459,
      70.555022
    ],
    "alt_km": 114448.18,
    "vel_kms": 1.968,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.46203,
    "t_sec": 299119.4,
    "pos": [
      -33.674737,
      -6.469535,
      70.809697
    ],
    "alt_km": 113084.91,
    "vel_kms": 1.955,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.474536,
    "t_sec": 300199.9,
    "pos": [
      -33.797033,
      -6.496616,
      71.064366
    ],
    "alt_km": 111720.42,
    "vel_kms": 1.941,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.487042,
    "t_sec": 301280.4,
    "pos": [
      -33.91932,
      -6.523701,
      71.319028
    ],
    "alt_km": 110352.48,
    "vel_kms": 1.928,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.499548,
    "t_sec": 302360.9,
    "pos": [
      -34.041598,
      -6.55079,
      71.573684
    ],
    "alt_km": 108982.69,
    "vel_kms": 1.915,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.512054,
    "t_sec": 303441.4,
    "pos": [
      -34.163867,
      -6.577884,
      71.828334
    ],
    "alt_km": 107610.55,
    "vel_kms": 1.902,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.52456,
    "t_sec": 304521.9,
    "pos": [
      -34.286127,
      -6.604981,
      72.082978
    ],
    "alt_km": 106236.41,
    "vel_kms": 1.889,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.537065,
    "t_sec": 305602.5,
    "pos": [
      -34.408378,
      -6.632082,
      72.337616
    ],
    "alt_km": 104860.07,
    "vel_kms": 1.876,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.549571,
    "t_sec": 306683.0,
    "pos": [
      -34.53062,
      -6.659187,
      72.592248
    ],
    "alt_km": 103481.42,
    "vel_kms": 1.862,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.562077,
    "t_sec": 307763.5,
    "pos": [
      -34.652853,
      -6.686296,
      72.846875
    ],
    "alt_km": 102100.51,
    "vel_kms": 1.849,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.574583,
    "t_sec": 308844.0,
    "pos": [
      -34.775078,
      -6.713409,
      73.101495
    ],
    "alt_km": 100716.58,
    "vel_kms": 0.98,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.587089,
    "t_sec": 309924.5,
    "pos": [
      -34.897294,
      -6.740526,
      73.35611
    ],
    "alt_km": 99331.44,
    "vel_kms": 0.999,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.599595,
    "t_sec": 311005.0,
    "pos": [
      -35.019502,
      -6.767646,
      73.610719
    ],
    "alt_km": 97943.16,
    "vel_kms": 1.019,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.612101,
    "t_sec": 312085.5,
    "pos": [
      -35.141701,
      -6.79477,
      73.865323
    ],
    "alt_km": 96553.51,
    "vel_kms": 1.038,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.624607,
    "t_sec": 313166.1,
    "pos": [
      -35.263892,
      -6.821898,
      74.119921
    ],
    "alt_km": 95161.28,
    "vel_kms": 1.057,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.637113,
    "t_sec": 314246.6,
    "pos": [
      -35.386075,
      -6.849029,
      74.374514
    ],
    "alt_km": 93766.8,
    "vel_kms": 1.076,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.649619,
    "t_sec": 315327.1,
    "pos": [
      -35.50825,
      -6.876164,
      74.629102
    ],
    "alt_km": 92369.62,
    "vel_kms": 1.096,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.662125,
    "t_sec": 316407.6,
    "pos": [
      -35.630418,
      -6.903303,
      74.883684
    ],
    "alt_km": 90971.11,
    "vel_kms": 1.115,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.674631,
    "t_sec": 317488.1,
    "pos": [
      -35.752577,
      -6.930444,
      75.138261
    ],
    "alt_km": 89569.33,
    "vel_kms": 1.134,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.687137,
    "t_sec": 318568.6,
    "pos": [
      -35.874729,
      -6.95759,
      75.392833
    ],
    "alt_km": 88166.36,
    "vel_kms": 1.154,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.699643,
    "t_sec": 319649.1,
    "pos": [
      -35.996873,
      -6.984738,
      75.6474
    ],
    "alt_km": 86760.09,
    "vel_kms": 1.173,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.712149,
    "t_sec": 320729.7,
    "pos": [
      -36.11901,
      -7.01189,
      75.901962
    ],
    "alt_km": 85352.68,
    "vel_kms": 1.192,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.724655,
    "t_sec": 321810.2,
    "pos": [
      -36.241139,
      -7.039045,
      76.156519
    ],
    "alt_km": 83941.84,
    "vel_kms": 1.211,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.737161,
    "t_sec": 322890.7,
    "pos": [
      -36.363262,
      -7.066204,
      76.411072
    ],
    "alt_km": 82529.75,
    "vel_kms": 1.231,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.749667,
    "t_sec": 323971.2,
    "pos": [
      -36.485377,
      -7.093365,
      76.665619
    ],
    "alt_km": 81115.25,
    "vel_kms": 1.25,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.762173,
    "t_sec": 325051.7,
    "pos": [
      -36.607485,
      -7.12053,
      76.920162
    ],
    "alt_km": 79698.36,
    "vel_kms": 1.269,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.774679,
    "t_sec": 326132.2,
    "pos": [
      -36.729586,
      -7.147698,
      77.1747
    ],
    "alt_km": 78278.86,
    "vel_kms": 1.289,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.787185,
    "t_sec": 327212.7,
    "pos": [
      -36.851681,
      -7.174868,
      77.429234
    ],
    "alt_km": 76857.94,
    "vel_kms": 1.308,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.79969,
    "t_sec": 328293.3,
    "pos": [
      -36.973769,
      -7.202042,
      77.683764
    ],
    "alt_km": 75434.56,
    "vel_kms": 1.327,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.812196,
    "t_sec": 329373.8,
    "pos": [
      -37.09585,
      -7.229218,
      77.938289
    ],
    "alt_km": 74008.8,
    "vel_kms": 1.346,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.824702,
    "t_sec": 330454.3,
    "pos": [
      -37.217925,
      -7.256398,
      78.19281
    ],
    "alt_km": 72580.96,
    "vel_kms": 1.366,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.837208,
    "t_sec": 331534.8,
    "pos": [
      -37.339994,
      -7.28358,
      78.447326
    ],
    "alt_km": 71151.15,
    "vel_kms": 1.385,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.849714,
    "t_sec": 332615.3,
    "pos": [
      -37.462056,
      -7.310765,
      78.701839
    ],
    "alt_km": 69718.69,
    "vel_kms": 1.404,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.86222,
    "t_sec": 333695.8,
    "pos": [
      -37.584113,
      -7.337953,
      78.956347
    ],
    "alt_km": 68284.82,
    "vel_kms": 1.424,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.874726,
    "t_sec": 334776.3,
    "pos": [
      -37.706163,
      -7.365143,
      79.210852
    ],
    "alt_km": 66847.74,
    "vel_kms": 1.443,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.887232,
    "t_sec": 335856.9,
    "pos": [
      -37.828208,
      -7.392336,
      79.465352
    ],
    "alt_km": 65409.32,
    "vel_kms": 1.462,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.899738,
    "t_sec": 336937.4,
    "pos": [
      -37.950247,
      -7.419531,
      79.719849
    ],
    "alt_km": 63968.64,
    "vel_kms": 1.481,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.912244,
    "t_sec": 338017.9,
    "pos": [
      -38.07228,
      -7.446729,
      79.974342
    ],
    "alt_km": 62525.63,
    "vel_kms": 1.501,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.92475,
    "t_sec": 339098.4,
    "pos": [
      -38.194308,
      -7.473929,
      80.228832
    ],
    "alt_km": 61080.51,
    "vel_kms": 1.52,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.937256,
    "t_sec": 340178.9,
    "pos": [
      -38.316331,
      -7.501132,
      80.483317
    ],
    "alt_km": 59632.86,
    "vel_kms": 1.539,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.949762,
    "t_sec": 341259.4,
    "pos": [
      -38.438348,
      -7.528337,
      80.7378
    ],
    "alt_km": 58183.02,
    "vel_kms": 1.559,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.962268,
    "t_sec": 342339.9,
    "pos": [
      -38.560361,
      -7.555544,
      80.992279
    ],
    "alt_km": 56731.68,
    "vel_kms": 1.578,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.974774,
    "t_sec": 343420.5,
    "pos": [
      -38.682368,
      -7.582754,
      81.246755
    ],
    "alt_km": 55277.35,
    "vel_kms": 1.597,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.98728,
    "t_sec": 344501.0,
    "pos": [
      -38.80437,
      -7.609965,
      81.501227
    ],
    "alt_km": 53821.68,
    "vel_kms": 1.616,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 3.999786,
    "t_sec": 345581.5,
    "pos": [
      -38.926368,
      -7.637179,
      81.755696
    ],
    "alt_km": 52363.51,
    "vel_kms": 1.636,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 4.012292,
    "t_sec": 346662.0,
    "pos": [
      -39.048361,
      -7.664395,
      82.010163
    ],
    "alt_km": 50903.66,
    "vel_kms": 1.655,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 4.024798,
    "t_sec": 347742.5,
    "pos": [
      -39.17035,
      -7.691612,
      82.264626
    ],
    "alt_km": 49440.84,
    "vel_kms": 1.674,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 4.037304,
    "t_sec": 348823.0,
    "pos": [
      -39.292334,
      -7.718832,
      82.519086
    ],
    "alt_km": 47976.76,
    "vel_kms": 1.694,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 4.04981,
    "t_sec": 349903.5,
    "pos": [
      -39.414314,
      -7.746054,
      82.773544
    ],
    "alt_km": 46510.27,
    "vel_kms": 1.713,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 4.062315,
    "t_sec": 350984.1,
    "pos": [
      -39.53629,
      -7.773277,
      83.027998
    ],
    "alt_km": 45041.26,
    "vel_kms": 1.732,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 4.074821,
    "t_sec": 352064.6,
    "pos": [
      -39.658262,
      -7.800502,
      83.282451
    ],
    "alt_km": 43570.22,
    "vel_kms": 1.751,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 4.087327,
    "t_sec": 353145.1,
    "pos": [
      -39.78023,
      -7.827729,
      83.5369
    ],
    "alt_km": 42097.79,
    "vel_kms": 1.771,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 4.099833,
    "t_sec": 354225.6,
    "pos": [
      -39.902195,
      -7.854958,
      83.791347
    ],
    "alt_km": 40623.34,
    "vel_kms": 1.79,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 4.112339,
    "t_sec": 355306.1,
    "pos": [
      -40.024156,
      -7.882188,
      84.045792
    ],
    "alt_km": 39146.23,
    "vel_kms": 1.809,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 4.124845,
    "t_sec": 356386.6,
    "pos": [
      -40.146113,
      -7.909419,
      84.300234
    ],
    "alt_km": 37666.91,
    "vel_kms": 1.829,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 4.137351,
    "t_sec": 357467.1,
    "pos": [
      -40.268067,
      -7.936653,
      84.554674
    ],
    "alt_km": 36186.04,
    "vel_kms": 1.848,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 4.149857,
    "t_sec": 358547.7,
    "pos": [
      -40.390018,
      -7.963887,
      84.809112
    ],
    "alt_km": 34702.64,
    "vel_kms": 1.867,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 4.162363,
    "t_sec": 359628.2,
    "pos": [
      -40.511965,
      -7.991123,
      85.063548
    ],
    "alt_km": 33218.4,
    "vel_kms": 1.886,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 4.174869,
    "t_sec": 360708.7,
    "pos": [
      -40.63391,
      -8.018361,
      85.317982
    ],
    "alt_km": 31730.97,
    "vel_kms": 1.906,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 4.187375,
    "t_sec": 361789.2,
    "pos": [
      -40.755852,
      -8.045599,
      85.572414
    ],
    "alt_km": 30242.18,
    "vel_kms": 1.925,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 4.199881,
    "t_sec": 362869.7,
    "pos": [
      -40.877791,
      -8.072839,
      85.826844
    ],
    "alt_km": 28751.54,
    "vel_kms": 1.944,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 4.212387,
    "t_sec": 363950.2,
    "pos": [
      -40.999727,
      -8.10008,
      86.081273
    ],
    "alt_km": 27258.73,
    "vel_kms": 1.964,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 4.224893,
    "t_sec": 365030.7,
    "pos": [
      -41.121661,
      -8.127322,
      86.3357
    ],
    "alt_km": 25764.55,
    "vel_kms": 1.983,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 4.237399,
    "t_sec": 366111.3,
    "pos": [
      -41.243593,
      -8.154565,
      86.590125
    ],
    "alt_km": 24268.07,
    "vel_kms": 2.002,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 4.249905,
    "t_sec": 367191.8,
    "pos": [
      -41.365522,
      -8.181809,
      86.844549
    ],
    "alt_km": 22770.18,
    "vel_kms": 2.021,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 4.262411,
    "t_sec": 368272.3,
    "pos": [
      -41.48745,
      -8.209054,
      87.098971
    ],
    "alt_km": 21270.53,
    "vel_kms": 2.041,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 4.274917,
    "t_sec": 369352.8,
    "pos": [
      -41.609375,
      -8.2363,
      87.353392
    ],
    "alt_km": 19769.44,
    "vel_kms": 2.06,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 4.287423,
    "t_sec": 370433.3,
    "pos": [
      -41.731299,
      -8.263546,
      87.607812
    ],
    "alt_km": 18267.7,
    "vel_kms": 2.079,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 4.299929,
    "t_sec": 371513.8,
    "pos": [
      -41.853221,
      -8.290794,
      87.862231
    ],
    "alt_km": 16763.68,
    "vel_kms": 2.099,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 4.312435,
    "t_sec": 372594.3,
    "pos": [
      -41.975141,
      -8.318042,
      88.116649
    ],
    "alt_km": 15259.89,
    "vel_kms": 2.118,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 4.32494,
    "t_sec": 373674.9,
    "pos": [
      -42.09706,
      -8.345291,
      88.371065
    ],
    "alt_km": 13754.43,
    "vel_kms": 2.137,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 4.337446,
    "t_sec": 374755.4,
    "pos": [
      -42.218978,
      -8.37254,
      88.625481
    ],
    "alt_km": 12249.76,
    "vel_kms": 2.156,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 4.349952,
    "t_sec": 375835.9,
    "pos": [
      -42.340895,
      -8.39979,
      88.879896
    ],
    "alt_km": 10745.6,
    "vel_kms": 2.176,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 4.362458,
    "t_sec": 376916.4,
    "pos": [
      -42.46281,
      -8.42704,
      89.134311
    ],
    "alt_km": 9243.95,
    "vel_kms": 2.195,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 4.374964,
    "t_sec": 377996.9,
    "pos": [
      -42.584725,
      -8.454291,
      89.388725
    ],
    "alt_km": 7745.53,
    "vel_kms": 2.214,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 4.38747,
    "t_sec": 379077.4,
    "pos": [
      -42.706638,
      -8.481542,
      89.643138
    ],
    "alt_km": 6254.8,
    "vel_kms": 2.234,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 4.399976,
    "t_sec": 380157.9,
    "pos": [
      -42.828551,
      -8.508793,
      89.897551
    ],
    "alt_km": 4777.89,
    "vel_kms": 2.253,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 4.412482,
    "t_sec": 381238.5,
    "pos": [
      -42.950464,
      -8.536045,
      90.151964
    ],
    "alt_km": 3328.17,
    "vel_kms": 2.272,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 4.424988,
    "t_sec": 382319.0,
    "pos": [
      -43.072376,
      -8.563296,
      90.406376
    ],
    "alt_km": 1943.3,
    "vel_kms": 2.291,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 4.437494,
    "t_sec": 383399.5,
    "pos": [
      -43.194288,
      -8.590548,
      90.660788
    ],
    "alt_km": 734.45,
    "vel_kms": 2.311,
    "phase": "TRANSLUNAR COAST"
  },
  {
    "day": 4.45,
    "t_sec": 384480.0,
    "pos": [
      -43.3162,
      -8.6178,
      90.9152
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.451029,
    "t_sec": 384568.9,
    "pos": [
      -43.266516,
      -8.619382,
      90.904809
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.452058,
    "t_sec": 384657.8,
    "pos": [
      -43.21702,
      -8.623823,
      90.894541
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.453087,
    "t_sec": 384746.7,
    "pos": [
      -43.167903,
      -8.631096,
      90.884522
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.454116,
    "t_sec": 384835.6,
    "pos": [
      -43.119348,
      -8.641156,
      90.874873
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.455145,
    "t_sec": 384924.5,
    "pos": [
      -43.071538,
      -8.653907,
      90.865642
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.456174,
    "t_sec": 385013.4,
    "pos": [
      -43.024651,
      -8.669303,
      90.857014
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.457203,
    "t_sec": 385102.3,
    "pos": [
      -42.978859,
      -8.68725,
      90.849106
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.458231,
    "t_sec": 385191.2,
    "pos": [
      -42.934325,
      -8.707637,
      90.842024
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.45926,
    "t_sec": 385280.1,
    "pos": [
      -42.891209,
      -8.730337,
      90.835873
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.460289,
    "t_sec": 385369.0,
    "pos": [
      -42.849657,
      -8.75521,
      90.830749
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.461318,
    "t_sec": 385457.9,
    "pos": [
      -42.809809,
      -8.782108,
      90.826745
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.462347,
    "t_sec": 385546.8,
    "pos": [
      -42.771791,
      -8.810886,
      90.823943
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.463376,
    "t_sec": 385635.7,
    "pos": [
      -42.735721,
      -8.841336,
      90.82242
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.464405,
    "t_sec": 385724.6,
    "pos": [
      -42.701703,
      -8.873269,
      90.822246
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.465434,
    "t_sec": 385813.5,
    "pos": [
      -42.669827,
      -8.906486,
      90.823479
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.466463,
    "t_sec": 385902.4,
    "pos": [
      -42.640173,
      -8.940781,
      90.826171
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.467492,
    "t_sec": 385991.3,
    "pos": [
      -42.612804,
      -8.97594,
      90.830364
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.468521,
    "t_sec": 386080.2,
    "pos": [
      -42.587754,
      -9.011729,
      90.836091
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.46955,
    "t_sec": 386169.1,
    "pos": [
      -42.565054,
      -9.047921,
      90.843375
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.470579,
    "t_sec": 386258.0,
    "pos": [
      -42.544746,
      -9.08431,
      90.85223
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.471608,
    "t_sec": 386346.9,
    "pos": [
      -42.526834,
      -9.120672,
      90.86266
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.472636,
    "t_sec": 386435.8,
    "pos": [
      -42.511309,
      -9.156779,
      90.874658
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.473665,
    "t_sec": 386524.7,
    "pos": [
      -42.498148,
      -9.192406,
      90.888208
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.474694,
    "t_sec": 386613.6,
    "pos": [
      -42.487311,
      -9.227333,
      90.903284
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.475723,
    "t_sec": 386702.5,
    "pos": [
      -42.478744,
      -9.261367,
      90.919801
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.476752,
    "t_sec": 386791.4,
    "pos": [
      -42.472381,
      -9.294282,
      90.937742
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.477781,
    "t_sec": 386880.3,
    "pos": [
      -42.468139,
      -9.325862,
      90.957077
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.47881,
    "t_sec": 386969.2,
    "pos": [
      -42.465923,
      -9.355912,
      90.977743
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.479839,
    "t_sec": 387058.1,
    "pos": [
      -42.465628,
      -9.384244,
      90.99967
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.480868,
    "t_sec": 387147.0,
    "pos": [
      -42.467132,
      -9.410682,
      91.022779
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.481897,
    "t_sec": 387235.9,
    "pos": [
      -42.470306,
      -9.435063,
      91.046985
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.482926,
    "t_sec": 387324.8,
    "pos": [
      -42.474973,
      -9.457199,
      91.07216
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.483955,
    "t_sec": 387413.7,
    "pos": [
      -42.481017,
      -9.476987,
      91.098239
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.484984,
    "t_sec": 387502.6,
    "pos": [
      -42.488279,
      -9.494307,
      91.125118
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.486013,
    "t_sec": 387591.5,
    "pos": [
      -42.496593,
      -9.509049,
      91.152688
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.487042,
    "t_sec": 387680.4,
    "pos": [
      -42.505787,
      -9.521123,
      91.180836
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.48807,
    "t_sec": 387769.3,
    "pos": [
      -42.51568,
      -9.530455,
      91.209443
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.489099,
    "t_sec": 387858.2,
    "pos": [
      -42.52609,
      -9.536986,
      91.23839
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.490128,
    "t_sec": 387947.1,
    "pos": [
      -42.536831,
      -9.540677,
      91.267554
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.491157,
    "t_sec": 388036.0,
    "pos": [
      -42.547714,
      -9.541505,
      91.296811
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.492186,
    "t_sec": 388124.9,
    "pos": [
      -42.558549,
      -9.539466,
      91.326037
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.493215,
    "t_sec": 388213.8,
    "pos": [
      -42.569148,
      -9.534574,
      91.355108
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.494244,
    "t_sec": 388302.7,
    "pos": [
      -42.579323,
      -9.526858,
      91.3839
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.495273,
    "t_sec": 388391.6,
    "pos": [
      -42.588889,
      -9.516369,
      91.412293
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.496302,
    "t_sec": 388480.5,
    "pos": [
      -42.597665,
      -9.503173,
      91.440149
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.497331,
    "t_sec": 388569.4,
    "pos": [
      -42.605475,
      -9.487352,
      91.467351
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.49836,
    "t_sec": 388658.3,
    "pos": [
      -42.612148,
      -9.469006,
      91.493806
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.499389,
    "t_sec": 388747.2,
    "pos": [
      -42.617522,
      -9.44825,
      91.519407
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.500418,
    "t_sec": 388836.1,
    "pos": [
      -42.621441,
      -9.425215,
      91.544053
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.501447,
    "t_sec": 388925.0,
    "pos": [
      -42.62376,
      -9.400045,
      91.567648
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.502475,
    "t_sec": 389013.9,
    "pos": [
      -42.624343,
      -9.372898,
      91.590103
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.503504,
    "t_sec": 389102.8,
    "pos": [
      -42.623038,
      -9.34397,
      91.611308
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.504533,
    "t_sec": 389191.7,
    "pos": [
      -42.619748,
      -9.313428,
      91.631206
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.505562,
    "t_sec": 389280.6,
    "pos": [
      -42.614382,
      -9.281451,
      91.64974
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.506591,
    "t_sec": 389369.5,
    "pos": [
      -42.606853,
      -9.248242,
      91.666853
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.50762,
    "t_sec": 389458.4,
    "pos": [
      -42.597084,
      -9.214007,
      91.682495
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.508649,
    "t_sec": 389547.3,
    "pos": [
      -42.585017,
      -9.178962,
      91.696627
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.509678,
    "t_sec": 389636.2,
    "pos": [
      -42.570604,
      -9.143326,
      91.709218
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.510707,
    "t_sec": 389725.1,
    "pos": [
      -42.553814,
      -9.107252,
      91.720248
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.511736,
    "t_sec": 389814.0,
    "pos": [
      -42.53463,
      -9.071033,
      91.729705
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.512765,
    "t_sec": 389902.9,
    "pos": [
      -42.51305,
      -9.034899,
      91.737589
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.513794,
    "t_sec": 389991.8,
    "pos": [
      -42.489087,
      -8.999076,
      91.743907
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.514823,
    "t_sec": 390080.7,
    "pos": [
      -42.462769,
      -8.963788,
      91.748679
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.515852,
    "t_sec": 390169.6,
    "pos": [
      -42.43414,
      -8.929257,
      91.751931
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.516881,
    "t_sec": 390258.5,
    "pos": [
      -42.403247,
      -8.895705,
      91.753687
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.517909,
    "t_sec": 390347.4,
    "pos": [
      -42.370142,
      -8.863364,
      91.75395
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.518938,
    "t_sec": 390436.3,
    "pos": [
      -42.334937,
      -8.832407,
      91.752834
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.519967,
    "t_sec": 390525.2,
    "pos": [
      -42.297731,
      -8.803029,
      91.750404
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.520996,
    "t_sec": 390614.1,
    "pos": [
      -42.258635,
      -8.775414,
      91.746731
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.522025,
    "t_sec": 390703.0,
    "pos": [
      -42.21777,
      -8.749735,
      91.741897
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.523054,
    "t_sec": 390791.9,
    "pos": [
      -42.175269,
      -8.726152,
      91.735989
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.524083,
    "t_sec": 390880.8,
    "pos": [
      -42.131294,
      -8.704813,
      91.7291
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.525112,
    "t_sec": 390969.7,
    "pos": [
      -42.086,
      -8.685854,
      91.721332
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.526141,
    "t_sec": 391058.6,
    "pos": [
      -42.039528,
      -8.669392,
      91.712791
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.52717,
    "t_sec": 391147.5,
    "pos": [
      -41.992047,
      -8.655531,
      91.703586
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.528199,
    "t_sec": 391236.4,
    "pos": [
      -41.943731,
      -8.644358,
      91.693833
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.529228,
    "t_sec": 391325.3,
    "pos": [
      -41.89476,
      -8.635944,
      91.683651
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.530257,
    "t_sec": 391414.2,
    "pos": [
      -41.845319,
      -8.630342,
      91.673159
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.531286,
    "t_sec": 391503.1,
    "pos": [
      -41.795569,
      -8.627587,
      91.662454
    ],
    "alt_km": 100.0,
    "vel_kms": 1.634,
    "phase": "LUNAR POLAR ORBIT (REV 1 \u2014 100 KM)"
  },
  {
    "day": 4.532314,
    "t_sec": 391592.0,
    "pos": [
      -41.745714,
      -8.627747,
      91.651678
    ],
    "alt_km": 99.81,
    "vel_kms": 1.634,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.533343,
    "t_sec": 391680.9,
    "pos": [
      -41.695969,
      -8.630855,
      91.640973
    ],
    "alt_km": 99.28,
    "vel_kms": 1.634,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.534372,
    "t_sec": 391769.8,
    "pos": [
      -41.646528,
      -8.636828,
      91.630469
    ],
    "alt_km": 98.66,
    "vel_kms": 1.634,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.535401,
    "t_sec": 391858.7,
    "pos": [
      -41.597579,
      -8.645618,
      91.620288
    ],
    "alt_km": 98.0,
    "vel_kms": 1.634,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.53643,
    "t_sec": 391947.6,
    "pos": [
      -41.549309,
      -8.657166,
      91.610552
    ],
    "alt_km": 97.29,
    "vel_kms": 1.635,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.537459,
    "t_sec": 392036.5,
    "pos": [
      -41.501897,
      -8.671396,
      91.601381
    ],
    "alt_km": 96.55,
    "vel_kms": 1.635,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.538488,
    "t_sec": 392125.4,
    "pos": [
      -41.455482,
      -8.688215,
      91.592851
    ],
    "alt_km": 95.79,
    "vel_kms": 1.635,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.539517,
    "t_sec": 392214.3,
    "pos": [
      -41.410265,
      -8.707517,
      91.585109
    ],
    "alt_km": 95.0,
    "vel_kms": 1.636,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.540546,
    "t_sec": 392303.2,
    "pos": [
      -41.366408,
      -8.729178,
      91.578259
    ],
    "alt_km": 94.19,
    "vel_kms": 1.636,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.541575,
    "t_sec": 392392.1,
    "pos": [
      -41.324061,
      -8.75306,
      91.572402
    ],
    "alt_km": 93.36,
    "vel_kms": 1.636,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.542604,
    "t_sec": 392481.0,
    "pos": [
      -41.283367,
      -8.779011,
      91.567631
    ],
    "alt_km": 92.51,
    "vel_kms": 1.637,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.543633,
    "t_sec": 392569.9,
    "pos": [
      -41.244456,
      -8.806869,
      91.56403
    ],
    "alt_km": 91.65,
    "vel_kms": 1.637,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.544662,
    "t_sec": 392658.8,
    "pos": [
      -41.207447,
      -8.836448,
      91.561671
    ],
    "alt_km": 90.77,
    "vel_kms": 1.638,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.545691,
    "t_sec": 392747.7,
    "pos": [
      -41.172447,
      -8.867541,
      91.560603
    ],
    "alt_km": 89.88,
    "vel_kms": 1.638,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.546719,
    "t_sec": 392836.6,
    "pos": [
      -41.139552,
      -8.899982,
      91.560917
    ],
    "alt_km": 88.97,
    "vel_kms": 1.638,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.547748,
    "t_sec": 392925.5,
    "pos": [
      -41.108842,
      -8.933566,
      91.562667
    ],
    "alt_km": 88.05,
    "vel_kms": 1.639,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.548777,
    "t_sec": 393014.4,
    "pos": [
      -41.080386,
      -8.968082,
      91.565897
    ],
    "alt_km": 87.12,
    "vel_kms": 1.639,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.549806,
    "t_sec": 393103.3,
    "pos": [
      -41.054235,
      -9.003314,
      91.570642
    ],
    "alt_km": 86.18,
    "vel_kms": 1.64,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.550835,
    "t_sec": 393192.2,
    "pos": [
      -41.03043,
      -9.039041,
      91.576927
    ],
    "alt_km": 85.22,
    "vel_kms": 1.64,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.551864,
    "t_sec": 393281.1,
    "pos": [
      -41.008994,
      -9.075056,
      91.584768
    ],
    "alt_km": 84.26,
    "vel_kms": 1.641,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.552893,
    "t_sec": 393370.0,
    "pos": [
      -40.989937,
      -9.111137,
      91.594172
    ],
    "alt_km": 83.29,
    "vel_kms": 1.641,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.553922,
    "t_sec": 393458.9,
    "pos": [
      -40.973252,
      -9.147039,
      91.605135
    ],
    "alt_km": 82.3,
    "vel_kms": 1.641,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.554951,
    "t_sec": 393547.8,
    "pos": [
      -40.958919,
      -9.182539,
      91.617642
    ],
    "alt_km": 81.31,
    "vel_kms": 1.642,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.55598,
    "t_sec": 393636.7,
    "pos": [
      -40.946902,
      -9.217414,
      91.631671
    ],
    "alt_km": 80.31,
    "vel_kms": 1.642,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.557009,
    "t_sec": 393725.6,
    "pos": [
      -40.937153,
      -9.25145,
      91.647189
    ],
    "alt_km": 79.3,
    "vel_kms": 1.643,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.558038,
    "t_sec": 393814.5,
    "pos": [
      -40.929606,
      -9.284433,
      91.664154
    ],
    "alt_km": 78.28,
    "vel_kms": 1.643,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.559067,
    "t_sec": 393903.4,
    "pos": [
      -40.924159,
      -9.316135,
      91.682489
    ],
    "alt_km": 77.26,
    "vel_kms": 1.644,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.560096,
    "t_sec": 393992.3,
    "pos": [
      -40.920735,
      -9.346373,
      91.70215
    ],
    "alt_km": 76.22,
    "vel_kms": 1.644,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.561125,
    "t_sec": 394081.2,
    "pos": [
      -40.919242,
      -9.374972,
      91.723079
    ],
    "alt_km": 75.18,
    "vel_kms": 1.645,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.562153,
    "t_sec": 394170.1,
    "pos": [
      -40.919565,
      -9.401756,
      91.7452
    ],
    "alt_km": 74.13,
    "vel_kms": 1.645,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.563182,
    "t_sec": 394259.0,
    "pos": [
      -40.921577,
      -9.426558,
      91.768432
    ],
    "alt_km": 73.08,
    "vel_kms": 1.646,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.564211,
    "t_sec": 394347.9,
    "pos": [
      -40.925141,
      -9.449228,
      91.792682
    ],
    "alt_km": 72.01,
    "vel_kms": 1.646,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.56524,
    "t_sec": 394436.8,
    "pos": [
      -40.930109,
      -9.469627,
      91.817855
    ],
    "alt_km": 70.94,
    "vel_kms": 1.647,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.566269,
    "t_sec": 394525.7,
    "pos": [
      -40.936328,
      -9.487629,
      91.843779
    ],
    "alt_km": 69.87,
    "vel_kms": 1.647,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.567298,
    "t_sec": 394614.6,
    "pos": [
      -40.943634,
      -9.503126,
      91.870413
    ],
    "alt_km": 68.79,
    "vel_kms": 1.648,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.568327,
    "t_sec": 394703.5,
    "pos": [
      -40.951857,
      -9.516025,
      91.89765
    ],
    "alt_km": 67.7,
    "vel_kms": 1.648,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.569356,
    "t_sec": 394792.4,
    "pos": [
      -40.960823,
      -9.526248,
      91.925375
    ],
    "alt_km": 66.6,
    "vel_kms": 1.649,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.570385,
    "t_sec": 394881.3,
    "pos": [
      -40.970352,
      -9.533735,
      91.95347
    ],
    "alt_km": 65.5,
    "vel_kms": 1.649,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.571414,
    "t_sec": 394970.2,
    "pos": [
      -40.980261,
      -9.538444,
      91.981815
    ],
    "alt_km": 64.39,
    "vel_kms": 1.65,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.572443,
    "t_sec": 395059.1,
    "pos": [
      -40.990366,
      -9.540356,
      92.010296
    ],
    "alt_km": 63.28,
    "vel_kms": 1.65,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.573472,
    "t_sec": 395148.0,
    "pos": [
      -41.000481,
      -9.539485,
      92.038813
    ],
    "alt_km": 62.16,
    "vel_kms": 1.651,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.574501,
    "t_sec": 395236.9,
    "pos": [
      -41.010419,
      -9.535812,
      92.067214
    ],
    "alt_km": 61.04,
    "vel_kms": 1.651,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.57553,
    "t_sec": 395325.8,
    "pos": [
      -41.019997,
      -9.529364,
      92.095378
    ],
    "alt_km": 59.91,
    "vel_kms": 1.652,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.576558,
    "t_sec": 395414.7,
    "pos": [
      -41.029033,
      -9.520184,
      92.123186
    ],
    "alt_km": 58.77,
    "vel_kms": 1.652,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.577587,
    "t_sec": 395503.6,
    "pos": [
      -41.037348,
      -9.508335,
      92.150521
    ],
    "alt_km": 57.63,
    "vel_kms": 1.653,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.578616,
    "t_sec": 395592.5,
    "pos": [
      -41.04477,
      -9.493895,
      92.177268
    ],
    "alt_km": 56.49,
    "vel_kms": 1.653,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.579645,
    "t_sec": 395681.4,
    "pos": [
      -41.051129,
      -9.476941,
      92.203284
    ],
    "alt_km": 55.34,
    "vel_kms": 1.654,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.580674,
    "t_sec": 395770.3,
    "pos": [
      -41.056266,
      -9.45758,
      92.228456
    ],
    "alt_km": 54.18,
    "vel_kms": 1.654,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.581703,
    "t_sec": 395859.2,
    "pos": [
      -41.060028,
      -9.435956,
      92.252726
    ],
    "alt_km": 53.02,
    "vel_kms": 1.655,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.582732,
    "t_sec": 395948.1,
    "pos": [
      -41.062269,
      -9.412208,
      92.275997
    ],
    "alt_km": 51.86,
    "vel_kms": 1.655,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.583761,
    "t_sec": 396037.0,
    "pos": [
      -41.062857,
      -9.386488,
      92.298181
    ],
    "alt_km": 50.69,
    "vel_kms": 1.656,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.58479,
    "t_sec": 396125.9,
    "pos": [
      -41.061667,
      -9.358959,
      92.319198
    ],
    "alt_km": 49.52,
    "vel_kms": 1.656,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.585819,
    "t_sec": 396214.8,
    "pos": [
      -41.058586,
      -9.329796,
      92.338972
    ],
    "alt_km": 48.34,
    "vel_kms": 1.657,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.586848,
    "t_sec": 396303.6,
    "pos": [
      -41.053487,
      -9.299184,
      92.357412
    ],
    "alt_km": 47.16,
    "vel_kms": 1.658,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.587877,
    "t_sec": 396392.5,
    "pos": [
      -41.046297,
      -9.267317,
      92.374476
    ],
    "alt_km": 45.97,
    "vel_kms": 1.658,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.588906,
    "t_sec": 396481.4,
    "pos": [
      -41.036954,
      -9.234395,
      92.390124
    ],
    "alt_km": 44.78,
    "vel_kms": 1.659,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.589935,
    "t_sec": 396570.3,
    "pos": [
      -41.025394,
      -9.200628,
      92.404317
    ],
    "alt_km": 43.58,
    "vel_kms": 1.659,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.590964,
    "t_sec": 396659.2,
    "pos": [
      -41.011572,
      -9.166226,
      92.417023
    ],
    "alt_km": 42.38,
    "vel_kms": 1.66,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.591992,
    "t_sec": 396748.1,
    "pos": [
      -40.995452,
      -9.131406,
      92.42822
    ],
    "alt_km": 41.17,
    "vel_kms": 1.66,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.593021,
    "t_sec": 396837.0,
    "pos": [
      -40.977018,
      -9.096387,
      92.437896
    ],
    "alt_km": 39.97,
    "vel_kms": 1.661,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.59405,
    "t_sec": 396925.9,
    "pos": [
      -40.956228,
      -9.061389,
      92.446049
    ],
    "alt_km": 38.75,
    "vel_kms": 1.661,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.595079,
    "t_sec": 397014.8,
    "pos": [
      -40.933127,
      -9.02663,
      92.452685
    ],
    "alt_km": 37.54,
    "vel_kms": 1.662,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.596108,
    "t_sec": 397103.7,
    "pos": [
      -40.907741,
      -8.992328,
      92.457819
    ],
    "alt_km": 36.32,
    "vel_kms": 1.663,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.597137,
    "t_sec": 397192.6,
    "pos": [
      -40.880109,
      -8.958696,
      92.461479
    ],
    "alt_km": 35.09,
    "vel_kms": 1.663,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.598166,
    "t_sec": 397281.5,
    "pos": [
      -40.850284,
      -8.925946,
      92.463697
    ],
    "alt_km": 33.86,
    "vel_kms": 1.664,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.599195,
    "t_sec": 397370.4,
    "pos": [
      -40.818332,
      -8.894279,
      92.464519
    ],
    "alt_km": 32.63,
    "vel_kms": 1.664,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.600224,
    "t_sec": 397459.3,
    "pos": [
      -40.784341,
      -8.863894,
      92.463988
    ],
    "alt_km": 31.39,
    "vel_kms": 1.665,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.601253,
    "t_sec": 397548.2,
    "pos": [
      -40.748425,
      -8.834978,
      92.462144
    ],
    "alt_km": 30.15,
    "vel_kms": 1.665,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.602282,
    "t_sec": 397637.1,
    "pos": [
      -40.710658,
      -8.807711,
      92.459085
    ],
    "alt_km": 28.91,
    "vel_kms": 1.666,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.603311,
    "t_sec": 397726.0,
    "pos": [
      -40.671157,
      -8.782261,
      92.454886
    ],
    "alt_km": 27.66,
    "vel_kms": 1.667,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.60434,
    "t_sec": 397814.9,
    "pos": [
      -40.630049,
      -8.758786,
      92.449632
    ],
    "alt_km": 26.41,
    "vel_kms": 1.667,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.605369,
    "t_sec": 397903.8,
    "pos": [
      -40.587469,
      -8.737428,
      92.443411
    ],
    "alt_km": 25.16,
    "vel_kms": 1.668,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.606397,
    "t_sec": 397992.7,
    "pos": [
      -40.543563,
      -8.71832,
      92.436319
    ],
    "alt_km": 23.9,
    "vel_kms": 1.668,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.607426,
    "t_sec": 398081.6,
    "pos": [
      -40.498468,
      -8.701577,
      92.42844
    ],
    "alt_km": 22.64,
    "vel_kms": 1.669,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.608455,
    "t_sec": 398170.5,
    "pos": [
      -40.452342,
      -8.687302,
      92.419876
    ],
    "alt_km": 21.37,
    "vel_kms": 1.67,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.609484,
    "t_sec": 398259.4,
    "pos": [
      -40.40537,
      -8.67558,
      92.410758
    ],
    "alt_km": 20.11,
    "vel_kms": 1.67,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.610513,
    "t_sec": 398348.3,
    "pos": [
      -40.357725,
      -8.666482,
      92.401197
    ],
    "alt_km": 18.83,
    "vel_kms": 1.671,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.611542,
    "t_sec": 398437.2,
    "pos": [
      -40.309583,
      -8.660061,
      92.39131
    ],
    "alt_km": 17.56,
    "vel_kms": 1.671,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.612571,
    "t_sec": 398526.1,
    "pos": [
      -40.261122,
      -8.656353,
      92.381213
    ],
    "alt_km": 16.28,
    "vel_kms": 1.672,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.6136,
    "t_sec": 398615.0,
    "pos": [
      -40.212522,
      -8.655379,
      92.371025
    ],
    "alt_km": 15.0,
    "vel_kms": 1.673,
    "phase": "LUNAR DESCENT ORBIT (REV 2 \u2014 PERILUNE 15 KM)"
  },
  {
    "day": 4.6136,
    "t_sec": 398615.0,
    "pos": [
      -40.161707,
      -9.528834,
      92.337646
    ],
    "alt_km": 15.0,
    "vel_kms": 1.69,
    "fuel_kg": 449.47,
    "throttle_pct": 78.0,
    "pitch_deg": -15.0,
    "g_force": 0.18,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.613658,
    "t_sec": 398620.0,
    "pos": [
      -40.160733,
      -9.528795,
      92.338228
    ],
    "alt_km": 14.741,
    "vel_kms": 1.649,
    "fuel_kg": 446.82,
    "throttle_pct": 78.1,
    "pitch_deg": -14.6,
    "g_force": 0.18,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.613716,
    "t_sec": 398625.0,
    "pos": [
      -40.159759,
      -9.528757,
      92.33881
    ],
    "alt_km": 14.485,
    "vel_kms": 1.619,
    "fuel_kg": 444.17,
    "throttle_pct": 78.2,
    "pitch_deg": -14.3,
    "g_force": 0.18,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.613774,
    "t_sec": 398630.0,
    "pos": [
      -40.158785,
      -9.528719,
      92.339393
    ],
    "alt_km": 14.231,
    "vel_kms": 1.591,
    "fuel_kg": 441.52,
    "throttle_pct": 78.3,
    "pitch_deg": -13.9,
    "g_force": 0.18,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.613831,
    "t_sec": 398635.0,
    "pos": [
      -40.157809,
      -9.528682,
      92.339975
    ],
    "alt_km": 13.98,
    "vel_kms": 1.566,
    "fuel_kg": 438.86,
    "throttle_pct": 78.4,
    "pitch_deg": -13.5,
    "g_force": 0.19,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.613889,
    "t_sec": 398640.0,
    "pos": [
      -40.156835,
      -9.528645,
      92.340558
    ],
    "alt_km": 13.732,
    "vel_kms": 1.542,
    "fuel_kg": 436.2,
    "throttle_pct": 78.5,
    "pitch_deg": -13.2,
    "g_force": 0.19,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.613947,
    "t_sec": 398645.0,
    "pos": [
      -40.155859,
      -9.528606,
      92.341138
    ],
    "alt_km": 13.486,
    "vel_kms": 1.518,
    "fuel_kg": 433.53,
    "throttle_pct": 78.6,
    "pitch_deg": -12.8,
    "g_force": 0.19,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.614005,
    "t_sec": 398650.0,
    "pos": [
      -40.154882,
      -9.528569,
      92.341718
    ],
    "alt_km": 13.243,
    "vel_kms": 1.496,
    "fuel_kg": 430.87,
    "throttle_pct": 78.7,
    "pitch_deg": -12.4,
    "g_force": 0.19,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.614063,
    "t_sec": 398655.0,
    "pos": [
      -40.153905,
      -9.528532,
      92.342298
    ],
    "alt_km": 13.004,
    "vel_kms": 1.474,
    "fuel_kg": 428.19,
    "throttle_pct": 78.8,
    "pitch_deg": -12.1,
    "g_force": 0.19,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.614121,
    "t_sec": 398660.0,
    "pos": [
      -40.152928,
      -9.528495,
      92.342878
    ],
    "alt_km": 12.766,
    "vel_kms": 1.452,
    "fuel_kg": 425.52,
    "throttle_pct": 78.9,
    "pitch_deg": -11.7,
    "g_force": 0.19,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.614179,
    "t_sec": 398665.0,
    "pos": [
      -40.151951,
      -9.528459,
      92.343458
    ],
    "alt_km": 12.531,
    "vel_kms": 1.431,
    "fuel_kg": 422.84,
    "throttle_pct": 79.0,
    "pitch_deg": -11.4,
    "g_force": 0.19,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.614237,
    "t_sec": 398670.0,
    "pos": [
      -40.150973,
      -9.528425,
      92.344037
    ],
    "alt_km": 12.3,
    "vel_kms": 1.411,
    "fuel_kg": 420.16,
    "throttle_pct": 79.1,
    "pitch_deg": -11.0,
    "g_force": 0.19,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.614294,
    "t_sec": 398675.0,
    "pos": [
      -40.149996,
      -9.528391,
      92.344618
    ],
    "alt_km": 12.07,
    "vel_kms": 1.391,
    "fuel_kg": 417.48,
    "throttle_pct": 79.1,
    "pitch_deg": -10.6,
    "g_force": 0.19,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.614352,
    "t_sec": 398680.0,
    "pos": [
      -40.149019,
      -9.528357,
      92.345198
    ],
    "alt_km": 11.844,
    "vel_kms": 1.371,
    "fuel_kg": 414.79,
    "throttle_pct": 79.2,
    "pitch_deg": -10.3,
    "g_force": 0.19,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.61441,
    "t_sec": 398685.0,
    "pos": [
      -40.148041,
      -9.528323,
      92.345778
    ],
    "alt_km": 11.62,
    "vel_kms": 1.352,
    "fuel_kg": 412.1,
    "throttle_pct": 79.3,
    "pitch_deg": -9.9,
    "g_force": 0.19,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.614468,
    "t_sec": 398690.0,
    "pos": [
      -40.147064,
      -9.528291,
      92.346357
    ],
    "alt_km": 11.399,
    "vel_kms": 1.332,
    "fuel_kg": 409.41,
    "throttle_pct": 79.4,
    "pitch_deg": -9.5,
    "g_force": 0.19,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.614526,
    "t_sec": 398695.0,
    "pos": [
      -40.146087,
      -9.528259,
      92.346936
    ],
    "alt_km": 11.181,
    "vel_kms": 1.313,
    "fuel_kg": 406.71,
    "throttle_pct": 79.5,
    "pitch_deg": -9.2,
    "g_force": 0.2,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.614584,
    "t_sec": 398700.0,
    "pos": [
      -40.145108,
      -9.528227,
      92.347516
    ],
    "alt_km": 10.965,
    "vel_kms": 1.295,
    "fuel_kg": 404.02,
    "throttle_pct": 79.6,
    "pitch_deg": -8.8,
    "g_force": 0.2,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.614642,
    "t_sec": 398705.0,
    "pos": [
      -40.144131,
      -9.528196,
      92.348096
    ],
    "alt_km": 10.752,
    "vel_kms": 1.276,
    "fuel_kg": 401.31,
    "throttle_pct": 79.7,
    "pitch_deg": -8.4,
    "g_force": 0.2,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.6147,
    "t_sec": 398710.0,
    "pos": [
      -40.143153,
      -9.528166,
      92.348675
    ],
    "alt_km": 10.542,
    "vel_kms": 1.258,
    "fuel_kg": 398.61,
    "throttle_pct": 79.7,
    "pitch_deg": -8.1,
    "g_force": 0.2,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.614757,
    "t_sec": 398715.0,
    "pos": [
      -40.142175,
      -9.528137,
      92.349254
    ],
    "alt_km": 10.334,
    "vel_kms": 1.24,
    "fuel_kg": 395.9,
    "throttle_pct": 79.8,
    "pitch_deg": -7.7,
    "g_force": 0.2,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.614815,
    "t_sec": 398720.0,
    "pos": [
      -40.141197,
      -9.528108,
      92.349834
    ],
    "alt_km": 10.129,
    "vel_kms": 1.222,
    "fuel_kg": 393.19,
    "throttle_pct": 79.9,
    "pitch_deg": -7.3,
    "g_force": 0.2,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.614873,
    "t_sec": 398725.0,
    "pos": [
      -40.140219,
      -9.528079,
      92.350413
    ],
    "alt_km": 9.927,
    "vel_kms": 1.204,
    "fuel_kg": 390.48,
    "throttle_pct": 80.0,
    "pitch_deg": -7.0,
    "g_force": 0.2,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.614931,
    "t_sec": 398730.0,
    "pos": [
      -40.139241,
      -9.528052,
      92.350992
    ],
    "alt_km": 9.728,
    "vel_kms": 1.186,
    "fuel_kg": 387.77,
    "throttle_pct": 80.1,
    "pitch_deg": -6.6,
    "g_force": 0.2,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.614989,
    "t_sec": 398735.0,
    "pos": [
      -40.138263,
      -9.528025,
      92.351571
    ],
    "alt_km": 9.531,
    "vel_kms": 1.169,
    "fuel_kg": 385.05,
    "throttle_pct": 80.1,
    "pitch_deg": -6.2,
    "g_force": 0.2,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.615047,
    "t_sec": 398740.0,
    "pos": [
      -40.137285,
      -9.527999,
      92.352151
    ],
    "alt_km": 9.337,
    "vel_kms": 1.152,
    "fuel_kg": 382.33,
    "throttle_pct": 80.2,
    "pitch_deg": -5.9,
    "g_force": 0.2,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.615105,
    "t_sec": 398745.0,
    "pos": [
      -40.136306,
      -9.527973,
      92.35273
    ],
    "alt_km": 9.146,
    "vel_kms": 1.134,
    "fuel_kg": 379.61,
    "throttle_pct": 80.3,
    "pitch_deg": -5.5,
    "g_force": 0.2,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.615163,
    "t_sec": 398750.0,
    "pos": [
      -40.135327,
      -9.527948,
      92.353308
    ],
    "alt_km": 8.957,
    "vel_kms": 1.117,
    "fuel_kg": 376.89,
    "throttle_pct": 80.3,
    "pitch_deg": -5.2,
    "g_force": 0.2,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.61522,
    "t_sec": 398755.0,
    "pos": [
      -40.134349,
      -9.527923,
      92.353888
    ],
    "alt_km": 8.772,
    "vel_kms": 1.101,
    "fuel_kg": 374.16,
    "throttle_pct": 80.4,
    "pitch_deg": -4.8,
    "g_force": 0.21,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.615278,
    "t_sec": 398760.0,
    "pos": [
      -40.13337,
      -9.527899,
      92.354467
    ],
    "alt_km": 8.589,
    "vel_kms": 1.084,
    "fuel_kg": 371.43,
    "throttle_pct": 80.4,
    "pitch_deg": -4.4,
    "g_force": 0.21,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.615336,
    "t_sec": 398765.0,
    "pos": [
      -40.132391,
      -9.527875,
      92.355046
    ],
    "alt_km": 8.408,
    "vel_kms": 1.067,
    "fuel_kg": 368.7,
    "throttle_pct": 80.5,
    "pitch_deg": -4.1,
    "g_force": 0.21,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.615394,
    "t_sec": 398770.0,
    "pos": [
      -40.131413,
      -9.527853,
      92.355624
    ],
    "alt_km": 8.23,
    "vel_kms": 1.051,
    "fuel_kg": 365.97,
    "throttle_pct": 80.5,
    "pitch_deg": -3.7,
    "g_force": 0.21,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.615452,
    "t_sec": 398775.0,
    "pos": [
      -40.130433,
      -9.527831,
      92.356203
    ],
    "alt_km": 8.056,
    "vel_kms": 1.034,
    "fuel_kg": 363.24,
    "throttle_pct": 80.6,
    "pitch_deg": -3.3,
    "g_force": 0.21,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.61551,
    "t_sec": 398780.0,
    "pos": [
      -40.129455,
      -9.527809,
      92.356782
    ],
    "alt_km": 7.883,
    "vel_kms": 1.018,
    "fuel_kg": 360.5,
    "throttle_pct": 80.6,
    "pitch_deg": -3.0,
    "g_force": 0.21,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.615568,
    "t_sec": 398785.0,
    "pos": [
      -40.128476,
      -9.527788,
      92.357361
    ],
    "alt_km": 7.714,
    "vel_kms": 1.001,
    "fuel_kg": 357.77,
    "throttle_pct": 80.7,
    "pitch_deg": -2.6,
    "g_force": 0.21,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.615625,
    "t_sec": 398790.0,
    "pos": [
      -40.127496,
      -9.527769,
      92.357939
    ],
    "alt_km": 7.547,
    "vel_kms": 0.985,
    "fuel_kg": 355.03,
    "throttle_pct": 80.7,
    "pitch_deg": -2.2,
    "g_force": 0.21,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.615683,
    "t_sec": 398795.0,
    "pos": [
      -40.126517,
      -9.527749,
      92.358518
    ],
    "alt_km": 7.383,
    "vel_kms": 0.969,
    "fuel_kg": 352.29,
    "throttle_pct": 80.8,
    "pitch_deg": -1.9,
    "g_force": 0.21,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.615741,
    "t_sec": 398800.0,
    "pos": [
      -40.125538,
      -9.52773,
      92.359096
    ],
    "alt_km": 7.221,
    "vel_kms": 0.953,
    "fuel_kg": 349.55,
    "throttle_pct": 80.8,
    "pitch_deg": -1.5,
    "g_force": 0.21,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.615799,
    "t_sec": 398805.0,
    "pos": [
      -40.124558,
      -9.527711,
      92.359675
    ],
    "alt_km": 7.063,
    "vel_kms": 0.937,
    "fuel_kg": 346.81,
    "throttle_pct": 80.8,
    "pitch_deg": -1.1,
    "g_force": 0.21,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.615857,
    "t_sec": 398810.0,
    "pos": [
      -40.123579,
      -9.527694,
      92.360253
    ],
    "alt_km": 6.907,
    "vel_kms": 0.922,
    "fuel_kg": 344.06,
    "throttle_pct": 80.9,
    "pitch_deg": -0.8,
    "g_force": 0.21,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.615915,
    "t_sec": 398815.0,
    "pos": [
      -40.1226,
      -9.527676,
      92.360832
    ],
    "alt_km": 6.753,
    "vel_kms": 0.906,
    "fuel_kg": 341.32,
    "throttle_pct": 80.9,
    "pitch_deg": -0.4,
    "g_force": 0.22,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.615973,
    "t_sec": 398820.0,
    "pos": [
      -40.12162,
      -9.52766,
      92.36141
    ],
    "alt_km": 6.603,
    "vel_kms": 0.89,
    "fuel_kg": 338.57,
    "throttle_pct": 80.9,
    "pitch_deg": -0.1,
    "g_force": 0.22,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.616031,
    "t_sec": 398825.0,
    "pos": [
      -40.120641,
      -9.527644,
      92.361989
    ],
    "alt_km": 6.455,
    "vel_kms": 0.875,
    "fuel_kg": 335.83,
    "throttle_pct": 80.9,
    "pitch_deg": 0.3,
    "g_force": 0.22,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.616088,
    "t_sec": 398830.0,
    "pos": [
      -40.119661,
      -9.527628,
      92.362566
    ],
    "alt_km": 6.31,
    "vel_kms": 0.859,
    "fuel_kg": 333.08,
    "throttle_pct": 81.0,
    "pitch_deg": 0.7,
    "g_force": 0.22,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.616146,
    "t_sec": 398835.0,
    "pos": [
      -40.118681,
      -9.527614,
      92.363145
    ],
    "alt_km": 6.168,
    "vel_kms": 0.844,
    "fuel_kg": 330.34,
    "throttle_pct": 81.0,
    "pitch_deg": 1.0,
    "g_force": 0.22,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.616204,
    "t_sec": 398840.0,
    "pos": [
      -40.117701,
      -9.5276,
      92.363723
    ],
    "alt_km": 6.028,
    "vel_kms": 0.828,
    "fuel_kg": 327.59,
    "throttle_pct": 81.0,
    "pitch_deg": 1.4,
    "g_force": 0.22,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.616262,
    "t_sec": 398845.0,
    "pos": [
      -40.116722,
      -9.527586,
      92.364301
    ],
    "alt_km": 5.891,
    "vel_kms": 0.813,
    "fuel_kg": 324.84,
    "throttle_pct": 81.0,
    "pitch_deg": 1.8,
    "g_force": 0.22,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.61632,
    "t_sec": 398850.0,
    "pos": [
      -40.115741,
      -9.527574,
      92.364879
    ],
    "alt_km": 5.757,
    "vel_kms": 0.798,
    "fuel_kg": 322.09,
    "throttle_pct": 81.0,
    "pitch_deg": 2.1,
    "g_force": 0.22,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.616378,
    "t_sec": 398855.0,
    "pos": [
      -40.114762,
      -9.527562,
      92.365457
    ],
    "alt_km": 5.625,
    "vel_kms": 0.783,
    "fuel_kg": 319.35,
    "throttle_pct": 81.0,
    "pitch_deg": 2.5,
    "g_force": 0.22,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.616436,
    "t_sec": 398860.0,
    "pos": [
      -40.113782,
      -9.52755,
      92.366035
    ],
    "alt_km": 5.496,
    "vel_kms": 0.768,
    "fuel_kg": 316.6,
    "throttle_pct": 81.0,
    "pitch_deg": 2.9,
    "g_force": 0.22,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.616494,
    "t_sec": 398865.0,
    "pos": [
      -40.112801,
      -9.527539,
      92.366613
    ],
    "alt_km": 5.37,
    "vel_kms": 0.752,
    "fuel_kg": 313.85,
    "throttle_pct": 81.0,
    "pitch_deg": 3.2,
    "g_force": 0.22,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.616551,
    "t_sec": 398870.0,
    "pos": [
      -40.111821,
      -9.527529,
      92.367191
    ],
    "alt_km": 5.247,
    "vel_kms": 0.738,
    "fuel_kg": 311.1,
    "throttle_pct": 81.0,
    "pitch_deg": 3.6,
    "g_force": 0.22,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.616609,
    "t_sec": 398875.0,
    "pos": [
      -40.110841,
      -9.527519,
      92.367769
    ],
    "alt_km": 5.126,
    "vel_kms": 0.723,
    "fuel_kg": 308.36,
    "throttle_pct": 81.0,
    "pitch_deg": 4.0,
    "g_force": 0.22,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.616667,
    "t_sec": 398880.0,
    "pos": [
      -40.10986,
      -9.52751,
      92.368347
    ],
    "alt_km": 5.008,
    "vel_kms": 0.708,
    "fuel_kg": 305.61,
    "throttle_pct": 81.0,
    "pitch_deg": 4.3,
    "g_force": 0.23,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.616725,
    "t_sec": 398885.0,
    "pos": [
      -40.10888,
      -9.527502,
      92.368925
    ],
    "alt_km": 4.893,
    "vel_kms": 0.693,
    "fuel_kg": 302.86,
    "throttle_pct": 80.9,
    "pitch_deg": 4.7,
    "g_force": 0.23,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.616783,
    "t_sec": 398890.0,
    "pos": [
      -40.1079,
      -9.527494,
      92.369502
    ],
    "alt_km": 4.78,
    "vel_kms": 0.678,
    "fuel_kg": 300.12,
    "throttle_pct": 80.9,
    "pitch_deg": 5.1,
    "g_force": 0.23,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.616841,
    "t_sec": 398895.0,
    "pos": [
      -40.106919,
      -9.527486,
      92.37008
    ],
    "alt_km": 4.67,
    "vel_kms": 0.663,
    "fuel_kg": 297.38,
    "throttle_pct": 80.9,
    "pitch_deg": 5.4,
    "g_force": 0.23,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.616899,
    "t_sec": 398900.0,
    "pos": [
      -40.105938,
      -9.52748,
      92.370658
    ],
    "alt_km": 4.563,
    "vel_kms": 0.649,
    "fuel_kg": 294.63,
    "throttle_pct": 80.9,
    "pitch_deg": 5.8,
    "g_force": 0.23,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.616956,
    "t_sec": 398905.0,
    "pos": [
      -40.104958,
      -9.527474,
      92.371235
    ],
    "alt_km": 4.459,
    "vel_kms": 0.634,
    "fuel_kg": 291.89,
    "throttle_pct": 80.8,
    "pitch_deg": 6.1,
    "g_force": 0.23,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.617014,
    "t_sec": 398910.0,
    "pos": [
      -40.103977,
      -9.527469,
      92.371812
    ],
    "alt_km": 4.357,
    "vel_kms": 0.62,
    "fuel_kg": 289.15,
    "throttle_pct": 80.8,
    "pitch_deg": 6.5,
    "g_force": 0.23,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.617072,
    "t_sec": 398915.0,
    "pos": [
      -40.102996,
      -9.527465,
      92.37239
    ],
    "alt_km": 4.258,
    "vel_kms": 0.605,
    "fuel_kg": 286.41,
    "throttle_pct": 80.8,
    "pitch_deg": 6.9,
    "g_force": 0.23,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.61713,
    "t_sec": 398920.0,
    "pos": [
      -40.102016,
      -9.52746,
      92.372968
    ],
    "alt_km": 4.162,
    "vel_kms": 0.591,
    "fuel_kg": 283.67,
    "throttle_pct": 80.7,
    "pitch_deg": 7.2,
    "g_force": 0.23,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.617188,
    "t_sec": 398925.0,
    "pos": [
      -40.101034,
      -9.527457,
      92.373545
    ],
    "alt_km": 4.068,
    "vel_kms": 0.576,
    "fuel_kg": 280.93,
    "throttle_pct": 80.7,
    "pitch_deg": 7.6,
    "g_force": 0.23,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.617246,
    "t_sec": 398930.0,
    "pos": [
      -40.100053,
      -9.527454,
      92.374122
    ],
    "alt_km": 3.977,
    "vel_kms": 0.562,
    "fuel_kg": 278.19,
    "throttle_pct": 80.6,
    "pitch_deg": 8.0,
    "g_force": 0.23,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.617304,
    "t_sec": 398935.0,
    "pos": [
      -40.099073,
      -9.527452,
      92.3747
    ],
    "alt_km": 3.889,
    "vel_kms": 0.548,
    "fuel_kg": 275.46,
    "throttle_pct": 80.6,
    "pitch_deg": 8.3,
    "g_force": 0.23,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.617362,
    "t_sec": 398940.0,
    "pos": [
      -40.098091,
      -9.52745,
      92.375277
    ],
    "alt_km": 3.803,
    "vel_kms": 0.533,
    "fuel_kg": 272.73,
    "throttle_pct": 80.5,
    "pitch_deg": 8.7,
    "g_force": 0.23,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.617419,
    "t_sec": 398945.0,
    "pos": [
      -40.09711,
      -9.527449,
      92.375855
    ],
    "alt_km": 3.721,
    "vel_kms": 0.519,
    "fuel_kg": 269.99,
    "throttle_pct": 80.5,
    "pitch_deg": 9.1,
    "g_force": 0.24,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.617477,
    "t_sec": 398950.0,
    "pos": [
      -40.096129,
      -9.527448,
      92.376431
    ],
    "alt_km": 3.641,
    "vel_kms": 0.505,
    "fuel_kg": 267.27,
    "throttle_pct": 80.4,
    "pitch_deg": 9.4,
    "g_force": 0.24,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.617535,
    "t_sec": 398955.0,
    "pos": [
      -40.095147,
      -9.527449,
      92.377009
    ],
    "alt_km": 3.563,
    "vel_kms": 0.491,
    "fuel_kg": 264.54,
    "throttle_pct": 80.4,
    "pitch_deg": 9.8,
    "g_force": 0.24,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.617593,
    "t_sec": 398960.0,
    "pos": [
      -40.094166,
      -9.527449,
      92.377586
    ],
    "alt_km": 3.489,
    "vel_kms": 0.477,
    "fuel_kg": 261.81,
    "throttle_pct": 80.3,
    "pitch_deg": 10.2,
    "g_force": 0.24,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.617651,
    "t_sec": 398965.0,
    "pos": [
      -40.093185,
      -9.527451,
      92.378164
    ],
    "alt_km": 3.417,
    "vel_kms": 0.463,
    "fuel_kg": 259.09,
    "throttle_pct": 80.3,
    "pitch_deg": 10.5,
    "g_force": 0.24,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.617709,
    "t_sec": 398970.0,
    "pos": [
      -40.092203,
      -9.527454,
      92.37874
    ],
    "alt_km": 3.348,
    "vel_kms": 0.449,
    "fuel_kg": 256.37,
    "throttle_pct": 80.2,
    "pitch_deg": 10.9,
    "g_force": 0.24,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.617767,
    "t_sec": 398975.0,
    "pos": [
      -40.091222,
      -9.527457,
      92.379317
    ],
    "alt_km": 3.281,
    "vel_kms": 0.435,
    "fuel_kg": 253.65,
    "throttle_pct": 80.1,
    "pitch_deg": 11.2,
    "g_force": 0.24,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.617825,
    "t_sec": 398980.0,
    "pos": [
      -40.090241,
      -9.52746,
      92.379895
    ],
    "alt_km": 3.217,
    "vel_kms": 0.421,
    "fuel_kg": 250.93,
    "throttle_pct": 80.1,
    "pitch_deg": 11.6,
    "g_force": 0.24,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.617882,
    "t_sec": 398985.0,
    "pos": [
      -40.089259,
      -9.527464,
      92.380472
    ],
    "alt_km": 3.156,
    "vel_kms": 0.407,
    "fuel_kg": 248.22,
    "throttle_pct": 80.0,
    "pitch_deg": 12.0,
    "g_force": 0.24,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.61794,
    "t_sec": 398990.0,
    "pos": [
      -40.088277,
      -9.527468,
      92.381048
    ],
    "alt_km": 3.098,
    "vel_kms": 0.393,
    "fuel_kg": 245.51,
    "throttle_pct": 79.9,
    "pitch_deg": 12.3,
    "g_force": 0.24,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.617998,
    "t_sec": 398995.0,
    "pos": [
      -40.087296,
      -9.527473,
      92.381625
    ],
    "alt_km": 3.042,
    "vel_kms": 0.379,
    "fuel_kg": 242.8,
    "throttle_pct": 79.8,
    "pitch_deg": 12.7,
    "g_force": 0.24,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.618056,
    "t_sec": 399000.0,
    "pos": [
      -40.086313,
      -9.527479,
      92.382202
    ],
    "alt_km": 2.99,
    "vel_kms": 0.366,
    "fuel_kg": 240.09,
    "throttle_pct": 79.7,
    "pitch_deg": 13.1,
    "g_force": 0.24,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.618114,
    "t_sec": 399005.0,
    "pos": [
      -40.085332,
      -9.527486,
      92.38278
    ],
    "alt_km": 2.939,
    "vel_kms": 0.352,
    "fuel_kg": 237.39,
    "throttle_pct": 79.7,
    "pitch_deg": 13.4,
    "g_force": 0.24,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.618172,
    "t_sec": 399010.0,
    "pos": [
      -40.08435,
      -9.527493,
      92.383356
    ],
    "alt_km": 2.892,
    "vel_kms": 0.338,
    "fuel_kg": 234.69,
    "throttle_pct": 79.6,
    "pitch_deg": 13.8,
    "g_force": 0.24,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.61823,
    "t_sec": 399015.0,
    "pos": [
      -40.083368,
      -9.5275,
      92.383933
    ],
    "alt_km": 2.847,
    "vel_kms": 0.324,
    "fuel_kg": 231.99,
    "throttle_pct": 79.5,
    "pitch_deg": 14.2,
    "g_force": 0.25,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.618288,
    "t_sec": 399020.0,
    "pos": [
      -40.082386,
      -9.527509,
      92.38451
    ],
    "alt_km": 2.805,
    "vel_kms": 0.311,
    "fuel_kg": 229.29,
    "throttle_pct": 79.4,
    "pitch_deg": 14.5,
    "g_force": 0.25,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.618345,
    "t_sec": 399025.0,
    "pos": [
      -40.081405,
      -9.527518,
      92.385087
    ],
    "alt_km": 2.766,
    "vel_kms": 0.297,
    "fuel_kg": 226.6,
    "throttle_pct": 79.3,
    "pitch_deg": 14.9,
    "g_force": 0.25,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.618403,
    "t_sec": 399030.0,
    "pos": [
      -40.080422,
      -9.527528,
      92.385663
    ],
    "alt_km": 2.729,
    "vel_kms": 0.284,
    "fuel_kg": 223.91,
    "throttle_pct": 79.2,
    "pitch_deg": 15.3,
    "g_force": 0.25,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.618461,
    "t_sec": 399035.0,
    "pos": [
      -40.07944,
      -9.527538,
      92.38624
    ],
    "alt_km": 2.695,
    "vel_kms": 0.27,
    "fuel_kg": 221.23,
    "throttle_pct": 79.1,
    "pitch_deg": 15.6,
    "g_force": 0.25,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.618519,
    "t_sec": 399040.0,
    "pos": [
      -40.078458,
      -9.527549,
      92.386816
    ],
    "alt_km": 2.664,
    "vel_kms": 0.257,
    "fuel_kg": 218.54,
    "throttle_pct": 79.1,
    "pitch_deg": 16.0,
    "g_force": 0.25,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.618577,
    "t_sec": 399045.0,
    "pos": [
      -40.077475,
      -9.52756,
      92.387393
    ],
    "alt_km": 2.636,
    "vel_kms": 0.243,
    "fuel_kg": 215.86,
    "throttle_pct": 79.0,
    "pitch_deg": 16.4,
    "g_force": 0.25,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.618635,
    "t_sec": 399050.0,
    "pos": [
      -40.076494,
      -9.527572,
      92.387969
    ],
    "alt_km": 2.61,
    "vel_kms": 0.23,
    "fuel_kg": 213.19,
    "throttle_pct": 78.9,
    "pitch_deg": 16.7,
    "g_force": 0.25,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.618693,
    "t_sec": 399055.0,
    "pos": [
      -40.075512,
      -9.527585,
      92.388546
    ],
    "alt_km": 2.587,
    "vel_kms": 0.216,
    "fuel_kg": 210.51,
    "throttle_pct": 78.8,
    "pitch_deg": 17.1,
    "g_force": 0.25,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.61875,
    "t_sec": 399060.0,
    "pos": [
      -40.074529,
      -9.527598,
      92.389123
    ],
    "alt_km": 2.567,
    "vel_kms": 0.203,
    "fuel_kg": 207.84,
    "throttle_pct": 78.7,
    "pitch_deg": 17.4,
    "g_force": 0.25,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.618808,
    "t_sec": 399065.0,
    "pos": [
      -40.073547,
      -9.527612,
      92.389699
    ],
    "alt_km": 2.549,
    "vel_kms": 0.19,
    "fuel_kg": 205.18,
    "throttle_pct": 78.6,
    "pitch_deg": 17.8,
    "g_force": 0.25,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.618866,
    "t_sec": 399070.0,
    "pos": [
      -40.072564,
      -9.527627,
      92.390275
    ],
    "alt_km": 2.534,
    "vel_kms": 0.176,
    "fuel_kg": 202.51,
    "throttle_pct": 78.5,
    "pitch_deg": 18.2,
    "g_force": 0.25,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.618924,
    "t_sec": 399075.0,
    "pos": [
      -40.071581,
      -9.527642,
      92.390852
    ],
    "alt_km": 2.522,
    "vel_kms": 0.163,
    "fuel_kg": 199.85,
    "throttle_pct": 78.4,
    "pitch_deg": 18.5,
    "g_force": 0.25,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.618982,
    "t_sec": 399080.0,
    "pos": [
      -40.070599,
      -9.527658,
      92.391429
    ],
    "alt_km": 2.512,
    "vel_kms": 0.15,
    "fuel_kg": 197.2,
    "throttle_pct": 78.3,
    "pitch_deg": 18.9,
    "g_force": 0.25,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.61904,
    "t_sec": 399085.0,
    "pos": [
      -40.069617,
      -9.527674,
      92.392005
    ],
    "alt_km": 2.505,
    "vel_kms": 0.136,
    "fuel_kg": 194.54,
    "throttle_pct": 78.2,
    "pitch_deg": 19.3,
    "g_force": 0.26,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.619098,
    "t_sec": 399090.0,
    "pos": [
      -40.068634,
      -9.527692,
      92.392581
    ],
    "alt_km": 2.501,
    "vel_kms": 0.123,
    "fuel_kg": 191.89,
    "throttle_pct": 78.1,
    "pitch_deg": 19.6,
    "g_force": 0.26,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.619156,
    "t_sec": 399095.0,
    "pos": [
      -40.067651,
      -9.52771,
      92.393157
    ],
    "alt_km": 2.5,
    "vel_kms": 0.11,
    "fuel_kg": 189.24,
    "throttle_pct": 78.0,
    "pitch_deg": 20.0,
    "g_force": 0.26,
    "phase": "BRAKING PHASE (HIGH GATE)"
  },
  {
    "day": 4.619213,
    "t_sec": 399100.0,
    "pos": [
      -40.066671,
      -9.527704,
      92.393735
    ],
    "alt_km": 2.403,
    "vel_kms": 0.107,
    "fuel_kg": 187.37,
    "throttle_pct": 51.5,
    "pitch_deg": 21.9,
    "g_force": 0.18,
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "day": 4.619271,
    "t_sec": 399105.0,
    "pos": [
      -40.06569,
      -9.527698,
      92.394313
    ],
    "alt_km": 2.307,
    "vel_kms": 0.105,
    "fuel_kg": 185.52,
    "throttle_pct": 51.0,
    "pitch_deg": 23.8,
    "g_force": 0.18,
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "day": 4.619329,
    "t_sec": 399110.0,
    "pos": [
      -40.06471,
      -9.527692,
      92.39489
    ],
    "alt_km": 2.212,
    "vel_kms": 0.102,
    "fuel_kg": 183.69,
    "throttle_pct": 50.5,
    "pitch_deg": 25.7,
    "g_force": 0.18,
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "day": 4.619387,
    "t_sec": 399115.0,
    "pos": [
      -40.06373,
      -9.527687,
      92.395468
    ],
    "alt_km": 2.119,
    "vel_kms": 0.099,
    "fuel_kg": 181.87,
    "throttle_pct": 50.0,
    "pitch_deg": 27.6,
    "g_force": 0.18,
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "day": 4.619445,
    "t_sec": 399120.0,
    "pos": [
      -40.062748,
      -9.527682,
      92.396046
    ],
    "alt_km": 2.028,
    "vel_kms": 0.097,
    "fuel_kg": 180.07,
    "throttle_pct": 49.5,
    "pitch_deg": 29.4,
    "g_force": 0.18,
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "day": 4.619503,
    "t_sec": 399125.0,
    "pos": [
      -40.061768,
      -9.527677,
      92.396624
    ],
    "alt_km": 1.938,
    "vel_kms": 0.094,
    "fuel_kg": 178.29,
    "throttle_pct": 49.0,
    "pitch_deg": 31.3,
    "g_force": 0.17,
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "day": 4.619561,
    "t_sec": 399130.0,
    "pos": [
      -40.060788,
      -9.527672,
      92.397201
    ],
    "alt_km": 1.849,
    "vel_kms": 0.091,
    "fuel_kg": 176.53,
    "throttle_pct": 48.5,
    "pitch_deg": 33.2,
    "g_force": 0.17,
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "day": 4.619619,
    "t_sec": 399135.0,
    "pos": [
      -40.059806,
      -9.527668,
      92.397779
    ],
    "alt_km": 1.762,
    "vel_kms": 0.088,
    "fuel_kg": 174.78,
    "throttle_pct": 48.0,
    "pitch_deg": 35.1,
    "g_force": 0.17,
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "day": 4.619676,
    "t_sec": 399140.0,
    "pos": [
      -40.058826,
      -9.527664,
      92.398356
    ],
    "alt_km": 1.676,
    "vel_kms": 0.086,
    "fuel_kg": 173.06,
    "throttle_pct": 47.5,
    "pitch_deg": 37.0,
    "g_force": 0.17,
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "day": 4.619734,
    "t_sec": 399145.0,
    "pos": [
      -40.057845,
      -9.527661,
      92.398934
    ],
    "alt_km": 1.592,
    "vel_kms": 0.083,
    "fuel_kg": 171.35,
    "throttle_pct": 47.0,
    "pitch_deg": 38.9,
    "g_force": 0.17,
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "day": 4.619792,
    "t_sec": 399150.0,
    "pos": [
      -40.056864,
      -9.527659,
      92.399511
    ],
    "alt_km": 1.51,
    "vel_kms": 0.08,
    "fuel_kg": 169.66,
    "throttle_pct": 46.5,
    "pitch_deg": 40.8,
    "g_force": 0.17,
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "day": 4.61985,
    "t_sec": 399155.0,
    "pos": [
      -40.055884,
      -9.527656,
      92.400089
    ],
    "alt_km": 1.429,
    "vel_kms": 0.077,
    "fuel_kg": 167.99,
    "throttle_pct": 46.0,
    "pitch_deg": 42.7,
    "g_force": 0.17,
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "day": 4.619908,
    "t_sec": 399160.0,
    "pos": [
      -40.054903,
      -9.527654,
      92.400667
    ],
    "alt_km": 1.35,
    "vel_kms": 0.075,
    "fuel_kg": 166.34,
    "throttle_pct": 45.5,
    "pitch_deg": 44.6,
    "g_force": 0.17,
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "day": 4.619966,
    "t_sec": 399165.0,
    "pos": [
      -40.053922,
      -9.527652,
      92.401244
    ],
    "alt_km": 1.273,
    "vel_kms": 0.072,
    "fuel_kg": 164.7,
    "throttle_pct": 45.0,
    "pitch_deg": 46.4,
    "g_force": 0.16,
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "day": 4.620024,
    "t_sec": 399170.0,
    "pos": [
      -40.052941,
      -9.52765,
      92.401821
    ],
    "alt_km": 1.197,
    "vel_kms": 0.069,
    "fuel_kg": 163.08,
    "throttle_pct": 44.5,
    "pitch_deg": 48.3,
    "g_force": 0.16,
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "day": 4.620081,
    "t_sec": 399175.0,
    "pos": [
      -40.05196,
      -9.527649,
      92.402399
    ],
    "alt_km": 1.123,
    "vel_kms": 0.067,
    "fuel_kg": 161.48,
    "throttle_pct": 44.0,
    "pitch_deg": 50.2,
    "g_force": 0.16,
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "day": 4.620139,
    "t_sec": 399180.0,
    "pos": [
      -40.050979,
      -9.527648,
      92.402976
    ],
    "alt_km": 1.051,
    "vel_kms": 0.064,
    "fuel_kg": 159.9,
    "throttle_pct": 43.5,
    "pitch_deg": 52.1,
    "g_force": 0.16,
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "day": 4.620197,
    "t_sec": 399185.0,
    "pos": [
      -40.049998,
      -9.527648,
      92.403554
    ],
    "alt_km": 0.981,
    "vel_kms": 0.061,
    "fuel_kg": 158.34,
    "throttle_pct": 43.0,
    "pitch_deg": 54.0,
    "g_force": 0.16,
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "day": 4.620255,
    "t_sec": 399190.0,
    "pos": [
      -40.049017,
      -9.527648,
      92.404131
    ],
    "alt_km": 0.913,
    "vel_kms": 0.058,
    "fuel_kg": 156.79,
    "throttle_pct": 42.5,
    "pitch_deg": 55.9,
    "g_force": 0.16,
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "day": 4.620313,
    "t_sec": 399195.0,
    "pos": [
      -40.048036,
      -9.527648,
      92.404708
    ],
    "alt_km": 0.846,
    "vel_kms": 0.056,
    "fuel_kg": 155.27,
    "throttle_pct": 42.0,
    "pitch_deg": 57.8,
    "g_force": 0.16,
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "day": 4.620371,
    "t_sec": 399200.0,
    "pos": [
      -40.047055,
      -9.527649,
      92.405286
    ],
    "alt_km": 0.782,
    "vel_kms": 0.053,
    "fuel_kg": 153.76,
    "throttle_pct": 41.5,
    "pitch_deg": 59.7,
    "g_force": 0.15,
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "day": 4.620429,
    "t_sec": 399205.0,
    "pos": [
      -40.046074,
      -9.527651,
      92.405863
    ],
    "alt_km": 0.72,
    "vel_kms": 0.05,
    "fuel_kg": 152.27,
    "throttle_pct": 41.0,
    "pitch_deg": 61.6,
    "g_force": 0.15,
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "day": 4.620487,
    "t_sec": 399210.0,
    "pos": [
      -40.045092,
      -9.527653,
      92.40644
    ],
    "alt_km": 0.66,
    "vel_kms": 0.048,
    "fuel_kg": 150.79,
    "throttle_pct": 40.5,
    "pitch_deg": 63.4,
    "g_force": 0.15,
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "day": 4.620544,
    "t_sec": 399215.0,
    "pos": [
      -40.044112,
      -9.527656,
      92.407017
    ],
    "alt_km": 0.602,
    "vel_kms": 0.045,
    "fuel_kg": 149.34,
    "throttle_pct": 40.0,
    "pitch_deg": 65.3,
    "g_force": 0.15,
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "day": 4.620602,
    "t_sec": 399220.0,
    "pos": [
      -40.043131,
      -9.527659,
      92.407595
    ],
    "alt_km": 0.547,
    "vel_kms": 0.042,
    "fuel_kg": 147.9,
    "throttle_pct": 39.5,
    "pitch_deg": 67.2,
    "g_force": 0.15,
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "day": 4.62066,
    "t_sec": 399225.0,
    "pos": [
      -40.042149,
      -9.527662,
      92.408172
    ],
    "alt_km": 0.494,
    "vel_kms": 0.039,
    "fuel_kg": 146.49,
    "throttle_pct": 39.0,
    "pitch_deg": 69.1,
    "g_force": 0.15,
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "day": 4.620718,
    "t_sec": 399230.0,
    "pos": [
      -40.041168,
      -9.527666,
      92.408749
    ],
    "alt_km": 0.444,
    "vel_kms": 0.037,
    "fuel_kg": 145.09,
    "throttle_pct": 38.5,
    "pitch_deg": 71.0,
    "g_force": 0.15,
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "day": 4.620776,
    "t_sec": 399235.0,
    "pos": [
      -40.040187,
      -9.527671,
      92.409326
    ],
    "alt_km": 0.396,
    "vel_kms": 0.034,
    "fuel_kg": 143.7,
    "throttle_pct": 38.0,
    "pitch_deg": 72.9,
    "g_force": 0.14,
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "day": 4.620834,
    "t_sec": 399240.0,
    "pos": [
      -40.039205,
      -9.527676,
      92.409904
    ],
    "alt_km": 0.351,
    "vel_kms": 0.031,
    "fuel_kg": 142.34,
    "throttle_pct": 37.5,
    "pitch_deg": 74.8,
    "g_force": 0.14,
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "day": 4.620892,
    "t_sec": 399245.0,
    "pos": [
      -40.038226,
      -9.527685,
      92.410479
    ],
    "alt_km": 0.31,
    "vel_kms": 0.029,
    "fuel_kg": 140.99,
    "throttle_pct": 37.0,
    "pitch_deg": 76.7,
    "g_force": 0.14,
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "day": 4.62095,
    "t_sec": 399250.0,
    "pos": [
      -40.037246,
      -9.527693,
      92.411053
    ],
    "alt_km": 0.272,
    "vel_kms": 0.026,
    "fuel_kg": 139.66,
    "throttle_pct": 36.5,
    "pitch_deg": 78.6,
    "g_force": 0.14,
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "day": 4.621007,
    "t_sec": 399255.0,
    "pos": [
      -40.036266,
      -9.527704,
      92.411629
    ],
    "alt_km": 0.237,
    "vel_kms": 0.023,
    "fuel_kg": 138.35,
    "throttle_pct": 36.0,
    "pitch_deg": 80.4,
    "g_force": 0.14,
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "day": 4.621065,
    "t_sec": 399260.0,
    "pos": [
      -40.035287,
      -9.527715,
      92.412204
    ],
    "alt_km": 0.206,
    "vel_kms": 0.02,
    "fuel_kg": 137.06,
    "throttle_pct": 35.5,
    "pitch_deg": 82.3,
    "g_force": 0.14,
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "day": 4.621123,
    "t_sec": 399265.0,
    "pos": [
      -40.034308,
      -9.527727,
      92.412778
    ],
    "alt_km": 0.181,
    "vel_kms": 0.018,
    "fuel_kg": 135.79,
    "throttle_pct": 35.0,
    "pitch_deg": 84.2,
    "g_force": 0.13,
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "day": 4.621181,
    "t_sec": 399270.0,
    "pos": [
      -40.033328,
      -9.52774,
      92.413353
    ],
    "alt_km": 0.161,
    "vel_kms": 0.015,
    "fuel_kg": 134.53,
    "throttle_pct": 34.5,
    "pitch_deg": 86.1,
    "g_force": 0.13,
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "day": 4.621239,
    "t_sec": 399275.0,
    "pos": [
      -40.032347,
      -9.527755,
      92.413928
    ],
    "alt_km": 0.15,
    "vel_kms": 0.012,
    "fuel_kg": 133.3,
    "throttle_pct": 34.0,
    "pitch_deg": 88.0,
    "g_force": 0.13,
    "phase": "APPROACH & PITCH-UP (LOW GATE)"
  },
  {
    "day": 4.621297,
    "t_sec": 399280.0,
    "pos": [
      -40.031368,
      -9.52777,
      92.414502
    ],
    "alt_km": 0.135,
    "vel_kms": 0.011,
    "fuel_kg": 131.8,
    "throttle_pct": 31.7,
    "pitch_deg": 88.2,
    "g_force": 0.16,
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "day": 4.621355,
    "t_sec": 399285.0,
    "pos": [
      -40.030388,
      -9.527785,
      92.415077
    ],
    "alt_km": 0.12,
    "vel_kms": 0.01,
    "fuel_kg": 130.31,
    "throttle_pct": 31.3,
    "pitch_deg": 88.3,
    "g_force": 0.16,
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "day": 4.621412,
    "t_sec": 399290.0,
    "pos": [
      -40.029409,
      -9.5278,
      92.415652
    ],
    "alt_km": 0.106,
    "vel_kms": 0.009,
    "fuel_kg": 128.81,
    "throttle_pct": 31.0,
    "pitch_deg": 88.5,
    "g_force": 0.16,
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "day": 4.62147,
    "t_sec": 399295.0,
    "pos": [
      -40.028428,
      -9.527814,
      92.416227
    ],
    "alt_km": 0.092,
    "vel_kms": 0.008,
    "fuel_kg": 127.31,
    "throttle_pct": 30.7,
    "pitch_deg": 88.7,
    "g_force": 0.16,
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "day": 4.621528,
    "t_sec": 399300.0,
    "pos": [
      -40.027449,
      -9.527828,
      92.416802
    ],
    "alt_km": 0.079,
    "vel_kms": 0.007,
    "fuel_kg": 125.82,
    "throttle_pct": 30.3,
    "pitch_deg": 88.8,
    "g_force": 0.16,
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "day": 4.621586,
    "t_sec": 399305.0,
    "pos": [
      -40.026469,
      -9.527843,
      92.417377
    ],
    "alt_km": 0.065,
    "vel_kms": 0.006,
    "fuel_kg": 124.32,
    "throttle_pct": 30.0,
    "pitch_deg": 89.0,
    "g_force": 0.16,
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "day": 4.621644,
    "t_sec": 399310.0,
    "pos": [
      -40.02549,
      -9.527858,
      92.417951
    ],
    "alt_km": 0.052,
    "vel_kms": 0.005,
    "fuel_kg": 122.81,
    "throttle_pct": 29.7,
    "pitch_deg": 89.2,
    "g_force": 0.16,
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "day": 4.621702,
    "t_sec": 399315.0,
    "pos": [
      -40.024509,
      -9.527873,
      92.418526
    ],
    "alt_km": 0.04,
    "vel_kms": 0.004,
    "fuel_kg": 121.31,
    "throttle_pct": 29.3,
    "pitch_deg": 89.3,
    "g_force": 0.16,
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "day": 4.62176,
    "t_sec": 399320.0,
    "pos": [
      -40.02353,
      -9.527888,
      92.419101
    ],
    "alt_km": 0.028,
    "vel_kms": 0.003,
    "fuel_kg": 119.81,
    "throttle_pct": 29.0,
    "pitch_deg": 89.5,
    "g_force": 0.16,
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "day": 4.621818,
    "t_sec": 399325.0,
    "pos": [
      -40.02255,
      -9.527903,
      92.419675
    ],
    "alt_km": 0.018,
    "vel_kms": 0.002,
    "fuel_kg": 118.3,
    "throttle_pct": 28.7,
    "pitch_deg": 89.7,
    "g_force": 0.16,
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "day": 4.621875,
    "t_sec": 399330.0,
    "pos": [
      -40.021571,
      -9.527918,
      92.42025
    ],
    "alt_km": 0.008,
    "vel_kms": 0.001,
    "fuel_kg": 116.8,
    "throttle_pct": 28.3,
    "pitch_deg": 89.8,
    "g_force": 0.16,
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "day": 4.621933,
    "t_sec": 399335.0,
    "pos": [
      -40.02059,
      -9.527934,
      92.420825
    ],
    "alt_km": 0.0,
    "vel_kms": 0.001,
    "fuel_kg": 115.29,
    "throttle_pct": 28.0,
    "pitch_deg": 90.0,
    "g_force": 0.17,
    "phase": "TERMINAL TOUCHDOWN"
  },
  {
    "day": 4.621933,
    "t_sec": 399335.0,
    "pos": [
      -40.02059,
      -9.527934,
      92.420825
    ],
    "alt_km": 0.0,
    "vel_kms": 0.0,
    "fuel_kg": 115.29,
    "throttle_pct": 0.0,
    "pitch_deg": 90.0,
    "g_force": 0.166,
    "phase": "TOUCHDOWN SAFE (MONS MOUTON)"
  }
];

export function getMissionPointByDay(day) {
  const pts = MISSION_TRAJECTORY_POINTS;
  if (day <= pts[0].day) return pts[0];
  if (day >= pts[pts.length - 1].day) return pts[pts.length - 1];

  // Binary search for exact day
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
  };
}
