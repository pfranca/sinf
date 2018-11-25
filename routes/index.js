var express = require('express');
var request = require('request');
var router = express.Router();

var port = 3001;
var path = "/WebApi";
var endPoint = "/Token";
var acessTokenNotFiltered;
var FinalToken;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'pussy' });
});

router.get('/token',function(req,res){
  let params ={
    username: 'FEUP',
    password: 'qualquer1',
    company: 'BELAFLOR',
    instance: 'DEFAULT',
    grant_type: 'password',
    line: 'professional'
  };

  
  let headersOpt = {
    'content-type': 'application/x-www-form-urlencoded',
  };

  request.post({url: 'http://localhost:'+port+path+endPoint, form:params}, (error, response, body) => {
    if (error) {
      console.error(error);
      return;
    } else {
      res.send(body);
      res.status(200);
      jsonArray = JSON.parse(body);
      for (i in jsonArray.access_token) {
        jsonArray.access_token[i]!=undefined
          acessTokenNotFiltered += jsonArray.access_token[i];
      } 
      FinalToken=acessTokenNotFiltered.replace("undefined","")
    }

    console.log(FinalToken);
  });


});



module.exports = router;
