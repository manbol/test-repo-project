# Initial Design of Directory Structure
```
FINAL_GROUP_PROJECT/
├── css/
│   ├── styles.css
│   └── ...                 # Styling files directory
├── js/
│   ├── shared.js
│   └── ...                 # Script files directory
├── pages/
│   ├── donation.html
│   ├── event.html
│   ├── volunteer.html
│   └── ...                 # Any pages that are other than the landing page
├── templates/
│   ├── footer.html
│   ├── header.html
│   ├── navbar.html
│   └── ...                 # Any components that are re-used
├── tests/
│   ├── jesttest.test.js
│   └── ...                 # This directory contains test.js files
├── .gitignore
├── index.html              # Landing page
├── package-lock.json
├── package.json
├── README.md
└── STYLE_GUIDE.md
```
The structure may change in later iterations of the project.

### Components (Template Directory)
![image](https://github.com/user-attachments/assets/6c36c04c-3e48-4adb-8634-6336bdf9efae)

- header
    - **For Example**, in the header.html:
    ```
    // No HTML boiler plate, just this
    <header>
        <h1>PiXELL River Financial</h1>
    </header>
    ```
- navbar
- footer

### These components are being loaded by this, inside 'shared.js':
```
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
```
