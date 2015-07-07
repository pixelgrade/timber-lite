var Placeholder = (function() {
    var $items;

    function update($container, src) {

        var $container  = $container || $('body'),
            src         = src || 'srcsmall';

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
                newWidth    = newHeight * $item.data('width') / $item.data('height'),
                $image      = $(document.createElement('img')).css('opacity', 0);

            $item.width(newWidth);
            $item.data('image', $image);
        });

        $(window).on('DOMContentLoaded load resize scroll', bindImageLoad);

        $(window).on('djaxClick', function() {
            $(window).off('DOMContentLoaded load resize scroll', bindImageLoad);
        });
    }

    function bindImageLoad() {
        var src = src || 'srcsmall';

        $items.each(function(i, item) {
            var $item   = $(item),
                $image  = $item.data('image');

            if ($item.data('loaded')) return;

            if (isElementInViewport($item)) {
                $item.data('loaded', true).removeClass('js-placeholder');
                $image.attr('src', $item.data(src));
                $image.prependTo($item);
                $image.imagesLoaded(function() {
                    TweenMax.to($image, .3, {opacity: 1});
                });
            };
        });
    }

    return {
        update: update
    }

})();