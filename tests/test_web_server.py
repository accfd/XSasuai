# -*- coding: utf-8 -*-
"""
test_web_server.py — Automated endpoint integration test for XSasuai Web Application
"""
import sys
import os
import time
import threading
import requests

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from web.server import make_app
import tornado.ioloop

def run_test_server(port=8899):
    app = make_app()
    app.listen(port)
    tornado.ioloop.IOLoop.current().start()

def test_endpoints():
    port = 8899
    base_url = f"http://127.0.0.1:{port}"

    # Start server in daemon thread
    server_thread = threading.Thread(target=run_test_server, args=(port,), daemon=True)
    server_thread.start()
    time.sleep(1.0)

    # 1. Test Static Index
    r = requests.get(f"{base_url}/")
    assert r.status_code == 200
    assert "Xesuai" in r.text or "XESUAI" in r.text
    print("✓ GET / (Static Index) PASS")

    # 2. Test /api/sites
    r = requests.get(f"{base_url}/api/sites")
    assert r.status_code == 200
    data = r.json()
    assert "ALPHA" in data["sites"]
    print("✓ GET /api/sites PASS")

    # 3. Test /api/state
    r = requests.get(f"{base_url}/api/state")
    assert r.status_code == 200
    print("✓ GET /api/state PASS")

    # 4. Test /api/trajectory
    r = requests.post(f"{base_url}/api/trajectory", json={"site": "ALPHA"})
    assert r.status_code == 200
    traj = r.json()
    assert "total_delta_v_ms" in traj
    assert "chart_b64" in traj
    print("✓ POST /api/trajectory PASS")

    # 5. Test /api/evaluate
    r = requests.post(f"{base_url}/api/evaluate", json={"site": "ALPHA", "date": "2026-11-14", "time": "12:00"})
    assert r.status_code == 200
    ev = r.json()
    assert "skyplot_b64" in ev
    assert "mcda" in ev
    print("✓ POST /api/evaluate PASS")

    print("\nALL WEB ENDPOINTS TESTED & PASSED! 🚀")

if __name__ == "__main__":
    test_endpoints()

