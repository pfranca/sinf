
var express = require('express');
var socket_io = require('socket.io');

var exphbs = require('express-handlebars');
const session = require('express-session')({
    key: 'user_sid',
    secret: 'wtfis_this',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000,
    },
});
var sharedsession = require("express-socket.io-session");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var path = require('path');
var logger = require('morgan');
var request = require('request');
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config.js');

var indexRouter = require('./routes/index');
var cartRouter = require('./routes/cart');
var checkoutRouter = require('./routes/checkout');
var productsRouter = require('./routes/products');
var authRouter = require('./routes/auth');
var testRouter = require('./routes/testWebApiCalls');
var app = express();
var io = socket_io();
app.io = io;

//URL base da API
global.url = "http://localhost:2018/WebApi/";
global.token = "";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session);
io.use(sharedsession(session)); 


app.use((req, res, next) => {

    if(!req.session.cart){
        req.session.cart= {
            products: []
        }
        req.session.save();
    }
    next();
});

//Ligação à base de dados
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


  app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
  });

  io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('addToCart', function(data){
        let productId = data.id;
        let productQty = data.qty;
    
        console.log('id: ');
        console.log(productId);
        console.log('Qty: ');
        console.log(productQty);

        socket.handshake.session.cart.products.push({
            id: productId,
            qty: productQty
        });
        socket.handshake.session.save();
    
      });
  });

app.use('/', indexRouter);
app.use('/cart', cartRouter);
app.use('/checkout',checkoutRouter);
app.use('/products',productsRouter);
app.use('/auth',authRouter);
app.use('/test',testRouter);

app.getToken = function(){
    console.log('----GET TOKEN----');
    let params ={
        username: 'FEUP',
        password: 'qualquer1',
        company: 'TRUTAS',
        instance: 'DEFAULT',
        grant_type: 'password',
        line: 'professional'
    };
    request.post({url: url+"token", form:params}, function(error, response, body) {
        if (error) {
            console.log('ERRO NO TOKEN');
            console.error(error);
            token = '';
        } else {
            jsonArray = JSON.parse(body);
            token = jsonArray["access_token"];
        }
        console.log('TOKEN:');
        console.log(token);
        return token;
    });
}


module.exports = app;
