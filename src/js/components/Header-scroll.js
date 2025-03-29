function headerScroll() {
  const $header = document.querySelector('[data-scroll-header]');

  if ($header) {
    window.addEventListener('scroll', function () {
      const scrollPosition = window.scrollY;
      if (scrollPosition === 0) {
        $header.classList.remove('active');
      } else {
        $header.classList.add('active');
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', headerScroll);
