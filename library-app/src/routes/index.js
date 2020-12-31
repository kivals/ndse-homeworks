const express = require('express');
const helper = require('../store/store-helper');

const router = express.Router();

/**
 * Получить все книги
 */
router.get('/', async (req, res) => {
  console.log('СТАРТ: Общий запрос GetBooks');
  const books = await helper.getBooks();
  console.log('КОНЕЦ: Общий запрос GetBooks');
  res.render('index', {
    title: 'Книги',
    books,
  });
});

module.exports = router;
