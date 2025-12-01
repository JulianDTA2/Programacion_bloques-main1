# -*- mode: python ; coding: utf-8 -*-

block_cipher = None

a = Analysis(
    ['start.py'],
    pathex=[],
    binaries=[],
    datas=[
    ('ardublocklyserver', 'ardublocklyserver'),
    ('ArdublocklySketch', 'ArdublocklySketch'),
    ('arduino-1.8.19', 'arduino-1.8.19'), # <--- DESCOMENTAR SOLO PARA LA VERSIÓN FINAL (Copia manual es más rápida para pruebas)
    ('blockly', 'blockly'),
    ('blocks', 'blocks'),
    ('closure-library', 'closure-library'),
    ('examples', 'examples'),
    ('package', 'package'),
    ('sketch', 'sketch'),
    ('ardublockly', 'ardublockly')
    ],
    hiddenimports=['ctypes', 'ctypes.wintypes', 'asyncore', 'bottle', 'configparser', 'pathlib', 'six'],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
    optimize=0,
)

pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,  # onedir
    name='RoboticLab',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=False,  # Mantener en False para evitar problemas
    upx_exclude=[],
    runtime_tmpdir=None,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    icon=['RoboticMinds.ico'],
)

coll = COLLECT(
    exe,
    a.binaries,
    a.datas,
    strip=False,
    upx=False,  # Mantener consistente con EXE
    upx_exclude=[],
    name='RoboticLab',
)