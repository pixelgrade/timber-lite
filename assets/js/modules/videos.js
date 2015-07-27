window.videos = (function() {

    function init() {
        if (globalDebug) {console.group("videos::init");}

        var videos = $('.jetpack-video-wrapper iframe, .youtube-player, .entry-media iframe, .entry-media video, .entry-media embed, .entry-media object, iframe[width][height]');

        // Figure out and save aspect ratio for each video
        videos.each(function () {
            var w = $(this).attr('width') ? $(this).attr('width') : $(this).width(),
                h = $(this).attr('height') ? $(this).attr('height') : $(this).height();

            $(this).attr('data-aspectRatio', w/h)
                // and remove the hard coded width/height
                .removeAttr('height')
                .removeAttr('width')
                .width(w)
                .height(h);
        });

        resize();

        // Firefox Opacity Video Hack
        $('iframe').each(function () {
            var url = $(this).attr("src");
            if (!empty(url))
                $(this).attr("src", setQueryParameter(url, "wmode", "transparent"));
        });

        if (globalDebug) {console.groupEnd();}
    }

    function resize() {
        if (globalDebug) {console.group("videos::resize");}

        var videos = $('.jetpack-video-wrapper iframe, .youtube-player, .entry-media iframe, .entry-media video, .entry-media embed, .entry-media object, iframe[data-aspectRatio]');

        videos.each(function () {
            var video = $(this),
                ratio = video.attr('data-aspectRatio'),
                w, h;

            if (video.closest('.portfolio__item--video').length) {
                if (globalDebug) {console.log(w, h, ratio);}
                h = video.closest('.portfolio__item--video').height();
                w = h * ratio;

                video.width( w );
                video.height( h );
            } else {
                w = video.css('width', '100%').width(),
                h = w / ratio;

                var container_width = video.parent().width();

                if ( w > container_width ) {
                    video
                        .width( w )
                        .height( container_width * ratio );
                } else {
                    video
                        .width( w )
                        .height( h );
                }
            }

            var $parent =

            video.height(h);
            video.width(w);
        });

        if (globalDebug) {console.groupEnd();}
    }

    return {
        init: init,
        resize: resize
    }
})();