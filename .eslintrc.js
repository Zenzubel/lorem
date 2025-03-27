module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'module',
    babelOptions: {
      configFile: './babel.config.js',
    },
    requireConfigFile: false,
  },
  env: {
    browser: true,
    es6: true,
    commonjs: true,
  },
  extends: ['standard', 'prettier', 'prettier/standard'],
  rules: {
    'no-unused-vars': 1,
    'no-undef': 0,
  },
};
