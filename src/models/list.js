const express = require('express');
const Product = require('./models/Product');

const app = express();

// পণ্যের লিস্ট ডেটা ফেচ করার রাউট
app.get('/products', async (req, res) => {
  const { page = 1, limit = 10, category, brand, sort, search } = req.query;
  const skip = (page - 1) * limit;
  const query = {};

  if (category) query.category = category;
  if (brand) query.brand = brand;
  if (search) query.name = { $regex: search, $options: 'i' };

  try {
    let products;
    if (sort === 'price_asc') {
      products = await Product.find(query).sort({ price: 1 }).skip(skip).limit(limit);
    } else if (sort === 'price_desc') {
      products = await Product.find(query).sort({ price: -1 }).skip(skip).limit(limit);
    } else {
      products = await Product.find(query).skip(skip).limit(limit);
    }

    res.json(products);
  } catch (error) {
    console.error('পণ্যের তথ্য লোড করা যাচ্ছে না:', error.message);
    res.status(500).send('পণ্যের তথ্য লোড করা যাচ্ছে না');
  }
});

app.listen(3000, () => {
  console.log('সার্ভার চালু হয়েছে');
});
