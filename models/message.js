const { Schema, model } = require('mongoose');

const messageSchema = () => {
  return new Schema(
    {
      content: {
        type: String,
        require: [true, '訊息內容需填寫'],
      },
      userid: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      chatroomid: {
        type: Schema.Types.ObjectId,
        ref: 'chatroom',
      },
    },
    {
      versionKey: false,
    }
  );
};

const messageModel = model('message', messageSchema());

module.exports = { messageModel };
