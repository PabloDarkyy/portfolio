export function initClock() {
  const clock = document.getElementById('liveClock');
  function updateClock() {
    const time = new Intl.DateTimeFormat('es-PY', { timeZone: 'America/Asuncion', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date());
    clock.textContent = `${time} PY`;
  }
  updateClock();
  window.setInterval(updateClock, 1000);
}
