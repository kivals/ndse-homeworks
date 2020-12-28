const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

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

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
