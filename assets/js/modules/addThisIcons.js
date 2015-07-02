window.AddThisIcons = (function() {

	var addThisToolBox = '.addthis_toolbox',

		init = function() {
			if (window.addthis) {
				bindEvents();

				addthis.init();
			}
		},

		bindEvents = function() {
			if (globalDebug) {console.log("addthis::Load Script");}
			// Listen for the ready event
			addthis.addEventListener('addthis.ready', addThisReady);
		},

	/* --- AddThis On Ready - The API is fully loaded --- */
	//only fire this the first time we load the AddThis API - even when using ajax
		addThisReady = function () {
			if (globalDebug) {console.log("addthis::Ready");}
			addThisInit();
		},

	/* --- AddThis Init --- */
		addThisInit = function () {
			if (window.addthis) {
				if (globalDebug) {console.log("addthis::Toolbox INIT");}

				addthis.toolbox( addThisToolBox );
			}
		}

	return {
		init: init
	}
})();