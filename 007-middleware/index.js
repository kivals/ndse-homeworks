const express = require('express');
const formData = require('express-form-data');
const cors = require('cors');
const { Book } = require('./models');
const Store = require('./store');

const store = new Store();

const app = express();

app.use(formData.parse());
app.use(cors());

app.get('/api/books', (req, res) => {
  const data = store.getBooks();
  res.json(data);
});

app.get('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const book = store.getBook(id);
  if (book) {
    res.json(book);
  } else {
    res.statusCode = 404;
    res.json('Book has not found');
  }
});

app.post('/api/user/login', (req, res) => {
  res.statusCode = 201;
  res.json({ id: 1, mail: 'test@mail.ru' });
});

app.post('/api/books', (req, res) => {
  const { title, description, authors, favorite, fileCover, fileName } = req.body;
  const newBook = new Book(undefined, title, description, authors, favorite, fileCover, fileName);
  store.setBook(newBook);
  res.statusCode = 201;
  res.json(newBook);
});

app.put('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, authors, favorite, fileCover, fileName } = req.body;
  const newBook = new Book(id, title, description, authors, favorite, fileCover, fileName);
  try {
    const updatedBook = store.updateBook(newBook);
    res.json(updatedBook);
  } catch (err) {
    res.statusCode = 404;
    res.json('Book has not found');
  }
});

app.delete('/api/books/:id', (req, res) => {
  const { id } = req.params;
  try {
    store.deleteBook(id);
    res.json('OK');
  } catch (err) {
    res.statusCode = 404;
    res.json('Book has not found');
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
