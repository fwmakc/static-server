import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import i18nextMiddleware from 'i18next-http-middleware'

const lang = process.env.LANG || 'en'
const langs = JSON.parse(process.env.LANGS || `["${lang}"]`)

const langFile = process.env.LANG_FILE || 'default'
const langFiles = JSON.parse(process.env.LANG_FILES || `["${langFile}"]`)

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init(
    {
      backend: {
        loadPath: './i18n/{{lng}}/{{ns}}.json'
      },
      ns: langFiles,
      defaultNS: langFile,
      debug: false,
      detection: {
        caches: ['cookie'],
        cookieSameSite: 'strict',
        lookupQuerystring: 'lang',
        lookupCookie: 'i18next',
        order: ['querystring', 'cookie', 'header']
      },
      saveMissing: true,
      fallbackLng: lang,
      preload: langs
    },
    (err) => {
      if (err) return console.error(err)
      console.log('i18next is ready')
    }
  )

const i18nextHandle = i18nextMiddleware.handle(i18next)
const i18nextLang = (key) => i18next.t(key)

export { i18next, i18nextHandle, i18nextLang }
