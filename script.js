const notesContainer = document.getElementById('notes-container');
const addSectionBtn = document.getElementById('add-section');

function createNoteSection(text = '') {
  const section = document.createElement('div');
  section.className = 'note-section';

  const textarea = document.createElement('textarea');
  textarea.value = text;

  section.appendChild(textarea);
  notesContainer.appendChild(section);
}

// Agregar sección nueva al presionar el botón
addSectionBtn.addEventListener('click', () => {
  createNoteSection();
});

// Crear una sección inicial al cargar la página
createNoteSection('Escribe tu nota aquí...');



