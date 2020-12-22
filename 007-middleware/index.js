const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const booksRouter = require('./routes/book');
const userRouter = require('./routes/user');

const app = express();

app.use(bodyParser());
app.use(cors());

app.use('/api/user', userRouter);
app.use('/api/books', booksRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
