// Get a reference to the table element
const table = document.querySelector('table');

// Create the table header row
// const headerRow = document.createElement('tr');
// const headers = ['Course Id', 'Course Name', 'Credits'];
// headers.forEach(headerText => {
//     const header = document.createElement('th');
//     header.textContent = headerText;
//     headerRow.appendChild(header);
// });
// table.appendChild(headerRow);

// Create the table body rows
// const courses = [
//     { id: '0101', name: 'Mathematics' },
//     { id: '0202', name: 'Computer Science' },
//     { id: '0303', name: 'Physics' },
// ];
let readLocalStorageCourse = function(){
    let courseData = JSON.parse(localStorage.getItem('courseData'));
    if(!courseData){
        return;
    }
    return courseData;
};
let courses = readLocalStorageCourse();

function handleUpdate(event,row){
    debugger;
    event.stopPropagation() 
    const updateButton = event.target;
    //const row = updateButton.parentNode;
    const idCell = row.querySelector('td:nth-child(1)');
    const nameCell = row.querySelector('td:nth-child(2)');
    console.log(idCell.contentEditable)
    if ((idCell.contentEditable === 'true' )&& (nameCell.contentEditable === 'true')) 
        {
            const idCellValue = idCell.textContent;
            const nameCellValue = nameCell.textContent;
            const rowIndex = Array.from(table.rows).indexOf(row);
            const courseId = idCell.textContent;
            const updatedCourses = courses.map((course, index) => {
                if (index === rowIndex) {
                    return { id: idCellValue, name: nameCellValue };
                }
                return course;
            });
            localStorage.setItem('courseData', JSON.stringify(updatedCourses));
       
        }
        else{
    
        idCell.contentEditable = true;
        nameCell.contentEditable = true;
        }
    };
   
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
        localStorage.setItem('courseData', JSON.stringify(updatedCourses));
        // table.removeChild(row);
        };
       
    

courses.forEach(course => {
    const row = document.createElement('tr');
    const idCell = document.createElement('td');
    idCell.textContent = course.id;
    row.appendChild(idCell);
    row.classList.add('py-2','border-b','text-center');
    const nameCell = document.createElement('td');
    nameCell.textContent = course.name;
    row.appendChild(nameCell);
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

// Function to edit the row on selecting update button
const updateEl = document.querySelector('#update');

