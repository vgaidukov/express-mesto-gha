const mongoose = require('mongoose');
const validator = require('validator');
const ValidationError = require('../utils/errors/ValidationError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Must be at least 2, got {VALUE}'],
    maxlength: [30, 'Must be not more then 30, got {VALUE}'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Must be at least 2, got {VALUE}'],
    maxlength: [30, 'Must be not more then 30, got {VALUE}'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
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
