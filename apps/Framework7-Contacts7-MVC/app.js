require.config({
    paths: {
        handlebars: "lib/handlebars",
        text: "lib/text",
        hbs: "lib/hbs"
    },
    shim: {
        handlebars: {
            exports: "Handlebars"
        }
    }
});
define('app', ['js/router', 'js/utils'], function(Router, Utils) {
	Router.init();
	var f7 = new Framework7({
		modalTitle: 'Contacts7',
		swipePanel: 'left',
        animateNavBackIcon: true
	});
    var mainView = f7.addView('.view-main', {
        dynamicNavbar: true
    });
	Router.load('list');
	return {
		f7: f7,
		mainView: mainView,
		router: Router,
		utils: Utils
	};
});