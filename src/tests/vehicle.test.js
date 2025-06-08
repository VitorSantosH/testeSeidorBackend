const request = require('supertest');
const app = require('../app');

describe('Vehicles API', () => {
  let vehicleId;

  it('should create a vehicle', async () => {
    const res = await request(app).post('/vehicles').send({
      plate: 'ABC-1234',
      color: 'Prata',
      brand: 'Toyota'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id');
    vehicleId = res.body.id;
  });

  it('should get the created vehicle', async () => {
    const res = await request(app).get(`/vehicles/${vehicleId}`);
    expect(res.body.plate).toBe('ABC-1234');
  });

  it('should list vehicles with filter', async () => {
    const res = await request(app).get('/vehicles?color=Prata');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update a vehicle', async () => {
    const res = await request(app).put(`/vehicles/${vehicleId}`).send({ brand: 'Honda' });
    expect(res.body.brand).toBe('Honda');
  });

  it('should delete a vehicle', async () => {
    const res = await request(app).delete(`/vehicles/${vehicleId}`);
    expect(res.statusCode).toBe(204);
  });
});
