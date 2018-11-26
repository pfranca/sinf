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



module.exports = router;
