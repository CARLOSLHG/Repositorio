[Setup]
AppName=Optimizador de Chrome
AppVersion=1.5
AppPublisher=Carlos Hernández
DefaultDirName={pf}\OptimizadorChrome
DefaultGroupName=Optimizador Chrome
OutputDir=installer\output
OutputBaseFilename=optimizadorChromeSetup
Compression=lzma
SolidCompression=yes
DisableDirPage=no
ArchitecturesInstallIn64BitMode=x64
UninstallDisplayIcon={app}\optimizador_chrome.ico
LicenseFile=installer\LICENCE.txt
SetupIconFile=installer\optimizador_chrome.ico
WizardStyle=modern
ChangesEnvironment=yes

[Files]
Source: "..\BuildFinal\app\app.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\BuildFinal\app\mem_watcher.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\BuildFinal\app\limpiar_memoria.ps1"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\BuildFinal\app\verificar_extensiones.ps1"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\installer\optimizador_chrome.ico"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\README.txt"; DestDir: "{app}"; Flags: ignoreversion isreadme
Source: "..\installer\LICENCE.txt"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{commondesktop}\Optimizador de Chrome"; Filename: "{app}\app.exe"; WorkingDir: "{app}"; IconFilename: "{app}\optimizador_chrome.ico"

[Run]
Filename: "{app}\mem_watcher.exe"; Description: "Iniciar mem_watcher.exe ahora"; Flags: postinstall nowait skipifsilent unchecked
Filename: "{app}\README.txt"; Description: "Ver archivo de instrucciones (README.txt)"; Flags: postinstall shellexec skipifsilent unchecked
Filename: "{app}\LICENCE.txt"; Description: "Ver licencia del programa (LICENCE.txt)"; Flags: postinstall shellexec skipifsilent unchecked

[UninstallDelete]
Name: "{app}\*.*"; Type: files
Name: "{app}"; Type: dirifempty
