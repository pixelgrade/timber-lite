var Overlay = (function () {

	var $trigger,
		$overlay,
		isOpen;

	function init() {
		$trigger = $('.js-overlay-trigger');
		$overlay = $('.overlay');
		isOpen   = false;

		bindEvents();
	}

	function bindEvents() {
		// Toggle navigation on click
		$(document).on('click', '.js-overlay-trigger', navToggle);

		// Close menu with ESC key
		$(document).on('keydown' ,function(e) {
			if (e.keyCode == 27 && isOpen) {
				navToggle(e);
			}
		});
	}

	function open() {
		$overlay.css('left', 0);
		TweenMax.to($overlay, 0.3, {opacity: 1});
		$('html').css('overflow', 'hidden');
		isOpen = true;

		$('html, body, *').unbind('mousewheel', vertToHorScroll);
	}

	function close() {
		TweenMax.to($overlay, 0.3, {
			opacity: 0,
			onComplete: function () {
				$overlay.css('left', '100%');
			}
		});

		$('html').css('overflow', '');
		isOpen = false;

		bindVertToHorScroll();
	}


	function navToggle(e) {
		e.preventDefault();
		e.stopPropagation();

		if (isOpen) {
			close();
		} else {
			open();
		}
	}

	return {
		init: init,
		open: open,
		close: close
	}
})();