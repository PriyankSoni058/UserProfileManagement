module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!(axios|@testing-library))"],
  testPathIgnorePatterns: ["/node_modules/", "/build/"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};
