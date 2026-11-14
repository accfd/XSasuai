# -*- coding: utf-8 -*-
"""
simulator/__init__.py
"""
import os
import sys

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from lunar_game_simulator import PygameSimulator

__all__ = ["PygameSimulator"]

