const express = require('express');
const DB = require('./connection/mongooseDB');
const signupRouter = require('./routers/memberRouter')


DB()
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 本地端cors
app.use((req,res,next)=>{
  res.set('Access-Control-Allow-Headers',
  'Content-Type, Authorization, Content-Length, X-Requested-With')
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'PATCH, POST, GET,OPTIONS,DELETE')
  res.set('Content-Type', 'application/json')
  next()
})

app.use('/member',signupRouter)

module.exports = app;