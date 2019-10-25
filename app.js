var express = require('express');
var path = require('path');
const config = require('./config');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

mongoose.connect(config.MONGO_CONNECTION);

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Connected to mongodb');
})

db.on('error', (err) => {
  console.log(err);
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
