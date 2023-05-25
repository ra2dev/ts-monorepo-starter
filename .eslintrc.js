module.exports = {
  extends: ['airbnb', 'prettier', 'prettier/react', 'plugin:storybook/recommended', 'plugin:storybook/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'prettier', 'import'],
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true
  },
  settings: {}
};