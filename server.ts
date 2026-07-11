import chalk from 'chalk';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const port = parseInt(process.env.PORT || '8080', 10);
const isDev = process.env.NODE_ENV === 'dev';
const message = `${chalk.bold('Server running \n')} in ${chalk.yellow(
  isDev ? 'development' : 'production'
)} mode on ${chalk.yellow(port)} port\n at ${chalk.bold(
  `http://localhost:${port}`
)}`;

app.listen(port, () => console.log(message));
