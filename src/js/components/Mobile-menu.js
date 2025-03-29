function mobileMenu() {
  const media768 = window.matchMedia('(max-width: 767px)');
  const burger = document.querySelector('[data-burger]');
  const close = document.querySelector('[data-close-mobile-menu]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');

  if (burger && media768) {
    burger.addEventListener('click', () => {
      mobileMenu.classList.add('active');
    });

    close.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    });
  }
}

document.addEventListener('DOMContentLoaded', mobileMenu);
