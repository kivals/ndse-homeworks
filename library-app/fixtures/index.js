const User = require('../models/User');
const Book = require('../models/Book');
const Session = require('../models/Session');
const Comment = require('../models/Comment');
const data = require('./db.json');

(async () => {
  await User.deleteMany();
  await Book.deleteMany();
  await Session.deleteMany();
  await Comment.deleteMany();

  const { books, users } = data;
  const bookPromises = books.map(async (book) => await Book.create(book));
  const usersPromises = users.map(async (user) => {
    const u = new User(user);
    await u.setPassword(user.password);
    await u.save(user);
  });
  await Promise.all(bookPromises);
  await Promise.all(usersPromises);
  console.log(`${books.length} books have been saved in DB`);
  console.log(`${users.length} users have been saved in DB`);
})();
