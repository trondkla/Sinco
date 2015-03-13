var express = require('express');
var bodyParser = require('body-parser')
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill(process.env.mandrillKey);

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
	var message = {
	    "html": "<p>Hei!</p><p>"+navn+" ("+epost+") har lagt igjen beskjeden:</p><p>"+melding+"</p>",
	    "text": "Hei Vegard!\n"+navn+" ("+epost+") har lagt igjen beskjeden:\n\n"+melding,
	    "subject": "[Sinco] Kontaktskjema",
	    "from_email": epost,
	    "from_name": navn,
	    "to": [{
	            "email": "booking@sincoorchestra.com",
	            "name": "Booking Sinco Orchestra",
	            "type": "to"
	        }],
	    "headers": {
	        "Reply-To": epost
	    },
	    "important": false,
	    "metadata": {
	        "website": "www.sincoorchestra.com"
	    }
	};

	console.log("Sender melding til: ", message)
	mandrill_client.messages.send({"message": message, "async": false}, function(result) {
	    console.log(result);
	    /*
	    [{
	            "email": "recipient.email@example.com",
	            "status": "sent",
	            "reject_reason": "hard-bounce",
	            "_id": "abc123abc123abc123abc123abc123"
	        }]
	    */
	}, function(e) {
	    // Mandrill returns the error as an object with name and message keys
	    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
	});


};

