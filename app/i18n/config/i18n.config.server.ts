import type { InitOptions } from 'i18next'
import Backend from 'i18next-fs-backend'
import { resolve } from 'node:path'
import type { RemixI18NextOption } from 'remix-i18next'

import { i18nCookie } from './cookie'

export const i18nRemixConfig: RemixI18NextOption = {
  detection: {
    cookie: i18nCookie,
    supportedLanguages: ['en', 'fi'],
    fallbackLanguage: 'en',
  },
  i18next: {
    defaultNS: 'base',
    backend: {
      loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json'),
    },
  },
  backend: Backend,
}

export const i18nServerConfig: InitOptions = {
  supportedLngs: i18nRemixConfig.detection.supportedLanguages,
  fallbackLng: i18nRemixConfig.detection.fallbackLanguage,
  ...i18nRemixConfig.i18next,
  react: { useSuspense: false },
}
