const Course = require('../models/course');
const courseCTRL = {};

courseCTRL.getCourses = async (req, res) => {
    const courses = await Course.find();
    res.json(courses);
}

courseCTRL.getCourse = async (req, res) => {
    const course = await Course.findById(req.params.id);
    res.json(course);
}

courseCTRL.createCourse = async (req, res) => {
    const course = new Course(req.body);
    await course.save();
    res.json({
        status: 'Course created'
    });
}

courseCTRL.editCourse = async (req, res) => {
    const course = {
        cod_career: req.body.cod_career,
        name: req.body.name,
        cod_course: req.body.cod_course,
        cycle: req.body.cycle,
        section: req.body.section,
        st_time: req.body.st_time,
        end_time: req.body.end_time,
        cod_teacher: req.body.cod_teacher
    }
    await Course.findByIdAndUpdate(req.params.id, course);
    res.json({
        status: 'Course Updated'
    });
}

courseCTRL.deleteCourse = async (req, res) => {
    const course = await Course.findByIdAndDelete(req.params.id);
    res.json({
        status: 'Course Deleted'
    });
}

module.exports = courseCTRL;
