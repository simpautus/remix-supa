/*
 * File: server-gurad.ts
 * Project: *
 * Created: *
 * Author: Mehdi Rashadatjou
 * -----
 * Copyright 2021 - 2022, ©*
 * -----
 */

export function isServerSide(): boolean {
  return typeof document === 'undefined'
}
