const request = require('supertest');
const app = require('../app');

describe('Usages API', () => {
  let vehicleId, driverId, usageId;

  beforeAll(async () => {
    const vehicle = await request(app).post('/vehicles').send({ plate: 'DEF-5678', color: 'Preto', brand: 'Fiat' });
    vehicleId = vehicle.body.id;

    const driver = await request(app).post('/drivers').send({ name: 'Maria' });
    driverId = driver.body.id;
  });

  it('should start a vehicle usage', async () => {
    const res = await request(app).post('/usages').send({
      vehicleId,
      driverId,
      reason: 'Viagem para cliente'
    });
    expect(res.statusCode).toBe(201);
    usageId = res.body.id;
    expect(res.body.startDate).toBeDefined();
  });

  it('should fail to start another usage with same vehicle', async () => {
    const res = await request(app).post('/usages').send({
      vehicleId,
      driverId,
      reason: 'Tentativa inválida'
    });
    expect(res.statusCode).toBe(400);
  });

  it('should list usages', async () => {
    const res = await request(app).get('/usages');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should finish a usage', async () => {
    const res = await request(app).patch(`/usages/${usageId}/finalizar`);
    expect(res.statusCode).toBe(200);
    expect(res.body.endDate).toBeDefined();
  });
});
