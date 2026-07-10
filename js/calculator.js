// Expresión escrita por el usuario mediante los botones de la calculadora.
let expression = '';

const display = document.getElementById('display');
const calculatorButtons = document.querySelectorAll('.calc-button');

function updateDisplay() {
  display.textContent = expression || '0';
}

function addValue(value) {
  if (display.textContent === 'Error') expression = '';
  expression += value;
  updateDisplay();
}

function clearCalculator() {
  expression = '';
  updateDisplay();
}

function calculateResult() {
  try {
    // Solo se permiten números, puntos y los cuatro operadores básicos.
    if (!expression || !/^[0-9+\-*/. ]+$/.test(expression)) throw new Error();
    const result = eval(expression);
    if (!Number.isFinite(result)) throw new Error();
    expression = String(Number(result.toFixed(10)));
    updateDisplay();
  } catch (error) {
    expression = '';
    display.textContent = 'Error';
  }
}

calculatorButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    const action = button.dataset.action;
    if (action === 'clear') clearCalculator();
    else if (action === 'calculate') calculateResult();
    else addValue(button.dataset.value);
  });
});

document.addEventListener('keydown', function (event) {
  if (/^[0-9+\-*/.]$/.test(event.key)) addValue(event.key);
  if (event.key === 'Enter') calculateResult();
  if (event.key === 'Escape' || event.key.toLowerCase() === 'c') clearCalculator();
});
