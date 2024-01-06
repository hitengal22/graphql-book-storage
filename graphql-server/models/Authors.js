const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: String,
  age: String,
  rating: mongoose.Decimal128
});

module.exports = mongoose.model('Author', authorSchema);
