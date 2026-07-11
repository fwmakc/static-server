const isDev = process.env.NODE_ENV === 'dev'

export default (err, req, res, _next) => {
  res.locals.message = err.message
  res.locals.error = isDev ? err : {}
  res.locals.language = req.language

  res.status(err.status || 500)
  res.render('error')
}
