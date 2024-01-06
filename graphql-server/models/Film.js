const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filmSchema = new Schema({
    title: String,
    episode_id: Number,
    opening_crawl: String,
    director: String,
    producer: String,
    release_date: String,
    characters: [{
      type: String
    }],
    planets: [{
      type: String
    }],
    starships: [{
      type: String
    }],
    vehicles: [{
      type: String
    }],
    species: [{
      type: String
    }],
    created: String,
    edited: String,
    url: String
});

module.exports = mongoose.model('Film', filmSchema);
