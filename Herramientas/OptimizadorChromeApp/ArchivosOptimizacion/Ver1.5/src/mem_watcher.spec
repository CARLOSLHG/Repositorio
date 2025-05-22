# -*- mode: python ; coding: utf-8 -*-
from pathlib import Path

block_cipher = None
src_dir = Path(".").resolve() / "src"

a = Analysis(
    [str(src_dir / "mem_watcher.py")],
    pathex=[],
    binaries=[],
    datas=[
        (str(src_dir / "limpiar_memoria.ps1"), "."),
    ],
    hiddenimports=[],
    hookspath=[],
    runtime_hooks=[],
    excludes=[],
    win_no_prefer_redirects=False,
    win_private_assemblies=False,
    cipher=block_cipher,
)

pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,
    name="mem_watcher",
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=True,
)

coll = COLLECT(
    exe,
    a.binaries,
    a.zipfiles,
    a.datas,
    strip=False,
    upx=True,
    upx_exclude=[],
    name="mem_watcher"
)

distpath = str(Path("BuildFinal", "mem_watcher").resolve())
workpath = str(Path(".", "pyi_build").resolve())
