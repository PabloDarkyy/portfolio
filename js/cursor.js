export function initCursor() {
  if (!window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mouseX = -100, mouseY = -100, ringX = -100, ringY = -100;

  document.body.classList.add('cursor-ready');
  document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX; mouseY = event.clientY;
    dot.style.transform = `translate3d(${mouseX}px,${mouseY}px,0) translate(-50%,-50%)`;
  });
  function follow() {
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;
    ring.style.transform = `translate3d(${ringX}px,${ringY}px,0) translate(-50%,-50%)`;
    requestAnimationFrame(follow);
  }
  follow();

  document.querySelectorAll('a, button, input, textarea').forEach((element) => {
    element.addEventListener('mouseenter', () => ring.classList.add('hovering'));
    element.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
  });
  document.addEventListener('mousedown', (event) => {
    ring.classList.add('clicking');
    const ripple = document.createElement('span');
    ripple.className = 'click-ripple';
    ripple.style.left = `${event.clientX}px`; ripple.style.top = `${event.clientY}px`;
    document.body.appendChild(ripple);
    window.setTimeout(() => ripple.remove(), 600);
  });
  document.addEventListener('mouseup', () => ring.classList.remove('clicking'));

  document.querySelectorAll('.magnetic').forEach((element) => {
    element.addEventListener('mousemove', (event) => {
      const rect = element.getBoundingClientRect();
      element.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * .14}px, ${(event.clientY - rect.top - rect.height / 2) * .14}px)`;
    });
    element.addEventListener('mouseleave', () => { element.style.transform = ''; });
  });
}
