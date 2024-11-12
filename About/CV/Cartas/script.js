
// Función para mostrar el formulario
function mostrarFormulario() {
    document.getElementById('formulario-section').classList.remove('hidden');
    document.getElementById('tabla-section').classList.add('hidden');
}

// Función para mostrar la tabla de solicitudes
function mostrarTabla() {
    document.getElementById('formulario-section').classList.add('hidden');
    document.getElementById('tabla-section').classList.remove('hidden');
    cargarTabla();
}

// Función para cargar la tabla desde localStorage y actualizar el total
function cargarTabla() {
    const tablaCuerpo = document.querySelector('#tablaSolicitudes tbody');
    tablaCuerpo.innerHTML = '';  // Limpia la tabla

    // Cargar datos acumulados de localStorage
    let datos = localStorage.getItem("solicitudes");
    datos = datos ? JSON.parse(datos) : [];

    // Llenado de la tabla con los datos almacenados
    datos.forEach((fila, index) => {
        const row = tablaCuerpo.insertRow(index);
        row.insertCell(0).textContent = fila[0];
        row.insertCell(1).textContent = fila[1];
        row.insertCell(2).textContent = fila[2];
        row.insertCell(3).textContent = fila[3];
    });

    // Actualiza el contador de solicitudes
    document.getElementById('contadorSolicitudes').textContent = datos.length;
}

// Función para generar la carta de presentación y guardar en localStorage
function generarCarta() {
    // Obtiene los datos del formulario
    const nombreDestinatario = document.getElementById('nombreDestinatario').value;
    const empresa = document.getElementById('empresa').value;
    const direccionEmpresa = document.getElementById('direccionEmpresa').value;
    const puesto = document.getElementById('puesto').value;
    const formato = document.getElementById('formato').value;

    // Genera el contenido de la carta
    const carta = `
Carta de Presentación

Carlos Luis Hernández Gutiérrez
Madrid, España
Tel: 687875064
Email: chcarlos3@gmail.com
LinkedIn: www.linkedin.com/in/carloslhg

Fecha: [Fecha]
Para: ${nombreDestinatario}
Empresa: ${empresa}
Dirección: ${direccionEmpresa}

Estimado/a ${nombreDestinatario}:

Es un placer dirigirme a usted para expresar mi interés en la posición de ${puesto} en ${empresa}. Mi trayectoria en consultoría tecnológica y especialización en las plataformas de Atlassian...
`;

    if (formato === 'pdf') {
        // Usa jsPDF para crear un archivo PDF enriquecido
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();

        // Añadir estilos personalizados
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(18);
        pdf.text("Carta de Presentación", 10, 20);

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(12);
        pdf.text("Carlos Luis Hernández Gutiérrez", 10, 30);
        pdf.text("Madrid, España", 10, 40);
        pdf.text("Tel: 687875064", 10, 50);
        pdf.text("Email: chcarlos3@gmail.com", 10, 60);
        pdf.text("LinkedIn: www.linkedin.com/in/carloslhg", 10, 70);

        pdf.setFontSize(14);
        pdf.text("Detalles de la Carta", 10, 85);

        pdf.setFontSize(12);
        pdf.text(`Fecha: [Fecha]`, 10, 95);
        pdf.text(`Para: ${nombreDestinatario}`, 10, 105);
        pdf.text(`Empresa: ${empresa}`, 10, 115);
        pdf.text(`Dirección: ${direccionEmpresa}`, 10, 125);

        pdf.setFont("helvetica", "italic");
        pdf.setFontSize(12);
        pdf.text(`Estimado/a ${nombreDestinatario},`, 10, 145);

        pdf.setFont("helvetica", "normal");
        pdf.text(`Es un placer dirigirme a usted para expresar mi interés en la posición de ${puesto} en ${empresa}.`, 10, 155, { maxWidth: 180 });
        pdf.text(`Mi trayectoria en consultoría tecnológica y especialización en las plataformas de Atlassian...`, 10, 165, { maxWidth: 180 });

        // Guardar el archivo PDF
        pdf.save("cartaPresentacion.pdf");
    } else {
        // Crea el archivo en formato de texto para los demás tipos (txt, md)
        const blob = new Blob([carta], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.innerHTML = `<a href="${url}" download="cartaPresentacion.${formato}">Descargar Carta en ${formato.toUpperCase()}</a>`;
        downloadLink.classList.remove('hidden');
    }

    // Guardar los datos en localStorage sin descargar automáticamente el archivo CSV
    const datos = [nombreDestinatario, empresa, direccionEmpresa, puesto];
    guardarEnLocalStorage(datos);

    // Pregunta al usuario si desea descargar el archivo CSV
    const descargarCsv = confirm("¿Desea descargar el archivo CSV con las solicitudes acumuladas?");
    if (descargarCsv) {
        descargarCSV();
    }
}

// Función para almacenar datos en localStorage
function guardarEnLocalStorage(datos) {
    // Recupera datos existentes de localStorage
    let acumulado = localStorage.getItem("solicitudes");
    acumulado = acumulado ? JSON.parse(acumulado) : [];

    // Agrega la nueva entrada
    acumulado.push(datos);

    // Guarda la nueva lista en localStorage
    localStorage.setItem("solicitudes", JSON.stringify(acumulado));
}

// Función para descargar el archivo CSV con datos acumulados
function descargarCSV() {
    let acumulado = localStorage.getItem("solicitudes");
    acumulado = acumulado ? JSON.parse(acumulado) : [];

    // Crea el contenido del CSV
    const encabezados = "Nombre del destinatario,Empresa,Dirección de la empresa,Puesto al que aplica\n";
    const contenidoCSV = acumulado.map(fila => fila.join(",")).join("\n");

    // Genera el archivo CSV para descarga
    const csvBlob = new Blob([encabezados + contenidoCSV], { type: 'text/csv' });
    const csvUrl = URL.createObjectURL(csvBlob);

    // Crea el enlace de descarga
    const hiddenLink = document.createElement('a');
    hiddenLink.href = csvUrl;
    hiddenLink.download = 'basededatos.csv';
    hiddenLink.click();
}
