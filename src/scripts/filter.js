document.addEventListener('DOMContentLoaded', initFilters);

function initFilters() {
  const filterButtons = document.querySelectorAll('.sidebar-menu .menu-item');
  if (!filterButtons.length) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => handleFilterClick(button, filterButtons));
  });
}

function handleFilterClick(button, filterButtons) {
  const filter = button.dataset.filter;

  filterButtons.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');

  const noteCards = document.querySelectorAll('.note-card');

  noteCards.forEach(card => {
    const lang = card.dataset.lang;
    const shouldShow = filter === 'all' || filter === lang;
    card.style.display = shouldShow ? '' : 'none';
  });
}
