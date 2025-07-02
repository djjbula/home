document.addEventListener("DOMContentLoaded", () => {
  let lastScrollY = window.scrollY;
  let ticking = false;

  function handleScroll() {
    lastScrollY = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        document.querySelectorAll(".gallery .row").forEach((row, index) => {
          // Parallax
          let speedFactor = 0.3;
          let baseOffset = index % 2 === 0 ? -200 : -650;
          let speed = baseOffset + (index % 2 === 0 ? -lastScrollY * speedFactor : lastScrollY * speedFactor);
          row.style.transform = `translateX(${speed}px)`;

          // Ativação de cor
          let rect = row.getBoundingClientRect();
          let rowMiddle = rect.top + rect.height / 2;
          let viewportMiddle = window.innerHeight / 2;

          if (Math.abs(rowMiddle - viewportMiddle) < rect.height / 2) {
            row.classList.add("in-view");
          } else {
            row.classList.remove("in-view");
          }
        });
        ticking = false;
      });
      ticking = true;
    }
  }

  console.log("✅ JS ativo e DOM carregado");
  console.log("ROWS:", document.querySelectorAll(".gallery .row").length);

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("load", handleScroll);
});
