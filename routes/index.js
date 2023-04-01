const express = require('express');

const router = express.Router();
const homeController = require('../controller/home_controller.js');

console.log('router loaded');

router.get('/', homeController.home);
router.use('/user', require('./users.js'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));

// for any further routes, access from here

router.use('/api', require('./api'));

module.exports = router;