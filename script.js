const addNoteBtn = document.getElementById('addNoteBtn');
const noteContainer = document.getElementById('noteContainer');

// Función para guardar notas en el localStorage
function saveNotes() {
  const notes = [];
  document.querySelectorAll('.note').forEach(note => {
    notes.push(note.innerHTML);
  });
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Función para cargar notas del localStorage
function loadNotes() {
  const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
  savedNotes.forEach(text => {
    createNote(text);
  });
}

// Función para crear una nota
function createNote(text = "Escribe tu nota aquí...") {
  const newNote = document.createElement('div');
  newNote.classList.add('note');
  newNote.setAttribute('contenteditable', 'true');
  newNote.innerHTML = text;

  // Guardar cada cambio automáticamente
  newNote.addEventListener('input', saveNotes);

  noteContainer.appendChild(newNote);
  saveNotes();
}

// Evento para agregar nuevas notas
addNoteBtn.addEventListener('click', () => {
  createNote();
});

// Cargar notas al iniciar la página
window.addEventListener('load', loadNotes);

