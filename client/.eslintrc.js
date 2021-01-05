module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', 'react-hooks'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx'] }
    ],
    'react/jsx-uses-vars': 'error',
    'react/jsx-uses-react': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    eqeqeq: 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': [
      'error',
      { before: true, after: true }
    ],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-case-declarations': 'off'
  }
};
