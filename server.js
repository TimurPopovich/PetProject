const express = require('express');
const { connect } = require('mongoose');

const mainRouter = require('./routes/main');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const profileRouter = require('./routes/profile');

const middleWare = require('./middleware');

const app = express();

const port = process.env.PORT || 3000;

middleWare(app);

app.use('/', mainRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/profile', profileRouter);

app.listen(port, () => {
  console.log(`Server started at ${port}`);

  connect('mongodb://localhost:27017/PotluckParty', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }),

    console.log('Data Base Connected');
});
