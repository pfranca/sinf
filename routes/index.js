let Product = require('../models/product');
var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('[INDEX]');
    console.log('USER: ');
    console.log(req.session.user);
    console.log('TOKEN: ');
    console.log(token);
    console.log('CART: ');
    console.log(req.session.cart.products);
  var options = {
    method: 'POST',
    url: url + 'Administrador/Consulta',
    headers:
        {
            'cache-control': 'no-cache',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json' },
    body: 'SELECT A.Artigo,A.Descricao, A.Observacoes ,AM.PVP1,AA.StkActual FROM Artigo A,ArtigoMoeda AM , V_INV_ArtigoArmazem AA WHERE A.Artigo=AA.Artigo AND A.Artigo=AM.Artigo',
    json: true };

request(options, (error, response, body) => {
    if(error){
        console.error("erro" + error);
        return;
    }
    
    if(body.DataSet != undefined){
        body.DataSet.Table.forEach(element => {
            populateProducts(element);
        });
        res.render('home', {
            products:body.DataSet.Table
        });
    }else{
        res.send(body);
    }
});
});


function populateProducts(product){
    Product.findOne({ erpId: product.Artigo}, function(err,prdct) {
        if(err) console.log(err);
        else{
            if(!prdct){
                var new_product = new Product({
                    erpId: product.Artigo,
                    name: product.Descricao,
                    price: product.PVP1,
                    stock: product.StkAtual,
                    details: product.Observacoes
                });
                new_product.save(function(err){
                    if(err) console.log(err);
                });
            }
            else{
                prdct.stock = product.StkAtual;
                prdct.name = product.Descricao;
                prdct.price = product.PVP1;
                prdct.stock = product.StkAtual;
                prdct.details = product.Observacoes;
                prdct.save(function (err) {
                    if (err) console.log(err);
                });
        }
    }
    });

}
module.exports = router;
