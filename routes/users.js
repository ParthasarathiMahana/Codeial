const express = require('express');
const { route } = require('.');
const router = express.Router();
const user = require('../controller/users_controller');
const passport = require('passport');


// router.get('/', user.user);
router.get('/sign-up',user.signUp);
router.get('/sign-in',user.signIn);

router.post('/create', user.create);

router.post('/create-session', passport.authenticate('local', {failureRedirect: '/user/sign-in'}),
user.createSession);

router.get('/', passport.checkAuthentication, user.user);

module.exports = router;