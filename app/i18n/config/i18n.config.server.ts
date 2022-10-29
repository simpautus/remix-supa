/*
 * File: i18n.config.server.ts
 * Project: *
 * Created: *
 * -----
 * Copyright 2022, ©Denpex
 * -----
 */

import type { InitOptions } from "i18next";
import type { RemixI18NextOption } from "remix-i18next";
import { resolve } from "node:path";
import Backend from "i18next-fs-backend";
import { i18nCookie } from './cookie';

const remixConfig: RemixI18NextOption = {
  detection: {
    // Persist language selection in cookie
    cookie: i18nCookie,
    // This is the list of languages your application supports
    supportedLanguages: ["en", "sv", "bs"],
    // This is the language you want to use in case
    // if the user language is not in the supportedLanguages
    fallbackLanguage: "en",
  },
  // This is the configuration for i18next used
  // when translating messages server-side only
  i18next: {
    defaultNS: "base",
    backend: {
      loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json"),
    },
  },
  backend: Backend,
};

const serverConfig: InitOptions = {
  supportedLngs: remixConfig.detection.supportedLanguages,
  fallbackLng: remixConfig.detection.fallbackLanguage,
  ...remixConfig.i18next,
  react: { useSuspense: false },
};

// - Exports
export const i18nServerConfig = serverConfig;
export const i18nRemixConfig = remixConfig;
