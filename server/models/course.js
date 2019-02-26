const mongoose = require('mongoose');
const {Schema} = mongoose;

const CourseSchema = new Schema({
    cod_career: {type: String, required: true},
    name: {type: String, required: false},
    cod_course: {type: String, required: true},
    cycle: {type: String, required: true},
    section: {type: String, required: true},
    st_time: {type: String, required: true},
    end_time: {type: String, required: true},
    cod_teacher: {type: String, required: false}
});

const Course = module.exports = mongoose.model('Course', CourseSchema);

module.exports.getCoursebyCode = function(id, callback){
    var query = {cod_course: id};
    Course.findOne(query, callback);
}
