/*
 * File: lang.tsx
 * Project: *
 * Created: *
 * -----
 * Copyright 2022, ©Denpex
 * -----
 */

import type { ActionFunction } from "@remix-run/node";
import { json, Response } from "@remix-run/node";
import { i18nCookie } from "~/i18n/config/cookie";
import { i18nRemixConfig } from "~/i18n/config/i18n.config.server";

// - Route Module API
export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") throw new Response("Method not allowed", { status: 400 });

  // validate
  const body = await request.json();
  const isValid = validateBody(body);
  if (!isValid) throw new Response("Requested language was not found", { status: 404 });

  // save cookie
  return json(null, {
    status: 202,
    headers: { "Set-Cookie": await i18nCookie.serialize(body.code) },
  });
};

// - Helper
function validateBody(body: any) {
  if (typeof body !== "object" || !body) return false;
  if (!body.hasOwnProperty("code")) return false;
  const langCode = body?.code;
  if (typeof langCode !== "string") return false;
  const langs = i18nRemixConfig.detection.supportedLanguages;
  return langs.includes(langCode);
}
