const app = require('./app');
const { createServer } = require('http');

// 官網教學
const websockets = require('./websocket/index')

const server = createServer(app);
const PORT =process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`伺服器已開啟 ${PORT}`);
});

// 官網教學
websockets(server);