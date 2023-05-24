import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { postData } from './prisma/query';
import { dbItems } from './prisma/initData';

/*refresh db items*/
//postData(dbItems);

let s3Url = "https://scfinalwinter2023.s3.amazonaws.com/item_img/img_";
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
// const bodyparser = require('body-parser');
//Loads the handlebars module
let _handlebars = require('handlebars');
let exphbs = require('express-handlebars');
let {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
//check test
//import mongoose from 'mongoose';
//import cors from 'cors';
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');

var app = express();
//database name
// var dbName = 'copFinal';
// var dbConnection = mongoose.connection;

//mongo connection
/*mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/' + dbName, {
	useNewUrlParser: true, 
	useUnifiedTopology: true
});*/

//vhost


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//add handlebars
app.engine('.hbs', exphbs({
	layoutsDir: __dirname + '/views/layouts',
	partialsDir: __dirname + '/views/partials',
	handlebars: allowInsecurePrototypeAccess(_handlebars),
	//new configuration parameter
	extname: '.hbs', 
	defaultLayout: 'main'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);

//CORS setup
//app.use(cors());

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
