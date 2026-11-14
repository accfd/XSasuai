# -*- coding: utf-8 -*-
"""
server.py — Tornado Web Server for XSasuai Web Application
==========================================================
Proyek  : XSasuai (Smart Unified Artemis Interface)
Event   : NASA Space Apps Challenge 2026 | Team: Pilar Karya
Target  : Mons Mouton, Kutub Selatan Bulan (-84.9°S, 33.3°W)
"""

import os
import sys
import json
import logging
import subprocess
from datetime import datetime, timedelta
from dataclasses import asdict

import numpy as np
import tornado.ioloop
import tornado.web
import tornado.escape

# Root direktori ke sys.path
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

import constants as c
import mission_state
from src import site_evaluator, trajectory_calculator, visualizer_ui

logging.basicConfig(level=logging.INFO, format="[%(asctime)s] %(levelname)s — %(message)s", datefmt="%H:%M:%S")
logger = logging.getLogger("XSasuai.WebServer")


class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        if isinstance(obj, (np.floating, np.float32, np.float64)):
            return float(obj)
        if isinstance(obj, (np.integer, np.int32, np.int64)):
            return int(obj)
        return super().default(obj)


class BaseApiHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.set_header("Access-Control-Allow-Headers", "Content-Type")

    def options(self):
        self.set_status(204)
        self.finish()

    def write_json(self, data, status=200):
        self.set_status(status)
        self.set_header("Content-Type", "application/json")
        self.write(json.dumps(data, indent=2, cls=NumpyEncoder))


class StateHandler(BaseApiHandler):
    """GET /api/state — Mengembalikan shared mission state saat ini."""
    def get(self):
        state = mission_state.load_state()
        self.write_json(asdict(state))


class SitesHandler(BaseApiHandler):
    """GET /api/sites — Mengembalikan daftar situs konfigurasi."""
    def get(self):
        sites_data = {}
        for k, v in c.SITES_CONFIG.items():
            sites_data[k] = {
                "name": v["name"],
                "short": v["short"],
                "tag": v["tag"],
                "pixel": v["pixel_coord"],
                "elev_m": v["elev_m"],
                "slope_deg": v["slope_deg"],
                "lat_deg": v["lat_deg"],
                "lon_deg": v["lon_deg"],
                "desc": v["desc"],
                "color_hex": v["color_hex"]
            }
        self.write_json({"sites": sites_data, "priority": c.SITE_PRIORITY_ORDER})


class SelectSiteHandler(BaseApiHandler):
    """POST /api/select_site — Mengganti situs aktif."""
    def post(self):
        try:
            req = tornado.escape.json_decode(self.request.body)
            site_key = req.get("site_key", "ALPHA").upper()
            if site_key not in c.SITES_CONFIG:
                return self.write_json({"error": f"Situs {site_key} tidak valid"}, 400)

            # Update shared mission state
            state = mission_state.load_state()
            state.selected_site = site_key
            site_info = c.SITES_CONFIG[site_key]
            py, px = site_info["pixel_coord"]
            state.target_coords_3d = [float(px * c.RES_PIXEL_M), float(py * c.RES_PIXEL_M), float(site_info["elev_m"])]
            mission_state.save_state(state)

            self.write_json({"status": "OK", "selected_site": site_key, "site_info": site_info})
        except Exception as e:
            self.write_json({"error": str(e)}, 500)


class EvaluateHandler(BaseApiHandler):
    """POST /api/evaluate — Evaluasi komprehensif situs & waktu tertentu."""
    def post(self):
        try:
            req = tornado.escape.json_decode(self.request.body)
            site_key = req.get("site", "ALPHA").upper()
            date_str = req.get("date", "2026-11-14")
            time_str = req.get("time", "12:00")

            dt = datetime.strptime(f"{date_str} {time_str}", "%Y-%m-%d %H:%M")
            eval_res = site_evaluator.evaluate_site_at_datetime(site_key, dt)

            # Render polar skyplot ke base64
            horizon_profile = np.array(eval_res["horizon_profile"])
            fig = visualizer_ui.render_polar_skyplot(
                horizon_profile=horizon_profile,
                sun_az=eval_res["sun"]["azimuth_deg"],
                sun_el=eval_res["sun"]["elevation_deg"],
                earth_az=eval_res["earth"]["azimuth_deg"],
                earth_el=eval_res["earth"]["elevation_deg"],
                site_name=eval_res["site_name"]
            )
            plot_b64 = visualizer_ui.figure_to_base64_png(fig)
            eval_res["skyplot_b64"] = plot_b64

            # Update shared mission state
            state = mission_state.load_state()
            state.selected_site = site_key
            state.landing_date = date_str
            state.landing_time_utc = time_str
            state.sun_az = eval_res["sun"]["azimuth_deg"]
            state.sun_el = eval_res["sun"]["elevation_deg"]
            state.earth_az = eval_res["earth"]["azimuth_deg"]
            state.earth_el = eval_res["earth"]["elevation_deg"]
            state.solar_ok = eval_res["sun"]["is_illuminated"]
            state.dte_ok = eval_res["earth"]["is_visible"]
            state.horizon_planned = True
            mission_state.save_state(state)

            self.write_json(eval_res)
        except Exception as e:
            logger.error(f"Error in EvaluateHandler: {e}")
            self.write_json({"error": str(e)}, 500)


