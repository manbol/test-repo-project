function init(){
    
    const form = document.getElementById("donation_form");
    form.addEventListener("submit",(event)=>{
        event.preventDefault();
        clearErrors();

        const charityName = document.getElementById("name");
        const donationAmount = document.getElementById("amount");
        const donationDate = document.getElementById("date");
        const donorMessage = document.getElementById("message");

        let isvalied = true

        if (charityName.value.length === 0){
            showError("name_error","Name field cannot be empty");
            isvalied=false;
        }
        if (donorMessage.value.length === 0){
            showError("text_error","Name field cannot be empty");
            isvalied=false;
        }
        if (!donationAmount.value || donationAmount.value< 0){
            showError("amount_error","Please enter donation amount");
            isvalied=false;
        }
        if (!donationDate.value) {
            showError("date_error","Please select a donation date");
            isvalied=false;
        }
        if(isvalied){
            const donationData={
                charityName: charityName, 
                donationAmount: donationAmount, 
                donationDate: donationDate, 
                donorMessage: donorMessage
            }
            console.log(donationData);
            alert("Donation has been completed successfully.")
        }
        
})
    
};


function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.createElement('div');
    errorElement.className = "error-message";
    errorElement.textContent = message;
    field.parentElement.appendChild(errorElement);
    field.classList.add('error');
}
function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
}

if(typeof window === "undefined") {

module.exports = { showError, clearErrors };
} else {

window.onload = init
}