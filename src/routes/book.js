const express = require('express');

const router = express.Router();
const Store = require('../store');
const { Book } = require('../models');

const store = new Store();

router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
