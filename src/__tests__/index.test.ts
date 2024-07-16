import request from 'supertest';
import { server } from '../index';

afterAll((done) => {
    server.close(done);
  });

describe('GET /api/appointments', () => {
  it('should return all appointments', async () => {
    const res = await request(server).get('/api/appointments');
    expect(res.status).toEqual(200);
  });
});
