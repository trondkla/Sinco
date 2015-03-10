var ContactForm = React.createClass({

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
    		<form onSubmit={this.handleSubmit}>
		    	<label className="h6">Navn</label>
		        <input type="text" className="form-control" value={this.state.navn} onChange={this.navnChanged} />
		        <label className="h6">E-post</label>
		        <input type="text" className="form-control" value={this.state.epost} onChange={this.epostChanged} />
		        <label className="h6">Melding</label>
		        <textarea rows="7" className="form-control" value={this.state.melding} onChange={this.meldingChanged} />
		        <p className={this.state.feilVedSending ? '' : 'gjem'}>
		        	En feil oppstod og vi fikk ikke lagret meldingen din. <br />
		        	<a href={this.feilEpostLenke()} target="_blank">Klikk her for å sende den som en epost istede</a>
		        </p>
		        <button type="submit" className="btn btn-primary" disabled={this.submitButtonDisabled()}>
		        	<span className={this.state.meldingLagret ? "fui-check" : "fui-mail"}></span>
		        </button>
		        <div className="phone">
		            <big><a href="tel:99432910">994 32 910</a></big>
		        </div>
            </form>
        );
    }
});

React.render(<ContactForm />, document.getElementById("contact-form"));