function Scroller(selector, callback) {

    var instance = this,
        undefined,
        x, y,

    update = function() {
        x = $(selector).scrollLeft();
        y = $(selector).scrollTop();
    };

    if (selector === undefined)  {
        selector = window;
    }

    update();

    this.get = function(attribute) {
        if (attribute == "x") return x;
        if (attribute == "y") return y;
        return null;
    }

    this.set = function(attribute, value) {
        if (attribute == "x") {
            $(selector).scrollLeft(value);
        }
        if (attribute == "y") {
            $(selector).scrollTop(value);
        }
    }

    $(selector).on('scroll', function() {
        update();
        if (callback !== undefined) {
            requestAnimationFrame(callback);
        }
    });
}