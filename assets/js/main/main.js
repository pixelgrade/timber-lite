// /* ====== ON DOCUMENT READY ====== */

$(document).ready(function() {
  init();
});


function init() {
  platformDetect();
  browserSize();

  if ($('.single-jetpack-portfolio').length) {
    Project.init();
    Placeholder.update();
    Project.prepare();
  } else {
    Placeholder.update();
  }

	Portfolio.init();
	Blog.init();
}

// /* ====== ON WINDOW LOAD ====== */

$window.load(function() {
  overlayInit();
  frontpageSlider.init();
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
  Project.getCurrent();
	Portfolio.maybeloadNextProjects();
	Blog.maybeLoadNextPosts();
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