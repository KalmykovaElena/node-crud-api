import request from 'supertest';
import fs from 'fs';

const req = request('http://localhost:4000');
const user = {
  username: 'An',
  age: 15,
  hobbies: ['3']
};

describe('GET /', () => {
  beforeEach(() => {
    fs.writeFileSync('db.json', '[] ');
  });
  it('should return a 200 status code and empty array ', async () => {
    const response = await req.get('/api/users');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
  it('should return 404 status code GET /nonexistent', async () => {
    const response = await req.get('/nonexistent');
    expect(response.statusCode).toBe(404);
  });
  it('should return the created record by its id', async () => {
    const response = await req.post('/api/users').send(user);
    const userId = response.body.id;
    const response2 = await req.get(`/api/users/${userId}`);
    expect(response2.body).toEqual(response.body);
  });
});

describe('PUT and DELETE', () => {
  let userId: number;
  beforeEach(async () => {
    const response = await req.post('/api/users').send(user);
    userId = response.body.id;
  });

  it('should update and return the user', async () => {
    const response = await req.put(`/api/users/${userId}`).send({
      username: 'Jane',
      age: 20,
      hobbies: []
    });

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('id', userId);
    expect(response.body).toHaveProperty('username', 'Jane');
    expect(response.body).toHaveProperty('age', 20);
  });
  it('should delete the user', async () => {
    const response = await req.delete(`/api/users/${userId}`);
    expect(response.status).toEqual(204);
    const getUserResponse = await req.get(`/api/users/${userId}`);
    expect(getUserResponse.status).toEqual(404);
  });
});
