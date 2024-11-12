
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

// Función para generar la carta de presentación y guardar en CSV o PDF
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
        // Usa jsPDF para crear un archivo PDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();
        pdf.text(carta, 10, 10);
        pdf.save("cartaPresentacion.pdf");
    } else {
        // Crea el archivo en formato de texto para los demás tipos (txt, md, yxy)
        const blob = new Blob([carta], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.innerHTML = `<a href="${url}" download="cartaPresentacion.${formato}">Descargar Carta en ${formato.toUpperCase()}</a>`;
        downloadLink.classList.remove('hidden');
    }

    // Guarda los datos en el archivo CSV con acumulación
    const datos = [nombreDestinatario, empresa, direccionEmpresa, puesto];
    guardarEnCSV(datos);
}

// Función para almacenar datos en localStorage y descargar el archivo acumulado
function guardarEnCSV(datos) {
    // Recupera datos existentes de localStorage
    let acumulado = localStorage.getItem("solicitudes");
    acumulado = acumulado ? JSON.parse(acumulado) : [];

    // Agrega la nueva entrada
    acumulado.push(datos);

    // Guarda la nueva lista en localStorage
    localStorage.setItem("solicitudes", JSON.stringify(acumulado));

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
