const express = require('express');
const Store = require('../../common/store');

const app = express();
const store = new Store();

app.get('/counter/:bookId', (req, res) => {
  const { bookId } = req.params;
  const book = store.getBook(bookId);
  if (book) {
    res.json(book.views || 0);
  } else {
    res.statusCode = 404;
    res.json('Book has not found');
  }
});

app.post('/counter/:bookId/incr', (req, res) => {
  const { bookId } = req.params;
  const book = store.getBook(bookId);
  if (book) {
    book.views = book.views ? book.views + 1 : 1;
    const mergedBook = store.updateBook(book);
    res.json(mergedBook.views);
  } else {
    res.statusCode = 404;
    res.json('Book has not found');
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server-counter is running on port ${PORT}`);
});
