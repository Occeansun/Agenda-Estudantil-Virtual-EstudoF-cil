function getNotes() {
  return JSON.parse(localStorage.getItem('notes') || '[]');
}

function renderEmptyState(container) {
  container.innerHTML = '<p class="empty-state">Nenhuma nota encontrada. Crie sua primeira nota!</p>';
}

function createNoteCard(note) {
  const card = document.createElement('article');
  card.className = 'note-card';
  card.dataset.lang = note.category;

  card.innerHTML = `
    <span class="note-tag note-tag--${note.category}">
      ${note.category.toUpperCase()}
    </span>
    <h2 class="note-title">${note.title}</h2>
    <p class="note-description">${note.summary}</p>
  `;

  card.addEventListener('click', () => {
    window.location.href = `./src/pages/notepad.html?id=${note.id}`;
  });

  return card;
}

function updateNoteCount(count) {
  const subtitle = document.querySelector('.content-subtitle');
  if (subtitle) {
    subtitle.textContent = count === 1 ? '1 nota encontrada' : `${count} notas encontradas`;
  }
}

function loadNotes() {
  const notes = getNotes();
  const notesList = document.querySelector('.notes-list');
  if (!notesList) return;

  notesList.innerHTML = '';

  if (notes.length === 0) {
    renderEmptyState(notesList);
  } else {
    notes.forEach(note => {
      notesList.appendChild(createNoteCard(note));
    });
  }
  updateNoteCount(notes.length);
}
loadNotes();