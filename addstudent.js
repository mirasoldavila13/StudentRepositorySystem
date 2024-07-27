document.getElementById('add-student-form').addEventListener('submit', function(event){
    event.preventDefault();
    addNewStudent();
});

//Function to add a new student to local storage
function addNewStudent() {
    const name = document.getElementById('student-name').value;
    const email = document.getElementById('student-email').value;
    const phone = document.getElementById('student-phone').value;
    const courseIds = document.getElementById('course-ids').value.split(',').map(id => parseInt(id.trim(), 10));

    const students = getStudents();
    const newStudentId = students.length > 0 ? students[students.length - 1].id + 1 : 1;
    const newStudent ={
        id: newStudentId,
        name,
        email,
        phone,
        courseIds,
        courseCount: courseIds.length
    };

    addStudent(newStudent);
    window.location.href = 'student.html';

}