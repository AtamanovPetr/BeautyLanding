document.addEventListener("DOMContentLoaded", () => {
  // 1. Код для работы стрелок слайдера услуг
  const carousel = document.querySelector(".services-carousel");
  const prevBtn = document.querySelector(".arrow-prev");
  const nextBtn = document.querySelector(".arrow-next");

  if (carousel && prevBtn && nextBtn) {
    const scrollStep = 390; // Ширина карточки (360px) + отступ (30px)

    nextBtn.addEventListener("click", () => {
      carousel.scrollLeft += scrollStep;
    });

    prevBtn.addEventListener("click", () => {
      carousel.scrollLeft -= scrollStep;
    });
  }

  // 2. Код для анимации появления при скролле (Intersection Observer)
  if ("IntersectionObserver" in window) {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -60px 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  } else {
    document
      .querySelectorAll(".reveal")
      .forEach((el) => el.classList.add("active"));
  }
});
