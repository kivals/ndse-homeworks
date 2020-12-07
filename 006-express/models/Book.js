const uidGenerator = require('node-unique-id-generator');

/**
 * Модель "Книга"
 */
class Book {
  constructor(id, title, description, authors, favorite, fileCover, fileName) {
    if (!id) {
      this.id = uidGenerator.generateUniqueId();
    } else {
      this.id = id;
    }
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
  }

  // TODO Как это сделать более красиво ???
  mergeBooks(book) {
    if (book.id) {
      this.id = book.id;
    }
    if (book.title) {
      this.title = book.title;
    }
    if (book.description) {
      this.description = book.description;
    }
    if (book.authors) {
      this.authors = book.authors;
    }
    if (book.favorite) {
      this.favorite = book.favorite;
    }
    if (book.fileCover) {
      this.fileCover = book.fileCover;
    }
    if (book.fileName) {
      this.fileName = book.fileName;
    }
  }
}

module.exports = Book;
