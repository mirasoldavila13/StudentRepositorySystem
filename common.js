// Common.js - Utility functions for handling local storage, courses, and students

function initializeLocalStorage() {
    if (!localStorage.getItem('courses')) {
        localStorage.setItem('courses', JSON.stringify([
            { id: 1, name: 'Math 101', studentCount: 4 },
            { id: 2, name: 'Science 102', studentCount: 4 },
            { id: 3, name: 'History 105', studentCount: 5 },
            { id: 4, name: 'Exploring Computer Science', studentCount: 6 },
            { id: 5, name: 'Physics 201', studentCount: 3 },
            { id: 6, name: 'Chemistry 202', studentCount: 3 },
            { id: 7, name: 'Literature 101', studentCount: 2 }
        ]));
    }

    if (!localStorage.getItem('students')) {
        localStorage.setItem('students', JSON.stringify([
            { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', courseIds: [1, 3, 4] },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321', courseIds: [1, 2, 3, 4] },
            { id: 3, name: 'Count Dracula', email: 'theoneandonly@dracula.com', phone: '000-000-0000', courseIds: [3, 4, 5] },
            { id: 4, name: 'Abominable Snowman', email: 'thesnoman@snow.com', phone: '678-999-8212', courseIds: [4, 6] },
            { id: 5, name: 'Peter Parker', email: 'peter.parker@marvel.com', phone: '555-1234', courseIds: [1, 2, 7] },
            { id: 6, name: 'Hermione Granger', email: 'hermione@hogwarts.edu', phone: '555-5678', courseIds: [3, 4, 5, 7] },
            { id: 7, name: 'Tony Stark', email: 'tony.stark@starkindustries.com', phone: '555-9999', courseIds: [2, 4, 5] },
            { id: 8, name: 'Bruce Wayne', email: 'bruce.wayne@wayneenterprises.com', phone: '555-4321', courseIds: [1, 3, 6] },
            { id: 9, name: 'Lara Croft', email: 'lara.croft@adventures.com', phone: '555-8765', courseIds: [3, 4, 6] },
            { id: 10, name: 'Clark Kent', email: 'clark.kent@dailyplanet.com', phone: '555-8888', courseIds: [1, 2, 5, 7] },
            { id: 11, name: 'Diana Prince', email: 'diana.prince@themyscira.com', phone: '555-7777', courseIds: [3, 4, 6] },
            { id: 12, name: 'Natasha Romanoff', email: 'natasha.romanoff@shield.com', phone: '555-6666', courseIds: [2, 5, 6] },
            { id: 13, name: 'Steve Rogers', email: 'steve.rogers@avengers.com', phone: '555-5555', courseIds: [1, 3, 6] },
            { id: 14, name: 'Wanda Maximoff', email: 'wanda.maximoff@avengers.com', phone: '555-4444', courseIds: [4, 5, 7] }
        ]));
    }

    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([
            {
                username: 'defaultUser',
                firstName: 'Default',
                lastName: 'User',
                phoneNumber: '555-555-5555',
                school: 'Default School',
                email: 'default@example.com'
            }
        ]));
    }

    if (!localStorage.getItem('teacherName')) {
        localStorage.setItem('teacherName', 'Professor Inferno');
    }
}

