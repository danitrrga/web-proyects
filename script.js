function popup() {
    const popupContainer = document.createElement("div");
    popupContainer.innerHTML = `
    <div id="popupContainer">
        <h1>New Note</h1>
        <textarea id="note-text" placeholder="Write here..." autofocus type="text"></textarea>
        <div id="btn-container">
            <button id="submitBtn" onclick="createNote()"><img src="/SVG/Check.svg" alt="Check"></button>
            <button id="closeBtn" onclick="closePopup()"><img src="/SVG/Close_round.svg" alt="Close"></button>            
        </div>
    </div>
    `;
    document.body.appendChild(popupContainer);
}    

function closePopup() {
    const popupContainer = document.getElementById("popupContainer");
    if (popupContainer) {
        popupContainer.remove();
    }
}

function createNote() {
    const popupContainer = document.getElementById('popupContainer');
    const noteText = document.getElementById('note-text').value;
    
    if (noteText.trim() !== '') {
        const note = {
            id: new Date().getTime(),
            text: noteText
        };

        const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
        existingNotes.push(note);

        localStorage.setItem('notes', JSON.stringify(existingNotes));

        document.getElementById('note-text').value = '';
        
        popupContainer.remove();
        displayNotes();
    }
}

function displayNotes() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';

    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    
    notes.forEach(note => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <span>${note.text}</span>
        <div id="noteBtns-container">
            <button id="editBtn" onclick="editNote(${note.id})"><img src="/SVG/Edit.svg"></button>
            <button id="deleteBtn" onclick="deleteNote(${note.id})"><img src="/SVG/Trash.svg"></button>
        </div>
        `;
        notesList.appendChild(listItem);
    });
}

function editNote(noteId) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteToEdit = notes.find(note => note.id === noteId);
    const noteText = noteToEdit ? noteToEdit.text : '';
    const editingPopup = document.createElement("div");

    editingPopup.innerHTML = `
    <div id="editing-container" data-note-id="${noteId}">
        <h1>Edit Note</h1>
        <textarea id="note-text">${noteText}</textarea>
        <div id="btn-container">
            <button id="submitBtn" onclick="updateNote()"><img src="/SVG/Check.svg" alt="Submit"></button>
            <button id="closeBtn" onclick="closeEditPopup()"><img src="/SVG/Close_round.svg" alt="Close"></button>
        </div>
    </div>
    `;
    document.body.appendChild(editingPopup);
}

function closeEditPopup() {
    const editingPopup = document.getElementById("editing-container");
    if (editingPopup) {
        editingPopup.remove();
    }
}

function updateNote() {
    const noteText = document.getElementById('note-text').value.trim();
    const noteId = document.getElementById('editing-container').getAttribute('data-note-id');
    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    // Find the note to update
    const updatedNotes = notes.map(note => {
        if (note.id == noteId) {
            return { id: note.id, text: noteText };
        }
        return note;
    });

    // Update the notes in local storage
    localStorage.setItem('notes', JSON.stringify(updatedNotes));

    // Close the edit popup
    const editingPopup = document.getElementById("editing-container");
    if (editingPopup) {
        editingPopup.remove();
    }

    // Refresh the displayed notes
    displayNotes();
}

function deleteNote(noteId) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note => note.id !== noteId);

    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

displayNotes();
