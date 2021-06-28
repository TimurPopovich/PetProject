const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/users.models');

router.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect('/');
  }

  res.render('login', { layout: false });
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email });

  if (findUser && (await bcrypt.compare(password, findUser.password))) {
    req.session.user = findUser;
    res.json({ status: true});
  } else if (findUser === null) {
    res.json({ status: 'emailFail' });
  } else {
    res.json({ status: 'passFail' });
  }
});

router.put('/', async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  const findUser = await User.findOne({ _id: req.session.user._id });

  const findUserValid = await User.findOne({ email });

  if (findUserValid && findUserValid._id != req.session.user._id) {
    res.send('false');
  } else {
    if (name !== '') {
      findUser.login = name;
    }

    if (email !== '') {
      findUser.email = email;
    }

    if (password !== '') {
      findUser.password = await bcrypt.hash(password, 10);
    }

    req.session.user = findUser;

    await findUser.save();

    res.render('profile', { findUser, layout: false });
  }
});

module.exports = router;
