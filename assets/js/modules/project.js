var Project = (function() {

	var $film, $grid, $fullview,
		start, end,
		current,
		initialized = false;

		fullviewWidth = windowWidth;
		fullviewHeight = windowHeight;

	function init() {

		if (!$('.single-jetpack-portfolio').length) {
			return;
		}

		if (initialized) {
			return;
		}

		if ($('.project_layout-filmstrip').length) {

			$film = $('.js-portfolio');
			$grid = $film.clone().addClass('portfolio--grid').insertBefore($film);
			$film.addClass('portfolio--filmstrip').addClass('portfolio--visible');

		} else if( $('.project_layout-thumbnails').length ){

			$grid = $('.js-portfolio');
			$film = $grid.clone().addClass('portfolio--filmstrip').insertAfter($grid);
			$grid.addClass('portfolio--grid').addClass('portfolio--visible');

		} else {
			 //this is some project type that we don't handle here - like fullscreen
			return;
		}

		$grid.find('.js-portfolio-item').each(function(i, obj) {
			var $item = $(obj);
			$item.data('src', $item.data('srcsmall'));
		});

		$film.find('.js-portfolio-item').each(function(i, obj) {
			var $item = $(obj);
			$item.data('src', $item.data('srcfull'));
		});

		$fullview 	= $('.fullview');

		addMetadata();
		bindEvents();

		initialized = true;
	}

	function addMetadata() {
		$film.find('.js-portfolio-item').each(function(i, obj) {
			var $item 			= $(obj),
				captionText 	= $item.data('caption'),
				$caption 		= $('<div class="photometa__caption"></div>').html(captionText),
				descriptionText = $item.data('description'),
				$description	= $('<div class="photometa__description"></div>').html('<div>' + descriptionText + '</div>'),
				$exif 			= $('<ul class="photometa__exif  exif"></ul>'),
				$meta 			= $('<div class="portfolio__meta  photometa"></div>'),
				exifText		= $item.data('exif');

			if ( !empty(exifText) ) {
				$.each(exifText, function (key, value) {
					$('<li class="exif__item"><i class="exif__icon exif__icon--' + key + '"></i>' + value + '</li>').appendTo($exif);
				});
			}

			$caption.appendTo($meta);
			$exif.appendTo($meta);
			$description.appendTo($meta);

			$meta.appendTo($item);
		});
	}

	function prepare() {

		if (!$('.project_layout-filmstrip').length && !$('.project_layout-thumbnails').length) {
			//we are not in a single project so bail
			return;
		}

		filmWidth       = $film.width();
		contentWidth    = $('.site-content').width();
		sidebarWidth    = $('.site-sidebar').width();

		getMiddlePoints();
		getReferenceBounds();

		$grid.show();
		var $first = $film.find('.js-portfolio-item').first().addClass('portfolio__item--active');
		setCurrent($first);

		if (!$('.project_layout-filmstrip').length) {
			showThumbnails(null, true);
		}
	}

	function bindEvents() {
		$('body').on('click', '.js-show-thumbnails', showThumbnails);
		$('.portfolio--grid').on('click', '.js-portfolio-item', showFilmstrip);
		$('.portfolio--filmstrip').on('click', '.js-portfolio-item', showFullView);
		$('.fullview__close').on('click', hideFullView);

		$('.fullview .rsArrowRight').on('click', showNext);
		$('.fullview .rsArrowLeft').on('click', showPrev);

		$('.js-details').on('click', function() {
			$body.toggleClass('portfolio--details');
		});
	}

	function showPrev() {
		var $items = $film.find('.js-portfolio-item'),
			items = $items.length;

		$items.each(function(i, obj) {
			if ($(obj).hasClass('portfolio__item--active')) {
				if (i == 0) {
					fullViewTransition($items.eq(items - 1));
				} else {
					fullViewTransition($items.eq(i - 1));
				}
				return false;
			}
		});
	}

	function showNext() {
		var $items = $film.find('.js-portfolio-item'),
			items = $items.length;

		$items.each(function(i, obj) {
			if ($(obj).hasClass('portfolio__item--active')) {
				if (i == items - 1) {
					fullViewTransition($items.eq(0));
				} else {
					fullViewTransition($items.eq(i + 1));
				}
				return false;
			}
		});
	}

	function fullViewTransition($source) {
		var $target = addImageToFullView($source);
		TweenMax.fromTo($target, .3, { opacity: 0 }, { opacity: 1,
			onComplete: function() {
				$('.fullview__image').not($target).remove();
				centerFilmToTarget($source);
			}
		});
		setCurrent($source);
	}

	// loop through each portfolio item and find the one closest to center
	function getCurrent() {

		if (!$('.single-jetpack-portfolio').length) {
			return;
		}

		if (!initialized) {
			init();
		}

		var current 	= $('.portfolio__item--active').data('middle'),
			reference 	= latestKnownScrollX + start + (end - start) * latestKnownScrollX / (filmWidth - contentWidth),
			min 		= Math.abs(reference - current),
			$next;

		$('.js-reference').css('left', reference).text(parseInt(reference, 10));

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

	function getReferenceBounds() {
		var $items 			= $film.find('.js-portfolio-item'),
			items 			= $items.length,
			max;

		if (items < 2) {
			return;
		}

		start 	= $items.eq(0).data('middle') + ($items.eq(1).data('middle') - $items.eq(0).data('middle')) / 2;
		end 	= contentWidth - sidebarWidth - filmWidth + $items.eq(items - 2).data('middle') + ($items.eq(items - 1).data('middle') - $items.eq(items - 2).data('middle')) / 2;

		max 	= Math.max(contentWidth/2 - start, end - contentWidth/2, 10);

		start   = contentWidth/2 - max;
		end 	= contentWidth/2 + max;
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

	function showThumbnails(e, initial) {
		var $active = $('.portfolio__item--active'),
			$target = $grid.find('.js-portfolio-item').eq($active.data('count'));

		TweenMax.to('.site-footer, .site-sidebar', .3, { opacity: 0 });
		$grid.css('opacity', 1);

		$('.js-portfolio-item').addClass('no-transition');

		TweenMax.to($('.mask--project'), 0, {
			'transform-origin': '0 100%',
			'z-index': 300,
			scaleX: 0
		});

		$film.css('z-index', 200);
		$grid.css('z-index', 400);

		if (typeof initial == "undefined") {
			morph($active, $target, {delay: .3});
		}

		$grid.find('.js-portfolio-item img').css('opacity', '');

		setTimeout(function() {
			var $items = $grid.find('.js-portfolio-item img');
			$items.sort(function(){return 0.5-Math.random()});

			TweenMax.staggerTo($items, .3, {opacity: 1, ease: Quad.easeInOut}, 0.05);
			$('.js-portfolio-item').removeClass('no-transition');
		}, 600);

		TweenMax.to($('.mask--project'), .6, {
			x: 0,
			scaleX: 1,
			ease: Expo.easeInOut,
			onComplete: function() {
				$('.site-content').css('overflow-x', 'hidden');
				$film.removeClass('portfolio--visible');
				$grid.addClass('portfolio--visible');
				TweenMax.to('.mask--project', 0, {scaleX: 0});
			}
		});

	}

	function showFilmstrip(e) {

		var $clicked = $(this),
			$target = $film.find('.js-portfolio-item').eq($clicked.data('count'));

		$('.site-content').css('overflow-x', '');

		TweenMax.to('.site-footer, .site-sidebar', .3, { opacity: 1 });

		// $film.css('opacity', 1);
		$body.removeClass('scroll-y').addClass('scroll-x');

		$('.js-portfolio-item').addClass('no-transition');

		$clicked.css('opacity', 0);
		$film.find('.js-portfolio-item').css('opacity', 0);
		$film.find('.js-portfolio-item img').css('opacity', '');

		$target.addClass('portfolio__item--target');

		$film.addClass('portfolio--visible');

		TweenMax.to($('.mask--project'), 0, {
			'transform-origin': '100% 0',
			'z-index': 300
		});
		$film.css('z-index', 400);
		$grid.css('z-index', 200);

		TweenMax.to($('.mask--project'), .6, {
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
				TweenMax.to('.mask--project', 0, {scaleX: 0});
			}
		});

		centerFilmToTarget($target);
		morph($clicked, $target, {}, function() {
			$target.imagesLoaded(function() {
				$target.find('.portfolio__item--clone').remove();
			});
		});

	}

	function centerFilmToTarget($target) {
		$window.scrollLeft($target.data('middle') - $('.site-content').width() / 2 + $('.site-sidebar').width());
	}

	function addImageToFullView($source) {
		// prepare current for fullview
		var width = $source.data('width'),
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

		return $target;
	}

	function showFullView(e) {

		// prepare current for fullview
		var $source = $(this),
			$target = addImageToFullView($source);

		console.log('here');
		$('.site-content').addClass('site-content--fullview');

		morph($source, $target);

		setTimeout(function() {
			TweenMax.to($('.fullview__image img'), .5, {
				x: (windowWidth / 2 - latestKnownMouseX) * (fullviewWidth - windowWidth) / windowWidth,
				y: (windowHeight / 2 - latestKnownMouseY) * (fullviewHeight - windowHeight) / windowHeight,
				ease: Back.easeOut,
				onComplete: function() {
					$document.on('mousemove', panFullview);
				}
			});
		}, 500);

		$fullview.addClass('fullview--visible');
	}

	function panFullview() {
		TweenMax.to($('.fullview__image img'), 0, {
			x: (windowWidth / 2 - latestKnownMouseX) * (fullviewWidth - windowWidth) / windowWidth,
			y: (windowHeight / 2 - latestKnownMouseY) * (fullviewHeight - windowHeight) / windowHeight
		});
	}

	function hideFullView() {
		var $source = $('.fullview__image'),
			$target = $('.portfolio__item--active');

		$document.off('mousemove', panFullview);
		TweenMax.to($('.fullview__image img'), .3, {
			x: 0,
			y: 0,
			onComplete: function() {
				morph($source, $target, {}, function() {
					$('.site-content').removeClass('site-content--fullview');
				});
				setTimeout(function() {
					$('.fullview__image').remove();
					$fullview.removeClass('fullview--visible');
				});
			}
		});
	}

	function morph($source, $target, options, callback, remove) {
		var sourceOffset  = $source.offset(),
			sourceWidth   = $source.width(),
			sourceHeight  = $source.height(),
			targetOffset  = $target.offset(),
			targetWidth   = $target.width(),
			targetHeight  = $target.height(),
			$clone        = $source.clone().addClass('portfolio__item--clone');

		remove = typeof remove == "undefined" ? true : remove;

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

		$clone.css('opacity', 1);
		$clone.find('img').css('opacity', 1);
		$target.find('img').css('opacity', 0);

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
					TweenMax.fromTo($target.children('.photometa'), .3, {opacity: 0}, {opacity: 1});
					$source.css('opacity', '');

					if (remove) {
						$clone.remove();
					}

					if (typeof callback !== "undefined") {
						callback();
					}
				}
			},
			config = $.extend(defaults, options);

		requestAnimationFrame(function() {
			TweenMax.to($target.children('.photometa'), 0, {opacity: 0});
			$clone.prependTo($target);
			TweenMax.to($clone.children('.photometa'), .3, {opacity: 0});
			TweenMax.to($clone, .5, config);
		});
	}

	function getMiddle($image) {
		return $image.offset().left + $image.width() / 2 - $film.offset().left;
	}

	function setCurrent($current) {
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