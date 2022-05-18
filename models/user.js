const { Schema, model } = require('mongoose');

const userSchema = () => {
  return new Schema(
    {
      name: { type: String, required: [true, '會員名稱必填'] },
      ws: { type: Object },
      messageid: [
        {
          type: Schema.Types.ObjectId,
          ref: 'message',
        },
      ],
      chatroomid: [
        {
          type: Schema.Types.ObjectId,
          ref: 'chatroom',
        },
      ],
    },
    {
      versionKey: false,
    }
  );
};

const userModel = model('user', userSchema());

module.exports = { userModel };
