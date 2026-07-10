export function initAnimations() {
  const revealElements = document.querySelectorAll('.reveal');
  const counters = document.querySelectorAll('.counter');
  const parallaxItems = document.querySelectorAll('[data-parallax]');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => revealObserver.observe(element));

  function animateCounter(element) {
    const target = Number(element.dataset.target);
    const start = performance.now();
    const duration = 1300;
    function tick(time) {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      element.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.7 });
  counters.forEach((counter) => counterObserver.observe(counter));

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    ticking = true;
    requestAnimationFrame(() => {
      parallaxItems.forEach((item) => {
        const speed = Number(item.dataset.parallax);
        item.style.transform = `translate3d(0, ${window.scrollY * speed}px, 0)`;
      });
      ticking = false;
    });
  }, { passive: true });
}
