function newSelect() {
  const $selectCustom = document.querySelector('[data-select-custom]');

  if ($selectCustom) {
    const selectCustomTrigger = $selectCustom.querySelector('[data-trigger]');

    window.addEventListener('click', (event) => {
      const target = event.target;

      if (target.hasAttribute('data-trigger')) {
        $selectCustom.classList.add('active');
      } else if (target.hasAttribute('data-value')) {
        const value = target.getAttribute('data-value');
        selectCustomTrigger.setAttribute('data-trigger', value);
        addText('data-trigger');
        $selectCustom.classList.remove('active');
      } else {
        $selectCustom.classList.remove('active');
      }
    });

    selectCustomTrigger.addEventListener('blur', () => {
      $selectCustom.classList.remove('focus');
    });

    selectCustomTrigger.addEventListener('focus', () => {
      $selectCustom.classList.add('focus');
      $selectCustom.classList.add('active');
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        $selectCustom.classList.remove('active');
      }
    });

    function addText(data) {
      const el = $selectCustom.querySelectorAll(`[${data}]`);
      el.forEach((item) => {
        const value = item.getAttribute(data);
        item.innerHTML = '';
        item.innerText = value;
      });
    }
    addText('data-trigger');
    addText('data-value');
  }
}
document.addEventListener('DOMContentLoaded', newSelect);
