// https://github.com/zMontreuilRRC/comp_2230_717_module_04/blob/main/script.js

const volunteerFormNode = document.querySelector("#volunteer-form")

volunteerFormNode.addEventListener("submit", (event) => {
    isFormFilledProperly = true;

    // All separate functions

    if (!isFormFilledProperly === true){
        event.preventDefault()
    }
} );

validateCharityName = () => {
    const charityName = document.querySelector("#name");
    


}