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
  

    
/*async function prueba() {
  var Category = mongoose.model('Category');
  const pool = await Category.find().then(function (category) {
    console.log(category);
    return category;    
  });
  console.log(111111111111);
  console.log(pool);
  return pool;
};*/

/*  async function getColaboradores() {
   const pool = await sql.connect(config)
   const result = await pool.request().query `select grupo,'//media.grutinet.com/articulos/images/colaboradores/'+logo as icon, nombre as title, pagina_web as link  from COLABORADORES WHERE activo=1`
   sql.close()

   return result.recordset;
 } */

/*--------------------------------------------------------------------*/
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

// Some fake data
/*const libros = [{
    title: "Harriiiiii Potter and the Sorcerer's stone",
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

// The GraphQL schema in string form
/*const typeDefs = `
  type Query { 
    booksi: [Book]
    getCategory: [getCategoryType]
  }
  type Book { 
    title: String,
     author: String 
  }
  type getCategoryType {
    name: String,
    description: String
  }
`;*/
var prueba = require("./routes/api/graphql/categories");
var typeDefs = require("./routes/api/graphql/schema");
// The resolvers
const resolvers = {
  Query: {
    //booksi: () => libros,
    getCategory: () =>prueba()
  },
};
console.log("res",resolvers.Query.getCategory);
// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
/*--------------------------------------------------------------------*/



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
