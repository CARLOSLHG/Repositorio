Write-Output "[INFO] Iniciando limpieza de memoria..."

[System.GC]::Collect()
[System.GC]::WaitForPendingFinalizers()

$procesos = @("chrome", "msedge", "firefox")

foreach ($nombre in $procesos) {
    Get-Process $nombre -ErrorAction SilentlyContinue | ForEach-Object {
        $pid = $_.Id
        $nombreProc = $_.ProcessName
        Write-Output "[INFO] Analizando proceso: $nombreProc (PID: $pid)"
        try {
            $proceso = [System.Diagnostics.Process]::GetProcessById($pid)
            $proceso.MinWorkingSet = 5MB
            $proceso.MaxWorkingSet = 5MB
            Write-Output "[ÉXITO] Memoria optimizada para $nombreProc (PID: $pid)"
        } catch {
            Write-Output "[ERROR] No se pudo optimizar $nombreProc (PID: $pid)"
        }
    }
}

Write-Output "[FINALIZADO] Limpieza de memoria completada."
