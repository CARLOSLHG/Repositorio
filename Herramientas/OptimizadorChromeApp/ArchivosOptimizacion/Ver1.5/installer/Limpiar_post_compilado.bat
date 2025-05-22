@echo off
echo [LIMPIEZA] Eliminando carpetas temporales...

rmdir /s /q "..\BuildFinal"
rmdir /s /q "..\src\build"
rmdir /s /q "..\src\dist"
rmdir /s /q "..\src\__pycache__"

echo [LIMPIEZA COMPLETA] Carpeta Ver1.5 limpia.
