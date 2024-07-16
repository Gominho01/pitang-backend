import request from 'supertest';
import { server } from '../index';
import { invalidBirthDateMock } from '../mocks/invalidBirthDateMock';
import { validAppointmentMock } from '../mocks/validAppointmentMock';

afterAll((done) => {
  server.close(done);
});

describe('Appointment Controller - Create Appointment', () => {
  it('should create a valid appointment', async () => {
    const res = await request(server)
      .post('/api/appointments')
      .send(validAppointmentMock);
    console.log(res.body);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should not create an appointment with invalid birth date', async () => {
    const res = await request(server)
      .post('/api/appointments')
      .send(invalidBirthDateMock);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});