class TimelineHandler(BaseApiHandler):
    """GET /api/timeline?site=ALPHA&hours=336&step=3 — Data timeline untuk slider 14 hari."""
    def get(self):
        try:
            site_key = self.get_argument("site", "ALPHA").upper()
            hours = int(self.get_argument("hours", 336))
            step = int(self.get_argument("step", 3))

            start_dt = c.MISSION_EPOCH + timedelta(days=c.date_to_day_offset("2026-11-14"))
            timeline_data = site_evaluator.evaluate_14day_mission_window(site_key, start_dt, hours=hours, step_hours=step)

            self.write_json({"site": site_key, "count": len(timeline_data), "timeline": timeline_data})
        except Exception as e:
            logger.error(f"Error in TimelineHandler: {e}")
            self.write_json({"error": str(e)}, 500)


class TrajectoryHandler(BaseApiHandler):
    """POST /api/trajectory — Hitung trajektori PDI hingga touchdown."""
    def post(self):
        try:
            req = tornado.escape.json_decode(self.request.body) if self.request.body else {}
            site_key = req.get("site", "ALPHA").upper()

            traj_data = trajectory_calculator.calculate_pdi_trajectory(site_key)

            # Render grafik trajektori ke base64
            fig = visualizer_ui.render_descent_trajectory_plot(traj_data)
            chart_b64 = visualizer_ui.figure_to_base64_png(fig)
            traj_data["chart_b64"] = chart_b64

            # Update mission state
            state = mission_state.load_state()
            state.total_dv_ms = traj_data["total_delta_v_ms"]
            state.prop_remaining_kg = traj_data["prop_remaining_kg"]
            state.trajectory_solved = True
            mission_state.save_state(state)

            self.write_json(traj_data)
        except Exception as e:
            logger.error(f"Error in TrajectoryHandler: {e}")
            self.write_json({"error": str(e)}, 500)


class LaunchSimHandler(BaseApiHandler):
    """POST /api/launch_sim — Meluncurkan Pygame Flight Simulator 3D di window terpisah."""
    def post(self):
        try:
            python_exe = sys.executable
            sim_script = os.path.join(BASE_DIR, "lunar_game_simulator.py")
            if not os.path.isfile(sim_script):
                sim_script = os.path.join(BASE_DIR, "simulator", "lunar_game_simulator.py")

            # Spawn subprocess di background tanpa block server
            subprocess.Popen([python_exe, sim_script], cwd=BASE_DIR)
            self.write_json({"status": "SUCCESS", "message": "Lunar Game Simulator 3D berhasil diluncurkan!"})
        except Exception as e:
            logger.error(f"Gagal meluncurkan simulator: {e}")
            self.write_json({"status": "ERROR", "message": str(e)}, 500)


class NoCacheStaticFileHandler(tornado.web.StaticFileHandler):
    """Menonaktifkan cache browser untuk menjamin perubahan index.html langsung muncul."""
    def set_extra_headers(self, path):
        self.set_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.set_header("Pragma", "no-cache")
        self.set_header("Expires", "0")


def make_app():
    web_dir = os.path.dirname(os.path.abspath(__file__))
    data_dir = os.path.join(BASE_DIR, "data")
    return tornado.web.Application([
        (r"/api/state", StateHandler),
        (r"/api/sites", SitesHandler),
        (r"/api/select_site", SelectSiteHandler),
        (r"/api/evaluate", EvaluateHandler),
        (r"/api/timeline", TimelineHandler),
        (r"/api/trajectory", TrajectoryHandler),
        (r"/api/launch_sim", LaunchSimHandler),
        (r"/data/(.*)", tornado.web.StaticFileHandler, {"path": data_dir}),
        (r"/(.*)", NoCacheStaticFileHandler, {"path": web_dir, "default_filename": "index.html"}),
    ])


def run_server(port=8888):
    app = make_app()
    max_retries = 5
    for attempt in range(max_retries):
        target_port = port + attempt
        try:
            app.listen(target_port)
            logger.info(f"🚀 XSasuai Web Application aktif di: http://127.0.0.1:{target_port}")
            tornado.ioloop.IOLoop.current().start()
            break
        except OSError as e:
            if attempt < max_retries - 1:
                logger.warning(f"Port {target_port} sedang sibuk, mencoba port {target_port + 1}...")
            else:
                logger.error(f"Gagal mengikat port setelah {max_retries} percobaan: {e}")
                raise


if __name__ == "__main__":
    import numpy as np
    run_server(8888)
