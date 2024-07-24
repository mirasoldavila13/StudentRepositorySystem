// script.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-student-form');
    const tableBody = document.getElementById('student-table-body');
    let studentId = 1; // Start ID counter

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Get form values
        const name = document.getElementById('student-name').value;
        const email = document.getElementById('student-email').value;
        const phone = document.getElementById('student-phone').value;

        // Create a new row
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${studentId++}</td>
            <td>${name}</td>
            <td>${email}</td>
            <td>${phone}</td>
            <td>
                <button onclick="editStudent(this)">Edit</button>
                <button onclick="deleteStudent(this)">Delete</button>
            </td>
        `;

        // Append the row to the table body
        tableBody.appendChild(row);

        // Clear the form fields
        form.reset();
    });
});

// Function to edit a student (not implemented yet)
function editStudent(button) {
    const row = button.closest('tr');
    // Implement edit functionality
}

// Function to delete a student
function deleteStudent(button) {
    const row = button.closest('tr');
    row.remove();
}
