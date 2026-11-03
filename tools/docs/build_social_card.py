"""Compatibility entry point for the current portal social card renderer."""
from pathlib import Path
import subprocess

root = Path(__file__).resolve().parents[2]
subprocess.run(["node", str(root / "tools/docs/build_social_card.mjs")], cwd=root, check=True)
