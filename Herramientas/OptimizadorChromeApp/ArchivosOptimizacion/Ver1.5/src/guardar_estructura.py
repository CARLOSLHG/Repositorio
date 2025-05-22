import os
from pathlib import Path

def guardar_estructura(ruta_raiz):
    estructura = []

    for root, dirs, files in os.walk(ruta_raiz):
        nivel = root.replace(str(ruta_raiz), '').count(os.sep)
        indentacion = '|' + '____' * nivel
        estructura.append(f"{indentacion}{os.path.basename(root)}\\")
        sub_indentacion = '|' + '____' * (nivel + 1)
        for f in files:
            estructura.append(f"{sub_indentacion}{f}")

    salida = "\n".join(estructura)

    archivo_salida = ruta_raiz / "estructura.txt"
    with open(archivo_salida, "w", encoding="utf-8") as f:
        f.write(salida)

if __name__ == "__main__":
    ruta_objetivo = Path(__file__).resolve().parents[1]  # apunta a Ver1.5
    guardar_estructura(ruta_objetivo)
