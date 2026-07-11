import { Router } from 'express';
import render from './ejs.js';

const router = Router();

router.route('/').get(render);
router.route('/page').get(render);

router.route('/login').post((_req, res) => {
  res.json({ ok: true, message: 'Login handler stub' });
});

router.route('/contact').post((_req, res) => {
  res.json({ ok: true, message: 'Contact handler stub' });
});

export default router;
