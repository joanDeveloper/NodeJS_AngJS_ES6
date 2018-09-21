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

//Sign up
router.post('/register', function(req, res, next) {
  //console.log("arriba a sign-up");
  let param = req.body;
  console.log(param);
  
  if(param.user && param.email && param.password1 && param.password2){
    //return res.json({message:"OK"});
    let user = new User();

    user.user = param.user;
    user.name = "";
		user.surname = "";
    user.email = param.email;
    user.password1 = param.password1;
    user.password2 = param.password2;
    user.type_user = "";
    user.type_plan = "";
    user.date_init = "";
    user.date_expiration = "";
    user.ubication = "";

    User.find({ $or: [{email:user.email.toLowerCase()},{user:user.user.toLowerCase()} ]}).exec((err, users) => {
      if (err) {
				return res.status(500).send({message:'Error petition user'});

      }
      
      if ( users && users.length >= 1 ) {
				return res.status(200).send({message:'User already exist'});

			}else{
        return res.status(200).send({message:'Puede registrarse'});
        
      }
      
    });

  }else{
    return res.json({message:"Complete su formulario"});

  }

});

module.exports = router;
