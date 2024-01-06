const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  image: String,
  description: String,
  gener: String,
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }
});

module.exports = mongoose.model('Book', bookSchema);
