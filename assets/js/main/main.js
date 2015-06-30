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

	var $filmstrip_container = $('.filmstrip');

  if ($filmstrip_container.length) {

	  //the mixitup logic with filtering
	  $filmstrip_container.mixItUp({
	      selectors: {
	        target: '.filmstrip__item'
	      }
	    });

	  //we will handle the binding of filter links because we need to load all posts on first filter click
	  $('.filter .filter__item').click(function() {
		  var filterBy = $(this ).data('filter');

		  //first make the current filter link active
		  $('.filter .filter__item').removeClass('active');
		  $(this).addClass('active');

		  if ( isFirstFilterClick == true ) {
			  //this is the first time the user has clicked a filter link
			  //we need to first load all posts before proceeding
			  var offset = $filmstrip_container.find('.filmstrip__item').length;

			  if (globalDebug) {console.log("Loading All Posts - AJAX Offset = " + offset);}

			  $.post(
				  timber_ajax.ajax_url,
				  {
					  action : 'timber_load_next_posts',
					  nonce : timber_ajax.nonce,
					  offset : offset,
					  posts_number: 'all'
				  },
				  function(response_data) {

					  if( response_data.success ){
						  if (globalDebug) {console.log("Loaded all posts");}

						  var $result = $( response_data.data.posts).filter('article');

						  if (globalDebug) {console.log("Adding new "+$result.length+" items to the DOM");}

						  $('.nav-links').fadeOut().remove();

						  $result.imagesLoaded(function(){
							  if (globalDebug) {console.log("MixItUp Filtering - Images Loaded");}

							  $filmstrip_container.mixItUp( 'append', $result, {filter: filterBy} );

						    //next time the user filters we will know
								isFirstFilterClick = false;

							  if (globalDebug) {console.log("MixItUp Filtering - Filter by "+filterBy);}
						  });
					  }
				  }
			  );

		  } else {
			  //just regular filtering from the second click onwards
			  $filmstrip_container.mixItUp( 'filter', filterBy);
		  }

		  return false;
	  });

	  //the infinite scroll logic on click
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

					  var $result = $( response_data.data.posts).filter('article');

					  if (globalDebug) {console.log("Adding new "+$result.length+" items to the DOM");}

					  $result.imagesLoaded(function(){
						  if (globalDebug) {console.log("MixItUp Filtering - Images Loaded");}

						  $filmstrip_container.mixItUp( 'append', $result );
					  });
				  } else {
					  //we have failed
					  //it's time to call it a day
					  if (globalDebug) {console.log("It seems that there are no more posts to load");}

					  $('.nav-links').fadeOut().remove();
				  }
			  }
		  );

		  return false;
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