module.exports = {
 env: { browser: true, es6: true, node: true },
 extends: [
  'eslint:recommended',
  'plugin:react/recommended',
  'plugin:import/warnings',
  'react-hooks',
  'plugin:react-hooks/recommended',
  'airbnb',
 ],
 parserOptions: {
  ecmaFeatures: {
   jsx: true,
  },
  ecmaVersion: 2018,
  sourceType: 'module',
 },
 plugins: ['react'],
 rules: {
  'no-underscore-dangle': 0,
  'react-hooks/exhaustive-deps': 0,
 },
};
