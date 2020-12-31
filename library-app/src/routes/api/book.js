const express = require('express');
const path = require('path');

const router = express.Router();
const { Book } = require('../../models');
const fileMiddleware = require('../../middleware/file');
const helper = require('../../store/store-helper');
const { getFileFromReq } = require('../../utils');

router.get('/', async (req, res) => {
  const data = await helper.getBooks();
  res.json(data);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const book = await helper.getBookId(id);
  if (book) {
    res.json(book);
  } else {
    res.statusCode = 404;
    res.json('Book has not found');
  }
});

router.get('/:id/download', async (req, res) => {
  const { id } = req.params;
  const book = await helper.getBookId(id);
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
  helper.setBook(newBook);
  res.statusCode = 201;
  res.json(newBook);
});

router.put('/:id', fileMiddleware.single('fileBook'), async (req, res) => {
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
    const updatedBook = await helper.changeBook(newBook);
    res.json(updatedBook);
  } catch (err) {
    res.statusCode = 404;
    res.json('Book has not found');
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await helper.deleteBook(id);
    res.json('OK');
  } catch (err) {
    res.statusCode = 404;
    res.json('Book has not found');
  }
});

module.exports = router;
