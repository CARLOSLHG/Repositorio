; Archivo setup_corregido.iss - Optimizador de Memoria para Chrome (versión 3.0)

[Setup]
AppName=Optimizador de Memoria para Chrome
AppVersion=3.0
DefaultDirName={autopf64}\OptimizadorChrome
DefaultGroupName=OptimizadorChrome
OutputBaseFilename=OptimizadorMemChrome_InstaladorVer3
Compression=lzma
SolidCompression=yes
ArchitecturesInstallIn64BitMode=x64

[Files]
; Ejecutables principales
Source: "..\dist\optimizador_dist\app.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\dist\optimizador_dist\mem_watcher.exe"; DestDir: "{app}"; Flags: ignoreversion

; Scripts PowerShell en carpeta _internal
Source: "..\dist\optimizador_dist\limpiar_memoria.ps1"; DestDir: "{app}\_internal"; Flags: ignoreversion
Source: "..\dist\optimizador_dist\verificar_extensiones.ps1"; DestDir: "{app}\_internal"; Flags: ignoreversion

; Otros recursos internos
Source: "..\dist\app_dist\_internal\*"; DestDir: "{app}\_internal"; Flags: recursesubdirs createallsubdirs ignoreversion
Source: "..\dist\mem_watcher_dist\_internal\*"; DestDir: "{app}\_internal"; Flags: recursesubdirs createallsubdirs ignoreversion

[Icons]
Name: "{autoprograms}\Optimizador de Memoria para Chrome"; Filename: "{app}\app.exe"
Name: "{userdesktop}\Optimizador de Memoria para Chrome"; Filename: "{app}\app.exe"
Name: "{userstartup}\MemWatcher"; Filename: "{app}\mem_watcher.exe"

[Run]
Filename: "{app}\mem_watcher.exe"; Description: "Iniciar monitor automático de memoria (mem_watcher.exe)"; Flags: postinstall skipifsilent

[Code]
function InitializeSetup(): Boolean;
begin
  MsgBox('Este instalador agregará el Optimizador de Memoria para Chrome, configurará accesos directos y dejará activo el monitor automático de memoria.', mbInformation, MB_OK);
  Result := True;
end;
