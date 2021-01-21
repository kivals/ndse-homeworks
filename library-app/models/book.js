const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  authors: {
    type: String,
    required: true,
  },
  favorite: {
    type: String,
    default: false,
  },
  fileCover: {
    type: String,
  },
  fileName: {
    type: String,
  },
  fileBook: {
    type: String,
  },
  views: {
    type: Number,
    default: 0,
  },
});

module.exports = model('Book', bookSchema);
