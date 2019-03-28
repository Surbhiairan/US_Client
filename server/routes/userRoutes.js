const express = require('express');
const userRouter = express.Router(); // eslint-disable-line new-cap
const userController = require('../controller/userController');
const collectionController = require('../controller/collectionController');
const Auth = require('../util/auth');


userRouter.post('/', userController.addUser)
userRouter.get('/', Auth.isAdminAuthenticated,userController.getAllUser)

userRouter.post('/authenticate', userController.authUser)
userRouter.post('/resetPassword', userController.resetPass)
userRouter.post('/resetPasswordLink', userController.sendResetPassLink)
userRouter.post('/:userId/activateUser', userController.activateUser)
userRouter.get('/:userId/collection', Auth.isAuthenticated, collectionController.getUsersCollection)
userRouter.post('/revokeRights', userController.revokeRights)
userRouter.post('/adminApprove', userController.adminApprove)



module.exports = userRouter;