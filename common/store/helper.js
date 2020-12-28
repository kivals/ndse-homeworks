const fs = require('fs');
const path = require('path');

module.exports = {
  /**
   * Считать список книг из файла
   * @returns JSON объект списка книг
   */
  readBooks() {
    console.log(__dirname);
    const file = path.join(__dirname, '../../', 'mock-db', 'db.json');
    const data = fs.readFileSync(file, 'utf-8');
    return JSON.parse(data).books;
  },
  /**
   * Записать книги в файл
   * @param books список книг
   */
  writeBooks(books) {
    const file = path.join(__dirname, '../../', 'mock-db', 'db.json');
    fs.writeFileSync(file, JSON.stringify({ books }));
  },
};
