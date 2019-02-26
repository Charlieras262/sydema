const express = require('express');
const router = express.Router();

const homework = require('../controllers/homework.controller');

router.get('/', homework.getHomeworks);
router.get('/:id', homework.getHomework);
router.post('/', homework.createHomework);
router.put('/:id', homework.editHomework);
router.delete('/:id', homework.deleteHomework);

module.exports = router;