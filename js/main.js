import { initTheme } from './theme.js';
import { initNavigation } from './navigation.js';
import { initAnimations } from './animations.js';
import { initCursor } from './cursor.js';
import { initForm } from './form.js';
import { initProjectFilters } from './projects.js';
import { initClock } from './clock.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initAnimations();
  initCursor();
  initForm();
  initProjectFilters();
  initClock();
  document.getElementById('currentYear').textContent = new Date().getFullYear();
});

window.addEventListener('load', () => {
  const loader = document.getElementById('pageLoader');
  loader.classList.add('loaded');
  window.setTimeout(() => loader.remove(), 1100);
  window.setTimeout(() => document.body.classList.add('ready'), 180);
});
