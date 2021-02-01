const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  bookId: {
    type: String,
    required: true,
  },
});

commentSchema.virtual('humanDate').get(function () {
  return new Date(this.date).toLocaleString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
});

module.exports = model('Comment', commentSchema);
