# XASUAI — Sistem Navigasi Lokasi Pendaratan di Bulan
> **NASA Space Apps Challenge 2026 | Challenge: Lunar Landing Site Navigator**  
> **Tim: Pilar Karya | Lokasi Target: Mons Mouton Crest, Kutub Selatan Bulan (-84,9°S, 33,3°W)**  
> **Repositori Resmi:** [https://github.com/accfd/XSasuai](https://github.com/accfd/XSasuai)  
> **Dukungan Bahasa:** Bilingual Penuh (Bahasa Indonesia & English)

---

## 🌒 1. Ringkasan Eksekutif (Executive Summary)

**XASUAI (Executive Lunar Landing Site Navigator)** adalah sistem navigasi cerdas berbasis web dan astrodinamika untuk menentukan lokasi serta waktu pendaratan teraman bagi wahana misi Artemis di **Mons Mouton**, Kutub Selatan Bulan.

Kutub Selatan Bulan memiliki tantangan ekstrem: sudut datang sinar Matahari sangat rendah, bayangan kawah tebal menimbulkan suhu hingga **-240°C**, serta perbukitan tinggi yang berisiko memutus jalur komunikasi radio langsung ke Bumi (*Direct-to-Earth / DTE*).

**XASUAI memecahkan tantangan tersebut melalui 3 Solusi Terintegrasi:**
1. **Solusi 1 — Rekomendasi Waktu Peluncuran & Pendaratan (*MCDA Engine*):** Memindai 336 jam data efemeris **NASA JPL Horizons DE441** untuk mengidentifikasi *Golden Solar Window* dengan pencahayaan surya kontinu 100% dan komunikasi stabil.
2. **Solusi 2 — Visualisasi Medan & Analisis Topografi (*Terrain Inspector*):** Memetakan ketinggian dan kemiringan lereng menggunakan citra satelit **NASA LRO LOLA DEM** ($0,08^\circ$, aman di bawah batas NASA $10^\circ$) serta memvalidasi garis pandang bebas tebing kawah ($+12,35^\circ$).
3. **Solusi 3 — Simulasi Misi Penuh & Dinamika Pendaratan 6-DOF (*Flight Simulator*):** Menyimulasikan lintasan dari Bumi (KSC LC-39B), Injeksi Translunar (+3,05 km/s), hingga inisiasi pengereman bertenaga (*PDI*) SpaceX Starship HLS menyentuh Mons Mouton Crest secara real-time pada 60 FPS.

---

## ⚡ 2. Panduan Cepat Menjalankan Aplikasi (1 Menit untuk Juri)

Juri dan penguji dapat menjalankan aplikasi secara lokal dengan 3 langkah mudah berikut:

### Langkah 1: Clone Repositori
```bash
git clone https://github.com/accfd/XSasuai.git
cd XSasuai
```

### Langkah 2: Pasang Pustaka Dependensi (Python 3.10+)
```bash
pip install -r requirements.txt
```

### Langkah 3: Luncurkan Web Dashboard
```bash
python main.py --web
```

Aplikasi web server lokal Tornado akan aktif dan browser otomatis membuka alamat:  
👉 **`http://127.0.0.1:8888`**

> **Tips Navigasi Cepat:**
> - Di pojok kanan atas header navbar, terdapat tombol **`ID | EN`** untuk beralih bahasa seketika (Bahasa Indonesia ⟷ English).
> - Seluruh halaman telah dioptimalkan agar responsif, bebas error konsol, dan beroperasi pada 60 FPS.

---

## 🎯 3. Panduan Pemeriksaan Juri (Judging & Evaluation Walkthrough)

Untuk mempermudah dewan juri dalam menguji dan menilai seluruh fitur sistem, berikut alur evaluasi terpandu:

### 📍 Tahap 1: Halaman Beranda (Home Overview)
- **Globe 3D Interaktif Bulan:** Tampilan fotorealistik permukaan Bulan menggunakan WebGL/Three.js. Juri dapat mengklik globe untuk beralih ke penjelasan masalah.
- **Rangkuman Masalah & Solusi:** Presentasi terstruktur mengenai 3 tantangan utama pendaratan kutub dan 3 pilar solusi yang disediakan XASUAI.
- **Pengubah Bahasa:** Uji tombol **EN** di header kanan atas untuk melihat seluruh teks, metrik, dan kartu beralih ke bahasa Inggris secara instan.

### 📍 Tahap 2: Solusi 1 — Rekomendasi Waktu Pendaratan (`/rekomendasi`)
1. Klik menu **Rekomendasi** di navbar atas.
2. Pilih bulan dan tahun rencana misi (contoh: **November 2026**).
3. Klik tombol biru **`HITUNG JADWAL REKOMENDASI`**.
4. **Perhatikan Layar Scanner Telemetri:** Sistem melakukan analisis astrodinamika 4 tahap secara sekuensial (akses efemeris JPL Horizons, kalkulasi sudut elevasi, pemindaian rintangan tebing kawah, dan penguncian waktu touchdown).
5. **Hasil Analisis Optimal:**
   - **Lepas Landas dari Bumi:** 11 November 2026, 08:00 UTC (durasi perjalanan 4 hari).
   - **Pendaratan di Bulan:** 15 November 2026, 08:00 UTC.
   - **Status:** *Optimal & Aman* (100% sinar matahari kontinu & jalur sinyal langsung tanpa hambatan).
6. **Modal Rekomendasi Tersimpan:** Klik tombol *"Lihat Hasil Rekomendasi Tersimpan ↓"* untuk melihat matriks perbandingan multi-lokasi (*Site Alpha*, *Site Beta*, *Site Gamma*) berdasarkan skor MCDA.

### 📍 Tahap 3: Solusi 2 — Visualisasi Medan & Analisis Topografi (`/visualisasi`)
Halaman ini menyajikan 3 mode inspeksi visual:
1. **Mode 1 — Navigasi Orbital 3D:**
   - Globe orbital 3D dari luar angkasa dengan HUD ketinggian kamera (*15,0 km | Target Terkunci*).
   - Klik tombol **`🚀 Fly-To Mons Mouton`** untuk melihat animasi kamera menukik mulus menuju koordinat $(-84,9^\circ\text{S}, 33,3^\circ\text{W})$.
2. **Mode 2 — Inspeksi Kelerengan & Kontur Medan 2D (LOLA DEM):**
   - Menampilkan peta elevasi satelit NASA LOLA DEM.
   - Juri dapat melakukan **Zoom** (roda mouse / tombol `＋` `－`) dan **Pan/Geser peta** (klik & tarik).
   - Dilengkapi 4 ubin metrik keselamatan:
     - *Kemiringan Lereng:* **0,08°** (Sangat datar, jauh di bawah standar aman NASA $10^\circ$).
     - *Elevasi Puncak:* **+5.920 m** (Dataran tinggi, jauh di atas kawah gelap).
     - *Iluminasi Surya:* **100% Bebas Bayangan** (Suplai daya surya penuh).
     - *Status Topografi:* **VERIFIKASI GO (AMAN)**.
3. **Mode 3 — Visualisasi 3D Topografi & Jalur Sinyal Radio (DTE):**
   - Model 3D realistis elevasi permukaan dataran tinggi Mons Mouton.
   - Juri dapat mengganti lapisan peta melalui dropdown: *Zona Kelayakan (MCDA Viridis)*, *Topografi Elevasi (LOLA DEM)*, atau *Kemiringan Lereng (Slope Safety)*.
   - **Garis Sinyal Laser Cyan ke Bumi:** Membuktikan sudut bebas pandang antena sebesar **+12,35°** di atas bibir tebing tertinggi (*zero loss-of-signal*).

### 📍 Tahap 4: Solusi 3 — Simulasi Misi Penuh & Dinamika Pendaratan (`/simulasi`)
1. Klik menu **Simulasi** di navbar atas.
2. Membaca rangkuman 3 fase penerbangan wahana (Fase 1: Peluncuran TLI, Fase 2: Penurunan Orbit Polar, Fase 3: PDI & Pendaratan HLS).
3. Klik tombol biru **`🚀 LUNCURKAN SIMULATOR 3D MISI PENUH (TAB BARU) ↗`**.
4. **Simulator 3D Terbuka di Tab Baru (`simulator.html`):**
   - Simulasi grafis 3D real-time 60 FPS berbasis WebGL.
   - Mengendalikan wahana SpaceX Starship HLS pada manuver *Powered Descent Initiation (PDI)*.
   - Dilengkapi instrumen avionik penerbangan: kecepatan vertikal ($V_z$), kecepatan horizontal ($V_x$), sisa bahan bakar propelan, altimeter, dan indikator touchdown aman ($V_z \le 1,0\text{ m/s}$).

---

## 🔬 4. Validasi Data Ilmiah & Formula Astrodinamika

Seluruh angka dan kesimpulan yang disajikan sistem XASUAI dihitung berdasarkan dataset terverifikasi dan prinsip fisika antariksa:

| Parameter Ilmiah | Sumber Data / Formula | Nilai Terhitung | Implikasi Keselamatan Misi |
| :--- | :--- | :--- | :--- |
| **Topografi & Elevasi** | NASA LRO LOLA DEM (Resolusi 20m/px) | Elevasi: **+5.920 m** | Berada di dataran tinggi, terbebas dari bayangan kawah dalam. |
| **Kemiringan Lereng** | Gradien Vektor Normal LOLA DEM | **0,08°** | Memenuhi syarat NASA Artemis ($< 10^\circ$), risiko wahana terguling nihil. |
| **Posisi Matahari & Bumi** | NASA JPL Horizons API (DE441 Ephemeris) | Azimuth & Elevasi 336 Jam | Menemukan jendela pencahayaan optimal 14 hari penuh. |
| **Bebas Hambatan Sinyal** | Horizon Raymarching 360° | Margin: **+12,35°** | Jalur gelombang radio langsung ke Bumi (DTE) bebas hambatan tebing. |
| **Injeksi Translunar (TLI)** | Mekanika Orbital Dua Benda | $\Delta v = +3,05\text{ km/s}$ | Melepaskan wahana dari LEO (185 km) menuju lintasan Bulan 384.400 km. |
| **Descent Guidance (PDI)** | Runge-Kutta 4th/5th-Order (RK45) | $V_z = 0,80\text{ m/s}$ | Touchdown vertikal lembut sesuai spesifikasi kaki pendarat Starship HLS. |

---

## 🛠️ 5. Pilihan Perintah Menjalankan Aplikasi (`main.py`)

Selain antarmuka web, launcher `main.py` menyediakan opsi multi-mode:

| Perintah Terminal | Mode Aplikasi | Keterangan |
| :--- | :--- | :--- |
| **`python main.py --web`** | **Web Console (Rekomendasi Utama)** | Menjalankan server Tornado & membuka Web Bento Dashboard (`:8888`). |
| **`python main.py --desktop`** | **Desktop GUI PyQt6** | Menjalankan antarmuka desktop native 5-tab. |
| **`python main.py --sim`** | **Flight Testbed Cockpit** | Menjalankan simulator penerbangan mandiri berbasis Pygame/PyOpenGL. |
| **`python main.py --eval`** | **CLI Batch Evaluator** | Menjalankan kalkulasi cepat MCDA langsung di terminal teks. |
| **`python main.py --help`** | **Menu Bantuan** | Menampilkan daftar seluruh parameter dan argumen yang tersedia. |

---

## 📁 6. Struktur Direktori Proyek

```text
XSasuai/
├── data/
│   ├── quickmap-lroc.png          # Citra Satelit Elevasi NASA LRO LOLA DEM
│   ├── quickmap-lroc.vrt          # Metadata Geospasial Proyeksi Polar
│   └── horizons_cache.json        # Cache Efemeris NASA JPL Horizons DE441
├── output/
│   └── mission_state.json         # Bus Status Sinkronisasi Antar-Modul
├── src/
│   ├── site_evaluator.py          # Modul Analisis Slope, Raymarching 360°, & MCDA
│   ├── trajectory_calculator.py   # Modul Solver PDI RK45 & Perturbasi Gravitasi J2
│   └── visualizer_ui.py           # Modul Visualisasi Polar Sky-Plot
├── web/
│   ├── index.html                 # Dashboard Web Executive (Bento Grid)
│   ├── simulator.html             # Simulator Pendaratan Misi 3D (WebGL / Three.js)
│   ├── server.py                  # Backend REST API Server (Tornado Engine)
│   ├── js/
│   │   └── app.js                 # Engine Logika, Three.js 3D, & Sistem Bilingual i18n
│   └── css/
│       └── style.css              # Tata Letak Modern NASA / Linear Clean Design
├── simulator/
│   └── lunar_game_simulator.py    # Simulator Uji Terbang 3D Standalone
├── tests/
│   ├── test_xsasuai_core.py       # Pengujian Unit Modul Inti
│   └── test_web_server.py         # Pengujian Integrasi REST API
├── constants.py                   # Konstanta Fisika, Astronomi, & Koordinat Acuan
├── mission_state.py               # Shared State Manager
├── horizons_api.py                # Klien REST API NASA JPL Horizons
├── main.py                        # Launcher Terpadu
├── requirements.txt               # Daftar Pustaka Dependensi Python
└── README.md                      # Dokumentasi Resmi Proyek
```

---

## 👥 7. Tim Pengembang & Atribusi

- **Tim:** Pilar Karya
- **Ajang:** NASA Space Apps Challenge 2026
- **Tantangan:** *Lunar Landing Site Navigator*
- **Lokasi Acara:** Purwokerto
- **Lisensi:** MIT Open Source License — Bebas digunakan untuk pengembangan riset dan eksplorasi antariksa.
