const Student = require('../models/student');
const Career = require('../models/career');
const studentCTRL = {};

studentCTRL.getStudents = async (req, res) => {
    await Student.find().populate('course_asigned').exec((err, course) => {
        if (err) throw err;
        if (!course) {
            return res.json({ success: false, msg: 'Course not found' })
        } else {
            return res.json(course);
        }
    });
}

studentCTRL.getStudent = async (req, res) => {
    await Student.findOne({ carne: req.params.id }).populate('course_asigned').exec((err, course) => {
        if (err) throw err;
        if (!course) {
            return res.json({ success: false, msg: 'Student not found' })
        } else {
            return res.json(course);
        }
    });
}

studentCTRL.createStudent = async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.json({
        status: 'Student Created'
    });
}

studentCTRL.getStudentbyCarne = (req, res) => {
    const carne = req.params.id;
    Student.getStudentbyCarne(carne, (err, student) => {
        if (err) throw err;
        if (!student) {
            return res.json({ success: false, msg: 'Student not found' });
        } else {
            return res.json({ success: true, msg: "Student found", student: student });
        }
    });
}

studentCTRL.editStudent = async (req, res) => {
    const student = {
        carne: req.body.carne,
        name: req.body.name,
        lastName: req.body.lastName,
        fnac: req.body.fnac,
        cui: req.body.cui,
        tel: req.body.tel,
        address: req.body.address
    };
    await Student.findByIdAndUpdate(req.params.id, student);
    res.json({
        status: 'Student Edited'
    });
}

studentCTRL.deleteStudent = async (req, res) => {
    await Student.findByIdAndRemove(req.params.id);
    res.json({
        status: 'Student Deleted'
    });
}

studentCTRL.authInformation = (req, res) => {
    var student = JSON.parse(req.params.id);
    var carne, name, lastName, fnac, cui, tel, address;
    carne = isFilled(student.carne, "Carne");
    name = isFilled(student.name, "Name");
    lastName = isFilled(student.lastName, "Last Name");
    fnac = isFilled(student.fnac, "Born Date");
    cui = isFilled(student.cui, "CUI");
    tel = isFilled(student.tel, "Telephone");
    address = isFilled(student.address, "Address");
    if (carne.success && name.success && lastName.success && fnac.success &&
        cui.success && tel.success && address.success) {
        Student.getStudentbyCarne(student.carne, (err, stud) => {
            var c = student.carne.split("-");
            if (err) throw err;
            if (stud) {
                carne = { success: false, msg: 'Carne found, Enter an unused carne!' };
            } else {
                Career.getCareerbyCode(c[0], (err, career) => {
                    if (err) throw err;
                    if (career) {
                        carne = { success: true, msg: "Successfuly" }
                    } else {
                        carne = { success: false, msg: "Career not found!, Please enter a created career" };
                    }
                    tel = valTel(student.tel);
                    fnac = valDate(student.fnac);
                    cui = valCUI(student.cui);
                    res.json({ carne: carne, name: name, lastName: lastName, fnac: fnac, cui: cui, tel: tel, address: address });
                });
            }
        });
    } else {
        res.json({ carne: carne, name: name, lastName: lastName, fnac: fnac, cui: cui, tel: tel, address: address });
    }
}

var isFilled = (data, nameFiel) => {
    if (data == undefined || data == ' ' || data == '') {
        return { success: false, msg: 'The field "' + nameFiel + '" is empty' };
    } else {
        return { success: true, msg: 'The field is filled' };
    }
}

var replace = (a) => {
    var fnac = "";
    for (let i = 0; i < a.length; i++) {
        if (i != (a.length - 1)) {
            fnac += a[i] + "/";
        } else {
            fnac += a[i];
        }
    }
    return fnac;
}

var valDate = (date) => {
    data = replace(date.split("-"));
    var date_regex = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
    if (!(date_regex.test(date))) {
        return { success: false, msg: "Valid date is requiered [dd/mm/yyyy]" };
    } else {
        return { success: true, msg: "Successfuly" };
    }
}


var valCUI = (CUI) => {
    if (!isNaN(parseFloat(CUI)) && isFinite(CUI)) {
        if (CUI.length != 13) {
            return { success: false, msg: "The CUI is invalid, it can not have more or fewer than 13 digits." }
        } else {
            return { success: true, msg: "Successfuly" }
        }
    } else {
        return { success: false, msg: "The CUI is invalid, you only have to enter numbers" }
    }
}

var valTel = (tel) => {
    if (!isNaN(parseFloat(tel)) && isFinite(tel)) {
        if (tel.length != 8) {
            return { success: false, msg: "The telephone number is invalid, It can not have more or fewer than 8 digits." }
        } else {
            return { success: true, msg: "Successfuly" }
        }
    } else {
        return { success: false, msg: "The telephone number is invalid, you only have to enter numbers" }
    }
}

module.exports = studentCTRL;
