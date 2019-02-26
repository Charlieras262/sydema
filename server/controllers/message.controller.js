const Message = require('../models/message');
const Conversation = require('../models/conversation');
const messageCTRL = {};

messageCTRL.createMessage = async (req, res) => {
  const message = new Message(req.body);
  await message.save();
  res.json({
    status: 'Message Created',
    msg: message
  });
}

messageCTRL.getMessage = async (req, res) => {
  const msg = await Message.findOne({from: req.params.id});
  res.json(msg);
}

messageCTRL.addMessage = (req, res) => {
  Conversation.findByIdAndUpdate(req.body.id, {msg: req.body.conID}, (err, conv) => {
    if(err) throw err;
    if (conv) {
      res.json({ success: true, msg: 'Message Added Successfuly' , conv});
    } else {
      res.json({ success: false, msg: 'Error: ' + err });
    }
  });
}

module.exports = messageCTRL;
