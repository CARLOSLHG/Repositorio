[Setup]
AppName=Optimizador de Chrome
AppVersion=2.0
DefaultDirName={pf}\OptimizadorChromeApp
DefaultGroupName=Optimizador de Chrome
OutputDir=.
OutputBaseFilename=OptimizadorChromeApp_Setup
Compression=lzma
SolidCompression=yes
DisableWelcomePage=no
PrivilegesRequired=admin
UninstallDisplayIcon={app}\app.exe

[Files]
Source: "dist\app.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "dist\mem_watcher.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "dist\limpiar_memoria.ps1"; DestDir: "{app}"; Flags: ignoreversion
Source: "dist\verificar_extensiones.ps1"; DestDir: "{app}"; Flags: ignoreversion
Source: "dist\README.txt"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{commondesktop}\Optimizador de Chrome"; Filename: "{app}\app.exe"; WorkingDir: "{app}"; IconFilename: "{app}\optimizador_chrome.ico"

[Run]
Filename: "{app}\mem_watcher.exe"; Description: "Iniciar vigilancia de memoria"; Flags: nowait postinstall skipifsilent

[UninstallRun]
Filename: "taskkill"; Parameters: "/F /IM mem_watcher.exe"; StatusMsg: "Cerrando vigilancia de memoria..."; RunOnceId: "KillMemWatcher"
