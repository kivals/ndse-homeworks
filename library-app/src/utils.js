module.exports = {
  getFileFromReq(req) {
    return req.file ? req.file.filename : '';
  },
};
