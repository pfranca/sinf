var express = require('express');
var exphbs = require('express-handlebars')
var path = require('path');
var logger = require('morgan');
var request = require('request');
var indexRouter = require('./routes/index');
var checkoutRouter = require('./routes/checkout');
var productsRouter = require('./routes/products');

var app = express();

// view engine setup
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//URL base da API
global.url = "http://localhost:2018/WebApi/";
global.token = "";

//A função abaixo corre sempre que é feito um pedido a qualquer rota de forma a definir um token
//a ser usado a nivel global
app.use(async (req, res, next) =>{
    if(token == ""){
    let params ={
        username: 'FEUP',
        password: 'qualquer1',
        company: 'BELAFLOR',
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
        }
    });
    }
    next();
});

app.use('/', indexRouter);
app.use('/checkout',checkoutRouter);//(my_var);
app.use('/products',productsRouter);


module.exports = app;
