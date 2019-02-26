const Conversation = require('../models/conversation');
const Chat = require('../models/chat');
const conversationCTRL = {};

conversationCTRL.createConversation = async (req, res) => {
  const conversation = new Conversation(req.body);
  await conversation.save();
  res.json({ success: true, msg: 'Conversation Updated', conv: conversation });
};

conversationCTRL.getCoversation = async (req, res) => {
  await Conversation.findOne({code: req.params.id}).populate('msg').exec((err, msg) => {
    if (!msg) {
      res.json({ success: false, msg: err });
    } else {
      res.json(msg);
    }
  });
}

conversationCTRL.addConversation = (req, res) => {
  Chat.findOneAndUpdate({ _id: req.body.id }, { $push: { conversation: req.body.conID } }, (err, chat) => {
    if (chat) {
      res.json({ success: true, msg: 'Conversation Added Successfuly' });
    } else {
      res.json({ success: false, msg: 'Error: ' + err });
    }
  });
}

conversationCTRL.editConversation = async (req, res) =>{
  await Conversation.findByIdAndUpdate(req.params.id, req.body);
  res.json({ success: true, msg: 'Conversation Updated'});
}

module.exports = conversationCTRL;