const express = require('express');
var User = require('../models/user');
var request = require('request');
const router = express.Router();

/* Create User */
//TODO adicionar dados sobre user
router.get('/create-user', (req, res) => {
    res.render('addUser');
});
router.post('/create-user', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var password_repeat = req.body.password_repeat;
    var fiscalNr = "2" + Math.floor(Math.random() * 100000000);
    if(password === password_repeat) {
        var new_usr = new User({
            name: username,
            password: password,
        });
        new_usr.save(function (err) {
            if (err) console.log(err);
            else 
            console.log('----SAVED USER----');
        });
        console.log(username);
        console.log(fiscalNr);
        //criar cliente primavera
        let options = { method: 'POST',
            url: url + 'Base/Clientes/Actualiza',
            headers: 
            {
                'cache-control': 'no-cache',
                Authorization: 'Bearer ' + token,
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

        res.send(body);
        console.log(body);
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
            req.session.user = usr.dataValues;
            res.redirect('/');
        }
    });
});
//
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
    res.clearCookie('user_sid');
    res.redirect('/auth/login');
});


module.exports = router;
