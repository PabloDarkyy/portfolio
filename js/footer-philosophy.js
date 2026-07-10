export function initFooter() {
  const footerPhilosophy = document.getElementById("footerPhilosophy");

  if (!footerPhilosophy) return;

  const philosophyPhrases = [
    "Creo que el mejor software es el que resuelve problemas sin llamar la atención sobre sí mismo.",
    "Prefiero construir herramientas útiles antes que software impresionante.",
    "Cada proyecto comienza entendiendo el problema, no escribiendo código.",
    "La simplicidad es una decisión de diseño.",
    "La tecnología debe adaptarse a las personas, no al revés.",
    "Automatizar una tarea es devolver tiempo a quien la utiliza.",
    "Una buena interfaz casi nunca necesita ser explicada.",
    "Siempre busco la solución más simple que resuelva el problema correctamente."
  ];

  let currentPhrase = 0;
  let isAnimating = false;

  function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

 function renderPhrase(text, entering = false) {
  footerPhilosophy.innerHTML = "";

  const words = text.split(" ");
  let letterIndex = 0;

  words.forEach((word, wordIndex) => {
    const wordSpan = document.createElement("span");
    wordSpan.className = "word";

    [...word].forEach((letter) => {
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = letter;

      span.style.setProperty("--x", `${randomBetween(-28, 28)}px`);
      span.style.setProperty("--y", `${randomBetween(20, 44)}px`);
      span.style.setProperty("--r", `${randomBetween(-20, 20)}deg`);
      span.style.setProperty("--delay", `${Math.min(letterIndex * 0.018, 0.65)}s`);

      wordSpan.appendChild(span);
      letterIndex++;
    });

    footerPhilosophy.appendChild(wordSpan);

    if (wordIndex < words.length - 1) {
      const space = document.createElement("span");
      space.className = "space";
      space.innerHTML = "&nbsp;";
      footerPhilosophy.appendChild(space);
    }
  });

  if (entering) {
    footerPhilosophy.classList.add("is-entering");

    window.setTimeout(() => {
      footerPhilosophy.classList.remove("is-entering");
    }, 1900);
  }
}

  function renderDots() {
    footerPhilosophy.innerHTML = "";

    for (let i = 0; i < 3; i++) {
      const dot = document.createElement("span");
      dot.className = "dot";
      dot.textContent = ".";

      dot.style.setProperty("--x", `${randomBetween(-20, 20)}px`);
      dot.style.setProperty("--y", `${randomBetween(18, 36)}px`);
      dot.style.setProperty("--r", `${randomBetween(-25, 25)}deg`);

      footerPhilosophy.appendChild(dot);
    }
  }

  function resetDots() {
    const dots = footerPhilosophy.querySelectorAll(".dot");

    dots.forEach((dot) => {
      dot.style.opacity = "0";
      dot.style.transform = "translateY(8px) scale(0.75)";
    });
  }

  function changePhilosophyPhrase() {
  if (isAnimating) return;
  isAnimating = true;

  footerPhilosophy.classList.add("is-breaking");

  window.setTimeout(() => {
    footerPhilosophy.classList.remove("is-breaking");

    renderDots();
    footerPhilosophy.classList.add("is-thinking");
  }, 2400);

  window.setTimeout(() => {
    footerPhilosophy.classList.remove("is-thinking");
    footerPhilosophy.classList.add("is-thinking-pause");
  }, 3650);

  window.setTimeout(() => {
    footerPhilosophy.classList.remove("is-thinking-pause");
    footerPhilosophy.classList.add("is-dots-fade");
  }, 4300);

  window.setTimeout(() => {
    footerPhilosophy.classList.remove("is-dots-fade");

    resetDots();
    footerPhilosophy.classList.add("is-thinking-again");
  }, 4800);

  window.setTimeout(() => {
    footerPhilosophy.classList.remove("is-thinking-again");
    footerPhilosophy.classList.add("is-thinking-pause-again");
  }, 6050);

 window.setTimeout(() => {
  footerPhilosophy.classList.remove("is-thinking-pause-again");

  const dots = footerPhilosophy.querySelectorAll(".dot");

  dots.forEach((dot) => {
    dot.style.opacity = "1";
    dot.style.filter = "blur(0)";
    dot.style.transform = "translateY(0) scale(1)";
  });

  requestAnimationFrame(() => {
    footerPhilosophy.classList.add("is-dots-breaking");
  });
}, 6800);

  window.setTimeout(() => {
    footerPhilosophy.classList.remove("is-dots-breaking");

    currentPhrase = (currentPhrase + 1) % philosophyPhrases.length;
    renderPhrase(philosophyPhrases[currentPhrase], true);

    isAnimating = false;
  }, 7800);
}

  renderPhrase(philosophyPhrases[currentPhrase]);

  setInterval(changePhilosophyPhrase, 14000);
}