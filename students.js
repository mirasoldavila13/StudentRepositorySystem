document.addEventListener('DOMContentLoaded', function () {
    initializeLocalStorage();
    displayAllStudents('studentTableBody');
    
    document.getElementById('modal-ok').addEventListener('click', () => {
        const modal = document.getElementById('modal');
        const isPrompt = !modal.querySelector('#modal-input-container').classList.contains('hidden');
        const inputValue = isPrompt ? document.getElementById('modal-input').value : null;

        modal.classList.add('hidden');

        if (modal.callback) {
            modal.callback(inputValue);
        }
    });

    document.getElementById('modal-cancel').addEventListener('click', () => {
        document.getElementById('modal').classList.add('hidden');
    });
});

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
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>${student.courseIds.length}</td>
            <td>${student.courseIds.join(', ')}</td>
            <td>
                <button onclick="editStudent(${student.id}, displayAllStudents.bind(null, '${tableBodyId}'))">Edit</button>
                <button onclick="deleteStudent(${student.id}, displayAllStudents.bind(null, '${tableBodyId}'))">Delete</button>
            </td>
        `;
        studentTableBody.appendChild(row);
    });
}
