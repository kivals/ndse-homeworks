const Session = require('../models/Session');

module.exports = async (req, res, next) => {
  const token = req.cookies.authorization;
  if (!token) return next();
  const session = await Session.findOne({ token }).populate('user');
  if (!session) {
    next({
      status: 401,
      message: 'Неверный аутентификационный токен',
    });
  } else {
    session.lastVisit = new Date();
    await session.save();
    req.user = session.user;
    next();
  }
};
