import { storage } from "./storage.js";

document.addEventListener('DOMContentLoaded', initNotePage);

function initNotePage() {
  const noteId = getNoteIdFromURL();
  if (!noteId) return redirectHome('Nota não encontrada');
  
  const note = storage.findById(noteId);
  if (!note) return redirectHome('Nota não encontrada');
  
  renderNote(note);
  setupDelete(noteId);
  setupEdit(noteId);
}

function getNoteIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function redirectHome(message) {
  alert(message);
  window.location.href = '../../index.html';
}

function renderNote(note) {
  const noteTag = document.querySelector('.note-tag');
  const noteCreated = document.querySelector('.note-created');
  const noteTitle = document.querySelector('.note-title-main');
  const noteSubtitle = document.querySelector('.note-subtitle');
  const noteContent = document.querySelector('.note-content');

  if (noteTag) {
    noteTag.textContent = note.category.toUpperCase();
    noteTag.className = `note-tag note-tag--${note.category}`;
  }

  if (noteCreated) {
    const date = new Date(note.createdAt);
    noteCreated.textContent = `Criada em ${date.toLocaleDateString('pt-BR')}`;
  }

  if (noteTitle) noteTitle.textContent = note.title;
  if (noteSubtitle) noteSubtitle.textContent = note.summary;
  if (noteContent) noteContent.textContent = note.content;
}

function setupDelete(noteId) {
  const deleteButton = document.querySelector('.action-delete');
  if (!deleteButton) return;

  deleteButton.addEventListener('click', () => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir esta nota?');
    if (confirmDelete) {
      storage.deleteNote(noteId);         
      window.location.href = '../../index.html';
    }
  });
}

function setupEdit(noteId) {
  const editButton = document.querySelector('.primary-button');
  if (!editButton) return;
  
  editButton.addEventListener('click', () => {
    window.location.href = `./create-notepad.html?id=${noteId}`;
  });
}