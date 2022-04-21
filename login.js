
const loginForm = document.getElementById("login-box");
const loginButton = document.getElementById("login-btn");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const employeeID = loginForm.employeeID.value;
    const password = loginForm.password.value;
    console.log("what I entered", employeeID, password)
    if (employeeID !== "" && password !== "" ) {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', 'http://localhost:3000/api/employees')
        xhr.responseType = 'json'
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                for (const s of this.response) {
                    console.log(s.employeeID)
                    console.log(s.password)
                    if (s.employeeID === employeeID && s.password === password) {
                        loginErrorMsg.style.opacity = 0;
                        location.reload();
                        location.href='homeScreen.html';
                    } else {
                        loginErrorMsg.style.opacity = 1;
                        loginErrorMsg.textContent="Credentials added do not exist";
                    }
                }                
            } else {
                loginErrorMsg.style.opacity = 1;
                loginErrorMsg.textContent="EmployeeID or password is wrong";
            }
        }
        xhr.send()

        loginErrorMsg.style.opacity = 1;
        loginErrorMsg.textContent="EmployeeID or password is wrong";

    } else {
        // error detected
        loginErrorMsg.style.opacity = 1;
        loginErrorMsg.textContent="Empty field detected";
    }
})