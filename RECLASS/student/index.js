function searchClasses() {
    // Get the search input value
    const input = document.getElementById('searchInput').value.toLowerCase();
    
    // Get all the class elements
    const classElements = document.querySelectorAll('.class');
    
    // Loop through each class element and display or hide based on the search
    classElements.forEach(function(classElement) {
        const className = classElement.querySelector('.name p').textContent.toLowerCase();
        const teacherName = classElement.querySelector('.teacher p').textContent.toLowerCase();
        
        // Check if the search input is in either the class name or teacher's name
        if (className.includes(input) || teacherName.includes(input)) {
            classElement.style.display = ''; // Show the class
        } else {
            classElement.style.display = 'none'; // Hide the class
        }
    });
}


function topage(name){
    window.location.href = name;
}

function toggle(){
    modal = document.getElementById('addclass');

    if(modal.style.display == 'none'){
        modal.style.display = 'flex';
    } else {
        modal.style.display = 'none';
    }
}