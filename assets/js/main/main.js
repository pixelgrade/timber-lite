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

    checkProfileImageWidget();

    bindVertToHorScroll();

    $('.site-header, #page, .site-footer').css('opacity', 1);

    $(".pixcode--tabs").organicTabs();

    console.log( $('body' ).hasClass('woocommerce') );
    console.log($( '#rating' ) );
    if ( $('body' ).hasClass('woocommerce') && $( '#rating' ).length && $('#rating').is(':visible') ) {
        $( '#rating' ).hide().before( '<p class="stars"><span><a class="star-1" href="#">1</a><a class="star-2" href="#">2</a><a class="star-3" href="#">3</a><a class="star-4" href="#">4</a><a class="star-5" href="#">5</a></span></p>' );
    }
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
    	latestKnownScrollY = window.scrollY;
        latestKnownScrollX = window.scrollX;
        requestTick();
    });

    $document.mousemove(function (e) {
    	latestKnownMouseX = e.pageX - latestKnownScrollX;
    	latestKnownMouseY = e.pageY - latestKnownScrollY;
    });
}