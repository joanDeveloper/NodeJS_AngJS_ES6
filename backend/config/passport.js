/*var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
}, function(email, password, done) {
  User.findOne({email: email}).then(function(user){
    if(!user || !user.validPassword(password)){
      return done(null, false, {errors: {'email or password': 'is invalid'}});
    }

    return done(null, user);
  }).catch(done);
}));*/
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var socialKeys = require('../credentials/credentials.json');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // console.log(`id: ${id}`);
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(error => {
      console.log(`Error: ${error}`);
    });
});

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
}, function(email, password, done) {
  User.findOne({email: email}).then(function(user){
    if(!user || !user.validPassword(password)){
      return done(null, false, {errors: {'email or password': 'is invalid'}});
    }
    return done(null, user);
  }).catch(done);
}));


passport.use(new GoogleStrategy({
  clientID: socialKeys.GOOGLEPLUS_CLIENT_ID,
  clientSecret: socialKeys.GOOGLEPLUS_CLIENT_SECRET,
  callbackURL: socialKeys.GOOGLEPLUS_CALLBACK,
  passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    //console.log(profile);
    User.findOne({ 'idsocial' : profile.id }, function(err, user) {
        if (err)
          return done(err);

        // if the user is found then log them in
        if (user) {
            console.log('USER EXISTS' + user);
            return done(null, user);
        } else {
          console.log('USUARIO NO EXISTE');
          var user = new User({
              idsocial: profile.id,
              user: profile.name.givenName,
              email: profile.emails[0].value,
              media: profile.photos[0].value,
          });
          console.log("user" + user);
          user.save(function(err) {
            if(err){
              console.log(err);
                return done(null, user);
            }
          });
      }
    });
  }
));

//Passport strategy to connect with Facebook
passport.use(new FacebookStrategy({
  clientID: socialKeys.FACEBOOK_CLIENT_ID,
  clientSecret: socialKeys.FACEBOOK_CLIENT_SECRET,
  callbackURL: socialKeys.FACEBOOK_CALLBACK,
  profileFields: ['id', 'displayName', 'name', 'email', 'link', 'locale', 'photos'],
  passReqToCallback: true
}, function(req, accessToken, refreshToken, profile, done) {
    //console.log(profile);
    //Search for the user in database
    User.findOne({ 'idsocial' : profile.id }, function(err, user) {
      //console.log(user);
      if (err){
        console.log('err');
        return done(err);
      }if (user) {
        return done(null, user);
      } else {
        console.log('USUARIO NO EXISTE');
          var user = new User({
              idsocial: profile.id,
              username: profile.name.givenName,
              email: profile.emails[0].value,
              bio: profile.profileUrl,
          });
          //console.log(user);
          user.save(function(err) {
            console.log(err);
              if(err){
                  console.log('USER:');
                  console.log(user);
                  return done(null, user);
              }
          });
      }
    });
  
}));//FacebookStrategy end

passport.use(new TwitterStrategy({
    consumerKey     : socialKeys.TWITTER_CLIENT_ID,
    consumerSecret  : socialKeys.TWITTER_CLIENT_SECRET,
    userProfileURL: socialKeys.TWITTER_USER_PROFILE,
    callbackURL   : socialKeys.TWITTER_CALLBACK
    //userAuthorizationURL: 'https://api.twitter.com/oauth/authorize'
  },
  function(token, tokenSecret, profile, done) {
    // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Twitter
    process.nextTick(function() {
        User.findOne({ 'idsocial' : profile.id }, function(err, user) {
            // if there is an error, stop everything and return that
            // ie an error connecting to the database
            if (err)
              return done(err);
              
            // if the user is found then log them in
            if (user) {
                return done(null, user); // user found, return that user
            } else {
              // if there is no user, create them
              console.log(profile);
              var user = new User({
                  idsocial: profile.id,
                  token: token,
                  username: profile.username,
                  email: profile.emails[0].value,
                });
              console.log(user);
              user.save(function(err) {
              		if(err) throw err;
              			done(null, user);
              });
            }
        });
    });
}));


