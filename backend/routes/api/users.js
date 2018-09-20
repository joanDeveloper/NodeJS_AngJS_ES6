var mongoose = require('mongoose');
var router = require('express').Router();
var User = mongoose.model('User');

// return a list of users
router.get('/', function(req, res, next) {
  //console.log(res);
  //console.log("hola user");
  User.find().then(function(user){
      console.log(user);
      return res.json({user: user});

  }).catch(next);

});

//return details user
router.get('/:id', function(req, res, next) {
  /*console.log("hola user");
  console.log(req.params.id);*/
  User.find({'_id':req.params.id}).then(function(user){
    console.log(user);
    if(!user){ 
      return res.sendStatus(401); 
    }
    return res.json({user: user});
    
  }).catch(next);

});

module.exports = router;
