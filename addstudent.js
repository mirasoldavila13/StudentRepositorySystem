document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('add-student');
    if (studentForm) {
        studentForm.addEventListener('submit', addStudent);
    };
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