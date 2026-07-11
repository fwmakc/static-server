import chalk from 'chalk';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import { compression, shouldCompress } from './server/compression.js';
import { i18nextHandle } from './server/i18next.js';
import ejs from 'ejs';
import routes from './server/routes.js';
import errorHandler from './server/error.js';

dotenv.config();

const server = express();

const isDev = process.env.NODE_ENV === 'dev';
const template = process.env.TEMPLATE || 'view/default';
const port = parseInt(process.env.PORT || '8080', 10);
const message = `${chalk.bold('Server running \n')} in ${chalk.yellow(
  isDev ? 'development' : 'production'
)} mode on ${chalk.yellow(port)} port\n at ${chalk.bold(
  `http://localhost:${port}`
)}`;

if (isDev) {
  server.use(morgan('dev'));
}

server
  .use(compression({ filter: shouldCompress }))
  .use(cors())
  .use(express.json())
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

server.listen(port, () => console.log(message));
