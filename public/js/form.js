var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
//var re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

var ContactForm = React.createClass({displayName: "ContactForm",

	getInitialState: function() {
	    return {
	    	navn: "", 
	    	epost: "", 
	    	melding: "",
	    	meldingSendt: false,
	    	meldingLagret: false,
	    	feilVedSending: false,
	    	ugyldigEpost: false,
	    	ugyldigNavn: false,
	    	ugyldigMelding: false
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
    		ugyldigNavn: event.target.value.length == 0,
    		navn: event.target.value
    	});
	},

	epostChanged: function(event) {
		var epost = event.target.value;

		this.setState({
			epost: epost,
			ugyldigEpost: epost.length == 0
    	});
	},

	epostBlur: function(event) {
		var epost = event.target.value;

		this.setState({
			ugyldigEpost: !re.test(epost) || epost.length == 0
    	});
	},

	meldingChanged: function(event) {
    	this.setState({
    		melding: event.target.value,
    		ugyldigMelding: event.target.value.length == 0
    	});
	},

	feilEpostLenke: function() {
		return "mailto:booking@sincoorchestra.com"
		  + "?subject=Kontakskjema%20sinco&body="
		  + encodeURIComponent(this.state.melding) 
		  + "%0A%0AMvh%20"+encodeURIComponent(this.state.navn)
		  + "%0A" + encodeURIComponent(this.state.epost);
	},

	submitButtonDisabled: function() {
		return this.state.navn.length == 0
			|| this.state.epost.length == 0
			|| this.state.melding.length == 0
		    || this.state.feilVedSending
			|| this.state.meldingSendt
			|| this.state.meldingLagret
			|| this.state.ugyldigNavn
			|| this.state.ugyldigEpost
			|| this.state.ugyldigMelding;
	},

    render: function() {
    	return (
    		React.createElement("form", {onSubmit: this.handleSubmit}, 
    			React.createElement("section", {className: this.state.meldingLagret ? 'gjem' : ''}, 
		    	React.createElement("label", {className: "h6"}, "Navn"), 
		        React.createElement("input", {type: "text", className: this.state.ugyldigNavn ? 'form-control error' : 'form-control success', value: this.state.navn, onChange: this.navnChanged, onBlur: this.navnChanged}), 
		        React.createElement("label", {className: "h6"}, "E-post"), 
		        React.createElement("input", {type: "text", className: this.state.ugyldigEpost ? 'form-control error' : 'form-control success', value: this.state.epost, onChange: this.epostChanged, onBlur: this.epostBlur}), 
		        React.createElement("label", {className: "h6"}, "Melding"), 
		        React.createElement("textarea", {rows: "7", className: this.state.ugyldigMelding ? 'form-control error' : 'form-control success', value: this.state.melding, onChange: this.meldingChanged, onBlur: this.meldingChanged})
		        ), 
		        React.createElement("p", {className: this.state.meldingLagret ? '' : 'gjem'}, 
		        	React.createElement("b", null, "Takk for meldingen din!")
		        ), 
		        React.createElement("p", {className: this.state.ugyldigNavn ? 'error' : 'gjem'}, 
		        	"Du har glemt å skrive inn navn"
		        ), 
		        React.createElement("p", {className: this.state.ugyldigMelding ? 'error' : 'gjem'}, 
		        	"Du har glemt å skrive inn melding"
		        ), 
		        React.createElement("p", {className: this.state.ugyldigEpost ? 'error' : 'gjem'}, 
		        	"Ugyldig epostadresse. Epost må være fylt ut"
		        ), 
		        React.createElement("p", {className: this.state.feilVedSending ? 'error' : 'gjem'}, 
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