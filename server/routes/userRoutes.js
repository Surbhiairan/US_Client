const express = require('express');
const userRouter = express.Router(); // eslint-disable-line new-cap
const userController = require('../controller/userController');



userRouter.post('/', userController.addUser)
userRouter.post('/authenticate', userController.authUser)
userRouter.post('/resetPassword', userController.resetPass)
userRouter.post('/:userId/activateUser', userController.activateUser)


module.exports = userRouter;