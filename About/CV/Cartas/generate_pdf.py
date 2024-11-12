from flask import Flask, render_template, request, send_file
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib import colors
import io

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_pdf', methods=['POST'])
def generate_pdf():
    data = request.form
    pdf_buffer = create_pdf(data)
    return send_file(pdf_buffer, as_attachment=True, download_name="cartaPresentacion.pdf", mimetype="application/pdf")

def create_pdf(data):
    buffer = io.BytesIO()
    c = canvas.Canvas(buffer, pagesize=A4)
    width, height = A4

    # Márgenes y posiciones iniciales
    left_margin = 50
    y_position = height - 50

    # Información del remitente
    remitente_nombre_completo = data.get("nombreRemitente", "Carlos Luis Hernández Gutiérrez")
    remitente_puesto = data.get("puestoRemitente", "Gerente de proyectos")

    # Título Vertical "CARTA DE PRESENTACIÓN"
    c.setFont("Helvetica-Bold", 14)
    c.setFillColor(colors.black)
    c.saveState()
    c.translate(30, height / 2)
    c.rotate(90)
    c.drawString(0, 0, "CARTA DE PRESENTACIÓN")
    c.restoreState()

    # Encabezado (nombre y puesto)
    c.setFont("Helvetica-Bold", 14)
    c.setFillColor(colors.black)
    c.drawString(left_margin, y_position, remitente_nombre_completo)
    y_position -= 15
    c.setFont("Helvetica", 10)
    c.drawString(left_margin, y_position, remitente_puesto)
    y_position -= 30

    # Saludo
    saludo = data.get("saludo", "Estimado/a xxx,")
    c.setFont("Helvetica", 10)
    c.setFillColor(colors.black)
    c.drawString(left_margin, y_position, saludo)
    y_position -= 20

    # Cuerpo de la carta
    contenido_carta = data.get("contenidoCarta", (
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quam ligula, cursus quis luctus "
        "at, malesuada sit amet massa. Vivamus vitae blandit nulla. In blandit, arcu sit amet posuere "
        "posuere, odio nulla gravida libero, vel tincidunt tortor libero id tortor."
    ))
    text_object = c.beginText(left_margin, y_position)
    text_object.setFont("Helvetica", 10)
    text_object.setLeading(14)
    text_object.textLines(contenido_carta)
    c.drawText(text_object)

    # Firma
    y_position -= 100  # Ajuste para la firma
    c.setFont("Helvetica", 10)
    c.drawString(left_margin, y_position, "Atentamente,")
    y_position -= 15
    c.setFont("Helvetica-Bold", 12)
    c.drawString(left_margin, y_position, remitente_nombre_completo)

    # Finalizar y guardar PDF
    c.showPage()
    c.save()
    buffer.seek(0)
    return buffer

if __name__ == '__main__':
    app.run(debug=True)
