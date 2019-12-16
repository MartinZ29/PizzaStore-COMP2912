var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Setting up MongoDb connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/a01013955', {userNewUrlParse:true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', () => {
  console.log('Failed to connect to mongodb. Exiting...');
  process.exit(1);
});
db.once('open', function() {
  // we're connected!
  console.log('Connected to mongodb instance');
});

process.on('SIGINT', () => {
  console.log("Stopping the process....");
  mongoose.connection.close((err) => {
      console.log("Shutting down.....");
      process.exit(0);
  });
});


var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
