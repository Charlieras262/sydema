const mongoose = require('mongoose');
const {Schema} = mongoose;

const InstitutionSchema = new Schema({
    code: {type: String, required: true},
    name: {type: String, required: true}
});

const Institution = module.exports = mongoose.model('Institution', InstitutionSchema);

module.exports.getInstitutionbyCode = function(id, callback){
    var query = {code: id};
    Institution.findOne(query, callback);
}

module.exports.getInstitutionbyName = function(name, callback){
    var query = {name: name};
    Institution.findOne(query, callback);
}