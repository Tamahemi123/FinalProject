const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// সকল প্রোডাক্ট লিস্ট ফেচ করা
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// নতুন প্রোডাক্ট তৈরি করা
router.post('/products', async (req, res) => {
  const product = new Product({
    date: req.body.date,
    brand: req.body.brand,
    description: req.body.description,
    image: req.body.image
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;





// প্রোডাক্ট খোঁজ করার জন্য এপিআই তৈরি
router.get('/products/search', async (req, res) => {
  const query = req.query.q; // খোঁজ স্ট্রিং

  try {
    const products = await Product.find({
      $or: [
        { brand: { $regex: query, $options: 'i' } }, // ব্র্যান্ড সম্পর্কিত খোঁজ
        { description: { $regex: query, $options: 'i' } } // বিবরণ সম্পর্কিত খোঁজ
      ]
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
