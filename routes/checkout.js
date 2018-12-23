var express = require('express');
var request = require('request');
var router = express.Router();



router.get('/',function(req,res){    
    res.render('checkout', {layout: false});
});

router.post('/new-user',function(req,res){


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
                Cliente: req.session.user.name,
                Nome: req.body.nomeCliente,
                Morada: req.body.moradaCliente,
                Localidade: req.body.localidadeCliente,
                CodigoPostal: req.body.zipCliente,
                LocalidadeCodigoPostal: req.body.localidadeCodigoPostalCliente,
                NumContribuinte: req.body.nifCliente,
                CondPag: '2',
                Pais: req.body.paisCliente,
                Moeda: 'EUR'
            },
        json: true
     };

    request(options, (error, response, body) => {
        if(error){

            console.error('erro' + error);
            res.redirect('back');
        }
        console.log(body)
        res.redirect('confirmOrder')
    });

});


router.get('/confirmOrder',function(req,res){
    console.log('USER: ');
    console.log(req.session.user);

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
                Authorization: 'Bearer ' + token,
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
                 res.render('checkoutEncomenda', {
                     layout:false,
                     products:body.DataSet.Table,
                     totalPrice: totalPrice
                 });
             }else{
                 res.send(body);
             }
         });
     }
    });

router.post('/createECL',function(req,res){


    var options = {
        method: 'POST',
        url: url + '...',
        headers:
            {
                'cache-control': 'no-cache',
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json' },
        body:
            {
                
            },
        json: true
        };

    request(options, (error, response, body) => {
        if(error){

            console.error('erro' + error);
            res.redirect('back');
        }
        console.log(body)
        res.redirect('payment')
    });

});   


router.get('/payment',function(req,res){

    
    res.render('checkoutPayment', {layout: false});
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
*/
/*
router.get('/first-step', function(req,res){
    let options = {
        method: 'GET',
        url: url + 'Base/Clientes/Existe/' + req.body.username,
        headers:
            {
                'cache-control': 'no-cache',
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json' }};


    request(options, (error, response, body) => {
        if(error){

            console.error('erro' + error);
            return;
        }
        if (body == 'false'){
            let username = req.body.username;
            var fiscalNr = "2" + Math.floor(Math.random() * 100000000);
            let options = {
                method: 'POST',
                url: url + 'Base/Clientes/Actualiza',
                headers:
                    {
                        'cache-control': 'no-cache',
                        Authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json' },
                body:
                { Cliente: username,
                    Nome: username,
                    NumContribuinte: fiscalNr,
                    Moeda: 'EUR' },
                json: true
             };
        
            request(options, (error, response, body) => {
                if(error){
        
                    console.error('erro' + error);
                    return;
                }
                res.send('client created');
            });
        }
        else
            res.send('client exists');
    });

});
*/

//Sales order to invoice
//TODO hardcoded
/*
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
*/


//Item stock
/*
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
*/

//check if client exists
//TODO hardcoded
/*
router.get('/user-exists/:user',function(req,res){
    var options = {
        method: 'GET',
        url: url + 'Base/Clientes/Existe/' + req.params.user,
        headers:
            {
                'cache-control': 'no-cache',
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json' }};

    request(options, (error, response, body) => {
        if(error){

            console.error('erro' + error);
            return;
        }
        res.send(body);
    });
});
*/

//all items from order
//TODO hardcoded
/*
router.get('/user-items/:user',function(req,res){
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
*/
//create new client
//TODO hardcoded


module.exports = router;
