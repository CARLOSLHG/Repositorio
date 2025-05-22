@echo off
title Compilación completa - Optimizador de Chrome
echo ===============================================
echo [INICIO] Limpiando compilaciones anteriores...
echo ===============================================

if exist dist (
    rmdir /S /Q dist
    echo [OK] Carpeta dist eliminada.
)

if exist build (
    rmdir /S /Q build
    echo [OK] Carpeta build eliminada.
)

if exist __pycache__ (
    rmdir /S /Q __pycache__
    echo [OK] Carpeta __pycache__ eliminada.
)

echo.
echo ===============================================
echo [1/3] Compilando app.exe...
echo ===============================================
pyinstaller src\app.spec

echo.
echo ===============================================
echo [2/3] Compilando mem_watcher.exe...
echo ===============================================
pyinstaller src\mem_watcher.spec

echo.
echo ===============================================
echo [3/3] Consolidando ejecutables y scripts...
echo ===============================================
call consolidar_exe_final.bat

echo.
echo ===============================================
echo [FINALIZADO] Todos los archivos compilados y organizados.
echo Presiona una tecla para salir.
pause >nul
