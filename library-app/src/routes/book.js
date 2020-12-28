const express = require('express');

const router = express.Router();
const Store = require('../../../common/store');
const { getFileFromReq } = require('../utils');
const fileMiddleware = require('../middleware/file');
const { Book } = require('../../../common/models');

const store = Store.getInstance();

router.get('/create', (req, res) => {
  const book = new Book();
  res.render('books/create', {
    title: 'Создание книги',
    book,
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const book = store.getBook(id);
  res.render('books/index', {
    title: 'Просмотр книги',
    book,
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
  store.setBook(newBook);
  res.redirect('/');
});

router.get('/update/:id', (req, res) => {
  const { id } = req.params;
  const book = store.getBook(id);
  res.render('books/update', {
    title: 'Редактирование книги',
    book,
  });
});

router.post('/update/:id', fileMiddleware.single('fileBook'), (req, res) => {
  const { id } = req.params;
  const book = store.getBook(id);
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
    store.updateBook(newBook);
    res.redirect('/');
  }
});

module.exports = router;
