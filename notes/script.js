
const toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
const sidebar = document.getElementById('sidebar');
const content = document.getElementById('content');
const newNoteButton = document.getElementById('newNoteButton');
const saveNoteButton = document.getElementById('saveNoteButton');
const cancelNoteButton = document.getElementById('cancelNoteButton');
const noteForm = document.getElementById('noteForm');
const noteTitleInput = document.getElementById('noteTitle');
const noteList = document.getElementById('noteList');
const classSubjectTitle = document.getElementById('classSubjectTitle');
const imageInput = document.getElementById('imageInput');

let currentClass = null;
let currentSubject = null;
let currentNoteId = null;

toggleSidebarBtn.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
    content.classList.toggle('full-width');
    // toggleSidebarBtn.classList.toggle('hidden');
});

document.querySelectorAll('.class').forEach(classElement => {
    classElement.querySelector('.class-title').addEventListener('click', () => {
        const subjects = classElement.querySelector('.subjects');
        subjects.style.display = subjects.style.display === 'block' ? 'none' : 'block';
    });

    const subjects = classElement.querySelectorAll('.subject');
    subjects.forEach(subjectElement => {
        subjectElement.addEventListener('click', () => {
            currentClass = classElement.dataset.class;
            currentSubject = subjectElement.dataset.subject;
            classSubjectTitle.textContent = `${currentClass} - ${currentSubject} Notes`;
            showNotes();
        });
    });
});

newNoteButton.addEventListener('click', () => {
    noteForm.style.display = 'block';
    noteTitleInput.value = '';
    quill.setContents([]);
    currentNoteId = null;
    newNoteButton.style.display = 'none';
    noteList.innerHTML = ''; // Clear note list when adding new note
});

cancelNoteButton.addEventListener('click', () => {
    noteForm.style.display = 'none';
    newNoteButton.style.display = 'block';
});

saveNoteButton.addEventListener('click', () => {
    if (!currentSubject) {
        alert('Please select a subject to save the note to.');
        return;
    }

    const noteTitle = noteTitleInput.value.trim();
    const noteContent = quill.root.innerHTML;

    if (!noteTitle || !noteContent) {
        alert('Please enter both title and content.');
        return;
    }

    const note = {
        id: currentNoteId || new Date().getTime(),
        title: noteTitle,
        content: noteContent,
        class: currentClass,
        subject: currentSubject,
        created: new Date().toLocaleString() // Add creation date
    };

    saveNoteToLocalStorage(note);
    noteForm.style.display = 'none';
    newNoteButton.style.display = 'block';
    showNotes();
});

const quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
        toolbar: [
            [{ 'header': '1'}, { 'header': '2'}, { 'font': [] }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['bold', 'italic', 'underline'],
            ['image']
        ]
    }
});

imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const range = quill.getSelection();
            quill.insertEmbed(range.index, 'image', e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

function showNotes() {
    noteList.innerHTML = '';
    const notes = getNotesFromLocalStorage();
    const filteredNotes = notes.filter(note => note.class === currentClass && note.subject === currentSubject);
    filteredNotes.forEach(note => {
        const noteItem = document.createElement('div');
        noteItem.className = 'note-item';
        noteItem.innerHTML = `
            <div>
                <div>${note.title}</div>
                <div class="note-created">${note.created}</div>
            </div>
            <button class="delete-btn">X</button>
        `;
        noteItem.querySelector('.delete-btn').addEventListener('click', (event) => {
            event.stopPropagation(); // Prevents event bubbling to parent note item
            deleteNoteById(note.id);
            showNotes();
        });
        noteItem.addEventListener('click', () => {
            noteForm.style.display = 'block';
            noteTitleInput.value = note.title;
            quill.root.innerHTML = note.content;
            currentNoteId = note.id;
            newNoteButton.style.display = 'none';
        });
        noteList.appendChild(noteItem);
    });
}

function getNotesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('notes')) || [];
}

function saveNoteToLocalStorage(note) {
    const notes = getNotesFromLocalStorage();
    const existingNoteIndex = notes.findIndex(n => n.id === note.id);
    if (existingNoteIndex !== -1) {
        notes[existingNoteIndex] = note;
    } else {
        notes.push(note);
    }
    localStorage.setItem('notes', JSON.stringify(notes));
}

function deleteNoteById(noteId) {
    if (confirm('Are you sure you want to delete this note?')) {
        let notes = getNotesFromLocalStorage();
        notes = notes.filter(note => note.id !== noteId);
        localStorage.setItem('notes', JSON.stringify(notes));
    }
}

showNotes();

// Function to save subjects to local storage
function saveSubjectsToLocalStorage(className, subjects) {
    localStorage.setItem(className, JSON.stringify(subjects));
}

// Function to load subjects from local storage
function loadSubjectsFromLocalStorage(className) {
    const subjects = localStorage.getItem(className);
    return subjects ? JSON.parse(subjects) : [];
}

// Function to display subjects
function displaySubjects(className) {
    const subjectsContainer = document.getElementById(className + 'Subjects');
    subjectsContainer.innerHTML = ''; // Clear previous subjects

    const savedSubjects = loadSubjectsFromLocalStorage(className);
    savedSubjects.forEach(subject => {
        const newSubjectItem = document.createElement('div');
        newSubjectItem.className = 'subject';
        newSubjectItem.textContent = subject;
        subjectsContainer.appendChild(newSubjectItem);
    });
}

// Event listener for adding subjects
addSubjectBtn.addEventListener('click', () => {
    const classElement = document.querySelector('.class.active');
    if (!classElement) return;

    const className = classElement.dataset.class;
    const subjectInput = newSubjectInput.value.trim();
    if (!subjectInput) return;

    const subjectsContainer = classElement.querySelector('.subjects');
    const newSubjectItem = document.createElement('div');
    newSubjectItem.className = 'subject';
    newSubjectItem.textContent = subjectInput;
    subjectsContainer.appendChild(newSubjectItem);

    // Save to local storage
    const savedSubjects = loadSubjectsFromLocalStorage(className);
    savedSubjects.push(subjectInput);
    saveSubjectsToLocalStorage(className, savedSubjects);

    newSubjectInput.value = '';
});

document.querySelectorAll('.class').forEach(classElement => {
    const className = classElement.dataset.class;
    displaySubjects(className);
});


function countNotesInSubject(subjectName) {
// Get the stored notes from localStorage
const notes = JSON.parse(localStorage.getItem('notes')) || {};

// Get the notes for the specific subject
const subjectNotes = notes[subjectName] || [];

// Return the number of notes in the subject
return subjectNotes.length;
}

// Function to update the subject list with note counts
function updateSubjectList() {
document.querySelectorAll('.subject').forEach(subjectElement => {
    const subjectName = subjectElement.dataset.subject;
    const noteCount = countNotesInSubject(subjectName);
    subjectElement.textContent = `${subjectName} (${noteCount})`;
});
}

// Call this function after adding a new note or when the page loads
updateSubjectList();

addNoteBtn.addEventListener('click', () => {
// Existing logic to save a note
saveNote();

// Update the subject list to reflect the new note count
updateSubjectList();
});

document.addEventListener('DOMContentLoaded', () => {
updateSubjectList();
});