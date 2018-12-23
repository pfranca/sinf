var express = require('express');
var request = require('request');

var router = express.Router();




router.get('/',function(req,res){

    let nrDoc = 0;

    var options = {
        method: 'POST',
        url: url + 'Administrador/Consulta',
        headers:
            {
                'cache-control': 'no-cache',
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json' },
        body: "SELECT CONVERT(VARCHAR(10),cd.Data,103), cd.TotalMerc, cd.TotalDocumento, cd.ModoPag, cd.NumContribuinte, cd.CodPostalEntrega, cd.TipoDoc, cd.Serie, cd.NumDoc FROM CabecDoc cd WHERE cd.TipoDoc='ECL' ORDER BY cd.NumDoc",
        json: true };

        
    
    request(options, (error, response, body) => {
        if(error){
            console.error("erro" + error);
            return;
        }

        nrDoc = body.DataSet.Table.length;
        options2 = { method: 'POST',
        url: url + 'Vendas/Docs/TransformDocument/ECL/A/'+nrDoc+'/000/true',
        headers:
            {
                'cache-control': 'no-cache',
                Authorization: 'Bearer '+token,
                'Content-Type': 'application/json' },
        body:
            {
                Tipodoc: 'FA',
                Serie: 'A',
                Entidade: 'NOVOTESTE',
                TipoEntidade: 'C'
            },
    
        json: true };
    
        request(options2, function (error, response, body) {
            if (error) throw new Error(error);
            console.log(options.url)
            res.send(body);
    
        });
    });
        

    
});


module.exports = router;