module.exports = {
  makeNotFoundError: () => ({
    status: 404,
    message: 'Document has not been found',
  }),
  checkDocExist: async (mongooseSchema, filter) =>
    !!(await mongooseSchema.findOne(filter)),
};
