const Career = require('../models/career');
const careerCTRL = {};

careerCTRL.getCareers = async (req, res) => {
    const career = await Career.find();
    res.json(career);
}

careerCTRL.getCareer = async (req, res) => {
    const career = await Career.findById(req.params.id);
    res.json(career);
}

careerCTRL.createCareer = async (req, res) => {
    const career = new Career(req.body);
    await career.save();
    res.json({
        status: 'Career Created'
    });
}

careerCTRL.editCareers = async (req, res) => {
    const career = {
        name: req.body.name,
        code: req.body.code,
        just: req.body.just
    }
    await Career.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: 'Career Updated'
    });
}

careerCTRL.deleteCareers = async (req, res) => {
    await Career.findByIdAndDelete(req.params.id);
    res.json({
        status: 'Career Deleted'
    });
}

careerCTRL.authCareerInfo = (req, res) => {
    var career = JSON.parse(req.params.id);
    var code, name;
    code = isFilled(career.code, "Code");
    name = isFilled(career.name, "Name");
    if (code.success && name.success) {
        Career.getCareerbyCode(career.code, (err, c) => {
            if (err) throw err;
            if (c) {
                code = { success: false, msg: 'Career code found, Please enter a career code valid (unused).' };
                if (c.name == career.name) {
                    name = { success: false, msg: 'Career name found, Please enter a career name valid (unused).' }
                }
            }
            res.json({ code: code, name: name });
        });
    } else {
        res.json({ code: code, name: name });
    }
}

var isFilled = (data, nameFiel) => {
    if (data == undefined || data == ' ' || data == '') {
        return { success: false, msg: 'The field "' + nameFiel + '" is empty' };
    } else {
        return { success: true, msg: 'The field is filled' };
    }
}

module.exports = careerCTRL;