const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const peopleSchema = new Schema({
  birth_year: String,
  eye_color: String,
  films: [{
    type: String
  }],
  gender: String,
  hair_color: String,
  height: String,
  homeworld: String,
  mass: String,
  name: String,
  skin_color: String,
  created: String,
  edited: String,
  species: [{
    type: String
  }],
  starships: [{
    type: String
  }],
  url: String,
  vehicles: [{
    type: String
  }]
});
module.exports = mongoose.model('People', peopleSchema);
