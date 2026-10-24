# Project SUAI (Smart Unified Artemis Interface)
> **NASA Space Apps Challenge 2026 | Target: Mons Mouton, Lunar South Pole (-84.5°S)**

**Project SUAI (Smart Unified Artemis Interface)** adalah platform perencanaan misi pendaratan Bulan terpadu yang menjawab secara menyeluruh: **kapan** tanggal terbaik misi diluncurkan, **di mana** tapak pendaratan paling aman di Mons Mouton, **cara** pengereman roket dikalkulasi, hingga **menguji** pendaratannya secara langsung lewat simulator 3D interaktif.

---

## 🚀 Alur 4 Pilar Misi (Kapan, Di Mana, Cara, Uji)

```
[1. KAPAN?]           ➔     [2. DI MANA?]         ➔     [3. CARA?]            ➔     [4. UJI COBA!]
Tentukan Tanggal Misi       Pilih Lokasi Tapak          Kalkulasi Propulsi          Simulasi 3D Real-Time
```

1. **📅 KAPAN (Date & Mission Window Finder)**:
   - Menghitung efemeris posisi Matahari dan librasi Bumi sepanjang siklus sinodis Bulan (0 - 29.5 hari / 708 jam).
   - Memastikan wahana mendarat pada jendela waktu saat panel surya aktif (*Power ON*) dan sinyal komunikasi ke stasiun Bumi (*Direct-to-Earth / DTE*) 100% bebas hambatan.
   - Tombol pintas **"🎯 CARI TANGGAL TERBAIK"** untuk menemukan *Golden Landing Window* secara instan.

2. **📍 DI MANA (Terrain Hazard & Site Comparison)**:
   - Mengolah data satelit NASA LOLA DEM dan citra iluminasi LROC WAC beresolusi 160.2 m/px.
   - Analisis kemiringan lereng (*slope* < 10°) untuk menghindari risiko wahana terguling.
   - Analisis siluet rintangan cakrawala lokal 360° (*Local Horizon Profile*) membandingkan **Site Alpha** (Puncak Plateau), **Site Beta** (Tepi Utara), dan **Site Gamma** (Punggung Kawah Barat).

3. **⚙️ CARA (3-DoF Trajectory & Fuel Budget Solver)**:
   - Solver dinamika penerbangan propulsi roket dari fasa *Powered Descent Initiation* (PDI), *Terminal Approach*, hingga *Final Hover Gate*.
   - Manajemen massa propelan dan kontrol vektor dorong mesin agar pendarat menyentuh permukaan secara lembut (*soft touchdown* < 2 m/s).

4. **🎮 UJI (3D Cockpit & Flight Testbed)**:
   - Simulator visual 3D berbasis gravitasi Bulan ($1.62\ \text{m/s}^2$).
   - Dilengkapi instrumen avionik HUD (*Attitude Director, Horizontal Radar, Fuel Gauge, Vertical Velocity Indicator*).
   - Mode kendali manual maupun *autonomous autopilot pinpoint landing*.

---

## 📂 Struktur Proyek

```text
├── data/
│   ├── quickmap-lroc.png          # Raster Elevasi Satelit NASA LOLA DEM Mons Mouton
│   ├── quickmap-lroc.vrt          # Metadata Geospasial Proyeksi Polar Stereografik
│   └── mons_mouton_illum/         # Komposit Iluminasi Penyinaran Surya LROC WAC
├── output/                        # Grafik Analitik & Telemetri Hasil Misi
├── main.py                        # Mission Control Console Utama (Menu Terpadu)
├── solar_earth_horizon_planner.py # Modul Evaluasi Tanggal, Cakrawala 360° & Jendela DTE
├── scan_terrain.py                # Modul Pemindaian Topografi & Algoritma Seleksi Tapak MCDA
├── simulate_landing.py            # Modul Solver Trajektori Fisika Roket & Propulsi (PyQt6)
├── lunar_game_simulator.py        # Modul Simulator Uji Terbang 3D Real-Time (Pygame)
├── requirements.txt               # Daftar Dependensi Pustaka Python
└── README.md
```

---

## 🛠️ Instalasi & Menjalankan Sistem

### 1. Prasyarat Sistem
- Python 3.10+ (Direkomendasikan Python 3.11 - 3.13)
- OS: Windows, Linux, atau macOS

### 2. Pemasangan Dependensi
Buka terminal dan jalankan perintah:
```bash
pip install -r requirements.txt
```
*(Atau pasang manual: `pip install numpy scipy matplotlib pillow pygame PyQt6 pyqtgraph`)*

### 3. Menjalankan Aplikasi
Jalankan Mission Control Center terpadu:
```bash
python main.py
```

Atau jalankan modul tertentu secara mandiri:
- **Evaluasi Tanggal Kalender, Cakrawala 360° & Jendela Sinyal:**
  ```bash
  python solar_earth_horizon_planner.py
  ```
- **Pemindai Bahaya Medan & Analisis Spasial:**
  ```bash
  python scan_terrain.py
  ```
- **Solver Trajektori Fisika & Telemetri:**
  ```bash
  python simulate_landing.py
  ```
- **Simulator Penerbangan Virtual 3D:**
  ```bash
  python lunar_game_simulator.py
  ```

---

## 🛰️ Sumber Data Satelit
- **NASA Lunar Reconnaissance Orbiter (LRO)**
- **LOLA (Lunar Orbiter Laser Altimeter)**
- **LROC WAC (Wide Angle Camera)**
- **ASU LROC QuickMap**: [https://quickmap.lroc.asu.edu](https://quickmap.lroc.asu.edu)
