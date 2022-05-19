const WebSocket = require('ws');
const { createNewMsg, addWsToDB } = require('../repository/wsRepl');

const websocketServer = (expressServer) => {
  let wsUser = [];

  // 建立新的ws伺服器
  const websocketServer = new WebSocket.Server({
    // noServer: true,
    // path: '/websockets',
    expressServer
  });

  expressServer.on('upgrade', (request, socket, head) => {
    websocketServer.handleUpgrade(request, socket, head, (websocket) => {
      websocketServer.emit('connection', websocket, request);
    });
  });

  websocketServer.on(
    'connection',
    async function connection(websocketConnection, connectionRequest) {
      const [_path, params] = connectionRequest?.url?.split('?');
      console.log(_path);
      console.log(params);
      // ws存入使用者資料庫
      const user = { userid: params, ws: websocketConnection };
      try {
        const result = await addWsToDB(user);
      } catch (error) {
        console.log(error);
      }

      websocketConnection.userid = params;

      wsUser.push({userid:params,ws:websocketConnection})

      websocketConnection.on('message', async (message) => {
        const msgData = JSON.parse(message);
        const data = {
          userid: params,
          roomid: msgData.roomid,
          content: msgData.msg,
        };
        // 收到新訊息寫入資料庫
        const result = await createNewMsg({}, data);
        // 找出所在聊天室的所有使用者
        result.userid.forEach((resItem) => {
          // 找出所有在線上的使用者
          wsUser.forEach((wsItem)=>{
            // 比對所在聊天室跟線上使用者  有在線上而且是這間聊天室的使用者才傳送訊息
            if(resItem.id === wsItem.userid){
              data.userid = resItem.id;
              wsItem.ws.send(JSON.stringify(data));
            }
          })
        });

        // websocketServer.clients.forEach((client) => {
        //   console.log(client.userid);
        //   client.send(JSON.stringify(data));
        // });
        // wsUser.ws.send(JSON.stringify(data));
        // websocketConnection.send(JSON.stringify(data))
      });
    }
  );

  return websocketServer;
};

module.exports = websocketServer;
