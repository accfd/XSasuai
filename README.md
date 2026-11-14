# XSasuai (Smart Unified Artemis Interface)
> **NASA Space Apps Challenge 2026 | Challenge: Lunar Landing Site Navigator**  
> **Team: Pilar Karya | Target Region: Mons Mouton, Lunar South Pole (-84.9°S, 33.3°W)**

---

## 🌒 Ringkasan Eksekutif (Executive Summary)

**XSasuai (Smart Unified Artemis Interface)** adalah sistem navigasi dan perencana pendaratan Bulan terpadu yang dirancang untuk memecahkan kendala ekstrem pencahayaan dan komunikasi di kawasan Kutub Selatan Bulan (Mons Mouton). 

Sistem ini mengintegrasikan data elevasi satelit **NASA LRO LOLA DEM**, ephemeris presisi tinggi **NASA JPL Horizons API**, solver fisika trajektori orbital non-spherical ($J_2$ lunar gravity harmonics), serta Multi-Criteria Decision Analysis (**MCDA**) ke dalam antarmuka interaktif modern (**Web Application & Desktop GUI**).

---

## 🏛️ Arsitektur Sistem & Fitur Utama

```
                     ┌──────────────────────────────────────────────┐
                     │          XSASUAI CORE ENGINE ARCH            │
                     └──────────────────────┬───────────────────────┘
                                            │
        ┌───────────────────────────────────┼───────────────────────────────────┐
        ▼                                   ▼                                   ▼
┌───────────────────────┐       ┌───────────────────────┐       ┌───────────────────────┐
│ Fitur 1: Evaluator    │       │ Fitur 2: Trajectory   │       │ Fitur 3: Visualizer   │
│ (src/site_evaluator)  │       │ (src/trajectory_calc) │       │ (src/visualizer_ui)   │
├───────────────────────┤       ├───────────────────────┤       ├───────────────────────┤
│ • LOLA DEM Loader     │       │ • J2 Gravity Perturb. │       │ • 360° Polar Skyplot  │
│ • Slope Gradient      │       │ • solve_ivp (RK45)    │       │ • 14-Day Timeline (h) │
│ • 360° Raymarching    │       │ • PDI Throttle Ctrl   │       │ • Descent Profiles    │
│ • Solar Illumination  │       │ • Approach Corridor   │       │ • Safety Status Badges│
│ • Earth DTE Visibility│       │ • Fuel & ΔV Budget    │       │ • Base64 PNG Streamer │
│ • MCDA Scoring Engine │       │ • Safe Touchdown Gate │       │                       │
└───────────────────────┘       └───────────────────────┘       └───────────────────────┘
```

### 1. Fitur 1: Penentuan Tanggal & Posisi Pendaratan di Batas Aman Cakrawala (`src/site_evaluator.py`)
- **Topografi Presisi:** Memuat Digital Elevation Model dari Mons Mouton LOLA DEM (250m/px).
- **Slope Gradient Calculation:** Perhitungan kemiringan lereng dengan central difference gradient. **Hard Gate:** Lokasi dengan kemiringan $\ge 10^\circ$ otomatis dieliminasi.
- **360° Raymarching Cakrawala:** Menembakkan vektor sinar radial ke seluruh azimut $[0^\circ, 360^\circ)$ dengan koreksi kelengkungan Bulan ($R_{\text{moon}} = 1,737,400\text{ m}$) untuk mendeteksi dinding kawah dan puncak bukit perintang.
- **JPL Horizons Ephemeris Live Client:** Mengambil posisi real-time Matahari (ID: `10`) dan Bumi (ID: `399`) dengan observer geodetic Bulan (`coord@301`) serta cache cerdas 24 jam.
- **MCDA Scoring Engine:**
  $$S = w_{\text{slope}} \cdot S_{\text{slope}} + w_{\text{illum}} \cdot S_{\text{illum}} + w_{\text{dte}} \cdot S_{\text{dte}}$$
  Bobot: Kemiringan Lereng (35%), Iluminasi Surya (35%), Komunikasi Direct-to-Earth (30%).

### 2. Fitur 2: Perhitungan Trajektori & Koridor Pendekatan (`src/trajectory_calculator.py`)
- **Gravitasi Non-Spherical Bulan:** Mengakomodasi percepatan perturbasi gravitasi harmonik zonal $J_2 = 2.027 \times 10^{-4}$ dan $\mu_{\text{moon}} = 4.9048695 \times 10^{12}\ \text{m}^3/\text{s}^2$.
- **Integrasi Numerik RK45 (`scipy.integrate.solve_ivp`):** Simulasi fasa *Powered Descent Initiation* (PDI) dari perilune 15 km hingga pendaratan di permukaan.
- **Profil Propulsi Wahana:** Variasi gaya dorong kontinu ($T_{\min} = 400\text{ N}$ hingga $T_{\max} = 3200\text{ N}$, $I_{\text{sp}} = 310\text{ s}$).
- **Validasi Koridor Pendekatan:** Memeriksa jarak bebas vertikal pendarat terhadap dinding tebing kawah sepanjang 15 km glideslope ($> 150\text{ meter}$).
- **Kriteria Touchdown Aman:** Kecepatan vertikal $V_z \le 2.0\text{ m/s}$, kecepatan horizontal $V_h \le 0.5\text{ m/s}$, dan sisa propelan $> 15\text{ kg}$.

