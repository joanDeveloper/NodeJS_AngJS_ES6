var mongoose = require('mongoose');
var router = require('express').Router();
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');
var md_auth = require('../../middleware/athenticated');
var jwt = require('../../utils/jwt');
var passport = require('passport');

// return a list of users
<<<<<<< HEAD
router.get('/', md_auth.ensureAuth ,function(req, res, next) {
  //console.log(res);
  //console.log("hola user");
  console.log(req.user.sub);
  User.findOne( { '_id':req.user.sub }, ( err, users ) => {
		if (err) {
			return res.status(500).send({message:'Error petition user'});
=======
router.get('/', md_auth.ensureAuth, function (req, res, next) {
  //console.log(res);
  //console.log("hola user");
  User.find().then(function (user) {
    console.log(user);
    return res.json({ user: user });
>>>>>>> 94665c6825c088ec2229516d45e76a895f967311

		}

		if (users) {
			console.log(req.user.sub);
      User.find().then(function(user){
        console.log(user);
        return res.json({user: user});

      }).catch(next);

		}else{
			return res.status(404).send({message:'User invalid'});

		}

  });

});

//return details user
router.get('/:id', function (req, res, next) {
  /*console.log("hola user");
  console.log(req.params.id);*/
  User.find({ '_id': req.params.id }).then(function (user) {
    console.log(user);
    if (!user) {
      return res.sendStatus(401);
    }
    return res.json({ user: user });

  }).catch(next);

});

//Sign up manual
router.post('/register', function (req, res, next) {
  //console.log("arriba a sign-up");
  let param = req.body.user;
  console.log(param);

  if (param.user && param.email && param.password1 && param.password2) {
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

<<<<<<< HEAD
    //falta comparar el password 1 amb el 2
    User.find({ $or: [{email:user.email.toLowerCase()},{user:user.user.toLowerCase()} ]})
    .exec((err, users) => {
=======
    User.find({ $or: [{ email: user.email.toLowerCase() }, { user: user.user.toLowerCase() }] }).exec((err, users) => {
>>>>>>> 94665c6825c088ec2229516d45e76a895f967311
      if (err) {
        return res.status(500).send({ message: 'Error petition user' });

      }

      if (users && users.length >= 1) {
        return res.status(200).send({ message: 'User already exist' });

      } else {
        //encriptacion password
        bcrypt.hash(param.password1, null, null, (err, hash) => {
<<<<<<< HEAD
					user.password = hash;
					user.save((err,  userStored) => {
						if (err) return res.status(500).send({message:'Error to save user'});
						//console.log(userStored);
						if (userStored) {
              res.status(200).send({user: userStored});
              
						}else{
							res.status(404).send({message: "Don't register user"});
=======
          user.password = hash;
          user.save((err, userStored) => {
            if (err) return res.status(500).send({ message: 'Error to save user' });
            //console.log(userStored);
            if (userStored) {
              res.status(200).send({
                user: userStored

              });
            } else {
              res.status(404).send({
                message: "Don't register user"

              });
>>>>>>> 94665c6825c088ec2229516d45e76a895f967311

            }

          });

        });

      }

    });

  } else {
    return res.json({ message: "Complete su formulario" });

  }

});

//sign-in manual
<<<<<<< HEAD
router.post('/login', function(req, res, next) {
  var values = req.body.user;
	var email = values.email;
	var password = values.password;
=======
router.post('/login', function (req, res, next) {
  var values = req.body;
  var email = values.email;
  var password = values.password;
>>>>>>> 94665c6825c088ec2229516d45e76a895f967311

  if (!email) {
    return res.status(422).json({ errors: { email: "Please, write your email" } });

  }

  if (!password) {
    return res.status(422).json({ errors: { password: "Please, write your password" } });

  }

  User.findOne({ email: email }, (err, users) => {
    if (err) {
      return res.status(500).send({ message: 'Error petition user' });

    }

    if (users) {
      bcrypt.compare(password, users.password, (err, check) => {
        if (check) {
          //return res.status(200).send({message:'Password correct'});
<<<<<<< HEAD
          return res.status(200).send({
            token: jwt.create_token( users )

          });
=======
          if (values.get_token) {
            return res.status(200).send({
              token: jwt.create_token(users)

            });

          } else {
            users.password = undefined;
            return res.status(200).send({ users });

          }
>>>>>>> 94665c6825c088ec2229516d45e76a895f967311

        } else {
          return res.status(404).send({ message: 'Password incorrect' });

        }
      });

    } else {
      return res.status(404).send({ message: 'User not exist' });

    }

  });

});

//sign-in social
router.get('/auth/googleplus', passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read']
})
);
router.get('/auth/googleplus/callback',
  passport.authenticate('google', {
<<<<<<< HEAD
   successRedirect : 'http://localhost:3000/api/category',
   failureRedirect: '/' }));
=======
    successRedirect: 'http://localhost:8081',
    failureRedirect: '/'
  }));
>>>>>>> 94665c6825c088ec2229516d45e76a895f967311

router.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email', 'public_profile']}));
router.get('/auth/facebook/callback',
      passport.authenticate('facebook',{ 
      successRedirect: 'http://localhost:3000/api/category', 
      failureRedirect: '/' }));
      
router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback',
    passport.authenticate('twitter',{
      successRedirect: 'http://localhost:3000/api/category',
      failureRedirect: '/' }));


module.exports = router;
