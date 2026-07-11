import { Request, Response, NextFunction } from 'express';

export default (
  req: Request,
  res: Response,
  _next: NextFunction,
  layout = 'default'
) => {
  const route = req.route as { path: string } | undefined;
  const inner = '../inner';
  const url = route?.path;
  const path = url && url !== '/' ? url : '/index';
  const page = `${inner}${path}.html`;

  const block = (name: string) => `../blocks/${name}.html`;

  res.render(`layouts/${layout}.html`, {
    block,
    lang: req.t,
    language: req.language,
    page,
    query: req.query,
  });
};
