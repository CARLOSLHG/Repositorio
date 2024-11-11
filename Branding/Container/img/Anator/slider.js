let images = [];
let currentIndex = 0;

async function fetchImages() {
    try {
        const response = await fetch('images.json');
        const data = await response.json();
        images = data.images;
        showImage();
    } catch (error) {
        console.error("Error loading images:", error);
    }
}

function showImage() {
    const imageElement = document.getElementById("slider-image");
    imageElement.src = images[currentIndex];
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage();
}

// Load images when the page loads
window.onload = fetchImages;
