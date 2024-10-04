let noteTitle = document.getElementById("noteTitle");
let noteContent = document.getElementById("noteContent");
let addNoteBtn = document.getElementById("addNote");
let notesList = document.getElementById("notesList");

let notes = [];

if (localStorage.getItem("notes")) {
    notes = JSON.parse(localStorage.getItem("notes"));
    displayNotes();
}

addNoteBtn.addEventListener("click", function () {
    if (noteTitle.value.length < 3 || noteTitle.value.length > 10) {
        alert("Note title should be between 3 and 10 characters");
        return; }

        if (noteContent.value.length < 5 || noteContent.value.length > 50) {
            alert("Note title should be between 5 and  50 characters");
            return; }

    let newNote = {
        title: noteTitle.value,
        content: noteContent.value,
        done: false
    };

    notes.push(newNote);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
    clearInputs();
});

function displayNotes() {
    let notesHtml = "";
    notes.forEach((note, index) => {
        notesHtml += `
            <div class="note ${note.done ? 'done' : ''}">
                <div class="note-content">
                    <h3 onclick="toggleDone(${index})">${note.title}</h3>
                    <p>${note.content}</p>
                </div>
                <div class="actions">
                    <button onclick="deleteNote(${index})" class="btn btn-danger">Delete</button>
                </div>
            </div>`;
    });
    notesList.innerHTML = notesHtml;
}

function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}

function toggleDone(index) {
    notes[index].done = !notes[index].done;
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}

function clearInputs() {
    noteTitle.value = "";
    noteContent.value = "";
}
