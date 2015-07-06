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

	AddThisIcons.init();
}

// /* ====== ON WINDOW LOAD ====== */

$window.load(function() {
  overlayInit();
  royalSliderInit();
  socialLinks.init();
  $(".pixcode--tabs").organicTabs();
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

//// html body for ie
//$('html, body, *').mousewheel(function(event, delta) {
//  // this.scrollLeft -= (delta * 30);
//  if ($('.overlay').is('.loading')) {
//    this.scrollLeft -= (delta * event.deltaFactor); // delta for macos
//    event.preventDefault();
//  }
//});

$window.on('scroll', function() {
  latestKnownScrollY = window.scrollY;
  latestKnownScrollX = window.scrollX;
  requestTick();
});

$document.mousemove(function(e) {
    latestKnownMouseX = e.pageX - latestKnownScrollX;
    latestKnownMouseY = e.pageY - latestKnownScrollY;
});