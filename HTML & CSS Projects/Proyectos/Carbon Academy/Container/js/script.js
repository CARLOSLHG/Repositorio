

// llamada del boton Cambiar Fondo


let themeButton = document.querySelector('.cambiarFondo');
themeButton.addEventListener('click', cambiarColorFondo);

function cambiarColorFondo() {
    
    let body = document.querySelector('body');

    if (body.style.backgroundColor == 'lightgray') {
        body.style.backgroundColor = '#333';
    } else if (body.style.backgroundColor == '#333') {
        body.style.backgroundColor = 'white';
    } else {
        body.style.backgroundColor = 'lightgray';
    }
}

// Mostrar alerta al enviar el formulario


function enviarSolicitud(event) {
            event.preventDefault();
            alert("Hemos recibido su solicitud y nos comunicaremos con usted.");
        }

document.querySelector('.contact-form').addEventListener('submit', enviarSolicitud);