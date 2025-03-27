
const getHeaderHeight = () => {
  const $header = document.querySelector('.header');

  if (!$header) return;

  const height = $header.offsetHeight;

  document.documentElement.style.setProperty('--header-height', `${height}px`);
};

const addReadyClass = () => {
  document.firstElementChild.classList.add('is-ready');
};

const getDeviceHeight = () => {
  // We execute the same script as before
  const vh = window.innerHeight;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

const getDeviceStartHeight = () => {
  // We execute the same script as before
  const vh = window.innerHeight;
  document.documentElement.style.setProperty('--start-vh', `${vh}px`);
};

const getDeviceWidth = () => {
  const width = document.firstElementChild.clientWidth;
  document.documentElement.style.setProperty('--client-width', `${width}px`);
};

const onDOMReady = () => {
  getDeviceStartHeight();
  getHeaderHeight();
  getDeviceHeight();
  getDeviceWidth();
};

const onLoad = () => {
  getDeviceStartHeight();
  addReadyClass();
  getHeaderHeight();
  getDeviceHeight();
  getDeviceWidth();
};

const onResize = () => {
  getHeaderHeight();
  getDeviceHeight();
  getDeviceWidth();
};

onDOMReady();

document.addEventListener('DOMContentLoaded', onDOMReady);
window.addEventListener('load', onLoad);
window.addEventListener('resize', onResize);

export { getHeaderHeight };
