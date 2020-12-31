const express = require('express');

const router = express.Router();
const { getFileFromReq } = require('../utils');
const fileMiddleware = require('../middleware/file');
const helper = require('../store/store-helper');
const { Book } = require('../models');

router.get('/create', (req, res) => {
  const book = new Book();
  res.render('books/create', {
    title: 'Создание книги',
    book,
  });
});

/**
 * Получить книгу по id
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const book = await helper.getBookId(id);
  // book.views = book.views ? book.views + 1 : 1;
  // const updatedBook = await helper.changeBook(id);
  res.render('books/index', {
    title: 'Просмотр книги',
    book,
  });
});

/**
 * Создавть новую книгу
 */
router.post('/create', fileMiddleware.single('fileBook'), async (req, res) => {
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
  await helper.setBook(newBook);
  res.redirect('/');
});

router.get('/update/:id', async (req, res) => {
  const { id } = req.params;
  const book = await helper.getBookId(id);
  res.render('books/update', {
    title: 'Редактирование книги',
    book,
  });
});

router.post('/update/:id', fileMiddleware.single('fileBook'), async (req, res) => {
  const { id } = req.params;
  const book = await helper.getBookId(id);
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
    await helper.changeBook(newBook);
    res.redirect('/');
  }
});

module.exports = router;
