// Select the form node
const formNode = document.querySelector("#event-form");

// Add a submit event listener to the form
formNode.addEventListener("submit", (event) => {
    // Stop the form from submitting
    event.preventDefault();

    clearErrors();

    // Validate the form and get the validation result
    const validateObject = validateForm();

    // If the form is invalid, display the error messages
    if (!validateObject.isValid) {
        const errorInputs = validateObject.errorInputs;
        errorInputs.forEach((object) => {
            showError(object.node, object.message);
        });
    } else {
        alert("Form submitted successfully!");
        // formNode.submit();   // Comment this out. We aren't really submitting to a server
    }
});

// Function to display error messages
const showError = (displayNode, errorMessage) => {
    const errorTextNode = document.createElement("div");
    errorTextNode.setAttribute("role", "alert");
    errorTextNode.innerText = errorMessage;
    errorTextNode.className = "error-message";

    // Append the error message to the form field's parent node
    displayNode.appendChild(errorTextNode);
};

// Function to validate the form
const validateForm = () => {
    const eventNameNode = document.querySelector("#event-name");
    const representativeNameNode = document.querySelector("#representative-name");
    const representativeEmailNode = document.querySelector("#representative-email");
    const roleSelectionNode = document.querySelector("#role-selection");

    let isValid = true;
    let errorInputs = [];

    // Validate Event Name
    if (!isNotEmpty(eventNameNode.value)) {
        isValid = false;
        errorInputs.push({
            node: eventNameNode.parentNode,
            message: "Please enter the event name.",
        });
    }

    // Validate Representative Name
    if (!isNotEmpty(representativeNameNode.value)) {
        isValid = false;
        errorInputs.push({
            node: representativeNameNode.parentNode,
            message: "Please enter the representative's name.",
        });
    }

    // Validate Representative Email
    if (!isValidEmail(representativeEmailNode.value)) {
        isValid = false;
        errorInputs.push({
            node: representativeEmailNode.parentNode,
            message: "Please enter a valid email address.",
        });
    }

    // Validate Role Selection
    if (!isSelected(roleSelectionNode)) {
        isValid = false;
        errorInputs.push({
            node: roleSelectionNode.parentNode,
            message: "Please select a role for the event.",
        });
    }

    if(isValid){
        let data = {
            eventName: eventNameNode.value,
            repName: representativeNameNode.value,
            repEmail: representativeEmailNode.value,
            role: roleSelectionNode.value
        };

        return { isValid, errorInputs, data};
    }

    return { isValid, errorInputs };
};

// Helper function to check if a value is not empty
const isNotEmpty = (value) => value.trim() !== "";

// Helper function to check if a dropdown option is selected
const isSelected = (dropdownNode) => dropdownNode.value !== "";

// Helper function to validate email format
const isValidEmail = (email) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$/i;
    return emailPattern.test(email);
};

// Function to clear all previous error messages
const clearErrors = () => {
    const errorMessageNodes = document.querySelectorAll(".error-message");
    errorMessageNodes.forEach((node) => {
        node.remove();
    });
};

if(typeof window === "undefined") {
    // window object represents the browser window
    module.exports = {validateForm};
}
