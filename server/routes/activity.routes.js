const express = require('express');
const router = express.Router();

const activity = require('../controllers/activity.controller');

router.get('/', activity.getHomeworks);
router.get('/:id', activity.getHomework);
router.post('/', activity.createHomework);
router.put('/:id', activity.editHomework);
router.delete('/:id', activity.deleteHomework);

module.exports = router;