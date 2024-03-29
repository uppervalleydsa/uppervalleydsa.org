module.exports = {
  extends: [
    'eslint-config-airbnb',
    'eslint-config-prettier',
    'prettier/prettier',
  ],
  rules: {
    'max-classes-per-file': 0,
    'no-else-return': 0,
    'no-console': 0,
    'import/prefer-default-export': 1,
    'import/no-extraneous-dependencies': [
      2,
      { devDependencies: true, packageDir: __dirname },
    ],
    'import/order': [
      2,
      {
        groups: [['builtin', 'external']],
        'newlines-between': 'always',
      },
    ],
    'react/destructuring-assignment': 0,
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.html.jsx'] }],
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prefer-stateless-function': 0,
    'react/prop-types': 0,
    'jsx-a11y/anchor-is-valid': [2, { specialLink: ['to'] }],
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
  },
};
