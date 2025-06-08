const request = require('supertest');
const app = require('../app');

describe('Drivers API', () => {
  let driverId;

  it('should create a driver', async () => {
    const res = await request(app).post('/drivers').send({ name: 'João' });
    expect(res.statusCode).toBe(200);
    driverId = res.body.id;
  });

  it('should get a driver', async () => {
    const res = await request(app).get(`/drivers/${driverId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('João');
  });

  it('should update driver name', async () => {
    const res = await request(app).put(`/drivers/${driverId}`).send({ name: 'Carlos' });
    expect(res.body.name).toBe('Carlos');
  });

  it('should delete a driver', async () => {
    const res = await request(app).delete(`/drivers/${driverId}`);
    expect(res.statusCode).toBe(204);
  });
});

