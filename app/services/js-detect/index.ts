/*
 * File: index.ts
 * Project: *
 * Created: *
 * -----
 * Copyright 2022, ©Denpex
 * -----
 */

import { jsDetectCookie } from "./cookie";

const CHECK_ORDER = ["searchparams", "cookie", "session", "header"];

export async function detectJs(request: Request) {

  for (let method of CHECK_ORDER) {
    let disabled: boolean | null = null;

    // Check search params
    if (method === "searchparams") {
      const isUrlEnabled = jsDetectingUrl(request.url);
      disabled = isUrlEnabled;
    }

    // Check cookie
    if (method === "cookie") {
      const isCookieEnabled = await jsDetectingCookie(request);
      disabled = isCookieEnabled;
    }

    if (disabled) return disabled;
  }

  return false;
}

export function jsDetectingUrl(href: string) {
  try {
    const url = new URL(href);
    const params = url?.searchParams;
    if (!url.searchParams.has("xjs")) return null;

    const xjsParam = params.get("xjs");
    return xjsParam === "true";
  } catch (error) {}

  return null;
}

export async function jsDetectingCookie(request: Request) {
  const cookies = request.headers.get("Cookie");
  const enabled = await jsDetectCookie.parse(cookies);
  if (!enabled) return null;
  return enabled === "true";
}
