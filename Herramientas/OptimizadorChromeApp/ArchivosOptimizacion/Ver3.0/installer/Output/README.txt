Optimizador de Memoria para Chrome - Versión 3.0
================================================

Autor: Carlos Hernández  
Fecha: 2025-05-04

Descripción general
-------------------
Esta herramienta está diseñada para usuarios de Windows que utilizan navegadores como Chrome, Firefox o Edge y desean mejorar el rendimiento de su sistema liberando memoria RAM.

El paquete incluye dos componentes clave:

1. **Optimizador Manual** (`app.exe`)
   - Permite liberar memoria del navegador con un solo clic.
   - Ofrece diagnóstico rápido del sistema.
   - Incluye botón para verificar extensiones activas.

2. **Monitor Automático de Memoria (MemWatcher)** (`mem_watcher.exe`)
   - Se ejecuta en segundo plano desde el arranque de Windows.
   - Si el uso de RAM supera el 85%, activa automáticamente el optimizador.
   - Registra logs con cada ejecución automática.

Instrucciones de instalación y uso
----------------------------------
1. Ejecuta el instalador `OptimizadorMemChrome_InstaladorVer3.exe` como administrador.
2. Una vez instalado, se generarán automáticamente:
   - Un acceso directo al optimizador en el escritorio.
   - La activación automática de MemWatcher al iniciar el sistema.
3. Puedes usar la aplicación manualmente en cualquier momento para:
   - Liberar memoria.
   - Verificar extensiones del navegador.
   - Ejecutar un diagnóstico del sistema.
4. Los registros del monitor automático se encuentran en:
   `%LOCALAPPDATA%\memwatcher_logs\mem_watcher.log`

Requisitos del sistema
-----------------------
- Sistema operativo: Windows 10 o superior (64 bits)
- No se requiere conexión a internet
- Python NO es necesario para el usuario final

Archivos incluidos
------------------
- `OptimizadorMemChrome_InstaladorVer3.exe` → Instalador principal
- `README.txt` → Guía de uso
- `CHANGELOG.txt` → Historial de versiones
- `Guia_de_compilacion.pdf` → Instrucciones técnicas para desarrolladores (opcional)

Licencia y soporte
------------------
Este software se distribuye de forma gratuita para uso personal.  
Queda prohibida su modificación o redistribución sin autorización expresa del autor.

Para soporte o sugerencias, contactar directamente con el desarrollador.

Desarrollado por Carlos Hernández - 2025 | Licencia Gratuita
