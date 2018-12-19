var express = require('express');
var request = require('request');

var router = express.Router();


router.get('/',function(req,res){
    console.log('[CART]');
    console.log('USER: ');
    console.log(req.session.user);
    console.log('TOKEN: ');
    console.log(req.session.token);
    console.log('CART: ');
    console.log(req.session.cart.products);

    var products = req.session.cart.products;
    if(products.length == 0){
        res.redirect('back');
    }
    else{
    var queryString = [];
    products.forEach(element => {
        var str = "\'" + element.id + "\'"
        queryString.push(str);
    });
    var query = "SELECT A.Artigo,A.Descricao, A.Observacoes ,AM.PVP1,AA.StkActual FROM Artigo A,ArtigoMoeda AM , V_INV_ArtigoArmazem AA WHERE A.Artigo=AA.Artigo AND A.Artigo=AM.Artigo AND A.Artigo IN ("+ queryString.toString() +")";
    var options = {
        method: 'POST',
        url: url + 'Administrador/Consulta',
        headers:
            {
                'cache-control': 'no-cache',
                Authorization: 'Bearer ' + req.session.token,
                'Content-Type': 'application/json' },
        body: query,
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
}





//res.render('cart');
/*     var options = {
        method: 'POST',
        url: url + 'Administrador/Consulta',
        headers:
            {
                'cache-control': 'no-cache',
                Authorization: 'Bearer ' + req.session.token,
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

