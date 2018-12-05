var express = require('express');
var request = require('request');

var router = express.Router();

//devolve a lista total de produtos {nome,descrição} em json
router.get('/cart-list',function(req,res){

    var options = { method: 'GET',
        url: url + 'Administrador/Consulta',
        headers:
            {
                'cache-control': 'no-cache',
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json' },
        body: "SELECT AM.Artigo,A.Descricao,AM.PVP1,AA.StkActual FROM Artigo A,ArtigoMoeda AM INNER JOIN V_INV_ArtigoArmazem AA ON AM.Artigo = AA.Artigo WHERE AM.Artigo='A0001' ORDER BY AM.Artigo",
        json: true };

    request(options, (error, response, body) => {
        if(error){

            console.error("erro" + error);
            return;
        }
        res.send(body);
    });
});

module.exports = router;

