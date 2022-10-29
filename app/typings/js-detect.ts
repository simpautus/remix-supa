/*
 * File: js-detect.ts
 * Project: *
 * Created: *
 * -----
 * Copyright 2022, ©Denpex
 * -----
 */

import { ContextResult } from "./context";

export type JsDetectContextState = {
  jsEnabled: boolean;
};

export type JsDetectContextDispatch = {
  toggleJs: (value: boolean) => void;
};

export type JsDetectContext = ContextResult<
  JsDetectContextState,
  JsDetectContextDispatch
>;
