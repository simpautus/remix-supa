import { RemixBrowser } from '@remix-run/react'
import { StrictMode, startTransition } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'

import { localizeRoot } from './i18n/i18n.client'

const hydrate = () => {
  startTransition(() => {
    localizeRoot((i18n) => {
      hydrateRoot(
        document,
        <I18nextProvider i18n={i18n}>
          <StrictMode>
            <RemixBrowser />
          </StrictMode>
        </I18nextProvider>
      )
    })
  })
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate)
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1)
}
