document.addEventListener('DOMContentLoaded', function() {
    initializeLocalStorage(); // Ensure any needed initial setup from common.js is ready
    displayAllCourses('dashboardCourseTableBody');  // Display courses in the dashboard
    displayDashboardStudents();  // Display students in the dashboard
    displayTeacherName();  // Display the teacher's name

    // Attach event listeners for search forms
    document.getElementById('search-course').addEventListener('submit', function(event) {
        event.preventDefault();
        searchCourses();
    });

    document.getElementById('student-search-form').addEventListener('submit', function(event) {
        event.preventDefault();
        searchDashboardStudents();
    });

    // Reset buttons for clearing search results
    document.getElementById('reset-course-search').addEventListener('click', function() {
        document.getElementById('search-course-input').value = '';
        displayAllCourses('dashboardCourseTableBody');  // Ensure the correct ID is used here
    });

    document.getElementById('reset-student-search').addEventListener('click', function() {
        document.getElementById('student-search-input').value = '';
        displayDashboardStudents();
    });

    // Logout event listener
    document.getElementById('logout').addEventListener('click', function() {
        handleLogout();
    });
});

function displayTeacherName() {
    const teacherName = localStorage.getItem('teacherName');
    document.getElementById('teacherName').textContent = teacherName;
}


// Display all students in the dashboard student table
function displayDashboardStudents() {
    const students = getStudents();
    const studentTableBody = document.getElementById('student-table-body');
    studentTableBody.innerHTML = ''; // Clear existing content

    students.forEach(student => {
        const courseCount = student.courseIds.length;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${courseCount}</td>
            <td>
                <button onclick="editStudent(${student.id}, displayDashboardStudents)">Edit</button>
                <button onclick="deleteStudent(${student.id}, displayDashboardStudents)">Delete</button>
            </td>
        `;
        studentTableBody.appendChild(row);
    });
}

// Search courses based on input
function searchCourses() {
    const query = document.getElementById('search-course-input').value.toLowerCase();
    const courses = getCourses();

    const filteredCourses = courses.filter(course =>
        course.name.toLowerCase().includes(query) || course.id.toString().includes(query)
    );

    displayFilteredCourses(filteredCourses);
}

// Display filtered courses
function displayFilteredCourses(filteredCourses) {
    const courseTableBody = document.getElementById('dashboardCourseTableBody');
    courseTableBody.innerHTML = ''; // Clear existing content

    filteredCourses.forEach(course => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${course.id}</td>
            <td>${course.name}</td>
            <td>${course.studentCount}</td>
            <td>
                <button onclick="editCourse(${course.id}, 'dashboardCourseTableBody')">Edit</button>
                <button onclick="deleteCourse(${course.id}, 'dashboardCourseTableBody')">Delete</button>
            </td>
        `;
        courseTableBody.appendChild(row);
    });
}

// Search students based on input
function searchDashboardStudents() {
    const query = document.getElementById('student-search-input').value.toLowerCase();
    const students = getStudents();

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(query) || student.id.toString().includes(query)
    );

    displayFilteredDashboardStudents(filteredStudents);
}

// Display filtered students
function displayFilteredDashboardStudents(filteredStudents) {
    const studentTableBody = document.getElementById('student-table-body');
    studentTableBody.innerHTML = ''; // Clear existing content

    filteredStudents.forEach(student => {
        const courseCount = student.courseIds.length;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${courseCount}</td>
            <td>
                <button onclick="editStudent(${student.id}, displayDashboardStudents)">Edit</button>
                <button onclick="deleteStudent(${student.id}, displayDashboardStudents)">Delete</button>
            </td>
        `;
        studentTableBody.appendChild(row);
    });
}