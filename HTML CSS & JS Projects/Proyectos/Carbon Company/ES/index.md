# Proyecto Web: "Academia Carbón Company"

[Ver el sitio web](../Container/)

## **1\. Informe del Proyecto**

El proyecto Ficticio **Carbon Company** es una Academia web diseñada para enseñar técnicas de dibujo al carboncillo. La página proporciona una experiencia educativa visualmente atractiva, combinando elementos de diseño gráfico y tecnologías web modernas. A través de secciones dedicadas a diferentes técnicas, como el difuminado, el contraste y el rayado cruzado, los usuarios pueden explorar y aprender mediante ejemplos visuales y descripciones claras. El proyecto está desarrollado utilizando **HTML, CSS y JavaScript**, con un enfoque en la accesibilidad, la claridad visual y la simplicidad de uso.

## **2\. Procedimientos Utilizados en HTML**

En la estructura del sitio, el **HTML** fue utilizado para definir la estructura de la página y su contenido. Algunas de las características clave del HTML en este proyecto incluyen:

* **Estructura de la página**: Se emplearon etiquetas como `<header>`, `<main>`, `<section>`, y `<footer>` para organizar el contenido, mejorando la accesibilidad.  
* **Formateo del contenido**: Las técnicas de dibujo se presentaron en listas y párrafos usando etiquetas como `<h1>` y `<h2>` para títulos y `<p>` para el texto descriptivo.  
* **Galería de imágenes**: Se utilizó la etiqueta `<img>` para mostrar ejemplos de dibujos al carboncillo en una cuadrícula organizada mediante `display: grid` en CSS.  
* **Enlaces y navegación**: Se implementaron enlaces de navegación entre secciones con la etiqueta `<a>`, facilitando la interacción del usuario.

## **3\. Procedimientos Utilizados en CSS**

**CSS** fue esencial para el diseño visual del proyecto. Los estilos de CSS permitieron crear un diseño limpio y minimalista. Algunas de las características importantes incluyen:

* **Diseño con Grid y Flexbox**: La disposición de las imágenes y el contenido se realizó principalmente con **display: grid** para la galería de imágenes y **flexbox** para el diseño responsivo del sitio, asegurando que el contenido se ajuste adecuadamente en diferentes tamaños de pantalla.  
* **Colores y fuentes**: Se eligió una paleta de colores monocromatica en blanco y negro, que refuerza el enfoque en las técnicas de dibujo al carboncillo, las fuentes seleccionadas proporcionan una lectura clara y fácil de seguir.  
* **Estilos personalizados**: La estructura del `<body>`  y el  `<footer>`, se estilizaron con bordes y efectos de sombra suaves, dando la sensación de una obra enmarcada.

## **4\. Procedimientos Utilizados en JavaScript**

**JavaScript** fue utilizado en el proyecto de manera simple pero efectiva para mejorar la interacción del usuario al permitirle cambiar el color de fondo de la página. Se implementó un script que cambia el color de fondo entre tres opciones (blanco, gris claro y gris oscuro) cada vez que se hace clic en un botón.

* **Cambio de tema de fondo**: Se creó un botón con la clase `cambiarFondo` que, al ser presionado, activa una función que alterna entre diferentes colores de fondo. Esta característica añade un toque interactivo, permitiendo al usuario personalizar su experiencia visual según sus preferencias.

El script es fácil de entender y eficiente, utilizando eventos de JavaScript como `addEventListener` para capturar el clic del usuario y aplicar cambios en el estilo del elemento `body`.

### **Código JavaScript:**
```javascript	
let themeButton = document.querySelector('.cambiarFondo');  
themeButton.addEventListener('click', cambiarColorFondo);

function cambiarColorFondo() {  
      
    let body = document.querySelector('body');

    if (body.style.backgroundColor == 'white') {  
        `body.style.backgroundColor = 'lightgray';  
    } else if (body.style.backgroundColor == 'lightgray') {  
        `body.style.backgroundColor = '#333';  
    } else {`  
        body.style.backgroundColor = 'white';  
    } 
}
```

### **Explicación del código:**

* **querySelector**: Selecciona el botón con la clase `cambiarFondo` para vincularlo con la funcionalidad de cambiar el fondo.  
* **addEventListener**: Se utiliza para escuchar el evento de clic en el botón.  
* **Función cambiarColorFondo**: Cambia el color de fondo del `body` entre tres colores (`white`, `lightgray`, `#333`), alternando cada vez que se hace clic en el botón.

## **5\. Conclusión**

El proyecto web **Carbón Company** fue desarrollado con un enfoque en la enseñanza, la presentación  interactiva y visual de las técnicas de dibujo al carboncillo. Mediante la combinación de **HTML**, **CSS** y **JavaScript**, se logró una página web visualmente atractiva que permite a los usuarios navegar entre secciones que lo lleven a una toma de decisión. El uso de html, css y javascript también asegura que la página sea responsive, accesible y fácil de mantener.


## Enlace al sitio

[Carbón Company](../Container/)

---

[Volver al Menú Principal de Proyectos](../../../../)

### 🙏 ¡Gracias por visitar mi repositorio!




