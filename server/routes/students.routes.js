const express = require('express');
const router = express.Router();

const student = require ('../controllers/student.controller');

router.get('/', student.getStudents);
router.post('/', student.createStudent);
router.get('/1/:id', student.getStudent);
router.get('/:id', student.getStudentbyCarne);
router.get('/auth/:id', student.authInformation);
router.put('/:id', student.editStudent);
router.delete('/:id', student.deleteStudent);

module.exports = router;