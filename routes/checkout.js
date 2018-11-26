var express = require('express');
var request = require('request');
var router = express.Router();
var port = 3001;
var path = "/WebApi";
var idArtigoHardCoded="A0001";
var endPoint = "/Administrador/Consulta";
var queryHasSock="SELECT Artigo, Armazem, ISNULL(StkActual, 0) AS StkActual FROM V_INV_ArtigoArmazem";


/* GET checkout page for  item. */
// router.get('/:idItem', function(req, res) {
//   res.send('checking out item' + req.params.idItem);


// });

router.get('/auth',function(req,res){
    res.redirect('../authPrimavera');
    //res.send("asdsad");
    console.log(req);
});

router.get('/checkStock/:idItem',function(req,res){

    let params ={
        secondToken:my_var
      };

    request.post({url: 'http://localhost:'+port+path+endPoint, form:params},function(req,res,next){

    })
    
});
module.exports = router;
