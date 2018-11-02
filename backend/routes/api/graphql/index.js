const { makeExecutableSchema } = require('graphql-tools');
var category = require("../../../models/graphql/Category.graphql");
var query = require("../../../models/graphql/Query.graphql");
var categories = require("../../../routes/api/graphql/categories");

// The resolvers
const resolvers = {
  Query: {
    getCategory: () => categories()
  },
};

const typeDefs = [category,query];

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;