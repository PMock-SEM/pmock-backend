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
var feedbacksRouter = require('./routes/feedbacks');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/feedbacks', feedbacksRouter);

module.exports = app;
