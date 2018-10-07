var mongoose = require('mongoose');
var router = require('express').Router();
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');
var md_auth = require('../../middleware/athenticated');
var jwt = require('../../utils/jwt');
var passport = require('passport');

// return a list of users
router.get('/', md_auth.ensureAuth, function (req, res, next) {
  //console.log(res);
  //console.log("hola user");
  console.log(req.user.sub);
  User.findOne({ '_id': req.user.sub }, (err, users) => {
    if (err) {
      return res.status(500).send({ message: 'Error petition user' });

    }

    if (users) {
      console.log(req.user.sub);
      User.find().then(function (user) {
        console.log(user);
        return res.json({ user: user });

      }).catch(next);

    } else {
      return res.status(404).send({ message: 'User invalid' });

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

router.post('/users/sociallogin', function (req, res, next) {
  let memorystore = req.sessionStore;
  let sessions = memorystore.sessions;
  let sessionUser;
  for (var key in sessions) {
    sessionUser = (JSON.parse(sessions[key]).passport.user);
  }

  User.findOne({ '_id': sessionUser }, function (err, user) {
    console.log(err);
    console.log(user);
    if (err)
      return done(err);
    // if the user is found then log them in
    if (user) {
      console.log(user);
      user.token = user.generateJWT();
      return res.json({ user: user.toAuthJSON() });// user found, return that user
    } else {
      return res.status(422).json(err);
    }
  });
});

//Sign up manual
router.post('/register', function (req, res, next) {
  //console.log("arriba a sign-up");
  let param = req.body;
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
    user.type_user = 0;
    user.type_plan = "";
    user.date_init = "";
    user.date_expiration = "";
    user.ubication = "";
    user.media = 'http://robohash.org/' + param.user + '?set=set2&bgset=bg2&size=256x256';

    //falta comparar el password 1 amb el 2
    User.find({ $or: [{ email: user.email.toLowerCase() }, { user: user.user.toLowerCase() }] })
      .exec((err, users) => {
        if (err) {
          return res.status(422).send({ message: 'Error petition user' });

        }

        if (users && users.length >= 1) {
          return res.status(422).send({ message: 'User already exist' });

        } else {
          //encriptacion password
          bcrypt.hash(param.password1, null, null, (err, hash) => {
            user.password = hash;
            user.save((err, userStored) => {
              if (err) return res.status(422).send({ message: 'Error to save user' });
              //console.log(userStored);
              if (userStored) {
                res.json({ user: userStored });

              } else {
                res.status(422).send({ message: "Don't register user" });

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
router.post('/login', function (req, res, next) {
  var values = req.body;
  var email = values.email;
  var password = values.password1;

  //console.log("pass: "+password);
  if (!email) {
    return res.status(422).json({ errors: { email: "Please, write your email" } });

  }

  if (!password) {
    return res.status(422).json({ errors: { password: "Please, write your password" } });

  }

  User.findOne({ email: email }, (err, users) => {
    if (err) {
      return res.status(422).send({ message: 'Error petition user' });

    }

    if (users) {
      //console.log("passUs: "+users.password);
      bcrypt.compare(password, users.password, (err, check) => {
        //console.log(check);
        if (check) {
          //return res.status(200).send({message:'Password correct'});
          return res.status(200).send({
            token: jwt.create_token(users)

          });

        } else {
          return res.status(422).send({ message: 'Password incorrect' });

        }
      });

    } else {
      return res.status(422).send({ message: 'User not exist' });

    }

  });

});

router.post('/sociallogin', function (req, res, next) {
  //console.log("entra en sociallogin backend");
  let memorystore = req.sessionStore;
  let sessions = memorystore.sessions;
  let sessionUser;
  for (var key in sessions) {
    sessionUser = (JSON.parse(sessions[key]).passport.user);
  }
  //console.log(sessionUser);
  User.findOne({ '_id': sessionUser }, function (err, user) {
    //console.log(err);
    //console.log(user);
    if (err)
      return done(err);
    if (user) {
      console.log(user);
      return res.status(200).send({
        token: jwt.create_token(user)

      });

    } else {
      return res.status(422).json(err);
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
    successRedirect: 'http://localhost:8081/#!/sociallogin',
    failureRedirect: '/'
  }));

/*
router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback',
    passport.authenticate('twitter',{
      successRedirect: 'http://localhost:3000/api/category',
      failureRedirect: '/' }));*/

router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/auth/github/callback',
  passport.authenticate('github', {
    successRedirect: 'http://localhost:8081/#!/sociallogin',
    failureRedirect: '/'
  }));

module.exports = router;
