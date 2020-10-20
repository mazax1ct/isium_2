(function($) {

	var Defaults = $.fn.select2.amd.require('select2/defaults');

  $.extend(Defaults.defaults, {
  	dropdownPosition: 'auto'
  });

 	var AttachBody = $.fn.select2.amd.require('select2/dropdown/attachBody');

  var _positionDropdown = AttachBody.prototype._positionDropdown;

  AttachBody.prototype._positionDropdown = function() {

    var $window = $(window);

		var isCurrentlyAbove = this.$dropdown.hasClass('select2-dropdown--above');
		var isCurrentlyBelow = this.$dropdown.hasClass('select2-dropdown--below');

		var newDirection = null;

		var offset = this.$container.offset();

		offset.bottom = offset.top + this.$container.outerHeight(false);

		var container = {
    		height: this.$container.outerHeight(false)
		};

    container.top = offset.top;
    container.bottom = offset.top + container.height;

    var dropdown = {
      height: this.$dropdown.outerHeight(false)
    };

    var viewport = {
      top: $window.scrollTop(),
      bottom: $window.scrollTop() + $window.height()
    };

    var enoughRoomAbove = viewport.top < (offset.top - dropdown.height);
    var enoughRoomBelow = viewport.bottom > (offset.bottom + dropdown.height);

    var css = {
      left: offset.left,
      top: container.bottom
    };

    // Determine what the parent element is to use for calciulating the offset
    var $offsetParent = this.$dropdownParent;

    // For statically positoned elements, we need to get the element
    // that is determining the offset
    if ($offsetParent.css('position') === 'static') {
      $offsetParent = $offsetParent.offsetParent();
    }

    var parentOffset = $offsetParent.offset();

    css.top -= parentOffset.top
    css.left -= parentOffset.left;

    var dropdownPositionOption = this.options.get('dropdownPosition');

		if (dropdownPositionOption === 'above' || dropdownPositionOption === 'below') {

    		newDirection = dropdownPositionOption;

    } else {

        if (!isCurrentlyAbove && !isCurrentlyBelow) {
      			newDirection = 'below';
    		}

    		if (!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove) {
      		newDirection = 'above';
    		} else if (!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove) {
      		newDirection = 'below';
    		}

    }

    if (newDirection == 'above' ||
        (isCurrentlyAbove && newDirection !== 'below')) {
      css.top = container.top - parentOffset.top - dropdown.height;
    }

    if (newDirection != null) {
      this.$dropdown
        .removeClass('select2-dropdown--below select2-dropdown--above')
        .addClass('select2-dropdown--' + newDirection);
      this.$container
        .removeClass('select2-container--below select2-container--above')
        .addClass('select2-container--' + newDirection);
    }

    this.$dropdownContainer.css(css);

  };

})(window.jQuery);

$(document).ready(function () {
  //кастомный селект
	$('.js-select').each(function() {
   var $p = $(this).closest('.select-wrapper');
   $(this).select2({
		 minimumResultsForSearch: Infinity,
     dropdownPosition: 'below',
     dropdownParent: $p
   });
	});

	//кнопка "наверх"
	var btn = $('#go-top');

  $(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
      btn.addClass('is-active');
    } else {
      btn.removeClass('is-active');
    }
  });

  btn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop:0}, '300');
  });

	//запуск плавающего фильтра
  if ($(".js-content-with-sticky").length) {
    if ($("body").innerWidth() > 1199) {
      $(".js-sticky-block").trigger("sticky_kit:detach");
      setTimeout(function() {
        $(".js-sticky-block").stick_in_parent({
          offset_top: 190
        });
      }, 100);

			$(".js-sticky-block2").trigger("sticky_kit:detach");
      setTimeout(function() {
        $(".js-sticky-block2").stick_in_parent({
          offset_top: 100
        });
      }, 100);
    }
  }

	//попапы
	$('[data-fancybox]').fancybox({
		closeExisting: true,
		hash: false,
		autoFocus: false,
		touch: false
	});
});

