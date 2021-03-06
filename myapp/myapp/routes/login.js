var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;
var client =  new Client();
var tmp;
var object = {};

var invoke_user = function(fcn, args, callback){
   var jsonheaders = {
      "Content-Type" : "application/json"
      };
   object.headers = jsonheaders;


   var api_url = 'http://54.164.52.65:3000/buser/'+fcn;
   var jsonContent = args;
   object.data = jsonContent;

   client.registerMethod("invokeUserMethod", api_url, "POST");
    client.methods.invokeUserMethod(object, function (data, response) {
       console.log("data : " + JSON.stringify(data));
       callback(data);
   });
}

router.get('/', function(req, res) {
  res.render('login',{title:'로그인'});
});



// router.post('/',function(req, res){
//   console.log(req.body);
//   var str = "id = " +req.email + ", pw = " + req.pw;
//   res.send(str);
// })

router.post('/',function(req, res, next){

  console.log(req.body);
  var email =  req.body.email;
  var pw = req.body.pw;
  var args = {
    "email" : email,
    "pw" : pw
  };

  invoke_user("login", args, function(data){
    if(data.success){
      var sess = req.session;
      sess.email = email;
      sess.pw = pw;
      res.redirect("/main");
    }else{
      res.redirect("/relogin");
    }

  })
})

module.exports = router;
