export default (req, res, next, layout = 'default') => {
  const { route, query } = req
  const inner = '../inner'
  const url = route?.path
  const path = url && url !== '/' ? url : '/index'
  const page = `${inner}${path}.html`

  const block = (block) => `../blocks/${block}.html`

  res.render(`layouts/${layout}.html`, {
    block,
    language: req.language,
    page,
    query
  })
}
