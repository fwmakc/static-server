import { Router } from 'express';
import render from './ejs.js';

const router = Router();

router.route('/').get(render);
router.route('/page').get(render);

export default router;
