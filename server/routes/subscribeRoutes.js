const express = require('express');
const subscribeRouter = express.Router(); // eslint-disable-line new-cap
const subscribeController = require('../controller/subscribeController');
const Auth = require('../util/auth');


subscribeRouter.post('/',subscribeController.subscribe)


module.exports = subscribeRouter;