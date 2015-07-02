window.Blog = (function() {

	var $filmstrip_container = $('.filmstrip'),

		fullviewWidth = windowWidth,
		fullviewHeight = windowHeight,
		isFirstFilterClick = true,
		isLoadingPosts = false,
		filterBy = '',

		init = function() {

			if (!$filmstrip_container.length) {
				//placehold();
				return;
			}

			$('.navigation').hide();

			//mixitup init without filtering
			$filmstrip_container.mixItUp({
				animation: {
					effects: 'fade'
				},
				selectors: {
					target: '.filmstrip__item'
				}
			});

			bindEvents();

			//if there are not sufficient posts to have scroll - load the next page also (prepending)
			if ( $filmstrip_container.children('article').last().offset().left == 0 ) {
				loadNextPosts();
			}
		},

		prepare = function() {

		},

		bindEvents = function() {
			//we will handle the binding of filter links because we need to load all posts on first filter click
			$('.filter .filter__item').click(function() {
				filterBy = $(this ).data('filter');

				//first make the current filter link active
				$('.filter .filter__item').removeClass('active');
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
		},

		loadAllPosts = function() {
			var offset = $filmstrip_container.find('.filmstrip__item').length;

			if (globalDebug) {console.log("Loading All Posts - AJAX Offset = " + offset);}

			isLoadingPosts = true;

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
		},

		loadNextPosts = function() {
			var offset = $filmstrip_container.find('.filmstrip__item').length;

			if (globalDebug) {console.log("Loading More Posts - AJAX Offset = " + offset);}

			isLoadingPosts = true;

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

							isLoadingPosts = false;
						});
					} else {
						//we have failed
						//it's time to call it a day
						if (globalDebug) {console.log("It seems that there are no more posts to load");}

						$('.navigation').fadeOut();

						//don't make isLoadingPosts true so we won't load any more posts
					}
				}
			);
		},

		maybeLoadNextPosts = function() {
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
		prepare: prepare,
		loadAllPosts: loadAllPosts,
		loadNextPosts: loadNextPosts,
		maybeLoadNextPosts: maybeLoadNextPosts
	}
})();