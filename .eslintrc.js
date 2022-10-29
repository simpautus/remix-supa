/**
 * @type {import('@types/eslint').Linter.BaseConfig}
 */
module.exports = {
  extends: [
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    'plugin:prettier/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: ['prettier', 'tailwindcss'],
  rules: {
    // Issue with custom classnames
    // https://github.com/francoismassart/eslint-plugin-tailwindcss/issues/129
    // 'tailwindcss/no-custom-classname': 'warn',
  },
}
