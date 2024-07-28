// Common.js - Utility functions for handling local storage, courses, students and modal interactions

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

// Function to add a new student to local storage
function addStudent(student) {
    const students = getStudents();
    student.courseCount = student.courseIds.length;
    students.push(student);
    saveStudents(students);
}

// Other functions...

function displayAllCourses(tableBodyId) {
    const courses = getCourses();
    const courseTableBody = document.getElementById(tableBodyId);
    if (!courseTableBody) {
        console.error(`displayAllCourses: Table body element not found for ID: ${tableBodyId}`);
        return;
    }
    courseTableBody.innerHTML = ''; 

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

// Function to display all students in a specific table body
function displayAllStudents(tableBodyId) {
    const students = getStudents();
    const studentTableBody = document.getElementById(tableBodyId);
    if (!studentTableBody) {
        console.error(`displayAllStudents: Table body element not found for ID: ${tableBodyId}`);
        return;
    }
    studentTableBody.innerHTML = ''; 

    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.courseIds.length}</td>
            <td>
                <button onclick="editStudent(${student.id}, displayAllStudents.bind(null, '${tableBodyId}'))">Edit</button>
                <button onclick="deleteStudent(${student.id}, displayAllStudents.bind(null, '${tableBodyId}'))">Delete</button>
            </td>
        `;
        studentTableBody.appendChild(row);
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

// Reusable function to show modal prompts
function showModal(title, message, isPrompt = false, callback = null) {
    const modal = document.getElementById('modal');
    const modalTitle = modal.querySelector('#modal-title');
    const modalContent = modal.querySelector('#modal-content');
    const modalInputContainer = modal.querySelector('#modal-input-container');
    const modalInput = modal.querySelector('#modal-input');
    const modalOk = modal.querySelector('#modal-ok');
    const modalCancel = modal.querySelector('#modal-cancel');

    modalTitle.textContent = title;
    modalContent.textContent = message;
    modalInputContainer.classList.toggle('hidden', !isPrompt);

    if (isPrompt) {
        modalInput.value = '';
        modalCancel.classList.remove('hidden');
    } else {
        modalCancel.classList.add('hidden');
    }

    modalOk.onclick = function () {
        modal.classList.add('hidden');
        if (callback) {
            callback(isPrompt ? modalInput.value : null);
        }
    };

    modalCancel.onclick = function () {
        modal.classList.add('hidden');
    };

    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}

// Function to edit course
function editCourse(courseId, tableBodyId) {
    const courses = getCourses();
    const course = courses.find(course => course.id === courseId);

    if (!course) {
        showModal('Error', `Course with ID: ${courseId} not found.`);
        return;
    }

    showModal('Edit Course', 'Enter new course name:', true, function (newName) {
        if (newName && newName.trim() !== "" && !courseNameExists(courses, newName.trim(), courseId)) {
            course.name = newName.trim();
            saveCourses(courses);
            displayAllCourses(tableBodyId);
        } else if (courseNameExists(courses, newName.trim(), courseId)) {
            showModal('Error', "Another course with this name already exists. Please choose a different name.");
        }
    });
}

// Function to delete course
function deleteCourse(courseId, tableBodyId) {
    let courses = getCourses();
    const course = courses.find(c => c.id === courseId);

    if (!course) {
        showModal('Error', 'Course not found.');
        return;
    }

    if (course.studentCount >= 3) {
        showModal('Error', 'Cannot delete this course because it has 3 or more students enrolled.');
        return;
    }

    courses = courses.filter(c => c.id !== courseId);
    saveCourses(courses);
    displayAllCourses(tableBodyId);
    showModal('Success', 'Course deleted successfully.');
}

// Function to edit student
function editStudent(studentId, displayFunction) {
    const students = getStudents();
    const student = students.find(student => student.id === studentId);

    if (!student) {
        showModal('Error', `Student with ID: ${studentId} not found.`);
        return;
    }

    const fields = [
        { label: 'Name', value: 'name' },
        { label: 'Email', value: 'email' },
        { label: 'Phone', value: 'phone' },
        { label: 'Courses', value: 'courses' }
    ];

    showSelectionModal('Edit Student', fields, function (selectedFields) {
        selectedFields.forEach(field => {
            switch (field) {
                case 'name':
                    showEditFieldModal('Edit Student', 'Enter new name:', function (newName) {
                        if (newName) student.name = newName;
                    });
                    break;
                case 'email':
                    showEditFieldModal('Edit Student', 'Enter new email:', function (newEmail) {
                        if (newEmail) student.email = newEmail;
                    });
                    break;
                case 'phone':
                    showEditFieldModal('Edit Student', 'Enter new phone:', function (newPhone) {
                        if (newPhone) student.phone = newPhone;
                    });
                    break;
                case 'courses':
                    showEditFieldModal('Edit Student', 'Enter new Course IDS (comma separated):', function (newCourseIds) {
                        if (newCourseIds) {
                            student.courseIds = newCourseIds.split(',').map(id => parseInt(id.trim(), 10));
                            student.courseCount = student.courseIds.length;
                        }
                    });
                    break;
            }
        });

        saveStudents(students);
        displayFunction();
    });
}
// Function to delete student
function deleteStudent(studentId, displayFunction) {
    let students = getStudents();
    students = students.filter(s => s.id !== studentId);
    saveStudents(students);
    updateCourseCountsOnStudentDeletion(studentId);
    if (typeof displayFunction === 'function') {
        displayFunction();
    }
    showModal('Success', 'Student deleted successfully.');
}

function courseNameExists(courses, newName, courseId) {
    return courses.some(c => c.name.toLowerCase() === newName.toLowerCase() && c.id !== courseId);
}

// Update course counts when a student is deleted
function updateCourseCountsOnStudentDeletion(studentId) {
    const students = getStudents();
    const student = students.find(s => s.id === studentId);
    if (student) {
        updateCourseCounts(student.courseIds, []);
    }
}

// Update course counts based on changes in student enrollments
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

// Modal for selection
function showSelectionModal(title, options, callback) {
    const modal = document.getElementById('modal');
    const modalTitle = modal.querySelector('#modal-title');
    const modalContent = modal.querySelector('#modal-content');
    const modalInputContainer = modal.querySelector('#modal-input-container');
    const modalOk = modal.querySelector('#modal-ok');
    const modalCancel = modal.querySelector('#modal-cancel');

    modalTitle.textContent = title;
    modalContent.innerHTML = options.map(option => `
        <label>
            <input type="checkbox" value="${option.value}" class="option-checkbox"> ${option.label}
        </label>
    `).join('<br>');

    modalInputContainer.classList.add('hidden');
    modalOk.textContent = 'Submit';
    modalCancel.classList.remove('hidden');

    modalOk.onclick = function () {
        const selectedOptions = Array.from(modal.querySelectorAll('.option-checkbox:checked')).map(cb => ({
            label: cb.parentElement.textContent.trim(),
            value: cb.value
        }));
        modal.classList.add('hidden');
        if (callback) {
            callback(selectedOptions);
        }
    };

    modalCancel.onclick = function () {
        modal.classList.add('hidden');
    };

    modal.classList.remove('hidden');
}

// Modal for editing individual fields
function showEditFieldModal(title, promptText, callback) {
    const modal = document.getElementById('modal');
    const modalTitle = modal.querySelector('#modal-title');
    const modalContent = modal.querySelector('#modal-content');
    const modalInputContainer = modal.querySelector('#modal-input-container');
    const modalInput = modal.querySelector('#modal-input');
    const modalOk = modal.querySelector('#modal-ok');
    const modalCancel = modal.querySelector('#modal-cancel');

    modalTitle.textContent = title;
    modalContent.textContent = promptText;
    modalInputContainer.classList.remove('hidden');
    modalInput.value = ''; // Clear previous input

    modalOk.onclick = function () {
        const inputValue = modalInput.value;
        modal.classList.add('hidden');
        if (callback) {
            callback(inputValue);
        }
    };

    modalCancel.onclick = function () {
        modal.classList.add('hidden');
    };

    modal.classList.remove('hidden');
}

// Function to handle logout
function handleLogout() {
    const users = localStorage.getItem('users');
    localStorage.clear();
    if (users) {
        localStorage.setItem('users', users);
    }
    window.location.href = 'index.html';
}
