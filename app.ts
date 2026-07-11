import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import { compression, shouldCompress } from './server/compression.js';
import { i18nextHandle } from './server/i18next.js';
import ejs from 'ejs';
import routes from './server/routes.js';
import errorHandler from './server/error.js';

const app = express();

const isDev = process.env.NODE_ENV !== 'production';
const template = process.env.TEMPLATE || 'view/default';

if (isDev) {
  app.use(morgan('dev'));
}

app
  .use(helmet())
  .use(compression({ filter: shouldCompress }))
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(i18nextHandle)
  .use('', routes)
  .use(express.static('./static'))
  .set('views', `./${template}/`)
  .set('view engine', 'html')
  .engine('html', ejs.renderFile)
  .use((_req: Request, _res: Response, next: NextFunction) => {
    next(createError(404));
  })
  .use(errorHandler);

export default app;
