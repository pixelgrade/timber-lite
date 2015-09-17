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
			loadAllProjects();
		}
	}

	function setCurrent($current) {
		$('.product-list').find('.js-portfolio-item').removeClass('portfolio__item--active');

		$current.addClass('portfolio__item--active');
		$('.portfolio__position').text($current.data('count') + 1 + ' of ' + $film.find('.js-portfolio-item').not('.portfolio__item--clone').length);
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
			//we are not in a single project so bail
			return;
		}

		filmWidth       = $film.width();
		contentWidth    = $('.site-content').width();
		sidebarWidth    = $('.site-sidebar').width();

		getMiddlePoints();
		getReferenceBounds();

		var $first = $film.find('.js-portfolio-item').first().addClass('portfolio__item--active');
		setCurrent($first);
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






	function loadAllProjects () {
		var offset = $portfolio_container.find('.portfolio--project').length;

		if (globalDebug) {console.log("Loading All Projects - AJAX Offset = " + offset);}

		isLoadingProjects = true;

		var args = {
			action : 'timber_load_next_products',
			nonce : timber_ajax.nonce,
			offset : offset,
			posts_number: 'all'
		};

		if ( !empty($portfolio_container.data('taxonomy')) ) {
			args['taxonomy'] = $portfolio_container.data('taxonomy');
			args['term_id'] = $portfolio_container.data('termid');
		}

		$.post(
			timber_ajax.ajax_url,
			args,
			function(response_data) {

				if( response_data.success ){
					if (globalDebug) {console.log("Loaded all projects");}

					var $result = $( response_data.data.posts).filter('li');
					if (globalDebug) {console.log("Adding new "+$result.length+" items to the DOM");}

					$('.navigation').hide().remove();

					$result.imagesLoaded(function(){

						$portfolio_container.append( $result );

						//Placeholder.update();

						isLoadingProjects = false;

						var $first = $film.find('.js-portfolio-item').first().addClass('portfolio__item--active');

						setCurrent($first);

						resizeFilmstrip();

						prepare();

						onResize();

						$(window ).trigger('scroll');
					});
				}
			}
		);
	}

	function loadNextProjects () {
		var offset = $portfolio_container.find('.portfolio--project').length;

		if (globalDebug) {console.log("Loading More Projects - AJAX Offset = " + offset);}

		isLoadingProjects = true;

		var args = {
			action : 'timber_load_next_projects',
			nonce : timber_ajax.nonce,
			offset : offset
		};

		if ( !empty($portfolio_container.data('taxonomy')) ) {
			args['taxonomy'] = $portfolio_container.data('taxonomy');
			args['term_id'] = $portfolio_container.data('termid');
		}

		$.post(
			timber_ajax.ajax_url,
			args,
			function(response_data) {

				if( response_data.success ){
					if (globalDebug) {console.log("Loaded next projects");}

					var $result = $( response_data.data.posts).filter('article');

					if (globalDebug) {console.log("Adding new "+$result.length+" items to the DOM");}

					$result.imagesLoaded(function(){

						$portfolio_container.append( $result );

						Placeholder.update();

						isLoadingProjects = false;
					});
				} else {
					//we have failed
					//it's time to call it a day
					if (globalDebug) {console.log("It seems that there are no more projects to load");}

					$('.navigation').fadeOut();

					//don't make isLoadingProjects true so we won't load any more projects
				}
			}
		);
	}

	function maybeloadNextProjects () {
		if (!$portfolio_container.length || isLoadingProjects ) {
			return;
		}

		var $lastChild = $portfolio_container.children('article').last();

		//if the last child is in view then load more projects
		if ( $lastChild.is(':appeared') ) {
			loadNextProjects();
		}

	}

	return {
		init: init,
		prepare: prepare,
		onResize: onResize,
		getCurrent: getCurrent,
		resizeFilmstrip: resizeFilmstrip
	}
})();