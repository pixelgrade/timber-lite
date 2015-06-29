var Placeholder = (function() {

    var update = function($container, src) {

        $container  = $container || $('body');
        src         = src || 'srcsmall';

        var $items = $container.find('.js-placeholder');

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

        $(window).on('DOMContentLoaded load resize scroll', function() {
            $items.each(function(i, item) {
                var $item   = $(item),
                    $image  = $item.data('image');

                if ($item.data('loaded')) return;

                if (isElementInViewport($item)) {
                    $item.data('loaded', true).removeClass('js-placeholder');
                    $image.attr('src', $item.data(src));
                    $image.prependTo($item);
                    $image.imagesLoaded(function() {
                        $image.css('opacity', 1);
                    });
                };
            });
        });
    }

    return {
        update: update
    }

})();