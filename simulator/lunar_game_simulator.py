# -*- coding: utf-8 -*-
"""
simulator/lunar_game_simulator.py — Runner wrapper
"""
import os
import sys

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from lunar_game_simulator import main

if __name__ == "__main__":
    main()

