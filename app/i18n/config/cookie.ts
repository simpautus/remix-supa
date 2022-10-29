import { createCookie } from '@remix-run/node'

export const i18nCookie = createCookie('demo-app-i18n', {
  sameSite: 'lax',
  path: '/',
})
