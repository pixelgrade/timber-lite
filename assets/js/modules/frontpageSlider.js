var frontpageSlider = (function() {

    var $slider         = $('.projects-slider'),
        $content        = $('.project-slide__content'),
        $prevTrigger    = $('.vertical-title.prev'),
        $nextTrigger    = $('.vertical-title.next'),
        $triggers       = $nextTrigger.add($prevTrigger),
        sliderWidth     = $slider.width(),
        sliderHeight    = $slider.height(),
        totalWidth      = 0,
        $slides         = $slider.children(),
        slidesNumber    = $slides.length,
        $current        = $slides.eq(0),
        $prev,
        $next;

    function init() {

        var minSlides = 5,
            offset;

        // assure minimum number of slides
        if (slidesNumber < minSlides) {
            $slides.clone().appendTo($slider);
            $slides = $slider.children();
        }

        $slides.not($current).width(100);

        $slides.each(function(i, obj) {
            var $slide = $(obj);

            if (i != 0) {
                totalWidth += 100;
                $slide.css('left', sliderWidth + (i - 1) * 100);
            } else {
                totalWidth += sliderWidth;
            }

            scaleImage($slide.find('img'));
        });

        // balance slides to left and right
        offset = parseInt(($slides.length - 1) / 2, 10);
        $slides.slice(-offset).prependTo($slider).each(function(i, obj) {
            $(obj).css('left', '-=' + totalWidth);
        });

        $slides = $slider.children();

        $prev = $current.prev();
        $next = $current.next();

        createBullets();
        setZindex();
        bindEvents();
        animateContentIn();
    }

    function scaleImage($img) {
        var imageWidth      = $img.width(),
            imageHeight     = $img.height(),
            scaleX          = sliderWidth / imageWidth,
            scaleY          = sliderHeight / imageHeight,
            scale           = Math.max(scaleX, scaleY);

        $img.width(scale * imageWidth);
        $img.height(scale * imageHeight);
    }

    function createBullets() {
        var $container = $('.projects-slider__bullets');

        for (var i = 0; i < slidesNumber; i++) {
            $container.append('<div class="rsBullet"><span></span></div>');
        }

        $container.children().first().addClass('rsNavSelected');
    }

    function bindEvents() {
        $nextTrigger
            .on('mouseover', onNextEnter)
            .on('mouseleave', onNextLeave)
            .on('click', onNextClick);

        $prevTrigger
            .on('mouseover', onPrevEnter)
            .on('mouseleave', onPrevLeave)
            .on('click', onPrevClick);
    }

    function onNextEnter() {
        TweenMax.to($next.find('.project-slide__image'), .4, {opacity: 1, ease: Quint.easeOut});
        TweenMax.to($next.add($content), .4, {x: -60, ease: Back.easeOut}, '-=.4');
        TweenMax.to($next, .4, {width: 160, ease: Back.easeOut}, '-=.4');
        TweenMax.to($nextTrigger, .4, {x: -30, ease: Back.easeOut}, '-=.4');
    }

    function onPrevEnter() {
        TweenMax.to($prev.find('.project-slide__image'), .4, {opacity: 1, ease: Quint.easeOut});
        TweenMax.to($content, .4, {x: 60, ease: Back.easeOut});
        TweenMax.to($prev, .4, {width: 160, ease: Back.easeOut});
        TweenMax.to($prevTrigger, .4, {x: 30, ease: Back.easeOut});
    }

    function onNextLeave() {
        TweenMax.to($next.find('.project-slide__image'), .4, {opacity: 0.6, ease: Quint.easeOut});
        TweenMax.to($next.add($content), .4, {x: 0, ease: Quint.easeOut})
        TweenMax.to($next, .4, {width: 100, ease: Quint.easeOut})
        TweenMax.to($('.vertical-title.next'), .4, {x: 0, ease: Quint.easeOut});
    }

    function onPrevLeave() {
        TweenMax.to($prev.find('.project-slide__image'), .4, {opacity: 0.6, ease: Quint.easeOut});
        TweenMax.to($prev.add($content), .4, {x: 0, ease: Quint.easeOut})
        TweenMax.to($prev, .4, {width: 100, ease: Quint.easeOut})
        TweenMax.to($('.vertical-title.prev'), .4, {x: 0, ease: Quint.easeOut});
    }

    function onNextClick() {
        var timeline = new TimelineMax({ paused: true, onComplete: onComplete });

        timeline.to($next.next().find('.project-slide__image'), 0, {opacity: 1, ease: Power1.easeOut});
        timeline.to($slider, .7, {x: '-=' + 100, ease: Quint.easeOut});
        timeline.to($current, .7, {width: 100, ease: Quint.easeOut}, '-=.7');
        timeline.to($next, .7, {width: sliderWidth, left: '-=' + (sliderWidth - 100), x: 0, ease: Quint.easeOut}, '-=.7');
        timeline.to($next.next(), .4, {width: 160, x: -60, ease: Quint.easeOut}, '-=.7');
        timeline.to($current.find('.project-slide__image'), .4, {opacity: 0.6, ease: Power1.easeOut}, '-=.4');

        $prev       = $current;
        $current    = $next;
        $next       = $next.next();

        $nextTrigger.off('click', onNextClick);
        animateContentTo($current);
        timeline.play();

        updateBullets(1);

        function onComplete() {
            $slides.first().appendTo($slider).css('left', '+=' + totalWidth);
            $slides = $slider.children();
            setZindex();
            $nextTrigger.on('click', onNextClick);
        }
    }

    function onPrevClick() {
        var timeline = new TimelineMax({ paused: true, onComplete: onComplete });

        timeline.to($prev.prev().find('.project-slide__image'), 0, {opacity: 1, ease: Quint.easeOut});
        timeline.to($slider, .7, {x: '+=' + 100, ease: Quint.easeOut});
        timeline.to($current, .7, {width: 100, left: '+=' + (sliderWidth - 100), ease: Quint.easeOut}, '-=.7');
        timeline.to($prev, .7, {width: sliderWidth, x: 0, ease: Quint.easeOut}, '-=.7');
        timeline.to($prev.prev(), .4, {width: 160, ease: Quint.easeOut}, '-=.7');
        timeline.to($current.find('.project-slide__image'), .4, {opacity: 0.6, ease: Quint.easeOut}, '-=.4');

        $next       = $current;
        $current    = $prev;
        $prev       = $prev.prev();

        $prevTrigger.off('click', onPrevClick);
        animateContentTo($current);
        timeline.play();

        updateBullets(-1);

        function onComplete() {
            $slides.last().prependTo($slider).css('left', '-=' + totalWidth);
            $slides = $slider.children();
            setZindex();
            $prevTrigger.on('click', onPrevClick);
        }
    }

    function updateBullets(offset) {
        var $selectedBullet = $('.rsNavSelected');
            count = $selectedBullet.index();

        $selectedBullet.removeClass('rsNavSelected');

        if (count + offset == slidesNumber) {
            $('.rsBullet').eq(0).addClass('rsNavSelected');
        } else if (count + offset == -1) {
            $('.rsBullet').eq(slidesNumber - 1).addClass('rsNavSelected');
        } else {
            $('.rsBullet').eq(count + offset).addClass('rsNavSelected');
        }
    }

    function animateContentIn() {
        $current.find('.project-slide__image').css('opacity', 1);
        TweenMax.fromTo($content.find('.project-slide__title h1'), .7, {y: '-100%'}, {y: '0%', delay: .5, ease: Expo.easeInOut});
        TweenMax.fromTo($content.find('.js-title-mask'), .7, {y: '100%'}, {y: '0%', delay: .5, ease: Expo.easeInOut});
        TweenMax.fromTo($content.find('.portfolio_types'), .3, {opacity: 0}, {opacity: 1, delay: .9, ease: Quint.easeIn});
        TweenMax.fromTo($content.find('.project-slide__text'), .4, {x: -10, opacity: 0}, {x: 0, opacity: 1, delay: 1, ease: Quint.easeOut});
        // TweenMax.to($('.site-content__mask'), .6, {scaleX: 0, ease: Expo.easeInOut});
    }

    function animateContentTo($slide) {
        var $clone      = $content.clone(),
            $nextTitle  = $('.vertical-title.next span'),
            $nextClone  = $nextTitle.clone().text($slide.next().data('title')),
            $prevTitle  = $('.vertical-title.prev span'),
            $prevClone  = $prevTitle.clone().text($slide.prev().data('title')),
            timeline    = new TimelineMax({ paused: true, onComplete: function() {
                $prevTitle.remove();
                $nextTitle.remove();
                $content.remove();
                $content = $clone;
            }});

        $clone.find('.project-slide__title h1').text($slide.data('title'));
        $clone.find('.portfolio_types').html($slide.data('types'));
        $clone.find('a').attr('href', $slide.data('link')).attr('title', $slide.data('link-title'));

        // les types
        var $fadeOut = $content.find('.portfolio_types').add($nextTitle).add($prevTitle),
            $fadeIn  = $clone.find('.portfolio_types').add($nextClone).add($prevClone);

        timeline.fromTo($fadeOut, .3, {opacity: 1}, {opacity: 0, ease: Quint.easeIn});
        timeline.fromTo($fadeIn, .3, {opacity: 0}, {opacity: 1, ease: Quint.easeIn}, '-=0.2');

        // le title
        timeline.fromTo($content.find('.project-slide__title h1'), .3, {opacity: 1}, {opacity: 0, ease: Quint.easeOut}, '-=0.3');
        timeline.fromTo($clone.find('.project-slide__title h1'), .5, {y: '-100%'}, {y: '0%', ease: Expo.easeOut}, '-=0.2');
        timeline.fromTo($clone.find('.js-title-mask'), .5, {y: '100%'}, {y: '0%', ease: Expo.easeOut}, '-=0.5');

        $content.find('.project-slide__text').css('opacity', 0);
        $nextClone.insertAfter($nextTitle);
        $prevClone.insertAfter($prevTitle);
        $clone.insertAfter($content);
        timeline.play();
    }

    function setZindex() {
        $current.css('z-index', '');
        $prev.css('z-index', 10).prev().css('z-index', 20);
        $next.css('z-index', 10).next().css('z-index', 20);
    }

    return {
        init: init
    }

})();