var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var GitHubStrategy = require('passport-github2').Strategy;
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
              name: profile.name.givenName,
              email: profile.emails[0].value,
              media: profile.photos[0].value,
          });
          console.log("user" + user);
          user.save(function(err) {
            if(err){
              console.log(err);
                return done(null, user);
            }else{
              return done(null, user);
            }
          });
      }
    });
  }
));

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
                if(err){
                  console.log(err);
                    return done(null, user);
                }else{
                  return done(null, user);
                }
              });
            }
        });
    });
}));

passport.use(new GitHubStrategy({
  clientID: socialKeys.GITHUB_CLIENT_ID,
  clientSecret: socialKeys.GITHUB_CLIENT_SECRET,
  callbackURL: socialKeys.GITHUB_CALLBACK
},
  function(accessToken, refreshToken, profile, done) {
    console.log("github");
    console.log(profile);
    console.log(profile.id);
    console.log(profile._json.avatar_url);
    /*User.findOrCreate({ 'idsocial': profile.id }, function (err, user) {
      if (err){
        console.log('err');
        return done(err);
      }if (user) {
        console.log('USUARIO EXISTE');
        return done(null, user);
      } else {
        console.log('USUARIO NO EXISTE');
          var user = new User({
              idsocial: profile.id,
              user: profile._json.login,
              name: profile._json.login,
              email: profile.emails[0].value,
              media: profile._json.avatar_url,
          });
          //console.log(user);
          user.save(function(err,user) {
            console.log(err);
              if(err){
                  console.log('USER:');
                  console.log(user);
                  return done(null, user);
              }
              if(user){
                return done(null, user);
              }
          });
      }
    });*/
    User.findOne({ 'idsocial' : profile.id }, function(err, user) {
      console.log(user);
      if (err){
        console.log('err');
        return done(err);
      }if (user) {
        console.log('USUARIO EXISTE');
        return done(null, user);
      } else {
        console.log('USUARIO NO EXISTE');
          var user = new User({
              idsocial: profile.id,
              user: profile._json.login,
              name: profile._json.login,
              email: profile.emails[0].value,
              media: profile._json.avatar_url,
          });
          //console.log(user);
          user.save(function(err,user) {
            console.log(err);
              if(err){
                  console.log('USER:');
                  console.log(user);
                  return done(null, user);
              }
              if(user){
                return done(null, user);
              }
          });
      }
    });
  }
));


/*passport.use(new LinkedInStrategy({
  consumerKey: socialKeys.LINKEDIN_API_KEY,
  consumerSecret: socialKeys.LINKEDIN_SECRET_KEY,
  callbackURL: socialKeys.LINKEDIN_CALLBACK,
  
},
function(token, tokenSecret, profile, done) {
  console.log(profile);
  process.nextTick(function () {
    // To keep the example simple, the user's LinkedIn profile is returned to
    // represent the logged-in user.  In a typical application, you would want
    // to associate the LinkedIn account with a user record in your database,
    // and return that user instead.
    return done(null, profile);
  });
}
));*/

