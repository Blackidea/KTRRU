/* eslint-disable */
import $ from 'jquery';

function ultraScroll(element) {
  // Задаем переменные
  var scrollPreWrapper = element,
    scrollBlock = element.find(".scrollable__content"),
    scrollWrapper = element.find(".scrollable__wrapper"),
    scrollSlide = element.find(".scrollable__slide"),
    scrollSlideVertical = element.find(".scrollable__slide_vertical"),
    sT, topBreakpoint, bottomBreakpoint,
    fixedClass = "fixed",
    finishClass = "finish",
    vH = $(window).height(),
    translate;

  // Расчет дефолтных значений
  function ultraScrollInit() {
    scrollSlideVertical.width( scrollPreWrapper.width() );
    scrollPreWrapper.height( scrollBlock.outerWidth() + scrollBlock.height() - scrollSlideVertical.outerWidth() );
    scrollWrapper.height( scrollBlock.outerWidth() + scrollBlock.height() - scrollSlideVertical.outerWidth() );

    topBreakpoint = scrollPreWrapper.offset().top;
    bottomBreakpoint = scrollPreWrapper.offset().top + scrollBlock.outerWidth() - scrollSlideVertical.outerWidth();
  }

  ultraScrollInit();

  // Обновляем значения при изменении размера окна
  $(window).on('resize', function(){
    ultraScrollInit();
  });

  // Функция скролла
  $(window).on('scroll', function(){
    sT = $(this).scrollTop();

    // Если мы выше скроллблока
    if (sT < topBreakpoint) {

      scrollWrapper
        .removeClass(fixedClass)
        .removeClass(finishClass)
        .css("top", "0");
      scrollBlock.css("transform", "translate3d(0, 0, 0)")

      // Если мы внутри скроллблока
    } else if (sT >= topBreakpoint && sT < bottomBreakpoint) {

      scrollWrapper.addClass(fixedClass).removeClass(finishClass).css("top", "0");

      translate = sT - topBreakpoint;
      if ( translate > scrollBlock.outerWidth() - scrollWrapper.width() ) {
        translate = scrollBlock.outerWidth() - scrollWrapper.width();
      }

      scrollBlock.css("transform", "translate3d(-" + translate + "px, 0, 0");

      // Если мы ниже скроллблока
    } else {
      translate = scrollBlock.outerWidth() - scrollWrapper.width();
      scrollBlock.css("transform", "translate3d(-" + translate + "px, 0, 0");
      scrollWrapper
        .removeClass(fixedClass)
        .addClass(finishClass)
        .css("top", scrollBlock.outerWidth() - scrollSlideVertical.outerWidth() );
    }
  });
}

export default () => {
  var blocks = $(".scrollable");

  if (!blocks.length || $(window).width() <= 1024) {
    return;
  }

  $(".scrollable").each(function(){
    ultraScroll( $(this) );
  });
}
/* eslint-enabled */
