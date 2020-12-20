const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    console.log('file.mimeType0');
    cb(null, 'public/books')
  },
  filename(req, file, cb) {
    console.log('file.mimeType2');
    cb(null, `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`)
  }
});

const allowedTypes = ['text/xml', 'application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
};

module.exports = multer({
  storage, fileFilter
});