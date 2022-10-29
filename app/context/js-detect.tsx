/*
 * File: js-detect.ts
 * Project: *
 * Created: *
 * -----
 * Copyright 2022, ©Denpex
 * -----
 */

import type {
  JsDetectContext,
  JsDetectContextDispatch,
  JsDetectContextState,
} from "~/typings/js-detect";
import type { Context, PropsWithChildren } from "react";

import { createContext, useState, useContext } from "react";

// - Type
type ProviderProp = PropsWithChildren<JsDetectContextState>;

// - Context
const defaultState: JsDetectContext = [{ jsEnabled: true }, {}];
const Context = createContext(defaultState);

// - Provider
const JsDetectProvider = ({ children, jsEnabled }: ProviderProp) => {
  const [enabled, setEnabled] = useState(jsEnabled);

  // Actions
  const onToggle = (newValue: boolean) => {
    setEnabled(newValue);
  };

  // Combine
  const state: JsDetectContextState = { jsEnabled: enabled };
  const dispatch: JsDetectContextDispatch = { toggleJs: onToggle };
  const value: JsDetectContext = [state, dispatch];

  return <Context.Provider value={value} children={children} />;
};

// - Hook
const useJsDetect = (): JsDetectContext => useContext(Context);

// - Exports
export { JsDetectProvider, useJsDetect };
