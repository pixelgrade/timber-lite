/*
 * debouncedresize: special jQuery event that happens once after a window resize
 *
 * latest version and complete README available on Github:
 * https://github.com/louisremi/jquery-smartresize
 *
 * Copyright 2012 @louis_remi
 * Licensed under the MIT license.
 *
 * This saved you an hour of work? 
 * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
 */
(function ($) {

  var $event = $.event,
      $special, resizeTimeout;

  $special = $event.special.debouncedresize = {
    setup: function () {
      $(this).on("resize", $special.handler);
    },
    teardown: function () {
      $(this).off("resize", $special.handler);
    },
    handler: function (event, execAsap) {
      // Save the context
      var context = this,
          args = arguments,
          dispatch = function () {
          // set correct event type
          event.type = "debouncedresize";
          $event.dispatch.apply(context, args);
          };

      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }

      execAsap ? dispatch() : resizeTimeout = setTimeout(dispatch, $special.threshold);
    },
    threshold: 150
  };

})(jQuery);
/**
 * requestAnimationFrame polyfill by Erik Möller.
 * Fixes from Paul Irish, Tino Zijdel, Andrew Mao, Klemen Slavič, Darius Bacon
 *
 * MIT license
 */
if (!Date.now) Date.now = function () {
  return new Date().getTime();
};

