const Book = require('../models/Book');

exports.index = async (req, res) => {
  const books = await Book.find({});
  res.render('index', {
    title: 'Книги',
    books,
    auth: !!req.user,
  });
};
