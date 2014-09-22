var myApp = new Framework7({
});

var $$ = Dom7;

// Select Template
var template = document.getElementById('random-template').innerHTML;

// Compile and render
var compiledTemplate = Template7.compile(template);

// Defined as function "getrandom"
function getrandom() {
	// Get JSON Data from UrbanDictionary API 
	$$.getJSON ('http://api.urbandictionary.com/v0/random', function (json) {

	// Insert rendered template
	document.getElementById('content-wrap').innerHTML = compiledTemplate(json);
	});
};

// Execute to list UrbanDictionary Definitions
getrandom();

// Select Pull to refresh content
var ptrContent = $$('.pull-to-refresh-content');

// On refresh
ptrContent.on('refresh', function (e) {
	// Emulate 1s loading
	setTimeout(function () {

		// Execute getrandom to get new Definitions
		getrandom();

	myApp.pullToRefreshDone();
	}, 1000);
});


var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true
});

var modalInfo = localStorage.modalInfo;
if (!modalInfo) {
    myApp.modal({
    title: 'Welcome,',
    text: 'this is just an example to test out Template7 and the UrbanDictionary API. Pull to get new Random Definitions!',
    buttons: [
      {text: 'Okay'}] 
    });localStorage.modalInfo = 'true'
};