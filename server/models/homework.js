const mongoose = require('mongoose');
const {Schema} = mongoose;

const HomeworkSchema = new Schema({
  fileId: [{type: String, required: false}],
  studId: {type: String, required: true},
  com: {type: String, required: false},
  checked: {type: Boolean, required: false},
  score: {type: Number, required: false}
});

const Homework = module.exports = mongoose.model('Homework', HomeworkSchema);