const mongoose = require('mongoose');
const {Schema} = mongoose;

const ActivitySchema = new Schema({
  name: {type: String, required: true},
  teachId: {type: String, required: true},
  courseId: {type: String, required: true},
  homework: {type: Schema.ObjectId, ref: 'Homework', required: false},
  desc: {type: String, required: false}
});

const Activity = module.exports = mongoose.model('Activity', ActivitySchema);