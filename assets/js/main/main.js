// /* ====== ON DOCUMENT READY ====== */

$(document).ready(function () {
	init();
});

function init() {
    browserSupport();
    platformDetect();
    browserSize();
    scrollToTop();

    if (!$html.hasClass('is--ie')) {
        djax.init();
    }

    Loader.init();
    Nav.init();
    Overlay.init();
    updateHeader();
    $html.addClass('ready');

    $('.site-header, #page, .site-footer').css('opacity', 1);

    // Loads the addThis script - this should be run just once
    AddThisIcons.init();

    if( Modernizr.touchevents ) {
        HandleParentMenuItems.bindOuterNavClick();
    }
}

function softInit() {
    niceScrollInit();
    sizeColumns();

    $('html, body, *').unbind('mousewheel', vertToHorScroll);
    horToVertScroll = false;

    if( windowWidth > 900 && Modernizr.touchevents ) {
        HandleParentMenuItems.handle();
    }

    if ($('.single-jetpack-portfolio, .single-proof_gallery, .woocommerce.archive').length ) {
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

    if( $('.woocommerce.archive').length ) {
        Woocommerce.init();
    }

    if( $('.woocommerce.single-product').length ) {
        Woocommerce.betterWooThumbsNav();
    }

    Woocommerce.checkCart();

    $('.site-header, #page, .site-footer').css('opacity', 1);

    $(".pixcode--tabs").organicTabs();

    if ( $('body' ).hasClass('woocommerce') && $( '#rating' ).length && $('#rating').is(':visible') ) {
        $( '#rating' ).hide().before( '<p class="stars"><span><a class="star-1" href="#">1</a><a class="star-2" href="#">2</a><a class="star-3" href="#">3</a><a class="star-4" href="#">4</a><a class="star-5" href="#">5</a></span></p>' );
    }

    if ( ! Modernizr.touchevents && ! horToVertScroll ) {
        bindVertToHorScroll();
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

    loop();
});

// /* ====== ON RESIZE ====== */

function onResize() {
	browserSize();
    sizeColumns();

    if( Modernizr.touchevents ) {
        if( windowWidth >= 900 ) {
            // Handle parent menu items
            HandleParentMenuItems.handle();
        } else if ( windowWidth < 900 ) {
            // Remove handlers
            HandleParentMenuItems.unHandle();
        }
    }

    Project.onResize();

    if( $('.woocommerce.archive').length ) {
        Woocommerce.onResize();
    }

    frontpageSlider.onResize();
    videos.resize();

    if( isiele10 ) {
        Blog.calcIeFilmstrip();
    }

    Placeholder.resize();
}

function updateHeader() {
    if ($('.page-has-featured-image').length && latestKnownScrollY > windowHeight - 62) {
        $('body').addClass('header--not-light');
    } else {
        $('body').removeClass('header--not-light');
    }
}

var scrollTimeout,
    isScrolling = false;

function onScroll(e) {
    if ( $('.filmstrip').length || $('.portfolio--filmstrip.portfolio--visible').length ) {
        latestKnownScrollX = $(this).scrollLeft();
    } else {
        latestKnownScrollY = $(this).scrollTop();
    }
    if ( ! isScrolling ) {
        isScrolling = true;
        $body.addClass( 'is-scrolling' );
    }
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(doneScrolling, 1000);
}

function doneScrolling() {
    $body.removeClass( 'is-scrolling' );
    isScrolling = false;
}

function loop() {
    Project.getCurrent();
    Portfolio.maybeloadNextProjects();
    Blog.maybeLoadNextPosts();
    updateHeader();

    if( $('.woocommerce.archive').length ) {
        Woocommerce.getCurrent();
        Woocommerce.maybeloadNextProducts();
    }

    requestAnimationFrame(loop)
}


function eventHandlers() {
    $window.on('debouncedresize', onResize);

    $window.on('scroll', onScroll);

    if ( Modernizr.touchevents && isFilmstrip() ) {
        $('.site-content').on('scroll', onScroll);
    }

    $window.on('mousemove', function(e) {
        latestKnownMouseX   = e.clientX;
        latestKnownMouseY   = e.clientY;
    });

    $window.on('deviceorientation', function(e) {
        latestDeviceAlpha   = e.originalEvent.alpha;
        latestDeviceBeta    = e.originalEvent.beta;
        latestDeviceGamma   = e.originalEvent.gamma;
    });

    if( windowWidth > 740 ) {
        bindVertToHorScroll();
    }
}