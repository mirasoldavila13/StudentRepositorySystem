document.addEventListener('DOMContentLoaded', function() {
    initializeLocalStorage();
    displayStudents();
});

//Function to populate the student table in the student.html
function displayStudents() {
    const students = getStudents();
    const studentTableBody = document.getElementById('studentTableBody');
    if (!studentTableBody) {
        console.error('displayStudents: Table body element not found for ID: studentTableBody');
        return;
    }
    studentTableBody.innerHTML = ''; // Clear existing content

    students.forEach(student => {
        const courseList = student.courseIds.join(', ');
        const courseCount = student.courseCount || student.courseIds.length; // Ensure courseCount is set correctly
        console.log(`Student ID: ${student.id}, Course Count: ${courseCount}`); // Debugging statement
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>${courseCount}</td>
            <td>${courseList}</td>
            <td>
                <button onclick="editStudent(${student.id}, displayStudents)">Edit</button>
                <button onclick="deleteStudent(${student.id}, displayStudents)">Delete</button>
            </td>
        `;
        studentTableBody.appendChild(row);
    });
}

function searchStudents(query, displayFunction) {
    query = query.toLowerCase();
    const students = getStudents();
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(query) ||
        student.id.toString().includes(query) ||
        student.email.toLowerCase().includes(query) ||
        student.phone.includes(query)
    );
    displayFunction(filteredStudents);
}