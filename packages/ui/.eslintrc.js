/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@smartleadmagnet/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
};
