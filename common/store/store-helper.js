const path = require('path');
const Book = require('../models/Book');
const { writeBooks, readBooks } = require('./file-utils');

module.exports = {
  /**
   * Удалить книгу
   * @param id ИД книги
   */
  deleteBook(id) {
    const books = this.getBooks();
    const ind = books.findIndex((b) => b.id === id);
    if (ind === -1) {
      throw new Error('Такой книги не существует');
    }
    books.splice(ind, 1);
    this.writeBooks(books, this.getDbFile());
  },
  /**
   * Обновить состояние книги, если она существует
   * @param newBook данные для обноления
   * @returns смерженная книга
   */
  changeBook(newBook) {
    const books = this.getBooks();
    const existBook = books.find((b) => b.id === newBook.id);
    if (!existBook) {
      throw new Error('Такой книги не существует');
    }
    existBook.mergeBooks(newBook);
    writeBooks(books, this.getDbFile());
    return existBook;
  },
  /**
   * Записать книгу в хранилище
   * @param book книга
   */
  setBook(book) {
    const books = this.getBooks();
    books.push(book);
    writeBooks(books, this.getDbFile());
  },
  /**
   * Загрузить книгу по id
   * @param id ИД книги
   * @returns найденая книга
   */
  getBookId(id) {
    return this.getBooks().find((b) => b.id === id);
  },
  /**
   * Загругить все доступные книги
   * @returns Список книг
   */
  getBooks() {
    return readBooks(this.getDbFile()).map(
      (b) =>
        new Book(
          b.id,
          b.title,
          b.description,
          b.authors,
          b.favorite,
          b.fileCover,
          b.fileName,
          b.fileBook,
          b.views
        )
    );
  },

  /**
   * Получить путь к файловому хранилищу
   * @returns путь к файловому хранилищу
   */
  getDbFile() {
    const dbPath = process.env.DB_PATH || path.join(__dirname, '../../', 'mock-db');
    return path.join(dbPath, 'db.json');
  },
};
