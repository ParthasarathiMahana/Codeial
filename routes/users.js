const express = require('express');
const router = express.Router();
const passport = require('passport');

const user = require('../controller/users_controller');

router.get('/profile/:id', passport.checkAuthentication, user.profile);
router.post('/update/:id', passport.checkAuthentication, user.update);


router.get('/sign-up',user.signUp);
router.get('/sign-in',user.signIn);

router.post('/create', user.create);

router.post('/create-session', passport.authenticate(
    'local', {failureRedirect: '/user/sign-in'}
    ),user.createSession);

router.get('/sign-out', user.destroySession);

router.get('/auth/google', passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),user.createSession);

module.exports = router;