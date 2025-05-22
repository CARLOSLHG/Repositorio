import psutil
import subprocess
import time
import os
from datetime import datetime
from pathlib import Path
from win10toast import ToastNotifier

# Configuración
THRESHOLD = 80
CHECK_INTERVAL = 60
SCRIPT_PATH = "limpiar_memoria.ps1"  # Script que se ejecutará directamente
FLAG_PATH = Path("mem_flag.tmp")
LOG_PATH = Path("mem_watcher.log")
notifier = ToastNotifier()

def escribir_log(mensaje):
    hora = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOG_PATH, "a", encoding="utf-8") as log:
        log.write(f"[{hora}] {mensaje}\n")

def memoria_actual():
    return psutil.virtual_memory().percent

def crear_bandera():
    FLAG_PATH.write_text("ejecutado")

def bandera_existe():
    return FLAG_PATH.exists()

def eliminar_bandera():
    if FLAG_PATH.exists():
        FLAG_PATH.unlink()

def mostrar_notificacion(titulo, mensaje):
    notifier.show_toast(titulo, mensaje, duration=5, threaded=True)

def ejecutar_script_powershell(script_name):
    script_path = Path(__file__).parent / script_name
    if script_path.exists():
        subprocess.run([
            "powershell", "-ExecutionPolicy", "Bypass", "-File", str(script_path)
        ], shell=True)
        return True
    else:
        return False

# Inicio
escribir_log("🟢 MemWatcher automático iniciado.")

try:
    while True:
        uso = memoria_actual()
        escribir_log(f"[INFO] Memoria actual: {uso:.1f}%")

        if uso >= THRESHOLD:
            if not bandera_existe():
                if ejecutar_script_powershell(SCRIPT_PATH):
                    escribir_log(f"[AVISO] Ejecutado automáticamente {SCRIPT_PATH} (uso: {uso:.1f}%)")
                    mostrar_notificacion("Optimizador ejecutado", f"RAM al {uso:.1f}%. Memoria limpiada.")
                    crear_bandera()
                else:
                    escribir_log(f"[ERROR] No se encontró el script {SCRIPT_PATH}")
        else:
            if bandera_existe():
                escribir_log("[INFO] Memoria normalizada. Bandera eliminada.")
                eliminar_bandera()

        time.sleep(CHECK_INTERVAL)

except Exception as e:
    escribir_log(f"[ERROR] Excepción: {str(e)}")
    mostrar_notificacion("Error en MemWatcher", str(e))
