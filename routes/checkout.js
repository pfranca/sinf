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
    console.log(arrayItem);
    arrayItem.forEach(function(value){
        console.log(value);
    });
    var options = { method: 'POST',
    url: 'http://localhost:2018/WebApi/Vendas/Docs/CreateDocument/',
    headers: 
     {
       'cache-control': 'no-cache',
       Authorization: 'Bearer '+token,
       'Content-Type': 'application/json' },
    body: 
     { Linhas: 
        [ { Artigo: 'A0001', Quantidade: '1' },
          { Artigo: 'A0002', Quantidade: '1' } ],
       TipoDoc: 'FA',
       Serie: 'A',
       CondPag: '1',
       Entidade: 'NUNOA',
       TipoEntidade: 'C',
       DataDoc: '02/12/2018',
       DataVenc: '31/01/2019' },
    json: true };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.send(body);

  });
});




module.exports = router;
