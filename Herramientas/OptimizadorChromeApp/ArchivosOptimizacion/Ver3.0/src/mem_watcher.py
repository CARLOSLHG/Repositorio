# -*- coding: windows-1252 -*-
import psutil
import subprocess
import time
import os
import sys
from datetime import datetime
from pathlib import Path
from win10toast import ToastNotifier

THRESHOLD = 80
CHECK_INTERVAL = 60
SCRIPT_PATH = "limpiar_memoria.ps1"
FLAG_PATH = Path(os.environ.get("LOCALAPPDATA")) / "mem_flag.tmp"
SCRIPT_DIR = Path(sys.executable).parent

LOG_DIR = Path(os.environ.get("LOCALAPPDATA")) / "memwatcher_logs"
LOG_DIR.mkdir(parents=True, exist_ok=True)
LOG_PATH = LOG_DIR / "mem_watcher.log"

notifier = ToastNotifier()

def escribir_log(mensaje):
    hora = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    try:
        with open(LOG_PATH, "a", encoding="windows-1252", errors="replace") as log:
            log.write(f"[{hora}] {mensaje}\n")
    except Exception:
        pass

def memoria_actual():
    return psutil.virtual_memory().percent

def crear_bandera():
    FLAG_PATH.write_text("ejecutado", encoding="windows-1252")

def bandera_existe():
    return FLAG_PATH.exists()

def eliminar_bandera():
    if FLAG_PATH.exists():
        FLAG_PATH.unlink()

def mostrar_notificacion(titulo, mensaje):
    notifier.show_toast(titulo, mensaje, duration=5, threaded=True)

def verificar_execution_policy():
    try:
        output = subprocess.check_output(
            ["powershell", "Get-ExecutionPolicy", "-Scope", "CurrentUser"],
            text=True
        ).strip()
        if output == "Restricted":
            subprocess.run(["powershell", "Set-ExecutionPolicy", "RemoteSigned", "-Scope", "CurrentUser", "-Force"], check=True)
            escribir_log("[INFO] Política de ejecución cambiada a RemoteSigned")
    except Exception as e:
        escribir_log(f"[ERROR] Al verificar política PowerShell: {e}")

def ejecutar_script_powershell(script_name):
    script_path = SCRIPT_DIR / script_name
    if script_path.exists():
        try:
            subprocess.run([
                "powershell", "-ExecutionPolicy", "Bypass", "-File", str(script_path)
            ], shell=True)
            return True
        except Exception as e:
            escribir_log(f"[ERROR] Al ejecutar script: {e}")
            return False
    else:
        return False

def diagnostico_inicial():
    escribir_log("[INFO] MemWatcher automático iniciado.")
    escribir_log("[INFO] Iniciando diagnóstico...")

    if not (SCRIPT_DIR / SCRIPT_PATH).exists():
        escribir_log(f"[ERROR] No se encontró el script {SCRIPT_PATH}")
    else:
        escribir_log(f"[OK] Script {SCRIPT_PATH} encontrado")

    verificar_execution_policy()

# --- INICIO ---
diagnostico_inicial()

try:
    while True:
        uso = memoria_actual()
        escribir_log(f"[INFO] Memoria actual: {uso:.1f}%")

        if uso >= THRESHOLD:
            if not bandera_existe():
                if ejecutar_script_powershell(SCRIPT_PATH):
                    escribir_log(f"[AVISO] Ejecutado correctamente: {SCRIPT_PATH} con uso de RAM {uso:.1f}%")
                    mostrar_notificacion("Optimizador ejecutado", f"RAM al {uso:.1f}%. Memoria limpiada.")
                    crear_bandera()
                else:
                    escribir_log(f"[ERROR] Falló la ejecución de {SCRIPT_PATH}")
        else:
            if bandera_existe():
                escribir_log("[INFO] Memoria normalizada. Bandera eliminada.")
                eliminar_bandera()

        time.sleep(CHECK_INTERVAL)

except Exception as e:
    escribir_log(f"[ERROR] Excepción: {str(e)}")
    mostrar_notificacion("Error en MemWatcher", str(e))
