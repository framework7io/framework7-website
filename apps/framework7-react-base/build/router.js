define(function() {
	var $ = Framework7.$;

	/**
	 * Init router, that handle page events
	 */
    function init() {
		$(document).on('pageBeforeInit', function (e) {
			var page = e.detail.page;
			load(page.name, page.query);
		});
    }

	/**
	 * Load (or reload) view module from js code
	 * @param moduleName
	 * @param query
	 */
	function load(moduleName, query) {
		require(['build/' + moduleName + '/'+ moduleName + 'View'], function(module) {
			module.init(query);
		});
	}

	/**
	 * Send message to module
	 * @param moduleName
	 * @param query
	 */
	function sendMessage(moduleName, message) {
		require(['build/' + moduleName + '/'+ moduleName + 'View'], function(module) {
			module.receiveMessage(message);
		});
	}

	return {
        init: init,
		load: load,
		sendMessage: sendMessage
    };
});