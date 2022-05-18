const { getDB, createUserDB,createChatroomDB,addChatrommDB, postDB } = require('../repository/wsRepl');
const { userModel } = require('../models/user');
const { messageModel } = require('../models/message');
const { chatroomModel } = require('../models/chatroom');
const { headers } = require('../utils/headers');

const createChatroom = async (req, res, next) => {
  const chatroom = {
    creator:req.body.id,
    userid: req.body.id,
  };
  try {
      const result = await createChatroomDB(chatroomModel,chatroom)
      headers();
      res.json({ result: result});
  } catch (error) {
      console.log(error);      
  }
};
const addChatroom = async (req, res, next) => {
  const chatroom = {
    chatroomid:req.body.chatroomid,
    userid: req.body.userid,
  };
  
  try {
      const result = await addChatrommDB(chatroom)
      headers();
      res.json(result);
  } catch (error) {
      console.log(error);      
  }
};

module.exports = {createChatroom,addChatroom};
