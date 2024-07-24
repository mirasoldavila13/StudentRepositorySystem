// Initialize local storage with default courses and students
function initializeLocalStorage() {
    if (!localStorage.getItem('courses')) {
        localStorage.setItem('courses', JSON.stringify([
            { id: 1, name: 'Math 101' },
            { id: 2, name: 'Science 102' }
        ]));
    }

    if (!localStorage.getItem('students')) {
        localStorage.setItem('students', JSON.stringify([
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Smith' }
        ]));
    }
}

// Function to display courses
function displayCourses(courseList) {
    const tableBody = document.getElementById('course-table-body');
    tableBody.innerHTML = ''; // Clear existing rows
    courseList.forEach(course => {
        let row = `<tr>
            <td>${course.id}</td>
            <td>${course.name}</td>
            <td>
                <button onclick="editCourse(${course.id})">Update</button>
                <button onclick="deleteCourse(${course.id})">Delete</button>
            </td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// display students
function displayStudents(studentList) {
    const tableBody = document.getElementById('student-table-body');
    tableBody.innerHTML = ''; // Clear existing rows
    studentList.forEach(student => {
        let row = `<tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>
                <button onclick="editStudent(${student.id})">Update</button>
                <button onclick="deleteStudent(${student.id})">Delete</button>
            </td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}


// Set the teacher's name
function setTeacherName(name) {
    document.getElementById('teacherName').textContent = name;
}

document.addEventListener('DOMContentLoaded', function () {
    initializeLocalStorage(); // Ensure local storage is initialized
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    // Display the student list
    displayStudents(students); 
    // Display the course list
    displayCourses(courses); 
    //hardcoded the teachers name
    setTeacherName('Jane Smith'); 
});