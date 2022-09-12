const mongoose = require('mongoose');
const validator = require('validator');
const ValidationError = require('../utils/errors/ValidationError');

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
  email: {
    type: String,
    validate: {
      validator: (v) => {
        if (!validator.isEmail(v)) {
          throw new ValidationError();
        }
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
    required: [true, 'Please feel in'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please feel in'],
    minlength: [8, 'Must be at least 8, got {VALUE}'],
  },
});

module.exports = mongoose.model('user', userSchema);
