const express = require('express');
const indexController = require('../controllers/index');

const router = express.Router();

router.get('/', async (req, res) => {
  await indexController.index(res);
});

module.exports = router;
