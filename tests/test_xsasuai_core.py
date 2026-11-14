# -*- coding: utf-8 -*-
"""
test_xsasuai_core.py — Unit Tests for XSasuai Core Engine
"""
import sys
import os

# Pastikan root direktori ada di sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from datetime import datetime

import constants as c
import mission_state
from src import site_evaluator, trajectory_calculator, visualizer_ui


def test_site_evaluation():
    print("Testing Site Evaluation...")
    dt = datetime(2026, 11, 14, 12, 0, 0)
    res = site_evaluator.evaluate_site_at_datetime("ALPHA", dt)
    assert res["site_key"] == "ALPHA"
    assert "mcda" in res
    assert "total_score" in res["mcda"]
    assert "horizon_profile" in res
    assert len(res["horizon_profile"]) == 360
    print(f"  ALPHA MCDA Score: {res['mcda']['total_score']}, Status: {res['mcda']['status']}")
    print("✓ Site Evaluation PASS")


def test_14day_window():
    print("Testing 14-day Window Timeline...")
    dt = datetime(2026, 11, 14, 0, 0, 0)
    timeline = site_evaluator.evaluate_14day_mission_window("ALPHA", dt, hours=48, step_hours=6)
    assert len(timeline) > 0
    print(f"  Generated {len(timeline)} timeline points")
    print("✓ 14-day Window PASS")


def test_trajectory_calculator():
    print("Testing Trajectory Calculator...")
    traj = trajectory_calculator.calculate_pdi_trajectory("ALPHA")
    assert "total_delta_v_ms" in traj
    assert "prop_remaining_kg" in traj
    assert traj["duration_s"] > 0
    print(f"  Delta-v: {traj['total_delta_v_ms']} m/s, Propellant Remaining: {traj['prop_remaining_kg']} kg, Status: {traj['status']}")
    print("✓ Trajectory PASS")


def test_corridor_validation():
    print("Testing Approach Corridor Validation...")
    dem, res_m = site_evaluator.load_dem_data()
    corridor = trajectory_calculator.validate_descent_corridor("ALPHA", dem, res_m)
    assert "min_clearance_m" in corridor
    print(f"  Corridor Min Clearance: {corridor['min_clearance_m']} m, Safe: {corridor['safe_corridor']}")
    print("✓ Corridor PASS")


def test_visualizer():
    print("Testing Visualizer UI...")
    dem, res_m = site_evaluator.load_dem_data()
    site_info = c.SITES_CONFIG["ALPHA"]
    py, px = site_info["pixel_coord"]
    profile = site_evaluator.raymarch_horizon_profile(dem, py, px, res_m)

    fig = visualizer_ui.render_polar_skyplot(profile, 45.0, 2.5, 12.0, 7.0, "Site Alpha")
    b64 = visualizer_ui.figure_to_base64_png(fig)
    assert b64.startswith("data:image/png;base64,")
    print(f"  Polar Sky-Plot Base64 length: {len(b64)} chars")

    traj = trajectory_calculator.calculate_pdi_trajectory("ALPHA")
    fig2 = visualizer_ui.render_descent_trajectory_plot(traj)
    b64_2 = visualizer_ui.figure_to_base64_png(fig2)
    assert b64_2.startswith("data:image/png;base64,")
    print(f"  Trajectory Plot Base64 length: {len(b64_2)} chars")
    print("✓ Visualizer PASS")


if __name__ == "__main__":
    test_site_evaluation()
    test_14day_window()
    test_trajectory_calculator()
    test_corridor_validation()
    test_visualizer()
    print("\nALL TESTS PASSED SUCCESSFULLY! [PASS]")
