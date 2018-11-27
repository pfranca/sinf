var express = require('express');
var request = require('request');
var router = express.Router();
var cookieParser = require('cookie-parser');
router.use(cookieParser());



var port = 3001;
var path = "/WebApi";
var endPoint = "/Token";
var acessTokenNotFiltered;
var FinalToken;


router.get('/',function(req,res){
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
      jsonArray = JSON.parse(body);
      for (i in jsonArray.access_token) {
        jsonArray.access_token[i]!=undefined
          acessTokenNotFiltered += jsonArray.access_token[i];
      } 
      FinalToken=acessTokenNotFiltered.replace("undefined","");


      res.cookie("primaveraAuth" , FinalToken,{ expires: new Date(Date.now() + (1199*1000)), httpOnly: true });
      res.status(200);
      res.send(body + " Cookie is set");
    }

    //res.cookie("primaveraAuth" , FinalToken,{expire : new Date() + 1199}).send('Cookie is set');

  });




});



module.exports = router;
