import { createCookie } from "@remix-run/node";

export const jsDetectCookie = createCookie("xjs", {
  sameSite: "lax",
  path: "/",
});
