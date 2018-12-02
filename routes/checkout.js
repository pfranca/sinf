var express = require('express');
var request = require('request');
var router = express.Router();

var endPointAdmin = "Administrador/Consulta";
//Stock
var queryHasSock="SELECT AM.Artigo,A.Descricao,AM.PVP1,AA.StkActual FROM Artigo A,ArtigoMoeda AM INNER JOIN V_INV_ArtigoArmazem AA ON AM.Artigo = AA.Artigo WHERE AM.Artigo='";
var endQueryHasStock="ORDER BY AM.Artigo";

//SalesOrder
var endPointSalesDoc="Vendas/Docs/CreateDocument";

router.get('/:item',function(req,res){
    const final=queryHasSock.concat(req.params.item+"'"+endQueryHasStock);
    var options = { method: 'GET',
        url: url + endPointAdmin,
        headers:
            {
                'cache-control': 'no-cache',
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json' },
        body: final,
        json: true };

    request(options, (error, response, body) => {
        if(error){

            console.error("erro" + error);
            return;
        }
        res.send(body);
    });
});
router.get('/',function(req,res){
    let params={
            "Linhas": 
                {
                    "Artigo": "A0001",
                    "Quantidade": "1"
                }
            ,
            "TipoDoc": "FA",
            "Serie": "A",
            "CondPag":"1",
            "Entidade": "NUNOA",
            "TipoEntidade": "C",
            "DataDoc": "06/12/2018",
            "DataVenc":"08/12/2018"
        };
    var options = { method: 'POST',
        url: url + endPointSalesDoc,
        headers:
            {
                'cache-control': 'no-cache',
                Authorization:'Bearer '+ token,
                'Content-Type': 'application/json' },
        body: params,
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
