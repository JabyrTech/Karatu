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

function calculateGrade() {

  document.getElementById("assignment").style.display = "block";
  document.getElementById("test1").style.display = "block";
  document.getElementById("test2").style.display = "block";
  document.getElementById("exam").style.display = "block";
  // Get the scores from the table
  const assignment = parseInt(document.getElementById("assignment").innerText);
  const test1 = parseInt(document.getElementById("test1").innerText);
  const test2 = parseInt(document.getElementById("test2").innerText);
  const exam = parseInt(document.getElementById("exam").innerText);

  // Calculate overall score
  const overall = assignment + test1 + test2 + exam;
  document.getElementById("overall").innerText = overall;

  const gradedisplay = document.getElementById("gradeDisplay");

  // Calculate the grade based on overall score
  let grade = "";
  if (overall >= 90) {
    grade = "A+";
    gradedisplay.style.color = "green";
  } else if (overall >= 80) {
    grade = "A";
    gradedisplay.style.color = "green";
  } else if (overall >= 70) {
    grade = "B";
    gradedisplay.style.color = "green";
  } else if (overall >= 60) {
    grade = "C";
    gradedisplay.style.color = "orange";
  } else if (overall >= 50) {
    grade = "D";
    gradedisplay.style.color = "purple";
  } else {
    grade = "F";
    gradedisplay.style.color = "red";
  }

  // Display the grade
  gradedisplay.innerText = grade;
}
