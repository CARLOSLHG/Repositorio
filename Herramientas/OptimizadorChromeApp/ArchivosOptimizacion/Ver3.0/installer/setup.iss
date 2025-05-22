[Setup]
AppName=Optimizador de Chrome
AppVersion=2.0
DefaultDirName={autopf64}\OptimizadorChrome
DefaultGroupName=OptimizadorChrome
OutputBaseFilename=Optimizador_setup
Compression=lzma
SolidCompression=yes
ArchitecturesInstallIn64BitMode=x64

[Files]
Source: "..\dist\optimizador_dist\app.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\dist\optimizador_dist\mem_watcher.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\dist\optimizador_dist\limpiar_memoria.ps1"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\dist\optimizador_dist\verificar_extensiones.ps1"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\dist\app_dist\_internal\*"; DestDir: "{app}\_internal"; Flags: recursesubdirs createallsubdirs ignoreversion
Source: "..\dist\mem_watcher_dist\_internal\*"; DestDir: "{app}\_internal"; Flags: recursesubdirs createallsubdirs ignoreversion

[Icons]
Name: "{autoprograms}\Optimizador de Chrome"; Filename: "{app}\app.exe"
Name: "{userdesktop}\Optimizador de Chrome"; Filename: "{app}\app.exe"
Name: "{userstartup}\MemWatcher"; Filename: "{app}\mem_watcher.exe"

[Run]
Filename: "{app}\mem_watcher.exe"; Description: "Iniciar mem_watcher ahora"; Flags: postinstall skipifsilent

[Code]
function InitializeSetup(): Boolean;
begin
  MsgBox('Este instalador agregará el Optimizador de Chrome, configurará accesos directos y dejará activo el monitor automático de memoria.', mbInformation, MB_OK);
  Result := True;
end;
