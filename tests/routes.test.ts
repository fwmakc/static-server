import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import { i18nextReady } from '../server/i18next.js';

beforeAll(async () => {
  await i18nextReady;
});

describe('Routes', () => {
  it('GET / should return 200 and render landing page', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toContain('hero__title');
    expect(res.text).toContain('features__grid');
    expect(res.text).toContain('contact__form');
  });

  it('GET /page should return 200', async () => {
    const res = await request(app).get('/page');
    expect(res.status).toBe(200);
  });

  it('GET /nonexistent should return 404', async () => {
    const res = await request(app).get('/nonexistent');
    expect(res.status).toBe(404);
    expect(res.text).toContain('error');
  });

  it('GET /css/main.css should serve static CSS', async () => {
    const res = await request(app).get('/css/main.css');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('css');
  });

  it('POST /login should return 200 and JSON', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'test', password: 'test' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('ok', true);
  });

  it('POST /contact should return 200 and JSON', async () => {
    const res = await request(app)
      .post('/contact')
      .send({ name: 'test', email: 'test@test.com', message: 'hello' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('ok', true);
  });
});
