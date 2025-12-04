const toggleBtn = document.querySelector('.menu-toggle');
const toggleIcon = toggleBtn.querySelector('i');
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.sidebar-overlay');

function openSidebar() {
  sidebar.classList.add('is-open');
  overlay.classList.add('is-active');
  toggleIcon.classList.remove('fa-bars');
  toggleIcon.classList.add('fa-xmark');
}

function closeSidebar() {
  sidebar.classList.remove('is-open');
  overlay.classList.remove('is-active');
  toggleIcon.classList.remove('fa-xmark');
  toggleIcon.classList.add('fa-bars');
}

toggleBtn.addEventListener('click', () => {
  const isOpen = sidebar.classList.contains('is-open');
  isOpen ? closeSidebar() : openSidebar();
});

overlay.addEventListener('click', () => {
  closeSidebar();
});