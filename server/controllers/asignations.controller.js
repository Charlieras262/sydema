const Asignation = require('../models/asignation');
const Student = require('../models/student');
const Course = require('../models/course');
const asignationCTRL = {};

asignationCTRL.getAsignations = async (req, res) => {
    const asignation = await Asignation.find();
    res.json(asignation);
};

asignationCTRL.getAsignation = async (req, res) => {
    const asignation = await Asignation.findById(req.params.id);
    res.json(asignation);
};

asignationCTRL.createAsignation = async (req, res) => {
    const asignation = new Asignation(req.body);
    await asignation.save();
    res.json({
        status: 'Asignation Created'
    });
};

asignationCTRL.editAsignation = async (req, res) => {
    await Asignation.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: 'Asignation Updated'
    });
};

asignationCTRL.deleteAsignation = async (req, res) => {
    await Asignation.findByIdAndDelete(req.params.id);
    res.json({
        status: 'Asignation Deleted'
    });
};

asignationCTRL.authAsignationInfo = (req, res) => {
    var asignation = JSON.parse(req.params.id);
    var carne_stud, cod_course, section;
    carne_stud = isFilled(asignation.carne_stud, "Student Carne");
    cod_course = isFilled(asignation.cod_course, "Course Code");
    section = isFilled(asignation.section, "Section");
    if (carne_stud.success && cod_course.success && section.success) {
        Student.getStudentbyCarne(asignation.carne_stud, (err, student) => {
            if (err) throw err;
            if (!student) {
                carne_stud = { success: false, msg: 'You have to enter a Student ID already created' };
            } else {
                if (student.course_asigned.length < 5) {
                    carne_stud = { success: true, msg: 'You are able to add ' + (5 - student.course_asigned.length) + ' course(s) more.' }
                } else {
                    carne_stud = {
                        success: false,
                        msg: 'You are not able to add more courses to "' + student.carne + '" beacuse already has "' + student.course_asigned.length + '" courses asigned'
                    }
                }
            }
            Course.getCoursebyCode(asignation.cod_course, (err, course) => {
                if (err) throw err;
                if (!course) {
                    cod_course = { success: false, msg: 'You have to enter a Course Code already created' };
                } else {
                    if(student.course_asigned){
                        for (let i = 0; i < student.course_asigned.length; i++) {
                            if (student.course_asigned[i].toString() === course._id.toString()) {
                                cod_course = { success: false, msg: "You've already added the course " + course.name + " to student " + student.carne };
                                i = student.course_asigned.length;
                            } else {
                                var code = student.carne.split("-");
                                if (code[0].toString() !== course.cod_career.toString()) {
                                    cod_course = { success: false, msg: "You can not assign " + course.name + " Course to Student " + student.carne + "; because the Student and the Course are not belong to the same Career." };
                                }
                            }
                        }
                    }
                }
                section = valSection(asignation.section);
                if (carne_stud.success && cod_course.success && section.success) {
                    res.json({ carne: carne_stud, code: cod_course, section: section, success: true });
                } else {
                    res.json({ carne: carne_stud, code: cod_course, section: section, success: false });
                }
            });
        });
    } else {
        res.json({ carne: carne_stud, code: cod_course, section: section, success: false });
    }
};

asignationCTRL.addAsignation = async (req, res) => {
    var asignation = JSON.parse(req.params.id);
    await Course.getCoursebyCode(asignation.cod_course, (err, course) => {
        if (err) throw err;
        Student.findOneAndUpdate({ carne: asignation.carne_stud }, { $push: { course_asigned: course._id } }, (err, student) => {
            if (student) {
                res.json({ success: true, msg: 'Asignation Added Successfuly' });
            } else {
                res.json({ success: true, msg: 'Error: ' + err });
            }
        });
    });
};

asignationCTRL.delAsignation = async (req, res) => {
    var asignation = JSON.parse(req.params.id);
    await Course.getCoursebyCode(asignation.cod_course, (err, course) => {

        if (err) throw err;
        Student.findOneAndUpdate({ carne: asignation.carne_stud }, { $pull: { course_asigned: course._id } }, (err, student) => {
            if (student) {
                res.json({ success: true, msg: 'Asignation Deleted Successfuly' });
            } else {
                res.json({ success: true, msg: 'Error: ' + err });
            }
        });
    });
};

var isFilled = (data, nameFiel) => {
    if (data == undefined || data == ' ' || data == '') {
        return { success: false, msg: 'The field "' + nameFiel + '" is empty' };
    } else {
        return { success: true, msg: 'The field is filled' };
    }
};

var valSection = (section) => {
    const regxs = {
        lower: /^[a-z0-9 ]+$/,
        upper: /^[A-Z]+$/,
        upperLower: /^[A-Za-z0-9 ]+$/
    }
    if (section.length != 1 || !regxs.upper.test(section)) {
        return { success: false, msg: 'Section is Invalid, It would be only 1 character Upper Case' };
    } else {
        return { success: true, msg: 'Section is Valid' }
    }
};

module.exports = asignationCTRL;