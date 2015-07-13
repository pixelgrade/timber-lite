// /* ====== ON DOCUMENT READY ====== */

$(document).ready(function () {
	init();
});


function init() {
    browserSupport();
    platformDetect();
    browserSize();
    djax.init();
    scrollToTop();
    Loader.init();

    $(".pixcode--tabs").organicTabs();

    if ($('body').hasClass('blog')
        || $('body').hasClass('project_layout-filmstrip')
        || $('body').hasClass('project_layout-thumbnails')) {

        if( !$('html').hasClass('is--ie9') )
        // html body are for ie
        $('html, body, *').mousewheel(function (event, delta) {
            // this.scrollLeft -= (delta * 30);
            this.scrollLeft -= (delta * event.deltaFactor); // delta for macos
            event.preventDefault();
        });
    }
}

function softInit() {

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

    AddThisIcons.init();
    overlayInit();
    royalSliderInit();
    socialLinks.init();
    videos.init();

    $('.site-header, #page, .site-footer').css('opacity', 1);

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
        }
    });

    sizeColumns();
}

// /* ====== ON WINDOW LOAD ====== */
$window.load(function () {
    softInit();
    eventHandlers();
});

// /* ====== ON RESIZE ====== */

function onResize() {
	browserSize();
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
	ticking = false;
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