document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // 1. ДВИЖОК ДЛЯ СЛАЙДЕРА УСЛУГ (БЕЗ ЛАГОВ И С АВТОСКРЫТИЕМ СТРЕЛОК)
  // ==========================================================================
  const carousel = document.querySelector(".services-carousel");
  const prevBtn = document.querySelector(".arrow-prev");
  const nextBtn = document.querySelector(".arrow-next");

  if (carousel && prevBtn && nextBtn) {
    const scrollStep = 390; // 360px (ширина карточки) + 30px (отступ gap)
    let isScrolling = false; // Блокировщик спам-кликов

    // Функция плавной нативной прокрутки ленты
    const smoothScrollTo = (targetLeft) => {
      if (isScrolling) return; // Игнорируем клики, пока идет текущая анимация
      isScrolling = true;

      carousel.scrollTo({
        left: targetLeft,
        behavior: "smooth",
      });

      // Разблокируем клики строго после завершения движения карточки
      setTimeout(() => {
        isScrolling = false;
      }, 400);
    };

    // Клик по стрелке "Вперед"
    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      smoothScrollTo(carousel.scrollLeft + scrollStep);
    });

    // Клик по стрелке "Назад"
    prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      smoothScrollTo(carousel.scrollLeft - scrollStep);
    });

    // Умное скрытие стрелок на границах карусели
    const toggleArrows = () => {
      // Скрываем левую стрелку на первой карточке
      if (carousel.scrollLeft <= 5) {
        prevBtn.style.opacity = "0";
        prevBtn.style.pointerEvents = "none";
      } else {
        prevBtn.style.opacity = "1";
        prevBtn.style.pointerEvents = "auto";
      }

      // Скрываем правую стрелку на последней карточке
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
      if (carousel.scrollLeft >= maxScroll - 5) {
        nextBtn.style.opacity = "0";
        nextBtn.style.pointerEvents = "none";
      } else {
        nextBtn.style.opacity = "1";
        nextBtn.style.pointerEvents = "auto";
      }
    };

    // Привязываем проверку к скроллу и вызываем один раз на старте
    carousel.addEventListener("scroll", toggleArrows);
    toggleArrows();
  }

  // ==========================================================================
  // 2. УМНАЯ АНИМАЦИЯ ПОЯВЛЕНИЯ БЛОКОВ ПРИ СКРОЛЛЕ (INTERSECTION OBSERVER)
  // ==========================================================================
  if ("IntersectionObserver" in window) {
    const observerOptions = {
      root: null, // Отслеживаем появление относительно экрана девайса
      rootMargin: "0px 0px -60px 0px", // Срабатывает чуть раньше дохождения до низа экрана
      threshold: 0.1, // Запуск при появлении 10% площади элемента
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        // Когда блок пересекает область видимости экрана
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          // Отключаем слежку, чтобы не перегружать процессор при повторном скролле
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Находим все элементы с классом .reveal и включаем за ними слежку
    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Резервный план: если браузер совсем устарел, сразу показываем все блоки
    document
      .querySelectorAll(".reveal")
      .forEach((el) => el.classList.add("active"));
  }
});
