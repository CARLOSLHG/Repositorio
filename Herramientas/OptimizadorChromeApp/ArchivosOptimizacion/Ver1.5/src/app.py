import tkinter as tk
from tkinter import messagebox
import subprocess
import os
from pathlib import Path
import sys

SCRIPT_DIR = Path(__file__).resolve().parent
APP_NAME = "Optimizador de Chrome"
VERSION = "1.5"
AUTHOR = "Carlos Hernández"
YEAR = "2025"

def ejecutar_script(nombre_archivo):
    ruta_script = SCRIPT_DIR / nombre_archivo
    if not ruta_script.exists():
        messagebox.showerror("Error", f"No se encontró el archivo: {ruta_script}")
        return
    try:
        subprocess.Popen(["powershell.exe", "-ExecutionPolicy", "Bypass", "-File", str(ruta_script)],
                         shell=True, creationflags=subprocess.CREATE_NEW_CONSOLE)
    except Exception as e:
        messagebox.showerror("Error", f"No se pudo ejecutar el script: {e}")

def abrir_log():
    log_path = Path(os.getenv("LOCALAPPDATA")) / "MemWatcher" / "MemWatcher.log"
    if not log_path.exists():
        messagebox.showerror("Error", f"No se encontró el archivo de log: {log_path}")
        return
    try:
        os.startfile(str(log_path))
    except Exception as e:
        messagebox.showerror("Error", f"No se pudo abrir el archivo de log: {e}")

def desinstalar_programa():
    try:
        if messagebox.askyesno("Desinstalar", "¿Deseas desinstalar el programa?"):
            subprocess.Popen(["cmd", "/c", "start", "appwiz.cpl"])
            root.destroy()
    except Exception as e:
        messagebox.showerror("Error", f"No se pudo iniciar la desinstalación: {e}")

root = tk.Tk()
root.title(APP_NAME)
root.geometry("380x300")
root.configure(bg="#f0f0f0")
root.resizable(False, False)

frame = tk.Frame(root, bg="#f0f0f0")
frame.pack(pady=30)

btn1 = tk.Button(frame, text="🧹 Limpiar Memoria", width=30, command=lambda: ejecutar_script("limpiar_memoria.ps1"))
btn1.grid(row=0, column=0, padx=10, pady=5)

btn2 = tk.Button(frame, text="🧩 Verificar Extensiones", width=30, command=lambda: ejecutar_script("verificar_extensiones.ps1"))
btn2.grid(row=1, column=0, padx=10, pady=5)

btn3 = tk.Button(frame, text="📄 Ver Log de Memoria", width=30, command=abrir_log)
btn3.grid(row=2, column=0, padx=10, pady=5)

btn4 = tk.Button(frame, text="❌ Desinstalar Programa", width=30, command=desinstalar_programa)
btn4.grid(row=3, column=0, padx=10, pady=5)

footer = tk.Label(root, text=f"Versión {VERSION} | Autor: {AUTHOR} | Año {YEAR} | Licencia Gratuita",
                  bg="#f0f0f0", font=("Arial", 8))
footer.pack(side="bottom", pady=10)

root.mainloop()
