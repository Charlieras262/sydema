const Institution = require('../models/institution');
const institutionCTRL = {};

institutionCTRL.getInstitutions = async (req, res) => {
    const institution = await Institution.find();
    res.json(institution);
}

institutionCTRL.getInstitution = async (req, res) => {
    const institution = await Institution.findById(req.params.id);
    res.json(institution);
}

institutionCTRL.createInstitution = async (req, res) => {
    const institution = new Institution(req.body);
    await institution.save();
    res.json({
        status: 'Institution Created'
    });
}

institutionCTRL.editInstitutions = async (req, res) => {
    const institution = {
        name: req.body.name,
        code: req.body.code,
        just: req.body.just
    }
    await Institution.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: 'Institution Updated'
    });
}

institutionCTRL.deleteInstitutions = async (req, res) => {
    await Institution.findByIdAndDelete(req.params.id);
    res.json({
        status: 'Institution Deleted'
    });
}

institutionCTRL.authInstitutionInfo = (req, res) => {
    var institution = JSON.parse(req.params.id);
    var code, name;
    code = isFilled(institution.code, "Code");
    name = isFilled(institution.name, "Name");
    if (code.success && name.success) {
        Institution.getInstitutionbyCode(institution.code, (err, c) => {
            if (err) throw err;
            if (c) {
                code = { success: false, msg: 'Institution code found, Please enter a institution code valid (unused).' };
                if (c.name == institution.name) {
                    name = { success: false, msg: 'Institution name found, Please enter a institution name valid (unused).' }
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

module.exports = institutionCTRL;