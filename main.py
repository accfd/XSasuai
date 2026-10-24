import os
import sys
import glob
import time
import subprocess

def clear_screen():
    os.system("cls" if os.name == "nt" else "clear")

def print_banner():
    clear_screen()
    print("=" * 78)
    print("      AUTONOMOUS LUNAR MISSION PLANNER & 3D GNC SIMULATION SUITE")
    print("               NASA Space Apps Challenge | Target: Mons Mouton")
    print("=" * 78)
    print(f" Python Interpreter : {sys.executable}")
    print(f" Status Direktori   : {os.getcwd()}")
    print("-" * 78)

def run_script(script_name, description):
    print("\n" + "=" * 78)
    print(f"[*] MENJALANKAN MODUL: {description}")
    print(f"[*] Skrip: {script_name}")
    print("=" * 78 + "\n")
    
    if not os.path.exists(script_name):
        print(f"[!] Error: File '{script_name}' tidak ditemukan di folder proyek!")
        input("\nTekan Enter untuk kembali ke menu utama...")
        return False

    try:
        # Menjalankan modul menggunakan interpreter Python aktif
        subprocess.run([sys.executable, script_name], check=True)
        print("\n" + "-" * 78)
        print(f"[+] Modul '{script_name}' selesai dieksekusi dengan aman.")
        print("-" * 78)
    except subprocess.CalledProcessError as e:
        print(f"\n[!] Eksekusi terhenti dengan kode keluar: {e.returncode}")
    except KeyboardInterrupt:
        print("\n[*] Eksekusi dihentikan oleh pengguna.")
    
    input("\nTekan Enter untuk kembali ke menu utama...")
    return True

def verify_system_and_data():
    clear_screen()
    print("=" * 78)
    print("           DIAGNOSTIK SISTEM & VERIFIKASI DATASET NASA")
    print("=" * 78)

    # 1. Cek Folder Wajib
    print("\n[1] Pengecekan Folder Sistem:")
    for folder in ["data", "output"]:
        exists = os.path.exists(folder)
        status = "[OK]" if exists else "[DIBUAT]"
        if not exists:
            os.makedirs(folder, exist_ok=True)
        print(f"    - Direktori '{folder:<8}': {status}")

    # 2. Cek Dataset Citra NASA di folder data/
    print("\n[2] Pengecekan Dataset Citra NASA:")
    images = []
    for root, _, files in os.walk("data"):
        for f in files:
            if f.lower().endswith((".png", ".tif", ".tiff", ".jpg")) and not f.endswith(".vrt"):
                images.append(os.path.join(root, f))

    if images:
        print(f"    - Total citra NASA terdeteksi: {len(images)} file")
        for img in images:
            size_kb = os.path.getsize(img) / 1024.0
            print(f"      * {os.path.basename(img)} ({size_kb:.1f} KB)")
    else:
        print("    [!] Peringatan: Tidak ada citra satelit NASA (.png/.tif) di folder 'data/'!")

    # 3. Cek Pustaka Dependensi Utama
    print("\n[3] Pengecekan Ketersediaan Pustaka Python:")
    packages = ["numpy", "scipy", "matplotlib", "PIL", "pygame"]
    for pkg in packages:
        try:
            __import__(pkg)
            print(f"    - Pustaka '{pkg:<11}': [TERPASANG]")
        except ImportError:
            print(f"    - Pustaka '{pkg:<11}': [BELUM TERPASANG / IMPORT ERROR]")

    # 4. Cek File Output yang Telah Dihasilkan
    print("\n[4] Status Artefak Analisis di Folder 'output/':")
    out_files = glob.glob("output/*.*")
    if out_files:
        for of in out_files:
            print(f"    - {os.path.basename(of)}")
    else:
        print("    - Belum ada file grafik yang dihasilkan.")

    print("\n" + "=" * 78)
    input("Tekan Enter untuk kembali ke menu utama...")

