var express = require('express');
var request = require('request');

var router = express.Router();


router.get('/',function(req,res){
    console.log('entrou no cart');
    console.log('USER: ');
    console.log(req.session.user);
    
    var options = {
        method: 'POST',
        url: url + 'Administrador/Consulta',
        headers:
            {
                'cache-control': 'no-cache',
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json' },
        body: "SELECT A.Artigo,A.Descricao, A.Observacoes ,AM.PVP1,AA.StkActual FROM Artigo A,ArtigoMoeda AM , V_INV_ArtigoArmazem AA WHERE A.Artigo=AA.Artigo AND A.Artigo=AM.Artigo AND A.Artigo IN ('A003', 'A006', 'A008')",
        json: true };
    
    request(options, (error, response, body) => {
        if(error){
    
            console.error("erro" + error);
            return;
        }


        
        if(body.DataSet != undefined){
           // console.log(body.DataSet.Table)
            let totalPrice = 0;
            for(let product of body.DataSet.Table){
                totalPrice += parseFloat(product.PVP1);
           }
            res.render('cart', {
                products:body.DataSet.Table,
                totalPrice: totalPrice
            });
        }else{
            res.send(body);
        }
    });





//res.render('cart');
/*     var options = {
        method: 'POST',
        url: url + 'Administrador/Consulta',
        headers:
            {
                'cache-control': 'no-cache',
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json' },
        body: "SELECT AM.Artigo,A.Descricao,AM.PVP1,AA.StkActual FROM Artigo A,ArtigoMoeda AM INNER JOIN V_INV_ArtigoArmazem AA ON AM.Artigo = AA.Artigo WHERE AM.Artigo IN (\'A0001\', \'A0002\')",
        json: true };

    request(options, (error, response, body) => {
        if(error){

            console.error("erro" + error);
            return;
        }
        res.send(body);
    }); */
});


module.exports = router;

