const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = require('graphql');
const BookType = require('./Book');
const Book = require('../models/Book');


const AuthorType =  (types) => new GraphQLObjectType({
  name: "AuthorType",
  fields: () => ({
    _id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    age: {
      type: GraphQLString
    },
    rating: {
      type: GraphQLString
    },
    books: {
      type: new GraphQLList(types.BookType),
      resolve(parent, args) {
        return Book.find({ authorId: parent._id })
      }
    }
  })
});

module.exports = AuthorType
