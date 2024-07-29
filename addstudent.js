document.addEventListener('DOMContentLoaded', function () {
    const addStudentForm = document.getElementById('add-student-form');
    if (addStudentForm) {
        addStudentForm.addEventListener('submit', function (event) {
            event.preventDefault();
            addNewStudent();
        });
    }

    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            console.log('Logout button clicked');
            handleLogout();
        });
    }

    const successModalOkBtn = document.getElementById('success-modal-ok');
    if (successModalOkBtn) {
        successModalOkBtn.addEventListener('click', () => {
            document.getElementById('success-modal').classList.add('hidden');
            if (successModalCallback) {
                successModalCallback();
                successModalCallback = null; // Clear the callback after execution
            }
        });
    }

    const errorModalOkBtn = document.getElementById('error-modal-ok');
    if (errorModalOkBtn) {
        errorModalOkBtn.addEventListener('click', () => {
            document.getElementById('error-modal').classList.add('hidden');
        });
    }
});

let successModalCallback = null;

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
        showModal('error-modal', 'Students are required to be enrolled in at least one valid course.');
        return;
    }

    // Check for non-existent course IDs
    const invalidCourseIds = courseIds.filter(id => !courses.some(course => course.id === id));
    if (invalidCourseIds.length > 0) {
        const invalidCourses = invalidCourseIds.map(id => {
            const course = courses.find(course => course.id === id);
            return course ? course.name : `ID ${id}`;
        }).join(', ');
        showModal('error-modal', `The following courses are invalid or canceled: ${invalidCourses}. Please try again.`);
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
    successModalCallback = () => {
        window.location.href = 'student.html';
    };
    showModal('success-modal', 'Student added successfully!');
}

function showModal(modalId, content, callback = null) {
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error(`showModal: Modal element not found for ID: ${modalId}`);
        return;
    }

    const modalContent = modal.querySelector(`#${modalId}-content`);
    if (!modalContent) {
        console.error(`showModal: Modal content element not found for ID: ${modalId}-content`);
        return;
    }

    modalContent.textContent = content;
    modal.classList.remove('hidden');

    const modalOkButton = modal.querySelector('.modal-ok');
    if (modalOkButton) {
        modalOkButton.onclick = () => {
            modal.classList.add('hidden');
            if (callback) callback();
        };
    }
}
