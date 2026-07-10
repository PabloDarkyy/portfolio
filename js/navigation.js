export function initNavigation() {
  const nav = document.getElementById('mainNav');
  const progress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');
  const sections = document.querySelectorAll('main section[id]');
  const links = document.querySelectorAll('.nav-link');

  function updateScrollUI() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    nav.classList.toggle('scrolled', y > 30);
    backToTop.classList.toggle('visible', y > 700);
    progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;

    let current = 'home';
    sections.forEach((section) => {
      if (y >= section.offsetTop - 180) current = section.id;
    });
    links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
  }

  window.addEventListener('scroll', updateScrollUI, { passive: true });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  links.forEach((link) => link.addEventListener('click', () => {
    const menu = document.getElementById('navbarMenu');
    if (menu.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(menu).hide();
  }));
  updateScrollUI();
}
