const { Schema, model, Types } = require('mongoose');

const sessionSchema = new Schema({
  token: {
    type: String,
    unique: true,
    required: true,
  },
  lastVisit: {
    type: Date,
    required: true,
  },
  user: {
    type: Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

sessionSchema.path('lastVisit').index({ expires: '7d' });

module.exports = model('Session', sessionSchema);
