const headers = (res) => {
  res.set('Access-Control-Allow-Headers',
  'Content-Type, Authorization, Content-Length, X-Requested-With')
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'PATCH, POST, GET,OPTIONS,DELETE')
  res.set('Content-Type', 'application/json')
  return res;
};

module.exports = {headers}