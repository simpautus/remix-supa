/*
 * File: i18n.server.ts
 * Project: *
 * Created: *
 * -----
 * Copyright 2022, ©Denpex
 * -----
 */

import type { EntryContext } from "@remix-run/node";

import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import { RemixI18Next } from "remix-i18next";
import { i18nServerConfig, i18nRemixConfig } from "./config/i18n.config.server";
import Backend from "i18next-fs-backend";

export const i18nRemix = new RemixI18Next(i18nRemixConfig);

export async function i18nInterceptor(request: Request, context: EntryContext) {
  // First, we create a new instance of i18next so every request will have a
  // completely unique instance and not share any state
  let i18n = createInstance();

  // Then we detect locale from the request
  const language = await getLocale(request);

  // And here we detect what namespaces the routes about to render want to use
  const namespace = i18nRemix.getRouteNamespaces(context);

  await i18n
    .use(initReactI18next)
    .use(Backend)
    .init({
      ...i18nServerConfig,
      lng: language,
      ns: namespace,
    });

  return i18n;
}

export const getLocale = (request: Request) => i18nRemix.getLocale(request);
