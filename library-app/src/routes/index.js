const express = require('express');
const helper = require('../store/store-helper');

const router = express.Router();

/**
 * Получить все книги
 */
router.get('/', async (req, res) => {
  const books = await helper.getBooks();
  res.render('index', {
    title: 'Книги',
    books,
  });
});

module.exports = router;
