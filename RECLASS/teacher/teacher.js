// Function to display the clicked section and hide others
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      section.classList.remove("active");
    });
  
    // Show the selected section
    const activeSection = document.getElementById(sectionId);
    activeSection.classList.add("active");
  }
  
  // Add event listeners to navigation links
  document.querySelectorAll("nav ul li a").forEach((navLink) => {
    navLink.addEventListener("click", function (event) {
      // Prevent default link behavior
      event.preventDefault();
  
      // Get the section id from the href attribute
      const sectionId = this.getAttribute("href").substring(1);
  
      // Call the function to show the corresponding section
      showSection(sectionId);
    });
  });
  
  // Show the first section by default
  window.onload = function () {
    showSection("materials");
  };
  
  // Teacher's function to add new assignments
  function addAssignment() {
    const assignmentTitle = prompt("Enter assignment title:");
    const dueDate = prompt("Enter due date (e.g. September 25):");
  
    if (assignmentTitle && dueDate) {
      // Add new assignment to the list
      const assignmentList = document.querySelector("#assignments ul");
      const newAssignment = document.createElement("li");
      newAssignment.innerHTML = `<strong>${assignmentTitle}:</strong> Due: ${dueDate}`;
      assignmentList.appendChild(newAssignment);
    } else {
      alert("Both assignment title and due date are required.");
    }
  }
  
  // Function to manage grades and input scores
  function manageGrades() {
    // Toggle input fields to enter grades
    const assignmentInput = prompt("Enter assignment score (out of 10):");
    const test1Input = prompt("Enter Test 1 score (out of 10):");
    const test2Input = prompt("Enter Test 2 score (out of 20):");
    const examInput = prompt("Enter Exam score (out of 30):");
  
    // Validate and update the scores
    if (assignmentInput && test1Input && test2Input && examInput) {
      document.getElementById("assignment").innerText = assignmentInput;
      document.getElementById("test1").innerText = test1Input;
      document.getElementById("test2").innerText = test2Input;
      document.getElementById("exam").innerText = examInput;
  
      // Call the function to calculate and update the grade
      calculateGrade();
    } else {
      alert("All scores are required to calculate the grade.");
    }
  }
  
  // Function to generate a report
  function generateReport() {
    const studentName = prompt("Enter the student's name:");
    const overallScore = document.getElementById("overall").innerText;
    const grade = document.getElementById("gradeDisplay").innerText;
  
    if (studentName) {
      alert(`Report for ${studentName}:\nOverall Score: ${overallScore}\nGrade: ${grade}`);
    } else {
      alert("Student's name is required to generate the report.");
    }
  }
  
  // Function to grade classwork
  function gradeClasswork() {
    const classworkTitle = prompt("Enter classwork title:");
    const maxScore = prompt("Enter maximum score:");
  
    if (classworkTitle && maxScore) {
      const classworkList = document.querySelector("#classwork ul");
      const newClasswork = document.createElement("li");
      newClasswork.innerHTML = `<strong>${classworkTitle}:</strong> Max Score: ${maxScore}`;
      classworkList.appendChild(newClasswork);
    } else {
      alert("Both classwork title and maximum score are required.");
    }
  }
  
  // Button event listeners for teacher actions
  document.getElementById("add-assignment-btn").addEventListener("click", addAssignment);
  document.getElementById("manage-grades-btn").addEventListener("click", manageGrades);
  document.getElementById("generate-report-btn").addEventListener("click", generateReport);
  document.getElementById("grade-classwork-btn").addEventListener("click", gradeClasswork);
  
  // Existing student functions (calculateGrade) remains the same for teacher view
  