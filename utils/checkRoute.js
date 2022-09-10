const checkRoute = (err, req, res, next) => {
  console.log(1000);
  next(err);
}

module.exports = { checkRoute };