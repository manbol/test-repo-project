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
![image](https://private-user-images.githubusercontent.com/156357965/390113850-6c36c04c-3e48-4adb-8634-6336bdf9efae.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzI2NDkzMDgsIm5iZiI6MTczMjY0OTAwOCwicGF0aCI6Ii8xNTYzNTc5NjUvMzkwMTEzODUwLTZjMzZjMDRjLTNlNDgtNGFkYi04NjM0LTYzMzZiZGY5ZWZhZS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQxMTI2JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MTEyNlQxOTIzMjhaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT00NjM3YzI2ZDM0MDk0OGRjMjhhNWRmMjg0MmIzODk4YjQxNTRkYTVmOTAxMzc2NjI0NTAwZjI2MGZjZTk5NzllJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.rip9m3qrm4u-1phUK5R9sie9-dJHf_nd6KDN0YWGu50)

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
