const express = require('express');
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();

// প্রোফাইল পিকচার আপলোড করার জন্য স্টোরেজ সেটআপ
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/profiles');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// multer ইনস্ট্যান্স তৈরি
const upload = multer({ storage: storage });

// POST রিকুয়েস্টের জন্য অ্যাপি এন্ডপয়েন্ট
app.post('/upload', upload.single('profilePicture'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'কোন ফাইল পাওয়া যায়নি' });
  }
  res.status(200).json({ message: 'প্রোফাইল পিকচার সফলভাবে আপলোড হয়েছে', filename: req.file.filename });
});

// মঙ্গোডিবি সার্ভারের সাথে কানেকশন স্থাপন
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('সার্ভারের সাথে সফলভাবে সংযোগ স্থাপন করা হয়েছে'))
  .catch((error) => console.error('সার্ভারের সাথে সংযোগ স্থাপনে সমস্যা হয়েছে:', error));



  // সেশন ম্যানেজমেন্ট
app.use(cookieParser());
app.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // এটি প্রোডাকশনে সেট করতে হবে true
}));

// লগইন এবং লগআউট রাউট
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      req.session.userId = user._id; // ইউজারের সেশনে আইডি সেট করুন
      res.send('লগইন সফল');
    } else {
      res.send('লগইন ব্যর্থ');
    }
  } catch (error) {
    console.error('লগইনে সমস্যা:', error.message);
    res.status(500).send('লগইনে সমস্যা');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('সেশন মুছে ফেলতে সমস্যা:', err.message);
      res.status(500).send('লগআউটে সমস্যা');
    } else {
      res.send('লগআউট সফল');
    }
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`সার্ভার চালু হয়েছে, http://localhost:${PORT}`);
});
