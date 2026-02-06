import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import tseslint from '@typescript-eslint/eslint-plugin';
import unusedImports from 'eslint-plugin-unused-imports';
import lodashLint from 'eslint-plugin-lodash';

const eslintConfig = defineConfig([

  ...nextVitals,
  ...nextTs,
  {
    'plugins': {
      '@typescript-eslint': tseslint,
      'unused-imports': unusedImports,
      'lodash': lodashLint,
    },
    rules: {
      '@next/next/no-server-import-in-page': 'off',
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': [1, { 'after': true }],
      'eol-last': ['error', 'always'],
      'eqeqeq': ['warn', 'always'],
      'indent': [1, 2, { SwitchCase: 1 }],
      'jsx-quotes': [1, 'prefer-double'],
      'key-spacing': [1, { afterColon: true }],
      'lodash/import-scope': ['error', 'method'],
      'max-len': [
        1,
        {
          'code': 120,
          'ignoreRegExpLiterals': true,
        },
      ],
      'no-dupe-class-members': 'off',
      'no-extra-boolean-cast': 'off',
      'no-multi-spaces': 1,
      'no-multiple-empty-lines': ['warn', { 'max': 2, 'maxBOF': 0 }],
      'no-nested-ternary': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [1, 'always'],
      'quotes': [1, 'single'],
      'react/jsx-curly-brace-presence': [1, 'never'],
      'react/jsx-tag-spacing': [1, { 'beforeSelfClosing': 'always' }],
      'react/jsx-curly-newline': [1, { 'multiline': 'forbid', 'singleline': 'consistent' }],
      'react/jsx-max-props-per-line': [1, { 'maximum': { 'single': 3, 'multi': 1 } }],
      'react/jsx-closing-bracket-location': [1, 'tag-aligned'],
      'react/jsx-wrap-multilines': [1, {
        'declaration': 'parens-new-line',
        'assignment': 'parens-new-line',
        'return': 'parens-new-line',
        'arrow': 'parens-new-line',
        'condition': 'parens-new-line',
        'logical': 'parens-new-line',
        'prop': 'parens-new-line',
      }],
      'semi': [1, 'always'],
      'spaced-comment': [1, 'always'],
      'space-in-parens': [1, 'never'],
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': ['error'],
    },
    'languageOptions': {
      'globals': {
        'JSX': 'readonly',
        'React': 'readonly',
      },
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
