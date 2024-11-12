
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

    datos.forEach((fila, index) => {
        const row = tablaCuerpo.insertRow(index);
        row.insertCell(0).textContent = fila[0];
        row.insertCell(1).textContent = fila[1];
        row.insertCell(2).textContent = fila[2];
        row.insertCell(3).textContent = fila[3];

        const actionsCell = row.insertCell(4);
        actionsCell.classList.add("actions-cell");

        const viewIcon = document.createElement("span");
        viewIcon.innerHTML = "👁️";
        viewIcon.classList.add("icon");
        viewIcon.title = "Ver Solicitud";
        viewIcon.onclick = () => verSolicitud(fila);
        actionsCell.appendChild(viewIcon);

        const downloadIcon = document.createElement("span");
        downloadIcon.innerHTML = "⬇️";
        downloadIcon.classList.add("icon");
        downloadIcon.title = "Descargar Solicitud";
        downloadIcon.onclick = () => descargarSolicitud(fila);
        actionsCell.appendChild(downloadIcon);
    });

    document.getElementById('contadorSolicitudes').textContent = datos.length;
}

// Función para generar la carta con el estilo seleccionado y contenido predefinido
function generarPDFConEstilo(estilo, nombreDestinatario, empresa, direccionEmpresa, puesto) {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    const encabezado = `Carlos Luis Hernández Gutiérrez\nMadrid, España\nTel: 687875064\nEmail: chcarlos3@gmail.com`;
    const saludo = `Estimado/a ${nombreDestinatario},`;
    const introduccion = `Me dirijo a usted para expresar mi interés en la posición de ${puesto} en ${empresa}.`;
    const resumenProfesional = `
Profesional en consultoría tecnológica con experiencia en plataformas Atlassian, gestión de proyectos y desarrollo de sistemas en la nube.
Certificado en Google Data Analytics y administración de Jira para Cloud.
    `;
    const experienciaCompetencias = `
Experiencia en:
- Gestión de proyectos en Atlassian (Jira y Confluence).
- Desarrollo web con HTML, CSS y JavaScript.
- Análisis de datos con R y BigQuery.
    `;
    const cierre = `Atentamente,\nCarlos Luis Hernández Gutiérrez`;

    switch (estilo) {
        case 'modelo1':
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(18);
            pdf.setTextColor(33, 150, 243);
            pdf.text("Carta de Presentación", 10, 20);

            pdf.setFontSize(12);
            pdf.setTextColor(0, 0, 0);
            pdf.text(encabezado, 10, 30);
            pdf.text(saludo, 10, 50);
            pdf.text(introduccion, 10, 60);
            pdf.text(resumenProfesional, 10, 70);
            pdf.text(experienciaCompetencias, 10, 90);
            pdf.text(cierre, 10, 120);
            break;

        case 'modelo2':
            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(18);
            pdf.setTextColor(0, 0, 0);
            pdf.text(encabezado, 10, 20);
            pdf.line(10, 30, pdf.internal.pageSize.width - 10, 30);

            pdf.setFontSize(12);
            pdf.text(saludo, 10, 40);
            pdf.text(introduccion, 10, 50);
            pdf.text(resumenProfesional, 10, 60);
            pdf.text(experienciaCompetencias, 10, 80);
            pdf.text(cierre, 10, 110);
            break;

        case 'modelo3':
            pdf.setFillColor(0, 102, 204);
            pdf.rect(0, 0, pdf.internal.pageSize.width, 25, 'F');
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(20);
            pdf.setTextColor(255, 255, 255);
            pdf.text("Carta de Presentación", 10, 15);

            pdf.setFontSize(12);
            pdf.setTextColor(0, 0, 0);
            pdf.text(encabezado, 10, 40);
            pdf.text(saludo, 10, 55);
            pdf.text(introduccion, 10, 65);
            pdf.text(resumenProfesional, 10, 75);
            pdf.text(experienciaCompetencias, 10, 95);
            pdf.text(cierre, 10, 125);
            break;

        case 'modelo4':
            pdf.setFont("helvetica", "italic");
            pdf.setFontSize(14);
            pdf.setTextColor(0, 0, 0);
            pdf.text("CARTA DE PRESENTACIÓN", 10, 20);

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(12);
            pdf.text(encabezado, 10, 30);
            pdf.text(saludo, 10, 45);
            pdf.text(introduccion, 10, 55);
            pdf.text(resumenProfesional, 10, 65);
            pdf.text(experienciaCompetencias, 10, 85);
            pdf.text(cierre, 10, 115);
            break;

        default:
            pdf.text("Estilo no válido", 10, 10);
            break;
    }

    pdf.save("cartaPresentacion.pdf");
}

// Función principal de generación de la carta
function generarCarta() {
    const nombreDestinatario = document.getElementById('nombreDestinatario').value || "Reclutador";
    const empresa = document.getElementById('empresa').value || "la empresa";
    const direccionEmpresa = document.getElementById('direccionEmpresa').value || "dirección de la empresa";
    const puesto = document.getElementById('puesto').value || "posición deseada";
    const formato = document.getElementById('formato').value;
    const estilo = document.getElementById('estilo').value;

    if (formato === 'pdf') {
        generarPDFConEstilo(estilo, nombreDestinatario, empresa, direccionEmpresa, puesto);
    } else {
        const carta = `
        Carta de Presentación\n\n
        ${nombreDestinatario}\n${puesto}\n${empresa}\n${direccionEmpresa}\n\n
        Estimado/a ${nombreDestinatario},\n\n
        ${resumenProfesional}
        `;
        const blob = new Blob([carta], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.innerHTML = `<a href="${url}" download="cartaPresentacion.${formato}">Descargar Carta en ${formato.toUpperCase()}</a>`;
        downloadLink.classList.remove('hidden');
    }
}
