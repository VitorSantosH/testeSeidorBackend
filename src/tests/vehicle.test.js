// tests/vehicle.test.js
const request = require('supertest');
const app = require('../src/app');

describe('Vehicle CRUD', () => {
  it('should create a vehicle', async () => {
    const res = await request(app).post('/vehicles').send({
      plate: 'ABC-1234',
      color: 'Prata',
      brand: 'Toyota'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });
});