require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const db = require('./db');
const indexRoute = require('./routes/index');
const bookRoute = require('./routes/book');

const app = express();
console.log(`SET PORT = ${process.env.APP_PORT}`);
const PORT = process.env.APP_PORT || 8000;
const VIEWS_DIR = `${__dirname}/views/`;

app.set('views', VIEWS_DIR);
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', indexRoute);
app.use('/books', bookRoute);
app.use(cors());
app.use(express.static('public/books'));

db.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Сервер запущен на ${PORT} порту`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
