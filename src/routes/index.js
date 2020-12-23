const express = require('express');

const Store = require('../store');
const { Book } = require('../models');

const router = express.Router();
const store = new Store();

router.get('/', (req, res) => {
  const books = store.getBooks();
  res.render('index', {
    title: 'Книги',
    books,
  });
});

module.exports = router;
