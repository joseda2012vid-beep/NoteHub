const addBtn = document.getElementById("add-btn");
const notesContainer = document.getElementById("notes-container");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function displayNotes() {
  notesContainer.innerHTML = "";
  notes.forEach((note, index) => {
    const noteEl = document.createElement("div");
    noteEl.classList.add("note");
    noteEl.innerHTML = `
      <h2>${note.title}</h2>
      <p>${note.text}</p>
      <button onclick="editNote(${index})">Editar</button>
      <button onclick="deleteNote(${index})">Eliminar</button>
    `;
    notesContainer.appendChild(noteEl);
  });
}

addBtn.addEventListener("click", () => {
  const title = document.getElementById("note-title").value.trim();
  const text = document.getElementById("note-text").value.trim();
  if (!title && !text) return alert("Escribe algo antes de agregar.");
  notes.push({ title, text });
  saveNotes();
  displayNotes();
  document.getElementById("note-title").value = "";
  document.getElementById("note-text").value = "";
});

function editNote(index) {
  const note = notes[index];
  const newTitle = prompt("Editar título:", note.title);
  const newText = prompt("Editar texto:", note.text);
  if (newTitle !== null && newText !== null) {
    notes[index] = { title: newTitle, text: newText };
    saveNotes();
    displayNotes();
  }
}

function deleteNote(index) {
  if (confirm("¿Eliminar esta nota?")) {
    notes.splice(index, 1);
    saveNotes();
    displayNotes();
  }
}

displayNotes();
