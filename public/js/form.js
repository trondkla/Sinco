var ContactForm = React.createClass({displayName: "ContactForm",

	getInitialState: function() {
	    return {
	    	navn: "", 
	    	epost: "", 
	    	melding: "",
	    	meldingSendt: false,
	    	meldingLagret: false,
	    	feilVedSending: false
	    };
	},

	handleSubmit: function(e) {
	    e.preventDefault();
	    
		this.state.meldingSendt = true;

		var data = {
			navn: this.state.navn,
			epost: this.state.epost,
			melding: this.state.melding
		};

	    var view = this;
	    $.post("/contact/", data)
	    	.success(function() {
	    		view.setState({meldingLagret: true});
	    	})
	    	.error(function(){
	    		view.setState({feilVedSending: true});
	    	});
	},

	navnChanged: function(event) {
    	this.setState({
    		navn: event.target.value
    	});
	},

	epostChanged: function(event) {
    	this.setState({
    		epost: event.target.value
    	});
	},

	meldingChanged: function(event) {
    	this.setState({
    		melding: event.target.value
    	});
	},

	feilEpostLenke: function() {
		return "mailto:" + this.state.epost
		  + "?subject=Kontakskjema%20sinco&body="
		  + encodeURIComponent(this.state.melding) 
		  + "%0A%0AMvh%20"+encodeURIComponent(this.state.navn);
	},

	submitButtonDisabled: function() {
		return this.state.navn.length == 0
			|| this.state.epost.length == 0
			|| this.state.melding.length == 0
			|| this.state.feilVedSending
			|| this.state.meldingSendt
			|| this.state.meldingLagret;
	},

    render: function() {
    	return (
    		React.createElement("form", {onSubmit: this.handleSubmit}, 
		    	React.createElement("label", {className: "h6"}, "Navn"), 
		        React.createElement("input", {type: "text", className: "form-control", value: this.state.navn, onChange: this.navnChanged}), 
		        React.createElement("label", {className: "h6"}, "E-post"), 
		        React.createElement("input", {type: "text", className: "form-control", value: this.state.epost, onChange: this.epostChanged}), 
		        React.createElement("label", {className: "h6"}, "Melding"), 
		        React.createElement("textarea", {rows: "7", className: "form-control", value: this.state.melding, onChange: this.meldingChanged}), 
		        React.createElement("p", {className: this.state.feilVedSending ? '' : 'gjem'}, 
		        	"En feil oppstod og vi fikk ikke lagret meldingen din. ", React.createElement("br", null), 
		        	React.createElement("a", {href: this.feilEpostLenke(), target: "_blank"}, "Klikk her for å sende den som en epost istede")
		        ), 
		        React.createElement("button", {type: "submit", className: "btn btn-primary", disabled: this.submitButtonDisabled()}, 
		        	React.createElement("span", {className: this.state.meldingLagret ? "fui-check" : "fui-mail"})
		        ), 
		        React.createElement("div", {className: "phone"}, 
		            React.createElement("big", null, React.createElement("a", {href: "tel:99432910"}, "994 32 910"))
		        )
            )
        );
    }
});

React.render(React.createElement(ContactForm, null), document.getElementById("contact-form"));