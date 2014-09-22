/** @jsx React.DOM */
/*global define,React */
define(["build/contact/contact"], function(ContactController) {

	var ContactField = React.createClass({displayName: 'ContactField',
		render: function () {
			var value = this.state.value;
			return (
				React.DOM.li(null, 
					React.DOM.div({className: "item-content"}, 
						React.DOM.div({className: "item-media"}, React.DOM.i({className: this.props.mediaClass})), 
						React.DOM.div({className: "item-inner"}, 
							React.DOM.div({className: "item-input"}, 
								React.DOM.input({name: this.props.name, type: this.props.type, onChange: this.handleChange, 
									placeholder: this.props.placeholder, value: value})
							)
						)
					)
				)
			);
		},
		getInitialState: function () {
			return {value: this.props.value };
		},
		handleChange: function(event) {
			this.setState({value: event.target.value });
		}
	});

	var ContactForm = React.createClass({displayName: 'ContactForm',
		render: function () {
			var items = [];
			var id = this.props.model.id;
			for (var i = 0; i < this.fields.length; i++) {
				this.fields[i].value = this.props.model[this.fields[i].name];
				this.fields[i].key = i;
				items.push(ContactField(this.fields[i]));
			}
			return (
				React.DOM.div({className: "page-content"}, 
					React.DOM.form({id: "contactEdit", className: "list-block"}, 
						React.DOM.ul(null, 
							React.DOM.input({name: "id", type: "hidden", value: id}), 
							items
						)
					)
				)
			);
		},
		fields: [
			{
				mediaClass: "icon ion-ios7-football-outline",
				name: "firstName",
				placeholder: "First name",
				type: "text"
			},
			{
				mediaClass: "icon ion-ios7-football-outline",
				name: "lastName",
				placeholder: "Last name",
				type: "text"
			},
			{
				mediaClass: "icon ion-ios7-telephone-outline",
				name: "phone",
				placeholder: "Phone",
				type: "tel"
			}
		]
	});

	var ContactNavbar = React.createClass({displayName: 'ContactNavbar',
		render: function() {
			var header = this.props.contactState.isNew ? "New contact" : "Contact";
			return (
				React.DOM.div({className: "navbar-wrapper"}, 
					React.DOM.div({className: "left sliding"}, 
						React.DOM.a({href: "#", className: "back link"}, 
							React.DOM.i({className: "icon icon-back"}), 
							React.DOM.span(null, "Back")
						)
					), 
					React.DOM.div({className: "center contacts-header"}, header), 
					React.DOM.div({className: "right contact-save-link", onClick: this.handleSave}, 
						React.DOM.a({href: "#", className: "link"}, 
							React.DOM.span(null, "Save")
						)
					)
				)
			);
		},
		handleSave: function() {
			ContactController.saveContact();
		}
	});

	return {
		init: function(query) {
			ContactController.init(query);
			React.renderComponent(ContactNavbar({contactState: ContactController.state}), document.getElementById('contact-navbar'));
			React.renderComponent(ContactForm({model: ContactController.model}), document.getElementById('contact-page'));
		}
	};
});



