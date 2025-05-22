# Optimizador de Chrome

**Versión 2.0** — Desarrollado por Carlos

Herramienta para liberar memoria RAM consumida por Google Chrome y verificar extensiones potencialmente conflictivas. Incluye un monitor automático (`mem_watcher.exe`) que se ejecuta al iniciar sesión en Windows y lanza la limpieza si se detecta alto consumo de RAM.

## Funcionalidades

- Limpieza automática de procesos Chrome cuando la RAM supera el 85%.
- Verificación de extensiones de Chrome instaladas.
- Ejecución automática desde el inicio del sistema (sin .bat).
- Instalador completo generado con Inno Setup.
- Interfaz gráfica simple y rápida (`app.exe`).

## Estructura del proyecto

```
OptimizadorChrome/
├── src/
│   ├── app.py
│   ├── mem_watcher.py
│   └── icono/optimizador_chrome.ico
├── scripts/
│   ├── limpiar_memoria.ps1
│   └── verificar_extensiones.ps1
├── setup/
│   └── setup.iss
├── dist/
├── README.md
├── CHANGELOG.txt
├── .gitignore
```

## Instalación

1. Compila con PyInstaller o descarga el ejecutable.
2. Ejecuta el instalador (`.exe`) generado por Inno Setup.
3. `mem_watcher.exe` se activará automáticamente al iniciar sesión.
4. Utiliza `app.exe` para lanzar la limpieza o verificar extensiones manualmente.

## Requisitos

- Windows 10/11 (64 bits)
- Python 3.10+ (solo si deseas compilar desde fuente)
- PowerShell habilitado

## Instalador generado con

- [Inno Setup](https://jrsoftware.org/isinfo.php)
- [PyInstaller](https://pyinstaller.org)

## Licencia

MIT © Carlos
