const { Book } = require('../models');
const helper = require('../helper');

/**
 * Хранилище Книг
 */
class Store {
  constructor() {
    this.refreshStore();
  }

  /**
   * Обновить состояние хранилища
   */
  refreshStore() {
    const dbBooks = helper.readBooks();
    this.books = dbBooks.map(
      (b) => new Book(
          b.id,
          b.title,
          b.description,
          b.authors,
          b.favorite,
          b.fileCover,
          b.fileName,
          b.fileBook,
        ),
    );
  }

  /**
   * Геттер списка книг
   * @returns {*} спиоск книг
   */
  getBooks() {
    return this.books;
  }

  /**
   * Получить книги по id
   * @param id ИД книги
   * @returns найденая книга
   */
  getBook(id) {
    return this.books.find((b) => b.id === id);
  }

  /**
   * Записать книгу в хранилище
   * @param book книга
   */
  setBook(book) {
    this.books.push(book);
    helper.writeBooks(this.books);
    this.refreshStore();
  }

  /**
   * Обновить состояние хранилища
   * @param newBook данные для обноления
   * @returns смерженная книга
   */
  updateBook(newBook) {
    const existBook = this.getBook(newBook.id);
    if (!existBook) {
      throw new Error('Такой книги не существует');
    }
    existBook.mergeBooks(newBook);
    helper.writeBooks(this.books);
    this.refreshStore();
    return existBook;
  }

  /**
   * Удалить книгу
   * @param id ИД книги
   */
  deleteBook(id) {
    const ind = this.books.findIndex((b) => b.id === id);
    if (ind === -1) {
      throw new Error('Такой книги не существует');
    }
    this.books.splice(ind, 1);
    helper.writeBooks(this.books);
    this.refreshStore();
  }
}

module.exports = Store;
