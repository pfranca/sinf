
var express = require('express');
var exphbs = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var path = require('path');
var logger = require('morgan');
var request = require('request');
var fs = require('fs');
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config.js');

var indexRouter = require('./routes/index');
var cartRouter = require('./routes/cart');
var checkoutRouter = require('./routes/checkout');
var productsRouter = require('./routes/products');
var authRouter = require('./routes/auth');
var app = express();

// view engine setup
app.engine('handlebars', exphbs({default: 'home'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
    key: 'user_sid',
    secret: 'wtfis_this',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000,
    },
}));

app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
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

//URL base da API
global.url = "http://localhost:2018/WebApi/";
global.token = "";


//A função abaixo corre sempre que é feito um pedido a qualquer rota de forma a definir um token
//a ser usado a nivel global
app.use(async (req, res, next) =>{
    fs.readFile('token.txt', function(err, data) {
        if(err){
            global.token = "";
            return;
        }
        global.token = data;
        return;
    });

    if(token == ""){
        let params ={
            username: 'FEUP',
            password: 'qualquer1',
            company: 'TRUTAS',
            instance: 'DEFAULT',
            grant_type: 'password',
            line: 'professional'
        };

        await request.post({url: url+"token", form:params}, (error, response, body) => {
            if (error) {

                console.error(error);
                return;
            } else {

                jsonArray = JSON.parse(body);
                token = jsonArray["access_token"];
                fs.writeFile('token.txt', token, function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                });
            }
        });
    }
    next();

});

app.use('/', indexRouter);
app.use('/cart', cartRouter);
app.use('/checkout',checkoutRouter);
app.use('/products',productsRouter);
app.use('/auth',authRouter);


module.exports = app;
