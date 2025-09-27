import js from "@eslint/js";
import prettier from "eslint-plugin-prettier/recommended";

export default {
  extends: [js.configs.recommended, prettier],
  ignorePatterns: ["dist"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {},
};
