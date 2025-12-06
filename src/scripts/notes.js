function loadNotes() {
  const notes = JSON.parse(localStorage.getItem('notes') || '[]');
  const notesList = document.querySelector('.notes-list');
  if (!notesList) return;

  notesList.innerHTML = '';

  if (notes.length === 0) {
    notesList.innerHTML =
      '<p class="empty-state">Nenhuma nota encontrada. Crie sua primeira nota!</p>';
  } else {
    notes.forEach(note => {
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

      notesList.appendChild(card);
    });
  }

  const subtitle = document.querySelector('.content-subtitle');
  if (subtitle) {
    subtitle.textContent =
      notes.length === 1
        ? '1 nota encontrada'
        : `${notes.length} notas encontradas`;
  }
}

loadNotes();
