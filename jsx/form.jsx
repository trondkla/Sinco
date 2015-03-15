var re = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

var ContactForm = React.createClass({

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
    		<form onSubmit={this.handleSubmit}>
    			<section className={this.state.meldingLagret ? 'gjem' : ''}>
		    	<label className="h6">Navn</label>
		        <input type="text" className={this.state.ugyldigNavn ? 'form-control error' : 'form-control success'} value={this.state.navn} onChange={this.navnChanged} onBlur={this.navnChanged} />
		        <label className="h6">E-post</label>
		        <input type="text" className={this.state.ugyldigEpost ? 'form-control error' : 'form-control success'} value={this.state.epost} onChange={this.epostChanged} onBlur={this.epostBlur} />
		        <label className="h6">Melding</label>
		        <textarea rows="7" className={this.state.ugyldigMelding ? 'form-control error' : 'form-control success'} value={this.state.melding} onChange={this.meldingChanged} onBlur={this.meldingChanged}  />
		        </section>
		        <p className={this.state.meldingLagret ? '' : 'gjem'}>
		        	<b>Takk for meldingen din!</b>
		        </p>
		        <p className={this.state.ugyldigNavn ? 'error' : 'gjem'}>
		        	Du har glemt å skrive inn navn
		        </p>
		        <p className={this.state.ugyldigMelding ? 'error' : 'gjem'}>
		        	Du har glemt å skrive inn melding
		        </p>
		        <p className={this.state.ugyldigEpost ? 'error' : 'gjem'}>
		        	Ugyldig epostadresse. Epost må være fylt ut
		        </p>
		        <p className={this.state.feilVedSending ? 'error' : 'gjem'}>
		        	En feil oppstod og vi fikk ikke lagret meldingen din. <br />
		        	<a href={this.feilEpostLenke()} target="_blank">Klikk her for å sende den som en epost istede</a>
		        </p>
		        <button type="submit" className="btn btn-primary" disabled={this.submitButtonDisabled()}>
		        	<span className={this.state.meldingLagret ? "fui-check" : "fui-mail"}></span>
		        </button>
            </form>
        );
    }
});

React.render(<ContactForm />, document.getElementById("contact-form"));