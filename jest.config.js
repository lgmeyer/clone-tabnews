const nextJest = require("next/jest");

const createJestConfig = nextJest();
const jestCofing = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"]
});

module.exports = jestCofing;