//Create a variable that selects the form element
const formEl = document.querySelector("#formid");
const courseButton = document.querySelector("#courseButton");
console.log(courseButton);
// Function to read course from local storage
let readLocalStorageCourse = function(){
    let courseData = JSON.parse(localStorage.getItem('courses'));
    if(!courseData){
        return [];
    }
    return courseData;
};
//Function to store course data
function storeLocalStoragecourse(course){
    let courseData = readLocalStorageCourse();
    courseData.push(course);
    localStorage.setItem('courses',JSON.stringify(courseData));
};
// Create a function that handles the addition of newcourse. 
function handleAddCourse(event){
           debugger;
    event.preventDefault();
    console.log(event);
    const classId = document.querySelector("#classId").value.trim();
    const className = document.querySelector("#className").value.trim();
    const noofstudents = parseInt(document.querySelector("#AmountofStudents").value.trim());
    if(classId && className){
       let course = { 
            id: classId,
            name: className,
            studentCount:noofstudents
        };
        storeLocalStoragecourse(course);
    console.log("Course added successfully!");
    const messageEl = document.querySelector("p");
    messageEl.textContent = "Course added successfully!";
    document.querySelector("#classId").value = "";
    document.querySelector("#className").value = "";
    document.querySelector("#AmountofStudents").value = "";
        
     };
};

// Add an event listener to the form on submit. Call the function to handle the form submission.
formEl.addEventListener("submit",handleAddCourse);