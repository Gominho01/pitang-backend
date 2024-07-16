import request from 'supertest';
import { server } from '../index';
import { invalidAppointmentDayMock } from '../mocks/invalidAppointmentDayMock';
import { invalidBirthDateMock } from '../mocks/invalidBirthDateMock';
import { validAppointmentMock } from '../mocks/validAppointmentMock';
import {repeatedAppointmentMock1, repeatedAppointmentMock2, repeatedAppointmentMock3} from "../mocks/repeatedAppointmentMock";

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

  it('should not create an appointment with invalid appointment day', async () => {
    const res = await request(server)
      .post('/api/appointments')
      .send(invalidAppointmentDayMock);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should not create more than 2 appointments at the same time', async () => {
    await request(server)
      .post('/api/appointments')
      .send(repeatedAppointmentMock1);
    await request(server)
      .post('/api/appointments')
      .send(repeatedAppointmentMock2);
    const res = await request(server)
      .post('/api/appointments')
      .send(repeatedAppointmentMock3);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});