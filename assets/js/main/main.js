// /* ====== ON DOCUMENT READY ====== */

$(document).ready(function() {
  init();
});


function init() {
  window.scroller = new Scroller(window, function() {
      var x = scroller.get('x'),
          y = scroller.get('y');

      if ($('.single-jetpack-portfolio').length) {
        Portfolio.updateCurrent(x, y);
      }
  });

  platformDetect();
  Placeholder.update();
  Portfolio.init();

	var $filmstrip_container = $('.filmstrip');

  if ($filmstrip_container.length) {
	  $filmstrip_container.mixItUp({
      selectors: {
        target: '.filmstrip__item',
        filter: '.filter__item'
      }
    });

	  $('.nav-links .nav-previous a').click(function(){
		  $(this).addClass('loading');

		  var offset = $filmstrip_container.find('.filmstrip__item').length;

		  if (globalDebug) {console.log("Loading More Posts - AJAX Offset = " + offset);}

		  $.post(
			  timber_ajax.ajax_url,
			  {
				  action : 'timber_load_next_posts',
				  nonce : timber_ajax.nonce,
				  offset : offset
			  },
			  function(response_data) {

				  if( response_data.success ){
					  if (globalDebug) {console.log("Loaded next posts");}

					  var $result = $( response_data.data.posts );

					  if (globalDebug) {console.log("Adding new "+$result.length+" items to the DOM");}

					  $result.imagesLoaded(function(){
						  if (globalDebug) {console.log("MixItUp Filtering - Images Loaded");}

						  $filmstrip_container.mixItUp( 'append', $result );

						  //is_everything_loaded = true;

						  //if (globalDebug) {console.log("MixItUp Filtering - Filter by "+selector);}
					  });
				  } else {
					  //we have failed
					  //it's time to call it a day
					  if (globalDebug) {console.log("It seems that there are no more posts to load");}

					  $('.nav-links' ).remove();
				  }
			  }
		  );

		  return false;
	  });
  }
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