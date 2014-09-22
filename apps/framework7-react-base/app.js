define('app', ['build/router'], function(Router) {
	Router.init();
	var f7 = new Framework7({
		modalTitle: 'F7-MVC-Base',
		animateNavBackIcon: true
	});
	var mainView = f7.addView('.view-main', {
		dynamicNavbar: true
	});
	return {
		f7: f7,
		mainView: mainView,
		router: Router
	};
});