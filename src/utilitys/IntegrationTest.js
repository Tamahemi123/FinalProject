const request = require('supertest');
const app = require('./app');

describe('GET /', () => {
  it('প্রথম পেজের স্ট্যাটাস কোড 200 হতে হবে', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});
