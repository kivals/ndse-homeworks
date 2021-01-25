const _ = require('lodash');
const bookSchema = require('../validation/bookSchema');

module.exports = async (req, res, next) => {
  const validationOptions = {
    abortEarly: false, // abort after the last validation error
    allowUnknown: true, // allow unknown keys that will be ignored
    stripUnknown: true, // remove unknown keys from the validated data
  };
  // enabled HTTP methods for request data validation
  const supportedMethods = ['post'];
  try {
    const method = req.method.toLowerCase();
    if (supportedMethods.includes(method)) {
      req.body = await bookSchema.validateAsync(req.body, validationOptions);
    }
    next();
  } catch (error) {
    const customError = {
      status: 'failed',
      error: {
        original: error._object,

        details: _.map(error.details, ({ message, type }) => ({
          message: message.replace(/['"]/g, ''),
          type,
        })),
      },
    };
    res.status(422).json(customError);
  }
};
