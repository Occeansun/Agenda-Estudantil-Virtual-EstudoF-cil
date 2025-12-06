import { storage } from './storage.js';

document.addEventListener('DOMContentLoaded', initCreateNotePage);

function initCreateNotePage() {
  const form = document.querySelector('.note-form');
  if (!form) return;
  setupCategorySelection();
  form.addEventListener('submit', handleFormSubmit);
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

function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const title = form.querySelector('#title').value.trim();
  const summary = form.querySelector('#summary').value.trim();
  const content = form.querySelector('#content').value.trim();
  const activeCategory = document
    .querySelector('.category-pill.is-active')
    ?.textContent.trim().toLowerCase();

  if (!isFormValid({ title, content, activeCategory })) return;

  const newNote = storage.buildNote({
    title,
    summary,
    content,
    category: activeCategory,
  });

  storage.saveNote(newNote);
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