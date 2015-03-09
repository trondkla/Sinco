var ContactForm = React.createClass({

	getInitialState: function() {
	    return {navn: "test", epost: "", melding: ""};
	},

	handleSubmit: function(e) {
	    e.preventDefault();
	    
	    console.log(this.state);
	},

    render: function() {
    	return (
    		<form onSubmit={this.handleSubmit}>
		    	<label className="h6">Navn</label>
		        <input type="text" className="form-control" value={this.state.navn} />
		        <label className="h6">E-post / Mobil</label>
		        <input type="text" className="form-control" value={this.state.epost} />
		        <label className="h6">Melding</label>
		        <textarea rows="7" className="form-control" value={this.state.melding} />
		        <button type="submit" className="btn btn-primary"><span className="fui-mail"></span></button>
		        <div className="phone">
		            <big><a href="tel:99432910">994 32 910</a></big>
		        </div>
            </form>
        );
    }
});

React.render(<ContactForm />, document.getElementById("contact-form"));