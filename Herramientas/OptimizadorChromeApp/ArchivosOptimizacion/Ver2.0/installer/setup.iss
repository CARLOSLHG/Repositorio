[Setup]
AppName=Optimizador de Chrome
AppVersion=2.0
DefaultDirName={pf}\OptimizadorChrome
DefaultGroupName=OptimizadorChrome
OutputBaseFilename=Optimizador_setup
Compression=lzma
SolidCompression=yes
ArchitecturesInstallIn64BitMode=x64

[Files]
Source: "..\BuildFinal\app.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\BuildFinal\mem_watcher.exe"; DestDir: "{app}"; Flags: ignoreversion

; entorno embebido de Python
Source: "..\BuildFinal\_internal\python3.dll"; DestDir: "{app}\_internal"; Flags: ignoreversion
Source: "..\BuildFinal\_internal\python312.dll"; DestDir: "{app}\_internal"; Flags: ignoreversion
Source: "..\BuildFinal\_internal\base_library.zip"; DestDir: "{app}\_internal"; Flags: ignoreversion
Source: "..\BuildFinal\_internal\lib\*"; DestDir: "{app}\_internal\lib"; Flags: recursesubdirs createallsubdirs

; Tcl/Tk necesarios para interfaz gráfica
Source: "..\BuildFinal\_internal\tcl8\*"; DestDir: "{app}\_internal\tcl8"; Flags: recursesubdirs createallsubdirs
Source: "..\BuildFinal\_internal\tk8\*"; DestDir: "{app}\_internal\tk8"; Flags: recursesubdirs createallsubdirs
Source: "..\BuildFinal\_internal\_tk_data\*"; DestDir: "{app}\_internal\_tk_data"; Flags: recursesubdirs createallsubdirs
Source: "..\BuildFinal\_internal\_tcl_data\*"; DestDir: "{app}\_internal\_tcl_data"; Flags: recursesubdirs createallsubdirs

; Scripts PowerShell
Source: "..\BuildFinal\_internal\limpiar_memoria.ps1"; DestDir: "{app}\_internal"; Flags: ignoreversion
Source: "..\BuildFinal\_internal\verificar_extensiones.ps1"; DestDir: "{app}\_internal"; Flags: ignoreversion

[Icons]
Name: "{group}\Optimizador de Chrome"; Filename: "{app}\app.exe"
Name: "{commondesktop}\Optimizador de Chrome"; Filename: "{app}\app.exe"; Tasks: desktopicon