module.exports = {
    testMatch: [
      "**/test/**/*.js",
      "**/?(*.)(spec|test).js?(x)"
    ],
    testResultsProcessor: "jest-sonar-reporter",
    coverageDirectory: "target/test-results",
    cacheDirectory: "target/jest-cache",
    testPathIgnorePatterns: [
      "/node_modules/",
      "/e2e/",
      "test/setup.js"
    ],
    moduleNameMapper: {
      "^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "identity-obj-proxy"
    },
    setupFiles: [
      "./test/setup"
    ],
    transform: {
      "^.+\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js"
    },
    transformIgnorePatterns: [
      "node_modules/(?!(@react-native-community|tcomb-form-native|react-native))"
    ],
    coveragePathIgnorePatterns: [
      "app/shared/services/api.js",
      "app/shared/themes/",
      "/storybook/",
      "/*\\.story\\.js"
    ],
    preset: "react-native"
}
