import type { EntryContext } from '@remix-run/node'
import { createInstance } from 'i18next'
import FsBackend from 'i18next-fs-backend'
import { initReactI18next } from 'react-i18next'
import { RemixI18Next } from 'remix-i18next'

import { i18nRemixConfig, i18nServerConfig } from './config/i18n.config.server'

export const i18nRemix = new RemixI18Next(i18nRemixConfig)

export async function i18nInterceptor(request: Request, context: EntryContext) {
  let i18n = createInstance()

  const language = await getLocale(request)

  const namespace = i18nRemix.getRouteNamespaces(context)

  await i18n
    .use(initReactI18next)
    .use(FsBackend)
    .init({
      ...i18nServerConfig,
      lng: language,
      ns: namespace,
    })

  return i18n
}

export const getLocale = (request: Request) => i18nRemix.getLocale(request)
