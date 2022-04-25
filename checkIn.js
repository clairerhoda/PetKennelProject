
import {PetDetails} from '/kennel.js'
const petForm = document.getElementById("pet-details");
const addPetButton = document.getElementById("add-pet-btn");
const loginErrorMsg = document.getElementById("login-error-msg");

addPetButton.addEventListener("click", (e) => {
    const petName = petForm.petName.value;
    const ownerName = petForm.ownerName.value;
    const phoneNumber = petForm.phoneNumber.value;
    const breed = petForm.breed.value;
    const email = petForm.email.value;
    const checkIn = Date.now();
    const checkOut = new Date(petForm.checkOut.value).getTime();
    const notes = petForm.notes.value;
    var type;
    var ele = document.getElementsByName('type');            
    for(var i = 0; i < ele.length; i++) {
        if(ele[i].checked)
            type = ele[i].value;
    }

    if(petName === "") {
        document.getElementById("error1").style.display = "flex";
    } else {
        document.getElementById("error1").style.display = "none";
    }
    if(ownerName === "") {
        document.getElementById("error2").style.display = "flex";
    }else {
        document.getElementById("error2").style.display = "none";
    }
    if(phoneNumber === "") {
        document.getElementById("error3").style.display = "flex";
    }else {
        document.getElementById("error3").style.display = "none";
    }
    if(breed === "") {
        document.getElementById("error4").style.display = "flex";
    }else {
        document.getElementById("error4").style.display = "none";
    }
    if(email === "") {
        document.getElementById("error5").style.display = "flex";
    }else {
        document.getElementById("error5").style.display = "none";
    }
    if(petForm.checkOut.value === "") {
        document.getElementById("error6").style.display = "flex";
    }else {
        document.getElementById("error6").style.display = "none";
    }
    if(type === undefined) {
        document.getElementById("error0").style.display = "flex";
    }else {
        document.getElementById("error0").style.display = "none";
    }

    if (petName !== "" && ownerName !== "" && phoneNumber !== "" && breed !== "" && email !== ""  && petForm.checkOut.value !== "" && type !== undefined) { //notes can be empty
        if ((checkIn >= checkOut))
        {
            // error detected
            loginErrorMsg.style.opacity = 1;
            loginErrorMsg.textContent="Check-out date needs to be after check-in date"
            return;
        }
        // no errors detected 
        loginErrorMsg.style.opacity = 0;

        const xhr = new XMLHttpRequest()
        xhr.open('POST', 'http://localhost:3000/api/pets')
        const stObj = new PetDetails(petName, ownerName, phoneNumber, breed, email, checkIn, checkOut, notes, type)

        // Set the Content-Type 
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.responseType = 'json'
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.response)
            }
        }
        // JSON encoding 
        const jsonStr = JSON.stringify(stObj)
        xhr.send(jsonStr)
        location.reload();
        window.location.replace('homeScreen.html');
    } else {
        // error detected
        loginErrorMsg.style.opacity = 1;
        loginErrorMsg.textContent="Empty field(s) detected";
    }

})