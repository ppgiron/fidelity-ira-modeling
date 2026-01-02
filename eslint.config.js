import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  // Global ignores
  {
    ignores: ["dist/", ".husky/", "prettier.config.cjs"],
  },

  // Base JS recommended config
  js.configs.recommended,

  // TypeScript recommended config
  ...tseslint.configs.recommended,
  
  // React recommended config
  {
    ...reactRecommended,
    files: ["**/*.{ts,tsx}"],
    settings: {
        react: {
            version: "detect"
        }
    }
  },

  // Main configuration for our project files
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // Turn off rule for modern React
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
];