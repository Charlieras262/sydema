const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentSchema = new Schema({
    carne:{type: String, require: true},
    name: {type: String, require: true},
    lastName: {type: String, required: true},
    fnac: {type: String, require: true},
    cui: {type: String, required: true},
    tel: {type: String, require: true},
    address: {type: String, require: true},
    course_asigned: [{type: Schema.ObjectId, ref: 'Course', required: false}]
});

const Student = module.exports = mongoose.model('Student', StudentSchema);

module.exports.getStudentbyCarne = function(id, callback){
    var query = {carne: id}; 
    Student.findOne(query, callback).populate('course_asigned');
}