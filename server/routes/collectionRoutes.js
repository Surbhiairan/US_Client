const express = require('express');
const collectionRouter = express.Router(); // eslint-disable-line new-cap
const Auth = require('../util/auth');
const CollectionController = require('../controller/collectionController');
const PostController = require('../controller/postController');


collectionRouter.get('/', Auth.isAuthenticated ,CollectionController.getAllcollection)
collectionRouter.get('/:collectionId', Auth.isAuthenticated ,CollectionController.getAllcollectionById)
collectionRouter.get('/:collectionId/post', Auth.isAuthenticated ,PostController.getAllPostByCollectionId)

collectionRouter.post('/', Auth.isAuthenticated ,CollectionController.addCollection)
collectionRouter.patch('/:collectionId', Auth.isAuthenticated ,CollectionController.editCollection)
collectionRouter.get('/:collectionId/followers',CollectionController.getcollectionFollowers)
collectionRouter.delete('/:collectionId', Auth.isAuthenticated ,CollectionController.deleteCollection)

module.exports = collectionRouter;