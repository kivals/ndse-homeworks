const express = require('express');
const passport = require('../../lib/passport');
const validateUserData = require('../../middleware/validateUserData');

const router = express.Router();
const user = require('../../controllers/user');
const mustBeAuthenticated = require('../../middleware/mustBeAuthticated');

router.get('/login', async (req, res, next) => {
  await user.loginPage(req, res, next);
});

router.get('/registration', async (req, res, next) => {
  await user.registrationPage(req, res, next);
});

router.post('/registration', validateUserData, async (req, res, next) => {
  await user.registration(req, res, next);
});

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/api/user/login',
    session: false,
  }),
  async (req, res) => {
    await user.login(req, res);
  },
);

router.get('/me', mustBeAuthenticated, (req, res) => {
  user.profilePage(req, res);
});

module.exports = router;
