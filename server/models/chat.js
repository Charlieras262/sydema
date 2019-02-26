const mongoose = require('mongoose');
const {Schema} = mongoose;

const ChatSchema = new Schema({
  _id: {type: String, required: true},
  conversation: [{type: Schema.ObjectId, ref: 'Conversation', required: false}]
});

module.exports = mongoose.model('Chat', ChatSchema);