//открепляем и перезапускаем прилипающий блок при резайзе
$(window).resize(function() {
  if ($(".js-content-with-sticky").length) {
    if ($("body").innerWidth() > 1199) {
      $(".js-sticky-block").trigger("sticky_kit:detach");
      setTimeout(function() {
        $(".js-sticky-block").stick_in_parent({
          offset_top: 190
        });
      }, 100);

			$(".js-sticky-block2").trigger("sticky_kit:detach");
      setTimeout(function() {
        $(".js-sticky-block2").stick_in_parent({
          offset_top: 100
        });
      }, 100);
    }
  }
});

//открепляем и перезапускаем прилипающий блок при повороте устройства
$(window).on("orientationchange", function(event) {
  if ($(".js-content-with-sticky").length) {
    if ($("body").innerWidth() > 1199) {
      $(".js-sticky-block").trigger("sticky_kit:detach");
      setTimeout(function() {
        $(".js-sticky-block").stick_in_parent({
          offset_top: 190
        });
      }, 100);

			$(".js-sticky-block2").trigger("sticky_kit:detach");
      setTimeout(function() {
        $(".js-sticky-block2").stick_in_parent({
          offset_top: 100
        });
      }, 100);
    }
  }
});

//закрытие попапа
$(document).on('click', '.js-popup-close', function () {
	$.fancybox.close();
	return false;
});

//открытие сайдбара
/*$(document).on('click', '.js-sidebar-toggler', function () {
	$('.sidebar').toggleClass('is-open');
	return false;
});*/

//открытие меню аккаунта
$(document).on('click', '.js-head-toggler', function () {
	$('.head').toggleClass('is-open');
	document.addEventListener('click', closeHead);
	return false;
});

function closeHead(evt) {
  if (!$('.head').is(evt.target) && $('.head').has(evt.target).length === 0) {
    $('.head').removeClass('is-open');
    document.removeEventListener('click', closeHead);
	}
}

$(document).on('mouseenter', '.js-head-toggler', function () {
	$('.head').addClass('is-open');
	document.addEventListener('click', closeHead);
	return false;
});

//открытие блока управления публикацией
$(document).on('click', '.js-manage-toggler', function () {
	$(this).closest('.article__manage-block').find('.manage-popover').toggleClass('is-open');
	return false;
});

//открытие скрытого текста в комментарии
$(document).on('click', '.js-read-more', function () {
	$(this).closest('.comment__text').find('span').show();
	$(this).css('display', 'none');
	return false;
});

//открытие блока с фильтром публикаций
var targetElement = $('.articles__filter');

$(document).on('click', '.js-filter-toggler', function () {
	$(this).toggleClass("is-active");
  $('.articles__filter').toggleClass('is-open');
  if($(this).hasClass('is-active')) {
    bodyScrollLock.disableBodyScroll(targetElement);
  } else {
    bodyScrollLock.enableBodyScroll(targetElement);
  }
	if($('body').innerWidth() < 1200) {
		$('.go-top').toggleClass('hidden');
	}
	return false;
});

//тогглер таблицы
$(document).on('click', '.js-drop-toggler', function () {
	$(this).toggleClass("is-open");
	$('.drop[data-target='+ $(this).attr('data-target') +']').toggleClass('is-active');
	return false;
});

//очистка поля ввода
$("[contenteditable]").focusout(function(){
	var element = $(this);
	if (!element.text().trim().length) {
  	element.empty();
	}
});

//открытие/закрытие блока добавления тега
$(document).on('click', '.js-tag-block-toggle', function () {
	$(this).next('.tag-block__dropdown').toggleClass("is-open");
	return false;
});

//открытие/закрытие блока статистики публикаций
$(document).on('click', '.js-statistic-toggler', function () {
	$(this).toggleClass('is-open');
	$('.statistic__dropdown').slideToggle();
	return false;
});
