/*
 * File: entry.server.tsx
 * Project: *
 * Created: *
 * -----
 * Copyright 2022, ©Denpex
 * -----
 */

import type { EntryContext } from "@remix-run/node";

import { PassThrough } from "stream";
import { Response } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToPipeableStream } from "react-dom/server";
import { i18nInterceptor } from "~/i18n/i18n.server";
import { I18nextProvider } from "react-i18next";
import { detectJs } from "~/services/js-detect";
import { JsDetectProvider } from "~/context/js-detect";

const ABORT_DELAY = 5000;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const i18n = await i18nInterceptor(request, remixContext);
  const isJsDisabled = await detectJs(request);

  return new Promise((resolve, reject) => {
    let didError = false;

    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={i18n}>
        <JsDetectProvider jsEnabled={!isJsDisabled}>
          <RemixServer context={remixContext} url={request.url} />
        </JsDetectProvider>
      </I18nextProvider>,
      {
        onShellReady: () => {
          const body = new PassThrough();

          responseHeaders.set("Content-Type", "text/html");
          responseHeaders.set("Accept-CH", "Sec-CH-Prefers-Color-Scheme, Sec-CH-Prefers-Contrast")

          resolve(
            new Response(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            }),
          );

          pipe(body);
        },
        onShellError: (err) => {
          reject(err);
        },
        onError: (error) => {
          didError = true;

          console.error(error);
        },
      },
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
