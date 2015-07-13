var Nav = (function() {
    function init() {
        bindEvents();
    }

    function bindEvents() {
        $('.js-nav-toggle').on('click', function() {
            $('.site-header').toggleClass('is-visible');
        });
    }

    return {
        init: init
    }
})();