/*
 * File: contex.ts
 * Project: *
 * Created: *
 * -----
 * Copyright 2022, ©Denpex
 * -----
 */

/// Global action convection
export type ContextAction<T> = { type: string; payload: { [key: string]: T } };

/// Global context result convection
export type ContextResult<T, K> = [state: Partial<T>, dispatch: Partial<K>];
