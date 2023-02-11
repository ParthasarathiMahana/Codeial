const express = require('express');
const { route } = require('.');
const router = express.Router();
const user = require('../controller/users_controller');

router.get('/', user.user);

module.exports = router;