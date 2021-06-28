module.exports = function (app) {
  const express = require('express');
  const path = require('path');
  const session = require('express-session');
  const FileStore = require('session-file-store')(session);
  const cookieParser = require('cookie-parser');
  const morgan = require('morgan');
  const cookieCleaner = require('./cookie');

  app.use(morgan('dev'));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, '..', 'public')));
  app.use(cookieParser());

  app.set('view engine', 'hbs');
  app.set('views', path.join(__dirname, '..', 'views'));

  app.use(session({
    store: new FileStore({ logFn: function () { } }),
    key: 'user_sid',
    secret: 'Beavers',
    resave: true,
    saveUninitialized: false,
    cookie: {
      expires: 1000 * 60 * 60 * 24,
      httpOnly: false,
    },
  }));

  app.use((req, res, next) => {
    if (req.session.user) {
      res.locals.user = req.session.user;
    }
    next();
  });

  app.use(cookieCleaner);
};
