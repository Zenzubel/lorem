// ==========================================================================
// CSS utils
// ==========================================================================

const style = ($el, style) => {
  return +getComputedStyle($el)[style].replace(/[^\d]/g, '');
};

const isMatchMedia = (media) => window.matchMedia(`(max-width: ${media}px)`).matches;

const isMobile = isMatchMedia.bind(null, 900);

export default {
  style,
  isMatchMedia,
  isMobile,
};