def run_end_to_end_pipeline():
    clear_screen()
    print("=" * 78)
    print("       EKSEKUSI PIPELINE END-TO-END MISI PENDARATAN OTONOM")
    print("=" * 78)
    print("Urutan Eksekusi Misi:")
    print(" 1. Analisis Spasial Multi-Kriteria Citra Satelit NASA LOLA DEM")
    print(" 2. Evaluasi Horizon 360°, Posisi Matahari/Bumi & Jendela Komunikasi (NASA 2026)")
    print(" 3. Solusi Dinamika Trajektori 3-DoF & Konsumsi Bahan Bakar Roket")
    print(" 4. Uji Terbang Simulator 3D Real-Time Autopilot Pinpoint Landing")
    print("-" * 78)
    confirm = input("Mulai seluruh rangkaian misi otomatis? (y/n): ").strip().lower()
    if confirm != "y":
        return

    # Tahap 1: Pemindaian Medan
    target_scan = "scan_terrain.py" if os.path.exists("scan_terrain.py") else "scan_terrain_2.py"
    print(f"\n[TAHAP 1/4] Menjalankan {target_scan}...")
    subprocess.run([sys.executable, target_scan])

    # Tahap 2: Evaluasi Cakrawala & Jendela Misi
    print("\n[TAHAP 2/4] Menjalankan solar_earth_horizon_planner.py...")
    subprocess.run([sys.executable, "solar_earth_horizon_planner.py"])

    # Tahap 3: Solusi Numerik Trajektori
    print("\n[TAHAP 3/4] Menjalankan simulate_landing.py...")
    subprocess.run([sys.executable, "simulate_landing.py"])

    # Tahap 4: Simulator 3D
    print("\n[TAHAP 4/4] Meluncurkan Simulator 3D Real-Time...")
    subprocess.run([sys.executable, "lunar_game_simulator.py"])

    print("\n[+] Seluruh rangkaian pipeline misi selesai dieksekusi!")
    input("\nTekan Enter untuk kembali ke menu utama...")

def main_menu():
    while True:
        print_banner()
        print(" PILIHAN MENU SISTEM MISI:")
        print("  [1] Modul 1: Analisis Medan Spasial & Pemilihan Tapak (scan_terrain.py)")
        print("  [2] Modul 2: Evaluasi Cakrawala 360°, Posisi Matahari & Jendela DTE (solar_earth_horizon_planner.py) ★")
        print("  [3] Modul 3: Solver Trajektori Fisika & Propulsi Roket (simulate_landing.py)")
        print("  [4] Modul 4: Simulator Uji Terbang 3D Real-Time (lunar_game_simulator.py)")
        print("  [5] Full Pipeline: Jalankan Rangkaian Misi End-to-End (1 -> 2 -> 3 -> 4)")
        print("  [6] Diagnostik Sistem: Verifikasi Integritas File & Data NASA")
        print("  [0] Keluar dari Sistem")
        print("-" * 78)

        choice = input("Pilih menu (0-6): ").strip()

        if choice == "1":
            target_scan = "scan_terrain.py" if os.path.exists("scan_terrain.py") else "scan_terrain_2.py"
            run_script(target_scan, "Multi-Criteria Terrain Hazard Scanner (NASA LRO)")
        elif choice == "2":
            run_script("solar_earth_horizon_planner.py", "360° Horizon Skyline, Solar & Earth DTE Window Analyzer")
        elif choice == "3":
            run_script("simulate_landing.py", "3-DoF Trajectory & Propulsion Dynamics Solver")
        elif choice == "4":
            run_script("lunar_game_simulator.py", "3D Pinpoint Autonomous Flight Testbed")
        elif choice == "5":
            run_end_to_end_pipeline()
        elif choice == "6":
            verify_system_and_data()
        elif choice == "0":
            print("\nKeluar dari Mission Control System. Selamat berjuang di NASA Space Apps!\n")
            sys.exit(0)
        else:
            print("\n[!] Pilihan tidak valid. Silakan masukkan angka 0 hingga 6.")
            time.sleep(1)

if __name__ == "__main__":
    main_menu()