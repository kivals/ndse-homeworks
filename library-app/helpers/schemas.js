//Тут список всех схем для проверки в зависимости от роута
const Joi = require('@hapi/joi');

const bookSchema = Joi.object({
  title: Joi.string().alphanum().min(3).max(30).required(),
  description: Joi.string().alphanum(),
  authors: Joi.string().alphanum().min(3).max(30).required(),
  favorite: Joi.boolean(),
  fileCover: Joi.string().alphanum(),
  fileName: Joi.string(),
  fileBook: Joi.string(),
  views: Joi.number(0),
});

module.exports = {
  '/books': bookSchema,
};
// title: {
//   type: String,
//     required: true,
// },
// description: {
//   type: String,
// default: '',
// },
// authors: {
//   type: String,
//     required: true,
// },
// favorite: {
//   type: String,
// default: false,
// },
// fileCover: {
//   type: String,
// },
// fileName: {
//   type: String,
// },
// fileBook: {
//   type: String,
// },
// views: {
//   type: Number,
// default: 0,
// },
