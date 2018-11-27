var express = require('express');
var cookieParser = require('cookie-parser');
var router = express.Router();
router.use(cookieParser());


var FinalToken;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'pussy' });
});


router.get('/getCookie', function(req, res, next) {
  //FinalToken=acessTokenNotFiltered.replace("undefined","");
  if(req.cookies.primaveraAuth!=undefined){
    FinalToken=req.cookies.primaveraAuth;
    console.log('authCookie: ', FinalToken);
  }
   res.redirect('back');
  //res.end();
});




module.exports = router;
