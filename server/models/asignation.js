const mongoose = require('mongoose');
const {Schema} = mongoose;

const AsignationSchema = new Schema({
    carne_stud: {type: String, required: false},
    cod_course: {type: String, required: false},
    section: {type:String, required: true}
});

module.exports = mongoose.model('Asignation', AsignationSchema);
