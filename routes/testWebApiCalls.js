var express = require('express');
var request = require('request');

var router = express.Router();


router.get('/',function(req,res){

    console.log('TOKEN: ');
    console.log(token);
   

   
    var query = "SELECT A.Artigo,A.Descricao, A.Observacoes ,AM.PVP1,AA.StkActual FROM Artigo A,ArtigoMoeda AM , V_INV_ArtigoArmazem AA WHERE A.Artigo=AA.Artigo AND A.Artigo=AM.Artigo AND A.Artigo IN ('A001')";
    var options = {
        method: 'POST',
        url: url + 'Base/Clientes/Actualiza',
        headers:
            {
                'cache-control': 'no-cache',
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json' },
        body: {
            "Cliente": "SMITHJ",
            "Nome": "John Smith",
            "Descricao": "WebStoreUserJohnSmith",
            "Morada": "Random Street n 123",
            "Localidade": "PORTO",
            "CodigoPostal": "4200",
            "LocalidadeCodigoPostal": "PORTO",
            "NumContribuinte": "123456789",
            "Pais": "PT",
            "Moeda": "EUR"
        },
        
        json: true };
    
    request(options, (error, response, body) => {
        if(error){
    
            console.error("erro" + error);
            return;
        }

    res.send(body);
    });
});


module.exports = router;