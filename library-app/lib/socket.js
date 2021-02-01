const socketIO = require('socket.io');
const Session = require('../models/Session');
const Comment = require('../models/Comment');

function getAuthToken(cookieString) {
  const authCookie = cookieString
    .split('; ')
    .find((cookie) => cookie.split('=')[0] === 'authorization');

  return authCookie ? authCookie.split('=')[1] : undefined;
}

module.exports.socket = (server) => {
  const io = socketIO(server);

  io.use(async (socket, next) => {
    const token = getAuthToken(socket.handshake.headers.cookie);
    if (!token) return next();
    const session = await Session.findOne({ token }).populate('user');
    if (!session) return next();
    socket.user = session.user;
    return next();
  });

  io.on('connection', (socket) => {
    const { bookId } = socket.handshake.query;
    socket.join(bookId);

    socket.on('message', async (message) => {
      const userName = socket.user ? socket.user.displayName : 'Аноним';
      const commentTime = new Date();
      const newComment = await Comment.create({
        message,
        date: commentTime,
        userName,
        bookId,
      });
      socket.to(bookId).emit('message', {
        message: newComment.message,
        userName: newComment.userName,
        date: newComment.humanDate,
      });
      socket.emit('message', {
        message: newComment.message,
        userName: newComment.userName,
        date: newComment.humanDate,
      });
    });
  });

  return io;
};
