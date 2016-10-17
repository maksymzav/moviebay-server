const express = require('express');
const router = express.Router();
const objectID = require('mongodb').ObjectID;
const mongoClient = require('mongodb').MongoClient;
const Response = require('../classes/Response');
const Producer = require('../entities/producer');

let mongoPromise = mongoClient.connect('mongodb://localhost:27017/moviebay').then(db => db.collection('producers'));
/* GET producers listing. */
router.get('/', (req, res, next) => {
    mongoPromise.then(collection => {
        collection.find().map(producer => new Producer(producer)).toArray().then((data) => {
            res.json(Response.getSuccess(data));
        });
    });
});



/* GET a producer by id */
router.get('/id/:id', (req, res, next) => {
    mongoPromise.then(collection => {
        collection.find().toArray().then((data) => {
            let producer = data.find(producer => producer._id == req.params.id);
            if (!producer) {
                res.statusCode = 404;
                res.json(Response.notFoundError('User not found.'));
            } else {
                res.json(Response.getSuccess(new Producer(producer)));
            }
        });
    });
});

/* GET a producer by name */
router.get('/name/:name', (req, res, next) => {
    mongoPromise.then(collection => {
        collection.find().toArray().then((data) => {
            let producer = data.find(producer => producer.name == req.params.name);
            if (!producer) {
                res.statusCode = 404;
                res.json(Response.notFoundError('User not found.'));
            } else {
                res.json(Response.getSuccess(new Producer(producer)));
            }
        });
    });
});


/* INSERT new producer */
router.post('/', (req, res, next) => {
    let producer = new Producer(req.body);
    mongoPromise.then(collection => {
        collection.insertOne(producer)
            .then(() => {
                res.json(Response.createSuccess());
            });
    });
});

/*UPDATE producer by id*/
router.put('/id/:id', (req, res, next) => {
    mongoPromise.then(collection => {
        collection.update({_id: objectID(req.params.id)}, {$set: req.body})
            .then(() => {
                    res.json(Response.updateSuccess());
            });
  });
});


/* DELETE producer */
router.delete('/id/:id', (req, res, next) => {
    mongoPromise.then(collection => {
        collection.remove({ _id: objectID(req.params.id)})
            .then((error, data) => {
                res.json(Response.deleteSuccess());
            });
    });
});

module.exports = router;
