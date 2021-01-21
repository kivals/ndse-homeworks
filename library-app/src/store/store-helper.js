const path = require('path');
const http = require('../http');
const Book = require('../models/Book');
const { writeBooks, readBooks } = require('./file-utils');

module.exports = {
  /**
   * Удалить книгу
   * @param id ИД книги
   */
  async deleteBook(id) {
    const books = await this.getBooks();
    const ind = books.findIndex((b) => b.id === id);
    if (ind === -1) {
      throw new Error('Такой книги не существует');
    }
    books.splice(ind, 1);
    writeBooks(books, this.getDbFile());
  },
  /**
   * Обновить состояние книги, если она существует
   * @param newBook данные для обноления
   * @returns смерженная книга
   */
  async changeBook(newBook) {
    const books = await this.getBooks();
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
  async setBook(book) {
    const books = await this.getBooks();
    books.push(book);
    writeBooks(books, this.getDbFile());
  },
  /**
   * Загрузить книгу по id
   * @param id ИД книги
   * @returns найденая книга
   */
  async getBookId(id) {
    const books = await this.getBooks();
    const book = books.find((b) => b.id === id);
    try {
      const response = await http.post(`${process.env.COUNTER_URL}/counter/${id}/incr`);
      book.views = response.data;
    } catch (e) {
      book.views = 0;
    }
    return book;
  },
  /**
   * Загругить все доступные книги
   * @returns Promise<void[]> книг
   */
  async getBooks(loadViews = true) {
    const booksObj = readBooks(this.getDbFile());
    return Promise.all(
      booksObj.map(async (b) => {
        const book = new Book(
          b.id,
          b.title,
          b.description,
          b.authors,
          b.favorite,
          b.fileCover,
          b.fileName,
          b.fileBook
        );
        // Получаем просмотры
        if (loadViews) {
          try {
            book.views = await http.get(`${process.env.COUNTER_URL}/counter/${b.id}`);
          } catch (e) {
            book.views = 0;
          }
        }
        return book;
      })
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