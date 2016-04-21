var Placeholder = (function() {
    var $items;

    function update($container, src) {

        var $container  = $container || $('body');

        $items = $container.find('.js-placeholder');

        $items.each(function(i, item) {
            var $item = $(item);
            $item.data('actualHeight', $item.height());
        });

        $items.each(function(i, item) {
            var $item       = $(item).data('loaded', false),
                width       = $item.data('width'),
                height      = $item.data('height'),
                newHeight   = $item.height(),
                newWidth    = Math.round(newHeight * $item.data('width') / $item.data('height')),
                $image      = $(document.createElement('img')).css('opacity', 0);

            $item.toggleClass('is--portrait', height > width);

            $item.width(newWidth);
            $item.data('image', $image);
        });

        $(window).on('DOMContentLoaded load resize scroll djaxLoad', bindImageLoad);
        $('.portfolio--grid, .site-content').on('scroll', bindImageLoad);

        bindImageLoad();

        $(window).on('djaxClick', function() {
            $(window).off('DOMContentLoaded load resize scroll djaxLoad', bindImageLoad);
            $('.portfolio--grid, .site-content').off('scroll', bindImageLoad);
        });
    }

    function bindImageLoad() {

        $items.each(function(i, item) {
            var $item   = $(item),
                $image  = $item.data('image'),
                src     = $item.data('src');

            if (typeof src == "undefined") {
                src = $item.data('srcsmall');
            }

            if ($item.data('loaded')) return;

            if (isElementInViewport($item)) {
                $item.data('loaded', true);
                $image.attr('src', src);
                $image.prependTo($item);
                $image.imagesLoaded(function() {
                    TweenMax.to($image, .3, {opacity: 1});
                    $item.addClass('js-loaded');
                });
            };
        });
    }

    function onResize() {
        $items.each(function(i, item) {
            var $item       = $(item),
                    width       = $item.data('width'),
                    height      = $item.data('height'),
                    newHeight   = $item.height(),
                    newWidth    = Math.round(newHeight * width / height);

            $item.data('newWidth', newWidth);
        });

        $items.each(function(i, item) {
            var $item = $(item);
            $item.width($item.data('newWidth'));
        });
    }

    return {
        update: update,
        resize: onResize
    }

})();