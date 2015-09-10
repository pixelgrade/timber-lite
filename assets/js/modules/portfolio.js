var Portfolio = (function() {

	var $portfolio_container,
		isLoadingProjects = false,
		filterBy,
		isFirstFilterClick,

	init = function() {
		$portfolio_container = $('.portfolio-wrapper');
		filterBy = '';
		isFirstFilterClick = true;
		isLoadingProjects = false;
		
		if (!$portfolio_container.length) {
			return;
		}

		$('.navigation').hide();

		//mixitup init without filtering
		$portfolio_container.mixItUp({
			animation: {
				enable: false
			},
			selectors: {
				filter: '.no-real-selector-for-filtering',
				target: '.portfolio--project'
			},
			callbacks : {
				onMixEnd: function (state) {
					// show the elements that must be shown
					state.$show.each(function(){
						var $that = $(this);

						TweenMax.to($(this), .3 , { opacity: 1, onStart: function() {
								isSafari ? $that.css('display', '-webkit-flex') :  $that.css('display', 'flex');
								isIE ? $that.css('display', '-ms-flex') :  $that.css('display', 'flex');
							}
							}
						);
					});

					// hide the elements that must be hidden
					state.$hide.each(function(){
						var $that = $(this);

						TweenMax.to($(this), .3 , { opacity: 0, onComplete: function() {
								$that.css('display', 'none');
							}
							}
						);
					})
				}
			}
		});

		bindEvents();

		//if there are not sufficient projects to have scroll - load the next page also (prepending)
		if ( $portfolio_container.children('article').last().offset().top < window.innerHeight ) {
			loadNextProjects();
		}
	},

	bindEvents = function() {

		$('.site-content.portfolio-archive').on('scroll', function() {
			requestTick();
		});

		//we will handle the binding of filter links because we need to load all posts on first filter click
		$('.js-projects-filter').on('click', '.filter__item', (function() {
			filterBy = $(this).data('filter');

			// first make the current filter link active
			$('.filter__item').removeClass('active');
			$(this).addClass('active');

			if ( isFirstFilterClick == true ) {
				//this is the first time the user has clicked a filter link
				//we need to first load all posts before proceeding
				loadAllProjects();

			} else {
				//just regular filtering from the second click onwards
				$portfolio_container.mixItUp( 'filter', filterBy);
			}

			return false;
		}));

	},

	loadAllProjects = function() {
		var offset = $portfolio_container.find('.portfolio--project').length;

		if (globalDebug) {console.log("Loading All Projects - AJAX Offset = " + offset);}

		isLoadingProjects = true;

		var args = {
			action : 'timber_load_next_projects',
			nonce : timber_ajax.nonce,
			offset : offset,
			posts_number: 'all'
		};

		if ( !empty($portfolio_container.data('taxonomy')) ) {
			args['taxonomy'] = $portfolio_container.data('taxonomy');
			args['term_id'] = $portfolio_container.data('termid');
		}

		$.post(
			timber_ajax.ajax_url,
			args,
			function(response_data) {


				if( response_data.success ){
					if (globalDebug) {console.log("Loaded all projects");}

					var $result = $( response_data.data.posts).filter('article');

					if (globalDebug) {console.log("Adding new "+$result.length+" items to the DOM");}

					$('.navigation').hide().remove();

					$result.imagesLoaded(function(){

						//$portfolio_container.append( $result );

						$filmstrip_container.mixItUp( 'append', $result, {filter: filterBy} );

						//next time the user filters we will know
						isFirstFilterClick = false;
						isLoadingProjects = false;

						Placeholder.update();
					});
				} else {
					//something didn't quite make it - maybe there are no more posts (be optimistic about it)
					//so we will assume that all posts are already loaded and proceed as usual
					if (globalDebug) {console.log("MixItUp Filtering - There were no more posts to load - so filter please");}

					isFirstFilterClick = false;
					isLoadingProjects = false;

					$portfolio_container.mixItUp( 'filter', filterBy);
				}
			}
		);
	},

	loadNextProjects = function() {
		var offset = $portfolio_container.find('.portfolio--project').length;

		if (globalDebug) {console.log("Loading More Projects - AJAX Offset = " + offset);}

		isLoadingProjects = true;

		var args = {
			action : 'timber_load_next_projects',
			nonce : timber_ajax.nonce,
			offset : offset
		};

		if ( !empty($portfolio_container.data('taxonomy')) ) {
			args['taxonomy'] = $portfolio_container.data('taxonomy');
			args['term_id'] = $portfolio_container.data('termid');
		}

		$.post(
			timber_ajax.ajax_url,
			args,
			function(response_data) {

				if( response_data.success ){
					if (globalDebug) {console.log("Loaded next projects");}

					var $result = $( response_data.data.posts).filter('article');

					if (globalDebug) {console.log("Adding new "+$result.length+" items to the DOM");}

					$result.imagesLoaded(function(){

						//$portfolio_container.append( $result );
						$portfolio_container.mixItUp( 'append', $result, {filter: filterBy} );
						isLoadingProjects = false;

						Placeholder.update();
					});
				} else {
					//we have failed
					//it's time to call it a day
					if (globalDebug) {console.log("It seems that there are no more projects to load");}

					$('.navigation').fadeOut();

					$portfolio_container.mixItUp( 'filter', filterBy);

					//don't make isLoadingProjects true so we won't load any more projects
				}
			}
		);
	},

	maybeloadNextProjects = function() {
		if (!$portfolio_container.length || isLoadingProjects ) {
			return;
		}

		var $lastChild = $portfolio_container.children('article').last();

		//if the last child is in view then load more projects
		if ( $lastChild.is(':appeared') ) {
			loadNextProjects();
		}

	}

	return {
		init: init,
		loadAllProjects: loadAllProjects,
		loadNextProjects: loadNextProjects,
		maybeloadNextProjects: maybeloadNextProjects
	}
})();