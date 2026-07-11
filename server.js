import chalk from 'chalk'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import createError from 'http-errors'
import express from 'express'
import { compression, shouldCompress } from '#server/compression'
import { i18nextHandle, i18nextLang } from '#server/i18next'
import ejs from 'ejs'
import routes from '#server/routes'
import errorHandler from '#server/error'

dotenv.config()

const server = express()

const isDev = process.env.NODE_ENV === 'dev'
const template = process.env.TEMPLATE || 'view/default'
const port = process.env.PORT || 8080
const message = `${chalk.bold('Server running \n')} in ${
  chalk.yellow(isDev ? 'development' : 'production')
} mode on ${chalk.yellow(port)} port\n at ${chalk.bold(`http://localhost:${port}`)}`

if (isDev) server.use(morgan('dev'))

server
  .use(compression({ filter: shouldCompress }))
  .use(cors())
  .use(express.json())
  .use(i18nextHandle)
  .use('', routes)
  .use(express.static('./static'))

  // set template engine
  .set('views', `./${template}/`)
  .set('view engine', 'html')
  .engine('html', ejs.__express)

  // catch 404 and forward to error handler
  .use((req, res, next) => {
    next(createError(404))
  })

  // error handler is last middleware
  .use(errorHandler)

// lang as local server function
server.locals.lang = i18nextLang

server.listen(port, console.log(message))
