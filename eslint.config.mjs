import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['**/eslint.config.mjs'],
  },

  ...compat.extends(
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ),

  {
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',

      parserOptions: {
        project: path.resolve(__dirname, 'tsconfig.json'),
      },

      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },

    // Global rules
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'variable', format: ['camelCase'] },
        { selector: 'parameter', format: ['camelCase'] },
        {
          selector: 'property',
          format: ['camelCase'],
          filter: {
            regex: '^(Accept|Authorization|Content-Type|X-Api-Key)$',
            match: false,
          },
        },
        { selector: 'function', format: ['camelCase'] },
        { selector: 'method', format: ['camelCase'] },
        { selector: 'class', format: ['PascalCase'] },
        { selector: 'interface', format: ['PascalCase'] },
        { selector: 'typeAlias', format: ['PascalCase'] },
        { selector: 'enum', format: ['PascalCase'] },
      ],
    },
  },

  // Overrides
  {
    files: ['src/shared/constants/**/*.ts'],
    rules: {
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'variable', format: ['PascalCase'] },
        { selector: 'objectLiteralProperty', format: ['UPPER_CASE'] },
      ],
    },
  },
];