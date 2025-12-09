import { storage } from './storage.js';

document.addEventListener('DOMContentLoaded', initCreateNotePage);

function initCreateNotePage() {
  const form = document.querySelector('.note-form');
  if (!form) return;
  const noteId = getNoteIdFromUrl();
  setupCategorySelection();
  if (noteId) {
    loadNoteForEdit(noteId);
  }
  form.addEventListener('submit',event => handleFormSubmit(event, noteId));
}

function getNoteIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function loadNoteForEdit(id) {
  const note = storage.findById(id);
  if (!note) {
    alert('Nota não encontrada');
    window.location.href = '../../index.html';
    return;
  }

  document.querySelector('#title').value = note.title;
  document.querySelector('#summary').value = note.summary || '';
  document.querySelector('#content').value = note.content;

  const buttons = document.querySelectorAll('.category-pill');
  buttons.forEach(btn => {
    const text = btn.textContent.trim().toLowerCase();
    btn.classList.toggle('is-active', text === note.category);
  });
}

function setupCategorySelection() {
  const categoryButtons = document.querySelectorAll('.category-pill');
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      categoryButtons.forEach(b => b.classList.remove('is-active'));
      button.classList.add('is-active');
    });
  });
}

function handleFormSubmit(event, noteId) {
  event.preventDefault();

  const form = event.currentTarget;
  const title = form.querySelector('#title').value.trim();
  const summary = form.querySelector('#summary').value.trim();
  const content = form.querySelector('#content').value.trim();
  const activeCategory = document
    .querySelector('.category-pill.is-active')
    ?.textContent.trim().toLowerCase();

  if (!isFormValid({ title, content, activeCategory })) return;

  if (noteId) {
    storage.updateNote(noteId, {
      title,
      summary,
      content,
      category: activeCategory,
      updatedAt: new Date().toISOString(),
    });
  } else {
    const newNote = storage.buildNote({
      title,
      summary,
      content,
      category: activeCategory,
    });
    storage.saveNote(newNote);
  }

  window.location.href = '../../index.html';
}

function isFormValid({ title, content, activeCategory }) {
  if (!title || !content) {
    alert('Por favor, preencha o título e o conteúdo');
    return false;
  }
  if (!activeCategory) {
    alert('Por favor, selecione uma categoria.');
    return false;
  }
  return true;
}