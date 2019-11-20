var express = require('express');
var path = require('path');
const config = require('./config');
var cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

var logger = require('morgan');
const mongoose = require('mongoose');

require('./models/User');
require('./models/Coach');
require('./models/Feedback');
require('./models/Video');
require('./services/passport');

const ObjectId = mongoose.Types.ObjectId;

mongoose.connect(config.MONGO_CONNECTION);

const db = mongoose.connection;


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const coachesRouter = require('./routes/coaches');
const videosRouter = require('./routes/videos');
const feedbacksRouter = require('./routes/feedbacks');

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [config.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://pmock-backend.appspot.com");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/coaches', coachesRouter);
app.use('/videos', videosRouter);
app.use('/feedbacks', feedbacksRouter);

module.exports = app;
