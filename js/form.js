export function initForm() {
  const form = document.getElementById('contactForm');
  const fields = {
    name: { input: document.getElementById('name'), error: document.getElementById('nameError') },
    email: { input: document.getElementById('email'), error: document.getElementById('emailError') },
    message: { input: document.getElementById('message'), error: document.getElementById('messageError') }
  };
  const charCount = document.getElementById('charCount');
  const success = document.getElementById('formSuccess');

  const validators = {
    name: (value) => value.trim().length >= 2 ? '' : 'Escribe al menos 2 caracteres.',
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? '' : 'Escribe un correo electrónico válido.',
    message: (value) => value.trim().length < 10 ? 'Escribe al menos 10 caracteres.' : value.length > 600 ? 'Mantén el mensaje por debajo de 600 caracteres.' : ''
  };

  function validateField(name) {
    const field = fields[name];
    const error = validators[name](field.input.value);
    field.error.textContent = error;
    field.input.classList.toggle('is-invalid', Boolean(error));
    field.input.setAttribute('aria-invalid', Boolean(error));
    return !error;
  }

  Object.keys(fields).forEach((name) => {
    fields[name].input.addEventListener('blur', () => validateField(name));
    fields[name].input.addEventListener('input', () => {
      if (fields[name].input.classList.contains('is-invalid')) validateField(name);
      success.classList.remove('show');
    });
  });
  fields.message.input.addEventListener('input', () => { charCount.textContent = `${fields.message.input.value.length} / 600`; });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const valid = Object.keys(fields).map(validateField).every(Boolean);
    if (!valid) {
      form.querySelector('.is-invalid')?.focus();
      return;
    }
    success.classList.add('show');
    const subject = encodeURIComponent(`Consulta desde el portafolio de ${fields.name.input.value.trim()}`);
    const body = encodeURIComponent(`${fields.message.input.value.trim()}\n\nDe: ${fields.name.input.value.trim()} (${fields.email.input.value.trim()})`);
    window.setTimeout(() => { window.location.href = `mailto:pabloagustinbernal3@gmail.com?subject=${subject}&body=${body}`; }, 650);
  });
}
