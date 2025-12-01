# Ardublockly - Editor Visual de Programación para Arduino

**Ardublockly** es un editor de programación visual para Arduino basado en [Google Blockly](https://developers.google.com/blockly/). Permite programar Arduino mediante bloques visuales de arrastrar y soltar, generando código Arduino automáticamente.

Esta versión ha sido personalizada y empaquetada como **RoboticMinds Portable** para facilitar su distribución y uso.

## 🌟 Características

* ✨ Genera código Arduino mediante bloques visuales drag-and-drop
* 🔌 Sube el código directamente a una placa Arduino
* ⚠️ Advertencias útiles en bloques de código
* 🎯 Compatible con amplia gama de placas Arduino oficiales
* 💻 Funciona en Windows / Linux / Mac OS X

## ⚠️ IMPORTANTE: Archivos NO Incluidos en Este Repositorio

> **Nota**: Debido a las limitaciones de tamaño de GitHub (archivos >100MB), este repositorio **NO incluye** algunos archivos necesarios que debes descargar por separado. ¡No te preocupes! Los archivos siguen estando en la máquina original, solo no están en GitHub.

### 📦 Archivos Excluidos (Debes Descargar)

**Los siguientes archivos NO están en este repositorio de GitHub** porque son muy pesados (~210MB+), pero son necesarios para que funcione:

1. **Arduino IDE 1.8.19 (Portable)** - Requerido ✅
   - 📥 **Descargar**: [Arduino 1.8.19 Windows](https://downloads.arduino.cc/arduino-1.8.19-windows.zip) (210MB)
   - 📥 Alternativa: [Todas las versiones de Arduino IDE](https://www.arduino.cc/en/software)
   - 📂 **Dónde colocar**: Extraer en la carpeta raíz del proyecto como `arduino-1.8.19/`
   - ⚠️ **Versión recomendada**: 1.8.19 (versión usada en desarrollo original)

2. **Entorno Virtual Python** - Se crea automáticamente
   - 📂 Carpeta `.venv/` (no incluida, se genera con `python -m venv .venv`)
   - Contiene las librerías Python instaladas

3. **Archivos de Build** - Se generan localmente
   - 📂 Carpetas `dist/` y `build/` (generadas por PyInstaller)
   - Solo necesarias si quieres crear el ejecutable portable

### ✅ Lo Que SÍ Está Incluido

- ✅ Código fuente completo de Ardublockly
- ✅ Servidor Python (`ardublocklyserver/`)
- ✅ Interfaz web (`ardublockly/`)
- ✅ Definiciones de bloques (`blocks/`)
- ✅ Ejemplos (`examples/`)
- ✅ Librerías Blockly y Closure (submódulos Git)
- ✅ Archivo `requirements.txt` con todas las dependencias Python

## 📋 Requisitos del Sistema

### Software Necesario

1. **Python 3.6 o superior** ✅
   - **Versión usada en desarrollo**: Python 3.13.1
   - **Versión mínima**: Python 3.6+
   - 📥 Descargar desde: https://www.python.org/downloads/
   - ⚠️ **IMPORTANTE**: Durante la instalación, **MARCAR** la opción **"Add Python to PATH"**
   - Verificar instalación: `python --version`

2. **Arduino IDE 1.8.19** ✅ (Requerido)
   - **Versión exacta usada**: 1.8.19
   - 📥 **Descargar Windows**: [arduino-1.8.19-windows.zip](https://downloads.arduino.cc/arduino-1.8.19-windows.zip) (210MB)
   - 📥 **Otras plataformas**: [Arduino IDE Downloads](https://www.arduino.cc/en/software)
   - ⚠️ **Recomendación**: Usar versión 1.8.19 para máxima compatibilidad

3. **Git** (Opcional, para clonar repositorio)
   - 📥 Descargar desde: https://git-scm.com/downloads
   - Alternativa: Descargar proyecto como ZIP desde GitHub

### Sistemas Operativos Compatibles

- ✅ Windows 7/8/10/11 (64-bit recomendado)
- ✅ macOS 10.12 o superior
- ✅ Linux (Ubuntu 18.04+, Debian, Fedora, etc.)

## 🚀 Instalación Completa (Paso a Paso)

### Paso 1: Obtener el Código Fuente

#### Opción A: Clonar desde GitHub (Recomendado)

```bash
# 1. Clonar el repositorio con submódulos
git clone https://github.com/MdavidC-DevTech/Programacion_bloques.git
cd Programacion_bloques

# 2. Inicializar submódulos (blockly y closure-library)
git submodule update --init --recursive
```

#### Opción B: Descargar ZIP

1. Ir a https://github.com/MdavidC-DevTech/Programacion_bloques
2. Click en **Code** → **Download ZIP**
3. Extraer en una carpeta de tu elección
4. Abrir terminal/CMD en esa carpeta

### Paso 2: Configurar Entorno Virtual Python

```bash
# 1. Verificar que Python está instalado
python --version
# Debe mostrar: Python 3.x.x

# 2. Crear entorno virtual (RECOMENDADO)
python -m venv .venv

# 3. Activar entorno virtual
# En Windows:
.venv\Scripts\activate

# En Linux/Mac:
source .venv/bin/activate

# 4. Instalar TODAS las dependencias desde requirements.txt
pip install -r requirements.txt
```

**Dependencias que se instalarán** (ver `requirements.txt` completo):
- `bottle==0.12.25` - Framework web
- `gevent==25.9.1` - Servidor HTTP concurrente
- `pyinstaller==6.16.0` - Para crear ejecutables
- `requests==2.32.5` - Cliente HTTP
- `waitress==3.0.2` - Servidor WSGI
- Y más... (~29 paquetes en total)

### Paso 3: Instalar Arduino IDE 1.8.19

**Windows:**

1. 📥 Descargar: [arduino-1.8.19-windows.zip](https://downloads.arduino.cc/arduino-1.8.19-windows.zip) (210MB)
2. Extraer el ZIP en la **carpeta raíz del proyecto** (al mismo nivel que `start.py`)
3. Debe quedar: `Programacion_bloques/arduino-1.8.19/arduino.exe`
4. ⚠️ **Importante**: La carpeta debe llamarse exactamente `arduino-1.8.19`

**Linux:**

```bash
# Instalar desde repositorio (Ubuntu/Debian)
sudo apt-get update
sudo apt-get install arduino

# O descargar desde Arduino.cc
wget https://downloads.arduino.cc/arduino-1.8.19-linux64.tar.xz
tar -xvf arduino-1.8.19-linux64.tar.xz
```

**macOS:**

1. 📥 Descargar desde: https://www.arduino.cc/en/software
2. Instalar la aplicación en `/Applications/Arduino.app`

### Paso 4: Verificar Estructura del Proyecto

Tu carpeta debe verse así:

```
Programacion_bloques/
├── .venv/                    ← Entorno virtual (creado en Paso 2)
├── arduino-1.8.19/           ← Arduino IDE (descargado en Paso 3)
│   ├── arduino.exe           (Windows)
│   ├── arduino_debug.exe     (Windows)
│   └── ...
├── ardublockly/              ← Código fuente (incluido)
├── ardublocklyserver/        ← Servidor Python (incluido)
├── blockly/                  ← Submódulo (incluido)
├── closure-library/          ← Submódulo (incluido)
├── blocks/                   ← Bloques Arduino (incluido)
├── examples/                 ← Ejemplos (incluido)
├── start.py                  ← Script principal (incluido)
├── requirements.txt          ← Dependencias (incluido)
└── README_ES.md              ← Este archivo
```

## ▶️ Ejecutar el Programa

### Método 1: Usando Python (Desarrollo)

```bash
# 1. Activar entorno virtual (si no está activado)
# Windows:
.venv\Scripts\activate
# Linux/Mac:
source .venv/bin/activate

# 2. Ejecutar el servidor
python start.py
```

El navegador se abrirá automáticamente en `http://localhost:8000`

### Método 2: Versión Portable (Ejecutable)

Si tienes la versión empaquetada con PyInstaller:

```bash
# Windows:
.\dist\start\start.exe

# El ejecutable incluye todo lo necesario excepto Arduino IDE
```

## ⚙️ Configuración Inicial

### Primera vez que ejecutas Ardublockly:

1. **Abrir la aplicación** - Se abrirá en tu navegador
2. **Ir a Configuración** (Settings) - Ícono de engranaje ⚙️
3. **Establecer ruta de Arduino IDE**:
   - Windows: `C:\Program Files\Arduino\arduino_debug.exe` o `C:\Program Files (x86)\Arduino\arduino_debug.exe`
   - Linux: `/usr/bin/arduino` o `/usr/local/bin/arduino`
   - macOS: `/Applications/Arduino.app/Contents/MacOS/Arduino`
4. **Seleccionar tu Placa Arduino** (ej: Arduino Uno, Mega, Nano, etc.)
5. **Seleccionar Puerto COM** al que está conectada tu placa

## 📂 Estructura del Proyecto

```
Programacion_bloques/
├── ardublockly/          # Interfaz web principal
│   ├── index.html        # Página principal
│   ├── ardublockly.js    # Lógica principal
│   └── msg/              # Traducciones
├── ardublocklyserver/    # Servidor Python backend
│   ├── server.py         # Servidor HTTP
│   ├── actions.py        # Acciones (compilar, subir)
│   └── compilersettings.py
├── blockly/              # Librería Google Blockly (submódulo)
├── closure-library/      # Google Closure Library (submódulo)
├── blocks/               # Definiciones de bloques Arduino
├── examples/             # Ejemplos de proyectos
├── start.py              # Punto de entrada principal
├── requirements.txt      # Dependencias Python
└── README_ES.md          # Este archivo
```

## 🔧 Dependencias Principales

Las dependencias se instalan automáticamente con `pip install -r requirements.txt`:

- **bottle** (0.12.25) - Framework web ligero
- **gevent** (25.9.1) - Servidor concurrente
- **pyinstaller** (6.16.0) - Para crear ejecutables
- **requests** (2.32.5) - Cliente HTTP
- **waitress** (3.0.2) - Servidor WSGI
- Y más... (ver `requirements.txt`)

## 🛠️ Desarrollo y Personalización

### Crear Ejecutable Portable (.exe) con PyInstaller

Si quieres crear un ejecutable portable (como `RoboticLab.exe`) que funcione sin necesidad de instalar Python:

#### Requisitos Previos

1. Tener todo funcionando con `python start.py`
2. Tener PyInstaller instalado (ya está en `requirements.txt`)
3. Tener la carpeta `arduino-1.8.19/` en tu proyecto

#### Pasos para Crear el Ejecutable

```bash
# 1. Activar entorno virtual
.venv\Scripts\activate

# 2. Verificar que PyInstaller está instalado
pip show pyinstaller
# Debe mostrar: Version: 6.16.0

# 3. Ejecutar PyInstaller con el archivo spec
pyinstaller start.spec
```

#### ¿Qué Hace PyInstaller?

PyInstaller analiza tu código Python y:

1. **Crea carpeta `build/`** - Archivos temporales de compilación
   - 📂 `build/RoboticLab/` - Archivos intermedios (.pyc, análisis de dependencias)
   - ⚠️ **Para qué sirve**: PyInstaller guarda aquí archivos temporales durante el proceso
   - 💡 **Nota**: Esta carpeta se puede **borrar** después de crear el .exe
   - No es necesaria para ejecutar el programa, solo para compilar

2. **Crea carpeta `dist/`** - Aplicación final lista para distribuir
   - 📂 `dist/RoboticLab/` - Carpeta con el ejecutable y todas las dependencias
   - 📄 `dist/RoboticLab/RoboticLab.exe` - **Este es tu ejecutable portable**
   - 📦 Incluye: Python empaquetado, todas las librerías, archivos del proyecto
   - ✅ **Esta carpeta SÍ es necesaria** - Contiene tu aplicación completa

#### Estructura Después de PyInstaller

```
Programacion_bloques/
├── build/                    ← Archivos temporales (se puede borrar)
│   └── RoboticLab/          
│       └── ... (archivos .pyc, análisis)
├── dist/                     ← Aplicación final portable
│   └── RoboticLab/          
│       ├── RoboticLab.exe   ← Tu ejecutable principal
│       ├── _internal/        ← Carpetas con dependencias empaquetadas
│       │   ├── ardublockly/
│       │   ├── arduino-1.8.19/
│       │   ├── blockly/
│       │   └── ... (todo lo necesario)
│       └── ... (DLLs, librerías)
├── .venv/                    ← Entorno virtual (no se empaqueta)
├── start.py                  ← Código fuente original
└── start.spec                ← Configuración de PyInstaller
```

#### Ejecutar tu Aplicación Portable

```bash
# Opción 1: Desde la línea de comandos
.\dist\RoboticLab\RoboticLab.exe

# Opción 2: Doble click en el archivo
# Navegar a dist\RoboticLab\ y hacer doble click en RoboticLab.exe
```

#### Distribuir tu Aplicación

Para compartir tu aplicación con otros:

1. **Comprimir la carpeta `dist/RoboticLab/`** completa en un ZIP
2. Los usuarios solo necesitan:
   - Extraer el ZIP
   - Ejecutar `RoboticLab.exe`
   - **NO necesitan** instalar Python ni dependencias
   - Sí necesitan descargar Arduino IDE 1.8.19 por separado

#### Personalizar el Ejecutable

El archivo `start.spec` controla cómo se empaqueta. Aspectos clave:

```python
# Nombre del ejecutable
name='RoboticLab'  # Se crea RoboticLab.exe

# Ícono del ejecutable
icon=['RoboticMinds.ico']  # Tu ícono personalizado

# Archivos a incluir
datas=[
    ('ardublocklyserver', 'ardublocklyserver'),
    ('arduino-1.8.19', 'arduino-1.8.19'),  # Arduino IDE incluido
    ('ardublockly', 'ardublockly'),
    # ... etc
]

# Modo consola (True = muestra ventana de comandos, False = no)
console=True  # Útil para ver errores durante desarrollo
```

#### Solución de Problemas con PyInstaller

**Error: "ModuleNotFoundError"**
```bash
# Agregar módulo faltante a hiddenimports en start.spec
hiddenimports=['ctypes', 'bottle', 'tu_modulo_faltante']
# Luego volver a ejecutar: pyinstaller start.spec
```

**El .exe es muy grande (>500MB)**
- Es normal, incluye Python + todas las librerías + Arduino IDE
- Si quieres reducir tamaño, puedes excluir `arduino-1.8.19` del spec

**Error al ejecutar el .exe**
```bash
# Ejecutar desde CMD para ver errores
.\dist\RoboticLab\RoboticLab.exe

# O activar modo debug en start.spec
debug=True  # Genera más logs
```

### Modificar Bloques de Arduino

Los bloques se definen en la carpeta `blocks/`. Para agregar nuevos bloques:

1. Editar archivos en `blocks/` (ej: `blocks/arduino.js`)
2. Reiniciar el servidor
3. Recargar el navegador

## 🐛 Solución de Problemas

### El servidor no inicia

```bash
# Verificar que Python está instalado
python --version

# Verificar que las dependencias están instaladas
pip list

# Reinstalar dependencias
pip install -r requirements.txt --force-reinstall
```

### No se detecta Arduino IDE

1. Verificar que Arduino IDE está instalado
2. En Configuración, establecer manualmente la ruta al ejecutable `arduino_debug.exe` (Windows) o `arduino` (Linux/Mac)
3. Reiniciar Ardublockly

### Error "Puerto COM no disponible"

1. Conectar Arduino por USB
2. Verificar en Administrador de Dispositivos (Windows) o `ls /dev/tty*` (Linux/Mac)
3. Seleccionar el puerto correcto en Configuración

### El código no se sube a la placa

1. Verificar que el Arduino está conectado
2. Cerrar Arduino IDE si está abierto (puede bloquear el puerto)
3. Probar con otro cable USB
4. Verificar que la placa y puerto están correctamente configurados

## 📝 Licencia

Copyright (c) 2016 carlosperate https://github.com/carlosperate/

A menos que se especifique lo contrario, el código fuente de este proyecto está licenciado bajo Apache License, Version 2.0.

Ver archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Créditos

- Proyecto original: [Ardublockly por carlosperate](https://github.com/carlosperate/ardublockly)
- Inspirado en: [BlocklyDuino](https://github.com/BlocklyDuino/BlocklyDuino)
- Basado en: [Google Blockly](https://developers.google.com/blockly/)
- Personalización: **RoboticMinds / MdavidC-DevTech**

## 🔗 Enlaces Útiles

- 📚 [Wiki del Proyecto Original](https://github.com/carlosperate/ardublockly/wiki)
- 🌐 [Demo Online](http://ardublockly.embeddedlog.com/demo/index.html)
- 🔧 [Arduino IDE](https://www.arduino.cc/en/software)
- 🐍 [Python](https://www.python.org/)
- 📖 [Documentación de Blockly](https://developers.google.com/blockly/guides/overview)

## 📧 Soporte

Para reportar problemas o sugerencias:
- Abrir un issue en: https://github.com/MdavidC-DevTech/Programacion_bloques/issues

---

**¡Feliz programación con bloques!** 🎉🤖
