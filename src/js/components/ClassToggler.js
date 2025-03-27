import { disablePageScroll, enablePageScroll } from 'scroll-lock';

import { isDescendant } from '@utils/elements';
import { extend } from '@utils/objects';

export default class ClassToggler {
  constructor($el, config) {
    this.config = extend({}, defaults, ClassToggler.defaults, config);

    this.$el = $el;
    this.$openBtns = [...document.querySelectorAll(this.config.selectors.openBtns)];
    this.$closeBtns = [...document.querySelectorAll(this.config.selectors.closeBtns)];
    this.$toggleBtns = [...document.querySelectorAll(this.config.selectors.toggleBtns)];
    this.$additionalElements = [...document.querySelectorAll(this.config.selectors.additionalEls)];

    this.id = this.$el.id;

    this._isOpen = false;

    this._checkId();

    this.superInit();
  }

  superInit() {
    // Bind toggle btns
    this.$toggleBtns.forEach(($btn) => $btn.addEventListener('click', this.toggle.bind(this)));

    // bind open btns
    this.$openBtns.forEach(($btn) => $btn.addEventListener('click', this.open.bind(this)));

    // bind close btns
    this.$closeBtns.forEach(($btn) => $btn.addEventListener('click', this.close.bind(this)));

    // bind close by document click
    if (this.config.closeOnDocumentClick) {
      document.addEventListener('click', this._documentClickHandler.bind(this));
    }
  }

  open(e) {
    this.$el.classList.add(this.config.classes.active);

    this.$additionalElements.forEach(($el) => $el.classList.add(this.config.classes.active));

    if (this.config.scrollLock) {
      disablePageScroll(this.$el);
    }

    this._isOpen = true;

    this._dispatchEvent(this.config.events.open);
  }

  close(e) {
    this.$el.classList.remove(this.config.classes.active);

    this.$additionalElements.forEach(($el) => $el.classList.remove(this.config.classes.active));

    if (this.config.scrollLock) {
      enablePageScroll(this.$el);
    }

    this._isOpen = false;

    this._dispatchEvent(this.config.events.close);
  }

  toggle(e) {
    if (!this._isOpen) {
      this.open(e);
    } else {
      this.close(e);
    }
  }

  _documentClickHandler(e) {
    // check, if e.target one of our btns (open, close or toggle);
    if (this._isTargetTriggerBtns(e)) return false;

    const isTargetChildOfEl = isDescendant(this.$el, e.target);

    if (this._isOpen && !isTargetChildOfEl) {
      this.close(e);
    }
  }

  _isTargetTriggerBtns(e) {
    // check, if e.target one of our btns (open, close or toggle);
    const allTriggersBtns = [...this.$toggleBtns, ...this.$openBtns, ...this.$closeBtns];

    for (const $btn of allTriggersBtns) {
      if (isDescendant($btn, e.target)) {
        return true;
      }
    }
  }

  _dispatchEvent(eventName, detail, $el = this.$el) {
    const selectEvent = new CustomEvent(eventName, {
      detail: detail,
    });

    $el.dispatchEvent(selectEvent);
  }

  _checkId() {
    const $equalIdEls = document.querySelectorAll(`#${this.id}`);

    if ($equalIdEls.length > 1) {
      this._throwError(errors.found.equalId, '', Error, $equalIdEls);
    }
  }

  _throwError(message = '', expected = '', ErrorType = TypeError, ...args) {
    expected = expected === '' ? '' : JSON.stringify(expected);

    args.length > 0 && console.error(args);

    throw new ErrorType(`${message} ${expected}`);
  }
}

const defaults = {
  closeOnDocumentClick: false,
  scrollLock: false, // locking <body> scroll

  classes: {
    active: 'active',
  },

  events: {
    open: ':open',
    close: ':close',
  },

  selectors: {
    el: '[data-class-toggler]',
    toggleBtns: '.j_toggle',
    openBtns: '.j_open',
    closeBtns: '.j_close',
    additionalEls: '.j_additional',
  },
};

const errors = {
  found: {
    equalId: 'Several elements with the same ID were found',
  },
};

ClassToggler.defaults = defaults;
