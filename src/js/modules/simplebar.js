import SimpleBar from 'simplebar';

Array.prototype.forEach.call(document.querySelectorAll('.simplebar'), (el) => new SimpleBar(el));
