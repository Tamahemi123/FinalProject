// এক্সপ্রেস ইমপোর্ট
const express = require('express');
const session = require('express-session');

// রাউটার ইমপোর্ট
const productRouter = require('./routes/product');

// এপ্লিকেশন ইমপোর্ট
const app = express();

// বডি পারসার মিডলওয়্যার
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// সেশন মিডলওয়্যার
app.use(session({
  secret: 'mySecret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// রাউটার মিডলওয়্যার
app.use('/products', productRouter);

module.exports = app;
