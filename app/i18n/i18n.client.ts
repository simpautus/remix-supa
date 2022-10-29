/*
 * File: i18n.client.ts
 * Project: *
 * Created: *
 * -----
 * Copyright 2022, ©Denpex
 * -----
 */

import type { i18n } from "i18next";

import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { i18nClientConfig } from "./config/i18n.config.client";

export const localizeRoot = (callback: (i18n: i18n) => void) => {
  // if initialized return current instance
  if (i18next.isInitialized) {
    callback(i18next);
    return;
  }

  i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(Backend)
    .init(i18nClientConfig)
    .then(() => {
      callback(i18next);
    });
};
