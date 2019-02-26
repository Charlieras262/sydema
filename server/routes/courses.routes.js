const express = require('express');
const router = express.Router();

const course = require('../controllers/course.controller');

router.get('/', course.getCourses);
router.get('/:id', course.getCourse);
router.post('/', course.createCourse);
router.put('/:id', course.editCourse);
router.delete('/:id', course.deleteCourse);

module.exports = router;
