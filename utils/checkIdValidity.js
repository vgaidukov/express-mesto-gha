const validIdLength = 24;

const checkIdValidity = (id) => {
  if (id.length !== validIdLength) {
    return false;
  }
  return true;
};

module.exports = { checkIdValidity };
