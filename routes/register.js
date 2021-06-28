const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/users.models');

router.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect('/');
  }

  res.render('register', { layout: false });
});

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const validateEmail = await User.findOne({ email });
  const validateEmailLength = email.length !== 0;
  const validatePass = password.length !== 0;
  const validateName = name.length !== 0;

  if (!validatePass) {
    res.json({ status: 'passFail' });
  } else if (!validateEmailLength) {
    res.json({ status: 'emailLengthFail' });
  } else if (validateEmail) {
    res.json({ status: 'emailFail' });
  } else if (!validateName) {
    res.json({ status: 'nameLengthFail' });
  } else {
    const newUser = new User({
      login: name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    await newUser.save();

    req.session.user = newUser;

    res.status(200).json({ status: true });
  }
});

module.exports = router;
