module.exports = (err, req, res, next) => {
  console.log('ERROR MIDDLEWARE');
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
};
