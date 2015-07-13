var Portfolio = (function() {

	var $portfolio_container,

		isLoadingProjects = false,

	init = function() {
		$portfolio_container = $('.portfolio-wrapper');

		if (!$portfolio_container.length) {
			return;
		}

		$('.navigation').hide();

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

	},

	loadAllProjects = function() {
		var offset = $portfolio_container.find('.portfolio--project').length;

		if (globalDebug) {console.log("Loading All Projects - AJAX Offset = " + offset);}

		isLoadingProjects = true;

		$.post(
			timber_ajax.ajax_url,
			{
				action : 'timber_load_next_projects',
				nonce : timber_ajax.nonce,
				offset : offset,
				posts_number: 'all'
			},
			function(response_data) {

				if( response_data.success ){
					if (globalDebug) {console.log("Loaded all projects");}

					var $result = $( response_data.data.posts).filter('article');

					if (globalDebug) {console.log("Adding new "+$result.length+" items to the DOM");}

					$('.navigation').hide().remove();

					$result.imagesLoaded(function(){

						$portfolio_container.append( $result );

						Placeholder.update();

						isLoadingProjects = false;
					});
				}
			}
		);
	},

	loadNextProjects = function() {
		var offset = $portfolio_container.find('.portfolio--project').length;

		if (globalDebug) {console.log("Loading More Projects - AJAX Offset = " + offset);}

		isLoadingProjects = true;

		$.post(
			timber_ajax.ajax_url,
			{
				action : 'timber_load_next_projects',
				nonce : timber_ajax.nonce,
				offset : offset
			},
			function(response_data) {

				if( response_data.success ){
					if (globalDebug) {console.log("Loaded next projects");}

					var $result = $( response_data.data.posts).filter('article');

					if (globalDebug) {console.log("Adding new "+$result.length+" items to the DOM");}

					$result.imagesLoaded(function(){

						$portfolio_container.append( $result );

						Placeholder.update();

						isLoadingProjects = false;
					});
				} else {
					//we have failed
					//it's time to call it a day
					if (globalDebug) {console.log("It seems that there are no more projects to load");}

					$('.navigation').fadeOut();

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