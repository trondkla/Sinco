var express = require('express');
var bodyParser = require('body-parser')

var app = express();
app.use(express.static(__dirname + '/public'));

app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.post('/contact', function(req, res) {
	var name = req.body.name,
        color = req.body.color;
        console.log(name);
});

app.listen(process.env.PORT || 8888);


