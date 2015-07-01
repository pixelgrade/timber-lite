// /* ====== ON DOCUMENT READY ====== */

$(document).ready(function() {
  init();
});


function init() {
  platformDetect();
  browserSize();

  Portfolio.init();
  Placeholder.update();
  Portfolio.prepare();

  if ($('.filmstrip').length) {
    $('.filmstrip').mixItUp({
      animation: {
        effects: 'fade'
      },
      selectors: {
        target: '.filmstrip__item',
        filter: '.filter__item'
      }
    });
  }
}

// /* ====== ON WINDOW LOAD ====== */

$window.load(function() {
  // Portfolio.getCurrent();
  //browserSize();
  //Sidebar.init();
  //navigation.init();
  //scrollToTop();
  //moveFeaturedImage();
  //magnificPopupInit();
  //logoAnimation.init();
  //logoAnimation.update();

  overlayInit();
  royalSliderInit();
  socialLinks.init();
});

// /* ====== ON RESIZE ====== */

function onResize() {
  browserSize();
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(update);
  }
  ticking = true;
}

function update() {

  Portfolio.getCurrent();
  ticking = false;
}

$window.on('debouncedresize', onResize);

$window.on('scroll', function() {
  latestKnownScrollY = window.scrollY;
  latestKnownScrollX = window.scrollX;
  requestTick();
});

$document.mousemove(function(e) {
    latestKnownMouseX = e.pageX - latestKnownScrollX;
    latestKnownMouseY = e.pageY - latestKnownScrollY;
});