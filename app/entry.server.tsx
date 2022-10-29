import { PassThrough } from 'stream'

import type { EntryContext } from '@remix-run/node'
import { Response } from '@remix-run/node'
import { RemixServer } from '@remix-run/react'
import { i18nInterceptor } from '~/i18n/i18n.server'
import { renderToPipeableStream } from 'react-dom/server'
import { I18nextProvider } from 'react-i18next'

const ABORT_DELAY = 5000

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const i18n = await i18nInterceptor(request, remixContext)

  return new Promise((resolve, reject) => {
    let didError = false

    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={i18n}>
        <RemixServer context={remixContext} url={request.url} />
      </I18nextProvider>,
      {
        onShellReady: () => {
          const body = new PassThrough()

          responseHeaders.set('Content-Type', 'text/html')
          responseHeaders.set(
            'Accept-CH',
            'Sec-CH-Prefers-Color-Scheme, Sec-CH-Prefers-Contrast'
          )

          resolve(
            new Response(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            })
          )

          pipe(body)
        },
        onShellError: (err) => {
          reject(err)
        },
        onError: (error) => {
          didError = true

          console.error(error)
        },
      }
    )

    setTimeout(abort, ABORT_DELAY)
  })
}
