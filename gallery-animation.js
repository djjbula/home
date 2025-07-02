// Evita duplicação do script se for carregado mais de uma vez
if (!window.galleryScriptLoaded) {
  window.galleryScriptLoaded = true;

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

          // Ativação de cor quando a row está no centro da tela
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

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("load", handleScroll);
}
