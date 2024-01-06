const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt
} = require('graphql');

const FilmType = new GraphQLObjectType({
  name: "Film",
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    episode_id: { type: GraphQLInt },
    opening_crawl: { type: GraphQLString },
    director: { type: GraphQLString },
    producer: { type: GraphQLString },
    release_date: { type: GraphQLString },
    characters: {
      type: new GraphQLList(GraphQLString)
    },
    planets: {
      type: new GraphQLList(GraphQLString)
    },
    starships: {
      type: new GraphQLList(GraphQLString)
    },
    vehicles: {
      type: new GraphQLList(GraphQLString)
    },
    species: {
      type: new GraphQLList(GraphQLString)
    },
    created: {
      type: GraphQLString
    },
    edited: {
      type: GraphQLString
    },
    url: {
      type: GraphQLString
    }
  })
})

module.exports = FilmType
