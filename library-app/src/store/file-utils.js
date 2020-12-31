const fs = require('fs');

module.exports = {
  readBooks(filePath) {
    const data = fs.readFileSync(filePath, 'utf-8');
    return data ? JSON.parse(data).books : [];
  },
  /**
   * Записать книги в файл
   * @param books список книг
   * @param filePath
   */
  writeBooks(books, filePath) {
    fs.writeFileSync(filePath, JSON.stringify({ books }));
  },
};
