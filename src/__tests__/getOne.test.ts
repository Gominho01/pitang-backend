import request from 'supertest';
import app from '../index';
import { validAppointmentMock } from '../mocks/validAppointmentMock';

let server: any;

beforeAll((done) => {
  server = app.listen(3003, done);
});

afterAll((done) => {
  server.close(done);
});

describe('Appointment Controller - Get One Appointment', () => {
  it('should get a specific appointment by ID', async () => {
    const createRes = await request(server)
      .post('/api/appointments')
      .send(validAppointmentMock);
    const { id } = createRes.body;

    const res = await request(server)
      .get(`/api/appointments/${id}`);

    expect(res.body).toHaveProperty('id', id);
    expect(res.body.name).toBe(validAppointmentMock.name); 
  }, 10000);
});