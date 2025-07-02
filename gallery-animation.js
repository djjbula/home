window.addEventListener("load", () => {
  let ticking = false;

  function handleScroll() {
    const scrollY = window.scrollY;

    document.querySelectorAll(".gallery .row").forEach((row, index) => {
      // Parallax horizontal
      const speedFactor = 0.3;
      const baseOffset = index % 2 === 0 ? -200 : -650;
      const offset = baseOffset + (index % 2 === 0 ? -scrollY * speedFactor : scrollY * speedFactor);
      row.style.transform = `translateX(${offset}px)`;

      // Detecção de visibilidade (mobile)
      const rect = row.getBoundingClientRect();
      const rowMiddle = rect.top + rect.height / 2;
      const viewportMiddle = window.innerHeight / 2;

      if (Math.abs(rowMiddle - viewportMiddle) < rect.height / 2) {
        row.classList.add("in-view");
      } else {
        row.classList.remove("in-view");
      }
    });

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll);
  handleScroll(); // Executa ao carregar
});