### 3. Fitur 3: Visualisasi Interaktif & Horizon Sky-Plot (`src/visualizer_ui.py`)
- **360° Polar Horizon Sky-Plot:** Memproyeksikan rintangan cakrawala lokal sebagai poligon radial dengan zenith di pusat dan elevasi rintangan di tepi, memplot posisi seketika serta lintasan Matahari & Bumi.
- **14-Day Mission Timeline Slider (0–336 jam):** Menggeser slider waktu untuk melihat secara instan pergerakan sudut datang surya, keterlihatan Bumi, efisiensi daya, dan status keamanan pendaratan.
- **Indikator Keselamatan Tiga Tingkat:**
  - 🟢 **AMAN (GO):** Skor $\ge 0.75$, Iluminasi $> 20\%$, DTE $> 20\%$, Slope $< 10^\circ$.
  - 🟡 **WASPADA (MARGINAL):** Skor $0.50 - 0.74$.
  - 🔴 **KRITIS (NO-GO):** Skor $< 0.50$ atau terjadi gerhana/terhalang tebing kawah.

### 4. Fitur 4: Cockpit Flight Simulator Testbed (`simulator/` & `lunar_game_simulator.py`)
- Simulator 3D real-time berbasis Pygame dengan dinamika fisika gravitasi Bulan $1.62\ \text{m/s}^2$.
- HUD terintegrasi: Artificial Horizon, Fuel Indicator, Radar Altitude, Touchdown Velocimeter.
- Dapat diluncurkan langsung dari Web UI atau Desktop GUI dengan satu klik.

---

## 📁 Struktur Direktori

```text
lunar-mission-planner/
├── data/
│   ├── quickmap-lroc.png          # LOLA DEM Elevasi Raster Mons Mouton
│   ├── quickmap-lroc.vrt          # Metadata Geospasial LROC
│   ├── mons_mouton_illum/         # Komposit Iluminasi Penyinaran Surya
│   └── horizons_cache.json        # Cache Ephemeris NASA JPL Horizons
├── output/
│   └── mission_state.json         # Shared State Bus Antar-Modul
├── src/
│   ├── __init__.py                # Package Descriptor
│   ├── site_evaluator.py          # Fitur 1: DEM, Slope, 360 Raymarching, MCDA
│   ├── trajectory_calculator.py   # Fitur 2: J2 Gravity, PDI RK45, Corridor Check
│   └── visualizer_ui.py           # Fitur 3: Polar Sky-Plot, Timeline, Plots
├── web/
│   ├── index.html                 # Modern Responsive Dashboard (HTML5/CSS3/JS)
│   └── server.py                  # Backend REST API Server (Tornado)
├── simulator/
│   ├── __init__.py
│   └── lunar_game_simulator.py    # 3D Cockpit Flight Simulator
├── tests/
│   ├── test_xsasuai_core.py       # Unit Test Fitur 1, 2, 3
│   └── test_web_server.py         # Integration Test REST API Endpoints
├── constants.py                   # Single Source of Truth Fisika & Astronomi
├── mission_state.py               # Shared Mission State Manager
├── horizons_api.py                # NASA JPL Horizons Ephemeris REST Client
├── main.py                        # Unified Launcher Console
└── requirements.txt
```

---

## 🚀 Cara Menjalankan Aplikasi

### 1. Menjalankan Web Application Interaktif (Rekomendasi)
Buka terminal dan jalankan:
```bash
python main.py --web
```
Aplikasi web modern akan otomatis terbuka di browser: `http://127.0.0.1:8888`.
Di sini Anda dapat:
- Memilih situs **Site Alpha**, **Site Beta**, atau **Site Gamma**.
- Menggeser **Slider Timeline Misi 14-Hari** (0 s.d. 336 Jam) untuk analisis pencahayaan seketika.
- Melihat **360° Polar Horizon Sky-Plot**.
- Menekan **"Hitung Trajektori RK45"** untuk kalkulasi dinamika pendaratan PDI.
- Menekan **"Buka Simulator Pendaratan 3D"** untuk mencoba mendaratkan wahana secara langsung!

### 2. Menjalankan Desktop GUI (PyQt6)
Jika ingin menggunakan antarmuka desktop PyQt6 5-Tab:
```bash
python main.py --desktop
# atau cukup:
python main.py
```

### 3. Menjalankan Evaluasi Cepat CLI
```bash
python main.py --eval
```

### 4. Menjalankan Simulator 3D Langsung
```bash
python main.py --sim
```

### 5. Menjalankan Unit Tests
```bash
python tests/test_xsasuai_core.py
python tests/test_web_server.py
```

---

## 👥 Tim Pengembang
**Tim: Pilar Karya**  
Proyek dibuat untuk **NASA Space Apps Challenge 2026** — *Lunar Landing Site Navigator*.
