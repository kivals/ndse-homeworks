const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'mock-db/db.json');

module.exports = {
  incrView(id) {
    const views = this.getViews();
    let updatedView = views.find((v) => v.id === id);
    if (updatedView) {
      updatedView.count += 1;
    } else {
      updatedView = { id, count: 1 };
      views.push(updatedView);
    }
    this.writeDbData(views);
    return updatedView;
  },

  getViewById(id) {
    const views = this.getViews();
    let foundView = {};
    if (views.length) {
      foundView = views.find((v) => v.id === id);
    }
    return foundView || {};
  },

  changeView(view) {
    const views = this.getViews();
    const updatedView = views.find((v) => v.id === view.id);
    updatedView.count = view.count;
    this.writeDbData(updatedView);
    return updatedView;
  },

  getViews() {
    const dbData = this.getDbData();
    return dbData.views || {};
  },

  getDbData() {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return data ? JSON.parse(data) : {};
  },
  writeDbData(dataObj) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ views: dataObj }));
  },
};
