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
		$('.filter').on('click', '.filter__item', (function() {
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
		}));
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
				} else {
					//something didn't quite make it - maybe there are no more posts
					//so we will assume that all posts are already loaded and proceed as usual
					isFirstFilterClick = false;
					isLoadingPosts = false;

					$filmstrip_container.mixItUp( 'filter', filterBy);
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