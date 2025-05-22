@echo off
cls
echo ================================================
echo [INFO] Compilaci�n del Optimizador de Chrome
echo [INFO] Versi�n 1.5 - Carlos Hern�ndez - 2025
echo ================================================

REM === Paso 1: Limpiar carpetas de compilaciones anteriores
echo.
echo [INFO] Limpiando carpetas temporales...
rmdir /s /q src\build 2>nul
rmdir /s /q src\dist 2>nul
rmdir /s /q src\__pycache__ 2>nul
rmdir /s /q BuildFinal 2>nul

REM === Paso 2: Crear estructura de salida
echo.
echo [INFO] Creando carpetas BuildFinal...
mkdir BuildFinal\app
mkdir BuildFinal\mem_watcher

REM === Paso 3: Compilar app.exe
echo.
echo [INFO] Compilando app.exe...
pyinstaller src\app.spec

REM === Paso 4: Compilar mem_watcher.exe
echo.
echo [INFO] Compilando mem_watcher.exe...
pyinstaller src\mem_watcher.spec

REM === Paso 5: Copiar archivos finales
echo.
echo [INFO] Copiando ejecutables y recursos...
xcopy /Y /S src\dist\app\* BuildFinal\app\
xcopy /Y /S src\dist\mem_watcher\* BuildFinal\mem_watcher\
copy /Y src\limpiar_memoria.ps1 BuildFinal\ > nul
copy /Y src\verificar_extensiones.ps1 BuildFinal\ > nul
copy /Y installer\optimizador_chrome.ico BuildFinal\ > nul

REM === Paso 6: Generar estructura.txt
echo.
echo [INFO] Guardando estructura.txt...
python src\guardar_estructura.py

REM === Paso 7: Copiar README.txt a installer\output
echo.
echo [INFO] Copiando README.txt a installer\output...
if not exist installer\output mkdir installer\output
if exist README.txt (
    copy /Y README.txt installer\output\ > nul
    echo [INFO] README.txt copiado con �xito.
) else (
    echo [AVISO] No se encontr� README.txt en la ra�z.
)

REM === Paso 8: Copiar LICENCE.txt si existe
if exist LICENCE.txt (
    copy /Y LICENCE.txt installer\output\ > nul
    echo [INFO] LICENCE.txt copiado con �xito.
)

echo.
echo ================================================
echo [INFO] COMPILACI�N FINALIZADA CORRECTAMENTE
echo ================================================
pause
