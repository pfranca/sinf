var express = require('express');
var request = require('request');

var router = express.Router();

//devolve a lista total de produtos {nome,descrição} em json
router.get('/product-list',function(req,res){

    var options = {
        url: url+'Base/Artigos/LstArtigos',
        method: 'GET',
        'auth': {
                'bearer': token //token já definido no middleware em app.js
            },
    };

    request(options, (error, response, body) => {
        if(error){
            console.error("erro" + error);
            return;
        }
        let json = JSON.parse(body);
        res.send(json);
    });
});

module.exports = router;
