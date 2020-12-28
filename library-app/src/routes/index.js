const express = require('express');

const Store = require('../../../common/store');

const router = express.Router();
const store = Store.getInstance();

router.get('/', (req, res) => {
  const books = store.getBooks();
  res.render('index', {
    title: 'Книги',
    books,
  });
});

module.exports = router;
