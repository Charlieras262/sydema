const express = require('express');
const router = express.Router();

const teacher = require('../controllers/teacher.controller');

router.get('/', teacher.getTeachers);
router.get('/:id', teacher.getTeacher);
router.post('/', teacher.createTeacher);
router.put('/:id', teacher.editTeacher);
router.delete('/:id', teacher.deleteTeacher);

module.exports = router;
