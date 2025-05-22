Write-Output "[INFO] Iniciando limpieza de memoria..."

[System.GC]::Collect()
[System.GC]::WaitForPendingFinalizers()

$processes = @("chrome", "msedge", "firefox")

foreach ($proc in $processes) {
    Get-Process $proc -ErrorAction SilentlyContinue | ForEach-Object {
        $procId = $_.Id
        $procName = $_.ProcessName
        Write-Output "[INFO] Intentando optimizar $procName (PID: $procId)"
        try {
            $null = [System.Diagnostics.Process]::GetProcessById($procId).MinWorkingSet = 5MB
            Write-Output "[ÉXITO] Memoria reducida para $procName (PID: $procId)"
        } catch {
            Write-Output "[AVISO] No se pudo reducir memoria para $procName (PID: $procId)"
        }
    }
}

Write-Output "[COMPLETADO] Puedes cerrar la consola o ejecutar de nuevo si es necesario."
