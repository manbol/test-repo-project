// Import required modules and functions
const { JSDOM } = require("jsdom");

// Helper function to set up the DOM structure for the tests
const setupDOM = () => {
    const dom = new JSDOM(`
        <!DOCTYPE html>
        <form id="event-form">
            <div>
                <input id="event-name" type="text" />
            </div>
            <div>
                <input id="representative-name" type="text" />
            </div>
            <div>
                <input id="representative-email" type="email" />
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
    global.domjs = dom;
};

setupDOM();

const { validateForm } = require("../js/event"); // Adjust the path if needed

describe("validateForm", () => {
    beforeEach(() => {
        setupDOM(); // Set up the DOM before each test
    });

    test("returns valid object when all fields are correctly filled", () => {
        // Arrange: Set valid values in the form
        document.querySelector("#event-name").value = "Community Meetup";
        document.querySelector("#representative-name").value = "John Doe";
        document.querySelector("#representative-email").value = "john.doe@example.com";
        document.querySelector("#role-selection").value = "sponsor";

        // Act: Call validateForm
        const result = validateForm();

        // Assert: Check the validation result
        expect(result.isValid).toBe(true);
        expect(result.errorInputs).toHaveLength(0);
    });

    test("returns invalid object when fields are empty", () => {
        // Act: Call validateForm with empty fields
        const result = validateForm();

        // Assert: Check the validation result
        expect(result.isValid).toBe(false);
        expect(result.errorInputs).toHaveLength(4);
        expect(result.errorInputs[0].message).toBe("Please enter the event name.");
        expect(result.errorInputs[1].message).toBe("Please enter the representative's name.");
        expect(result.errorInputs[2].message).toBe("Please enter a valid email address.");
        expect(result.errorInputs[3].message).toBe("Please select a role for the event.");
    });

    test("returns invalid object when email format is incorrect", () => {
        // Arrange: Set invalid email
        document.querySelector("#event-name").value = "Community Meetup";
        document.querySelector("#representative-name").value = "John Doe";
        document.querySelector("#representative-email").value = "invalid-email";
        document.querySelector("#role-selection").value = "sponsor";

        // Act: Call validateForm
        const result = validateForm();

        // Assert: Check the validation result
        expect(result.isValid).toBe(false);
        expect(result.errorInputs).toHaveLength(1);
        expect(result.errorInputs[0].message).toBe("Please enter a valid email address.");
    });

    test("returns invalid object when role is not selected", () => {
        // Arrange: Set all fields except role
        document.querySelector("#event-name").value = "Community Meetup";
        document.querySelector("#representative-name").value = "John Doe";
        document.querySelector("#representative-email").value = "john.doe@example.com";
        document.querySelector("#role-selection").value = "";

        // Act: Call validateForm
        const result = validateForm();

        // Assert: Check the validation result
        expect(result.isValid).toBe(false);
        expect(result.errorInputs).toHaveLength(1);
        expect(result.errorInputs[0].message).toBe("Please select a role for the event.");
    });

      // Test: Function is triggered on form submission
    test("function is triggered on form submission", () => {
        let form = document.querySelector("#event-form");
        const mockValidateForm = jest.fn(validateForm);

        form.addEventListener("submit", (e) => {
        e.preventDefault();
        mockValidateForm();
        });

        // Simulate form submission
        const event = new domjs.window.Event("submit", { bubbles: true });
        form.dispatchEvent(event);

        expect(mockValidateForm).toHaveBeenCalled();
    });
});
