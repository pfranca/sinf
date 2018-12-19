
var express = require('express');
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
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var path = require('path');
var logger = require('morgan');
var request = require('request');
var fs = require('fs');
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config.js');
var http = require('http');

var indexRouter = require('./routes/index');
var cartRouter = require('./routes/cart');
var checkoutRouter = require('./routes/checkout');
var productsRouter = require('./routes/products');
var authRouter = require('./routes/auth');
var app = express();


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
var sharedsession = require("express-socket.io-session");


app.use((req, res, next) => {

    if(!req.session.cart){
        req.session.cart= {
            products: []
        }
        req.session.save();
    }
    next();
});


//A função abaixo corre sempre que é feito um pedido a qualquer rota de forma a definir um token
//a ser usado a nivel global
app.use(async (req, res, next) =>{
    console.log('Entrou na funcao do token');
    if(!req.session.token){
        console.log('Entrou no if do token');
        let params ={
            username: 'FEUP',
            password: 'qualquer1',
            company: 'TRUTAS',
            instance: 'DEFAULT',
            grant_type: 'password',
            line: 'professional'
        };
        request.post({url: url+"token", form:params}, (error, response, body) => {
            if (error) {
                console.log('ERRO NO TOKEN');
                console.error(error);
                return;
            } else {
                jsonArray = JSON.parse(body);
                req.session.token = jsonArray["access_token"];
                req.session.save();
                console.log('Token Saved!');
            }
        });
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

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
var server = http.createServer(app);
var io = require('socket.io')(server);
io.use(sharedsession(session)); 

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('addToCart', function(data){
        let productId = data.id;
        let productQty = data.qty;
    
        console.log('id: ');
        console.log(productId);
        console.log('Qty: ');
        console.log(productQty);

        socket.handshake.session.cart.products.push({id: productId,qty: productQty});
        socket.handshake.session.save();
        
      });
  });


  
app.use('/', indexRouter);
app.use('/cart', cartRouter);
app.use('/checkout',checkoutRouter);
app.use('/products',productsRouter);
app.use('/auth',authRouter);



function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  }

module.exports = {
    app: app,
    server: server
};

