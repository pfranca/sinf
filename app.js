var createError = require('http-errors');
var express = require('express');
var exphbs = require('express-handlebars')
var path = require('path');
var logger = require('morgan');
var acessToken;
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var my_var="hello";
var checkoutRouter = require('./routes/checkout');
var authRouter = require('./routes/authPrimavera');
var app = express();



// view engine setup
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/checkout',checkoutRouter);//(my_var);
app.use('/authPrimavera',authRouter);


module.exports = app;
