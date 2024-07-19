import request from 'supertest';
import app from '../index';
import { validAppointmentMock } from '../mocks/validAppointmentMock';

let server: any;

beforeAll((done) => {
  server = app.listen(3000, done);
});

afterAll((done) => {
  server.close(done);
});

describe('Appointment Routes', () => {
  let createdAppointmentId: string;

  it('GET /appointments should return all appointments', async () => {
    const response = await request(server)
      .get('/api/appointments');
    expect(response.status).toBe(200);
  });

  it('POST /appointments should create a new appointment', async () => {
    const response = await request(server).post('/api/appointments').send(validAppointmentMock);
    expect(response.status).toBe(201);
    createdAppointmentId = response.body.id;
  });

  it('PATCH /appointments/:id should update appointment status', async () => {
    const updatedData = { completed: true, conclusion: 'Completed successfully' };
    const response = await request(server).patch(`/api/appointments/${createdAppointmentId}`).send(updatedData);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updatedData);
  });

  it('DELETE /appointments/:id should delete an appointment', async () => {
    const response = await request(server).delete(`/api/appointments/${createdAppointmentId}`);
    expect(response.status).toBe(200);
    
    const getResponse = await request(server).get('/api/appointments');
    expect(getResponse.body).not.toContainEqual(expect.objectContaining({ id: createdAppointmentId }));
  });
});
