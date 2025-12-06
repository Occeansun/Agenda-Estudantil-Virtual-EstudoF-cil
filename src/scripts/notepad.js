import { getNoteById, deleteNote } from './storage.js';

// pega o ID da nota pela URL (ex: nota.html?id=abc123)
const urlParams = new URLSearchParams(window.location.search);
const noteId = urlParams.get('id');

if (!noteId) {
  alert('Nota não encontrada');
  window.location.href = '../../index.html';
}

const note = getNoteById(noteId);

if (!note) {
  alert('Nota não encontrada');
  window.location.href = '../../index.html';
}

// popula os elementos da página com os dados da nota
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

// botão de excluir
const deleteButton = document.querySelector('.action-delete');
if (deleteButton) {
  deleteButton.addEventListener('click', () => {
    const confirm = window.confirm('Tem certeza que deseja excluir esta nota?');
    if (confirm) {
      deleteNote(noteId);
      window.location.href = '../../index.html';
    }
  });
}
