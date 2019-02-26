const express = require('express');
const passport = require('passport');
const router = express.Router();

const conversation = require('../controllers/conversation.controller');

router.get('/:id', conversation.getCoversation);
router.post('/', conversation.createConversation);
router.post('/add', conversation.addConversation);
router.put('/:id', conversation.editConversation);

module.exports = router;