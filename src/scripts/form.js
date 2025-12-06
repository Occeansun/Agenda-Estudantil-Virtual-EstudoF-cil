const form = document.querySelector('.note-form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const title = document.querySelector('#title').value.trim();
  const summary = document.querySelector('#summary').value.trim();
  const content = document.querySelector('#content').value.trim();
  const activeCategory = document
    .querySelector('.category-pill.is-active')
    ?.textContent.trim().toLowerCase();

  const newNote = {
    id: crypto.randomUUID(),
    title,
    summary,
    content,
    category: activeCategory,
    createdAt: new Date().toISOString(),
  };

  const stored = JSON.parse(localStorage.getItem('notes') || '[]');
  stored.push(newNote);
  localStorage.setItem('notes', JSON.stringify(stored));

  window.location.href = '../../index.html';
});
