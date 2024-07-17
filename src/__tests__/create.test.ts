import request from 'supertest';
import app from '../index';
import { invalidAppointmentDayMock } from '../mocks/invalidAppointmentDayMock';
import { invalidBirthDateMock, invalidBirthDateMock2 } from '../mocks/invalidBirthDateMock';
import { validAppointmentMock } from '../mocks/validAppointmentMock';
import {repeatedAppointmentMock1, repeatedAppointmentMock2, repeatedAppointmentMock3} from "../mocks/repeatedAppointmentMock";

let server: any;

beforeAll((done) => {
  server = app.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe('Appointment Controller - Create Appointment', () => {
  it('should create a valid appointment', async () => {
    const res = await request(server)
      .post('/api/appointments')
      .send(validAppointmentMock);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  }, 10000);

  it('should not create an appointment with invalid birth date', async () => {
    let res = await request(server)
      .post('/api/appointments')
      .send(invalidBirthDateMock);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');

    res = await request(server)
    .post('/api/appointments')
    .send(invalidBirthDateMock2);
  expect(res.status).toBe(400);
  expect(res.body).toHaveProperty('error');
  }, 10000);

  it('should not create an appointment with invalid appointment day', async () => {
    const res = await request(server)
      .post('/api/appointments')
      .send(invalidAppointmentDayMock);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  }, 10000);

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
  }, 10000);
});