import os
import subprocess
import sys
import tkinter as tk
from tkinter import messagebox
from pathlib import Path

# Detectar si el script corre desde un .exe empaquetado (MEIPASS) o no
if getattr(sys, 'frozen', False):
    SCRIPT_DIR = Path(sys._MEIPASS)
else:
    SCRIPT_DIR = Path(__file__).parent

# Diccionario de scripts PowerShell
SCRIPTS = {
    "🧼 Limpiar Memoria Chrome": "limpiar_memoria.ps1",
    "🔍 Verificar Extensiones Chrome": "verificar_extensiones.ps1"
}

# Función que ejecuta el script PowerShell
def ejecutar_script(nombre_archivo):
    ruta_script = SCRIPT_DIR / nombre_archivo
    print(f"[DEBUG] Buscando: {ruta_script}")  # Traza visible si corres el .py

    if not ruta_script.exists():
        messagebox.showerror("Error", f"No se encontró el archivo:\n{nombre_archivo}\nRuta esperada:\n{ruta_script}")
        return

    try:
        subprocess.run(
            ["powershell", "-ExecutionPolicy", "Bypass", "-File", str(ruta_script)],
            check=True
        )
    except subprocess.CalledProcessError as e:
        messagebox.showerror("Error", f"Falló la ejecución de:\n{nombre_archivo}\nCódigo de error: {e.returncode}")

# UI con Tkinter
app = tk.Tk()
app.title("Optimizador de Chrome by Carlos")
app.geometry("400x220")
app.resizable(False, False)

frame = tk.Frame(app, padx=20, pady=20)
frame.pack(expand=True)

tk.Label(frame, text="Selecciona una herramienta:", font=("Arial", 12)).pack(pady=10)

for label, script in SCRIPTS.items():
    tk.Button(frame, text=label, width=35, command=lambda s=script: ejecutar_script(s)).pack(pady=5)

tk.Label(app, text="Desarrollado por Carlos + Chapee", font=("Arial", 8)).pack(pady=5)

app.mainloop()
