import noUiSlider from 'nouislider';
import wNumb from 'wnumb';
import 'nouislider/dist/nouislider.css';

function range() {
  const range = document.querySelector('[data-range]');

  if (range) {
    const handlesSlider = document.getElementById('range-rail');
    const value = document.getElementById('range-value');
    const setId = value.getAttribute('data-num-id');

    noUiSlider.create(handlesSlider, {
      start: 75,
      animate: false,
      range: {
        min: 0,
        max: 100,
      },
      format: wNumb({ decimals: 0 }),
    });

    handlesSlider.noUiSlider.on('update', function (values, handle) {
      value.innerHTML = `<span id="${setId}">${values[handle]}</span><span>%</span>`;
    });
  }
}

document.addEventListener('DOMContentLoaded', range);
