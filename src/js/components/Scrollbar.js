import { OverlayScrollbars, ClickScrollPlugin } from 'overlayscrollbars';

import css from '@utils/css';

OverlayScrollbars.plugin(ClickScrollPlugin);

const defaultConfig = {
  selector: '[data-scrollbar]',

  attributes: {
    onlyDesktop: 'data-scrollbar-only-desktop',
    scrollLock: 'data-scroll-lock-scrollable',
  },

  options: {
    nativeScrollbarsOverlaid: {
      initialize: false,
    },
    // paddingAbsolute: false,
    // showNativeOverlaidScrollbars: true,
    // update: {
    //   elementEvents: [['img', 'load']],
    //   debounce: [0, 33],
    //   attributes: null,
    //   ignoreMutation: null,
    // },
    // overflow: {
    //   x: 'scroll',
    //   y: 'scroll',
    // },
    scrollbars: {
      theme: 'os-theme-custom',
      // visibility: 'auto',
      // autoHide: 'never',
      // autoHideDelay: 1300,
      // dragScroll: true,
      // clickScroll: false,
      // pointers: ['mouse', 'touch', 'pen'],
    },
  },
};

export default class Scrollbar {
  constructor($el, config) {
    this.$el = $el;
    this.config = Object.assign({}, defaultConfig, config);
    this.opts = this.config.options;
    this._isOnlyDesktop = this.$el.hasAttribute(this.config.attributes.onlyDesktop);

    if (this._isOnlyDesktop && css.isMobile()) return false;

    this.init();
  }

  init() {
    this.instance = OverlayScrollbars(this.$el, this.opts);

    this.instance.elements().padding.setAttribute(this.config.attributes.scrollLock, '');

    // this.instance.elements().viewport.addEventListener('touchstart', function (e) {
    //   e.preventDefault();
    // });

    this.$el.scrollbar = this.instance;
  }

  static init(selector = defaultConfig.selector, config = defaultConfig) {
    const $el = selector instanceof Element ? selector : document.querySelector(selector);

    return new Scrollbar($el, config);
  }

  static initAll(selector = defaultConfig.selector, config = defaultConfig) {
    const $els = document.querySelectorAll(selector);

    if ($els.length) {
      $els.forEach(($el) => Scrollbar.init($el, config));
    }
  }
}

Scrollbar.initAll();
