// Initialize local storage with default courses and students
function initializeLocalStorage() {
    if (!localStorage.getItem('courses')) {
        localStorage.setItem('courses', JSON.stringify([
            { id: 1, name: 'Math 101', studentCount: 2 },
            { id: 2, name: 'Science 102', studentCount: 1 },
            { id: 3, name: 'History 105', studentCount: 3 },
            { id: 4, name: 'Exploring Computer Science', studentCount: 4 }
        ]));
    }

    if (!localStorage.getItem('students')) {
        const students = [
            { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', courseIds: [1, 3, 4] },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321', courseIds: [1, 2, 3, 4] },
            { id: 3, name: 'Count Dracula', email: 'theoneandonly@dracula.com', phone: '000-000-0000', courseIds: [3, 4] },
            { id: 4, name: 'Abominable Snowman', email: 'thesnoman@snow.com', phone: '678-999-8212', courseIds: [4] }
        ];

        students.forEach(student => {
            student.courseNumber = student.courseIds.length; // Calculate and store the number of courses
        });

        localStorage.setItem('students', JSON.stringify(students));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializeLocalStorage();
    studentTable();
    attachEventListeners();
});

function attachEventListeners() {
    const studentForm = document.getElementById('add-student');
    if (studentForm) {
        studentForm.addEventListener('submit', addStudent);
    }
}

function addStudent(event) {
    event.preventDefault();
    const name = document.querySelector('#student-name').value;
    const email = document.querySelector('#student-email').value;
    const phone = document.querySelector('#student-phone').value;
    const courseIds = document.querySelector('#student-course-ids').value.split(',').map(Number);
    const courseNumber = courseIds.length; // Ensure this value is calculated before it's used

    if (name && email && phone && courseIds.length > 0) {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        const id = students.length > 0 ? students[students.length - 1].id + 1 : 1;
        students.push({ id, name, email, phone, courseIds, courseNumber });
        localStorage.setItem('students', JSON.stringify(students));
        window.location.href = 'student.html'; // Redirect to the dashboard page
    } else {
        alert('Please fill out all fields.');
    }
}

function studentTable() {
    const studentTableBody = document.getElementById('student-table');
    if (studentTableBody) {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.phone}</td>
                <td>${student.courseNumber}</td>
                <td>
                    <button onclick="updateStudent(event, this.closest('tr'))">Update</button>
                    <button onclick="deleteStudent(${student.id})">Delete</button>
                </td>`;
            studentTableBody.appendChild(row);
        });
    }
}

function updateStudent(event, row) {
    event.stopPropagation();
    const updateButton = event.target;
    const cells = row.querySelectorAll('td');
    const isEditable = cells[0].contentEditable === 'true';

    if (isEditable) {
        const updatedStudent = {
            id: parseInt(cells[0].textContent),
            name: cells[1].textContent,
            email: cells[2].textContent,
            phone: cells[3].textContent,
            courseNumber: parseInt(cells[4].textContent)
        };

        const students = JSON.parse(localStorage.getItem('students')) || [];
        const studentIndex = students.findIndex(student => student.id === updatedStudent.id);

        if (studentIndex > -1) {
            students[studentIndex] = updatedStudent;
            localStorage.setItem('students', JSON.stringify(students));
        }

        cells.forEach(cell => cell.contentEditable = 'false');
        updateButton.textContent = 'Update';
    } else {
        cells.forEach(cell => cell.contentEditable = 'true');
        updateButton.textContent = 'Save';
    }
}

function deleteStudent(id) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const updatedStudents = students.filter(student => student.id !== id);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    window.location.reload();
}
