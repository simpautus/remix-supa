/*
 * File: error.ts
 * Project: *
 * Created: *
 * Author: Mehdi Rashadatjou
 * -----
 * Copyright 2021 - 2022, ©*
 * -----
 */

export enum AppErrorType {
  Universal = 0, // Applicable for all contexts
  Client = 1, // Client side only errors
  Server = 2, // Server side only errors
}

export enum AppErrorID {
  CLIENT_SIDE_CODE_ONLY_ERROR = 0,
}

export type AppErrorBody = {
  name: string;
  message: string;
};

export type AppErrorRecord = Record<AppErrorID, AppErrorBody>;
