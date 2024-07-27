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

    const newCourse = {
        id: id,
        name: name,
        studentCount: studentCount
    };

    let courses = getCourses();
    courses.push(newCourse);
    saveCourses(courses);
    window.location.href = 'courses.html';  // Redirect to courses page
}
