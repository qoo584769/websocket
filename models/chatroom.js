const { Schema, model } = require('mongoose');;

const chatroomSchema = () => {
  return new Schema(
    {
      creator:{
        type:String,
      },
      userid: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
      ],
      messageid: [
        {
          type: Schema.Types.ObjectId,
          ref: 'message',
        },
      ],
      createdAt: {
        type: Date,
        default: new Date,
      },
    },
    {
      versionKey: false,
    }
  );
};

const chatroomModel = model('chatroom', chatroomSchema());

module.exports = { chatroomModel };
