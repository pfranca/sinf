var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/',function(req,res){
    res.render('checkout', {layout: false});
});

router.get('/addUser', function(req,res){
   // console.log(req.params.firstName);
    console.log(req.body.firstName);
/*
    var options = {
        method: 'POST',
        url: url + 'Base/Clientes/Actualiza',
        headers:
            {
                'cache-control': 'no-cache',
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json' },
               body:
                {
                    "Cliente": req.params.username,
                    "Nome": req.param.username,
                    "Descricao": "WebStoreUser"+username,
                    "Morada": req.params.morada,
                    "Localidade": req.params.local,
                    "CodigoPostal": req.param.postal,
                    "LocalidadeCodigoPostal": req.param.city,
                    "NumContribuinte": req.params.nif,
                    "Pais": req.params.country,
                    "Moeda": "EUR"
                },
                
        json:true
        };
        

    request(options, (error, response, body) => {
        });
        */
    res.redirect("/");
});


//Stock
/*
var queryHasSock="SELECT AM.Artigo,A.Descricao,AM.PVP1,AA.StkActual FROM Artigo A,ArtigoMoeda AM INNER JOIN V_INV_ArtigoArmazem AA ON AM.Artigo = AA.Artigo WHERE AM.Artigo='";
var endQueryHasStock="ORDER BY AM.Artigo";

//Sales order document
router.get('/',function(req,res){
    arrayItem.forEach(function(value){
        console.log(value);
    });
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
                        { Artigo: 'A0001', Quantidade: '1' },
                        { Artigo: 'A0002', Quantidade: '1' }
                        ],
                TipoDoc: 'FA',
                Serie: 'A',
                CondPag: '1',
                Entidade: 'NUNOA',
                TipoEntidade: 'C',
                DataDoc: '02/12/2018',
                DataVenc: '31/01/2019'
            },
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.send(body);

    });
});

//Sales order to invoice
//TODO hardcoded
router.get('/',function(req,res){
    arrayItem.forEach(function(value){
        console.log(value);
    });
    var options = { method: 'POST',
        url: url + 'Vendas/Docs/TransformDocument/ECL/A/2/000/false',
        headers:
            {
                'cache-control': 'no-cache',
                Authorization: 'Bearer '+token,
                'Content-Type': 'application/json' },
        body:
            {
                Tipodoc: 'FA',
                Serie: 'A',
                Entidade: 'SMITHJ',
                TipoEntidade: 'C',
                DataDoc: '02/12/2018'
            },

        json: true };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.send(body);

    });
});


//Item stock
router.get('/:item',function(req,res){
    const final=queryHasSock.concat(req.params.item+"\'"+endQueryHasStock);
    var options = { method: 'GET',
        url: url + 'Administrador/Consulta',
        headers:
            {
                'cache-control': 'no-cache',
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json' },
        body: final,
        json: true };

    request(options, (error, response, body) => {
        if(error){
            console.error('erro' + error);
            return;
        }
        res.send(body);
    });
});
//check if client exists
//TODO hardcoded
router.get('/user-exists/:user',function(req,res){
    var options = {
        method: 'GET',
        url: url + 'Base/Clientes/Existe/{{SMITHJ}}',
        headers:
            {
                'cache-control': 'no-cache',
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json' },
        body: 'SELECT AM.Artigo,A.Descricao,AM.PVP1,AA.StkActual FROM Artigo A,ArtigoMoeda AM INNER JOIN V_INV_ArtigoArmazem AA ON AM.Artigo = AA.Artigo',
        json: true };

    request(options, (error, response, body) => {
        if(error){

            console.error('erro' + error);
            return;
        }
        res.send(body);
    });
});

//all items from order
//TODO hardcoded
router.get('/user-exists/:user',function(req,res){
    var options = {
        method: 'POST',
        url: url + 'Administrador/Consulta',
        headers:
            {
                'cache-control': 'no-cache',
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json' },
        body: 'SELECT AM.Artigo,A.Descricao,AM.PVP1,AA.StkActual FROM Artigo A,ArtigoMoeda AM INNER JOIN V_INV_ArtigoArmazem AA ON AM.Artigo = AA.Artigo WHERE AA.StkActual>0 AND AM.Artigo IN (\'{{idProduct1}}\', \'{{idProduct2}}\')',
        json: true };

    request(options, (error, response, body) => {
        if(error){

            console.error('erro' + error);
            return;
        }
        res.send(body);
    });
});

//create new client
//TODO hardcoded
router.get('/new-user',function(req,res){
    var options = {
        method: 'POST',
        url: url + 'Base/Clientes/Actualiza',
        headers:
            {
                'cache-control': 'no-cache',
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json' },
        body:
            {
                Cliente: 'SMITHJ',
                Nome: 'John Smith',
                Descricao: 'WebStoreUserJohnSmith',
                Morada: 'Random Street n 123',
                Localidade: 'PORTO',
                CodigoPostal: '4200',
                LocalidadeCodigoPostal: 'PORTO',
                NumContribuinte: '123456789',
                Pais: 'PT',
                Moeda: 'EUR'
            },
        json: true
     };

    request(options, (error, response, body) => {
        if(error){

            console.error('erro' + error);
            return;
        }
        res.send(body);
    });
});

*/

module.exports = router;
