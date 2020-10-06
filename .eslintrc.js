module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    '@tencent/eslint-config-tencent',
  ],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 6,
  },
  globals: {
    chrome: true,
  },
};
