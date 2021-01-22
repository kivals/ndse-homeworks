const express = require('express');
const book = require('../../controllers/books');
const fileMiddleware = require('../../middleware/file');

const router = express.Router();

router.get('/', async (req, res) => {
  await book.getBooksApi(res);
});

router.get('/:id', async (req, res) => {
  await book.getBookIdApi(req, res);
});

router.post('/', fileMiddleware.single('fileBook'), async (req, res) => {
  await book.createBookApi(req, res);
});

router.put('/:id', fileMiddleware.single('fileBook'), async (req, res) => {
  await book.editBookApi(req, res);
});

router.delete('/:id', async (req, res) => {
  await book.deleteBookApi(req, res);
});
module.exports = router;
