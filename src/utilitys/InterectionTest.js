const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./app');

describe('POST /products', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('নতুন পণ্য তৈরি করা যায়', async () => {
    const response = await request(app)
      .post('/products')
      .send({ name: 'টেস্ট পণ্য', price: 10, category: 'টেস্ট', brand: 'টেস্ট' });
    expect(response.statusCode).toBe(201);
  });
});
