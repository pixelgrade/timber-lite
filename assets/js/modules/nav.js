var Nav = (function() {

    var isOpen;

    function init() {
        isOpen = false;
        bindEvents();
    }

    function bindEvents() {
        $('.js-nav-toggle').on('click', function() {
            if (isOpen) {
                close();
            } else {
                open();
            }
        });

        $('.js-navigation-overlay').on('click', close);
    }

    function open() {
        $body.addClass('navigation--is-visible');
        isOpen = true;
    }

    function close() {
        $body.removeClass('navigation--is-visible');
        isOpen = false;
    }

    return {
        init: init,
        open: open,
        close: close
    }
})();