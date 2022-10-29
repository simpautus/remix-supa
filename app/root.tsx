import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import { i18nCookie } from '~/i18n/config/cookie'
import { getLocale, i18nRemix } from '~/i18n/i18n.server'
import type { WindowEnvironment } from '~/utils/env.server'
import { windowEnv } from '~/utils/env.server'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { useChangeLanguage } from 'remix-i18next'

import styles from './styles/app.css'
import type { Theme } from './utils/theme-provider'
import {
  ThemeBody,
  ThemeHead,
  ThemeProvider,
  useTheme,
} from './utils/theme-provider'
import { getThemeSession } from './utils/theme.server'

type LoaderData = {
  locale: string
  title: string
  ssrTheme: Theme | null
  windowEnv: WindowEnvironment
}

export const loader: LoaderFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request)
  const locale = await getLocale(request)
  const translate = await i18nRemix.getFixedT(request, 'base')
  const title = translate('meta.title')

  const headers = new Headers()
  headers.set('Set-Cookie', await i18nCookie.serialize(locale))

  return json(
    { locale, title, ssrTheme: themeSession.getTheme(), windowEnv },
    { headers }
  )
}

export const meta: MetaFunction = ({ data }) => ({
  charset: 'utf-8',
  title: data.title,
  viewport: 'width=device-width,initial-scale=1',
})

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

export const handle = {
  i18n: 'base',
}

function App() {
  const { locale, ssrTheme, windowEnv } = useLoaderData<LoaderData>()
  const { i18n } = useTranslation()
  const [theme] = useTheme()

  useChangeLanguage(locale)

  return (
    <html
      lang={locale}
      dir={i18n.dir()}
      className={classNames(theme, 'h-full')}
    >
      <head>
        <Meta />
        <Links />
        <ThemeHead ssrTheme={Boolean(ssrTheme)} />
      </head>
      <body className='h-full bg-gray-50 dark:bg-gray-900'>
        <Outlet />
        <ThemeBody ssrTheme={Boolean(ssrTheme)} />
        <ScrollRestoration />
        <LiveReload />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.env = ${JSON.stringify(windowEnv)}`,
          }}
        />
        <Scripts />
      </body>
    </html>
  )
}

export default function AppWithProviders() {
  const { ssrTheme } = useLoaderData<LoaderData>()

  return (
    <ThemeProvider specifiedTheme={ssrTheme}>
      <App />
    </ThemeProvider>
  )
}
