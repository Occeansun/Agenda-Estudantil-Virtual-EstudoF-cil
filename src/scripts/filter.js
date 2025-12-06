const filterButtons = document.querySelectorAll('.sidebar-menu .menu-item');
const noteCards = document.querySelectorAll('.note-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter; 

    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    noteCards.forEach(card => {
      const lang = card.dataset.lang; 
      const shouldShow = filter === 'all' || filter === lang;

      card.style.display = shouldShow ? '' : 'none';
    });
  });
});
