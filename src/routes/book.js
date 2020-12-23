const express = require('express');

const router = express.Router();
const Store = require('../store');
const { getFileFromReq } = require('../helper');
const fileMiddleware = require('../middleware/file');
const { Book } = require('../models');

const store = new Store();

router.get('/create', (req, res) => {
  res.render('books/create', {
    title: 'Создание книги',
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

router.post('/', fileMiddleware.single('fileBook'), (req, res) => {
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

module.exports = router;
