var Nav = (function() {
	var isOpen,
		$mobileHeader = $( '.mobile-header' );

	function init() {
		isOpen = false;
		onResize();
		bindEvents();
	}

	function bindEvents() {
		$( 'body' )
			.off( 'click', '.js-nav-toggle', toggle )
			.off( 'click', '.js-navigation-overlay', close )
			.on( 'click', '.js-nav-toggle', toggle )
			.on( 'click', '.js-navigation-overlay', close );
	}

	function toggle(e) {
		e.preventDefault();
		if ( isOpen ) {
			close();
		} else {
			open();
		}
	}

	function onResize() {
		$( '.js-nav-toggle' ).css( {
			position: 'fixed',
			top: $mobileHeader.outerHeight() / 2
		} );
	}

	function open() {
		$body.addClass( 'navigation--is-visible' );
		isOpen = true;
	}

	function close() {
		$body.removeClass( 'navigation--is-visible' );
		isOpen = false;
	}

	return {
		init: init,
		onResize: onResize,
		open: open,
		close: close
	}

})();