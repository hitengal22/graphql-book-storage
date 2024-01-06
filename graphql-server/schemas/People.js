const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt
} = require('graphql');
const FilmType = require('./Film');
const Film = require('../models/Film');

const PeopleType = new GraphQLObjectType({
  name: "People",
  fields: () => ({
    _id: { type: GraphQLID },
    birth_year: { type: GraphQLString },
    eye_color: { type: GraphQLString },
    films: { type: new GraphQLList(GraphQLString) },
    gender: { type: GraphQLString },
    hair_color: { type: GraphQLString },
    height: { type: GraphQLString },
    homeworld: { type: GraphQLString },
    mass: { type: GraphQLString },
    name: { type: GraphQLString },
    skin_color: { type: GraphQLString },
    created: { type: GraphQLString },
    edited: { type: GraphQLString },
    species: { type: new GraphQLList(GraphQLString) },
    starships: { type: new GraphQLList(GraphQLString) },
    url: { type: GraphQLString },
    vehicles: { type: new GraphQLList(GraphQLString) },
    filmsD: {
      type: new GraphQLList(FilmType),
      resolve(parent, args) {
        const filmURL = parent.url
        return new Promise(async function(resolve, reject) {
          const res = await Film.aggregate([{
            $match: {
              characters: filmURL
            }
          }])
          return resolve(res)
        });
      }
    }
  })
})

module.exports = PeopleType
