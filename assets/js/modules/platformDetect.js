// Platform Detection
function getIOSVersion(ua) {
    ua = ua || navigator.userAgent;
    return parseFloat(
        ('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(ua) || [0,''])[1])
            .replace('undefined', '3_2').replace('_', '.').replace('_', '')
    ) || false;
}

function getAndroidVersion(ua) {
    var matches;
    ua = ua || navigator.userAgent;
    matches = ua.match(/[A|a]ndroid\s([0-9\.]*)/);
    return matches ? matches[1] : false;
}

function platformDetect() {

    var navUA           = navigator.userAgent.toLowerCase(),
        navPlat         = navigator.platform.toLowerCase();

    isiPhone        = navPlat.indexOf("iphone");
    isiPod          = navPlat.indexOf("ipod");
    isAndroidPhone  = navPlat.indexOf("android");
    isSafari        = navUA.indexOf('safari') != -1 && navUA.indexOf('chrome') == -1;
    isIE            = typeof (is_ie) !== "undefined" || (!(window.ActiveXObject) && "ActiveXObject" in window);
    ieMobile        = ua.match(/Windows Phone/i) ? true : false;
    iOS             = getIOSVersion();
    android         = getAndroidVersion();
    isMac           = navigator.platform.toUpperCase().indexOf('MAC')>=0;
    isWindows       = navigator.platform.toUpperCase().indexOf('WIN')!==-1;

    if (Modernizr.touch) {
        $html.addClass('touch');
    }

    if (iOS && iOS < 8) {
        $html.addClass('no-scroll-fx')
    }

    if (isIE) {
        $html.addClass('is--ie');
    }

    if (ieMobile) {
        $html.addClass('is--ie-mobile')
    }

    var browser = {
        isIe: function () {
            return navigator.appVersion.indexOf("MSIE") != -1;
        },
        navigator: navigator.appVersion,
        getVersion: function() {
            var version = 999; // we assume a sane browser
            if (navigator.appVersion.indexOf("MSIE") != -1)
            // bah, IE again, lets downgrade version number
                version = parseFloat(navigator.appVersion.split("MSIE")[1]);
            return version;
        }
    };

    if (browser.isIe() && browser.getVersion() == 9) {
        $('html').addClass('is--ie9');
    }
}