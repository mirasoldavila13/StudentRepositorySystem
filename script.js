//Create a variable that selects the form element which name for the signup page
const singupformEl = document.querySelector("#clssignup");
const loginFormE1 = document.querySelector("#login");

//function to read user data from local storage
let readLocalStorageUser = function(){
    let userData = JSON.parse(localStorage.getItem('userData'));
    if(!userData){
        return [];
    }
    return userData;
};

//function to store user data in local storage
let storeLocalStorageUser = function(user){
    let userData = readLocalStorageUser();
    userData.push(user);
    localStorage.setItem('userData', JSON.stringify(userData));
    console.log('data stored: ', userData);
};

// function to validate if a username already exists during singup
function validateUser(user) {
    let userData = readLocalStorageUser();
    for (let i = 0; i < userData.length; i++) {
        if (userData[i].username === user) {
            const errorEl = document.querySelector('#error');
            if (errorEl) {
                errorEl.textContent = 'Username already exists, please choose a different username';
            }
            return false;
        }
    }
    return true;
}

// Create a function that handles the form signup submission. Grab the form data and store it in local storage, then redirect to the landing page using the `redirectPage` function. If the form is submitted with missing or invalid or existing user data, display an error message to the user.
function handleResponse(event) {
    event.preventDefault();
    console.log('Form submitted'); // Check if this log appears in the console

    const userName = document.querySelector("#username").value.trim();
    const pwd = document.querySelector("#pwd").value.trim();
    const confirmpwd = document.querySelector("#confirmpwd").value.trim();
    const errorEl = document.querySelector('#error');

    if (errorEl) {
        if (pwd !== confirmpwd) {
            errorEl.textContent = 'Passwords do not match';
        } else if (userName && pwd && confirmpwd) {
            if (validateUser(userName)) {
                let user = { 
                    username: userName,
                    pwd: pwd
                };
                storeLocalStorageUser(user);
                console.log('User stored in local storage'); // Check if this log appears in the console
                errorEl.style.color = 'green';
                errorEl.textContent = 'Signup successful!';
               setTimeout(() => {
                window.location.href = 'dashboard.html';
               }, 2000);
            }
        } else {
            errorEl.textContent = 'All fields are required';
        }
    } else {
        console.error("Error element not found");
    }
}

//function to validate login credentials
function validateLogin(userName, pwd){
    let userData = readLocalStorageUser();
    for(let i = 0; i < userData.length; i++){
        if(userData[i].username === userName && userData[i].pwd === pwd){
            return true;
        }
    }
    return false;
}

//function to handle login form submission
function handleLoginResponse(event) {
    event.preventDefault();
    
    const userName = document.querySelector("#username").value.trim();
    const pwd = document.querySelector("#password").value.trim();
    const errorEl = document.querySelector("#login-error");

    if (errorEl) {
        if (validateLogin(userName, pwd)) {
            errorEl.style.color = 'green';
            errorEl.textContent = 'Login sucessful!';
            setTimeout(() => {
            // Redirect to dashboard.html after successful login
            window.location.href = 'dashboard.html';
            },2000);
        } else {
            errorEl.textContent = 'Invalid username or password';
        }
    } 
    else {
        console.error("Login error element not found.");
    }
}


//add event listeners to the form if they exist
if(singupformEl){
    singupformEl.addEventListener("submit",handleResponse);
}

if(loginFormE1){
    loginFormE1.addEventListener("submit", handleLoginResponse);
}