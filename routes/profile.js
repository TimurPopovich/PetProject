const router = require('express').Router();
const User = require('../models/users.models');

router.get('/', async (req, res) => {
  if (req.session.user) {
    const findUser = await User.findOne({ _id: req.session.user._id });

    if (findUser.interes.length !== 0) {

      const interes = findUser.interes.flat();

      console.log(interes);

      res.render('profile', { findUser, interes });

    } else {

      res.render('profile', { findUser });

    }

  } else {
    res.redirect('/');
  }
});

router.get('/add', (req, res) => {
  res.render('editProfile', { layout: false });
});

router.post('/card', async (req, res) => {

  const { rep } = req.body;

  const findUser = await User.findOne({ _id: req.session.user._id })
  console.log(rep);
  const findClone = findUser.interes.filter(el => el.url === rep.url);

  if (findClone.length !== 0) {
    res.json({ status: 'fail' })
  } else {

    findUser.interes.push(rep);

    await findUser.save();
  }
})

router.delete('/card', async (req, res) => {

  const { rep } = req.body;

  const findUser = await User.findOne({ _id: req.session.user._id })

  const index = findUser.interes.filter(el => el.url === rep);

  const indexArr = findUser.interes.indexOf(index[0])

  findUser.interes.splice(indexArr, 1)

  await findUser.save();

  res.json({ status: true })
})

module.exports = router;
