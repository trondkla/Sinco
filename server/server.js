var express = require("express");
var app = express();
app.use(express.static(__dirname + '/public'));

app.get("/contact/", function(req, res) {
	console.log(req);
});

app.listen(process.env.PORT || 3000);


