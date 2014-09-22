/** @jsx React.DOM */
define(["build/list/list"], function(List) {
	var ListItem = React.createClass({displayName: 'ListItem',
		render: function() {
			var id = this.props.model.id;
			var href = "contact.html?id=" + this.props.model.id;
			var title = this.props.model.firstName + " " + this.props.model.lastName;
			return (
				React.DOM.li({id: id, className: "swipeout"}, 
					React.DOM.a({href: href, className: "item-link item-content swipeout-content"}, 
						React.DOM.div({className: "item-media"}, React.DOM.i({className: "icon ion-ios7-person"})), 
						React.DOM.div({className: "item-inner"}, 
							React.DOM.div({className: "item-title"}, title)
						)
					), 
					React.DOM.div({className: "swipeout-actions"}, 
						React.DOM.div({className: "swipeout-actions-inner"}, 
							React.DOM.a({href: "#", className: "swipeout-delete"}, "Delete")
						)
					)
				)
				);
		},
		componentDidMount: function() {
			this.getDOMNode().addEventListener('deleted', this.handleDeleted);
		},
		handleDeleted: function(e) {
			var id = e.srcElement.id;
			List.deleteItem(id);
		}
	});

	var ListItems = React.createClass({displayName: 'ListItems',
		render: function() {
			var items = [];
			for (var i = 0; i< this.props.items.length; i++) {
				items.push(ListItem({
					model: this.props.items[i],
					key: this.props.items[i].id
				}));
			}
			return (
				React.DOM.div({className: "page-content"}, 
					React.DOM.div({className: "list-block contacts-list"}, 
						React.DOM.ul(null, items)
					)
				)
				);
		}

	});

	var ListNavbar = React.createClass({displayName: 'ListNavbar',
		render: function() {
			var header = "Contacts";
			var style = { left:"22px" };
			return (
				React.DOM.div({className: "navbar-wrapper"}, 
					React.DOM.div({className: "left"}), 
					React.DOM.div({className: "center", style: style}, header), 
					React.DOM.div({className: "right"}, 
						React.DOM.a({href: "contact.html", className: "link icon-only"}, React.DOM.i({className: "icon icon-plus"}, "+"))
					)
				)
			);
		}
	});

	var listItems = null;

	return {
		init: function() {
			var items = List.loadContacts();
			React.renderComponent(ListNavbar(null), document.getElementById('list-navbar'));
			listItems = React.renderComponent(ListItems({items: items}), document.getElementById('list-page'));
		},
		receiveMessage: function(message) {
			switch (message) {
				case 'update':
					listItems.setProps({items: List.loadContacts()});
					break;
			}
		}
	};
});