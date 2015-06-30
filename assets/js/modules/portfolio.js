window.Portfolio = (function() {

	var $film, $grid, $fullview,
		start, end,
		current,

		fullviewWidth = windowWidth,
		fullviewHeight = windowHeight,

	init = function() {

		if (!$('.single-jetpack-portfolio').length) {
			placehold();
			return;
		}

		$film  		= $('.js-portfolio');
		$grid   	= $film.clone().insertBefore($film);
		$fullview 	= $('.fullview');

		$film.addClass('portfolio--filmstrip portfolio--visible');
		$grid.addClass('portfolio--grid').find('.js-portfolio-item img').hide();

		addMetadata();
		bindEvents();
	},

	addMetadata = function() {
		$film.find('.js-portfolio-item').each(function(i, obj) {
			var $item 			= $(obj),
				captionText 	= 'This is a caption text',
				$caption 		= $('<div class="photometa__caption"></div>').html(captionText),
				descriptionText = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable",
				$description	= $('<div class="photometa__description"></div>').html('<div>' + descriptionText + '</div>'),
				$exif 			= $('<ul class="photometa__exif  exif"></ul>'),
				$meta 			= $('<div class="portfolio__meta  photometa"></div>')
				exifText		= {
					camera: 'Canon EOS-1D',
					focal: 'f/1.4',
					aperture: '22mm',
					exposure: '30',
					iso: '6400'
				};

			$.each(exifText, function(key, value) {
				$('<li class="exif__item"><i class="exif__icon exif__icon--' + key +'"></i>' + value + '</li>').appendTo($exif);
			});

			$caption.appendTo($meta);
			$exif.appendTo($meta);
			$description.appendTo($meta);

			$meta.appendTo($item);
		});
	},

	prepare = function() {
	    filmWidth       = $film.width();
	    contentWidth    = $('.site-content').width();
	    sidebarWidth    = $('.site-sidebar').width();

		getMiddlePoints();
		getReferenceBounds();

		$grid.show();
		var $first = $film.find('.js-portfolio-item').first().addClass('portfolio__item--active');
		setCurrent($first);
	},

	bindEvents = function() {
		$('body').on('click', '.js-show-thumbnails', showThumbnails);
		$('.portfolio--grid').on('click', '.js-portfolio-item', showFilmstrip);
		$('.portfolio--filmstrip').on('click', '.js-portfolio-item', showFullView);
		$('.fullview__close').on('click', hideFullView);

		$('.js-details').on('click', function() {
			$film.toggleClass('portfolio--details');
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

		$('.js-portfolio-item').addClass('no-transition');

		$film.removeClass('portfolio--details');
		$grid.find('.js-portfolio-item img').css('opacity', '');

		TweenMax.to($('.site-content__mask'), 0, {
			'transform-origin': '0 100%',
			'z-index': 300
		});
		$film.css('z-index', 200);
		$grid.css('z-index', 400);

		morph($active, $target, {delay: .3});

		setTimeout(function() {
			var $items = $grid.find('.js-portfolio-item img');
			$items.sort(function(){return 0.5-Math.random()});

			TweenMax.staggerTo($items, .3, {opacity: 1, ease: Quad.easeInOut}, 0.05);
			$('.js-portfolio-item').removeClass('no-transition');
		}, 600);

		TweenMax.to($('.site-content__mask'), .6, {
			scale: 1,
			ease: Expo.easeInOut,
			onComplete: function() {
				$film.removeClass('portfolio--visible');
				$grid.addClass('portfolio--visible');
				TweenMax.to('.site-content__mask', 0, {scaleX: 0});
			}
		});

	},

	showFilmstrip = function(e) {

		var $clicked = $(this),
			$target = $film.find('.js-portfolio-item').eq($clicked.data('count'));

		$('.js-portfolio-item').addClass('no-transition');

		$clicked.css('opacity', 0);
		$film.find('.js-portfolio-item').css('opacity', 0);
		$film.find('.js-portfolio-item img').css('opacity', '');

		$target.addClass('portfolio__item--target');

		$film.addClass('portfolio--visible');

		TweenMax.to($('.site-content__mask'), 0, {
			'transform-origin': '100% 0',
			'z-index': 300
		});
		$film.css('z-index', 400);
		$grid.css('z-index', 200);

		TweenMax.to($('.site-content__mask'), .6, {
			scale: 1,
			ease: Expo.easeInOut,
			onComplete: function() {
				$grid.removeClass('portfolio--visible');
				$grid.css('opacity', '');
				TweenMax.to($film.find('.js-portfolio-item'), .3, {
					opacity: 1,
					onComplete: function() {
						$('.js-portfolio-item').removeClass('no-transition');
					}
				});
				$target.removeClass('portfolio__item--target');
				TweenMax.to('.site-content__mask', 0, {scaleX: 0});
			}
		});

		var newx = $target.data('middle') - $('.site-content').width() / 2 + $('.site-sidebar').width();
		$window.scrollLeft(newx);

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

		fullviewWidth 	= width * scale;
		fullviewHeight 	= height * scale;

		setCurrent($source);

		$target.css({
			width: fullviewWidth,
			height: fullviewHeight,
			top: (fullviewHeight - newHeight) / -2,
			left: (fullviewWidth - newWidth) / -2
		});

		$fullview.append($target);

		$image
			.attr('src', $source.data('srcfull'))
			.prependTo($target);

		morph($source, $target);

		setTimeout(function() {
			$document.on('mousemove', panFullview);
		}, 500);

		$fullview.addClass('fullview--visible');
	},

	panFullview = function() {
		TweenMax.to($('.fullview__image img'), 0, {
			x: (windowWidth / 2 - latestKnownMouseX) * (fullviewWidth - windowWidth) / windowWidth,
			y: (windowHeight / 2 - latestKnownMouseY) * (fullviewHeight - windowHeight) / windowHeight
		});
	},

	hideFullView = function() {
		var $source = $('.fullview__image'),
			$target = $('.portfolio__item--active');

		$document.off('mousemove', panFullview);
		TweenMax.to($('.fullview__image img'), .3, {
			x: 0,
			y: 0
		});
		morph($source, $target);
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
			width: sourceWidth,
			height: sourceHeight,
			background: 'none'
		});

		$target.css({
			position: 'relative',
			transition: 'none',
			'z-index': '10000',
			opacity: 1,
			background: 'none'
		});

		$target.find('img').css('opacity', 0);
		$clone.css('opacity', 1);
		$clone.find('img').css('opacity', 1);

		var defaults = {
				x: targetOffset.left - sourceOffset.left + (targetWidth - sourceWidth) / 2,
				y: targetOffset.top - sourceOffset.top + (targetHeight - sourceHeight) / 2,
				scale: targetWidth / sourceWidth,
				force3D: true,
				ease: Expo.easeInOut,
				onComplete: function() {
					$target.find('img').css('opacity', 1);
					$target.css({
						background: '',
						position: '',
						'z-index': '',
						transition: '',
						opacity: ''
					});
					$clone.remove();
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