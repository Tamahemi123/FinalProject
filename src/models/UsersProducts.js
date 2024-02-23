const User = require('./models/User');
const Product = require('./models/Product');

// ব্যবহারকারী ডেটা সিমুলেট
const simulateUserData = async () => {
  const user1 = new User({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
  });

  const user2 = new User({
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: 'password456'
  });

  try {
    await user1.save();
    await user2.save();
    console.log('ব্যবহারকারী ডেটা সিমুলেশন সফলভাবে সংরক্ষিত হয়েছে');
  } catch (error) {
    console.error('ব্যবহারকারী ডেটা সিমুলেশনে সমস্যা হয়েছে:', error.message);
  }
};

// প্রোডাক্ট ডেটা সিমুলেট
const simulateProductData = async () => {
  const product1 = new Product({
    name: 'Laptop',
    brand: 'Dell',
    category: 'Electronics',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://example.com/laptop.jpg'
  });

  const product2 = new Product({
    name: 'Smartphone',
    brand: 'Samsung',
    category: 'Electronics',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://example.com/smartphone.jpg'
  });

  try {
    await product1.save();
    await product2.save();
    console.log('প্রোডাক্ট ডেটা সিমুলেশন সফলভাবে সংরক্ষিত হয়েছে');
  } catch (error) {
    console.error('প্রোডাক্ট ডেটা সিমুলেশনে সমস্যা হয়েছে:', error.message);
  }
};

// ব্যবহারকারী এবং প্রোডাক্ট ডেটা সিমুলেশন চালানো
const simulateData = async () => {
  await simulateUserData();
  await simulateProductData();
};

module.exports = simulateData;
