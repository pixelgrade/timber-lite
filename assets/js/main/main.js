// /* ====== ON DOCUMENT READY ====== */

$(document).ready(function() {
  init();
});

window.scroller = new Scroller(window, function() {
    var x = scroller.get('x'),
        y = scroller.get('y');

    Portfolio.updateCurrent(x, y);
});

function init() {
  platformDetect();
  Gallery.init();
  Portfolio.init();
}

// /* ====== ON WINDOW LOAD ====== */

$window.load(function() {
  //browserSize();
  //Sidebar.init();
  //navigation.init();
  //scrollToTop();
  //moveFeaturedImage();
  //magnificPopupInit();
  //logoAnimation.init();
  //logoAnimation.update();

  royalSliderInit();
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

$window.on('scroll', function() {
  latestKnownScrollY = window.scrollY;
  requestTick();
});