// https://github.com/zMontreuilRRC/comp_2230_717_module_04/blob/main/script.js

const volunteerFormNode = document.querySelector("#volunteer_form")

volunteerFormNode.addEventListener("submit", (event) => {
    let isFormFilledProperly = true;

    // Checking for if each function passes a boolean test.
    if(!validateCharityName()) {
        isFormFilledProperly = false;
    }

    if(!validateHours()) {
        isFormFilledProperly = false;
    }

    if(!validateDate()) {
        isFormFilledProperly = false;
    }
    
    if(!validateStarRating()) {
        isFormFilledProperly = false;
    }

    if (!isFormFilledProperly === true){
        event.preventDefault()
    }
} );

validateCharityName = () => {
    const charityName = document.querySelector("#name");
    const nameError = document.querySelector("#name_error");
    const nameErrorBox = document.querySelector("#name-error-box")

    while (nameError.firstChild) {
        nameError.removeChild(nameError.firstChild);
    }

    // Grabbing Value
    let charityNameEntered = charityName.value;

    if(charityNameEntered.length <= 0) {
        // creating error message
        const errorMessage = document.createElement('p');

        errorMessage.innerText = "Must have at least 1 character for a charity or organization."

        // adding the error message
        nameError.appendChild(errorMessage);
        nameErrorBox.appendChild(nameError);

        return false;
    }

    return true;
}

validateHours = () => {
    const volunteerHours = document.querySelector("#hours");
    const hoursError = document.querySelector("#hours_error");
    const hoursErrorBox = document.querySelector("#hours-error-box");

     while (hoursError.firstChild) {
         hoursError.removeChild(hoursError.firstChild);
     }

     // Grabbing Value
     let volunteerHoursValue = volunteerHours.value;

     if(isNaN(volunteerHoursValue)) {
        // creating error message
        const errorMessage = document.createElement('p');
        
        errorMessage.innerText = "You must provide a numerical ."

        // adding the error message
        hoursError.appendChild(errorMessage);
        hoursErrorBox.appendChild(hoursError);

        return false;
        
     } else if (volunteerHoursValue <= 0) {
        // creating error message
        const errorMessage = document.createElement('p');

        errorMessage.innerText = "You must provide a positive number (Not Zero as well)."

        // adding the error message
        hoursError.appendChild(errorMessage);
        hoursErrorBox.appendChild(hoursError);

        return false;
     }
    
     return true;
}

validateDate = () => {
    const volunteerDate = document.querySelector("#date");
    const dateError = document.querySelector("#date_error");
    const dateErrorBox = document.querySelector("#date-error-box");

    while (dateError.firstChild) {
        dateError.removeChild(dateError.firstChild);
    }

    let volunteerDateValue = volunteerDate.value;
    // console.log(volunteerDateValue)

    if(volunteerDateValue.length <= 0) {
        const errorMessage = document.createElement('p');

        errorMessage.innerText = "Please pick a date."

        // adding the error message
        dateError.appendChild(errorMessage);
        dateErrorBox.appendChild(dateError);

        return false;
    }
    
    return true;
}

validateStarRating = () => {
    const starRating = document.querySelector("#star_rating");
    const starError = document.querySelector("#star_error");
    const starErrorBox = document.querySelector("#star-error-box");

    // Clear previous error messages
    while (starError.firstChild) {
        starError.removeChild(starError.firstChild);
    }

    // Convert input value to a number
    let starRatingValue = Number(starRating.value);
    console.log(starRatingValue);

    // Validate integer and range
    if (!Number.isInteger(starRatingValue)) {
        // Creating error message
        const errorMessage = document.createElement('p');
        errorMessage.innerText = "You must provide an integer.";

        // Adding the error message
        starError.appendChild(errorMessage);
        starErrorBox.appendChild(starError);

        return false;
    } else if (starRatingValue < 1 || starRatingValue > 5) {
        // Validate the range of the star rating
        const errorMessage = document.createElement('p');
        errorMessage.innerText = "Star rating must be between 1 and 5.";

        // Adding the error message
        starError.appendChild(errorMessage);
        starErrorBox.appendChild(starError);

        return false;
    }

    return true;
}