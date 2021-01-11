const express = require('express');
const fileUtils = require('./file-utils');

const app = express();

app.get('/counter/:bookId', (req, res) => {
  const { bookId } = req.params;
  const bookView = fileUtils.getViewById(bookId);
  if (bookView) {
    res.json(bookView.count);
  } else {
    res.statusCode = 404;
    res.json('There are not any information about views');
  }
});

app.post('/counter/:bookId/incr', (req, res) => {
  const { bookId } = req.params;
  const updatedView = fileUtils.incrView(bookId);
  if (updatedView) {
    res.json(updatedView.count);
  } else {
    res.statusCode = 404;
    res.json('There are not any information about views');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server-counter is running on port ${PORT}`);
});
