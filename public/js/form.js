var ContactForm = React.createClass({displayName: "ContactForm",

	getInitialState: function() {
	    return {navn: "test", epost: "", melding: ""};
	},

	handleSubmit: function(e) {
	    e.preventDefault();
	    
	    console.log(this.state);
	},

    render: function() {
    	return (
    		React.createElement("form", {onSubmit: this.handleSubmit}, 
		    	React.createElement("label", {className: "h6"}, "Navn"), 
		        React.createElement("input", {type: "text", className: "form-control", value: this.state.navn}), 
		        React.createElement("label", {className: "h6"}, "E-post / Mobil"), 
		        React.createElement("input", {type: "text", className: "form-control", value: this.state.epost}), 
		        React.createElement("label", {className: "h6"}, "Melding"), 
		        React.createElement("textarea", {rows: "7", className: "form-control", value: this.state.melding}), 
		        React.createElement("button", {type: "submit", className: "btn btn-primary"}, React.createElement("span", {className: "fui-mail"})), 
		        React.createElement("div", {className: "phone"}, 
		            React.createElement("big", null, React.createElement("a", {href: "tel:99432910"}, "994 32 910"))
		        )
            )
        );
    }
});

React.render(React.createElement(ContactForm, null), document.getElementById("contact-form"));