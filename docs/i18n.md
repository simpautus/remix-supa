## How to add new language
1. Go to `app/i18n/config/i18n.config.server.ts`
2. Edit the option `supportedLanguages` and add your new language code
3. Go to `public/locales`
4. Make a copy of the `en` directory.
5. Rename the copy to the new language code.
6. Translate the file in base.json

## How i18n stores the language code
remix-i18next by default will detect the current language in this order:

- the `?lng=<lang-code>` search parameter
- a cookie (if you pass one)
- the session (if you pass the sessionStorage)
- the Accept-Language header
- the fallback language you configured

## Change the language using HTTP POST Request
You can use the `api/v1/lang` to change the language on the server.

```Javascript
// Example
fetch(api/v1/lang, { code: 'en' })
```

## Change the language with remix-i18next
Follow the docs: https://github.com/sergiodxa/remix-i18next