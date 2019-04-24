const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const multiparty = require('multiparty');
const util = require('util');

const indexRouter = require('./routes/index');
const articlesRouter = require('./routes/articles');
const categoriesRouter = require('./routes/categories');
const apiArticles = require('./routes/api/Articles');
const apiCategories = require('./routes/api/Categories');
const apiUsers = require('./routes/api/Users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//database
const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1/iliria';
mongoose.connect(mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
console.log("Connected to database...");

app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/articles', articlesRouter);
app.use('/categories', categoriesRouter);
app.use('/api/articles', apiArticles);
app.use('/api/categories', apiCategories);
app.use('/api/users', apiUsers);

app.disable('etag');

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
