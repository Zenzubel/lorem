// import Swiper from 'swiper';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// document.addEventListener('DOMContentLoaded', () => {
//   function swiperHero(banner, pagination, navNext, navPrev) {
//     if (banner) {
//       const swiper = new Swiper(banner, {
//         modules: [Pagination, Navigation, Autoplay],
//         loop: true,
//         autoHeight: true,
//         slidesPerView: 1,
//         spaceBetween: 0,
//         freeMode: false,
//         centeredSlides: true,
//         allowTouchMove: false,
//         speed: 1600,
//         // autoplay: {
//         //   delay: 3500,
//         // },
//         pagination: {
//           el: pagination,
//           clickable: true,
//         },
//         navigation: {
//           nextEl: navNext,
//           prevEl: navPrev,
//         },
//         //   breakpoints: {
//         // 	768: {
//         // 	},
//         //   },
//       });
//     }
//   }
//   const swiperContainer = document.querySelector('.swiper-height-js');
//   const resizeObserver = new ResizeObserver((entries) => {
//     for (const entry of entries) {
//       const { height } = entry.contentRect;
//       swiperContainer.style.height = `${height}px`;
//     }
//   });
//   swiperHero(
//     '.js-hero-swiper',
//     '.js-hero-pagination',
//     '.js-hero-slider-next',
//     '.js-hero-slider-prev'
//   );
// });
