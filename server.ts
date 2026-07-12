import chalk from 'chalk';
import dotenv from 'dotenv';
import app from './app.js';
import { i18nextReady } from './server/i18next.js';

dotenv.config();

const port = parseInt(process.env.PORT || '8080', 10);
const host = process.env.HOST || 'localhost';
const isDev = process.env.NODE_ENV !== 'production';
const message = `${chalk.bold('Server running')}\n in ${chalk.yellow(
  isDev ? 'development' : 'production'
)} mode on ${chalk.yellow(port)} port\n at ${chalk.bold(
  `http://${host}:${port}`
)}`;

i18nextReady
  .then(() => {
    const server = app.listen(port, host, () => console.log(message));
    server.on('error', (e: NodeJS.ErrnoException) => {
      if (e.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use`);
      } else {
        console.error(e);
      }
      process.exit(1);
    });
  })
  .catch(err => {
    console.error('Failed to initialize i18next:', err);
    process.exit(1);
  });
