function activate(select, list, activeClass) {
  list.fadeIn(() => {
    select.addClass(activeClass);
  });
}

function deactivate(select, list, activeClass) {
  list.fadeOut(() => {
    select.removeClass(activeClass);
  });
}

function showLabel(el) {
  if (!el || el.length === 0) {
    return;
  }

  el.show();
}

function hideLabel(el) {
  if (!el || el.length === 0) {
    return;
  }

  el.hide();
}

function updateText(textElement, data) {
  const text = data.map(item => item.title).join(', ');
  textElement.text(text);
}

function generateList(select, data) {
  const ul = $('<ul></ul>')
    .addClass('list')
    .addClass('list_rounded')
    .addClass('list_has_triangle')
    .addClass('select__list');

  data.forEach((item) => {
    if (!item.disabled) {
      $('<li></li>')
        .addClass('list__item')
        .addClass('select__item')
        .text(item.title)
        .appendTo(ul);
    }
  });

  const existingList = select.find('.list');

  if (existingList.length) {
    existingList.replaceWith(ul);
  } else {
    select.append(ul);
  }
}

const SELECT_CLASS = '.select';
const SELECT_ACTIVE_CLASS = 'select_active';
const TEXT_CLASS = '.select__text';
const LIST_LABEL_CLASS = '.select__list-label';
const MULTIPLE_SELECT = 'multiple';
const LABEL_CLASS = '.select__label';
let selectedData = [];

export default () => {
  const selectElements = $(SELECT_CLASS);

  if (!selectElements.length) {
    return;
  }

  $(document).find(SELECT_CLASS).each(function () { // eslint-disable-line func-names
    const select = $(this);
    const textElement = select.find(TEXT_CLASS);

    if (!select.data(MULTIPLE_SELECT)) {
      const control = select.find('select');
      const options = Array.from(control.children());

      const optionsData = options.map((option) => {
        const el = $(option);

        return ({ value: el.val(), title: el.text(), disabled: el.attr('disabled') });
      });

      generateList(select, optionsData);

      const selectedOption = $(control.children()[control[0].selectedIndex]);
      const data = [{ value: selectedOption.val(), title: selectedOption.text() }];

      updateText(textElement, data);
    } else {
      const labelElement = select.find(LABEL_CLASS);
      updateText(textElement, [{ title: labelElement.text() }]);
    }
  });
};

const deactivateAll = () => {
  $(document).find(SELECT_CLASS).each(function () { // eslint-disable-line func-names
    const el = $(this);
    const list = el.find('ul');

    deactivate(el, list, SELECT_ACTIVE_CLASS);
  });
};

$(document).on('disable', SELECT_CLASS, function () { // eslint-disable-line func-names
  const el = $(this);

  el
    .addClass('select_disabled')
    .find('select__control')
    .prop('disabled', true);
});

$(document).on('enable', SELECT_CLASS, function () { // eslint-disable-line func-names
  const el = $(this);

  el
    .removeClass('select_disabled')
    .find('select__control')
    .prop('disabled', false);
});

$(document).on('click', `${SELECT_CLASS} li`, (e) => {
  const el = $(e.target);
  const control = el.parents(SELECT_CLASS).find('select');
  const list = el.parents('ul');

  if (control.length === 0) {
    return;
  }

  e.preventDefault();
  e.stopPropagation();

  deactivate(control.parent(), el.parent(), SELECT_ACTIVE_CLASS);

  const options = control.children();
  const nextSelected = list.children().length < options.length ? el.index() + 1 : el.index();

  options.eq(nextSelected).prop('selected', true);
  control.trigger('change');
});

$(document).on('change', '.select__control', function () { // eslint-disable-line func-names
  const control = $(this);
  const textElement = control.parent().find(TEXT_CLASS);
  const selectedOption = $(control.children()[control[0].selectedIndex]);
  const labelElement = control.parent().find(LABEL_CLASS);
  const data = [{ value: selectedOption.val(), title: selectedOption.text() }];

  updateText(textElement, data);

  if (selectedOption.prop('disabled')) {
    hideLabel(labelElement);
  } else {
    showLabel(labelElement);
  }
});

// handle show list (custom dropdown)
$(document).on('click', SELECT_CLASS, (e) => {
  const select = $(e.target);
  e.stopPropagation();

  if (!select.hasClass(SELECT_CLASS.slice(1))) {
    return;
  }

  deactivateAll();

  const list = select.find('ul');

  const toggleData = [select, list, SELECT_ACTIVE_CLASS];

  if (!select.hasClass(SELECT_ACTIVE_CLASS)) {
    activate(...toggleData);
  } else {
    deactivate(...toggleData);
  }
});

$(document).on('change', `${SELECT_CLASS} input[type="checkbox"]`, (e) => {
  const el = $(e.target);
  const li = el.parents('li');

  if (el.prop('checked')) {
    const title = li.find(LIST_LABEL_CLASS).text();
    selectedData.push({ value: el.val(), title });
  } else {
    selectedData = selectedData.filter(item => item.value !== el.val());
  }

  const select = el.parents(SELECT_CLASS);
  const textElement = select.find(TEXT_CLASS);
  const labelElement = select.find(LABEL_CLASS);

  if (selectedData.length > 0) {
    updateText(textElement, selectedData);
    showLabel(labelElement);
  } else {
    updateText(textElement, [{ title: labelElement.text() }]);
    hideLabel(labelElement);
  }
});

$(document).on('click', () => {
  deactivateAll();
});
