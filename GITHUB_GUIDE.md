# Guía para Subir a GitHub

Esta guía te ayudará a subir tu proyecto Ardublockly a GitHub paso a paso.

## 📋 Requisitos Previos

- Tener Git instalado ([Descargar Git](https://git-scm.com/downloads))
- Tener una cuenta en GitHub ([Crear cuenta](https://github.com/join))
- Tu proyecto ya tiene configurado Git (se detecta por la carpeta `.git/`)

## ✅ Verificación: Ya estás conectado

Tu repositorio **ya está conectado** a GitHub:
- **URL**: https://github.com/MdavidC-DevTech/Programacion_bloques.git
- **Rama**: main

## 🚀 Guía Rápida para Subir Cambios

### 1. Ver cambios realizados

```bash
git status
```

Esto te mostrará qué archivos han sido modificados, agregados o eliminados.

### 2. Agregar archivos al commit

```bash
# Agregar TODOS los archivos modificados
git add .

# O agregar archivos específicos
git add README.md README_ES.md .gitignore
```

### 3. Crear un commit

```bash
git commit -m "Actualizar README y .gitignore para GitHub"
```

### 4. Subir a GitHub

```bash
git push origin main
```

Si es la primera vez, Git podría pedirte tus credenciales de GitHub.

## 🔧 Comandos Git Útiles

### Ver historial de commits

```bash
git log --oneline -10
```

### Ver diferencias antes de commit

```bash
git diff
```

### Descartar cambios locales

```bash
# Descartar cambios en un archivo específico
git checkout -- nombre_archivo.txt

# Descartar TODOS los cambios locales (¡cuidado!)
git reset --hard
```

### Actualizar tu copia local desde GitHub

```bash
git pull origin main
```

## 🆕 Si Necesitas Crear un Nuevo Repositorio

Si necesitaras crear un **nuevo** repositorio desde cero:

### 1. Crear repositorio en GitHub

1. Ir a https://github.com/new
2. Poner nombre al repositorio
3. **NO** marcar "Initialize with README"
4. Click en "Create repository"

### 2. Conectar tu proyecto local

```bash
# Inicializar Git (solo si no existe .git/)
git init

# Agregar todos los archivos
git add .

# Primer commit
git commit -m "Primer commit"

# Agregar el remote de GitHub
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git

# Subir a GitHub
git branch -M main
git push -u origin main
```

## ⚠️ Solución de Problemas Comunes

### Error: "Failed to push"

**Causa**: Alguien más hizo cambios en GitHub

**Solución**:
```bash
git pull origin main --rebase
git push origin main
```

### Error: "File is too large"

**Causa**: Intentas subir un archivo mayor a 100MB

**Solución**: Ya hemos configurado `.gitignore` para evitar esto. Verifica que el archivo grande esté en `.gitignore` y ejecútalo:

```bash
# Remover archivo del tracking de Git
git rm --cached nombre_archivo_grande.zip

# Agregar al .gitignore
echo "nombre_archivo_grande.zip" >> .gitignore

# Commit y push
git add .gitignore
git commit -m "Ignorar archivos grandes"
git push origin main
```

### Error: "Authentication failed"

**Causa**: Credenciales incorrectas o token expirado

**Solución**: Desde agosto 2021, GitHub requiere **Personal Access Token** en lugar de contraseña.

1. Ir a: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Seleccionar permisos: `repo` (todos)
4. Copiar el token generado
5. Usar el token como contraseña cuando Git lo pida

Alternativamente, configurar GitHub CLI:
```bash
# Instalar GitHub CLI desde https://cli.github.com/
gh auth login
```

## 📝 Buenas Prácticas

### Commits descriptivos

**❌ Malo:**
```bash
git commit -m "cambios"
git commit -m "fix"
```

**✅ Bueno:**
```bash
git commit -m "Agregar README en español con instrucciones de instalación"
git commit -m "Corregir .gitignore para excluir archivos grandes"
git commit -m "Optimizar función de compilación en compilersettings.py"
```

### Frecuencia de commits

- Hacer commits frecuentes de cambios relacionados
- No esperar demasiado tiempo entre commits
- Cada commit debe ser una unidad lógica de trabajo

### Antes de cada push

```bash
# 1. Ver qué vas a subir
git status

# 2. Ver los cambios específicos
git diff

# 3. Asegurarte que no subes archivos sensibles
git log --oneline -3
```

## 🔐 No Subir Información Sensible

**Nunca subas**:
- Contraseñas
- API Keys
- Tokens de acceso
- Archivos de configuración con datos personales

Si accidentalmente subes algo sensible:

```bash
# Remover archivo del último commit
git rm --cached archivo_sensible.txt
git commit --amend
git push --force origin main
```

⚠️ **Advertencia**: `--force` reescribe el historial. Úsalo con cuidado.

## 🎯 Workflow Recomendado

```bash
# 1. Antes de empezar a trabajar
git pull origin main

# 2. Hacer tus cambios en los archivos...

# 3. Ver qué cambió
git status
git diff

# 4. Agregar y commitear
git add .
git commit -m "Descripción clara de cambios"

# 5. Subir a GitHub
git push origin main
```

## 📚 Recursos Adicionales

- 📖 [Documentación oficial de Git](https://git-scm.com/doc)
- 🎓 [Tutorial interactivo de Git](https://learngitbranching.js.org/?locale=es_ES)
- 📺 [GitHub Guides](https://guides.github.com/)
- 💡 [Oh My Git! - Juego para aprender Git](https://ohmygit.org/)

---

**¿Problemas?** Abre un issue en el repositorio describiendo tu error.
