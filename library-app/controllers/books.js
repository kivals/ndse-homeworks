const Book = require('../models/book');

exports.newBook = (req, res) => {
  const book = new Book();
  res.render('book/create', {
    title: 'Создание книги',
    book,
  });
};

exports.createBook = async (req, res) => {
  const fileBook = req.file ? req.file.filename : '';
  const book = new Book({ ...req.body, fileBook });
  try {
    await book.save();
    res.redirect('/');
  } catch (e) {
    console.log(e.message);
    res.status(400).send('Unable to save shark to database');
  }
};

exports.getBookId = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  res.render('book/index', {
    title: 'Просмотр книги',
    book,
  });
};

exports.getEditBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  res.render('book/update', {
    title: 'Редактирование книги',
    book,
  });
};

exports.editBook = async (req, res) => {
  const { id } = req.params;
  const filter = { _id: id };
  const update = req.body;
  const upBook = await Book.findOneAndUpdate(filter, update);
  console.log('LOGGGGG ' + upBook);

};

exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  const filter = { _id: id };
  await Book.deleteOne(filter);
};
