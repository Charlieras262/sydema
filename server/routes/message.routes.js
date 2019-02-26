const express = require('express');
const passport = require('passport');
const router = express.Router();

const message = require('../controllers/message.controller');

router.get('/:id', message.getMessage);
router.post('/', message.createMessage);
router.post('/add', message.addMessage);

module.exports = router;