const { getMsgFromChatroom } = require('../repository/wsRepl');
const { userModel } = require('../models/user');
const { messageModel } = require('../models/message');
const { chatroomModel } = require('../models/chatroom');

const msg = async (req, res, next) => {
  const msgData = {
    // userid: req.body.id,
    chatroomid:req.body.chatroomId,
    // content: req.body.content,
  };
  try {
    const result = await getMsgFromChatroom(msgData);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = msg;
