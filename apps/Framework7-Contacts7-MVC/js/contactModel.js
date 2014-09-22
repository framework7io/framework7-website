define(['app'],function(app) {

    function Contact(values) {
		values = values || {};
		this.id = values['id'] || app.utils.generateGUID();
		this.picId = values['picId'] || app.utils.getRandomInt(1,10);
		this.createdOn = values['createdOn'] || new Date();

		this.firstName = values['firstName'] || '';
		this.lastName = values['lastName'] || '';
		this.company = values['company'] || '';
		this.phone = values['phone'] || '';
		this.email = values['email'] || '';
		this.city = values['city'] || '';
		this.isFavorite = values['isFavorite'] || false;
    }

	Contact.prototype.setValues = function(inputValues) {
		for (var i = 0, len = inputValues.length; i < len; i++) {
			var item = inputValues[i];
			if (item.type === 'checkbox') {
				this[item.id] = item.checked;
			}
			else {
				this[item.id] = item.value;
			}
		}
	};

	Contact.prototype.validate = function() {
		var result = true;
		if (_.isEmpty(this.firstName) && _.isEmpty(this.lastName)) {
			result = false;
		}
		return result;
	};

    return Contact;
});