const axios = require('axios');

module.exports = {
  async get(url) {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (e) {
      console.error(e);
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
