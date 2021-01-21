const Book = require('../models/book');

exports.index = async (res) => {
  const books = await Book.find({});
  res.render('index', {
    title: 'Книги',
    books,
  });
};
