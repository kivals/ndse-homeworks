const express = require('express');
//const formData = require('express-form-data');
const cors = require('cors');
const bodyParser = require('body-parser');

const { Book } = require('./models');
const Store = require('./store');
const booksRouter = require('./routes/book');
const userRouter = require('./routes/user');

//const store = new Store();
const app = express();

app.use(bodyParser());
app.use(cors());

app.use('/api/user', userRouter);
app.use('/api/books', booksRouter);

// app.post('/api/user/login', (req, res) => {
//   res.statusCode = 201;
//   res.json({ id: 1, mail: 'test@mail.ru' });
// });
//
//

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