(function () {
  'use strict';

  var vendors = ['webkit', 'moz'];
  for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
    var vp = vendors[i];
    window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = (window[vp + 'CancelAnimationFrame'] || window[vp + 'CancelRequestAnimationFrame']);
  }
  if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
  || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
    var lastTime = 0;
    window.requestAnimationFrame = function (callback) {
      var now = Date.now();
      var nextTime = Math.max(lastTime + 16, now);
      return setTimeout(function () {
        callback(lastTime = nextTime);
      }, nextTime - now);
    };
    window.cancelAnimationFrame = clearTimeout;
  }
}());
(function ($, undefined) {
  /**
   * Shared variables
   */
  var ua = navigator.userAgent.toLowerCase(),
      platform = navigator.platform.toLowerCase(),
      $window = $(window),
      $document = $(document),
      $html = $('html'),
      $body = $('body'),
      
      
      iphone = platform.indexOf("iphone"),
      ipod = platform.indexOf("ipod"),
      android = platform.indexOf("android"),
      android_ancient = (ua.indexOf('mozilla/5.0') !== -1 && ua.indexOf('android') !== -1 && ua.indexOf('applewebKit') !== -1) && ua.indexOf('chrome') === -1,
      apple = ua.match(/(iPad|iPhone|iPod|Macintosh)/i),
      windows_phone = ua.indexOf('windows phone') != -1,
      webkit = ua.indexOf('webkit') != -1,
      
      
      firefox = ua.indexOf('gecko') != -1,
      safari = ua.indexOf('safari') != -1 && ua.indexOf('chrome') == -1,
      
      
      is_small = $('.js-nav-trigger').is(':visible');

  windowHeight = $window.height(), windowWidth = $window.width(), documentHeight = $document.height(), orientation = windowWidth > windowHeight ? 'portrait' : 'landscape',

  latestKnownScrollY = window.scrollY, ticking = false;

  ;
  var Gallery = (function () {
    var $filmstrip, $grid, init = function () {
      $filmstrip = $('.js-gallery');
      $grid = $filmstrip.clone().hide().addClass('gallery--grid').insertBefore($filmstrip);
      $filmstrip.addClass('gallery--filmstrip');

      placehold();
      bindEvents();
    },
        
        
        bindEvents = function () {
        $('body').on('click', '.js-show-thumbnails', function (e) {
          $filmstrip.hide();
          $grid.show();
        });
        $('.gallery--grid').on('click', '.js-gallery-item', function (e) {
          $grid.hide();
          $filmstrip.show();
        });
        },
        
        
        placehold = function () {

        $('.js-gallery').each(function (i, obj) {

          var $gallery = $(obj)
          isGrid = $gallery.hasClass('gallery--grid'),
              containerHeight = $gallery.height();

          $gallery.find('.js-gallery-item').each(function (j, obj) {
            var $galleryItem = $(obj),
                width = $galleryItem.data('width'),
                height = $galleryItem.data('height'),
                newHeight = isGrid ? 240 : containerHeight,
                newWidth = newHeight * width / height,
                src = $galleryItem.data('srcfull'),
                $image = $(document.createElement('img'));

            $galleryItem.width(newWidth).height(newHeight);
            $image.width(newWidth).height(newHeight).attr('src', src).prependTo($galleryItem);

          });
        });

        }
        
        
        
        return {
        init: init
        }
  })()
  console.log('modules compiled');
  // /* ====== ON DOCUMENT READY ====== */
  $(document).ready(function () {
    init();
  });

  function init() {
    Gallery.init();
  }

  // /* ====== ON WINDOW LOAD ====== */
  $window.load(function () {
    //browserSize();
    //Sidebar.init();
    //navigation.init();
    //scrollToTop();
    //moveFeaturedImage();
    //magnificPopupInit();
    //logoAnimation.init();
    //logoAnimation.update();
  });

  // /* ====== ON RESIZE ====== */

  function onResize() {
    //browserSize();
    //masonry.refresh();
    //Sidebar.init();
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(update);
    }
    ticking = true;
  }

  function update() {
    ticking = false;
  }

  $window.on('debouncedresize', onResize);

  $window.on('scroll', function () {
    latestKnownScrollY = window.scrollY;
    requestTick();
  }); /* ====== HELPER FUNCTIONS ====== */



  /**
   * Detect what platform are we on (browser, mobile, etc)
   */

  function platformDetect() {
    $.support.touch = 'ontouchend' in document;
    $.support.svg = (document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")) ? true : false;
    $.support.transform = getSupportedTransform();

    $html.addClass($.support.touch ? 'touch' : 'no-touch').addClass($.support.svg ? 'svg' : 'no-svg').addClass( !! $.support.transform ? 'transform' : 'no-transform');
  }



  function browserSize() {
    windowHeight = $window.height();
    windowWidth = $window.width();
    documentHeight = $document.height();
    orientation = windowWidth > windowHeight ? 'portrait' : 'landscape';
  }



  function getSupportedTransform() {
    var prefixes = ['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform'];
    for (var i = 0; i < prefixes.length; i++) {
      if (document.createElement('div').style[prefixes[i]] !== undefined) {
        return prefixes[i];
      }
    }
    return false;
  }

  /**
   * Handler for the back to top button
   */

  function scrollToTop() {
    $('a[href=#top]').click(function (event) {
      event.preventDefault();
      event.stopPropagation();

      $('html').velocity("scroll", 1000);
    });
  }

  /**
   * function similar to PHP's empty function
   */

  function empty(data) {
    if (typeof(data) == 'number' || typeof(data) == 'boolean') {
      return false;
    }
    if (typeof(data) == 'undefined' || data === null) {
      return true;
    }
    if (typeof(data.length) != 'undefined') {
      return data.length === 0;
    }
    var count = 0;
    for (var i in data) {
      // if(data.hasOwnProperty(i))
      //
      // This doesn't work in ie8/ie9 due the fact that hasOwnProperty works only on native objects.
      // http://stackoverflow.com/questions/8157700/object-has-no-hasownproperty-method-i-e-its-undefined-ie8
      //
      // for hosts objects we do this
      if (Object.prototype.hasOwnProperty.call(data, i)) {
        count++;
      }
    }
    return count === 0;
  }

  /**
   * function to add/modify a GET parameter
   */

  function setQueryParameter(uri, key, value) {
    var re = new RegExp("([?|&])" + key + "=.*?(&|$)", "i");
    separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
      return uri.replace(re, '$1' + key + "=" + value + '$2');
    } else {
      return uri + separator + key + "=" + value;
    }
  }

  function is_touch() {
    return $.support.touch;
  }
})(jQuery);