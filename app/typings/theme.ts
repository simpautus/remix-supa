/*
 * File: theme.ts
 * Project: *
 * Created: *
 * Author: Mehdi Rashadatjou
 * -----
 * Copyright 2021 - 2022, ©*
 * -----
 */

import { ContextResult } from "./context";

export type Theme = "light" | "dark";
export type ThemeLinkRecord = Record<string, HTMLLinkElement>;

export type ThemeContextState = {
  theme: Theme;
  linkList?: ThemeLinkRecord;
};

export type ThemeContextDispatch = {
  toggle: (value: Theme) => void;
};

export type ThemeContext = ContextResult<
  ThemeContextState,
  ThemeContextDispatch
>;
