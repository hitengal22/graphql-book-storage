const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLFloat,
  GraphQLNonNull,
} = require("graphql");
const axios = require("axios");
const FilmType = require("./Film");
const PeopleType = require("./People");
const Film = require("../models/Film");
const People = require("../models/People");
const Author = require("../models/Authors");
const Book = require("../models/Book");

const AuthorTypeInjection = require("./Author");
const BookTypeInjection = require("./Book");

const types = {};
types.AuthorType = AuthorTypeInjection(types);
types.BookType = BookTypeInjection(types);

const AuthorType = types.AuthorType;
const BookType = types.BookType;

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    film: {
      type: FilmType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Film.findById(args.id);
      },
    },
    people: {
      type: PeopleType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return People.findById(args.id);
      },
    },
    films: {
      type: new GraphQLList(FilmType),
      resolve(parent, args) {
        return Film.find({});
      },
    },
    peoples: {
      type: new GraphQLList(PeopleType),
      resolve(parent, args) {
        return People.find({});
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({});
      },
    },
    book: {
      type: BookType,
      args: {
        id: {
          type: GraphQLID
        },
      },
      resolve(parent, args) {
        return Book.findById(args?.id);
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({});
      },
    },
    author: {
      type: AuthorType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        return Author?.findById(args?.id);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
        age: {
          type: new GraphQLNonNull(GraphQLString),
        },
        rating: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve(parent, args) {
        const author = new Author({
          name: args?.name,
          age: args?.age,
          rating: args?.rating,
        });

        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
        image: {
          type: new GraphQLNonNull(GraphQLString),
        },
        description: {
          type: new GraphQLNonNull(GraphQLString),
        },
        genre: {
          type: new GraphQLNonNull(GraphQLString),
        },
        authorId: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve(parent, args) {
        const book = new Book({
          name: args?.name,
          image: args?.image,
          description: args?.description,
          genre: args?.genre,
          authorId: args?.authorId,
        });

        return book.save();
      },
    },
    updateAuthor: {
      type: AuthorType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
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
      },
      resolve(parent, args) {
        const { name, age, rating } = args;
        return new Promise(async function (resolve) {
          const authorResponse = await Author.findByIdAndUpdate(args?.id, {
            name,
            age,
            rating,
          });
          return resolve(authorResponse);
        });
      },
    },
    updateBook: {
      type: BookType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        },
        name: {
          type: GraphQLString
        },
        description: {
          type: GraphQLString
        },
        image: {
          type: GraphQLString
        },
        genre: {
          type: GraphQLString
        },
        authorId: {
          type: GraphQLID
        },
      },
      resolve(parent, args) {
        const { name, description, image, genre, authorId } = args;
        return new Promise(async function (resolve) {
          const bookResponse = await Book.findByIdAndUpdate(args?.id, {
            name,
            description,
            image,
            genre,
            authorId,
          });
          return resolve(bookResponse);
        });
      },
    },
    deleteAuthor: {
      type: AuthorType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        },
      },
      resolve(parent, args) {
        return new Promise(async function (resolve) {
          const authorResponse = await Author.findByIdAndDelete(args?.id);
          return resolve(authorResponse);
        });
      },
    },
    deleteBook: {
      type: BookType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        },
      },
      resolve(parent, args) {
        return new Promise(async function (resolve) {
          const bookResponse = await Book.findByIdAndDelete(args?.id);
          return resolve(bookResponse);
        });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
