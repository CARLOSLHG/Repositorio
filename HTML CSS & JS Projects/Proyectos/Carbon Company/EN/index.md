# Web Project: "Carbon Company Academy"

[View the website](../Container/)

## **1. Project Report**

The fictional project **Carbon Company** is a web academy designed to teach charcoal drawing techniques. The site provides a visually appealing educational experience, combining graphic design elements and modern web technologies. Through sections dedicated to different techniques—such as blending, contrast, and cross-hatching—users can explore and learn with clear descriptions and visual examples. The project is built using **HTML, CSS, and JavaScript**, focusing on accessibility, visual clarity, and ease of use.

## **2. HTML Procedures Used**

Within the site's structure, **HTML** was used to define the page layout and its content. Some of the key HTML features in this project include:

* **Page structure:** Tags like `<header>`, `<main>`, `<section>`, and `<footer>` were used to organize content and improve accessibility.
* **Content formatting:** Drawing techniques were presented in lists and paragraphs, using tags like `<h1>` and `<h2>` for headings and `<p>` for descriptive text.
* **Image gallery:** The `<img>` tag was used to display charcoal drawing examples in a grid layout organized with CSS `display: grid`.
* **Links and navigation:** Navigation links between sections were implemented using the `<a>` tag, making user interaction seamless.

## **3. CSS Procedures Used**

**CSS** was essential for the visual design of the project. The styles provided a clean and minimalist layout. Some important features include:

* **Grid and Flexbox layout:** The arrangement of images and content was achieved mainly with **display: grid** for the image gallery and **flexbox** for the responsive site layout, ensuring the content adapts smoothly to different screen sizes.
* **Colors and fonts:** A monochromatic black-and-white palette was chosen to emphasize charcoal drawing techniques. Selected fonts provide clear and easy-to-read text.
* **Custom styles:** The `<body>` and `<footer>` structures were styled with subtle borders and shadow effects, giving the impression of a framed artwork.

## **4. JavaScript Procedures Used**

**JavaScript** was used in a simple but effective way to enhance user interaction by allowing users to change the page's background color. A script was implemented to toggle the background color between three options (white, light gray, and dark gray) each time a button is clicked.

* **Background theme switcher:** A button with the class `cambiarFondo` was created. When pressed, it triggers a function that cycles through different background colors. This feature adds an interactive touch, allowing users to customize their visual experience.

The script is easy to understand and efficient, using JavaScript events like `addEventListener` to detect user clicks and apply style changes to the `body` element.

### **JavaScript Code:**

```javascript
let themeButton = document.querySelector('.cambiarFondo');
themeButton.addEventListener('click', cambiarColorFondo);

function cambiarColorFondo() {
    let body = document.querySelector('body');

    if (body.style.backgroundColor == 'white') {
        body.style.backgroundColor = 'lightgray';
    } else if (body.style.backgroundColor == 'lightgray') {
        body.style.backgroundColor = '#333';
    } else {
        body.style.backgroundColor = 'white';
    }
}
```

### **Code Explanation:**

* **`querySelector`**: Selects the button with the `cambiarFondo` class to link it to the background change functionality.  
* **`addEventListener`**: Used to listen for the button's click event.  
* **`cambiarColorFondo` function**: Changes the `body` background color between three options (`white`, `lightgray`, `#333`), toggling each time the button is clicked.

## **5. Conclusion**

The **Carbon Company** web project was developed with a focus on teaching, and on the interactive and visual presentation of charcoal drawing techniques. By combining **HTML**, **CSS**, and **JavaScript**, an attractive web page was created that allows users to navigate through sections that guide their decision-making process. The use of HTML, CSS, and JavaScript also ensures the site is responsive, accessible, and easy to maintain.

## Website Link

[Carbón Company](../Container/)

---

[Back to Main Project Menu](../../../../)

### 🙏 Thank you for visiting my repository!

