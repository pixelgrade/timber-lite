var Portfolio = (function() {

  var $filmstrip,
      filmstripWidth,
      $grid,
      $first,
      start,
      $last,
      end,
      current = 0,
      $currentFoto,

  init = function() {

    if (!$('.single-jetpack-portfolio').length) {
      placehold();
      return;
    }

    $filmstrip = $('.js-portfolio');

    $grid = $filmstrip.clone().addClass('portfolio--grid').insertBefore($filmstrip);
    $filmstrip.addClass('portfolio--filmstrip portfolio--visible');
    placehold();

    $portfolioItems = $filmstrip.find('.js-portfolio-item');
    $('.portfolio').each(function() {
      $(this).find('.js-portfolio-item').each(function(i, obj) {
        var $obj = $(obj);
        $obj.data('middle', getMiddle($obj));
        $obj.data('count', i);
      });
    });

    filmstripWidth = $filmstrip.width();
    $first = $filmstrip.find('.js-portfolio-item').first();
    start = getMiddle($first) + (getMiddle($first.next()) - getMiddle($first)) / 2;
    $last = $filmstrip.find('.js-portfolio-item').last();
    end = $('.site-content').width() - $('.site-sidebar').width() - filmstripWidth + getMiddle($last.prev()) + (getMiddle($last) - getMiddle($last.prev())) / 2;

    if (start > end) {
      end = $('.site-content').width() / 2 - $('.site-sidebar').width();
      start = end - 10;
    }


    $('.js-details').on('mouseenter', function() {
      $filmstrip.addClass('portfolio--details');
    });
    $('.js-details').on('mouseleave', function() {
      $filmstrip.removeClass('portfolio--details');
    })

    $currentFoto = $first.addClass('portfolio__item--active');
    // setCurrent($currentFoto);
    bindEvents();
  },

  bindEvents = function() {
    $('body').on('click', '.js-show-thumbnails', function(e) {
      var $active = $('.portfolio__item--active');

      morph($active, $grid.find('.js-portfolio-item').eq($active.data('count')));
      $('body').addClass('scroll-x').removeClass('scroll-y');
      $filmstrip.removeClass('portfolio--visible');
      $grid.addClass('portfolio--visible');
    });
    $('.portfolio--grid').on('click', '.js-portfolio-item', function(e) {
      var $active = $(this),
      count = $active.data('count');
      $('body').addClass('scroll-x').removeClass('scroll-y');
      $grid.removeClass('portfolio--visible');
      $filmstrip.addClass('portfolio--visible');
      scroller.set('x', $filmstrip.find('.js-portfolio-item').eq(count).data('middle') - $('.site-content').width() / 2 + $('.site-sidebar').width());
      requestAnimationFrame(function() {
        morph($active, $filmstrip.find('.portfolio__item').eq(count));
      });
    });
  },

  morph = function($source, $target) {
      var sourceOffset  = $source.offset(),
          sourceWidth   = $source.width(),
          sourceHeight  = $source.height(),
          sourceMid     = {
            x: sourceOffset.left + sourceWidth / 2,
            y: sourceOffset.top + sourceHeight / 2
          },
          targetOffset  = $target.offset(),
          targetWidth   = $target.width(),
          targetHeight  = $target.height()
          targetMid     = {
            x: targetOffset.left + targetWidth / 2,
            y: targetOffset.top + targetHeight / 2,
          },
          $clone        = $source.clone();

      $clone.css({
        position: 'fixed',
        top: sourceOffset.top,
        left: sourceOffset.left - scroller.get('x'),
        width: $source.width(),
        height: $source.height()
      });

      requestAnimationFrame(function() {
        $clone.appendTo('body');
        TweenMax.to($clone, 1, {
          x: targetMid.x - sourceMid.x,
          y: targetMid.y - sourceMid.y,
          scale: targetWidth / sourceWidth,
          onComplete: function() {
            $clone.remove();
          }
        });
      });
  },

  placehold = function() {


    $('.js-portfolio').each(function(i, obj) {

      var $portfolio      = $(obj),
          isGrid          = $portfolio.hasClass('portfolio--grid'),
          containerHeight = $portfolio.height();

      $portfolio.find('.js-portfolio-item').each(function(j, obj) {
        console.log(containerHeight);
        var $portfolioItem  = $(obj),
            width         = $portfolioItem.data('width'),
            height        = $portfolioItem.data('height'),
            newHeight     = containerHeight,
            newWidth      = newHeight * width / height,
            src           = $portfolioItem.data('srcfull'),
            $image        = $(document.createElement('img'));

        $portfolioItem.width(newWidth).height(newHeight);
        $image.width(newWidth).height(newHeight).attr('src', src).prependTo($portfolioItem);

      });
    });

  },

  getMiddle = function($image) {
    return $image.offset().left + $image.width() / 2 - $filmstrip.offset().left;
  }

  updateCurrent = function(x, y) {

    var width = end - start,
        reference =  start + width * x / (filmstripWidth - $('.site-content').width()) + x,
        compare,
        $next;

    $('.js-reference').css('left', reference + 'px').text(parseInt(reference));

    if (reference >= current) {
      $next = $currentFoto.nextAll('.js-portfolio-item').first();
    } else {
      $next = $currentFoto.prevAll('.js-portfolio-item').first();;
    }

    compare = $next.data('middle');
    $('.js-compare').css('left', compare).text(parseInt(compare));

    if (Math.abs(compare - reference) <= Math.abs(reference - current)) {
      setCurrent($next);
    }
  },

  updateCurrentForce = function(x, y) {

    // var width = end - start,
    //     reference =  start + width * x / (filmstripWidth - $('.site-content').width()) + x,
    //     compare,
    //     $next = $currentFoto,
    //     currentCount;

    // $('.js-reference').css('left', reference + 'px').text(parseInt(reference));

    // $('.js-portfolio-item').each(function(i, obj) {
    //     var compare = $(obj).data('middle');

    //     if (Math.abs(compare - reference) <= Math.abs(reference - current)) {
    //       $next = $(obj);
    //       current = compare;
    //     }
    // });

    // setCurrent($next);
  },

  setCurrent = function($next) {
    $currentFoto = $next;
    $portfolioItems.removeClass('portfolio__item--active');
    $currentFoto.addClass('portfolio__item--active');
    $('.portfolio__position').text($next.data('count') + 1 + ' of ' + $filmstrip.find('.js-portfolio-item').length);
    current = $currentFoto.data('middle');
    $('.js-last').css('left', current).text(parseInt(current));
  }

  return {
    init: init,
    updateCurrent: updateCurrent
  }
})();