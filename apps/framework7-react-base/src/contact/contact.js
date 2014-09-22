define(["app", "build/contactModel"], function(app, ContactModel) {

	var ContactController = {
		model: null,
		state: {isNew: false},
		init: init,
		saveContact: saveContact
	};

	function init(query){
		if (query && query.id) {
			var contacts = JSON.parse(localStorage.getItem("f7Base"));
			for (var i = 0; i< contacts.length; i++) {
				if (contacts[i].id === query.id) {
					ContactController.model = new ContactModel(contacts[i]);
					ContactController.state.isNew = false;
					break;
				}
			}
		}
		else {
			ContactController.model = new ContactModel();
			ContactController.state.isNew = true;
		}
	}

	function saveContact() {
		var contact = ContactController.model;
		var formInput = app.f7.formToJSON('#contactEdit');
		contact.setValues(formInput);
		if (!contact.validate()) {
			app.f7.alert("First name and last name are empty");
			return;
		}
		var contacts = JSON.parse(localStorage.getItem("f7Base"));
		if (ContactController.state.isNew) {
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
		app.router.sendMessage('list', 'update');
		app.mainView.goBack();
	}

	return ContactController;
});