# -*- coding: utf-8 -*-
"""
visualizer_ui.py — Fitur 3: Visualisasi Interaktif & Horizon Sky-Plot
====================================================================
Proyek  : XSasuai (Smart Unified Artemis Interface)
Event   : NASA Space Apps Challenge 2026 | Team: Pilar Karya
Target  : Mons Mouton, Kutub Selatan Bulan (-84.9°S, 33.3°W)

Fungsi:
1. Plotting 360° Polar Horizon Sky-Plot (Rintangan cakrawala, posisi Sun & Earth).
2. Generator data 14-Day Mission Timeline (0–336 jam) untuk slider interaktif (<100ms respons).
3. Status indikator keselamatan berkode warna (Hijau = Aman, Kuning = Peringatan, Merah = Kritis).
4. Pembuatan grafik profil deselerasi & trajektori pendaratan (PDI).
5. Ekspor visualisasi ke Matplotlib Figure atau Base64 PNG untuk Web UI.
"""

import io
import base64
import math
from typing import Dict, Any, List, Optional, Tuple

import numpy as np
import matplotlib
matplotlib.use("Agg")  # Thread-safe headless backend
import matplotlib.pyplot as plt

import constants as c

# Palet warna modern tema Artemis / Light Clean Claymorphism
COLOR_BG = "#ffffff"
COLOR_PANEL = "#f8fafc"
COLOR_TEXT = "#0f172a"
COLOR_ACCENT = "#2563eb"
COLOR_SAFE = "#10b981"       # Hijau Emerald
COLOR_WARN = "#f59e0b"       # Kuning Amber
COLOR_CRIT = "#ef4444"       # Merah Kritis
COLOR_SUN = "#eab308"        # Emas Matahari
COLOR_EARTH = "#0284c7"      # Biru Langit Artemis
COLOR_HORIZON = "#cbd5e1"    # Abu-abu pastel rintangan kawah


# =====================================================================
# 1. 360° POLAR HORIZON SKY-PLOT
# =====================================================================

