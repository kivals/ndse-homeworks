require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const db = require('./db');
const passport = require('./lib/passport');
const indexRoute = require('./routes/index');
const bookRoute = require('./routes/book');
const bookApiRoute = require('./routes/api/books');
const userApiRoute = require('./routes/api/user');
const errorMiddleware = require('./middleware/error');
const sessionMiddleware = require('./middleware/session');

const app = express();
const PORT = process.env.APP_PORT || 8000;
const VIEWS_DIR = `${__dirname}/views/`;

app.set('views', VIEWS_DIR);
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public/books'));
app.use(cors());
app.use(passport.initialize());
app.use(sessionMiddleware);

app.use('/', indexRoute);
app.use('/books', bookRoute);
app.use('/api/books/', bookApiRoute);
app.use('/api/user/', userApiRoute);
app.use(errorMiddleware);
db.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.info(`Сервер запущен на ${PORT} порту`);
    });
  })
  .catch((e) => {
    console.error(e);
  });
