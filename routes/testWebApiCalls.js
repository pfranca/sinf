var express = require('express');
var request = require('request');

var router = express.Router();


router.get('/',function(req,res){

  
    var options = { method: 'POST',
        url: url + 'Vendas/Docs/CreateDocument/',
        headers:
            {
                'cache-control': 'no-cache',
                Authorization: 'Bearer '+token,
                'Content-Type': 'application/json' },
        body:
            {
                Linhas:
                    [
                        { Artigo: 'A001', Quantidade: '1' },
                        { Artigo: 'A002', Quantidade: '1' }

                        ],
                Tipodoc: 'ECL',
                Entidade: 'aa',
                TipoEntidade: 'C',
                CondPag: '2',
                ModoPag: 'PGNUM',
                MoradaEntrega: 'yaya',
                LocalidadeEntrega: 'Porto',
                CodPostalEntrega: '4200-161'

            },
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.send(body);

    });
});


module.exports = router;