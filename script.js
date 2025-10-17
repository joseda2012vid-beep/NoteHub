document.addEventListener("DOMContentLoaded", () => {

  // Referencias
  const noteInput = document.getElementById("noteInput");
  const noteTitle = document.getElementById("noteTitle");
  const saveBtn = document.getElementById("saveBtn");
  const voiceBtn = document.getElementById("voiceBtn");
  const notesContainer = document.getElementById("notesContainer");
  const backgroundSelect = document.getElementById("backgroundSelect");
  const customBg = document.getElementById("customBg");
  const darkModeBtn = document.getElementById("darkModeBtn");
  const searchNotes = document.getElementById("searchNotes");
  const noteStyleSelect = document.getElementById("noteStyleSelect");
  const noteSizeSelect = document.getElementById("noteSizeSelect");
  const sectionSelect = document.getElementById("sectionSelect");
  const newSectionInput = document.getElementById("newSectionInput");
  const addSectionBtn = document.getElementById("addSectionBtn");

  // Guardar notas en localStorage
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.forEach(n => addNote(n.title, n.text, n.style, n.size, n.section));

  // Función para agregar nota
  function addNote(title, text, style="sheet-white", size="sheet", section="General") {
    const note = document.createElement("div");
    note.classList.add("note", style, size);
    note.dataset.section = section;

    const titleEl = document.createElement("h3");
    titleEl.textContent = title;
    note.append



