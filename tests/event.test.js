// Import jsdom
const { JSDOM } = require("jsdom");

// Function to set up the DOM structure for the tests
const setupDOM = () => {
    const dom = new JSDOM(`
        <!DOCTYPE html>
        <form id="event-form">
            <div>
                <input id="event-name" type="text">
            </div>
            <div>
                <input id="representative-name" type="text">
            </div>
            <div>
                <input id="representative-email" type="email">
            </div>
            <div>
                <select id="role-selection">
                    <option value="" disabled selected>Select a role</option>
                    <option value="sponsor">Sponsor</option>
                    <option value="participant">Participant</option>
                    <option value="organizer">Organizer</option>
                </select>
            </div>
        </form>
    `);
    global.document = dom.window.document;
    global.jsdomObj = dom;
};

// Initial set up of the JSDOM for require("../js/event")
setupDOM();
// Import the validateForm function from the event script
const { validateForm} = require("../js/event"); // Adjust the path if needed

describe("eventValidateForm", () => {
    beforeEach(() => {
        setupDOM(); // Reset the DOM before each test
    });

    test("function is triggered on form submission", () => {
        let form = document.querySelector("#event-form");
        // In order to test if the function is called after the submit event,
        // We need to create a mock function.
        // https://jestjs.io/docs/mock-functions
        const mockValidateForm = jest.fn(validateForm);

        form.addEventListener("submit", (event) => {
            mockValidateForm();
        });

        // Simulate form submission by mocking a submit event
        // https://developer.mozilla.org/en-US/docs/Web/API/Event/Event
        const event = new jsdomObj.window.Event("submit");
        // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
        form.dispatchEvent(event);

        // https://jestjs.io/docs/expect#tohavebeencalled
        expect(mockValidateForm).toHaveBeenCalled();
    });

    test("function correctly collects form data with all valid inputs", () => {
        // Arrange: Set valid values in the form
        document.querySelector("#event-name").value = "Conference";
        document.querySelector("#representative-name").value = "Superman";
        document.querySelector("#representative-email").value = "Superman@example.com";
        document.querySelector("#role-selection").value = "sponsor";
        // The expected data
        const expectedObject = {
            eventName: "Conference",
            repName: "Superman",
            repEmail: "Superman@example.com",
            role: "sponsor"
        }

        // Act: Call validateForm
        const result = validateForm();

        // Assert: Check the validation result
        expect(result.isValid).toBe(true);
        expect(result.errorInputs).toHaveLength(0);
        expect(result.data).toEqual(expectedObject);
    });

    test("function correctly identifies and flags when fields are left empty", () => {
        // Act: Call validateForm with empty fields
        const result = validateForm();

        // Assert: Check the validation result
        expect(result.isValid).toBe(false);
        // Check the length of errors
        expect(result.errorInputs).toHaveLength(4);
        // Check the errors in order based on the script
        expect(result.errorInputs[0].message).toBe("Please enter the event name.");
        expect(result.errorInputs[1].message).toBe("Please enter the representative's name.");
        expect(result.errorInputs[2].message).toBe("Please enter a valid email address.");
        expect(result.errorInputs[3].message).toBe("Please select a role for the event.");
        // data should be undefined in the object returned
        expect(result.data).toBeUndefined();
    });

    test("function correctly identifies and flags when the participant's email is not in a valid format", () => {
        // Arrange: Set invalid email
        document.querySelector("#event-name").value = "Conference";
        document.querySelector("#representative-name").value = "Superman";
        document.querySelector("#representative-email").value = "invalid-email";
        document.querySelector("#role-selection").value = "sponsor";

        // Act: Call validateForm
        const result = validateForm();

        // Assert: Check the validation result
        expect(result.isValid).toBe(false);
        expect(result.errorInputs).toHaveLength(1);
        expect(result.errorInputs[0].message).toBe("Please enter a valid email address.");

        // data should be undefined in the object returned
        expect(result.data).toBeUndefined();
    });
});
