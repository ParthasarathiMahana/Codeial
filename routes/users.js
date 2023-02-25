const express = require('express');
const { route } = require('.');
const router = express.Router();
const user = require('../controller/users_controller');

router.get('/', user.user);
router.get('/sign-up',user.signUp);
router.get('/sign-in',user.signIn);

router.post('/create', user.create);

module.exports = router;