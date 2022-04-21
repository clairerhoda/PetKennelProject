
import {EmployeeDetails} from '/kennel.js'

const employeeForm = document.getElementById("login-box");
const addEmployeeButton = document.getElementById("login-btn");
const loginErrorMsg = document.getElementById("login-error-msg");

addEmployeeButton.addEventListener("click", (e) => {
    e.preventDefault();
    const employeeID = employeeForm.employeeID.value;
    const password = employeeForm.password.value;
    if (employeeID !== "" && password !== "" ) {
        // no errors detected 
        loginErrorMsg.style.opacity = 0;
        if (employeeID.length === 10 && /^\d+$/.test(employeeID)) {
            if (password.length >= 7) {
                loginErrorMsg.style.opacity = 0;
                const xhr = new XMLHttpRequest()
                xhr.open('POST', 'http://localhost:3000/api/employees')
                const stObj = new EmployeeDetails(employeeID, password)
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
                loginErrorMsg.style.opacity = 1;
                loginErrorMsg.textContent="Password must be 7 or more characters";
            }
        } else {
            loginErrorMsg.style.opacity = 1;
            loginErrorMsg.textContent="Employee ID must be 10 digits";
        }

    } else {
        // error detected
        loginErrorMsg.style.opacity = 1;
        loginErrorMsg.textContent="Empty field detected";
    }

})