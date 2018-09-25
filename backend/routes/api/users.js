var mongoose = require('mongoose');
var router = require('express').Router();
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');
var md_auth = require('../../middleware/athenticated');
var jwt = require('../../utils/jwt');
var passport = require('passport');

// return a list of users
router.get('/', md_auth.ensureAuth,function(req, res, next) {
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

//Sign up manual
router.post('/register', function(req, res, next) {
  //console.log("arriba a sign-up");
  let param = req.body;
  console.log(param);
  
  if(param.user && param.email && param.password1 && param.password2){
    //return res.json({message:"OK"});
    let user = new User();

    user.user = param.user;
    user.name = param.user;
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
        //encriptacion password
        bcrypt.hash(param.password1, null, null, (err, hash) => {
					user.password = hash;
					user.save((err,  userStored) => {
						if (err) return res.status(500).send({message:'Error to save user'});
						//console.log(userStored);
						if (userStored) {
							res.status(200).send({
								user: userStored

							});
						}else{
							res.status(404).send({
								message: "Don't register user"

							});

            }
            
          });
          
				});
        
      }
      
    });

  }else{
    return res.json({message:"Complete su formulario"});

  }

});

//sign-in manual
router.post('/login', function(req, res, next) {
  var values = req.body;
	var email = values.email;
	var password = values.password;

  if(!email){
    return res.status(422).json({errors: {email: "Please, write your email"}});

  }

  if(!password){
    return res.status(422).json({errors: {password: "Please, write your password"}});

  }

	User.findOne( { email:email }, ( err, users ) => {
		if (err) {
			return res.status(500).send({message:'Error petition user'});

		}

		if (users) {
			bcrypt.compare(password, users.password, (err, check) => {
				if (check) {
          //return res.status(200).send({message:'Password correct'});
          if ( values.get_token ) {
						return res.status(200).send({
						  token: jwt.create_token( users )

						});

					}else{
						users.password = undefined;
						return res.status(200).send({ users });

					}

				}else{
					return res.status(404).send({message:'Password incorrect'});

				}
			});

		}else{
			return res.status(404).send({message:'User not exist'});

		}

  });
  
});

//sign-in social
router.get('/auth/googleplus', passport.authenticate('google', { scope: [
  'https://www.googleapis.com/auth/plus.login',
  'https://www.googleapis.com/auth/plus.profile.emails.read'] })
);
router.get('/auth/googleplus/callback',
  passport.authenticate('google', {
   successRedirect : 'http://localhost:8081',
   failureRedirect: '/' }));

/*router.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email', 'public_profile']}));
router.get('/auth/facebook/callback',
      passport.authenticate('facebook',{ 
      successRedirect: 'http://nodejs-angular-final1-yomogan.c9users.io:8080/#!/auth/sociallogin', 
      failureRedirect: '/' }));
      
router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback',
    passport.authenticate('twitter',{
      successRedirect: 'http://nodejs-angular-final1-yomogan.c9users.io:8080/#!/auth/sociallogin',
      failureRedirect: '/' }));*/


module.exports = router;
