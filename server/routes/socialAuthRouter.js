const express = require('express');
const socialAuthRouter = express.Router(); // eslint-disable-line new-cap
const socialAuthController = require('../controller/socialAuthController')

socialAuthRouter.post('/' ,socialAuthController.login);

module.exports = socialAuthRouter;