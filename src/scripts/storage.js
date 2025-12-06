export function getNotes() {
  return JSON.parse(localStorage.getItem('notes') || '[]');
}

export function saveNote(note) {
  const notes = getNotes();
  notes.push(note);
  localStorage.setItem('notes', JSON.stringify(notes));
}

export function deleteNote(id) {
  const notes = getNotes().filter(n => n.id !== id);
  localStorage.setItem('notes', JSON.stringify(notes));
}

export function getNoteById(id) {
  return getNotes().find(n => n.id === id);
}
