document.getElementById('add-student-form').addEventListener('submit', function(event) {
    event.preventDefault();
    addNewStudent();
});

// Function to add a new student to local storage
function addNewStudent() {
    const name = document.getElementById('student-name').value;
    const email = document.getElementById('student-email').value;
    const phone = document.getElementById('student-phone').value;
    const courseIdsInput = document.getElementById('course-ids').value;
    const courseIds = courseIdsInput.split(',').map(id => parseInt(id.trim(), 10));
    const courses = getCourses();

    // Validate course IDs
    if (courseIds.length === 0 || courseIds.some(id => id <= 0)) {
        showModal('Validation Error', 'Students are required to be enrolled in at least one valid course.');
        return;
    }

    // Check for non-existent course IDs
    const invalidCourseIds = courseIds.filter(id => !courses.some(course => course.id === id));
    if (invalidCourseIds.length > 0) {
        const invalidCourses = invalidCourseIds.map(id => {
            const course = courses.find(course => course.id === id);
            return course ? course.name : `ID ${id}`;
        }).join(', ');
        showModal('Validation Error', `The following courses are invalid or canceled: ${invalidCourses}. Please try again.`);
        return;
    }

    const students = getStudents();
    const newStudentId = students.length > 0 ? students[students.length - 1].id + 1 : 1;
    const newStudent = {
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
