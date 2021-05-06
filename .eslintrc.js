module.exports = {
  parser: 'babel-eslint',
  plugins: ['babel'],
  extends: ['airbnb'],
  rules: {
    indent: ['error', 2],
    'no-unused-vars': ['error', { vars: 'all', args: 'none' }],
    'max-params': ['warn', 5],
    'max-nested-callbacks': ['warn', 5],
    'max-statements': ['warn', 20],
    'max-depth': ['warn', 7],
    'max-lines': ['warn', 750],
    'array-callback-return': 'warn',
    complexity: ['warn', { max: 20 }],
    'comma-dangle': [2, 'always-multiline'],
    'no-underscore-dangle': [0],
    'babel/no-invalid-this': 1,
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
