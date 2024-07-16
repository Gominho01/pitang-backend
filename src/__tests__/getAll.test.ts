import request from 'supertest';
import app from '../index';
import { validAppointmentMock } from '../mocks/validAppointmentMock';

let server: any;

beforeAll((done) => {
  server = app.listen(3004, done);
});

afterAll((done) => {
  server.close(done);
});

describe('Appointment Controller - Get All Appointments', () => {
  it('should return all appointments', async () => {
    await request(server)
      .post('/api/appointments')
      .send(validAppointmentMock);

    const res = await request(server)
      .get('/api/appointments');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0); 
    expect(res.body[0]).toHaveProperty('name', validAppointmentMock.name);
  }, 10000);
});