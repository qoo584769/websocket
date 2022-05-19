// require('../connection/mongooseDB');
const { userModel } = require('../models/user');
const { messageModel } = require('../models/message');
const { chatroomModel } = require('../models/chatroom');

// 用傳進來的model去資料庫搜尋
async function getDB(schemaModel, modelData = {}) {
  try {
    // 這邊直接寫死關聯訊息集合
    const result = await schemaModel
      .find(modelData.q)
      .populate({ path: 'messageid', select: 'name shot createAt messageid' })
      .sort(modelData.timeSort);
    return result;
  } catch (error) {
    console.log('查詢失敗');
    console.log(error);
  }
}

async function postDB(schemaModel, modelData) {
  try {
    // 新增貼文
    const newPost = await schemaModel.create(modelData);
    // 新增貼文成功會把貼文ID加入發文者的貼文裡面
    const addMsgIdInUser = await userModel.findByIdAndUpdate(
      { _id: newPost.userid },
      { $push: { messageid: newPost._id } },
      { new: true }
    );
    console.log('DB資料新增成功');
    return addMsgIdInUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}
// 建立使用者
async function createUserDB(schemaModel, modelData) {
  console.log(modelData);
  try {
    // 新增使用者
    const newUser = await schemaModel.create(modelData);
    console.log('使用者新增成功');
    return newUser;
  } catch (error) {
    return error;
  }
}
// 建立聊天室
async function createChatroomDB(schemaModel, modelData) {
  try {
    // 新增聊天室
    const chatData = { creator: modelData.creator };
    const newChatroom = await schemaModel.create(chatData);
    // 新增聊天室成功會把使用者ID加入聊天室的使用者ID陣列裡面
    const addUserIdToChatroom = await chatroomModel.findByIdAndUpdate(
      { _id: newChatroom._id },
      { $push: { userid: modelData.userid } },
      { new: true }
    );
    // 新增聊天室成功會把聊天室ID加入使用者的聊天室陣列裡面
    const addChatroomIdToUser = await userModel.findByIdAndUpdate(
      { _id: modelData.userid },
      { $push: { chatroomid: newChatroom._id } },
      { new: true }
    );
    console.log('聊天室新增成功');
    // const result = {
    //   addUserIdToChatroom,
    //   addChatroomIdToUser,
    // };
    const result = addChatroomIdToUser;
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}
// 建立新訊息
async function createNewMsg(schemaModel = {}, modelData) {
  try {
    const msgData = {
      content: modelData.content,
      userid: modelData.userid,
      chatroomid: modelData.roomid,
    };
    // 新增訊息
    const newMsg = await messageModel.create(msgData);
    // 新增訊息成功會把使用者ID加入訊息的使用者ID陣列裡面
    // const addUserIdToChatroom = await messageModel.findByIdAndUpdate(
    //   { _id: newMsg._id },
    //   { userid: modelData.userid, chatroomid: modelData.roomid },
    //   { new: true }
    // );
    // 新增訊息成功會把訊息ID加入使用者的訊息陣列裡面
    const addMsgIdToUser = await userModel.findByIdAndUpdate(
      { _id: modelData.userid },
      { $push: { messageid: newMsg._id } },
      { new: true }
    );
    // 新增訊息成功會把訊息ID加入聊天室的訊息陣列裡面
    const addMsgIdToChatroom = await chatroomModel.findByIdAndUpdate(
      { _id: modelData.roomid },
      { $push: { messageid: newMsg._id } },
      { new: true }
    );
    // 加入成功再取得所在聊天室的列表
    const chatroomRes = await chatroomModel
      .findOne({ id: modelData.roomid })
      .populate({ path: 'userid' });
    // .populate({path:'userid'});
    console.log('訊息新增成功');
    // const result = {
    // addUserIdToChatroom,
    // addMsgIdToUser,
    // addMsgIdToChatroom,
    // };
    const result = chatroomRes;
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}
// 加入聊天室
async function addChatrommDB(modelData) {
  try {
    // 取得聊天室列表
    const chatRes = await chatroomModel
      .findOne({ _id: modelData.chatroomid })
      .populate({ path: 'messageid' });
    // 有找到符合的聊天室ID會把使用者ID加入聊天室的使用者ID陣列裡面
    const addUserIdToChatroom = await chatroomModel.findByIdAndUpdate(
      { _id: chatRes._id },
      { $push: { userid: modelData.userid } },
      { new: true }
    );
    // 有找到符合的聊天室ID會把聊天室ID加入使用者的聊天室陣列裡面
    const addChatroomIdToUser = await userModel.findByIdAndUpdate(
      { _id: modelData.userid },
      { $push: { chatroomid: chatRes._id } },
      { new: true }
    );

    return addChatroomIdToUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}
// 取得聊天室的訊息列表
async function getMsgFromChatroom(modelData) {
  try {
    const chatRes = await chatroomModel
      .findOne({ _id: modelData.chatroomid })
      .populate({ path: 'messageid' });
    return chatRes;
  } catch (error) {
    console.log('getMsgFromChatroom 錯誤');
    return error;
  }
}
// 登入
async function loginDB(schemaModel, modelData) {
  console.log(modelData);
  try {
    const result = await schemaModel.findOne({ name: modelData.name });
    return result;
  } catch (error) {
    return error;
  }
}

// 把ws存在使用者資料裡
async function addWsToDB(modelData) {
  try {
    // 新
    const updateUserWs = await userModel.findByIdAndUpdate(
      { _id: modelData.userid },
      { ws: modelData.ws },
      { new: true }
    );
    console.log('ws儲存成功');
    const result = {
      updateUserWs,
    };
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = {
  getDB,
  postDB,
  createUserDB,
  createChatroomDB,
  createNewMsg,
  addChatrommDB,
  getMsgFromChatroom,
  loginDB,
  addWsToDB,
};
