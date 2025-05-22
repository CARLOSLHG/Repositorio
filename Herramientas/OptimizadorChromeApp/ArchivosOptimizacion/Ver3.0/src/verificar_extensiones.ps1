$chromeUserDataPath = Join-Path $env:LOCALAPPDATA "Google\Chrome\User Data"

if (!(Test-Path $chromeUserDataPath)) {
    Write-Output "[ERROR] No se encontró la carpeta de usuario de Chrome: $chromeUserDataPath"
    exit
}

Write-Output "[INFO] Buscando perfiles en: $chromeUserDataPath"

$profiles = Get-ChildItem -Path $chromeUserDataPath -Directory | Where-Object {
    $_.Name -eq "Default" -or $_.Name -like "Profile*"
}

if ($profiles.Count -eq 0) {
    Write-Output "[ERROR] No se encontraron perfiles de Chrome."
    exit
}

foreach ($profile in $profiles) {
    $profilePath = Join-Path $profile.FullName "Extensions"
    if (!(Test-Path $profilePath)) {
        Write-Output "[AVISO] No se encontró carpeta de extensiones en: $($profile.Name)"
        continue
    }

    Write-Output "============================================"
    Write-Output "[INFO] Analizando perfil: $($profile.Name)"
    Write-Output "Ruta: $profilePath"

    Get-ChildItem -Path $profilePath -Directory | ForEach-Object {
        $extID = $_.Name
        $manifestPath = Get-ChildItem $_.FullName -Recurse -Filter manifest.json -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1

        if ($manifestPath) {
            try {
                $manifest = Get-Content $manifestPath.FullName -Raw | ConvertFrom-Json
                Write-Output "--------------------------------------------"
                Write-Output "Nombre: $($manifest.name)"
                Write-Output "Versión: $($manifest.version)"
                Write-Output "ID: $extID"
                if ($manifest.permissions) {
                    Write-Output "Permisos: $($manifest.permissions -join ', ')"
                }
                if ($manifest.background -and $manifest.background.scripts) {
                    Write-Output "Background: $($manifest.background.scripts -join ', ')"
                }
            } catch {
                Write-Output "[AVISO] No se pudo analizar el manifest de la extensión con ID: $extID"
            }
        }
    }
}
