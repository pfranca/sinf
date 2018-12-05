var express = require('express');
var request = require('request');

var router = express.Router();

//devolve a lista total de produtos {nome,descrição} em json
router.get('/product-list',function(req,res){
    var options = {
        method: 'POST',
        url: url + 'Administrador/Consulta',
        headers:
            {
                'cache-control': 'no-cache',
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json' },
        body: 'SELECT AM.Artigo,A.Descricao,AM.PVP1,AA.StkActual FROM Artigo A,ArtigoMoeda AM INNER JOIN V_INV_ArtigoArmazem AA ON AM.Artigo = AA.Artigo',
        json: true };

    request(options, (error, response, body) => {
        if(error){

            console.error("erro" + error);
            return;
        }
        res.send(body);
    });
});

//devolve os detalhes do artigo :id
router.get('/:id',function(req,res){
    const id = req.params.id;
    var options = {
        method: 'POST',
        url: url + 'Administrador/Consulta',
        headers:
            {
                'cache-control': 'no-cache',
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json' },
        body: 'SELECT AM.Artigo,A.Descricao,AM.PVP1,AA.StkActual, A.Observacoes FROM Artigo A,ArtigoMoeda AM INNER JOIN V_INV_ArtigoArmazem AA ON AM.Artigo = AA.Artigo WHERE AM.Artigo=\''+id+'\'',
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
