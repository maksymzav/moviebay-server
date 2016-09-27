const express = require('express');
const router = express.Router();
const mongoClient = require('mongodb').MongoClient;
const Response = require('../classes/Response');
const User = require('../entities/user');

let mongoPromise = mongoClient.connect('mongodb://localhost:27017/moviebay').then(db => db.collection('users'));
/* GET users listing. */
router.get('/', (req, res, next) => {
    mongoPromise.then(collection => {
        collection.find().map(user => new User(user)).toArray().then((data)=> {
            res.json(Response.getSuccess(data));
        });
    });
});

/* GET a user by id */
router.get('/id/:id', (req, res, next) => {
    mongoPromise.then(collection => {
        collection.find().toArray().then((data)=> {
            let user = data.find(user => user._id == req.params.id);
            if (!user){
                res.statusCode = 404;
                res.json(Response.notFoundError('User not found.'));
            } else {
                res.json(Response.getSuccess(new User(user)));
            }
        });
    });
});

/* GET a user by login */
router.get('/login/:login', (req, res, next) => {
    mongoPromise.then(collection => {
        collection.find().toArray().then((data)=> {
            let user = data.find(user => user.login == req.params.login);
            if (!user){
                res.statusCode = 404;
                res.json(Response.notFoundError('User not found.'));
            } else {
                res.json(Response.getSuccess(new User(user)));
            }
        });
    });
});

/* INSERT new user */
router.post('/', (req, res, next) => {
    let user = new User(req.body);
    mongoPromise.then(collection => {
        collection.insertOne(user)
            .then(()=>{
                res.json(Response.createSuccess());
            });
    });

});

module.exports = router;
