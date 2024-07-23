//Create a variable that selects the form element
const formEl = document.querySelector("form");
// console.log(formEl)
//function to read user data
let readLocalStorageUser = function(){
    let userData = JSON.parse(localStorage.getItem('userData'));
    if(!userData){
        return [];
    }
    return userData;
};

//function to store user data
let storeLocalStorageUser = function(user){
    let userData = readLocalStorageUser();
    userData.push(user);
    localStorage.setItem('userData',JSON.stringify(userData));
};


function validateUser(user){
    let userData = readLocalStorageUser();
    for(let i = 0; i<userData.length; i++){
    if (userData[i].username === user){
     const errorEl = document.querySelector('#error');
     console.log(errorEl);
     errorEl.textContent ='User name already exist, please choose a different user name';
    }
}
};
// Create a function that handles the form signup submission. Grab the form data and store it in local storage, then redirect to the landing page using the `redirectPage` function. If the form is submitted with missing or invalid or existing user data, display an error message to the user.
function handleResponse(event){
    event.preventDefault();
    console.log(event);
    const userName = document.querySelector("#username").value.trim();
    const pwd = document.querySelector("#pwd").value.trim();
    const confirmpwd = document.querySelector("#confirmpwd").value.trim();
    if(pwd != confirmpwd){
        const errorEl = document.querySelector('#error');
        console.log(errorEl);
        errorEl.textContent ='Passwords doesnot match';
    }
    else if(userName && pwd && confirmpwd){
        event.preventDefault();
         validateUser(userName);
        let user = { 
            username: userName,
            pwd: pwd
        };
        storeLocalStorageUser(user);
        // redirectPage ('landingpage.html');
        
     };
};

// Add an event listener to the form on submit. Call the function to handle the form submission.
formEl.addEventListener("submit",handleResponse);