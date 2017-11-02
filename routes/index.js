var express = require('express');
var router = express.Router();
var fs = require('fs');

var trumpQuotes;

fs.readFile(__dirname + '/trumpquotes', 'utf8', function (err, data) {
    if (err) throw err;
    trumpQuotes = JSON.parse(data);
});


/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile('index.html', {root: 'public'});
});


router.get('/random', function(req, res, next) {
    var randQuote = trumpQuotes[Math.floor(Math.random() * trumpQuotes.length)];
    res.status(200).json(randQuote);
});

router.get('/search', function (req, res, next) {
    var search = req.query.q.toLowerCase();
    var foundQuotes = [];

    if (!search){
        res.status(400).send("Error: no search query");
        return;
    }

    for (var i = 0; i < trumpQuotes.length; i++) {
        if (trumpQuotes[i].toLowerCase().indexOf(search) !== -1) {
            foundQuotes.push(trumpQuotes[i]);
        }
    }

    res.status(200).json(foundQuotes);
});

router.get('/all', function(req, res, next) {
    res.status(200).json(trumpQuotes);
});

module.exports = router;
