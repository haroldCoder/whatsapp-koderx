// Importa el módulo necesario de Supertest
const request = require('supertest');
const app = require('../server'); 

describe('ViewMessages endpoint', () => {
  it('should return the correct response', async () => {
    const response = await request(app) 
      .get(`/server/api/messages/1/4`);
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.content)).toBe(true);
    

  });
});