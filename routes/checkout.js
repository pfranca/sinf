var express = require('express');
var request = require('request');

//var getIndexCookies = required('../authPrimavera');
var router = express.Router();
var idArtigoHardCoded="A0001";
var endPoint = "/Administrador/Consulta";
var queryHasSock="SELECT Artigo, Armazem, ISNULL(StkActual, 0) AS StkActual FROM V_INV_ArtigoArmazem";


/* GET checkout page for  item. */
// router.get('/:idItem', function(req, res) {
//   res.send('checking out item' + req.params.idItem);


// });

var finalCookie;




router.get('/getCookie',function(req,res){
    res.redirect('../getCookie');
});

router.get('/auth',function(req,res){
    res.redirect('../authPrimavera');
});
router.get('/checkStock/:idItem',function(req,res){

    let params ={
        secondToken:my_var
      };

    request.post({url: url+endPoint, form:params},function(req,res,next){

    })

});
module.exports = router;
