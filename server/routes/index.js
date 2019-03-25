const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const userRoutes = require('./userRoutes');
const userProfileRoutes = require('./userProfileRoutes');
const collectionRoutes =  require('./collectionRoutes');
const postRouter = require('./postRouter');
const favCollectionRouter = require('./favCollectionRoutes')
const favPostRouter = require('../routes/favPostRouter');
const searchRouter = require('../routes/serachRouter');
const followerRouter = require('../routes/followerRoute'); 
const feedRouter = require('../routes/feedRoutes');
const commentRouter = require('../routes/commentRoutes');
const socialAuthRouter = require('../routes/socialAuthRouter');
const subscriberRouter = require('../routes/subscribeRoutes');
router.get('/ping', (req, res) =>
  res.send('pong')
);


router.use('/user', userRoutes);
router.use('/userprofile', userProfileRoutes);
router.use('/collection',collectionRoutes);
router.use('/post',postRouter);
router.use('/favcollection',favCollectionRouter);
router.use('/favPost',favPostRouter);
router.use('/search',searchRouter);
router.use('/follower',followerRouter);
router.use('/feed',feedRouter);
router.use('/comments',commentRouter);
router.use('/socialAuth',socialAuthRouter);
router.use('/subscribe',subscriberRouter);


module.exports = router;