import request from 'supertest';
import app from '../index';
import { invalidAppointmentDayMock } from '../mocks/invalidAppointmentDayMock';
import { invalidBirthDateMock, invalidBirthDateMock2 } from '../mocks/invalidBirthDateMock';
import { validAppointmentMock } from '../mocks/validAppointmentMock';
import { repeatedAppointmentMock1, repeatedAppointmentMock2, repeatedAppointmentMock3 } from "../mocks/repeatedAppointmentMock";
import { invalidTimeMock1, invalidTimeMock2, invalidTimeMock3, invalidTimeMock4 } from "../mocks/invalidHourMock";
import { generateMocks } from '../mocks/generateMock';

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
    expect(res.body).toHaveProperty('error', 'Este horário já está totalmente ocupado');
  }, 10000);

  it('should not create an appointment with invalid time', async () => {
    let res = await request(server)
      .post('/api/appointments')
      .send(invalidTimeMock1);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Somente horários fechados (ex: 11:00, 12:00, etc)');

    res = await request(server)
      .post('/api/appointments')
      .send(invalidTimeMock2);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Somente horários fechados (ex: 11:00, 12:00, etc)');

    res = await request(server)
      .post('/api/appointments')
      .send(invalidTimeMock3);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Somente horários fechados (ex: 11:00, 12:00, etc)');

    res = await request(server)
      .post('/api/appointments')
      .send(invalidTimeMock4);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Os agendamentos só podem ser marcados entre 9h e 20h');
  }, 10000);

  it('should not create more than the maximum allowed appointments on the same day', async () => {
    for (let i = 0; i < 20; i++) {
      await request(server)
        .post('/api/appointments')
        .send(generateMocks[i]);
    }

    const res = await request(server)
      .post('/api/appointments')
      .send({
        name: 'Extra User',
        birthDate: '1991-01-21',
        appointmentDay: "2025-07-19T22:00:00.000Z",
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Número máximo de agendamentos para este dia atingido');
  }, 20000);
});
