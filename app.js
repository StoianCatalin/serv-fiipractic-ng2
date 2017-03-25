var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var router = express().Router;

app.use(express.static(path.join(__dirname, 'public')));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(bodyParser.json());

var events = [
        {
            "id" : 1,
            "title": "Maximul curentului de meteori Quadrantide",
            "descriere" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat est id vehicula dictum. Donec facilisis ex ac erat iaculis, nec porta sapien posuere. Nam et felis at metus aliquam ornare. Sed erat arcu, cursus in sem ut, convallis vestibulum velit. Nam viverra ultrices velit, nec porttitor metus porta a.",
            "author" : "Alexandra",
            "image" : "http://www.astronomy.ro/wp-content/uploads/2012/12/quadrantide.png",
            "rating": 0,
            "locatie" : "Romania",
            "date" : "3- 4 ianuarie"
        },
        {
            "id" : 2,
            "title": "Planeta Venus la elongaţie estică maximă",
            "descriere" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat est id vehicula dictum. Donec facilisis ex ac erat iaculis, nec porta sapien posuere. Nam et felis at metus aliquam ornare. Sed erat arcu, cursus in sem ut, convallis vestibulum velit. Nam viverra ultrices velit, nec porttitor metus porta a.",
            "author" : "Andrei",
            "image" : "https://astrobarlad.files.wordpress.com/2015/07/leul.jpg",
            "rating": 3,
            "locatie" : "Australia",
            "date" : "12 ianuarie"
        },
        {
            "id" : 3,
            "title": "Echinocţiul de primăvară",
            "descriere" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat est id vehicula dictum. Donec facilisis ex ac erat iaculis, nec porta sapien posuere. Nam et felis at metus aliquam ornare. Sed erat arcu, cursus in sem ut, convallis vestibulum velit. Nam viverra ultrices velit, nec porttitor metus porta a.",
            "author" : "Stefana",
            "image" : "https://searchnewsglobal.files.wordpress.com/2014/03/1904008_240611409456304_1814717564_n.jpg",
            "rating": 5,
            "locatie" : "Romania",
            "date" : "20 martie"
        },
        {
            "id" : 4,
            "title": "Planeta Jupiter la opoziţie",
            "descriere" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat est id vehicula dictum. Donec facilisis ex ac erat iaculis, nec porta sapien posuere. Nam et felis at metus aliquam ornare. Sed erat arcu, cursus in sem ut, convallis vestibulum velit. Nam viverra ultrices velit, nec porttitor metus porta a.",
            "author" : "Oriana",
            "image" : "http://mediartv1.freenode.ro/image/201602/w620/jupiter_07483400.jpg",
            "rating": 0,
            "locatie" : "Romania",
            "date" : "7 aprilie"
        }
    ];

app.get('/', function (req, res) {
    res.sendfile('index.html');
});

app.get('/events/all', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(events);
});

app.get('/events/:id', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (events[req.params.id - 1])
        res.json(events[req.params.id - 1]);
    else
        res.sendStatus(404);
});

app.post('/events/insert', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var event = req.body;
    if (event.title && event.descriere && event.author && event.image && event.rating && event.locatie && event.date) {
        event.id = parseInt(events[events.length-1].id) + 1;
        events.push(event);
        res.sendStatus(201);
    }
    else {
        res.sendStatus(403)
    }
});

app.put('/events/edit/:id', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var event = req.body;
    if (events[req.params.id - 1]) {
        if (event.title && event.descriere && event.author && event.image && event.rating && event.locatie && event.date) {
            event.id = events[req.params.id - 1].id;
            events[req.params.id - 1] = event;
            res.json(events[req.params.id - 1]);
        }
        else
            res.sendStatus(403);
    }
    else
        res.sendStatus(404);
});

app.put('/events/upvote/:id', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (events[req.params.id - 1]) {
        if (events[req.params.id - 1].rating < 5)
            events[req.params.id - 1].rating = events[req.params.id - 1].rating + 1;
        res.sendStatus(200);
    }
    else {
        res.sendStatus(404);
    }
});

app.put('/events/downvote/:id', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (events[req.params.id - 1]) {
        if (events[req.params.id - 1].rating > 0)
            events[req.params.id - 1].rating = events[req.params.id - 1].rating - 1;
        res.sendStatus(200);
    }
    else {
        res.sendStatus(404);
    }
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err.stack)
});

app.listen(3232, function () {
    console.log('FII Practic server listening on port 3232!')
});