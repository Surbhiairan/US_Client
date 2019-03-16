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



module.exports = router;