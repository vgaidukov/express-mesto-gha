const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please feel in'],
    minlength: [2, 'Must be at least 2, got {VALUE}'],
    maxlength: [30, 'Must be not more then 30, got {VALUE}'],
  },
  about: {
    type: String,
    required: [true, 'Please feel in'],
    minlength: [2, 'Must be at least 2, got {VALUE}'],
    maxlength: [30, 'Must be not more then 30, got {VALUE}'],
  },
  avatar: {
    type: String,
    required: [true, 'Please feel in'],
  },
});

module.exports = mongoose.model('user', userSchema);
