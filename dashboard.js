// Initialize local storage with default courses and students
function initializeLocalStorage() {
    if (!localStorage.getItem('courses')) {
        localStorage.setItem('courses', JSON.stringify([
            { id: 1, name: 'Math 101', studentCount: 2 },
            { id: 2, name: 'Science 102', studentCount: 1 },
            { id: 3, name: 'History 105', studentCount: 3 },
            { id: 4, name: 'Exploring Computer Science', studentCount: 4 }
        ]));
        console.log('Default courses initialized');
    }

    if (!localStorage.getItem('students')) {
        localStorage.setItem('students', JSON.stringify([
            { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', courseIds: [1, 3, 4] },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321', courseIds: [1, 2, 3, 4] },
            { id: 3, name: 'Count Dracula', email: 'theoneandonly@dracula.com', phone: '000-000-0000', courseIds: [3, 4] },
            { id: 4, name: 'Abominable Snowman', email: 'thesnoman@snow.com', phone: '678-999-8212', courseIds: [4] }
        ]));
        console.log('Default students initialized');
    }
}

// Function to display courses
function displayCourses(courseList) {
    console.log('Displaying Courses: ', courseList); // Debugging log
    const tableBody = document.getElementById('course-table-body');
    tableBody.innerHTML = ''; // Clear existing rows
    courseList.forEach(course => {
        let row = `
            <tr>
                <td>${course.id}</td>
                <td>${course.name}</td>
                <td>${course.studentCount}</td>
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
    console.log('Displaying Students: ', studentList); // Debugging log
    const tableBody = document.getElementById('student-table-body');
    tableBody.innerHTML = ''; // Clear existing rows
    studentList.forEach(student => {
        let row = `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.courseIds.length}</td>
                <td>
                    <button onclick="editStudent(${student.id})">Update</button>
                    <button onclick="deleteStudent(${student.id})">Delete</button>
                </td>
            </tr>`;
        tableBody.innerHTML += row;
    });
}
//search courses
function searchCourses(keyword) {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const filteredCourses = courses.filter(course =>
        course.name.toLowerCase().includes(keyword.toLowerCase()) ||
        course.id.toString() === keyword
    );
    displayCourses(filteredCourses);
}

//search students
function searchStudents(keyword) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(keyword.toLowerCase()) ||
        student.id.toString() === keyword
    );
    displayStudents(filteredStudents);
}

//add a course
function addCourse(course) {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    courses.push(course);
    localStorage.setItem('courses', JSON.stringify(courses));
    displayCourses(courses);
}

//add a student
function addStudent(student) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents(students);

    // Update course student count
    student.courseIds.forEach(courseId => {
        updateCourseStudentCount(courseId, 1);
    });
}

function editCourse(courseId) {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const course = courses.find(course => course.id === courseId);
    if (course) {
        const newName = prompt('Enter new course name:', course.name);
        if (newName) {
            updateCourse({ ...course, name: newName });
        }
    }
}

function editStudent(studentId) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const student = students.find(student => student.id === studentId);
    if (student) {
        const newName = prompt('Enter new student name:', student.name);
        if (newName) {
            updateStudent({ ...student, name: newName });
        }
    }
}

//update a course
function updateCourse(updatedCourse) {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const index = courses.findIndex(course => course.id === updatedCourse.id);
    if (index !== -1) {
        courses[index] = updatedCourse;
        localStorage.setItem('courses', JSON.stringify(courses));
        displayCourses(courses);
    }
}

//update a student
function updateStudent(updatedStudent) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const index = students.findIndex(student => student.id === updatedStudent.id);
    if (index !== -1) {
        // Update course student count
        const oldCourses = students[index].courseIds;
        const newCourses = updatedStudent.courseIds;

        // Remove student from old courses
        oldCourses.forEach(courseId => {
            if (!newCourses.includes(courseId)) {
                updateCourseStudentCount(courseId, -1);
            }
        });

        // Add student to new courses
        newCourses.forEach(courseId => {
            if (!oldCourses.includes(courseId)) {
                updateCourseStudentCount(courseId, 1);
            }
        });

        students[index] = updatedStudent;
        localStorage.setItem('students', JSON.stringify(students));
        displayStudents(students);
    }
}

//delete course
function deleteCourse(courseId) {
    let courses = JSON.parse(localStorage.getItem('courses')) || [];
    courses = courses.filter(course => course.id !== courseId);
    localStorage.setItem('courses', JSON.stringify(courses));
    displayCourses(courses);
}


//delete student
function deleteStudent(studentId) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    const student = students.find(student => student.id === studentId);
    if (student) {
        // Update course student count
        student.courseIds.forEach(courseId => {
            updateCourseStudentCount(courseId, -1);
        });
        students = students.filter(student => student.id !== studentId);
        localStorage.setItem('students', JSON.stringify(students));
        displayStudents(students);
    }
}

//update the student count for a course
function updateCourseStudentCount(courseId, change) {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const index = courses.findIndex(course => course.id === courseId);
    if (index !== -1) {
        courses[index].studentCount += change;
        localStorage.setItem('courses', JSON.stringify(courses));
        displayCourses(courses);
    }
}

//teacher's name
function setTeacherName(name) {
    const teacherNameElement = document.getElementById('teacherName');
    if (teacherNameElement) {
        teacherNameElement.textContent = name;
    } else {
        console.error("Teacher name element not found.");
    }
}

// Function to display all students after clicking reset
function displayAllStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    displayStudents(students);
}

// Function to display all courses after clicking reset
function displayAllCourses() {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    displayCourses(courses);
}


document.addEventListener('DOMContentLoaded', function () {
    initializeLocalStorage(); // Ensure local storage is initialized
    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('userData')) || [];
    // Find the teacher from the users list
    const teacher = users.find(user => user.role === 'teacher') || { username: 'Default Teacher' };
    
    // console.log('Students:', students);
    // console.log('Courses:', courses);

    // Retrieve and display data
    displayAllStudents();
    displayAllCourses();
    setTeacherName(teacher.username);


    document.getElementById('search-course').addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('Course search form submitted');
        const keyword = document.getElementById('search-course-input').value;
        searchCourses(keyword);
    });

    // Event listener for student search form
    document.getElementById('student-search-form').addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('Student search form submitted');
        const keyword = document.getElementById('student-search-input').value;
        searchStudents(keyword);
    });

    // Event listener for course search reset button
    document.getElementById('reset-course-search').addEventListener('click', function() {
        console.log('Course search reset button clicked');
        document.getElementById('search-course-input').value = '';
        displayAllCourses();
    });

    // Event listener for student search reset button
    document.getElementById('reset-student-search').addEventListener('click', function() {
        console.log('Student search reset button clicked');
        document.getElementById('student-search-input').value = '';
        displayAllStudents();
    });


    // Event listener for logout
    document.getElementById('logout').addEventListener('click', function() {
        console.log('Logout button clicked');
        // Preserve users and clear other local storage data on logout
        const users = localStorage.getItem('userData');
        localStorage.clear();
        localStorage.setItem('userData', users);
        window.location.href = 'index.html';
    });
});