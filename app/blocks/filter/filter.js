import $ from 'jquery';
import * from 'jquery-ui';

export default () => {
  const control = $('.filter-control.division');

  $( "#tabs" ).tabs();

  control.click( function () {
      control.removeClass('division_active');
      $(this).toggleClass('division_active');
    });
};
