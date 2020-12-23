const express = require('express');

const router = express.Router();
const Store = require('../store');

const store = new Store();

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const book = store.getBook(id);
  res.render('books/index', {
    title: 'Книги',
    book,
  });
});

module.exports = router;
