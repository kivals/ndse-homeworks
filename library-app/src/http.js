const axios = require('axios');

module.exports = {
  async get(url) {
    try {
      console.log(`----СТАРТ: axios.get url = ${url}`);
      const res = await axios.get(url);
      console.log('----КОНЕЦ: axios.get');
      return res.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  async post(url) {
    try {
      return axios.post(url);
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
};
