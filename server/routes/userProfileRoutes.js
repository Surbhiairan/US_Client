const express = require('express');
const userProfileRouter = express.Router(); // eslint-disable-line new-cap
const userProfileController = require('../controller/userProfileController');
const Auth = require('../util/auth');


userProfileRouter.post('/', Auth.isAuthenticated ,userProfileController.addProfile)
userProfileRouter.patch('/', Auth.isAuthenticated ,userProfileController.updateProfile)
userProfileRouter.get('/:userId', Auth.isAuthenticated ,userProfileController.getProfile)


module.exports = userProfileRouter;