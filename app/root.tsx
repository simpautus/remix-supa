/*
 * File: root.tsx
 * Project: *
 * Created: *
 * -----
 * Copyright 2022, ©Denpex
 * -----
 */

import type {
  MetaFunction,
  LinksFunction,
  LoaderFunction,
} from "@remix-run/node";
import type { Theme } from "~/typings/theme";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  ScrollRestoration,
  useLoaderData,
  Scripts,
} from "@remix-run/react";
import { json } from "@remix-run/node";
import { getLocale, i18nRemix } from "~/i18n/i18n.server";
import { i18nCookie } from "~/i18n/config/cookie";
import { useChangeLanguage } from "remix-i18next";
import { useTranslation } from "react-i18next";
import { useJsDetect } from "~/context/js-detect";
import { detectJs } from "~/services/js-detect";
import { jsDetectCookie } from "~/services/js-detect/cookie";

import resetCssPath from "~/styles/reset.css";
import colorCssPath from "~/styles/color/light.css";
import colorDarkCssPath from "~/styles/color/dark.css";
import typographyCssPath from "~/styles/typography.css";
import coreCssPath from "~/styles/core.css";
import geometricSmallCssPath from "~/styles/geometry/small.css";
import geometricNormalCssPath from "~/styles/geometry/normal.css";
import geometricLargeCssPath from "~/styles/geometry/large.css";

// - Types
type LoaderData = {
  locale: string;
  title: string;
  jsDisabled: boolean;
  theme: Theme;
};

// - Route Module API
export const loader: LoaderFunction = async ({ request }) => {
  const jsDisabled = await detectJs(request);
  const locale = await getLocale(request);
  const translate = await i18nRemix.getFixedT(request, "base");
  const title = translate("meta.title");

  const headers = new Headers();
  headers.set("Set-Cookie", await i18nCookie.serialize(locale));

  // Remove cookie if JS is enabled
  if (!jsDisabled) {
    headers.append(
      "Set-Cookie",
      await jsDetectCookie.serialize(null, { maxAge: 0 }),
    );
  }

  return json({ locale, title, jsDisabled }, { headers });
};

export const meta: MetaFunction = ({ data }) => ({
  charset: "utf-8",
  title: data.title,
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: resetCssPath },
    {
      rel: "stylesheet",
      href: colorCssPath,
      media:
        "(prefers-color-scheme: no-preference), (prefers-color-scheme: light)",
    },
    {
      rel: "stylesheet",
      href: colorDarkCssPath,
      media: "(prefers-color-scheme: dark)",
    },
    { rel: "stylesheet", href: geometricSmallCssPath },
    {
      rel: "stylesheet",
      href: geometricNormalCssPath,
      media: "print, (min-width: 640px)",
    },
    {
      rel: "stylesheet",
      href: geometricLargeCssPath,
      media: "screen and (min-width: 1024px)",
    },
    { rel: "stylesheet", href: coreCssPath },
    { rel: "stylesheet", href: typographyCssPath },
  ];
};

export const handle = {
  i18n: "base",
};

// - Component
export default function Root() {
  const { locale, jsDisabled } = useLoaderData<LoaderData>();
  const { i18n } = useTranslation();
  const [{}, { toggleJs }] = useJsDetect();

  // Load language
  useChangeLanguage(locale);
  // Toggle JS loaded or not
  toggleJs?.(!jsDisabled);

  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <LiveReload />
        {!jsDisabled && <Scripts />}
        {!jsDisabled && (
          <noscript>
            <meta
              httpEquiv="refresh"
              content="0;URL=/api/v1/js-detect?xjs=true"
            />
          </noscript>
        )}
      </body>
    </html>
  );
}
