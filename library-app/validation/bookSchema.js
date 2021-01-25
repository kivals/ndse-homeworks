const Joi = require('@hapi/joi');

const stringField = Joi.string();

module.exports = Joi.object({
  title: Joi.string().alphanum().min(3).max(30).required(),
  authors: Joi.string().required(),
  description: stringField,
  favorite: Joi.boolean(),
  fileCover: stringField,
  fileName: stringField,
  fileBook: stringField,
  views: Joi.number().positive(),
});
