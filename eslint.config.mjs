import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], // Specify the file types to lint
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }, // Add browser and node globals
      parser: "@typescript-eslint/parser", // Use TypeScript parser
      parserOptions: {
        ecmaVersion: 2020, // Define the ECMAScript version you are working with
        sourceType: "module", // Use ES6 modules
        project: "./tsconfig.json", // Ensure ESLint uses the correct TypeScript project
      },
    },
  },
  pluginJs.configs.recommended, // ESLint recommended rules for JS
  ...tseslint.configs.recommended, // TypeScript linting rules
  pluginReact.configs.recommended, // React linting rules
];