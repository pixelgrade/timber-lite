/**
 * Shared variables
 */
var ua                  = navigator.userAgent.toLowerCase(),
    platform            = navigator.platform.toLowerCase(),
    $window             = $(window),
    $document           = $(document),
    $html               = $('html'),
    $body               = $('body'),

    android_ancient     = (ua.indexOf('mozilla/5.0') !== -1 && ua.indexOf('android') !== -1 && ua.indexOf('applewebKit') !== -1) && ua.indexOf('chrome') === -1,
    apple               = ua.match(/(iPad|iPhone|iPod|Macintosh)/i),
    webkit              = ua.indexOf('webkit') != -1,

    isiPhone            = false,
    isiPod              = false,
    isAndroidPhone      = false,
    android             = false,
    iOS                 = false,
    isIE                = false,
    ieMobile            = false,
    isSafari            = false,
    isMac               = false,

    firefox             = ua.indexOf('gecko') != -1,
    safari              = ua.indexOf('safari') != -1 && ua.indexOf('chrome') == -1,

    is_small            = $('.js-nav-trigger').is(':visible');

    windowHeight        = $window.height(),
    windowWidth         = $window.width(),
    documentHeight      = $document.height(),
    orientation         = windowWidth > windowHeight ? 'portrait' : 'landscape',

    latestKnownScrollY  = window.scrollY,
    ticking             = false,

    globalDebug         = false;
;