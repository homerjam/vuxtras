module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html',
    'vue'
  ],
  // add your custom rules here
  rules: {
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'import/no-webpack-loader-syntax': 1,
    'import/prefer-default-export': 0,
    'max-len': 0,
    'global-require': 1,
    'class-methods-use-this': 1,
    'arrow-body-style': 1,
    'comma-dangle': [2, 'always-multiline'],
    'prefer-template': 1,
    'prefer-destructuring': 0,
    'object-shorthand': 1,
    'object-curly-newline': 0,
    'no-plusplus': 0,
    'no-param-reassign': 0,
    'no-unused-vars': 1,
    'no-underscore-dangle': 0,
    'no-shadow': 0,
    'no-nested-ternary': 1,
    'no-restricted-globals': 1
  },
  globals: {}
}
