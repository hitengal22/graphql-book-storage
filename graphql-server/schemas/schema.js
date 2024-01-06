const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
} = require('graphql');
const axios = require('axios');
const FilmType = require('./Film');
const PeopleType = require('./People');
const Film = require('../models/Film');
const People = require('../models/People');

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    film: {
      type: FilmType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Film.findById(args.id);
      }
    },
    people: {
      type: PeopleType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return People.findById(args.id);
      }
    },
    films: {
      type: new GraphQLList(FilmType),
      resolve(parent, args){
        return Film.find({});
      }
    },
    peoples: {
      type: new GraphQLList(PeopleType),
      resolve(parent, args){
        return People.find({});
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
