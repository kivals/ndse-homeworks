const express = require('express');
const path = require('path');

const router = express.Router();
const Store = require('../../../../common/store');
const { Book } = require('../../../../common/models');
const fileMiddleware = require('../../middleware/file');
const { getFileFromReq } = require('../../utils');

const store = Store.getInstance();

router.get('/', (req, res) => {
  const data = store.getBooks();
  res.json(data);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const book = store.getBook(id);
  if (book) {
    res.json(book);
  } else {
    res.statusCode = 404;
    res.json('Book has not found');
  }
});

router.get('/:id/download', (req, res) => {
  const { id } = req.params;
  const book = store.getBook(id);
  const file = book.fileBook;
  if (file) {
    res.download(path.join(__dirname, '../', 'public/books/', file));
  } else {
    res.statusCode = 404;
    res.json('Book has not found');
  }
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
  res.statusCode = 201;
  res.json(newBook);
});

router.put('/:id', fileMiddleware.single('fileBook'), (req, res) => {
  const { id } = req.params;
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
  try {
    const updatedBook = store.updateBook(newBook);
    res.json(updatedBook);
  } catch (err) {
    res.statusCode = 404;
    res.json('Book has not found');
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  try {
    store.deleteBook(id);
    res.json('OK');
  } catch (err) {
    res.statusCode = 404;
    res.json('Book has not found');
  }
});

module.exports = router;
