const { checkDocExist, makeNotFoundError } = require('./controller-utils');
const Book = require('../models/Book');

exports.newBook = (req, res) => {
  const book = new Book();
  res.render('book/create', {
    title: 'Создание книги',
    book,
    auth: !!req.user,
  });
};

exports.getBooksApi = async (res, next) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (error) {
    next(error);
  }
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

exports.createBookApi = async (req, res, next) => {
  const fileBook = req.file ? req.file.filename : '';
  const book = new Book({ ...req.body, fileBook });
  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
};

exports.getBookId = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  res.render('book/index', {
    title: 'Просмотр книги',
    book,
    auth: !!req.user,
  });
};

exports.getBookIdApi = async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      next(makeNotFoundError());
    } else {
      res.json(book);
    }
  } catch (error) {
    next(error);
  }
};

exports.getEditBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  res.render('book/update', {
    title: 'Редактирование книги',
    book,
    auth: !!req.user,
  });
};

exports.editBook = async (req) => {
  const { id } = req.params;
  const filter = { _id: id };
  const update = req.body;
  await Book.findOneAndUpdate(filter, update);
};

exports.editBookApi = async (req, res, next) => {
  const { id } = req.params;
  const update = req.body;
  try {
    if (!(await checkDocExist(Book, { _id: id }))) {
      next(makeNotFoundError());
      return;
    }
    const updatedBook = await Book.findByIdAndUpdate(id, update, {
      new: true,
    });
    res.json(updatedBook);
  } catch (e) {
    next(e);
  }
};

exports.deleteBook = async (req) => {
  const { id } = req.params;
  const filter = { _id: id };
  await Book.deleteOne(filter);
};

exports.deleteBookApi = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!(await checkDocExist(Book, { _id: id }))) {
      next(makeNotFoundError());
      return;
    }
    await Book.findByIdAndDelete(id);
    res.json('OK');
  } catch (e) {
    next(e);
  }
};
