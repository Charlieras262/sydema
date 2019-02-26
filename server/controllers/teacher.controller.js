const Teacher = require('../models/teacher');
const teacherCTRL = {};

teacherCTRL.getTeachers = async (req, res) => {
    const teacher = await Teacher.find();
    res.json(teacher);
}

teacherCTRL.getTeacher = async (req, res) => {
    var code = req.params.id;
    Teacher.getTeacherbyCode(code, (err, teacher) => {
        if (err) throw err;
        if (!teacher) {
            return res.json({ success: false, msg: 'Teacher not found' });
        } else {
            return res.json({ success: true, msg: "Teacher found", teacher: teacher});
        }
    });
}

teacherCTRL.createTeacher = async (req, res) =>{
    const teacher = new Teacher(req.body);
    await teacher.save();
    res.json({
        status: 'Teacher Saved'
    });
}

teacherCTRL.editTeacher = async (req, res) => {
    const teacher = {
        code: req.body.code,
        name: req.body.name,
        lastName: req.body.lastName,
        fnac: req.body.fnac,
        cui: req.body.cui,
        esp: req.body.esp,
        master: req.body.master,
        colNum: req.body.colNum,
        col: req.body.col
    }
    await Teacher.findByIdAndUpdate(req.params.id, teacher);
    res.json({
        status: 'Teacher Updated'
    });
}

teacherCTRL.deleteTeacher = async (req, res) => {
    await Teacher.findByIdAndDelete(req.params.id);
    res.json({
        status: 'Teacher Deleted'
    });
}

module.exports = teacherCTRL;