def render_polar_skyplot(
    horizon_profile: np.ndarray,
    sun_az: float,
    sun_el: float,
    earth_az: float,
    earth_el: float,
    site_name: str = "Site Alpha",
    sun_track: Optional[List[Tuple[float, float]]] = None,
    earth_track: Optional[List[Tuple[float, float]]] = None,
    fig_size: Tuple[int, int] = (6, 6),
    dpi: int = 100
) -> plt.Figure:
    """
    Menghasilkan Matplotlib Figure 360° Polar Horizon Sky-Plot.
    - Sumbu radial: Zenith di pusat (elevasi 90°), Cakrawala di tepi (elevasi 0°).
    - Sumbu azimuth: 0° Utara, 90° Timur, 180° Selatan, 270° Barat.
    - Shading rintangan kawah (terrain obstacle mask).
    - Marker posisi Matahari dan Bumi beserta jalur lintasannya.
    """
    fig = plt.figure(figsize=fig_size, dpi=dpi, facecolor=COLOR_BG)
    ax = fig.add_subplot(111, projection="polar", facecolor=COLOR_PANEL)

    # Konfigurasi polar: 0 derajat di atas (North), searah jarum jam (East di kanan)
    ax.set_theta_zero_location("N")
    ax.set_theta_direction(-1)

    # Batas radial: 0° (Horizon) hingga 20° (Kutub Selatan Bulan memiliki elevasi matahari < 5°)
    max_radial_el = 15.0
    ax.set_ylim(0.0, max_radial_el)

    # Grid labels
    ax.set_yticks([2.0, 5.0, 10.0, 15.0])
    ax.set_yticklabels(["2°", "5°", "10°", "15°"], color="#64748b", fontsize=8)
    ax.tick_params(colors="#64748b", labelsize=9)
    ax.grid(color="#e2e8f0", linestyle="--", linewidth=0.8)

    # Sudut azimuth dalam radian
    num_pts = len(horizon_profile)
    theta = np.linspace(0, 2 * np.pi, num_pts, endpoint=False)
    r_obstacle = np.clip(horizon_profile, 0.0, max_radial_el)

    # Area rintangan cakrawala (Polygon abu-abu pastel)
    ax.fill_between(theta, 0, r_obstacle, color="#cbd5e1", alpha=0.55, label="Rintangan Kawah (Horizon)")
    ax.plot(theta, r_obstacle, color="#94a3b8", linewidth=1.5)

    # Lintasan Masa Lampau / Mendatang (Tracks) jika tersedia
    if sun_track:
        s_thetas = [math.radians(pt[0]) for pt in sun_track]
        s_radials = [max(0.0, min(max_radial_el, pt[1])) for pt in sun_track]
        ax.plot(s_thetas, s_radials, color=COLOR_SUN, linestyle=":", linewidth=1.8, alpha=0.8, label="Orbit Matahari")

    if earth_track:
        e_thetas = [math.radians(pt[0]) for pt in earth_track]
        e_radials = [max(0.0, min(max_radial_el, pt[1])) for pt in earth_track]
        ax.plot(e_thetas, e_radials, color=COLOR_EARTH, linestyle="--", linewidth=1.8, alpha=0.8, label="Librasi Bumi")

    # Posisi Matahari Saat Ini
    sun_th = math.radians(sun_az)
    sun_r = max(0.0, min(max_radial_el, sun_el))
    ax.scatter(sun_th, sun_r, color=COLOR_SUN, s=140, edgecolors="#ffffff", linewidth=2.0, zorder=5, label=f"Matahari ({sun_el:.1f}°)")

    # Posisi Bumi Saat Ini
    earth_th = math.radians(earth_az)
    earth_r = max(0.0, min(max_radial_el, earth_el))
    ax.scatter(earth_th, earth_r, color=COLOR_EARTH, s=140, edgecolors="#ffffff", linewidth=2.0, zorder=5, label=f"Bumi ({earth_el:.1f}°)")

    # Indikasi status LOS
    # Cari rintangan di azimut Matahari & Bumi
    az_idx_s = int(round((sun_az % 360.0) * (num_pts / 360.0))) % num_pts
    obs_s = horizon_profile[az_idx_s]
    sun_clear = sun_el > obs_s

    az_idx_e = int(round((earth_az % 360.0) * (num_pts / 360.0))) % num_pts
    obs_e = horizon_profile[az_idx_e]
    earth_clear = earth_el > obs_e

    title_status = f"{site_name} | Sun: {'TERANG' if sun_clear else 'TERHALANG'} | Earth: {'TERHUBUNG' if earth_clear else 'TERPUTUS'}"
    ax.set_title(title_status, color=COLOR_TEXT, fontsize=10, weight="bold", pad=15)

    legend = ax.legend(loc="upper right", bbox_to_anchor=(1.35, 1.15), facecolor="#ffffff", edgecolor="#e2e8f0", fontsize=8)
    for text in legend.get_texts():
        text.set_color(COLOR_TEXT)

    plt.tight_layout()
    return fig


def figure_to_base64_png(fig: plt.Figure) -> str:
    """Mengonversi Matplotlib Figure menjadi string Base64 PNG untuk embedding web."""
    buf = io.BytesIO()
    fig.savefig(buf, format="png", bbox_inches="tight", facecolor=fig.get_facecolor(), edgecolor="none")
    plt.close(fig)
    buf.seek(0)
    img_b64 = base64.b64encode(buf.read()).decode("utf-8")
    return f"data:image/png;base64,{img_b64}"


# =====================================================================
# 2. STATUS INDIKATOR & SAFETY BADGE HELPERS
# =====================================================================

