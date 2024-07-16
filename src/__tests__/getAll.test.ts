import request from 'supertest';
import app from '../index';

let server: any;

beforeAll((done) => {
  server = app.listen(3004, done);
});

afterAll((done) => {
  server.close(done);
});