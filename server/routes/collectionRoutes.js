const express = require('express');
const collectionRouter = express.Router(); // eslint-disable-line new-cap
const Auth = require('../util/auth');
const CollectionController = require('../controller/collectionController');


collectionRouter.post('/', Auth.isAuthenticated ,CollectionController.addCollection)

collectionRouter.get('/', Auth.isAuthenticated , function(req,req){
    res.send("Ok")     
});

module.exports = collectionRouter;