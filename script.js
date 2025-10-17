document.addEventListener("DOMContentLoaded", () => {
  const noteInput = document.getElementById("noteInput");
  const noteTitle = document.getElementById("noteTitle");
  const saveBtn = document.getElementById("saveBtn");
  const notesContainer = document.getElementById("notesContainer");
  const noteStyleSelect = document.getElementById("noteStyleSelect");
  const noteSizeSelect = document.getElementById("noteSizeSelect");
  const sectionSelect = document.getElementById("sectionSelect");
  const newSectionInput = document.getElementById("newSectionInput");
  const addSectionBtn = document.getElementById("addSectionBtn");
  const currentSectionLabel = document.getElementById("currentSection");

  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  let currentSection = "General";

  renderNotes();

  function renderNotes() {
    notesContainer.innerHTML = "";
    const filtered = notes.filter(n => n.section === currentSection);
    filtered.forEach(n => addNote(n.title, n.text, n.style, n.size, n.section));
    currentSectionLabel.textContent = currentSection;
  }

  function addNote(title, text, style="sheet-white", size="sheet", section="General") {
    const note = document.createElement("div");
    note.classList.add("note", style, size);
    note.dataset.section = section;

    const titleEl = document.createElement("h3");
    titleEl.textContent = title;
    note.appendChild(titleEl);

    const textEl = document.createElement("p");
    textEl.textContent = text;
    note.appendChild(textEl);

    // Editar nota (doble clic)
    note.addEventListener("dblclick", () => {
      const newTitle = prompt("Editar título:", titleEl.textContent);
      const newText = prompt("Editar texto:", textEl.textContent);
      if (newTitle !== null && newText !== null) {
        titleEl.textContent = newTitle;
        textEl.textContent = newText;
        const index = notes.findIndex(n => n.title === title && n.text === text && n.section === section);
        if (index !== -1) {
          notes[index].title = newTitle;
          notes[index].text = newText;
          localStorage.setItem("notes", JSON.stringify(notes));
        }
      }
    });

    // Eliminar nota
    const delBtn = document.createElement("div");
    delBtn.textContent = "×";
    delBtn.classList.add("deleteBtn");
    delBtn.addEventListener("click", () => {
      note.remove();
      notes = notes.filter(n => !(n.title === title && n.text === text && n.section === section));
      localStorage.setItem("notes", JSON.stringify(notes));
    });
    note.appendChild(delBtn);

    notesContainer.appendChild(note);
  }

  saveBtn.addEventListener("click", () => {
    const text = noteInput.value.trim();
    const title = noteTitle.value.trim() || "Sin título";
    const style = noteStyleSelect.value;
    const size = noteSizeSelect.value;
    const section = sectionSelect.value || "General";

    if (!text) return;

    notes.push({title, text, style, size, section});
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();

    noteInput.value = "";
    noteTitle.value = "";
  });

  addSectionBtn.addEventListener("click", () => {
    const newSection = newSectionInput.value.trim();
    if (!newSection) return;
    const option = document.createElement("option");
    option.value = newSection;
    option.textContent = newSection;
    sectionSelect.appendChild(option);
    newSectionInput.value = "";
  });

  sectionSelect.addEventListener("change", (e) => {
    currentSection = e.target.value;
    renderNotes();
  });
});



