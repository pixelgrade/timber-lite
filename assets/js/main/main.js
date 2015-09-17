// /* ====== ON DOCUMENT READY ====== */

$(document).ready(function () {
	init();
});

function init() {
    browserSupport();
    platformDetect();
    browserSize();
    scrollToTop();
    djax.init();
    Loader.init();
    Nav.init();
    Overlay.init();
    updateHeader();
    $html.addClass('ready');

    $('.site-header, #page, .site-footer').css('opacity', 1);

    // Loads the addThis script - this should be run just once
    AddThisIcons.init();
}

function softInit() {

    niceScrollInit();

    sizeColumns();

    if ($('.single-jetpack-portfolio').length) {
        Project.init();
        Placeholder.update();
        Project.prepare();
    } else {
        Placeholder.update();
    }

    Portfolio.init();
    Blog.init();

    frontpageSlider.init();

    AddThisIcons.softInit();
    royalSliderInit();
    videos.init();

    filterHandler();
    checkProfileImageWidget();

    if( windowWidth > 740 ) {
        bindVertToHorScroll();
    }


    $('.site-header, #page, .site-footer').css('opacity', 1);

    $(".pixcode--tabs").organicTabs();
}

// /* ====== ON WINDOW LOAD ====== */
$window.load(function () {
    softInit();
    eventHandlers();

    requestAnimationFrame(function() {
        TweenMax.to('.loader', .3, {
            opacity: 0,
            ease: Expo.easeInOut
        });
        TweenMax.fromTo('.loader', .6, {
            left: 0
        }, {
            left: '-100%',
            ease: Expo.easeInOut,
        });
        TweenMax.to('.mask--page', .6, {
            left: '100%',
            ease: Expo.easeInOut,
            onComplete: function() {
                $('.mask--page').css('left', '-100%');
                $('.mask--page').removeClass('is-on-top');
                $('.loader').css('opacity', 1);
            }
        });
    });
});

// /* ====== ON RESIZE ====== */

function onResize() {
	browserSize();
    sizeColumns();
    Project.onResize();
    frontpageSlider.onResize();
    videos.resize();

    var $items = $('.site-content').find('.js-placeholder');

    $items.each(function(i, item) {
        var $item       = $(item),
            width       = $item.data('width'),
            height      = $item.data('height'),
            newHeight   = $item.height(),
            newWidth    = newHeight * width / height;

            $item.data('newWidth', newWidth);
    });

    $items.each(function(i, item) {
        var $item = $(item);
        $item.width($item.data('newWidth'));
    });

    if( windowWidth > 740 && !horToVertScroll ) {
        bindVertToHorScroll();
    } else {
        $('html, body, *').unbind('mousewheel', vertToHorScroll);
    }
}

function requestTick() {
	if (!ticking) {
		requestAnimationFrame(update);
	}
	ticking = true;
}

function update() {
	Project.getCurrent();
	Portfolio.maybeloadNextProjects();
	Blog.maybeLoadNextPosts();
    updateHeader();
	ticking = false;
}

function updateHeader() {
    if ($('.page-has-featured-image').length && latestKnownScrollY > windowHeight - 62) {
        $('body').addClass('header--not-light');
    } else {
        $('body').removeClass('header--not-light');
    }
}

function eventHandlers() {
    $window.on('debouncedresize', onResize);

    $window.on('scroll', function () {

        if(!isIE) {
            latestKnownScrollY = window.scrollY;
            latestKnownScrollX = window.scrollX;
        } else {
            latestKnownScrollY = document.documentElement.scrollTop;
            latestKnownScrollX = document.documentElement.scrollLeft;
        }

        requestTick();
    });

    $('.touch .site-content').on('scroll', function () {

        latestKnownScrollY = window.scrollY;
        latestKnownScrollX = $(this).scrollLeft();

        requestTick();
    });

    $(window).on('mousemove', function(e) {
        latestKnownMouseX   = e.clientX;
        latestKnownMouseY   = e.clientY;
    });

    $(window).on('deviceorientation', function(e) {
        latestDeviceAlpha   = e.originalEvent.alpha;
        latestDeviceBeta    = e.originalEvent.beta;
        latestDeviceGamma   = e.originalEvent.gamma;
    });
}