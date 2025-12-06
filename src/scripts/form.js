const form = document.querySelector('.note-form');

const categoryButtons = document.querySelectorAll('.category-pill');

categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    categoryButtons.forEach(b => b.classList.remove('is-active'));
    button.classList.add('is-active');
  });
});

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const title = document.querySelector('#title').value.trim();
  const summary = document.querySelector('#summary').value.trim();
  const content = document.querySelector('#content').value.trim();

  const activeCategory = document
    .querySelector('.category-pill.is-active')
    ?.textContent.trim().toLowerCase();

  if (!title || !content) {
    alert('Por favor, preencha o título e o conteúdo.');
    return;
  }

  if (!activeCategory) {
    alert('Por favor, selecione uma categoria.');
    return;
  }

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
