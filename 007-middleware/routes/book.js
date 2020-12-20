const express = require('express');
const router = express.Router();
const Store = require('../store');
const { Book } = require('../models');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const fileMiddleware = require('../middleware/file');

const store = new Store();

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

router.post('/', fileMiddleware.single('fileBook'), (req, res) => {
  const { title, description, authors, favorite, fileCover, fileName } = req.body;
  console.log(req.file);
  const newBook = new Book(undefined, title, description, authors, favorite, fileCover, fileName);
  store.setBook(newBook);
  res.statusCode = 201;
  res.json(newBook);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, authors, favorite, fileCover, fileName } = req.body;
  const newBook = new Book(id, title, description, authors, favorite, fileCover, fileName);
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