const validIdLength = 24;

const checkIdValidity = (id) => {
  if (id.length != validIdLength) {
    return false;
  } else {
    return true;
  }
}

module.exports = { checkIdValidity };