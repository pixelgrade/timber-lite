var djax = (function() {

    var preparing   = false,
        loading     = false;

    /**
     *
     */
    function init() {

        // if (typeof $body.data('ajaxloading') == "undefined") {
        //     return;
        // }

        var that = this,
            transition = function ($new) {
                var $old = this;
            };

        //$('body').djax( {
        //  'selector': '.djax-updatable',
        //  'ignoreClass' : 'djax-ignore',
        //  'exceptions': ['.pdf', '.doc', '.eps', '.png', '.zip', 'admin', 'wp-', 'wp-admin', 'feed', '#', '?lang=', '&lang=', '&add-to-cart=', '?add-to-cart=', '?remove_item'],
        //  'replaceBlockFunction': transition
        //} );
        var ignored_links = ['.pdf', '.doc', '.eps', '.png', '.zip', 'admin', 'wp-', 'wp-admin', 'feed', '#', '?lang=', '&lang=', '&add-to-cart=', '?add-to-cart=', '?remove_item'];

        // djax_ignored_links is localized in /inc/functions/callbacks/woocommerce.php
        // if there are localized ignored links, add them
        if ( typeof djax_ignored_links === "object" ) {
            ignored_links = ignored_links.concat( djax_ignored_links );
        }

        $('body').djax('.djax-updatable', ignored_links, djaxTransition);

        $(window).on('djaxClick', onDjaxClick);
        $(window).on('djaxLoad', onDjaxLoad);
    }

    function replaceBodyClass(data) {
        // get data and replace the body tag with a nobody tag
        // because jquery strips the body tag when creating objects from data
        data = data.response.replace(/(<\/?)body( .+?)?>/gi, '$1NOTBODY$2>', data);
        // get the nobody tag's classes
        var nobodyClass = $(data).filter('notbody').attr("class");
        // set it to current body tag
        $body.attr('class', nobodyClass);
    }

    function djaxTransition($new) {
        var $old = this;
        $old.replaceWith($new);
    }

    function onDjaxClick(e) {
        TweenMax.fromTo('.loader', .6, {
            left: '100%'
        }, {
            left: 0,
            ease: Expo.easeInOut,
        });
        TweenMax.to('.mask--page', .6, {
            left: 0,
            ease: Expo.easeInOut,
            onComplete: function() {
            }
        });
    }

    function onDjaxLoad(e, data) {
        replaceBodyClass(data);
        softInit();
        $(window).scrollLeft(0);
        $(window).scrollTop(0);
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
            }
        });
    }

    return {
        init: init,
        transition: djaxTransition
    }

})();

var Loader = (function() {

    function init() {

        var $svg = $("#loaderSvg"),
            svg;

        svg = Snap("#loaderSvg");;
        text = svg.text('50%', '20%', 't').attr({
            'text-anchor': 'middle',
            'id': 'letter',
            'font-size': '180',
            'font-weight': 'bold',
            'dy': '100'
        });

        var patterns = [],
            index    = 0;

        $.each(loaderRandomImages, function(i, src) {
            var img = svg.image(src).toPattern();

            img.attr({
                width: 150,
                height: 150,
                viewBox: '0 0 150 150'
            });
            patterns.push(img);
        });

        setInterval(function() {
            if (index == patterns.length) {
                index = 0;
            }
            text.attr('fill', patterns[index]);
            index = index + 1;
        }, 300);
    }

    return {
        init: init
    }

})()