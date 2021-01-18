require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const indexRouter = require('./routes');
const booksRouter = require('./routes/book');
const userApiRouter = require('./routes/api/user');
const booksApiRouter = require('./routes/api/book');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use('/api/user', userApiRouter);
app.use('/api/books', booksApiRouter);

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xnn8g.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
    await mongoose.connect(dbUrl);
    app.listen(PORT, () => {
      console.log(`Server library is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
