$chromePath = "$env:LOCALAPPDATA\Google\Chrome\User Data"
$profiles = Get-ChildItem -Path $chromePath -Directory -Filter "Profile*" | Select-Object -ExpandProperty Name

function Get-LocalizedName {
    param (
        [string]$extensionPath,
        [string]$msgKey
    )

    $localesPath = Join-Path $extensionPath "_locales"
    if (-not (Test-Path $localesPath)) { return $null }

    $languages = @("es", "en", "es_419")  # Prioridad de idiomas
    foreach ($lang in $languages) {
        $msgFile = Join-Path -Path $localesPath -ChildPath "$lang\messages.json"
        if (Test-Path $msgFile) {
            try {
                $messages = Get-Content $msgFile -Raw | ConvertFrom-Json
                if ($messages.ContainsKey($msgKey)) {
                    return $messages[$msgKey].message
                }
            } catch {}
        }
    }

    return $null
}

foreach ($profile in $profiles) {
    Write-Host "`n[INFO] Analizando perfil: $profile" -ForegroundColor Cyan
    $extPath = Join-Path -Path $chromePath -ChildPath "$profile\Extensions"

    if (Test-Path $extPath) {
        Get-ChildItem -Path $extPath -Directory | ForEach-Object {
            $extId = $_.Name
            $versionFolder = Get-ChildItem -Path $_.FullName -Directory | Sort-Object Name -Descending | Select-Object -First 1
            $manifestPath = Join-Path -Path $versionFolder.FullName -ChildPath "manifest.json"

            if (Test-Path $manifestPath) {
                try {
                    $manifest = Get-Content $manifestPath -Raw | ConvertFrom-Json
                } catch {
                    return
                }

                $name = $manifest.name
                if ($name -like "__MSG_*__") {
                    $msgKey = $name -replace "__MSG_(.+?)__", '$1'
                    $resolved = Get-LocalizedName -extensionPath $versionFolder.FullName -msgKey $msgKey
                    if (-not $resolved) {
                        $resolved = "[NO RESUELTO] $name"
                    }
                    $name = $resolved
                }

                $version = $manifest.version
                $permissions = $manifest.permissions -join ", "

                Write-Host "`nNombre: $name" -ForegroundColor White
                Write-Host "Versión: $version"
                Write-Host "ID: $extId"
                Write-Host "Permisos: $permissions" -ForegroundColor Yellow

                if ($manifest.background) {
                    $backgroundKeys = $manifest.background.PSObject.Properties | ForEach-Object { $_.Name }
                    Write-Host "Background: $($backgroundKeys -join ", ")" -ForegroundColor Blue
                }

                Write-Host ("-" * 80)
            }
        }
    }
}

Write-Host "`n[COMPLETADO] Puedes cerrar la consola o ejecutarlo de nuevo si es necesario." -ForegroundColor Cyan
Start-Sleep -Seconds 3
exit
