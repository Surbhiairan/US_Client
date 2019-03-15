const express = require('express');
const searchRouter = express.Router(); // eslint-disable-line new-cap
const Auth = require('../util/auth');
const searchController = require('../controller/searchController')

searchRouter.get('/', Auth.isAuthenticated ,searchController.search);

module.exports = searchRouter;