==============================
 OPTIMIZADOR DE CHROME - v1.0
==============================

📦 INCLUYE:
-----------
1. app.exe                     → Aplicación principal con interfaz gráfica.
2. mem_watcher.exe            → Monitor que vigila el uso de RAM del sistema.
3. limpiar_memoria.ps1        → Script para reducir el consumo de Chrome.
4. verificar_extensiones.ps1  → Script para revisar extensiones sospechosas.
5. README.txt                 → Esta guía de instalación y uso.

📋 REQUISITOS:
--------------
- Sistema operativo: Windows 10 / 11 (64-bit)
- Memoria RAM mínima: 8 GB (recomendado 16 GB)
- Permisos de administrador para ejecutar scripts.

📌 FUNCIONAMIENTO:
-------------------
▶ app.exe
   Aplicación gráfica (desarrollada con Python y Tkinter) que te permite ejecutar:
   - Limpiar memoria usada por Chrome.
   - Verificar extensiones con permisos críticos.

▶ mem_watcher.exe
   - Se ejecuta en segundo plano.
   - Monitorea la RAM del sistema.
   - Si supera el 85%, lanza automáticamente `app.exe` para limpieza de Chrome.
   - Crea un archivo temporal (`.ram_triggered`) para evitar ejecuciones repetidas.

📂 UBICACIÓN DE ARCHIVOS:
--------------------------
Todos los archivos deben estar en la misma carpeta al momento de ejecutar `app.exe` o `mem_watcher.exe`.

⚠️ IMPORTANTE:
--------------
- Ejecuta `app.exe` como administrador (clic derecho > Ejecutar como administrador).
- Si tu antivirus bloquea los `.ps1`, marca los scripts como seguros.
- Para desactivar `mem_watcher.exe`, cierra el proceso desde el administrador de tareas.

🧪 TESTEADO EN:
----------------
✔ Windows 11 Pro  
✔ Chrome 123+  
✔ Memoria RAM 16 GB  
✔ Disco SSD NVMe  

📩 AUTOR:
---------
Desarrollado por Carlos + Chapee  
Versión: 1.0 - Mayo 2025  
Contacto: chcarlos3@gmail.com
