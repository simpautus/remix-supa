# JS Detection
Is a mechanism to Enable or Disable Javascript inside of the app + it auto detect if the user has Javascript enabled or disabled.

# How does it work
JSDetect uses the reload method of the browser and server side rendering mechanism to work. If the route `/api/v1/js-detect?xjs=true` it will redirect to `/` route point setting the `useJsDetect()` value to true and not rendering the `<Scripts />` tag.

# How does auto detection work
Auto detection works using the infamouse `noscript` tag. If the user has Javascript disabled the tag will load a `meta` tag witch will reload the page and ping `/api/v1/js-detect?xjs=true`.

# How trigger JSDetect
Send a GET request to `api/v1/js-detect?xjs=true`. The endpoint will check if it got the param `xjs=true`. If that param is available and true it will redirect the user back to the starting page with the `xjs=true` param and set the `xjs` cookie. If this search param or cookie is present the server won't load the remix `<Scripts />` component.

# How get reference to JSDetect
Use the `useJsDetect()` hook to get if Javascript is enabled or disabled. Note this will only run on the server side if Javascript is disabled.