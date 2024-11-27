// first, import the required modules
// this makes the functions exported from the "required" file available
const { showError , clearErrors} = require("../script.js");

// import JSDOM module
// because JSDOM is a module in node_modules, we don't need to include its path, only its name
const { JSDOM } = require("jsdom");

// jest will invoke every callback that is provided as the last argument to a "test" invocation
test("updateDOM correctly updates the inner text of an element", () => {
   
    const dom = new JSDOM(`<!DOCTYPE html>
        <form id="donation_form">
        <div id="content_area">
                    <label for="date">Date of Donation</label>
                    <input type="date" id="date">   
                    <span id="date_error"></span>
        </div>
                
        </form>`);
    
    global.document = dom.window.document;
    
    const errorMessage ="Please select a donation date"
    showError("date_error", errorMessage);

    const errorElement = document.querySelector(".error-message");

    // Assertions
    expect(errorElement).not.toBeNull(); 
    expect(errorElement.textContent).toBe(errorMessage); 
    
});
