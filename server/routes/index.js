const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const userRoutes = require('./userRoutes');
const userProfileRoutes = require('./userProfileRoutes');
const collectionRoutes =  require('./collectionRoutes');
router.get('/ping', (req, res) =>
  res.send('pong')
);


router.use('/user', userRoutes);
router.use('/userprofile', userProfileRoutes);
router.use('/collections',collectionRoutes);

module.exports = router;