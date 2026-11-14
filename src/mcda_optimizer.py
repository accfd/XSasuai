# -*- coding: utf-8 -*-
"""
mcda_optimizer.py — Multi-Criteria Decision Analysis (MCDA) Scoring Engine
==========================================================================
Proyek  : XASUAI (NASA Space Apps Challenge 2026 - Mons Mouton Lunar Landing Navigator)
"""

from typing import Dict, Any
import constants as c

def calculate_mcda_score(
    site_key: str,
    slope_deg: float,
    sun_visible: bool,
    sun_el: float,
    earth_visible: bool,
    earth_el: float,
    delta_v_ms: float = 1714.8
) -> Dict[str, Any]:
    """
    Menghitung skor kelayakan pendaratan multi-kriteria:
    Score = w_illum * I(t) + w_comm * C(t) + w_slope * (1 - theta / 10 deg) + w_dv * (1 - dv / dv_max)
    
    Hard Gate: Kemiringan lereng >= 10 derajat langsung mengeliminasi situs (Skor = 0).
    """
    if slope_deg >= c.MAX_LANDING_SLOPE_DEG:
        return {
            "total_score": 0.0,
            "slope_score": 0.0,
            "illum_score": 0.0,
            "dte_score": 0.0,
            "dv_score": 0.0,
            "status": "UNFEASIBLE_SLOPE",
            "is_feasible": False,
            "recommendation": "DITOLAK: Kemiringan lereng melebihi batas struktural pendarat (> 10°)"
        }

    # Skor Lereng (0 - 1)
    slope_score = max(0.0, 1.0 - (slope_deg / c.MAX_LANDING_SLOPE_DEG))

    # Skor Iluminasi Surya (0 - 1)
    if sun_visible and sun_el > 0.0:
        illum_score = min(1.0, sun_el / 3.0)  # Optimal pada elevasi surya ~1.5° - 3°
    else:
        illum_score = 0.0

    # Skor Komunikasi Direct-to-Earth (0 - 1)
    if earth_visible and earth_el > 0.0:
        dte_score = min(1.0, earth_el / 10.0)
    else:
        dte_score = 0.0

    # Skor Efisiensi Propulsi Delta-V (0 - 1)
    max_allowable_dv = 2200.0
    dv_score = max(0.0, min(1.0, 1.0 - (delta_v_ms / max_allowable_dv)))

    # Pembobotan Standar Artemis Landing Site Criteria
    w_slope = 0.35
    w_illum = 0.35
    w_dte = 0.30

    total_score = round(w_slope * slope_score + w_illum * illum_score + w_dte * dte_score, 4)

    # Klasifikasi Status
    if total_score >= 0.75:
        status = "EXCELLENT"
        rec = "SANGAT OPTIMAL: Cahaya surya penuh, komunikasi DTE stabil, lereng datar aman."
    elif total_score >= 0.50:
        status = "NOMINAL"
        rec = "LAYAK (GO): Memenuhi parameter standar pendaratan aman Artemis."
    elif total_score >= 0.25:
        status = "DEGRADED"
        rec = "TERBATAS: Salah satu aspek kritis (cahaya/sinyal) berada pada ambang batas."
    else:
        status = "CRITICAL"
        rec = "KRITIS: Resiko tinggi kehilangan daya atau sinyal komunikasi Bumi."

    return {
        "total_score": total_score,
        "slope_score": round(slope_score, 3),
        "illum_score": round(illum_score, 3),
        "dte_score": round(dte_score, 3),
        "dv_score": round(dv_score, 3),
        "status": status,
        "is_feasible": total_score >= 0.30,
        "recommendation": rec
    }

