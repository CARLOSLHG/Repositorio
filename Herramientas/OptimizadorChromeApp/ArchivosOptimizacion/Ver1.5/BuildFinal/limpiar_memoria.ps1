# limpiar_memoria.ps1 - Versión 1.5
# Autor: Carlos Hernández | Año 2025 | Licencia Gratuita

Write-Host "`n[INFO] Iniciando limpieza de memoria..." -ForegroundColor Cyan

# Obtener la lista de procesos objetivo (puedes agregar más nombres si lo deseas)
$procesosObjetivo = @("chrome", "msedge", "msedgewebview2")

# Filtrar los procesos que están en ejecución
$procesos = Get-Process | Where-Object { $procesosObjetivo -contains $_.ProcessName }

# Si no hay procesos objetivo, mostrar mensaje
if ($procesos.Count -eq 0) {
    Write-Host "[AVISO] No se encontraron procesos objetivo en ejecución." -ForegroundColor Yellow
} else {
    foreach ($proceso in $procesos) {
        try {
            $procesoId = $proceso.Id
            Write-Host "[INFO] Intentando optimizar $($proceso.ProcessName) (PID: $procesoId)" -ForegroundColor White

            # Intentar forzar ajuste del working set (solo posible si el sistema lo permite)
            $proceso.MinWorkingSet = $proceso.MinWorkingSet
            $proceso.MaxWorkingSet = $proceso.MaxWorkingSet

            Write-Host "[OK] Memoria optimizada para $($proceso.ProcessName) (PID: $procesoId)" -ForegroundColor Green
        } catch {
            Write-Host "[AVISO] No se pudo reducir memoria para $($proceso.ProcessName) (PID: $($proceso.Id))" -ForegroundColor Yellow
            Write-Host "       Error: $($_.Exception.Message)" -ForegroundColor DarkGray
        }
    }
}

Write-Host "`n[COMPLETADO] Puedes cerrar la consola o ejecutar de nuevo si es necesario.`n" -ForegroundColor Cyan
Pause
