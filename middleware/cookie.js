module.exports = function cookiesCleaner(req, res, next) {
  if (!req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
};
