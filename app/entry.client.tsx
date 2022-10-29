import { RemixBrowser } from '@remix-run/react'
import { localizeRoot } from '~/i18n/i18n.client'
import { hydrateRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'

localizeRoot((i18n) => {
  hydrateRoot(
    document,
    <I18nextProvider i18n={i18n}>
      <RemixBrowser />
    </I18nextProvider>
  )
})
