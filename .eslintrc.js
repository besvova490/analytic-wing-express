module.exports = {
  "env": {
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:node/recommended",
    "plugin:security/recommended"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2020,
    "project": "./tsconfig.json"
  },
  "rules": {
    "import/no-extraneous-dependencies": "off",
    "import/no-cycle": "off",
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "node/file-extension-in-import": "off",
    "node/no-missing-import": "off",
    "import/prefer-default-export": "off",
    "quotes": ["error", "single"],
    "consistent-return": "off",
    "no-param-reassign": "off",
    "node/exports-style": ["error", "module.exports"],
    "node/prefer-global/buffer": ["error", "always"],
    "node/prefer-global/console": ["error", "always"],
    "node/prefer-global/process": ["error", "always"],
    "node/prefer-global/url-search-params": ["error", "always"],
    "node/prefer-global/url": ["error", "always"],
    "node/prefer-promises/dns": "error",
    "node/prefer-promises/fs": "error",
    "node/no-unsupported-features/es-syntax": [
      "error",
      { ignores: ["modules"] },
    ],
  },
}
