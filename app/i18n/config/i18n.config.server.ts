import type { InitOptions } from 'i18next'
import Backend from 'i18next-fs-backend'
import { resolve } from 'node:path'
import type { RemixI18NextOption } from 'remix-i18next'

import { i18nCookie } from './cookie'

const remixConfig: RemixI18NextOption = {
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

const serverConfig: InitOptions = {
  supportedLngs: remixConfig.detection.supportedLanguages,
  fallbackLng: remixConfig.detection.fallbackLanguage,
  ...remixConfig.i18next,
  react: { useSuspense: false },
}

export const i18nServerConfig = serverConfig
export const i18nRemixConfig = remixConfig
