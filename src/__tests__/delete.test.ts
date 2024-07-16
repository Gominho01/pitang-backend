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
