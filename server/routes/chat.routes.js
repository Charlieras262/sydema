const express = require('express');
const passport = require('passport');
const router = express.Router();

const chat = require('../controllers/chat.controller');

router.get('/:id', chat.getChat);
router.post('/', chat.createChat);

module.exports = router;