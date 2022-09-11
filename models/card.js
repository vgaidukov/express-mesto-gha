const mongoose = require('mongoose');

const { Schema } = mongoose;

const cardSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please feel in'],
    minlength: [2, 'Must be at least 2, got {VALUE}'],
    maxlength: [30, 'Must be not more then 30, got {VALUE}'],
  },
  link: {
    type: String,
    required: [true, 'Please feel in'],
  },
  owner: {
    type: mongoose.ObjectId,
    required: true,
    ref: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  likes: {
    type: [mongoose.ObjectId],
    default: [],
    ref: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('card', cardSchema);
