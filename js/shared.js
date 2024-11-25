// Function to load a template into a target element
function loadTemplate(templatePath, targetElementId) {
    fetch(templatePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(targetElementId).innerHTML = data;
        })
        .catch(error => console.error(`Error loading template: ${error}`));
}

// Load shared components
document.addEventListener('DOMContentLoaded', () => {
    loadTemplate('/templates/header.html', 'header');
    loadTemplate('/templates/navbar.html', 'nav');
    loadTemplate('/templates/footer.html', 'footer');
});
