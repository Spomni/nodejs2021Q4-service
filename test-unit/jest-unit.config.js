const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '../'),
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/test-unit/**/*.spec.js"],
  setupFilesAfterEnv: ["<rootDir>/test-unit/setup-unit.js"]
};
