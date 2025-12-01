# hooks/hook-six.py
# Fuerza a PyInstaller a incluir six y sus alias más comunes
hiddenimports = [
    "six",
    "six.moves",
    "urllib3.packages.six",
    "urllib3.packages.six.moves",
    "setuptools.extern.six.moves",
]
