import disableScroll from 'disable-scroll';

export default class Dropdown {
  constructor(elementClass, activeClass = 'dropdown_active') {
    if (typeof elementClass !== 'string') {
      throw new Error('Dropdown class should be a string');
    }

    if (elementClass[0] !== '.') {
      throw new Error('Specify correct dropdown class');
    }

    const element = $(elementClass);

    if (!element) {
      throw new Error('Dropdown element not found on the page');
    }

    this.element = element;
    this.activeClass = activeClass;
  }

  show(cb = f => f) {
    this.element.fadeIn(() => {
      this.element.addClass(this.activeClass);
      disableScroll.on();
      cb();
    });
  }

  hide(cb) {
    this.element.fadeOut(() => {
      this.element.removeClass(this.activeClass);
      disableScroll.off();
      cb();
    });
  }
}
