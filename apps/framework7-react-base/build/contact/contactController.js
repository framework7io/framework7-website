define(["app","js/contact/contactView", "js/contactModel"], function(app, ContactView, Contact) {

	var state = {isNew: false};
	var contact = null;
	var bindings = [{
		element: '.contact-save-link',
		event: 'click',
		handler: saveContact
	}];

	function init(query){
		if (query && query.id) {
			var contacts = JSON.parse(localStorage.getItem("f7Base"));
			for (var i = 0; i< contacts.length; i++) {
				if (contacts[i].id === query.id) {
					contact = new Contact(contacts[i]);
					state.isNew = false;
					break;
				}
			}
		}
		else {
			contact = new Contact();
			state.isNew = true;
		}
		ContactView.render({
			model: contact,
			state: state,
			bindings: bindings
		});
	}

	function saveContact() {
		var formInput = app.f7.formToJSON('#contactEdit');
		contact.setValues(formInput);
		if (!contact.validate()) {
			app.f7.alert("First name and last name are empty");
			return;
		}
		var contacts = JSON.parse(localStorage.getItem("f7Base"));
		if (state.isNew) {
			contacts.push(contact);
		}
		else {
			for (var i = 0; i< contacts.length; i++) {
				if (contacts[i].id === contact.id) {
					contacts[i] = contact;
					break;
				}
			}
		}
		localStorage.setItem("f7Base", JSON.stringify(contacts));
		app.router.load('list');
		app.mainView.goBack();
	}

	return {
		init: init
	};
});