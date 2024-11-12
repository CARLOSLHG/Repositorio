
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

// Función para cargar la tabla desde el CSV y actualizar el total
function cargarTabla() {
    const tablaCuerpo = document.querySelector('#tablaSolicitudes tbody');
    tablaCuerpo.innerHTML = '';  // Limpia la tabla

    // Simulación de datos (aquí los cargarías desde el CSV en un entorno real)
    const datos = [
        { nombre: "Ana Pérez", empresa: "Tech Solutions", direccion: "Calle Falsa 123", puesto: "Analista" },
        { nombre: "Luis García", empresa: "Innova Labs", direccion: "Av. Principal 456", puesto: "Desarrollador" }
    ];

    // Llenado de la tabla con datos simulados
    datos.forEach((fila, index) => {
        const row = tablaCuerpo.insertRow(index);
        row.insertCell(0).textContent = fila.nombre;
        row.insertCell(1).textContent = fila.empresa;
        row.insertCell(2).textContent = fila.direccion;
        row.insertCell(3).textContent = fila.puesto;
    });

    // Actualiza el contador de solicitudes
    document.getElementById('contadorSolicitudes').textContent = datos.length;
}

// Función para generar la carta de presentación
function generarCarta() {
    // Obtiene los datos del formulario
    const nombreDestinatario = document.getElementById('nombreDestinatario').value;
    const empresa = document.getElementById('empresa').value;
    const direccionEmpresa = document.getElementById('direccionEmpresa').value;
    const puesto = document.getElementById('puesto').value;
    const formato = document.getElementById('formato').value;

    // Genera el contenido de la carta
    const carta = `
# Carta de Presentación

**Carlos Luis Hernández Gutiérrez**  
Madrid, España  
Tel: 687875064  
Email: chcarlos3@gmail.com  
LinkedIn: [www.linkedin.com/in/carloslhg](https://linkedin.com/in/carloslhg)

---

**Fecha**: [Fecha]  
**Para**: ${nombreDestinatario}  
**Empresa**: ${empresa}  
**Dirección**: ${direccionEmpresa}

---

## Estimado/a ${nombreDestinatario}:

Es un placer dirigirme a usted para expresar mi interés en la posición de **${puesto}** en **${empresa}**. Mi trayectoria en consultoría tecnológica y especialización en las plataformas de Atlassian, junto con mis competencias en diseño UX/UI y desarrollo de sistemas en la nube...
`;

    // Crea el archivo en el formato seleccionado
    const blob = new Blob([carta], { type: formato === 'docx' ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : 'text/plain' });
    const url = URL.createObjectURL(blob);

    // Muestra el enlace de descarga
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.innerHTML = `<a href="${url}" download="cartaPresentacion.${formato}">Descargar Carta en ${formato.toUpperCase()}</a>`;
    downloadLink.classList.remove('hidden');

    // Guarda los datos en el archivo CSV
    const datos = `${nombreDestinatario},${empresa},${direccionEmpresa},${puesto}\n`;
    guardarEnCSV(datos);
}

// Función para guardar datos en el archivo CSV
function guardarEnCSV(datos) {
    const csvBlob = new Blob([datos], { type: 'text/csv' });
    const csvUrl = URL.createObjectURL(csvBlob);

    const hiddenLink = document.createElement('a');
    hiddenLink.href = csvUrl;
    hiddenLink.download = 'basededatos.csv';
    hiddenLink.click();
}
