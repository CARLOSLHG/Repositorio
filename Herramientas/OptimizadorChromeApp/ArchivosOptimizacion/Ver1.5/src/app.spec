# -*- mode: python ; coding: utf-8 -*-
from pathlib import Path

block_cipher = None
src_dir = Path(".").resolve() / "src"
icon_path = str(Path("installer") / "optimizador_chrome.ico")

a = Analysis(
    [str(src_dir / "app.py")],
    pathex=[],
    binaries=[],
    datas=[
        (str(src_dir / "limpiar_memoria.ps1"), "."),
        (str(src_dir / "verificar_extensiones.ps1"), "."),
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
    name="app",
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=False,
    icon=icon_path,
)

coll = COLLECT(
    exe,
    a.binaries,
    a.zipfiles,
    a.datas,
    strip=False,
    upx=True,
    upx_exclude=[],
    name="app"
)

distpath = str(Path("BuildFinal", "app").resolve())
workpath = str(Path(".", "pyi_build").resolve())
