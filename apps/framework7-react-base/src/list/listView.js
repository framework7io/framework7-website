/** @jsx React.DOM */
define(["build/list/list"], function(List) {
	var ListItem = React.createClass({
		render: function() {
			var id = this.props.model.id;
			var href = "contact.html?id=" + this.props.model.id;
			var title = this.props.model.firstName + " " + this.props.model.lastName;
			return (
				<li id={id} className="swipeout">
					<a href={href} className="item-link item-content swipeout-content">
						<div className="item-media"><i className="icon ion-ios7-person"></i></div>
						<div className="item-inner">
							<div className="item-title">{title}</div>
						</div>
					</a>
					<div className="swipeout-actions">
						<div className="swipeout-actions-inner">
							<a href="#" className="swipeout-delete">Delete</a>
						</div>
					</div>
				</li>
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

	var ListItems = React.createClass({
		render: function() {
			var items = [];
			for (var i = 0; i< this.props.items.length; i++) {
				items.push(ListItem({
					model: this.props.items[i],
					key: this.props.items[i].id
				}));
			}
			return (
				<div className="page-content">
					<div className="list-block contacts-list">
						<ul>{items}</ul>
					</div>
				</div>
				);
		}

	});

	var ListNavbar = React.createClass({
		render: function() {
			var header = "Contacts";
			var style = { left:"22px" };
			return (
				<div className="navbar-wrapper">
					<div className="left"></div>
					<div className="center" style={style}>{header}</div>
					<div className="right">
						<a href="contact.html" className="link icon-only"><i className="icon icon-plus">+</i></a>
					</div>
				</div>
			);
		}
	});

	var listItems = null;

	return {
		init: function() {
			var items = List.loadContacts();
			React.renderComponent(<ListNavbar />, document.getElementById('list-navbar'));
			listItems = React.renderComponent(<ListItems items = {items} />, document.getElementById('list-page'));
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