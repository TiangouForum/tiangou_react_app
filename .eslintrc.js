module.exports = {
  "extends": [
    "standard",
    "plugin:react/recommended"
  ],
  "parser": "babel-eslint",
  "env": {
    "node": true,
    "es6": true,
    "jest": true,
    "browser": true
  },
  "settings": {
    "react": {
      "createClass": "createReactClass", // Regex for Component Factory to use,
                                         // default to "createReactClass"
      "pragma": "React",  // Pragma to use, default to "React"
      "version": "16.4.2", // React version, default to the latest React stable release
      "flowVersion": "0.53" // Flow version
    },
    "propWrapperFunctions": [ "forbidExtraProps" ] // The names of any functions used to wrap the
                                                   // propTypes object, e.g. `forbidExtraProps`.
                                                   // If this isn't set, any propTypes wrapped in
                                                   // a function will be skipped.
  },
  "rules": {
    "no-console": "error",
    "array-bracket-spacing": [
      "error",
      "never"
    ],
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "space-in-parens": ["error", "never"],
    "semi": ["error", "always"],
    "quotes": ["error", "double"]
  }
};
