var http = require('http'),
    path = require('path'),
    methods = require('methods'),
    express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cors = require('cors'),
    passport = require('passport'),
    errorhandler = require('errorhandler'),
    mongoose = require('mongoose');


/*--------------------------------------------------------------------*/
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');





var isProduction = process.env.NODE_ENV === 'production';
// Create global app object
var app = express();
app.use(cors());



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

var b = require("./prova");

// Some fake data
/*const books = [{
  title: "Harry Potter and the Sorcerer's stone",
  author: 'J.K. Rowling',
  protas:"10"
},
{
  title: 'Jurassic Park',
  author: 'Michael Crichton',
  protas:"10"
},
{
  title: 'peli3',
  author: 'autor 3',
  protas:"10"
}, 
{
  title: 'peli4',
  author: 'autor 4',
  protas:"10"
}

];*/
var merge = require('lodash');
// The GraphQL schema in string form
setTimeout(() => {
  console.log("abu:",b);
  const typeDefs = `
type Query { books: [Book] }
type Book { title: String, author: String }
`;

// The resolvers
const resolvers = {
Query: {
  books: () => b
},
};
//var resolverss = merge(b);
// Put together a schema
const schema = makeExecutableSchema({
typeDefs,
resolvers,
});
/*--------------------------------------------------------------------*/
/*--------------------------------------------------------------------*/
// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}));
}, 10000);

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));
/*--------------------------------------------------------------------*/

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
