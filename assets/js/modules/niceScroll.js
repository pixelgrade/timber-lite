var niceScroll = (function() {

    function init() {

        // var smoothScroll = $('body').data('smoothscrolling') !== undefined;

        // if (smoothScroll && !Modernizr.touch && !ieMobile && !iOS && !isMac) {

            var $window = $window || $(window);     // Window object

            $window.on("mousewheel DOMMouseScroll", function(event) {

                var scrollTo,
                    scrollDistance  = 400,
                    delta;

                if (event.type == 'mousewheel') {
                    delta    = event.originalEvent.wheelDelta / 120;
                }
                else if (event.type == 'DOMMouseScroll') {
                    delta    = - event.originalEvent.detail / 3;
                }

                scrollTo = latestKnownScrollY - delta * scrollDistance;

                if ($(event.target).closest('.overlay--navigation').length) {
                    return;
                }

                if (scrollTo) {
                    event.preventDefault();
                    TweenMax.to($window, .6, {
                        scrollTo: {
                            y:          scrollTo,
                            autoKill:   true
                        },
                        ease:           Power1.easeOut, // For more easing functions see http://api.greensock.com/js/com/greensock/easing/package-detail.html
                        autoKill:       true,
                        overwrite:      5
                    });
                }
            });
        // }
    }

    return {
        init: init
    }
})();