const uuid = require('uuid-v4');
const Session = require('../models/Session');

exports.loginPage = (req, res, next) => {
  res.render('user/login', {
    title: 'Логин',
    auth: !!req.user,
  });
};
exports.registrationPage = (req, res, next) => {
  res.render('user/registration', {
    title: 'Регистрация',
    auth: !!req.user,
  });
};

exports.login = async (req, res, next) => {
  const token = uuid();
  await Session.create({ token, user: req.user, lastVisit: new Date() });
  res.cookie('authorization', token);
  res.redirect('/');
};

exports.registration = async (req, res, next) => {
  const token = uuid();
  await Session.create({ token, user: req.user, lastVisit: new Date() });
  res.cookie('authorization', token);
  res.redirect('/');
};

exports.profilePage = (req, res) => {
  res.render('user/profile', {
    title: 'Профиль',
    user: req.user,
    auth: !!req.user,
  });
};
