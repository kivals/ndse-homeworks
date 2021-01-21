const express = require('express');

const router = express.Router();
const book = require('../controllers/books');
const fileMiddleware = require('../middleware/file');

router.get('/create', (req, res) => {
  book.newBook(req, res);
});

router.post('/create', fileMiddleware.single('fileBook'), async (req, res) => {
  await book.createBook(req, res);
});

router.get('/:id', async (req, res) => {
  await book.getBookId(req, res);
});

router.get('/update/:id', async (req, res) => {
  await book.getEditBook(req, res);
});

router.post('/update/:id', async (req, res) => {
  await book.editBook(req, res);
  res.redirect('/');
});

router.get('/delete/:id', async (req, res) => {
  await book.deleteBook(req, res);
  res.redirect('/');
});

module.exports = router;