def get_safety_badge_meta(status: str) -> Dict[str, str]:
    """
    Mengembalikan meta styling dan teks untuk badge status keselamatan:
    - OPTIMAL / SUCCESS: Hijau
    - ACCEPTABLE / DEGRADED: Kuning
    - CRITICAL / ELIMINATED / BLOCKED: Merah
    """
    norm = status.upper().strip()
    if norm in ["OPTIMAL", "SUCCESS", "SAFE", "AMAN"]:
        return {
            "status": "SAFE",
            "color": COLOR_SAFE,
            "badge_class": "badge-safe",
            "text": "AMAN (GO)",
            "icon": "✓"
        }
    elif norm in ["ACCEPTABLE", "DEGRADED", "WARNING", "WASPADA"]:
        return {
            "status": "WARNING",
            "color": COLOR_WARN,
            "badge_class": "badge-warn",
            "text": "TERDEGRADASI (MARGINAL)",
            "icon": "⚠"
        }
    else:
        return {
            "status": "CRITICAL",
            "color": COLOR_CRIT,
            "badge_class": "badge-crit",
            "text": "KRITIS (NO-GO)",
            "icon": "✗"
        }


# =====================================================================
# 3. GRAFIK PROFIL TRAJEKTORI PDI DESCENT
# =====================================================================

def render_descent_trajectory_plot(
    trajectory_data: Dict[str, Any],
    fig_size: Tuple[int, int] = (8, 3.5),
    dpi: int = 100
) -> plt.Figure:
    """
    Membuat grafik profil penurunan pendarat (Ketinggian & Kecepatan terhadap Waktu).
    """
    samples = trajectory_data.get("samples", [])
    if not samples:
        fig, ax = plt.subplots(figsize=fig_size, facecolor=COLOR_BG)
        ax.text(0.5, 0.5, "Data Trajektori Tidak Tersedia", color=COLOR_TEXT, ha="center")
        return fig

    times = [s["t_sec"] for s in samples]
    alts = [s["altitude_m"] for s in samples]
    v_verts = [s["v_vertical_ms"] for s in samples]
    speeds = [s["speed_ms"] for s in samples]
    props = [s["prop_kg"] for s in samples]

    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=fig_size, dpi=dpi, facecolor=COLOR_BG)

    # Plot 1: Ketinggian vs Waktu
    ax1.set_facecolor("#f8fafc")
    ax1.plot(times, alts, color=COLOR_ACCENT, linewidth=2.5, label="Ketinggian (m)")
    ax1.set_xlabel("Waktu (detik)", color=COLOR_TEXT, fontsize=9)
    ax1.set_ylabel("Ketinggian Relatif (m)", color=COLOR_TEXT, fontsize=9)
    ax1.set_title("Profil Ketinggian PDI", color=COLOR_TEXT, fontsize=10, weight="bold")
    ax1.tick_params(colors="#64748b", labelsize=8)
    ax1.grid(color="#e2e8f0", linestyle="--", linewidth=0.8)
    ax1.axhline(0, color=COLOR_SAFE, linestyle="--", alpha=0.9, label="Permukaan")
    ax1.legend(facecolor="#ffffff", edgecolor="#e2e8f0", labelcolor=COLOR_TEXT, fontsize=8)

    # Plot 2: Kecepatan & Propelan
    ax2.set_facecolor("#f8fafc")
    ax2.plot(times, speeds, color=COLOR_WARN, linewidth=2.0, label="Kecepatan Total (m/s)")
    ax2.plot(times, [abs(v) for v in v_verts], color=COLOR_CRIT, linestyle=":", linewidth=1.8, label="|Vz| Turun (m/s)")
    ax2.set_xlabel("Waktu (detik)", color=COLOR_TEXT, fontsize=9)
    ax2.set_ylabel("Kecepatan (m/s)", color=COLOR_TEXT, fontsize=9)
    ax2.set_title("Profil Kecepatan Deselerasi", color=COLOR_TEXT, fontsize=10, weight="bold")
    ax2.tick_params(colors="#64748b", labelsize=8)
    ax2.grid(color="#e2e8f0", linestyle="--", linewidth=0.8)
    ax2.legend(facecolor="#ffffff", edgecolor="#e2e8f0", labelcolor=COLOR_TEXT, fontsize=8)

    plt.tight_layout()
    return fig

