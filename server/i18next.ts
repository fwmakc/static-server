import { readdirSync } from 'fs';
import dotenv from 'dotenv';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import * as i18nextMiddleware from 'i18next-http-middleware';

dotenv.config();

const i18nDir = './i18n';
const lang = process.env.DEFAULT_LANG || 'en';

function readLangs(dir: string): string[] {
  try {
    return readdirSync(dir, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);
  } catch {
    throw new Error(
      `i18n directory not found: ${dir}. Expected at project root.`
    );
  }
}

function readNamespaces(dir: string): string[] {
  try {
    return readdirSync(dir)
      .filter(f => f.endsWith('.json'))
      .map(f => f.replace(/\.json$/, ''));
  } catch {
    throw new Error(
      `Language directory not found: ${dir}. Check DEFAULT_LANG="${lang}" in .env.`
    );
  }
}

const langs = readLangs(i18nDir);
const langFiles = readNamespaces(`${i18nDir}/${lang}`);

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init(
    {
      backend: {
        loadPath: './i18n/{{lng}}/{{ns}}.json',
      },
      ns: langFiles,
      defaultNS: 'default',
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

export { i18nextHandle };
