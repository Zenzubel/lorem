import ClassToggler from '@components/ClassToggler';
import { extend } from '@utils/objects';

const _instances = {};

export default class Modal extends ClassToggler {
  constructor($el, config = {}) {
    config = extend(
      {},
      defaults,
      Modal.defaults,
      window.modalDefaults || {},
      config,
      (() => {
        try {
          return JSON.parse($el.getAttribute('data-modal') || '{}');
        } catch (_) {
          console.error(_, $el);
          return {};
        }
      })()
    );

    super($el, config);

    this._zIndex = 10;

    this._isMouseDownTargetEl = false;
    this._isMouseUpTargetNotEl = false;
  }

  superInit() {
    this.$openBtns = [
      ...document.querySelectorAll(this.config.selectors.openBtns.replace('$0', this.id)),
    ];

    super.superInit();
    this.init();
  }

  init() {
    if (this.config.openOnLoad) this.open();

    // bind prevent to close by click && mousemove
    this.$el.addEventListener('mousedown', (e) => {
      this._isMouseDownTargetEl = e.target !== e.currentTarget;
    });

    this.$el.addEventListener('mouseup', (e) => {
      this._isMouseUpTargetNotEl = e.target === e.currentTarget;

      // check, if target for mousemove after mousedown if preventCloseOnMouseMove=true
      if (
        this.config.preventCloseOnMouseMove &&
        this._isMouseDownTargetEl &&
        this._isMouseUpTargetNotEl
      ) {
        return false;
      }

      if (e.target === e.currentTarget) {
        this.close();
      }
    });

    // Esc trigger
    window.addEventListener('keydown', (e) => {
      if (e.defaultPrevented) return;

      const key = e.key || e.keyCode;
      const isEscape = key === 'Escape' || key === 'Esc' || key === 27;

      if (this._isOpen && isEscape) {
        this.close();
      }
    });

    this.$el.modal = this;
    _instances[this.id] = this;

    this._dispatchEvent(this.config.events.init, this);
  }

  open(e) {
    super.open(e);

    if (this.config.openOnFocus) {
      setTimeout(() => this.$el.querySelector('.input').focus(), 100);
    }

    this._incZIndex();
  }

  close(e) {
    super.close(e);

    this._normilizeZIndex();
  }

  _incZIndex() {
    const maxZIndex = Modal.getMaxZIndex();

    this.$el.style.zIndex = maxZIndex + 1;
    this._zIndex = maxZIndex + 1;
  }

  _normilizeZIndex() {
    this.$el.style.zIndex = '';
    this._zIndex = 10;
  }

  static initAll() {
    const $els = document.querySelectorAll(defaults.selectors.el);

    return [...$els].map(($el) => new Modal($el));
  }

  static closeAll() {
    for (const id in _instances) {
      _instances[id].close();
    }
  }

  static open(id) {
    _instances[id].open();
  }

  static close(id) {
    _instances[id].close();
  }

  static getMaxZIndex() {
    const zIndexArray = Object.keys(_instances).map((key) => _instances[key]._zIndex);

    return Math.max(...zIndexArray);
  }
}

const defaults = {
  closeOnDocumentClick: false,
  scrollLock: true,
  openOnLoad: false,
  openOnFocus: false,
  preventCloseOnMouseMove: true,

  classes: {
    active: 'active',
  },

  events: {
    init: 'modal:init',
    open: 'modal:open',
    close: 'modal:close',
  },

  selectors: {
    el: '[data-modal]', // READONLY
    toggleBtns: '.j_toggleModal',
    openBtns: '[data-modal-target="#$0"]',
    closeBtns: '.j_closeModal',
    additionalEls: '.j_additionalEl',
  },
};

Modal.defaults = defaults;

window.Modal = Modal;

Modal.initAll();
