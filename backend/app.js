var http = require('http'),
    path = require('path'),
    methods = require('methods'),
    express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cors = require('cors'),
    passport = require('passport'),
    errorhandler = require('errorhandler'),
    mongoose = require('mongoose'),
    schema = require("./routes/api/graphql/index");

<<<<<<< HEAD


/*--------------------------------------------------------------------*/
=======
>>>>>>> f136d91b95b7ace3dbb5ac18cad3cba197e23545
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

var isProduction = process.env.NODE_ENV === 'production';
// Create global app object
var app = express();
app.use(cors());

/*--------------------------------------------------------------------*/
// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}));
// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));
/*--------------------------------------------------------------------*/

// Normal express config defaults
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'cognitive_brain', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));

if (!isProduction) {
  app.use(errorhandler());
}

if(isProduction){
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect('mongodb://localhost/cognitive_brain');
  mongoose.set('debug', true);
  
}

require('./models/User');
require('./models/Category');
require('./models/Test');
require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());

app.use(require('./routes'));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});



// finally, let's start our server...
var server = app.listen( process.env.PORT || 3000, function(){
  console.log('Listening on port ' + server.address().port);
});
