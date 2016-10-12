const express = require('express');
const router = express.Router();
const mongoClient = require('mongodb').MongoClient;
const Response = require('../classes/Response');
const Film = require('../entities/film');

let mongoPromise = mongoClient.connect('mongodb://localhost:27017/moviebay').then(db => db.collection('films'));
/* GET films listing. */
router.get('/', (req, res, next) => {
    mongoPromise.then(collection => {
        collection.find().map(film => new Film(film)).toArray().then((data) => {
            res.json(Response.getSuccess(data));
        });
    });
});



/* GET a film by id */
router.get('/id/:id', (req, res, next) => {
    mongoPromise.then(collection => {
        collection.find().toArray().then((data) => {
            let film = data.find(film => film._id == req.params.id);
            if (!film) {
                res.statusCode = 404;
                res.json(Response.notFoundError('User not found.'));
            } else {
                res.json(Response.getSuccess(new Film(film)));
            }
        });
    });
});

/* GET a film by name */
router.get('/name/:name', (req, res, next) => {
    mongoPromise.then(collection => {
        collection.find().toArray().then((data) => {
            let film = data.find(film => film.name == req.params.name);
            if (!film) {
                res.statusCode = 404;
                res.json(Response.notFoundError('User not found.'));
            } else {
                res.json(Response.getSuccess(new Film(film)));
            }
        });
    });
});

/* GET a film by producer id */
router.get('/producerid/:producerid', (req, res, next) => {
    mongoPromise.then(collection => {
        collection.find().toArray().then((data) => {
            let film = data.find(film => film.producer.id == req.params.producerid);
            if (!film) {
                res.statusCode = 404;
                res.json(Response.notFoundError('User not found.'));
            } else {
                res.json(Response.getSuccess(new Film(film)));
            }
        });
    });
});

/* INSERT new film */
router.post('/', (req, res, next) => {
    let film = new Film(req.body);
    mongoPromise.then(collection => {
        collection.insertOne(film)
            .then(() => {
                res.json(Response.createSuccess());
            });
    });

});

module.exports = router;
