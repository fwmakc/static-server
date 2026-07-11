import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app.js';

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
    expect(res.text).toContain('Error');
  });

  it('GET /css/main.css should serve static CSS', async () => {
    const res = await request(app).get('/css/main.css');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('css');
  });
});
