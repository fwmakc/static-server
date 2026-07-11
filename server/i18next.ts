import dotenv from 'dotenv';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import * as i18nextMiddleware from 'i18next-http-middleware';

dotenv.config();

const lang = process.env.LANG || 'en';
const langs: string[] = JSON.parse(process.env.LANGS || `["${lang}"]`);

const langFile = process.env.LANG_FILE || 'default';
const langFiles: string[] = JSON.parse(
  process.env.LANG_FILES || `["${langFile}"]`
);

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init(
    {
      backend: {
        loadPath: './i18n/{{lng}}/{{ns}}.json',
      },
      ns: langFiles,
      defaultNS: langFile,
      debug: false,
      detection: {
        caches: ['cookie'],
        cookieSameSite: 'strict',
        lookupQuerystring: 'lang',
        lookupCookie: 'i18next',
        order: ['querystring', 'cookie', 'header'],
      },
      saveMissing: false,
      fallbackLng: lang,
      preload: langs,
    },
    err => {
      if (err) {
        return console.error(err);
      }
      console.log('i18next is ready');
    }
  );

const i18nextHandle = i18nextMiddleware.handle(
  i18next as unknown as Parameters<typeof i18nextMiddleware.handle>[0]
);

export { i18next, i18nextHandle };
