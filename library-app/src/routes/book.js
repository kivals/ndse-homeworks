const express = require('express');

const router = express.Router();
const { getFileFromReq } = require('../utils');
const fileMiddleware = require('../middleware/file');
const helper = require('../../../common/store/store-helper');
const { Book } = require('../../../common/models');

router.get('/create', (req, res) => {
  const book = new Book();
  res.render('books/create', {
    title: 'Создание книги',
    book,
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const book = helper.getBookId(id);
  book.views = book.views ? book.views + 1 : 1;
  const updatedBook = helper.changeBook(book);
  res.render('books/index', {
    title: 'Просмотр книги',
    book: updatedBook,
  });
});

router.post('/create', fileMiddleware.single('fileBook'), (req, res) => {
  const fileBook = getFileFromReq(req);
  const { title, description, authors, favorite, fileCover, fileName } = req.body;
  const newBook = new Book(
    undefined,
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook
  );
  helper.setBook(newBook);
  res.redirect('/');
});

router.get('/update/:id', (req, res) => {
  const { id } = req.params;
  const book = helper.getBookId(id);
  res.render('books/update', {
    title: 'Редактирование книги',
    book,
  });
});

router.post('/update/:id', fileMiddleware.single('fileBook'), (req, res) => {
  const { id } = req.params;
  const book = helper.getBookId(id);
  if (book) {
    const fileBook = getFileFromReq(req);
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    const newBook = new Book(
      id,
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileBook
    );
    helper.changeBook(newBook);
    res.redirect('/');
  }
});

module.exports = router;
