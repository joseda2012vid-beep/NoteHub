const addNoteBtn = document.getElementById('addNoteBtn');
const noteContainer = document.getElementById('noteContainer');
const sheetTypeSelect = document.getElementById('sheetType');
const voiceBtn = document.getElementById('voiceBtn');

let recognition;

// Crear nota
function createNote(text = "Escribe tu nota...", sheet = "white") {
  const note = document.createElement('div');
  note.classList.add('note', sheet);
  note.setAttribute('contenteditable', 'true');
  note.innerHTML = text;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '✖';
  deleteBtn.classList.add('deleteBtn');
  deleteBtn.onclick = () => {
    note.remove();
    saveNotes();
  };

  note.appendChild(deleteBtn);

  note.addEventListener('input', saveNotes);

  noteContainer.appendChild(note);
  saveNotes();
}

// Guardar notas en localStorage
function saveNotes() {
  const notes = [];
  document.querySelectorAll('.note').forEach(note => {
    notes.push({
      text: note.innerText,
      sheet: note.classList.contains('lined') ? 'lined' :
             note.classList.contains('grid') ? 'grid' : 'white'
    });
  });
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Cargar notas
function loadNotes() {
  const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
  savedNotes.forEach(n => createNote(n.text, n.sheet));
}

// Botón agregar nota
addNoteBtn.addEventListener('click', () => {
  const type = sheetTypeSelect.value;
  createNote("", type);
});

// Reconocimiento por voz
if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
  recognition.lang = 'es-ES';
  recognition.continuous = false;

  voiceBtn.addEventListener('click', () => {
    recognition.start();
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    createNote(transcript, sheetTypeSelect.value);
  };
}

window.addEventListener('load', loadNotes);



