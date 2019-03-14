const express = require('express');
const collectionRouter = express.Router(); // eslint-disable-line new-cap
const Auth = require('../util/auth');
const CollectionController = require('../controller/collectionController');

collectionRouter.get('/', Auth.isAuthenticated ,CollectionController.getAllcollection)
collectionRouter.post('/', Auth.isAuthenticated ,CollectionController.addCollection)
collectionRouter.patch('/:collectionId', Auth.isAuthenticated ,CollectionController.editCollection)


module.exports = collectionRouter;