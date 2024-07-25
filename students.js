document.addEventListener('DOMContentLoaded', () => {
    studentTable();
});

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
            <td>${student.courseNumber}</tb>
            <td>
                <button onclick="updateStudent(event, this.closest('tr'))">Update</button>
                <button onclick="deleteStudent(${student.id})">Delete</button>
            </td>`;
            studentTableBody.appendChild(row);
        });
    }
}

//Function to delete student
function deleteStudent(id) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const updateStudent = students.filter(student => student.id !== id );
    localStorage.setItem('students', JSON.stringify(updateStudent));
    window.location.reload();
}

//Function to update students
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
            courseNumber: cells[4].textContent
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