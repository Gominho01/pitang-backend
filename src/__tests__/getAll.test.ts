import request from 'supertest';
import app from '../index';

let server: any;

beforeAll((done) => {
  server = app.listen(3004, done);
});

afterAll((done) => {
  server.close(done);
});

describe('Appointment Controller - Get All Appointments', () => {
  it('should return all appointments', async () => {
    const res = await request(server)
      .get('/api/appointments');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }, 10000);
});