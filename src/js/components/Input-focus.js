function inputFocus() {
  const form = document.getElementById('myForm');
  if (form) {
    const getFile = form.querySelector('#file');

    getFile.addEventListener('focus', () => {
      getFile.parentElement.classList.add('focus');
    });

    getFile.addEventListener('blur', () => {
      getFile.parentElement.classList.remove('focus');
    });
  }
}

document.addEventListener('DOMContentLoaded', inputFocus);
