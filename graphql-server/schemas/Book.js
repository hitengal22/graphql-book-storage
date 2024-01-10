const {
  graphql,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} = require("graphql");
const AuthorType = require("./Author");
const Author = require("../models/Authors");

const BookType = (types) =>
  new GraphQLObjectType({
    name: "BookType",
    fields: () => ({
      _id: {
        type: GraphQLID,
      },
      name: {
        type: GraphQLString,
      },
      description: {
        type: GraphQLString,
      },
      image: {
        type: GraphQLString,
      },
      genre: {
        type: GraphQLString,
      },
      authorId: {
        type: GraphQLID,
      },
      author: {
        type: types.AuthorType,
        resolve(parent, args) {
          return Author.findById(parent?.authorId);
        },
      },
    }),
  });

module.exports = BookType;
