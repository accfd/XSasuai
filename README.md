# XSASUAI — Lunar Landing Site Navigator
> **NASA Space Apps Challenge 2026 | Challenge: Lunar Landing Site Navigator**  
> **Team: Pilar Karya | Target Region: Mons Mouton, Lunar South Pole (-84.9°S, 33.3°W)**  
> **Repository:** [https://github.com/accfd/XSasuai](https://github.com/accfd/XSasuai)

---

## 🌒 Tentang Proyek (About XSasuai)

**XSasuai (Smart Unified Artemis Interface)** adalah sistem navigasi eksekutif terpadu untuk mengevaluasi rintangan cakrawala 360°, pencahayaan surya kontinu, dan jalur komunikasi langsung ke Bumi (*Direct-to-Earth / DTE*) di dataran tinggi **Mons Mouton**, Kutub Selatan Bulan.

Sistem ini memadukan:
1. **NASA LRO LOLA DEM:** Model elevasi topografi satelit resolusi tinggi untuk memverifikasi kemiringan lereng aman ($< 10^\circ$).
2. **NASA JPL Horizons API:** Ephemeris posisi presisi Matahari (ID: `10`) dan Bumi (ID: `399`) terhadap titik acuan observer di permukaan Bulan.
3. **Raymarching Cakrawala 360°:** Pemetaan siluet rintangan kawah lokal dengan koreksi kelengkungan Bulan.
4. **Solver Trajektori PDI (RK45):** Simulasi fisika pendaratan roket dengan perturbasi gravitasi non-spherical ($J_2$).
5. **Clean Bento Grid Executive Web Console:** Antarmuka interaktif responsif bergaya NASA / Linear Aerospace.

---

## 🚀 Panduan Membuka & Menjalankan Proyek (Step-by-Step)

Panduan ini dibuat sangat ringkas dan jelas agar siapa saja (termasuk rekan tim yang belum terbiasa dengan coding) dapat langsung menjalankannya dalam hitungan menit.

---

### METODE 1: Menggunakan Antigravity IDE (Sangat Direkomendasikan)

1. **Buka Antigravity IDE** di laptop Anda.
2. Di halaman pembuka Antigravity IDE, klik menu **"Clone Git Repository"** (atau buka menu atas: `File` ➔ `New` ➔ `Clone Repository`).
3. Masukkan tautan URL repositori GitHub resmi:
   ```text
   https://github.com/accfd/XSasuai.git
   ```
4. Pilih folder di laptop Anda untuk menyimpannya (misalnya di `Documents` atau `D:\LOMBA`), lalu klik **Clone & Open**.
5. Tunggu proses unduhan selesai dan folder proyek terbuka otomatis di Antigravity IDE.
6. Buka **Terminal** bawaan di Antigravity IDE dengan menekan shortcut keyboard:
   ```text
   Ctrl + `  (tombol petik di bawah tombol Esc)
   ```
7. Pasang pustaka pendukung (cukup dijalankan satu kali di awal):
   ```bash
   pip install -r requirements.txt
   ```
8. **Jalankan Aplikasi Web Dashboard:**
   ```bash
   python main.py --web
   ```
9. **Selesai!** Peramban browser Anda (Chrome/Edge) akan otomatis terbuka di alamat:
   👉 **`http://127.0.0.1:8888`**

---

### METODE 2: Menggunakan Visual Studio Code (VS Code)

1. **Buka VS Code** di laptop Anda.
2. Buka Command Palette dengan menekan: `Ctrl + Shift + P`.
3. Ketik dan pilih **`Git: Clone`**.
4. Masukkan URL repositori:
   ```text
   https://github.com/accfd/XSasuai.git
   ```
5. Pilih folder penyimpanan, lalu klik **Open Repository**.
6. Buka Terminal di VS Code: `Ctrl + ` ` ` (atau menu `Terminal` ➔ `New Terminal`).
7. Instal paket pendukung:
   ```bash
   pip install -r requirements.txt
   ```
8. Jalankan aplikasi web:
   ```bash
   python main.py --web
   ```
9. Buka browser di **`http://127.0.0.1:8888`**.

---

### METODE 3: Menggunakan Terminal / Command Prompt Langsung (CLI)

1. Buka **Command Prompt (CMD)** atau **PowerShell**.
2. Masuk ke direktori yang Anda inginkan, lalu clone repositori:
   ```bash
   git clone https://github.com/accfd/XSasuai.git
   ```
3. Pindah ke dalam folder proyek:
   ```bash
   cd XSasuai
   ```
4. Instal dependensi:
   ```bash
   pip install -r requirements.txt
   ```
5. Jalankan aplikasi:
   ```bash
   python main.py --web
   ```
6. Buka browser favorit Anda di **`http://127.0.0.1:8888`**.

---

### UPDATE: Jika Anda Sudah Memiliki Foldernya (Cukup Pull)

Jika rekan tim Anda sudah pernah meng-clone folder proyek sebelumnya dan ingin mengambil pembaruan sistem terbaru:
1. Buka folder proyek di terminal / IDE.
2. Ketik perintah:
   ```bash
   git pull origin main
   ```
3. Jalankan aplikasi web:
   ```bash
   python main.py --web
   ```
4. Tekan **`Ctrl + F5`** di browser pada alamat `http://127.0.0.1:8888` untuk Hard Refresh.

---

## 🎮 Pilihan Perintah Menjalankan Aplikasi (`main.py`)

Aplikasi ini dilengkapi launcher fleksibel multi-mode:

| Perintah Terminal | Deskripsi Mode |
| :--- | :--- |
| **`python main.py --web`** | **[Rekomendasi Utama]** Menjalankan Web Dashboard interaktif Bento Grid di browser (`http://127.0.0.1:8888`). |
| **`python main.py --desktop`** | Menjalankan aplikasi Desktop GUI 5-Tab native berbasis PyQt6. |
| **`python main.py --sim`** | Menjalankan Simulator Uji Terbang 3D Cockpit secara langsung. |
| **`python main.py --eval`** | Menjalankan evaluasi cepat spasiotemporal & scoring MCDA langsung di terminal teks. |
| **`python main.py --help`** | Menampilkan seluruh bantuan opsi perintah. |

---

## 🖥️ Cara Menggunakan Web Dashboard Bento Grid

Setelah membuka **`http://127.0.0.1:8888`** di browser:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        XSASUAI BENTO WORKSPACE                         │
├────────────────────────────────────────────────────────────────────────┤
│ 📍 PEMILIH LOKASI: Klik [Site Alpha], [Site Beta], atau [Site Gamma]  │
├───────────────────────────────────┬────────────────────────────────────┤
│ 🗺️ Topografi Satelit LOLA DEM     │ 🌐 Radar 360° Polar Horizon Skyplot│
│    (Pin interaktif Mons Mouton)   │    (Rintangan tebing & posisi Sun) │
├───────────────────────────────────┴────────────────────────────────────┤
│ ⏱ TIMELINE 14-HARI: Geser slider 0h s.d 336h untuk simulasi matahari  │
├────────────────────────────────────────────────────────────────────────┤
│ 🚀 DESCENT GUIDANCE: Tekan [Hitung Trajektori RK45] untuk ΔV & propelan│
│ 🕹️ FLIGHT TESTBED: Buka tab kanan atas untuk coba menyetir wahana 3D   │
└────────────────────────────────────────────────────────────────────────┘
```

1. **Membandingkan Kandidat Lokasi:** Klik kartu **Site Alpha (Crest)**, **Site Beta (Rim)**, atau **Site Gamma (Ridge)** untuk membandingkan kemiringan lereng (*Slope*) dan elevasi.
2. **Peta Topografi Satelit:** Peta topografi di sebelah kiri menampilkan citra satelit NASA LOLA DEM dengan pin lokasi seketika.
3. **Radar Cakrawala 360° (Polar Sky-Plot):** Menampilkan siluet rintangan kawah di sekeliling pendarat beserta posisi seketika Matahari (Kuning) dan Bumi (Biru).
4. **Menguji Jendela Waktu (Timeline Scrubber 14-Hari):** Geser slider horisontal (0 jam s.d. 336 jam) untuk melihat pergerakan sudut matahari dan memeriksa kapan suplai daya surya atau sinyal Bumi aktif.
5. **Simulator Cockpit 3D:** Klik tab **`[🕹️ Flight Testbed]`** di pojok kanan atas untuk menguji coba pendaratan secara manual:
   - Tombol **`Spasi` / `W`**: Menyalakan mesin pendorong utama (*Thrust*).
   - Tombol **`A` / `D`**: Menyeimbangkan arah wahana (*RCS Roll*).
   - Tombol **`R`**: Reset pendaratan.
   - Tombol **`Autopilot Descent`**: Pendaratan otomatis berbantuan komputer.

---

## 📁 Struktur Berkas Proyek

```text
XSasuai/
├── data/
│   ├── quickmap-lroc.png          # Citra Satelit Elevasi NASA LRO LOLA DEM
│   ├── quickmap-lroc.vrt          # Metadata Geospasial Proyeksi Kutub
│   └── horizons_cache.json        # Cache Ephemeris NASA JPL Horizons
├── output/
│   └── mission_state.json         # Shared State Bus Antar-Modul
├── src/
│   ├── __init__.py
│   ├── site_evaluator.py          # Fitur 1: Analisis Slope, 360° Raymarching, MCDA
│   ├── trajectory_calculator.py   # Fitur 2: J2 Gravity, Solver PDI RK45
│   └── visualizer_ui.py           # Fitur 3: Polar Sky-Plot & Visualizer
├── web/
│   ├── index.html                 # Bento Grid Executive Dashboard
│   └── server.py                  # Backend REST API Server (Tornado)
├── simulator/
│   └── lunar_game_simulator.py    # 3D Flight Cockpit Simulator
├── tests/
│   ├── test_xsasuai_core.py       # Pengujian Unit Fitur 1, 2, 3
│   └── test_web_server.py         # Pengujian Integrasi REST API
├── constants.py                   # Single Source of Truth Fisika & Astronomi
├── mission_state.py               # Shared Mission State Manager
├── horizons_api.py                # Klien API Resmi NASA JPL Horizons
├── main.py                        # Launcher Terpadu
├── requirements.txt               # Daftar Pustaka Python
└── README.md
```

---

## 👥 Tim Pengembang
**Tim: Pilar Karya**  
- Proyek dibuat untuk **NASA Space Apps Challenge 2026**
- Kategori Tantangan: *Lunar Landing Site Navigator*
- Lokasi Event: *Purwokerto*
