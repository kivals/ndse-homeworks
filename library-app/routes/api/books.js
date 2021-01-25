const express = require('express');
const book = require('../../controllers/books');
const fileMiddleware = require('../../middleware/file');
const bookRequestValidator = require('../../middleware/bookRequestValidation');

const router = express.Router();

router.get('/', async (req, res, next) => {
  await book.getBooksApi(res, next);
});

router.get('/:id', async (req, res, next) => {
  await book.getBookIdApi(req, res, next);
});

router.post(
  '/',
  bookRequestValidator,
  fileMiddleware.single('fileBook'),
  async (req, res, next) => {
    await book.createBookApi(req, res, next);
  },
);

router.put(
  '/:id',
  bookRequestValidator,
  fileMiddleware.single('fileBook'),
  async (req, res, next) => {
    await book.editBookApi(req, res, next);
  },
);

router.delete('/:id', async (req, res, next) => {
  await book.deleteBookApi(req, res, next);
});
module.exports = router;
