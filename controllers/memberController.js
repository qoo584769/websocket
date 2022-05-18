const {
  getDB,
  createUserDB,
  postDB,
  loginDB,
} = require('../repository/wsRepl');
const { userModel } = require('../models/user');
const { messageModel } = require('../models/message');
const { chatroomModel } = require('../models/chatroom');
const { headers } = require('../utils/headers');

// jwt token產生
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
  console.log(req.body);
  const user = {
    name: req.body.name,
  };
  try {
    const result = await createUserDB(userModel, user);
    headers();
    res.json({ result: result });
  } catch (error) {
    // console.log(error);
  }
};

const login = async (req, res, next) => {
  const user = {
    name: req.body.name,
  };
  console.log(user);
  try {
    const result = await loginDB(userModel, user);
    if (result !== null) {
      const token = jwt.sign(
        {
          // 加密方式
          algorithm: 'HS256',
          // 多久之後到期 60一分鐘到期 60*60一小時 也可以不用exp直接在secret後面加上{ expiresIn: '1h' }
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          // data的內容可以在登入解密出來
          data: result.id,
        },
        // 給jwt一個字串當作加密編碼參考 需要隱藏起來 否則會有被反推的機會
        // 驗證的時候要用一樣的字串去解 不然會算不出原本的資料
        'secret'
      );
      headers();
      res.setHeader('token', token);
      result.token = token;
      res.json({ result, token });
    } else {
      res.json('名稱不存在');
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
module.exports = { signup, login };
