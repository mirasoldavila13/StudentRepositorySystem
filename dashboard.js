document.addEventListener('DOMContentLoaded', function () {
    initializeLocalStorage();
    displayAllCourses('dashboardCourseTableBody');
    displayAllStudents('student-table-body');

    document.getElementById('modal-ok').addEventListener('click', () => {
        document.getElementById('modal').classList.add('hidden');
    });

    document.getElementById('modal-cancel').addEventListener('click', () => {
        document.getElementById('modal').classList.add('hidden');
    });

    function showModal(title, content, isPrompt = false, callback = null) {
        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal-content').innerText = content;

        const inputContainer = document.getElementById('modal-input-container');
        const modalInput = document.getElementById('modal-input');
        const modalCancel = document.getElementById('modal-cancel');

        if (isPrompt) {
            inputContainer.classList.remove('hidden');
            modalCancel.classList.remove('hidden');
            modalInput.value = ''; // Clear the input field
        } else {
            inputContainer.classList.add('hidden');
            modalCancel.classList.add('hidden');
        }

        document.getElementById('modal').classList.remove('hidden');

        // Handle OK button click
        document.getElementById('modal-ok').onclick = function() {
            document.getElementById('modal').classList.add('hidden');
            if (callback) {
                const inputValue = isPrompt ? modalInput.value : null;
                callback(inputValue);
            }
        };

        // Handle Cancel button click
        document.getElementById('modal-cancel').onclick = function() {
            document.getElementById('modal').classList.add('hidden');
        };
    }

    // Example usage of showModal
    function exampleAlert() {
        showModal('Alert', 'This is an alert message.');
    }

    function examplePrompt() {
        showModal('Prompt', 'Enter your name:', true, function(inputValue) {
            if (inputValue) {
                console.log('User input:', inputValue);
            }
        });
    }
});
