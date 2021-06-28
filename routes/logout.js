const router = require('express').Router();

router.get('/', async (req, res) => {
  if (req.session.user) {
    await req.session.destroy();
    res.clearCookie('user-sid');
    res.redirect('/');
  } else {
    res.redirect('/');
  }
});

module.exports = router;
