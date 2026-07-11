import { ErrorRequestHandler } from 'express';

const isDev = process.env.NODE_ENV !== 'production';

const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  res.locals.message = err.message;
  res.locals.error = isDev ? err : {};
  res.locals.language = req.language;
  res.locals.lang = req.t;

  const status = err.status || err.statusCode || 500;

  res.status(status).render('error', (renderErr: Error | null, html: string) => {
    if (renderErr) {
      res.type('text/html').send(`<h1>${err.message}</h1>`);
      return;
    }
    res.send(html);
  });
};

export default errorHandler;
