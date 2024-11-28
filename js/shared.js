// Function to load a template into a target element
function loadTemplate(templatePath, targetElementId) {
    fetch(templatePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(targetElementId).innerHTML = data;
        })
        .catch(error => console.error(`Error loading template: ${error}`));
}

// Function to determine the base path dynamically
function getBasePath() {
    const currentPath = window.location.pathname; // Current page path
    const pathDepth = (currentPath.match(/\//g) || []).length - 2; // Number of "/" in path
    return '../'.repeat(pathDepth); // Backtrack to the root
}

// Load shared components
document.addEventListener('DOMContentLoaded', () => {
    const basePath = getBasePath(); // Dynamically calculate the base path
    console.log(basePath);
    loadTemplate(`${basePath}templates/header.html`, 'header');
    loadTemplate(`${basePath}templates/navbar.html`, 'nav');
    loadTemplate(`${basePath}templates/footer.html`, 'footer');
});
