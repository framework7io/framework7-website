define(["app", "js/contactModel","js/list/listView"], function(app, Contact, ListView) {

	/**
	 * Bindings array. Bind DOM event to some handler function in controller
	 * @type {*[]}
	 */
	var bindings = [{
		element: '.contact-add-link',
		event: 'click',
		handler: openAddPopup
	}, {
		element: '.list-panel-all',
		event: 'click',
		handler: showAll
	}, {
		element: '.list-panel-favorites',
		event: 'click',
		handler: showFavorites
	}
	];

	var state = {
		isFavorite: false
	};

    function init() {
		var contacts = loadContacts();
		ListView.render({
			bindings: bindings,
			model: contacts
		});
	}

	function openAddPopup() {
		app.router.load('contactEdit', { 'isFavorite': state.isFavorite });
	}

	function showAll() {
		state.isFavorite = false;
		var contacts = loadContacts();
		ListView.reRender({ model: contacts, header: "Contacts" });
	}

	function showFavorites() {
		state.isFavorite = true;
		var contacts = loadContacts({ isFavorite: true });
		ListView.reRender({ model: contacts, header: "Favorites" });
	}

	function loadContacts(filter) {
		var f7Contacts = localStorage.getItem("f7Contacts");
		var contacts = f7Contacts ? JSON.parse(f7Contacts) : tempInitializeStorage();
		if (filter) {
			contacts = _.filter(contacts, filter);
		}
		contacts.sort(contactSort);
		contacts = _.groupBy(contacts, function(contact) { return contact.firstName.charAt(0); });
		contacts = _.toArray(_.mapValues(contacts, function(value, key) { return { 'letter': key, 'list': value }; }));
		return contacts;
	}

	function tempInitializeStorage() {
		var contacts = [
			new Contact({ "firstName": "Alex", "lastName": "Black", "company": "Global Think", "phone": "+380631234561", "email": "ainene@umail.com", "city": "London", isFavorite: true }),
			new Contact({ "firstName": "Kate", "lastName": "Shy", "company": "Big Marketing", "phone": "+380631234562", "email": "mimimi@umail.com", "city": "Moscow" }),
			new Contact({ "firstName": "Michael", "lastName": "Fold", "company": "1+1", "email": "slevoc@umail.com", "city": "Kiev", isFavorite: true }),
			new Contact({ "firstName": "Ann", "lastName": "Ryder", "company": "95 Style", "email": "ryder@umail.com", "city": "Kiev" }),
			new Contact({ "firstName": "Andrew", "lastName": "Smith", "company": "Cycle", "phone": "+380631234567", "email": "drakula@umail.com", "city": "Kiev" }),
			new Contact({ "firstName": "Olga", "lastName": "Blare", "company": "Finance Time", "phone": "+380631234566", "email": "olga@umail.com", "city": "Kiev" }),
			new Contact({ "firstName": "Svetlana", "lastName": "Kot", "company": "Global Think", "phone": "+380631234567", "email": "kot@umail.com", "city": "Odessa" }),
			new Contact({ "firstName": "Kate", "lastName": "Lebedeva", "company": "Samsung", "phone": "+380631234568", "email": "kate@umail.com", "city": "Kiev" }),
			new Contact({ "firstName": "Oleg", "lastName": "Price", "company": "Unilever", "phone": "+380631234568", "email": "uni@umail.com", "city": "Praha", isFavorite: true }),
			new Contact({ "firstName": "Ivan", "lastName": "Ivanov", "company": "KGB", "phone": "+380631234570", "email": "agent@umail.com", "city": "Moscow" }),
			new Contact({ "firstName": "Nadya", "lastName": "Lovin", "company": "Global Think", "phone": "+380631234567", "email": "kot@umail.com", "city": "Odessa" }),
			new Contact({ "firstName": "Alex", "lastName": "Proti", "company": "Samsung", "phone": "+380631234568", "email": "kate@umail.com", "city": "Kiev" }),
			new Contact({ "firstName": "Oleg", "lastName": "Ryzhkov", "company": "Unilever", "phone": "+380631234568", "email": "uni@umail.com", "city": "Praha", isFavorite: true }),
			new Contact({ "firstName": "Daniel", "lastName": "Ricci", "company": "Finni", "phone": "+380631234570", "email": "agent@umail.com", "city": "Milan" })
		];
		localStorage.setItem("f7Contacts", JSON.stringify(contacts));
		return JSON.parse(localStorage.getItem("f7Contacts"));
	}

	function contactSort(a, b) {
		if (a.firstName > b.firstName) {
			return 1;
		}
		if (a.firstName === b.firstName && a.lastName >= b.lastName) {
			return 1;
		}
		return -1;
	}

    return {
        init: init
    };
});