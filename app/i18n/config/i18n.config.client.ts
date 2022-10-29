import type { InitOptions } from 'i18next'
import { getInitialNamespaces } from 'remix-i18next'

export const i18nClientConfig: InitOptions = {
  react: { useSuspense: false },
  defaultNS: 'base',
  fallbackLng: 'en',
  ns: getInitialNamespaces(),
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
    requestOptions: {
      cache: 'no-store',
    },
  },
  detection: {
    order: ['htmlTag'],
    caches: [],
  },
  // debug: process.env.NODE_ENV === 'development',
}
