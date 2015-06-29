window.Portfolio = (function() {

	var $film,
		$grid,
		$fullview,

		start,
		end,

		current = 0,
		$currentFoto,

		filmWidth,
		contentWidth,
		sidebarWidth,

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

		filmWidth 		= $film.width();
		contentWidth 	= $('.site-content').width();
		sidebarWidth 	= $('.site-sidebar').width();

		getMiddlePoints();
		getReferenceBounds();

		$currentFoto 	= $film.find('.js-portfolio-item').first();
		getCurrent();
		bindEvents();
	},

	getCurrent = function() {
		var x = scroller.get('x'),
			reference = start + (end - start) * x / (filmWidth - contentWidth) + x,
			$next = $currentFoto,
			min = Math.abs(reference - current);

		$film.find('.js-portfolio-item').each(function(i, obj) {
			var compare = $(obj).data('middle');

			if (Math.abs(compare - reference) <= min) {
				min = Math.abs(compare - reference);
				$next = $(obj);
			}
		});

		setCurrent($next);
	},

	getReferenceBounds = function() {
		var $first 			= $film.find('.js-portfolio-item').first(),
			$last 			= $film.find('.js-portfolio-item').last();

		start 	= $first.data('middle') + ($first.next().data('middle') - $first.data('middle')) / 2;
		end 	= contentWidth - sidebarWidth - filmWidth + $last.prev().data('middle') + ($last.data('middle') - $last.prev().data('middle')) / 2;

		if (start > end) {
			end = contentWidth / 2 - sidebarWidth;
			start = end - 10;
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

	showThumbnails = function(e) {
		var $active = $('.portfolio__item--active'),
			$target = $grid.find('.js-portfolio-item').eq($active.data('count'));


		$grid.addClass('portfolio--visible');
		morph($active, $target);

		TweenMax.to($('.site-content__mask'), .3, {
			width: '100%',
			onComplete: function() {
				$film.removeClass('portfolio--visible');
				$('.site-content__mask').css('width', '');
			}
		});

		$(window).one('pxg:morph-end', function () {

		});

		$('html').addClass('scroll-x').removeClass('scroll-y');
	},

	showFilmstrip = function(e) {
		var $clicked = $(this),
			$target = $film.find('.js-portfolio-item').eq($clicked.data('count'));

		$('html').addClass('scroll-x').removeClass('scroll-y');

		var newx = $target.data('middle') - $('.site-content').width() / 2 + $('.site-sidebar').width();
		scroller.set('x', newx);

		$grid.removeClass('portfolio--visible');
		$film.addClass('portfolio--visible');

		morph($clicked, $target);
	},

	showFullView = function() {
		$fullview.addClass('fullview--visible');
	},

	hideFullView = function() {
		$fullview.removeClass('fullview--visible');
	},

	morph = function($source, $target) {
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

		$clone.appendTo($target);

		TweenMax.to($clone, .3, {
			x: targetOffset.left - sourceOffset.left + (targetWidth - sourceWidth) / 2,
			y: targetOffset.top - sourceOffset.top + (targetHeight - sourceHeight) / 2,
			scale: targetWidth / sourceWidth,
			force3D: true,
			ease: Quad.easeOut,
			onComplete: function() {
				$clone.remove();
				$target.css({
					position: '',
					'z-index': '',
					opacity: '',
					transition: ''
				});
			}
		});
		$(window).trigger('pxg:morph-end');
	},

	placehold = function() {
		$('.js-portfolio').each(function(i, obj) {
			var $portfolio  = $(obj),
				newHeight 	= $portfolio.height();
			$portfolio.find('.js-portfolio-item').each(function(i, obj) {
				placeholdImage($(obj), 'srcfull');
			});
		});
	},

	placeholdImage = function($item, src) {
		var src 		= typeof src === "undefined" ? 'srcfull' : src,
			width       = $item.data('width'),
			height      = $item.data('height'),
			newHeight   = $item.height(),
			newWidth    = newHeight * $item.data('width') / $item.data('height'),
			$image      = $(document.createElement('img'));

		$item.width(newWidth).height(newHeight);
		// $image.width(newWidth).height(newHeight)
		// 	.attr('src', $item.data('srcfull'))
		// 	.prependTo($item);
	},

	getMiddle = function($image) {
		return $image.offset().left + $image.width() / 2 - $film.offset().left;
	},

	updateCurrent = function(x, y) {

		var width = end - start,
			reference =  start + width * x / (filmWidth - contentWidth) + x,
			compare,
			$next;

		$('.js-reference').css('left', reference + 'px').text(parseInt(reference));

		if (reference >= current) {
			$next = $currentFoto.nextAll('.js-portfolio-item').first();
		} else {
			$next = $currentFoto.prevAll('.js-portfolio-item').first();;
		}

		compare = $next.data('middle');

		$('.js-compare').css('left', compare).text(parseInt(compare));

		if (Math.abs(compare - reference) <= Math.abs(reference - current)) {
			setCurrent($next);
		}
	},

	setCurrent = function($next) {
		$currentFoto = $next;
		$film.find('.js-portfolio-item').removeClass('portfolio__item--active');
		$currentFoto.addClass('portfolio__item--active');
		$('.portfolio__position').text($next.data('count') + 1 + ' of ' + $film.find('.js-portfolio-item').length);
		current = $currentFoto.data('middle');
		$('.js-last').css('left', current).text(parseInt(current));

		// prepare current for fullview

		var width = $currentFoto.data('width'),
			height = $currentFoto.data('height'),
			newWidth = $fullview.width(),
			newHeight = $fullview.height(),
			scaleX = newWidth / width,
			scaleY = newHeight / height,
			scale = Math.max(scaleX, scaleY),
			$image = $(document.createElement('img'));

		$image.css({
			'max-width': 'none',
			width: width * scale,
			height: height * scale
		});

		$fullview.find('.fullview__image').empty();
		$image
			.attr('src', $currentFoto.data('srcfull'))
			.prependTo($fullview.find('.fullview__image'));
	}

	return {
		init: init,
		getCurrent: getCurrent,
		updateCurrent: updateCurrent
	}
})();