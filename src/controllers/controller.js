const User = require('../models/User');

// লগইন ফাংশন
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'লগইন তথ্য সঠিক নয়' });
    }
    req.session.user = user; // সেশনে ইউজার তথ্য সেট করুন
    res.json({ message: 'লগইন সফল', user });
  } catch (error) {
    console.error('লগইন তথ্য চেক করা যাচ্ছে না:', error.message);
    res.status(500).json({ message: 'একটি সার্ভার সমস্যা হয়েছে' });
  }
};

// প্রোফাইল তথ্য ফেচ ফাংশন
exports.fetchProfile = async (req, res) => {
  const userId = req.session.user._id; // সেশন থেকে ইউজার আইডি ধরে নেওয়া
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'ইউজার খুঁজে পাওয়া যায়নি' });
    }
    res.json(user);
  } catch (error) {
    console.error('প্রোফাইল তথ্য লোড করা যাচ্ছে না:', error.message);
    res.status(500).json({ message: 'একটি সার্ভার সমস্যা হয়েছে' });
  }
};
