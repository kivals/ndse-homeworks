module.exports = (req, res, next) => {
  if (!req.user) {
    res.redirect('/api/user/login');
  } else {
    next();
  }
};