// Function to display all courses in a specific table body
function displayAllCourses(tableBodyId) {
    const courses = getCourses();
    const courseTableBody = document.getElementById(tableBodyId);
    if (!courseTableBody) {
        console.error(`displayAllCourses: Table body element not found for ID: ${tableBodyId}`);
        return;
    }
    courseTableBody.innerHTML = ''; // Clear existing content

    courses.forEach(course => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${course.id}</td>
            <td>${course.name}</td>
            <td>${course.studentCount}</td>
            <td>
                <button onclick="editCourse(${course.id}, '${tableBodyId}')">Edit</button>
                <button onclick="deleteCourse(${course.id}, '${tableBodyId}')">Delete</button>
            </td>
        `;
        courseTableBody.appendChild(row);
    });
}

// Fetch users from local storage with error handling
function getUsers() {
    try {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

// Save users to local storage with error handling
function saveUsers(users) {
    try {
        localStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
        console.error('Error saving users:', error);
    }
}
// Fetch courses from local storage with error handling
function getCourses() {
    try {
        const courses = localStorage.getItem('courses');
        return courses ? JSON.parse(courses) : [];
    } catch (error) {
        console.error('Error fetching courses:', error);
        return [];
    }
}

// Fetch students from local storage with error handling
function getStudents() {
    try {
        const students = localStorage.getItem('students');
        return students ? JSON.parse(students) : [];
    } catch (error) {
        console.error('Error fetching students:', error);
        return [];
    }
}

// Save students to local storage with error handling
function saveStudents(students) {
    try {
        localStorage.setItem('students', JSON.stringify(students));
    } catch (error) {
        console.error('Error saving students:', error);
    }
}

// Save courses to local storage with error handling
function saveCourses(courses) {
    try {
        localStorage.setItem('courses', JSON.stringify(courses));
    } catch (error) {
        console.error('Error saving courses:', error);
    }
}

// Student Functions
function addStudent(student) {
    const students = getStudents();
    student.courseCount = student.courseIds.length;
    students.push(student);
    saveStudents(students);
}

function editStudent(studentId, displayFunction) {
    const students = getStudents();
    const student = students.find(student => student.id === studentId);

    if (!student) {
        console.error(`Student with ID: ${studentId} not found.`);
        return;
    }

    const newName = prompt('Enter new name:', student.name);
    const newEmail = prompt('Enter new email:', student.email);
    const newPhone = prompt('Enter new phone:', student.phone);
    const newCourseIds = prompt('Enter new Course IDS:', student.courseIds.join(', ')).split(',').map(id => parseInt(id.trim(), 10));

    if (newName && newEmail && newPhone && newCourseIds) {
        student.name = newName;
        student.email = newEmail;
        student.phone = newPhone;
        student.courseIds = newCourseIds;
         // Ensure courseCount is set correctl
        student.courseCount = newCourseIds.length;
        saveStudents(students);
        // Refresh the student list using the provided display function
        if (displayFunction){
            displayFunction();  
        } 
    }
}


function updateStudent(updatedStudent, displayFunction) {
    let students = getStudents();
    const index = students.findIndex(s => s.id === updatedStudent.id);
    if (index !== -1) {
        // Check course changes for updating course student counts
        const oldCourseIds = students[index].courseIds;
        const newCourseIds = updatedStudent.courseIds;

        // Update course student counts based on the changes
        updateCourseCounts(oldCourseIds, newCourseIds);

        students[index] = updatedStudent;
        tudents[index].courseCount = newCourseIds.length; 
        saveStudents(students);
        if (displayFunction){
            displayFunction();  
        }   
    }
}

function deleteStudent(studentId, displayFunction) {
    let students = getStudents();
    students = students.filter(s => s.id !== studentId);
    saveStudents(students);
    // Adjust course counts
    updateCourseCountsOnStudentDeletion(studentId);
    if (displayFunction){
        displayFunction();  
    }   
}

// Course Functions
function editCourse(courseId, tableBodyId) {
    const courses = getCourses();
    const course = courses.find(course => course.id === courseId);

    if (!course) {
        console.error(`Course with ID: ${courseId} not found.`);
        return;
    }

    const newName = prompt('Enter new course name:', course.name);
    if (newName !== null && newName.trim() !== "" && !courseNameExists(courses, newName.trim(), courseId)) {
        course.name = newName.trim();
        saveCourses(courses); // Save the modified courses array back to local storage
        displayAllCourses(tableBodyId); // Refresh the display to show updated course information
    } else if (courseNameExists(courses, newName.trim(), courseId)) {
        alert("Another course with this name already exists. Please choose a different name.");
    }
}

function deleteCourse(courseId, tableBodyId) {
    let courses = getCourses(); // Fetch all courses from local storage

    // Find the specific course to check the student count
    const course = courses.find(c => c.id === courseId);
    if (!course) {
        alert('Course not found.');
        return;
    }

    // Check if the course has fewer than 3 students enrolled
    if (course.studentCount >= 3) {
        alert('Cannot delete this course because it has 3 or more students enrolled.');
        return;
    }

    // Proceed to delete the course if it has less than 3 students
    courses = courses.filter(c => c.id !== courseId);
    saveCourses(courses); // Save the updated list back to local storage
    displayAllCourses(tableBodyId); // Refresh the course list display

    alert('Course deleted successfully.');
}

function handleLogout() {
    const users = localStorage.getItem('userData');
    localStorage.clear();
    localStorage.setItem('userData', users);
    window.location.href = 'index.html';
}

function updateCourseCounts(oldCourseIds, newCourseIds) {
    const allCourses = getCourses();

    // Decrease count for old courses not in new courses
    oldCourseIds.forEach(id => {
        if (!newCourseIds.includes(id)) {
            const course = allCourses.find(c => c.id === id);
            if (course) {
                course.studentCount = Math.max(0, course.studentCount - 1);
            }
        }
    });

    // Increase count for new courses not in old courses
    newCourseIds.forEach(id => {
        if (!oldCourseIds.includes(id)) {
            const course = allCourses.find(c => c.id === id);
            if (course) {
                course.studentCount += 1;
            }
        }
    });

    saveCourses(allCourses);
}

function updateCourseCountInStudents(courseId, increase) {
    const allCourses = getCourses();
    const course = allCourses.find(c => c.id === courseId);
    if (course) {
        if (increase) {
            course.studentCount += 1;
        } else {
            course.studentCount = Math.max(0, course.studentCount - 1);
        }
        saveCourses(allCourses);
    }
}

function updateCourseCountsOnStudentDeletion(studentId) {
    const students = getStudents();
    const student = students.find(s => s.id === studentId);
    if (student) {
        updateCourseCounts(student.courseIds, []);
    }
}

function courseNameExists(courses, newName, courseId) {
    return courses.some(c => c.name.toLowerCase() === newName.toLowerCase() && c.id !== courseId);
}
