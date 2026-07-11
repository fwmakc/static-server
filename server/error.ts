import { ErrorRequestHandler } from 'express';

const isDev = process.env.NODE_ENV !== 'production';

const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  res.locals.message = err.message;
  res.locals.error = isDev ? err : {};
  res.locals.language = req.language;
  res.locals.lang = req.t;

  res.status(err.status || 500);
  res.render('error');
};

export default errorHandler;
