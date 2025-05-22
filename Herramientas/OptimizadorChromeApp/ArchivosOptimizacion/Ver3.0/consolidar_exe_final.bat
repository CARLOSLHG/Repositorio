@echo off
echo ==============================================
echo [FINAL] Consolidando archivos en dist\optimizador_dist
echo ==============================================

:: Ruta final unificada
set "FINAL_DIST=dist\optimizador_dist"

:: Eliminar carpeta final si ya existe
if exist "%FINAL_DIST%" (
    rmdir /S /Q "%FINAL_DIST%"
)

:: Crear carpeta final limpia
mkdir "%FINAL_DIST%"

:: Copiar app.exe desde su carpeta de build
if exist dist\app_dist\app.exe (
    copy /Y dist\app_dist\app.exe "%FINAL_DIST%" >nul
    echo [OK] Copiado: app.exe
) else (
    echo [ERROR] No se encontró app.exe
)

:: Copiar mem_watcher.exe desde su carpeta de build
if exist dist\mem_watcher_dist\mem_watcher.exe (
    copy /Y dist\mem_watcher_dist\mem_watcher.exe "%FINAL_DIST%" >nul
    echo [OK] Copiado: mem_watcher.exe
) else (
    echo [ERROR] No se encontró mem_watcher.exe
)

:: Copiar scripts .ps1 desde src
for %%F in (limpiar_memoria.ps1 verificar_extensiones.ps1) do (
    if exist src\%%F (
        copy /Y src\%%F "%FINAL_DIST%" >nul
        echo [OK] Copiado: %%F
    ) else (
        echo [AVISO] No se encontró: %%F
    )
)

echo.
echo [FINALIZADO] Archivos listos en: %FINAL_DIST%
pause
