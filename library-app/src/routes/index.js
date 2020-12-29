const express = require('express');

const helper = require('../../../common/store/store-helper');

const router = express.Router();

router.get('/', (req, res) => {
  const books = helper.getBooks();
  res.render('index', {
    title: 'Книги',
    books,
  });
});

module.exports = router;
