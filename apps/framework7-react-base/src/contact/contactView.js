/** @jsx React.DOM */
/*global define,React */
define(["build/contact/contact"], function(ContactController) {

	var ContactField = React.createClass({
		render: function () {
			var value = this.state.value;
			return (
				<li>
					<div className="item-content">
						<div className="item-media"><i className={this.props.mediaClass}></i></div>
						<div className="item-inner">
							<div className="item-input">
								<input name={this.props.name} type={this.props.type} onChange={this.handleChange}
									placeholder={this.props.placeholder} value={value} />
							</div>
						</div>
					</div>
				</li>
			);
		},
		getInitialState: function () {
			return {value: this.props.value };
		},
		handleChange: function(event) {
			this.setState({value: event.target.value });
		}
	});

	var ContactForm = React.createClass({
		render: function () {
			var items = [];
			var id = this.props.model.id;
			for (var i = 0; i < this.fields.length; i++) {
				this.fields[i].value = this.props.model[this.fields[i].name];
				this.fields[i].key = i;
				items.push(ContactField(this.fields[i]));
			}
			return (
				<div className="page-content">
					<form id="contactEdit" className="list-block">
						<ul>
							<input name="id" type="hidden" value={id} />
							{items}
						</ul>
					</form>
				</div>
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

	var ContactNavbar = React.createClass({
		render: function() {
			var header = this.props.contactState.isNew ? "New contact" : "Contact";
			return (
				<div className="navbar-wrapper">
					<div className="left sliding">
						<a href="#" className="back link">
							<i className="icon icon-back"></i>
							<span>Back</span>
						</a>
					</div>
					<div className="center contacts-header">{header}</div>
					<div className="right contact-save-link" onClick={this.handleSave}>
						<a href="#" className="link">
							<span>Save</span>
						</a>
					</div>
				</div>
			);
		},
		handleSave: function() {
			ContactController.saveContact();
		}
	});

	return {
		init: function(query) {
			ContactController.init(query);
			React.renderComponent(<ContactNavbar contactState = {ContactController.state}/>, document.getElementById('contact-navbar'));
			React.renderComponent(<ContactForm model = {ContactController.model} />, document.getElementById('contact-page'));
		}
	};
});



