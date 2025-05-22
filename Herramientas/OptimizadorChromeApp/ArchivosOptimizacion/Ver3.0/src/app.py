import os
import subprocess
import sys
import tkinter as tk
from tkinter import messagebox
from pathlib import Path
import platform

# Detectar si el script corre desde un .exe empaquetado (MEIPASS) o no
SCRIPT_DIR = Path(sys._MEIPASS) if getattr(sys, 'frozen', False) else Path(__file__).parent.resolve()

# Diccionario de scripts PowerShell
SCRIPTS = {
    "?? Limpiar Memoria Chrome": "limpiar_memoria.ps1",
    "?? Verificar Extensiones Chrome": "verificar_extensiones.ps1"
}

# Función que ejecuta el script PowerShell
def ejecutar_script(nombre_archivo):
    ruta_script = SCRIPT_DIR / nombre_archivo
    print(f"[DEBUG] Buscando: {ruta_script}")

    if not ruta_script.exists():
        messagebox.showerror("Error", f"No se encontró el archivo:\n{nombre_archivo}\nRuta esperada:\n{ruta_script}")
        return

    try:
        subprocess.run(
            ["powershell", "-ExecutionPolicy", "Bypass", "-File", str(ruta_script)],
            check=True
        )
        messagebox.showinfo("Ejecución completa", f"Script {nombre_archivo} ejecutado correctamente.")
    except subprocess.CalledProcessError as e:
        messagebox.showerror("Error", f"Falló la ejecución de:\n{nombre_archivo}\nCódigo de error: {e.returncode}")

# Función de diagnóstico del sistema
def diagnostico():
    resultados = []
    for label, script in SCRIPTS.items():
        ruta_script = SCRIPT_DIR / script
        if ruta_script.exists():
            resultados.append(f"[OK] {script} encontrado")
        else:
            resultados.append(f"[ERROR] {script} no encontrado")

    try:
        policy = subprocess.check_output(
            ["powershell", "Get-ExecutionPolicy", "-Scope", "CurrentUser"],
            text=True
        ).strip()
        resultados.append(f"[INFO] Política de ejecución PowerShell: {policy}")
    except Exception as e:
        resultados.append(f"[ERROR] Al verificar política PowerShell: {str(e)}")

    resultados.append(f"[INFO] Sistema: {platform.system()} {platform.release()} ({platform.version()})")
    resultados.append(f"[INFO] Directorio actual: {SCRIPT_DIR}")

    messagebox.showinfo("Diagnóstico del sistema", "\n".join(resultados))

# Función para abrir el log
def abrir_log_memoria():
    log_path = os.path.join(os.environ['LOCALAPPDATA'], 'memwatcher_logs', 'mem_watcher.log')
    if os.path.exists(log_path):
        try:
            os.startfile(log_path)
        except Exception as e:
            messagebox.showerror("Error", f"No se pudo abrir el archivo de log:\n{e}")
    else:
        messagebox.showwarning("Log no encontrado", "El archivo mem_watcher.log no fue encontrado.")

# Función para ejecutar el desinstalador
def desinstalar_app():
    uninstaller = None
    for file in os.listdir(SCRIPT_DIR):
        if file.startswith("unins") and file.endswith(".exe"):
            uninstaller = SCRIPT_DIR / file
            break

    if uninstaller and uninstaller.exists():
        confirmar = messagebox.askyesno("Confirmar desinstalación", "¿Deseas desinstalar la aplicación?")
        if confirmar:
            try:
                subprocess.Popen(str(uninstaller), shell=True)
            except Exception as e:
                messagebox.showerror("Error", f"No se pudo ejecutar el desinstalador:\n{e}")
    else:
        messagebox.showerror("Error", "No se encontró el desinstalador en la carpeta del programa.")

# UI con Tkinter
app = tk.Tk()
app.title("Optimizador de Chrome by Carlos Hernández")
app.geometry("400x350")
app.resizable(False, False)

frame = tk.Frame(app, padx=20, pady=20)
frame.pack(expand=True)

tk.Label(frame, text="Selecciona una herramienta:", font=("Arial", 12)).pack(pady=10)

for label, script in SCRIPTS.items():
    tk.Button(frame, text=label, width=35, command=lambda s=script: ejecutar_script(s)).pack(pady=5)

tk.Button(frame, text="?? Diagnóstico del sistema", width=35, command=diagnostico).pack(pady=10)
tk.Button(frame, text="?? Ver Log de Memoria", width=35, command=abrir_log_memoria).pack(pady=5)
tk.Button(frame, text="??? Desinstalar Aplicación", width=35, command=desinstalar_app).pack(pady=5)

version = "3.0"
tk.Label(app, text=f"Versión {version} - Carpeta: {SCRIPT_DIR}", font=("Arial", 7)).pack(pady=2)
tk.Label(app, text="Desarrollado por Carlos Hernández - 2025 | Licencia Gratuita", font=("Arial", 8)).pack(pady=5)

app.mainloop()
