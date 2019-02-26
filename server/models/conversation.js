const mongoose = require('mongoose');
const {Schema} = mongoose;

const ConversationSchema = new Schema({
  code: {type: String, required: true},
  msg: [{type: Schema.ObjectId, ref: 'Message', required: false}],
  last_msg: {type: String, required: false},
  lasDate: {type: String, required: false},
  q_msg: {type: Number, required: true},
  user_from: {type: String, required: true},
  user_to: {type: String, required: true}
});

module.exports = mongoose.model('Conversation', ConversationSchema);