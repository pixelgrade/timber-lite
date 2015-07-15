var Blog = (function() {

	var $filmstrip_container,
		fullviewWidth,
		fullviewHeight,
		isFirstFilterClick,
		isLoadingPosts,
		filterBy;

	function init() {

		$filmstrip_container = $('.filmstrip');
		fullviewWidth = windowWidth;
		fullviewHeight = windowHeight;
		isFirstFilterClick = true;
		isLoadingPosts = false;
		filterBy = '';

		if (!$filmstrip_container.length) {
			//this is not a blog archive so bail
			return;
		}

		$filmstrip_container.find('.filmstrip__item').each(function(i, obj) {
			var $item 		= $(obj).show(),
				$thumb 		= $item.find('.entry-thumbnail'),
				thumbWidth 	= $thumb.outerWidth(),
				thumbHeight = $thumb.outerHeight(),
				$image  	= $thumb.find('img'),
				imageWidth 	= $image.width(),
				imageHeight = $image.height(),
				scaleX		= thumbWidth / imageWidth,
				scaleY		= thumbHeight / imageHeight,
				scale 		= Math.max(scaleX, scaleY);

			$image.css({
				'min-width': 0,
				'min-height': 0,
				'width': imageWidth * scale,
				'height': imageHeight * scale
			});

			$item.hide();
		});

		$('.navigation').hide();

		//mixitup init without filtering
		$filmstrip_container.mixItUp({
			animation: {
				effects: 'fade'
			},
			selectors: {
				filter: '.no-real-selector-for-filtering',
				target: '.filmstrip__item'
			}
		});

		bindEvents();

		//if there are not sufficient posts to have scroll - load the next page also (prepending)
		if ( $filmstrip_container.children('article').last().offset().left == 0 ) {
			loadNextPosts();
		}
	}

	function bindEvents() {
		//we will handle the binding of filter links because we need to load all posts on first filter click
		$('.filter__item').click(function() {
			filterBy = $(this).data('filter');

			// first make the current filter link active
			$('.filter__item').removeClass('active');
			$(this).addClass('active');

			if ( isFirstFilterClick == true ) {
				//this is the first time the user has clicked a filter link
				//we need to first load all posts before proceeding
				loadAllPosts();

			} else {
				//just regular filtering from the second click onwards
				$filmstrip_container.mixItUp( 'filter', filterBy);
			}

			return false;
		});
	}

	function loadAllPosts() {
		var offset = $filmstrip_container.find('.filmstrip__item').length;

		if (globalDebug) {console.log("Loading All Posts - AJAX Offset = " + offset);}

		isLoadingPosts = true;

		var args = {
				action : 'timber_load_next_posts',
				nonce : timber_ajax.nonce,
				offset : offset,
				posts_number: 'all'
			};

		if ( !empty($filmstrip_container.data('taxonomy')) ) {
			args['taxonomy'] = $filmstrip_container.data('taxonomy');
			args['term_id'] = $filmstrip_container.data('termid');
		} else if ( !empty($filmstrip_container.data('search')) ) {
			args['search'] = $filmstrip_container.data('search');
		}

		$.post(
			timber_ajax.ajax_url,
			args,
			function(response_data) {

				if( response_data.success ){
					if (globalDebug) {console.log("Loaded all posts");}

					var $result = $( response_data.data.posts).filter('article');

					if (globalDebug) {console.log("Adding new "+$result.length+" items to the DOM");}

					$('.navigation').hide().remove();

					$result.imagesLoaded(function(){
						if (globalDebug) {console.log("MixItUp Filtering - Images Loaded");}

						$filmstrip_container.mixItUp( 'append', $result, {filter: filterBy} );

						//next time the user filters we will know
						isFirstFilterClick = false;

						isLoadingPosts = false;

						if (globalDebug) {console.log("MixItUp Filtering - Filter by "+filterBy);}
					});
				}
			}
		);
	}

	function loadNextPosts() {
		var offset = $filmstrip_container.find('.filmstrip__item').length;

		if (globalDebug) {console.log("Loading More Posts - AJAX Offset = " + offset);}

		isLoadingPosts = true;
		$('.preloader').css('opacity', 1);

		var args = {
			action : 'timber_load_next_posts',
			nonce : timber_ajax.nonce,
			offset : offset
		};

		if ( ! empty($filmstrip_container.data('taxonomy')) ) {
			args['taxonomy'] = $filmstrip_container.data('taxonomy');
			args['term_id'] = $filmstrip_container.data('termid');
		} else if ( !empty($filmstrip_container.data('search')) ) {
			args['search'] = $filmstrip_container.data('search');
		}

		$.post(
			timber_ajax.ajax_url,
			args,
			function(response_data) {

				if( response_data.success ){
					if (globalDebug) {console.log("Loaded next posts");}

					var $result = $( response_data.data.posts).filter('article');

					if (globalDebug) {console.log("Adding new "+$result.length+" items to the DOM");}

					$result.imagesLoaded(function(){
						if (globalDebug) {console.log("MixItUp Filtering - Images Loaded");}

						$filmstrip_container.mixItUp( 'append', $result );

						isLoadingPosts = false;
					});
				} else {
					//we have failed
					//it's time to call it a day
					if (globalDebug) {console.log("It seems that there are no more posts to load");}

					$('.navigation').fadeOut();

					//don't make isLoadingPosts true so we won't load any more posts
				}

				$('.preloader').css('opacity', 0);
			}
		);
	}

	function maybeLoadNextPosts() {
		if (!$filmstrip_container.length || isLoadingPosts ) {
			return;
		}

		var $lastChild = $filmstrip_container.children('article').last();

		//if the last child is in view then load more posts
		if ( $lastChild.is(':appeared') ) {
			loadNextPosts();
		}

	}

	return {
		init: init,
		loadAllPosts: loadAllPosts,
		loadNextPosts: loadNextPosts,
		maybeLoadNextPosts: maybeLoadNextPosts
	}
})();