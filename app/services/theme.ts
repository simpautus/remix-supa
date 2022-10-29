/*
 * File: theme.ts
 * Project: *
 * Created: *
 * Author: Mehdi Rashadatjou
 * -----
 * Copyright 2021 - 2022, ©*
 * -----
 */

import type { Theme, ThemeLinkRecord } from "~/typings/theme";

import { AppErrorID } from "~/typings/app-error";
import { THEME_KEY } from "~/constants/storage-key";
import { isServerSide } from "~/utils/client-helper";

import AppError from "~/utils/app-error";

// - Constants
const ALL_THEMES = new Set<Theme>(["dark", "light"]);
const LINK_REL_STYLESHEET = "link[rel=stylesheet]";
const PREFERS_COLOR_SCHEME = "prefers-color-scheme";
const ROOT_PSEUDO_CLASS = ":root";
const THEME_VARIABLE = "--themes";

// - Private
const queryColorScheme = (colorScheme: string) =>
  `${LINK_REL_STYLESHEET}[media*=${PREFERS_COLOR_SCHEME}][media*="${colorScheme}"]`;

function getPreferredColorScheme(): Theme {
  if (isServerSide())
    throw new AppError(AppErrorID.CLIENT_SIDE_CODE_ONLY_ERROR); // server side guard

  if (window?.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }

  return "light";
}

// Fetches :root variables --themes
function getAllAvailableThemes() {
  if (isServerSide()) return;

  const rootElement = document.querySelector(ROOT_PSEUDO_CLASS);
  if (!rootElement) return [];

  const themesValue =
    getComputedStyle(rootElement).getPropertyValue(THEME_VARIABLE);

  const themeList = themesValue.split(" ").filter((value) => value);

  return themeList ?? [];
}

//  - Public
// Get a list of all available css links
export function getClientCSSLinks(): ThemeLinkRecord | undefined {
  if (isServerSide()) return;

  const themeList = getAllAvailableThemes();

  // Will fetch all corresponding color links
  /// Returns [{ colorScheme: HTMLLinkElement }]
  const stylesheetDict = themeList?.reduce(
    (val, curr) => ({
      ...val,
      [curr]: document
        .querySelectorAll(queryColorScheme(curr))
        .item(0) as HTMLLinkElement,
    }),
    {},
  );

  return stylesheetDict;
}

// Update links based on theme
export function changeTheme(theme: Theme, linkList: ThemeLinkRecord) {
  const linkKeys = Object.keys(linkList);
  linkKeys.forEach((key) => {
    const wasChosen = key === theme;
    const item = linkList[key];
    if (!item) return;
    item.media = wasChosen ? "all" : "not all";
    item.disabled = !wasChosen;
  });
}

export function getTheme(): Theme | undefined {
  if (isServerSide()) return undefined;

  const savedTheme = window?.localStorage.getItem(THEME_KEY);
  const preferredScheme = getPreferredColorScheme();

  if (typeof savedTheme === "string" && ALL_THEMES.has(savedTheme as Theme))
    return savedTheme as Theme;

  return preferredScheme;
}

export function saveTheme(theme: Theme) {
  if (isServerSide()) {
    throw new AppError(AppErrorID.CLIENT_SIDE_CODE_ONLY_ERROR);
  }

  window?.localStorage.setItem(THEME_KEY, theme);
}
