export function initProjectFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project-item');
  buttons.forEach((button) => button.addEventListener('click', () => {
    buttons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    projects.forEach((project) => {
      const visible = filter === 'all' || project.dataset.category === filter;
      if (visible) {
        project.style.display = '';
        requestAnimationFrame(() => project.classList.remove('filtered-out'));
      } else {
        project.classList.add('filtered-out');
        window.setTimeout(() => { if (project.classList.contains('filtered-out')) project.style.display = 'none'; }, 350);
      }
    });
  }));
}
