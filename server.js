var express = require('express');
var bodyParser = require('body-parser')
var sendgrid = require('sendgrid');
var sendgridClient = sendgrid(process.env.sendgridKey);

var app = express();
app.use(express.static(__dirname + '/public'));

app.use( bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

//app.use(function(req, res, next) {
//	console.log()
//    if((!req.secure) && (req.get('X-Forwarded-Proto') !== 'https')) {
//        res.redirect('https://' + req.get('Host') + req.url);
//    }
//    else
//        next();
//});

app.set('port', process.env.PORT || 8888);

app.post('/contact', function(req, res) {

	var navn = req.body.navn;
	var epost = req.body.epost;
	var melding = req.body.melding;

	console.log(req.body);

	sendEpost(navn, epost, melding);

	var response = {
	    status  : 200,
	    success : 'Updated Successfully'
	};

	res.end(JSON.stringify(response));
});

app.listen(app.get('port'));
console.log("Listening to port " + app.get('port'));

function sendEpost(navn, epost, melding) {
	console.log("Sender melding fra " + epost + ": " + melding);

	sendgridClient.send({
	  to:       ['booking@sincoorchestra.com', 'trond@sincoorchestra.com'],
	  toname: 	["Booking Sinco Orchestra", 'Sinco'],
	  from:     epost,
	  fromname: navn,
	  replyto:  epost,
	  subject:  '[Sinco] Kontaktskjema',
	  text:     'Hei Vegard!\n'+navn+' ('+epost+') har lagt igjen beskjeden:\n\n'+melding,
	  html:     "<p>Hei Vegard!</p><p>"+navn+" ("+epost+") har lagt igjen beskjeden:</p><p>"+melding+"</p>"
	}, function(err, json) {
	  if (err) { return console.error(err); }
	  console.log(json);
	});
};

