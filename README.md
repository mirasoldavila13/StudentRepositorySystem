# StudentRepositorySystem
Student Management System

## Overview
The Student Management System is a web application designed to facilitate the management of students and courses by teachers. It provides functionalities for teachers to sign up and log in, search for students, add new students, search for courses, and add courses associated with students.

### Core Functionalities
- **Efficient Management**: Easily manage and track student and course data.
- **Simplified Processes**: Quick enrollment, and participation monitoring.

### Key Benefits
- **Time Savings**: Automate daily tasks to focus more on teaching.
- **Reduced Overhead**: Lower administrative costs through efficient data management.
- **Enhanced Educational Experience**: Keep educators and students engaged with real-time updates.

## Features
- **Teacher Authentication**: Secure login for teachers to access the system
- **Student Management**:
  - Search for students by student name, ID, email, or phone number
  - Add new students to the system with details such as student name, email, phone number, and course ID they are enrolling in
  - Display students' names, email, phone numbers, the number of courses they are taking, and the course IDs they are enrolled in
  - Users have the option to update student name, email, phone number, or courses they are enrolled in
  - Ability to delete students
  - Any edits, deletions, or additions will automatically update the student local storage and be displayed
- **Course Management**:
  - Search for courses by course name
  - Add new courses to the system by course ID, course name, and the number of students enrolled in the course
  - Update the course name
  - Validate and delete courses if the student count is less than 3
  - Display the course ID, course name, and the number of students enrolled
  - Any edits, deletions, or additions will automatically update the course local storage and be displayed
- **Interactive Interface**:
  - The system is interactive and responds to user input with modal prompts for various actions
  - Modal prompts include confirmation for deletions, error messages, success messages, and prompts for editing student and course details
- **Client-Side Storage**: Uses local storage to store persistent data
- **Tailwind CSS**: Integrated for consistent and responsive styling across all HTML files

## Modal Prompts
The project includes several modal prompts to enhance user interaction:
  - Confirmation Modal for Deletion: Confirms the deletion of a student or a course.
  - Error Modal: Displays error messages for validation errors or operation failures.
  - Success Modal: Displays success messages upon the successful completion of operations.
  - Edit Student Modal: Prompts users to select and enter new values for updating student details.
  - Edit Course Modal: Prompts users to enter a new course name.
  - Generic Prompt Modal: Used for various prompts requiring user input or confirmation.

## Technologies Used
- **Frontend**: HTML, CSS, Tailwind CSS
- **Backend**: JavaScript
- **Database**: Local Storage

## Screenshots
### Landing Page
![Landing Page](path/to/landing_page.png)

### Sign Up Page
![Sign Up Page](path/to/sign_up_page.png)

### Login Page
![Login Page](path/to/login_page.png)

### Dashboard Part 1
![Dashboard Part 1](path/to/dashboard_part1.png)

### Dashboard Part 2
![Dashboard Part 2](path/to/dashboard_part2.png)

### Add Student Page
![Add Student Page](path/to/add_student_page.png)

### Add Course Page
![Add Course Page](path/to/add_course_page.png)

### Student Page
![Student Page](path/to/student_page.png)

### Course Page
![Course Page](path/to/course_page.png)

## Link to Deployed Application
[Link to Deployed Application](#)

## Installation and Usage
To run the project locally:
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/StudentRepositorySystem.git
2. Navigate to the project directory:
   cd StudentRepositorySystem
3. Open the index.html file in your web browser to start using the application.


## Contributors
- **Bhanu**: Developed the HTML portion of signup.html, created signup verification logic in script.js, and developed the HTML portions of course.html and addcourse.html. Also created the user diagram flow chart. Reviewed pull requests and resolved merge conflicts.
- **Jolvu**: Developed the student.html page with a table for student details, and created the schema for student.html and course.html. Also developed the add.html page and created the initial readme of the project. Reviewed pull requests and resolved merge conflicts.
- **Mirasoldavila13**:
  - **User Story Template and Management**
    - Created a template for user stories to ensure clarity and consistency.
    - Edited all 14 user stories, acceptance criteria, and tasks for all 14 GitHub issues.
  - **HTML Pages**
    - Added and completed `index.html`, `login.html`, and `dashboard.html`.
    - Added the skeleton for `signup.html`.
  - **Script.js Enhancements**
    - Fixed signup validation and handling, ensuring proper storage and redirection.
    - Implemented complete login functionality with validation and redirection, including a handle response.
  - **Dashboard Page Development**
    - Developed `dashboard.html` with navigation, search, edit, delete, and add functionalities.
    - Completed the entire `dashboard.js` for search, edit, delete, add, and update functionalities.
    - Added functionality to redirect to `student.html` after adding a student and to `course.html` after adding a course.
  - **Common.js Consolidation**
    - Consolidated common functions from `dashboard.js` into `common.js` for reduced redundancy and streamlined code.
    - Ensured consistent functionality across various HTML pages.
    - Enhanced `dashboard.js` to dynamically display courses and students using common functions.
    - Added sample data for students and courses in local storage for comprehensive testing.
    - Updated student edit functionality in `student.html` and `dashboard.html` to allow users to checkmark the particular fields they would like to update and cancel each prompt individually if they do not wish to update a particular field.
    - Added a logout function in `common.js` that clears the local storage but retains the user local storage.

  - **TailwindCSS Integration**
    - Integrated Tailwind CSS for consistent styling across the application.
    - Applied Tailwind configurations for responsive design.
  - **Enhanced Layout and Responsiveness with Tailwind CSS**
    - Applied Tailwind CSS configurations to extend screen sizes: 2xs, xs, sm, md, lg, xl.
    - Ensured min-h-screen and flex layout for full-height viewport and proper content distribution.
    - Adjusted main elements to use flexbox for consistent alignment and spacing.
    - Centered main content and footer across all HTML files.
    - Increased margin-top for main elements in `student.html` and `course.html` to position content higher on the page.
    - Added overflow-x-auto for tables to ensure responsiveness and horizontal scrolling.
    - Expanded column width and spacing in tables for better readability.
    - Updated local storage initialization to include new courses and students, matching course counts.
    - Added more sample data in student local storage and course local storage.
    - Maintained modal structure in `common.js` for alerts and prompts across all pages.
  - **Sample Data**
    - Added sample data in local storage for courses and students.
    - Ensured dynamic display of content and teacher's name on the dashboard.
  - **Project Management**
    - Organized and edited user stories and acceptance criteria.
    - Managed the order of feature branches.
    - Reviewed and closed user issue stories upon task completion.
    - Using the GitHub Kanban board to move each GitHub issue throughout the process until completion.
    - Reviewing pull requests, resolving merge conflicts.
    - Created the MVP for the project, establishing core functionalities and basic design for a working version of the application.
  - **Final README Update**
    - Updated the final README with:
      - Unique name
      - Description
      - Technologies used
      - Screenshots
      - Link to the deployed application
     
  # Future Enhancements
     - Add more details and styling to `index.html`, `signup.html`, and `login.html` to make them more appealing and informative.

