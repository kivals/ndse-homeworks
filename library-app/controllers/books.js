const Book = require('../models/book');

exports.newBook = (req, res) => {
  const book = new Book();
  res.render('book/create', {
    title: 'Создание книги',
    book,
  });
};

exports.getBooksApi = async (res) => {
  const books = await Book.find({});
  res.json(books);
};

exports.createBook = async (req, res) => {
  const fileBook = req.file ? req.file.filename : '';
  const book = new Book({ ...req.body, fileBook });
  try {
    await book.save();
    res.redirect('/');
  } catch (e) {
    console.error(e.message);
    res.status(400).send('Unable to save shark to database');
  }
};

exports.createBookApi = async (req, res) => {
  const fileBook = req.file ? req.file.filename : '';
  const book = new Book({ ...req.body, fileBook });
  try {
    const newBook = await book.save();
    res.json(newBook);
  } catch (e) {
    console.error(e.message);
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

exports.getBookIdApi = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  res.json(book);
};

exports.getEditBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  res.render('book/update', {
    title: 'Редактирование книги',
    book,
  });
};

exports.editBook = async (req) => {
  const { id } = req.params;
  const filter = { _id: id };
  const update = req.body;
  await Book.findOneAndUpdate(filter, update);
};

exports.editBookApi = async (req, res) => {
  const { id } = req.params;
  const filter = { _id: id };
  const update = req.body;
  try {
    const updatedBook = await Book.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.json(updatedBook);
  } catch (e) {
    console.error(e);
    res.status(400).send('Document has not been found');
  }
};

exports.deleteBook = async (req) => {
  const { id } = req.params;
  const filter = { _id: id };
  await Book.deleteOne(filter);
};

exports.deleteBookApi = async (req, res) => {
  const { id } = req.params;
  const filter = { _id: id };
  try {
    await Book.findByIdAndDelete(filter);
    res.json('OK');
  } catch (e) {
    console.error(e);
    res.status(400).send('Document has not been found');
  }
};
