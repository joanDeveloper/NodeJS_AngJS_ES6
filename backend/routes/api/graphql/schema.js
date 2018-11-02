const typeDefs = `
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
`;

module.exports = typeDefs;