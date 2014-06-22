var express = require("express");
var app = express();
var mdb = require('./../lib/moviedb')('066e575e5e7f7fcb03ebc6384a36e595');


app.get("/search/:query", function(req, res) {
    mdb.searchMovie({query: req.params.query}, function(err, result){
        res.json(result);
    });
});

app.listen(3000);


