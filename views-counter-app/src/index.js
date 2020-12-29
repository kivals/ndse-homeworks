const express = require('express');
const helper = require('../../common/store/store-helper');

const app = express();

app.get('/counter/:bookId', (req, res) => {
  const { bookId } = req.params;
  const book = helper.getBookId(bookId);
  if (book) {
    res.json(book.views || 0);
  } else {
    res.statusCode = 404;
    res.json('Book has not found');
  }
});

app.post('/counter/:bookId/incr', (req, res) => {
  const { bookId } = req.params;
  const book = helper.getBookId(bookId);
  if (book) {
    book.views = book.views ? book.views + 1 : 1;
    const mergedBook = helper.changeBook(book);
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
