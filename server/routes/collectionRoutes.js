const express = require('express');
const collectionRouter = express.Router(); // eslint-disable-line new-cap
const Auth = require('../util/auth');
const collectionController = require('../controller/collectionController');


collectionRouter.post('/', Auth.isAuthenticated ,collectionController.addCollection)


module.exports = collectionController;