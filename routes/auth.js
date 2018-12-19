const express = require('express');
var User = require('../models/user');
var request = require('request');
var router = express.Router();

/* Create User */
//TODO adicionar dados sobre user
router.get('/register', (req, res) => {
    res.render('register');
});
router.post('/register', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var password_repeat = req.body.password_repeat;

    if(password === password_repeat) {
        var new_usr = new User({
            name: username,
            password: password,
        });
        new_usr.save(function (err) {
            if (err) res.redirect('back');
            else{
                req.session.user = new_usr;
                req.session.save();
                res.redirect('/');
            }
        });
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});
router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ name:  username }, function(err,usr) {
        if (!usr) {
            res.redirect('back');
        } else if (!usr.comparePassword(password)) {
            res.redirect('back');
        } else {
            if(usr.cart){
                req.session.cart = usr.cart;
            }
            else{
                usr.cart = req.session.cart.products;
                usr.save(function (err) {
                    if (err){
                        console.log('Erro guardar carrinho: ');
                        console.log(err);
                    }
                });
            }
            req.session.user = usr;
            req.session.save();
            res.redirect('/');
        }
    });
});

// router.get('/change-password', (req, res) => {
//     res.render('changePassword');
// });
// router.post('/change-password', (req, res) => {
//     const new_password = req.body.new_password;
//     const new_password2 = req.body.new_password2;
//     const password = req.body.password;
//     const username = req.body.username;
//
//     models.User.findOne({ where: { username } }).then((user) => {
//         if (!user) {
//             res.redirect('/');
//         } else if (user.validPassword(password) && (new_password2 === new_password)) {
//             user.update({ password: new_password });
//             res.redirect('/');
//         } else {
//             res.redirect('back');
//         }
//     });
// });

router.get('/logout', (req, res) => {
    const username = req.session.user.name;

    User.findOne({ name:  username }, function(err,usr) {
        if (usr) {
            usr.cart = req.session.cart.products;
            usr.save(function (err) {
                if (err){
                    console.log('Erro guardar carrinho[logout]: ');
                    console.log(err);
                }
            });
        }
    
    
    
    });
    var token = req.session.token;
    res.clearCookie('user_sid');
    req.session.token = token;
    res.redirect('/auth/login');
});

module.exports = router;


/*         //criar cliente primavera
        let options = { method: 'POST',
            url: url + 'Base/Clientes/Actualiza',
            headers: 
            {
                'cache-control': 'no-cache',
                Authorization: 'Bearer '+ req.session.token,
                'Content-Type': 'application/json' },
            body: 
            { Cliente: username,
                Nome: username,
                NumContribuinte: fiscalNr,
                Moeda: 'EUR' },
            json: true };

        request(options, function (error, response, body) {
        if (error){
            console.error("erro" + error);
            return;
        }

        console.log(body);
        });
 */