var express = require('express');
var bodyParser = require('body-parser')

var app = express();
app.use(express.static(__dirname + '/public'));

app.use( bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.set('port', process.env.PORT || 8888);

app.post('/contact', function(req, res) {

	var navn = req.body.navn;
	var epost = req.body.epost;
	var melding = req.body.melding;

	var response = {
	    status  : 200,
	    success : 'Updated Successfully'
	};

	res.end(JSON.stringify(response));
});

app.listen(app.get('port'));
console.log("Listening to port " + app.get('port'));

