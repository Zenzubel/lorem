function mobileMenu() {
  const media768 = window.matchMedia('(max-width: 767px)');
  const burger = document.querySelector('[data-burger]');

  if (burger && media768) {
    burger.addEventListener('click', () => {
      console.log('ssd');
    });
  }
}

document.addEventListener('DOMContentLoaded', mobileMenu);
