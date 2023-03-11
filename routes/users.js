const express = require('express');
const router = express.Router();
const passport = require('passport');

const user = require('../controller/users_controller');

router.get('/profile', passport.checkAuthentication, user.profile);

router.get('/sign-up',user.signUp);
router.get('/sign-in',user.signIn);

router.post('/create', user.create);

router.post('/create-session', passport.authenticate(
    'local', {failureRedirect: '/user/sign-in'}
    ),user.createSession);

router.get('/sign-out', user.destroySession);

module.exports = router;