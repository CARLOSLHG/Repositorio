import time
import subprocess
import os
import sys
from pathlib import Path

try:
    import psutil
except ImportError:
    print("[ERROR] El módulo 'psutil' no está instalado. Finalizando...")
    sys.exit(1)

# Directorio de log
log_dir = Path(os.getenv("LOCALAPPDATA")) / "MemWatcher"
log_dir.mkdir(parents=True, exist_ok=True)
log_file = log_dir / "MemWatcher.log"

# Ruta del script PowerShell
script_dir = Path(sys.executable).parent
ps_script = script_dir / "limpiar_memoria.ps1"

def log(msg):
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
    with open(log_file, "a", encoding="utf-8") as f:
        f.write(f"[{timestamp}] {msg}\n")

def main():
    log("[INFO] Iniciando monitoreo de memoria...")
    while True:
        try:
            mem = psutil.virtual_memory()
            usage = mem.percent
            log(f"[INFO] Uso actual de RAM: {usage:.2f}%")

            if usage > 85:
                log("[AVISO] Memoria supera el 85%. Intentando ejecutar PowerShell...")

                if ps_script.exists():
                    result = subprocess.run(
                        ["powershell.exe", "-ExecutionPolicy", "Bypass", "-File", str(ps_script)],
                        capture_output=True,
                        text=True,
                        creationflags=subprocess.CREATE_NO_WINDOW
                    )
                    if result.returncode == 0:
                        log("[INFO] Script ejecutado exitosamente.")
                    else:
                        log(f"[ERROR] Error en script PowerShell: {result.stderr.strip()}")
                else:
                    log(f"[ERROR] Script no encontrado en: {ps_script}")
        except Exception as e:
            log(f"[ERROR] Excepción en monitoreo: {e}")

        time.sleep(60)

if __name__ == "__main__":
    main()
