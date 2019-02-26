const express = require('express');
const passport = require('passport');
const router = express.Router();

const user = require('../controllers/users.controller');

router.post('/register', user.register);
router.post('/register/auth', user.authRegisterInfo);
router.post('/authenticate', user.authenticate);
router.get('/profile', passport.authenticate('jwt', {session:false}), user.profile);
router.get('/email/:id', user.getUserByEmail);
router.get('/username/:id', user.getUserByUsername);
router.get('/user/:username', user.getUserByUser);
router.get('/id/:id', user.getUserById);

module.exports = router;
