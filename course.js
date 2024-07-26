// Get a reference to the table element
const table = document.querySelector('table');

//Function to read the course from local storage
let readLocalStorageCourse = function(){
    let courseData = JSON.parse(localStorage.getItem('courses'));
    if(!courseData){
        return;
    }
    return courseData;
};
let courses = readLocalStorageCourse();

//Function to handle update action 
function handleUpdate(event,row){
    debugger;
    event.stopPropagation() 
    const updateButton = event.target;
    //const row = updateButton.parentNode;
    const idCell = row.querySelector('td:nth-child(1)');
    const nameCell = row.querySelector('td:nth-child(2)');
    const countCell = row.querySelector('td:nth-child(3)');
    console.log(idCell.contentEditable);
    if (nameCell.contentEditable === 'true') {
        let courses = readLocalStorageCourse();
        const idCellValue = idCell.textContent;
        const nameCellValue = nameCell.textContent;
        const countCellValue = parseInt(countCell.textContent);
        let rowIndex = (Array.from(table.rows).indexOf(row));
        rowIndex = rowIndex - 1;
        let updatedCourses = courses.map((course, index) => {
            if (index === rowIndex) {
                return { id: idCellValue, name:nameCellValue,studentCount:countCellValue };
            }
            return course;
        });
        idCell.contentEditable = false;
        nameCell.contentEditable = false;
        countCell.contentEditable = false;
        console.log(courses);
        console.log(updatedCourses);
        localStorage.setItem('courses', JSON.stringify(updatedCourses));
    } else {
       // idCell.contentEditable = true;
        nameCell.contentEditable = true;
        //countCell.contentEditable = true;
    }
    };
  
    //Function to handel course Delete action
    function handleDelete(event,row){
        debugger;
        event.stopPropagation() 
        const deleteButton = event.target;
        //const row = updateButton.parentNode;
        const idCell = row.querySelector('td:nth-child(1)');
        const nameCell = row.querySelector('td:nth-child(2)');
        row.remove();
        const courseId = idCell.textContent;
        const updatedCourses = courses.filter(course => course.id !== courseId);
        localStorage.setItem('courses', JSON.stringify(updatedCourses));
        // table.removeChild(row);
        };
       
    
// Adding course details into the table for display
courses.forEach(course => {
    const row = document.createElement('tr');
    const idCell = document.createElement('td');
    idCell.textContent = course.id;
    row.style.textAlign = 'center';
    row.appendChild(idCell);
    //row.classList.add('py-2','border-b','text-center');
    const nameCell = document.createElement('td');
    nameCell.textContent = course.name;
       row.appendChild(nameCell);
    const studentCell = document.createElement('td');
    studentCell.textContent = course.studentCount;
    row.appendChild(studentCell);
    const updateCell = document.createElement('td');
    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.classList.add('update');
    updateButton.addEventListener('click',function(event) {
        handleUpdate(event, row); // event for update button
    });
    updateCell.appendChild(updateButton);
    row.appendChild(updateCell);

    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('Delete');
    deleteButton.addEventListener('click',function(event) {
        handleDelete(event, row); // Event for Delete button
    });
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    table.appendChild(row);
});
// Append the table to the document body
const sectionEl = document.querySelector('section')
sectionEl.appendChild(table);

