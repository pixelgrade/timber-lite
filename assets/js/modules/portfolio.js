window.Portfolio = (function() {

	var $film, $grid, $fullview,
		start, end,
		current,

	init = function() {

		if (!$('.single-jetpack-portfolio').length) {
			placehold();
			return;
		}

		$film  		= $('.js-portfolio');
		$grid   	= $film.clone().insertBefore($film);
		$fullview 	= $('.fullview');

		$film.addClass('portfolio--filmstrip portfolio--visible');
		$grid.addClass('portfolio--grid');

		bindEvents();
	},

	prepare = function() {
	    filmWidth       = $film.width();
	    contentWidth    = $('.site-content').width();
	    sidebarWidth    = $('.site-sidebar').width();

		getMiddlePoints();
		getReferenceBounds();

		var $first = $film.find('.js-portfolio-item').first().addClass('portfolio__item--active');
		setCurrent($first);
	},

	bindEvents = function() {
		$('body').on('click', '.js-show-thumbnails', showThumbnails);
		$('.portfolio--grid').on('click', '.js-portfolio-item', showFilmstrip);
		$('.portfolio--filmstrip').on('click', '.js-portfolio-item', showFullView);
		$('.fullview__close').on('click', hideFullView);

		$('.js-details').on('mouseenter', function() {
			$film.addClass('portfolio--details');
		});

		$('.js-details').on('mouseleave', function() {
			$film.removeClass('portfolio--details');
		});
	},

	// loop through each portfolio item and find the one closest to center
	getCurrent = function() {

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
	},

	getReferenceBounds = function() {
		var $first 			= $film.find('.js-portfolio-item').first(),
			$last 			= $film.find('.js-portfolio-item').last();

		start 	= $first.data('middle') + ($first.next().data('middle') - $first.data('middle')) / 2;
		end 	= contentWidth - sidebarWidth - filmWidth + $last.prev().data('middle') + ($last.data('middle') - $last.prev().data('middle')) / 2;

		if (start > end) {
			end = contentWidth / 2 - sidebarWidth;
			start = end - 10;
			return;
		} else {
			start = start - 10;
			end = end + 10;
		}
	},

	getMiddlePoints = function() {
		$('.portfolio').each(function(i, portfolio) {
			$(portfolio).find('.js-portfolio-item').each(function(i, obj) {
				var $obj = $(obj);
				$obj.data('middle', getMiddle($obj));
				$obj.data('count', i);
			});
		});
	},

	showThumbnails = function(e) {
		var $active = $('.portfolio__item--active'),
			$target = $grid.find('.js-portfolio-item').eq($active.data('count'));

		morph($active, $target, {
			delay: .3
		});

		setTimeout(function() {
			$film.removeClass('portfolio--visible');
			$grid.addClass('portfolio--visible');
		}, 400);

		TweenMax.to($('.site-content__mask'), .6, {
			width: '100%',
			ease: Expo.easeInOut,
			onComplete: function() {
				// TweenMax.to($('.site-content__mask'), .3, {
				// 	opacity: 0,
				// 	ease: Quad.easeInOut,
				// 	delay: .3
				// });
				$('.site-content__mask').css('width', '');
			}
		});

	},

	showFilmstrip = function(e) {
		var $clicked = $(this),
			$target = $film.find('.js-portfolio-item').eq($clicked.data('count'));

		$('html').addClass('scroll-x').removeClass('scroll-y');

		var newx = $target.data('middle') - $('.site-content').width() / 2 + $('.site-sidebar').width();
		$window.scrollLeft(newx);

		$grid.removeClass('portfolio--visible');
		$film.addClass('portfolio--visible');

		morph($clicked, $target);
	},

	showFullView = function(e) {

		// prepare current for fullview
		var $source = $(this),
			width = $source.data('width'),
			height = $source.data('height'),
			newWidth = $fullview.width(),
			newHeight = $fullview.height(),
			scaleX = newWidth / width,
			scaleY = newHeight / height,
			scale = Math.max(scaleX, scaleY),
			$target = $('<div>').addClass('fullview__image'),
			$image = $(document.createElement('img'));

		$target.css({
			width: width * scale,
			height: height * scale,
			top: (height * scale - newHeight) / -2,
			left: (width * scale - newWidth) / -2
		});

		$fullview.append($target);

		$image
			.attr('src', $source.data('srcfull'))
			.prependTo($target);

		morph($source, $target);
		$fullview.addClass('fullview--visible');

	},

	hideFullView = function() {
		$fullview.removeClass('fullview--visible');
		$('.fullview__image').remove();
	},

	morph = function($source, $target, options) {
		var sourceOffset  = $source.offset(),
			sourceWidth   = $source.width(),
			sourceHeight  = $source.height(),
			targetOffset  = $target.offset(),
			targetWidth   = $target.width(),
			targetHeight  = $target.height(),
			$clone        = $source.clone();

		$clone.css({
			position: 'absolute',
			top: sourceOffset.top - targetOffset.top,
			left: sourceOffset.left - targetOffset.left,
			width: $source.width(),
			height: $source.height(),
			background: 'none'
		});

		$target.css({
			position: 'relative',
			'z-index': 10000,
			transition: 'none',
			opacity: 1
		});

		$target.children().css({
			'transition': 'none',
			'opacity': 0
		});


		var defaults = {
				x: targetOffset.left - sourceOffset.left + (targetWidth - sourceWidth) / 2,
				y: targetOffset.top - sourceOffset.top + (targetHeight - sourceHeight) / 2,
				scale: targetWidth / sourceWidth,
				force3D: true,
				ease: Expo.easeInOut,
				onComplete: function() {
					$clone.remove();
					$target.css({
						position: '',
						'z-index': '',
						transition: '',
						opacity: ''
					});
					$target.children().css('opacity', '');
				}
			},
			config = $.extend(defaults, options);

		requestAnimationFrame(function() {
			$clone.appendTo($target);
			TweenMax.to($clone, .5, config);
		});

		$(window).trigger('pxg:morph-end');
	},

	getMiddle = function($image) {
		return $image.offset().left + $image.width() / 2 - $film.offset().left;
	},

	setCurrent = function($current) {
		$film.find('.js-portfolio-item').removeClass('portfolio__item--active');
		$current.addClass('portfolio__item--active');
		$('.portfolio__position').text($current.data('count') + 1 + ' of ' + $film.find('.js-portfolio-item').length);
	}

	return {
		init: init,
		prepare: prepare,
		getCurrent: getCurrent
	}
})();