var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('entrou no index');
    console.log('USER: ');
    console.log(req.session.user);
    console.log('TOKEN: ');
    console.log(req.session.token);
    console.log('CART: ');
    console.log(req.session.cart.products);
  var options = {
    method: 'POST',
    url: url + 'Administrador/Consulta',
    headers:
        {
            'cache-control': 'no-cache',
            Authorization: 'Bearer ' + req.session.token,
            'Content-Type': 'application/json' },
    body: 'SELECT A.Artigo,A.Descricao, A.Observacoes ,AM.PVP1,AA.StkActual FROM Artigo A,ArtigoMoeda AM , V_INV_ArtigoArmazem AA WHERE A.Artigo=AA.Artigo AND A.Artigo=AM.Artigo',
    json: true };

request(options, (error, response, body) => {
    if(error){
        console.error("erro" + error);
        return;
    }
    
    if(body.DataSet != undefined){
        console.log('DEU!');
        res.render('home', {
            products:body.DataSet.Table
        });
    }else{
        res.send(body);
    }
});
});

module.exports = router;
