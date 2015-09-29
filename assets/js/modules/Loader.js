var Loader = (function() {

    function init() {

        var $svg = $("#loaderSvg"),
            svg,
            text = '',
            letter = $('body').data('first-letter').toString().toLowerCase();

        svg = Snap("#loaderSvg");
        text = svg.text('50%', '20%', letter).attr({
            'text-anchor': 'middle',
            'id': 'letter',
            'font-size': '180',
            'font-weight': 'bold',
            'dy': '150'
        });

        var patterns = [],
            index    = 0;

        $.each(loaderRandomImages, function(i, src) {
            var img = svg.image(src, -75, 0, 300, 300).toPattern();

            img.attr({
                width: 300,
                height: 300,
                viewBox: '0 0 300 300'
            });
            patterns.push(img);
        });

        TweenMax.to($svg, .3, {
            opacity: 1,
            ease: Power3.easeOut
        });

        setInterval(function() {
            if (index == patterns.length) {
                index = 0;
            }
            requestAnimationFrame(function() {
                text.attr('fill', patterns[index]);
            });
            index = index + 1;
        }, 300);
    }

    return {
        init: init
    }

})();