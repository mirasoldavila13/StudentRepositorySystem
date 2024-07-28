document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('add-course-form').addEventListener('submit', function(event) {
        event.preventDefault();
        addCourse();
    });
});

function addCourse() {
    const id = parseInt(document.getElementById('course-id').value);
    const name = document.getElementById('course-name').value;
    const studentCount = parseInt(document.getElementById('student-count').value);

    if (isNaN(id) || isNaN(studentCount) || id <= 0 || studentCount < 0) {
        showModal('Error', 'Please enter valid course ID and student count.');
        return;
    }

    const newCourse = {
        id: id,
        name: name,
        studentCount: studentCount
    };

    let courses = getCourses();
    if (courses.some(course => course.id === id)) {
        showModal('Error', 'A course with this ID already exists.');
        return;
    }

    courses.push(newCourse);
    saveCourses(courses);

    console.log('Course added:', newCourse); // Debugging log
    window.location.href = 'courses.html';  // Redirect to courses page
}
