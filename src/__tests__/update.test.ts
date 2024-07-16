import request from 'supertest';
import app from '../index';
import { validAppointmentMock } from '../mocks/validAppointmentMock';

let server: any;

beforeAll((done) => {
  server = app.listen(3002, done);
});

afterAll((done) => {
  server.close(done);
});

describe('Appointment Controller - Update Appointment', () => {
  it('should update the status of an appointment', async () => {

    const createRes = await request(server)
      .post('/api/appointments')
      .send( validAppointmentMock );
    const { id } = createRes.body;

    const updateRes = await request(server)
      .patch(`/api/appointments/${id}`)
      .send({ completed: true, conclusion: 'Done' });
    expect(updateRes.status).toBe(200);
    expect(updateRes.body).toHaveProperty('completed', true);
    expect(updateRes.body).toHaveProperty('conclusion', 'Done');
  }, 10000);
});