/*
 * File: error.ts
 * Project: *
 * Created: *
 * Author: Mehdi Rashadatjou
 * -----
 * Copyright 2021 - 2022, ©*
 * -----
 */

import { AppErrorID, AppErrorRecord } from "~/typings/app-error";

// Collection of error
export const ERROR_MESSAGES: AppErrorRecord = {
  [AppErrorID.CLIENT_SIDE_CODE_ONLY_ERROR]: {
    name: "CLIENT_SIDE_CODE_ONLY_ERROR",
    message: "This code is meant to be run only on the client side.",
  },
};
