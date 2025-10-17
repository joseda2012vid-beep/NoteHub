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

  // Cargar notas desde localStorage
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.forEach(n => addNote(n.title, n.text, n.style, n.size, n.section));

  // Función para agregar nota
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

    // Botón eliminar
    const delBtn = document.createElement("div");
    delBtn.textContent = "×";
    delBtn.classList.add("deleteBtn");
    delBtn.addEventListener("click", () => {
      note.remove();
      notes = notes.filter(n => !(n.title === title && n.text === text));
      localStorage.setItem("notes", JSON.stringify(notes));
    });
    note.appendChild(delBtn);

    notesContainer.appendChild(note);
  }

  // Guardar nota
  saveBtn.addEventListener("click", () => {
    const text = noteInput.value.trim();
    const title = noteTitle.value.trim() || "Sin título";
    const style = noteStyleSelect.value;
    const size = noteSizeSelect.value;
    const section = sectionSelect.value || "General";

    if (!text) return;

    addNote(title, text, style, size, section);
    notes.push({title, text, style, size, section});
    localStorage.setItem("notes", JSON.stringify(notes));

    noteInput.value = "";
    noteTitle.value = "";
  });

  // Crear nueva sección
  addSectionBtn.addEventListener("click", () => {
    const newSection = newSectionInput.value.trim();
    if (!newSection) return;
    const option = document.createElement("option");
    option.value = newSection;
    option.textContent = newSection;
    sectionSelect.appendChild(option);
    newSectionInput.value = "";
  });

  // Fondo personalizable
  backgroundSelect.addEventListener("change", (e) => {
    const value = e.target.value;
    let bgUrl = "";
    if(value === "white"){ document.body.style.backgroundImage = "none"; document.body.style.backgroundColor = "#ffffff"; return; }
    else if(value === "gradient"){ document.body.style.backgroundImage = "linear-gradient(135deg, #74ABE2, #5563DE)"; }
    else if(value === "space"){ bgUrl="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa"; }
    else if(value === "forest"){ bgUrl="https://images.unsplash.com/photo-1501785888041-af3ef285b470"; }
    else if(value === "beach"){ bgUrl="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"; }
    else if(value === "mountain"){ bgUrl="https://images.unsplash.com/photo-1508264165352-258859e62245"; }

    if(bgUrl){ document.body.style.backgroundImage = `url(${bgUrl})`; }
    document.body.style.backgroundSize="cover";
    document.body.style.backgroundPosition="center";
    document.body.style.backgroundRepeat="no-repeat";
  });

  customBg.addEventListener("change", (e)=>{
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = function(event){
        document.body.style.backgroundImage = `url(${event.target.result})`;
        document.body.style.backgroundSize="cover";
        document.body.style.backgroundPosition="center";
        document.body.style.backgroundRepeat="no-repeat";
      }
      reader.readAsDataURL(file);
    }
  });

  // Modo oscuro
  darkModeBtn.addEventListener("click", ()=>{
    document.body.classList.toggle("dark");
    if(document.body.classList.contains("dark")) document.body.style.backgroundColor="#1e1e1e";
    else document.body.style.backgroundColor="#f5f5f5";
  });

  // Búsqueda de notas
  searchNotes.addEventListener("input", (e)=>{
    const q = e.target.value.toLowerCase();
    document.querySelectorAll(".note").forEach(n=>{
      n.style.display = (n.querySelector("h3").textContent.toLowerCase().includes(q) ||
                         n.querySelector("p").textContent.toLowerCase().includes(q))
                         ? "flex" : "none";
    });
  });

  // Escritura por voz
  let recognition;
  if('webkitSpeechRecognition' in window){
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'es-ES';

    voiceBtn.addEventListener("click", () => {
      if(voiceBtn.dataset.recording === "true"){
        recognition.stop();
        voiceBtn.dataset.recording = "false";
        voiceBtn.style.background = "#4a90e2";
      } else {
        recognition.start();
        voiceBtn.dataset.recording = "true";
        voiceBtn.style.background = "#2ecc71";
      }
    });

    recognition.onresult = (event) => {
      let transcript = event.results[event.results.length-1][0].transcript;
      noteInput.value += transcript + " ";
    }
  } else {
    voiceBtn.disabled = true;
    voiceBtn.title = "No soportado en este navegador";
  }

}); // Fin DOMContentLoaded
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  e.prompt();
});

