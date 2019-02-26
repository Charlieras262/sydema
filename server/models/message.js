const mongoose = require('mongoose');
const {Schema} = mongoose;

const MessageSchema = new Schema({
  data: {type: String, required: true},
  from: {type: String, required: true},
  to: {type: String, required: true},
  date: {type: String, required: true}
});

const Message = module.exports = mongoose.model('Message', MessageSchema);