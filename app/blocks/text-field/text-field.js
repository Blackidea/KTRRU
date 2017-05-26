import $ from 'jquery';

// add error plugin
$.fn.addError = function addError(message = null) {
  const IS_TEXT_FIELD = this.hasClass('text-field');
  const textField = !IS_TEXT_FIELD ? this.parents('.text-field') : this;
  const errorElement = textField.find('.text-field__error');

  if (!errorElement || !textField || textField.length === 0) {
    return this;
  }

  errorElement.text(message);
  return textField.addClass('text-field_has_error');
};

// remove error plugin
$.fn.removeError = function removeError() {
  const IS_TEXT_FIELD = this.hasClass('text-field');
  const textField = !IS_TEXT_FIELD ? this.parents('.text-field') : this;
  const errorElement = textField.find('.text-field__error');

  if (!errorElement || !textField || textField.length === 0) {
    return this;
  }

  errorElement.text('');
  return textField.removeClass('text-field_has_error');
};

export default () => {
  const ELEMENT_CLASS = '.text-field';
  const CONTROL_CLASS = '.text-field__control';

  const element = $(ELEMENT_CLASS);

  if (!element) {
    return;
  }

  element.on('disable', function () { // eslint-disable-line func-names
    const el = $(this);

    el
      .addClass('text-field_disabled')
      .find(CONTROL_CLASS)
      .prop('disabled', true);
  });

  element.on('enable', function () { // eslint-disable-line func-names
    const el = $(this);

    el
      .removeClass('text-field_disabled')
      .find(CONTROL_CLASS)
      .prop('disabled', false);
  });

  element.find(CONTROL_CLASS).on('input', function () { // eslint-disable-line
    const el = $(this);

    if (el.parent().hasClass('text-field_disabled')) {
      return false;
    }

    el.attr('value', el.val());
  });
};
