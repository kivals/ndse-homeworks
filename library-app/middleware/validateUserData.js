const User = require('../models/User');

module.exports = async (req, res, next) => {
  const { displayName, email, password, repassword } = req.body;
  if (password !== repassword) {
    return next({
      status: 401,
      message: 'Password must be equal repassword',
    });
  }
  try {
    const user = new User({ email, displayName });
    await user.setPassword(password);
    req.user = await user.save({
      email,
      displayName,
    });
    next();
  } catch (e) {
    next(e);
  }
};
