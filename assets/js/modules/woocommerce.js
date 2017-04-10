var Woocommerce = (function() {

	var $film,
		start, end,
		current,
		initialized = false,
		filmwidth,
		contentWidth,
		$portfolio_container,
		isLoadingProjects = false,
		sidebarWidth;

	function init() {
		initialized = true;
		$portfolio_container = $('.js-product-list');
		if ( $('.woocommerce.archive').length ) {
			$film = $('.js-product-list');
			$film.addClass('portfolio--filmstrip').addClass('portfolio--visible');
			//loadAllProducts();
		}

		betterWooThumbsNav();

		//if there are not sufficient posts to have scroll - load the next page also (prepending)
		var $last_child = $portfolio_container.children('.portfolio__item').last();
		if ( windowWidth - ( $last_child.offset().left + $last_child.width() ) > 0 ) {
			loadNextProducts();
		}

        resizeFilmstrip();
        prepare();

		var $first = $film.find('.js-portfolio-item').first().addClass('portfolio__item--active');
		setCurrent($first);
	}

	function setCurrent($current) {
		$('.product-list').find('.js-portfolio-item').removeClass('portfolio__item--active');

		$current.addClass('portfolio__item--active');
		var total_products;

		if ( ! empty($portfolio_container.data('totalposts')) ) {
			total_products = $portfolio_container.data('totalposts');
		} else {
			total_products = $film.find('.js-portfolio-item').not('.portfolio__item--clone').length;
		}
		$('.portfolio__position').text($current.data('count') + 1 + ' ' +  objectl10n.tCounter + ' ' + total_products);
	}

	function getMiddle($image) {
		return $image.offset().left + $image.width() / 2 - $film.offset().left;
	}

	function getMiddlePoints() {
		$('.portfolio').each(function(i, portfolio) {
			$(portfolio).find('.js-portfolio-item').each(function(i, obj) {
				var $obj = $(obj);
				$obj.data('middle', getMiddle($obj));
				$obj.data('count', i);
			});
		});

	}

	function getReferenceBounds() {

		if (typeof $film == "undefined") {
			return;
		}

		var $items 			= $film.find('.js-portfolio-item'),
			items 			= $items.length,
			max;

		if (items < 2) {
			return;
		}

		start 	= $items.eq(0).data('middle') + ($items.eq(1).data('middle') - $items.eq(0).data('middle')) / 2;
		end 	= contentWidth - filmWidth + $items.eq(items - 2).data('middle') + ($items.eq(items - 1).data('middle') - $items.eq(items - 2).data('middle')) / 2;

		max 	= Math.max(contentWidth/2 - start, end - contentWidth/2, 10);

		start   = contentWidth/2 - max;
		end 	= contentWidth/2 + max;
	}

	function resizeFilmstrip() {
		$('.portfolio__item').each(function(i, item) {

			var $item       = $(item),
				width       = $item.data('width'),
				height      = $item.data('height'),
				newHeight   = $item.height(),
				newWidth    = newHeight * $item.data('width') / $item.data('height');

			$item.width(newWidth);
		});
	}

	function onResize() {
		if ($('.woocommerce.archive').length) {
			resizeFilmstrip();
			getMiddlePoints();
			getReferenceBounds();
		}
	}

	function prepare() {

		if (!$('.woocommerce.archive').length) {
			//we are not in a single product so bail
			return;
		}

		filmWidth       = $film.width();
		contentWidth    = $('.site-content').width();
		sidebarWidth    = $('.site-sidebar').width();

		getMiddlePoints();
		getReferenceBounds();
	}

	// loop through each portfolio item and find the one closest to center
	function getCurrent() {

		if (!$('.woocommerce.archive').length) {
			return;
		}

		if (!initialized) {
			init();
		}

		var current 	= $('.portfolio__item--active').data('middle'),
			reference 	= latestKnownScrollX + start + (end - start) * latestKnownScrollX / (filmWidth - contentWidth),
			min 		= Math.abs(reference - current),
			$next;

		$film.find('.js-portfolio-item').each(function(i, obj) {
			var compare = $(obj).data('middle');

			if (Math.abs(compare - reference) < min) {
				min = Math.abs(compare - reference);
				$next = $(obj);
			}
		});

		if (typeof $next !== "undefined") {
			setCurrent($next);
		}
	}


	function loadAllProducts () {
		var offset = $portfolio_container.data('offset');

		if (globalDebug) {console.log("Loading All Products - AJAX Offset = " + offset);}

		isLoadingProjects = true;
		var args = {
			action : 'timber_load_next_products',
			nonce : timber_ajax.nonce,
			offset : offset,
			posts_number: 'all'
		};

		if ( ! empty($portfolio_container.data('taxonomy')) ) {
			args['taxonomy'] = $portfolio_container.data('taxonomy');
			args['term_id'] = $portfolio_container.data('term_id');
		}

		$.post(
			timber_ajax.ajax_url,
			args,
			function(response_data) {

				if( response_data.success ){
					if (globalDebug) {console.log("Loaded all products");}

					var $result = $( response_data.data.posts).filter('.portfolio__item');
					if (globalDebug) {console.log("Adding new "+$result.length+" items to the DOM");}

					$('.navigation').hide().remove();

					$result.imagesLoaded(function(){

						$portfolio_container.append( $result );

						//Placeholder.update();

						isLoadingProjects = false;

						resizeFilmstrip();

						prepare();

						onResize();

						getCurrent();
					});
				}
			}
		);
	}

	function loadNextProducts () {
		var offset = $portfolio_container.find('.portfolio__item').length;

		if (globalDebug) {console.log("Loading More Products - AJAX Offset = " + offset);}

		isLoadingProjects = true;

		var args = {
			action : 'timber_load_next_products',
			nonce : timber_ajax.nonce,
			offset : offset,
			posts_number: timber_ajax.posts_number
		};

		if ( !empty($portfolio_container.data('taxonomy')) ) {
			args['taxonomy'] = $portfolio_container.data('taxonomy');
			args['term_id'] = $portfolio_container.data('term_id');
		}

		$.post(
			timber_ajax.ajax_url,
			args,
			function(response_data) {

				if( response_data.success ){
					if (globalDebug) {console.log("Loaded next products");}

					var $result = $( response_data.data.posts).filter('.portfolio__item');

					if (globalDebug) {console.log("Adding new "+$result.length+" items to the DOM");}

					$result.imagesLoaded(function(){

						$portfolio_container.append( $result );

						//Placeholder.update();

						isLoadingProjects = false;

						resizeFilmstrip();

						prepare();

						onResize();

						getCurrent();

					});
				} else {
					//we have failed
					//it's time to call it a day
					if (globalDebug) {console.log("It seems that there are no more products to load");}

					$('.navigation').fadeOut();

					//don't make isLoadingProjects true so we won't load any more products
				}
			}
		);
	}

	function maybeloadNextProducts () {
		if (!$portfolio_container.length || isLoadingProjects ) {
			return;
		}

		var $lastChild = $portfolio_container.children('.portfolio__item').last();

		//if the last child is in view then load more products
		if ( $lastChild.is(':appeared') ) {
			loadNextProducts();
		}

	}

	function betterWooThumbsNav() {

		$('.thumbnails > a').on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();

			// When clicking a thumb image
			// change the main image url
			// and the main image src with the
			// thumbnail ones.

			var newImageURL = $(this).attr('href');
			var newImageSrc = $(this).data('medium-size-url');
			var newImageSrcset = $(this).data('medium-srcset');
			var $wooMainImage = $('.woocommerce-product-gallery__image');

			$wooMainImage.attr('href', newImageURL);
			$wooMainImage.find('img').attr('src', newImageSrc);
			$wooMainImage.find('img').attr('srcset', newImageSrcset);

			return false;
		});

		// Lightbox
		if ( typeof $.prettyPhoto !== "undefined" ) {

			$("a.woocommerce-main-image.zoom").prettyPhoto({
				hook: 'data-rel',
				social_tools: false,
				theme: 'pp_woocommerce',
				horizontal_padding: 20,
				opacity: 0.8,
				deeplinking: false
			});

			$("a[data-rel^='prettyPhoto']").prettyPhoto({
				hook: 'data-rel',
				social_tools: false,
				theme: 'pp_woocommerce',
				horizontal_padding: 20,
				opacity: 0.8,
				deeplinking: false
			});
		} else {
			$("a.woocommerce-main-image.zoom, a[data-rel^='prettyPhoto']").addClass('u-cursor-default').on( 'click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				return false;
			});
		}
	}

	function checkCart() {
		var $cart = $('.cart-widget');

		if( $cart ) {
			var $productCount = $cart.find('.cart-items-number');
			var $cartContent = $cart.find('.cart-widget-details');
			var shopURL = $cart.data('shop-url');
			var cartURL = $cart.data('cart-url');

			// if there is no product, hide cart details and change the URL to shop page
			if ( $productCount.html() == '0' ) {

				$cartContent.css('display', 'none');

				if( shopURL )
					$cart.find('.cart-widget-label').attr('href', shopURL);

				// add this to know that we f-ed it
				$cart.addClass('mod');

			} else if( $cart.hasClass('mod') ) {
				// now, if we f-ed it and there are products in cart, we reset it

				$cartContent.css('display', 'block');
				if( cartURL )
					$cart.find('.cart-widget-label').attr('href', cartURL);

			}

		}

	}

	function check_product_variations () {
		//wc_variation_form comes a little too late so we better wait for the js file to load
		var $variation_forms = $( '.variations_form' );
		if ( typeof wc_add_to_cart_variation_params !== 'undefined' ) {
			if ( $.fn.hasOwnProperty( 'wc_variation_form' ) ) {
				$variation_forms.wc_variation_form()
					.find('.variations select:eq(0)')
					.change();
			}
		}
	}

	return {
		init:               init,
		prepare:            prepare,
		onResize:           onResize,
		getCurrent:         getCurrent,
		resizeFilmstrip:    resizeFilmstrip,
		betterWooThumbsNav: betterWooThumbsNav,
		checkCart:          checkCart,
		check_product_variations: check_product_variations,
		loadAllProducts: loadAllProducts,
		loadNextProducts: loadNextProducts,
		maybeloadNextProducts: maybeloadNextProducts
	}
})();