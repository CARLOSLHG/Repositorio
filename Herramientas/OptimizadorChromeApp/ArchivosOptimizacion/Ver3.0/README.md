# Optimizador de Chrome

**Versión:** 2.0  
**Autor:** Carlos  
**Función principal:** Liberar memoria de navegadores y verificar extensiones en Chrome.  
**Modo automático:** Incluye un servicio (`mem_watcher.exe`) que se ejecuta al iniciar Windows y limpia la RAM cuando se supera un umbral.

---

## 🧩 Contenido

- `Optimizador_setup.exe` – Instalador principal
- `app.exe` – Interfaz gráfica para lanzar herramientas
- `mem_watcher.exe` – Servicio automático para limpiar memoria
- `limpiar_memoria.ps1` – Script para liberar RAM de navegadores
- `verificar_extensiones.ps1` – Script para listar extensiones de Chrome
- `mem_watcher.log` – Archivo generado automáticamente con actividad del monitor

---

## 🖥️ Requisitos

- Windows 10 o superior (64 bits)
- Permiso para ejecutar PowerShell
- Al menos 4 GB de RAM

---

## 🔧 Instalación

1. Ejecuta `Optimizador_setup.exe` como administrador.
2. Acepta el mensaje de instalación y sigue los pasos.
3. El programa se instalará en `C:\Program Files\OptimizadorChrome`.
4. El monitor `mem_watcher.exe` se activará automáticamente.

---

## 📝 Notas

- Los accesos directos se agregan al escritorio, menú de inicio y arranque.
- Si deseas desinstalar, usa "Agregar o quitar programas".
