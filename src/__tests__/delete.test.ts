import request from 'supertest';
import app from '../index';
import { validAppointmentMock } from '../mocks/validAppointmentMock';

let server: any;

beforeAll((done) => {
  server = app.listen(3005, done);
});

afterAll((done) => {
  server.close(done);
});

describe('Appointment Controller - Delete Appointment', () => {
  it('should delete an appointment by ID', async () => {
    const createRes = await request(server)
      .post('/api/appointments')
      .send(validAppointmentMock);
    const { id } = createRes.body;

    const deleteRes = await request(server)
      .delete(`/api/appointments/${id}`);
    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body).toHaveProperty('message');
  }, 10000);
});