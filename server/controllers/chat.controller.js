const Chat = require('../models/chat');
const chatCTRL = {};

chatCTRL.createChat = async (req, res) => {
  const chat = new Chat(req.body);
  await chat.save();
  res.json({
    status: 'Chat Created'
  });
}

chatCTRL.getChat = async (req, res) => {
  await Chat.findById(req.params.id).populate('conversation').populate({path: 'conversation', populate: { path: 'msg' }}).exec((err, conversation) => {
    if(err) throw err;
    if (!conversation) {
      res.json({ success: false, msg: 'Chat not found' });
    } else {
      res.json({ success: true, chat: conversation});
    }
  });
}

module.exports = chatCTRL;
