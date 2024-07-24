document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('add-student');
    
    if (studentForm) {
        studentForm.addEventListener('submit', addStudent);
    };

    studentTable();
});

//Function to add a new student to local storage
function addStudent(event) {
    event.preventDefault();

    const name = document.querySelector('#student-name').value;
    const email = document.querySelector('#student-email').value;
    const phone = document.querySelector('#student-phone').value;

    if (name && email && phone) {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        const id = students.length > 0 ? students[students.length - 1].id + 1 : 1; 
        students.push({ id, name, email, phone });
        localStorage.setItem('students', JSON.stringify(students));
        window.location.href = 'student.html'; //redirect to dashboard page
    } else {
        alert('Please fill out all fields');
    }
}

//Function to populate the student table in the student.html
function studentTable() {
    if (document.getElementById('student-table')) {
        const studentTableBody = document.getElementById('student-table');
        const students = JSON.parse(localStorage.getItem('students')) || [];

        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${student.id}</tb>
            <td>${student.name}</tb>
            <td>${student.email}</tb>
            <td>${student.phone}</tb>
            <td>
                <button onclick="updateStudent(${student.id})">Update</button>
                <button onclick="deleteStudent(${student.id})">Delete</button>
            </td>`;
            studentTableBody.appendChild(row);
        });
    }
}

